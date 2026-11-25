// One animation frame: step the sim, feed effects and records, place everything, render.
import * as THREE from 'three';
import { pollPad, sampleInput, zoom, debug as inputDebug, pointerMode } from '../input/input';
import { touchUi } from '../input/touch';
import { padName } from '../input/pad';
import { lerpShip } from '../sim/ship';
import { stepSim } from '../sim/world';
import { quantize } from '../sim/replay';
import { sampleGhost } from '../sim/ghost';
import { botControls, botTargets } from '../sim/bot';
import { raceSpan, startLine } from '../gen/track';
import { camMode, cameraEvent, updateCamera } from '../cam/rigs';
import { cineReplay, cineScene } from '../cam/cinematic';
import { layout } from '../render/viewports';
import type { RivalKind } from '../render/rivals';
import { gameMode, onTrack, track } from '../world/race';
import { nextGatePoint, provingCourse } from '../world/proving';
import { bestKey } from '../world/records';
import type { Game } from './game';
import type { Menus } from './menus';
import type { Replays } from './replay';
import { againText, branchColors, raceHud } from './hudData';
import { foldProvingRun, recordLap, saveBestLap } from './progress';
import {
  ambient, assist, autopilot, botParams, botRoute, ghostColor, ghostOpacity, lightColor, lightDir, lightIntensity,
  paused, rivalBotColor, rivalLastColor, shipVars, simConfig, timeScale,
} from './tuning';

const _scrape = new THREE.Vector3();
const _gate = new THREE.Vector3();

export function startFrames(g: Game, replays: Replays, menus: Menus, gizmos: () => { update(): void } | undefined): void {
  const { recording, editor } = menus;
  const s = g.stage;
  const { renderer, camera, juice, rivalModels, shipModel, viewports } = s;
  const { sim, prev, curr, view, controls, loop } = g;
  let last = performance.now();
  renderer.setAnimationLoop((now) => {
    const dt = Math.min((now - last) / 1000, 0.25);
    last = now;
    g.perf.fps += (1 / Math.max(dt, 1e-4) - g.perf.fps) * 0.05;
    const t0 = performance.now();
    pollPad(dt);

    const cfg = simConfig();
    const warp = juice.timeScale(paused.value ? 0 : dt);
    const playing = !g.replay || (g.replay.playing && !g.replay.player.done);
    const speedX = g.replay ? g.replay.speed : 1;
    const editing = editor.active;
    const alpha = loop.advance(paused.value || !playing || recording.frozen || editing ? 0 : dt * timeScale.value * warp * speedX, (step) => {
      if (g.replay) {
        if (!g.replay.player.next(controls)) return;
      } else {
        if (autopilot.value && g.race) botControls(curr, track.value, g.race.near, g.race.time, controls, botTargets(cfg.course), botParams(botRoute.value), g.race.loc.route);
        else sampleInput(controls, step);
        quantize(controls);
        g.recorder?.push(controls);
      }
      stepSim(sim, controls, cfg, step);
      recordLap(g);
    });
    recording.frame();
    if (menus.recordingFromEditor && recording.state === 'idle') {
      menus.recordingFromEditor = false;
      editor.resume();
    }
    const replay = g.replay;
    replays.bar.update({
      active: !!replay,
      playing: !!replay && replay.playing && !replay.player.done,
      tick: replay?.player.tick ?? 0,
      ticks: replay?.rec.ticks ?? 0,
      step: replay?.rec.step ?? loop.step,
    });
    const race = g.race;
    // wall contact point (for sparks), and effects for what happened this frame
    let scrape: THREE.Vector3 | null = null;
    if (race?.contact) scrape = _scrape.subVectors(curr.pos, race.near.point).setLength(race.loc.radius).add(race.near.point);
    if (race) {
      for (const e of race.events) {
        if (e.type === 'route' && e.kind === 'hidden') g.foundRoutes.add(`${bestKey()}#${e.branch}`);
        const at = e.type === 'hit' ? (e.what === 'wall' ? (scrape ?? curr.pos) : race.obstacle.point) : undefined;
        juice.event(e, curr, at);
        cameraEvent(e.type);
      }
      race.events.length = 0;
    }
    foldProvingRun(g);
    saveBestLap(g);
    lerpShip(view, prev, curr, alpha);

    s.sun.color.set(lightColor.value);
    s.sun.intensity = lightIntensity.value;
    s.sun.position.fromArray(lightDir.value);
    s.amb.intensity = ambient.value;
    s.field.update(gameMode.value === 'free');
    s.raceScene.update();
    s.sceneryScene.update();
    // rivals fly on race time in a race (lapping their one lap), on lap time in practice
    g.rivals.refresh(g);
    const colors: Record<RivalKind, string> = { best: ghostColor.value, last: rivalLastColor.value, bot: rivalBotColor.value };
    for (const k of Object.keys(rivalModels) as RivalKind[]) {
      rivalModels[k].model.visible = false;
      rivalModels[k].mat.color.set(colors[k]);
      rivalModels[k].mat.opacity = ghostOpacity.value;
    }
    // one lap, or start line to finish gate on a point-to-point track
    const L = raceSpan(track.value);
    const racing = !!race && race.laps > 0;
    if (race?.started) {
      const lerp = race.finished ? 0 : (1 - alpha) * loop.step;
      const t = (racing ? race.raceTime : race.lapTime) - lerp;
      for (const { kind, rival } of g.rivals.list) {
        const m = rivalModels[kind].model;
        const gl = rival.ghost.lap;
        if (racing && t >= race.laps * gl) continue;
        m.visible = sampleGhost(rival.ghost, racing ? t % gl : t, m.position, m.quaternion);
      }
    }
    s.gauntletScene.update(race ? race.time - (1 - alpha) * loop.step : 0);
    s.padScene.update(race ? race.time - (1 - alpha) * loop.step : 0);
    s.provingScene.update(race ? race.time : 0, race?.proving ?? null);
    // the editor's ghost view: only the see-through tube
    if (editor.ghost) s.raceScene.group.visible = s.padScene.group.visible = s.gauntletScene.group.visible = false;
    gizmos()?.update();

    shipModel.object.position.copy(view.pos);
    shipModel.object.quaternion.copy(view.quat);
    // replays are shown through the cinematic director unless turned off
    const rig = replay && cineReplay.value ? 'cinematic' : camMode.value;
    shipModel.object.visible = rig !== 'cockpit' && !editing;
    shipModel.update(view.boosting ? 1 : Math.max(0, controls.thrust));
    const rect = viewports.mainRect();
    if (camera.aspect !== rect.w / rect.h) {
      camera.aspect = rect.w / rect.h;
      camera.updateProjectionMatrix();
    }
    cineScene.track = race ? track.value : null;
    cineScene.near = race?.near ?? null;
    cineScene.route = race?.loc.route ?? -1;
    if (editing) editor.frame(dt);
    else updateCamera(camera, view, dt, zoom.value, rig);
    s.letterboxUi.update(rig === 'cinematic' && !editing, rect);
    if (!editing) juice.frame({ dt, camera, ship: view, shipModel: shipModel.object, maxSpeed: shipVars.maxSpeed.value, chase: rig === 'chase' || rig === 'far', scrape });

    const hint =
      pointerMode.value === 'stick' && !inputDebug.captured && !touchUi.value && !padName.value
        ? 'Click to steer with the touchpad · arrows/WASD to fly'
        : '';
    const hudRace = race ? raceHud(g, race, L) : null;
    s.hud.update(view, { assist: assist.value, cam: rig, cruise: inputDebug.cruise, hint, race: hudRace, again: againText(race) });

    s.hudLayout.update({
      camera,
      shipPos: view.pos,
      shipQuat: view.quat,
      track: onTrack() ? track.value : null,
      nextCp: race?.finished ? null : race?.started ? (race.nextCp === 0 ? (track.value.finish ?? 0) : track.value.checkpoints[race.nextCp]) : race ? startLine(track.value) : null,
      target: race?.proving && provingCourse.value && !race.proving.result ? nextGatePoint(provingCourse.value, race.proving, _gate) : null,
      branchColors: onTrack() ? branchColors(g) : [],
    });
    s.screensScene.update(renderer, view, dt, s.sky, camera, hudRace);
    s.sky.update(camera, renderer.getPixelRatio());
    renderer.info.reset();
    s.pipeline.render(s.scene, camera, layout.value === 'single' ? undefined : rect);
    if (!editing) viewports.render(view, dt);
    g.perf.frameMs = performance.now() - t0;
  });
}
