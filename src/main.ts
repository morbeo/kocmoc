import * as THREE from 'three';
import { effect } from '@preact/signals-core';
import { vars, valueEquals } from './core/vars';
import { initPersistence } from './core/persist';
import { isTyping } from './core/dom';
import { FixedLoop } from './core/loop';
import { newShip, lerpShip, noControls, type ShipParams } from './sim/ship';
import { newSim, spawnSim, stepSim, type SimConfig, type Spawn } from './sim/world';
import { Player, Recorder, parseRecording, quantize, type Recording } from './sim/replay';
import { GhostRecorder, parseGhost, sampleGhost, type Ghost } from './sim/ghost';
import { BOT_ROUTES, botControls, botTargets, defaultBot, type BotRoute } from './sim/bot';
import { flyBotLap, makeRival, standings, type Rival } from './sim/rivals';
import { session } from './core/session';
import { createReplayBar } from './ui/replayBar';
import { attachInput, sampleInput, onKey, assistKey, cameraKey, cinematicKey, controlsKey, respawnKey, autopilotKey, replayKey, levelsKey, nextLevelKey, tracksKey, zoom, debug as inputDebug, pointerMode } from './input/input';
import { keyLabel } from './input/bindings';
import { camMode, cameraEvent, cycleCamera, toggleCinematic, updateCamera } from './cam/rigs';
import { cineReplay, cineScene } from './cam/cinematic';
import { createLetterbox } from './ui/letterbox';
import { createShipModel } from './render/shipModel';
import { createField } from './world/field';
import { createScenery } from './world/scenery';
import { createHud } from './ui/hud';
import { createHudLayout, editKey as hudEditKey, editMode as hudEdit } from './ui/hudLayout';
import { createSky } from './render/sky';
import { createPipeline } from './render/pipeline';
import { createViewports, layout } from './render/viewports';
import { detectTouch, touchUi } from './input/touch';
import { createRaceScene, gameMode, genParams, onTrack, oobTime, openSpace, routeColors, ROUTE_NAMES, routeParams, routesOn, seedVar, track } from './world/race';
import { forkAhead } from './gen/routes';
import { createProvingScene, nextGatePoint, provingCourse, provingLevel, provingParams, provingRules } from './world/proving';
import { levelScenario, parseLadder, recordRun, type Ladder, type RunOutcome } from './core/ladder';
import { createLevels } from './ui/levels';
import { createTracks } from './ui/tracks';
import { presets, applyPreset, activePreset } from './core/presets';
import { createGauntletScene, gauntlet, gauntletParams, nearMissDistance, shipRadius } from './world/gauntlet';
import { createJuice } from './juice';
import { raceDistance, splitDelta, type RaceState, type WallParams } from './sim/race';
import { scenarios, applyScenario, parseScenario, scenarioLayer, setSpawnHandler, setSpawnSource, venues } from './core/scenarios';
import type { ProvingHud } from './ui/hud';
import './ui/hud.css';

// --- vars ------------------------------------------------------------------
const lightColor = vars.color('render.light.color', '#ffffff', { tags: ['render'] });
const lightIntensity = vars.num('render.light.intensity', 3, { min: 0, max: 10, hardMin: 0, tags: ['render'] });
const lightDir = vars.vec3('render.light.dir', [1, 1.5, 1], { tags: ['render'], desc: 'direction towards the light' });
const ambient = vars.num('render.ambient', 0.25, { min: 0, max: 2, hardMin: 0, tags: ['render'] });
// phones have 3× screens and small GPUs: render touch devices at a lower ratio by default
const coarse = matchMedia('(pointer: coarse)').matches;
const pixelRatio = vars.num('render.pixelRatio', coarse ? 1.5 : 2, { min: 0.5, max: 3, hardMin: 0.25, hardMax: 4, tags: ['render', 'perf'], desc: 'max render resolution per CSS pixel (capped by the screen)' });

const simRate = vars.int('sim.rate', 120, { min: 30, max: 240, hardMin: 10, hardMax: 1000, unit: 'Hz', tags: ['sim'], desc: 'fixed physics steps per second' });
const timeScale = vars.num('time.scale', 1, { min: 0.05, max: 4, hardMin: 0, hardMax: 16, unit: '×', tags: ['sim', 'debug'] });
const paused = vars.bool('time.paused', false, { tags: ['sim', 'debug'] });
const inputViz = vars.bool('debug.inputViz', false, { tags: ['debug', 'input'], desc: 'input visualizer (F3)' });
const vizKey = vars.str('input.key.inputViz', 'F3', { tags: ['input', 'keys'], desc: 'KeyboardEvent.code, comma-separated' });

const feel = ['ship', 'feel'];
const assist = vars.bool('ship.flightAssist', true, { tags: feel, desc: 'on: velocity follows the nose; off: Newtonian drift (F)' });
const p = {
  thrust: vars.num('ship.thrust.forward', 60, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  reverse: vars.num('ship.thrust.reverse', 40, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  strafe: vars.num('ship.thrust.strafe', 35, { min: 0, max: 300, hardMin: 0, unit: 'm/s²', tags: feel }),
  turnRate: vars.vec3('ship.turn.rate', [1.8, 1.4, 3], { tags: feel, unit: 'rad/s', desc: 'pitch, yaw, roll' }),
  turnResponse: vars.num('ship.turn.response', 8, { min: 0.5, max: 40, hardMin: 0.01, unit: '/s', tags: feel, desc: 'how fast turn rate follows input' }),
  maxSpeed: vars.num('ship.speed.max', 120, { min: 10, max: 600, hardMin: 1, unit: 'm/s', tags: feel }),
  overspeedDecay: vars.num('ship.speed.overspeedDecay', 1.5, { min: 0.1, max: 10, hardMin: 0, unit: '/s', tags: feel, desc: 'how fast speed above the cap bleeds off' }),
  boostThrust: vars.num('ship.boost.thrust', 160, { min: 0, max: 600, hardMin: 0, unit: 'm/s²', tags: feel }),
  boostSpeed: vars.num('ship.boost.speed', 240, { min: 10, max: 1200, hardMin: 1, unit: 'm/s', tags: feel }),
  boostDrain: vars.num('ship.boost.drain', 0.35, { min: 0, max: 2, hardMin: 0, unit: '/s', tags: feel, desc: 'energy used per second (1 = full tank)' }),
  boostRegen: vars.num('ship.boost.regen', 0.15, { min: 0, max: 2, hardMin: 0, unit: '/s', tags: feel }),
  assistDamp: vars.num('ship.assist.damp', 2.5, { min: 0.1, max: 20, hardMin: 0, unit: '/s', tags: feel, desc: 'how fast flight assist kills drift' }),
};
const params = (): ShipParams => ({
  thrust: p.thrust.value,
  reverse: p.reverse.value,
  strafe: p.strafe.value,
  turnRate: p.turnRate.value,
  turnResponse: p.turnResponse.value,
  maxSpeed: p.maxSpeed.value,
  overspeedDecay: p.overspeedDecay.value,
  boostThrust: p.boostThrust.value,
  boostSpeed: p.boostSpeed.value,
  boostDrain: p.boostDrain.value,
  boostRegen: p.boostRegen.value,
  assist: assist.value,
  assistDamp: p.assistDamp.value,
});

const rtags = ['race', 'feel'];
const wallBounce = vars.num('race.wall.bounce', 0.3, { min: 0, max: 1, hardMin: 0, hardMax: 2, tags: rtags, desc: 'share of into-wall speed bounced back' });
const wallScrape = vars.num('race.wall.scrape', 0.8, { min: 0, max: 10, hardMin: 0, unit: '/s', tags: rtags, desc: 'speed lost while touching the wall' });
const spawnT = vars.num('race.spawn.t', 0, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['race'], desc: 'spawn position as a fraction of the lap (0 = just behind the start line)' });
const spawnSpeed = vars.num('race.spawn.speed', 0, { min: 0, max: 400, hardMin: 0, unit: 'm/s', tags: ['race'] });
const autopilot = vars.bool('bot.enabled', false, { tags: ['bot'], desc: 'autopilot flies the track (P)' });
const botRoute = vars.enum('bot.route', 'shortcut', BOT_ROUTES, { tags: ['bot', 'route'], desc: 'which branches the autopilot takes at forks: main never leaves the loop; shortcut takes shortcuts and hidden routes; long takes the long way, splits and the pit lane' });
const pitRefill = vars.num('race.pit.refill', 0.5, { min: 0, max: 5, hardMin: 0, unit: '/s', tags: ['race', 'route'], desc: 'share of full boost the pit lane refills per second' });
const pitSpeed = vars.num('race.pit.speed', 60, { min: 10, max: 300, hardMin: 1, unit: 'm/s', tags: ['race', 'route'], desc: 'pit lane speed limit (faster bleeds off)' });
const ghostOn = vars.bool('race.ghost.enabled', true, { tags: ['race', 'ghost'], desc: 'race your best lap on this track' });
const ghostOpacity = vars.num('race.ghost.opacity', 0.35, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['race', 'ghost'] });
const ghostColor = vars.color('race.ghost.color', '#7fe7ff', { tags: ['race', 'ghost'] });
const raceLaps = vars.int('race.laps', 3, { min: 0, max: 20, hardMin: 0, hardMax: 999, tags: ['race'], desc: 'laps to the finish; 0 = endless practice' });
const rivalLast = vars.bool('race.rival.last', true, { tags: ['race', 'ghost'], desc: 'race your last lap this session too' });
const rivalLastColor = vars.color('race.rival.lastColor', '#ffd166', { tags: ['race', 'ghost'] });
const rivalBot = vars.bool('race.rival.bot', true, { tags: ['race', 'ghost'], desc: 'race a lap the autopilot flew from a standing start' });
const rivalBotColor = vars.color('race.rival.botColor', '#b388ff', { tags: ['race', 'ghost'] });
const rivalBotRoute = vars.enum('race.rival.botRoute', 'shortcut', BOT_ROUTES, { tags: ['race', 'ghost', 'route'], desc: 'which branches the autopilot rival takes at forks (see bot.route)' });
const gizmoNames = ['velocity', 'accel', 'collision', 'frames', 'checkpoints', 'nearest'] as const;
const gizmos = gizmoNames.map((n) => vars.bool(`debug.gizmo.${n}`, false, { tags: ['debug', 'gizmo'] }));

// restore saved/shared tuning only after every var above has registered
initPersistence(vars);

// ?seed=N wins over the saved seed; it's written to the user layer (not undoable) so the two agree
const urlParams = new URLSearchParams(location.search);
const urlSeed = Number(urlParams.get('seed'));
if (urlParams.has('seed') && Number.isFinite(urlSeed)) {
  vars.change([{ layer: 'user', path: 'gen.race.seed', before: vars.layerValue('user', 'gen.race.seed'), after: Math.round(urlSeed) }], false);
}

// --- scene -----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);

renderer.info.autoReset = false; // several passes per frame: count them all
const pipeline = createPipeline(renderer);

const scene = new THREE.Scene();
const sky = createSky(scene);
// far enough for venue floors and scenery a few kilometres off
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 12000);
const sun = new THREE.DirectionalLight();
const amb = new THREE.AmbientLight(0x8899ff);
scene.add(sun, amb);

const shipModel = createShipModel();
scene.add(shipModel.object);
// the best lap's ghost: the ship's shape in one translucent colour
const ghostMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
const ghostModel = shipModel.object.clone(true);
ghostModel.traverse((o) => {
  if (o instanceof THREE.Mesh) o.material = ghostMat;
});
ghostModel.visible = false;
scene.add(ghostModel);
/** One translucent ship per rival kind; the best lap keeps the original ghost model. */
type RivalKind = 'best' | 'last' | 'bot';
const RIVAL_NAMES: Record<RivalKind, string> = { best: 'BEST', last: 'LAST', bot: 'AUTOPILOT' };
const rivalModels: Record<RivalKind, { model: THREE.Object3D; mat: THREE.MeshBasicMaterial }> = {
  best: { model: ghostModel, mat: ghostMat },
  last: cloneGhost(),
  bot: cloneGhost(),
};
function cloneGhost() {
  const mat = ghostMat.clone();
  const model = ghostModel.clone(true);
  model.traverse((o) => {
    if (o instanceof THREE.Mesh) o.material = mat;
  });
  scene.add(model);
  return { model, mat };
}
const field = createField(scene);
const raceScene = createRaceScene(scene);
const sceneryScene = createScenery(scene);
const gauntletScene = createGauntletScene(scene);
const provingScene = createProvingScene(scene);
const juice = createJuice(scene, () => vars.get('ship.glow')?.value as string ?? '#7fe7ff');
const hud = createHud();
const viewports = createViewports(renderer, scene, sky);
const hudLayout = createHudLayout(hud.elements);
const letterboxUi = createLetterbox();

function resize(): void {
  renderer.setPixelRatio(Math.min(devicePixelRatio, pixelRatio.value));
  renderer.setSize(innerWidth, innerHeight);
  pipeline.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
screen.orientation?.addEventListener('change', resize);
effect(resize); // also re-runs when render.pixelRatio changes

// --- sim -------------------------------------------------------------------
const sim = newSim();
const prev = sim.prev;
const curr = sim.curr;
const view = newShip();
const controls = noControls();
const loop = new FixedLoop(1 / simRate.value);
effect(() => void (loop.step = 1 / simRate.value));

// --- race ------------------------------------------------------------------
let race: RaceState | null = null;
const walls = (): WallParams => ({ shipRadius: shipRadius.value, bounce: wallBounce.value, scrape: wallScrape.value, open: openSpace(), oobTime: oobTime.value });
const bestKey = () =>
  gameMode.value === 'gauntlet'
    ? `kocmoc.best.gauntlet.${JSON.stringify([genParams.value, gauntletParams.value])}`
    : gameMode.value === 'proving'
      ? `kocmoc.best.proving.${JSON.stringify([genParams.value, provingParams.value])}`
      : `kocmoc.best.${JSON.stringify(genParams.value)}${routesOn() ? `|routes${JSON.stringify(routeParams.value)}` : ''}`;
const ghostKey = () => bestKey().replace('kocmoc.best.', 'kocmoc.ghost.');
let savedBest: number | null = null;
let ghost: Ghost | null = null;
/** the last full lap flown this session, per track */
const lastLaps = new Map<string, Ghost>();
/** autopilot laps, per track and ship tuning (deterministic, so computed once) */
const botLaps = new Map<string, Ghost | null>();
const botKey = () => `${bestKey()}|${JSON.stringify(params())}${track.value.branches?.length ? `|${rivalBotRoute.value}` : ''}`;
const botParams = (route: BotRoute) => ({ ...defaultBot, route });
let botPending: ReturnType<typeof setTimeout> | undefined;
let botFlying = '';
/** in a race, your best and last laps as they were at the start, so laps from this race don't join it */
let startGhosts: { best: Ghost | null; last: Ghost | null } = { best: null, last: null };
/** ghosts raced against, rebuilt when one of them changes */
let rivals: { kind: RivalKind; rival: Rival }[] = [];
let rivalsFor = '';

/** Rebuild the rival list if the ghosts or the toggles behind it changed. */
function refreshRivals(): void {
  // proving is scored on time left, gates and beacons: no rivals to race
  if (!race || !onTrack() || gameMode.value === 'proving') {
    rivals = [];
    rivalsFor = '';
    return;
  }
  const live = race.laps === 0;
  const last = rivalLast.value ? (live ? (lastLaps.get(bestKey()) ?? null) : startGhosts.last) : null;
  const bot = rivalBot.value ? (botLaps.get(botKey()) ?? null) : null;
  const best = ghostOn.value ? (live ? ghost : startGhosts.best) : null;
  const want: [RivalKind, Ghost | null][] = [['best', best], ['last', last], ['bot', bot]];
  const key = want.map(([k, g]) => (g ? `${k}${g.lap}` : '')).join(',') + track.value.length;
  if (key === rivalsFor) return;
  rivalsFor = key;
  rivals = want.filter((w): w is [RivalKind, Ghost] => !!w[1]).map(([kind, g]) => ({ kind, rival: makeRival(RIVAL_NAMES[kind], g, track.value) }));
}

/** Fly the autopilot rival for this track in the background, once, a few ms per frame. */
function queueBotLap(): void {
  const key = botKey();
  if (!rivalBot.value || !onTrack() || gameMode.value === 'proving' || botLaps.has(key) || botFlying === key) return;
  clearTimeout(botPending);
  botFlying = key;
  const cfg = simConfig();
  const fly = flyBotLap(cfg, botTargets(cfg.course), loop.step, 600, botParams(rivalBotRoute.value));
  const slice = () => {
    if (key !== botKey()) {
      botFlying = '';
      return;
    }
    const t0 = performance.now();
    while (performance.now() - t0 < 4) {
      const r = fly.next();
      if (r.done) {
        botLaps.set(key, r.value);
        botFlying = '';
        return;
      }
    }
    botPending = setTimeout(slice, 0);
  };
  botPending = setTimeout(slice, 200);
}

const ghostRec = new GhostRecorder();
/** the run since the last spawn, for replays and bug reports */
let recorder: Recorder | null = null;
/** a recording being played back */
let replay: { rec: Recording; player: Player; playing: boolean; speed: number } | null = null;

function spawnFor(t: number, speed: number): Spawn {
  if (!onTrack()) return { s: 0, speed };
  const L = track.value.length;
  // t = 0 spawns a little behind the line so crossing it starts the clock
  return { s: t === 0 ? -Math.min(30, L * 0.05) : t * L, speed };
}

/** Put the ship at a spawn point (fraction of the lap on a track; origin in free mode). */
function respawn(t = spawnT.value, speed = spawnSpeed.value, at?: Spawn): void {
  juice.reset();
  ghostRec.reset();
  const spawn = at ?? spawnFor(t, speed);
  spawnSim(sim, onTrack() ? track.value : null, spawn, raceLaps.value);
  race = sim.race;
  ghost = null;
  if (race) {
    try {
      const best = JSON.parse(localStorage.getItem(bestKey()) ?? 'null');
      if (best && typeof best.lap === 'number' && Array.isArray(best.splits)) {
        race.bestLap = best.lap;
        race.bestSplits = best.splits;
      }
      ghost = parseGhost(JSON.parse(localStorage.getItem(ghostKey()) ?? 'null'));
    } catch {
      /* ignore a corrupt record */
    }
    savedBest = race.bestLap;
  }
  startGhosts = { best: ghost, last: lastLaps.get(bestKey()) ?? null };
  outcome = null;
  recorder = replay ? null : new Recorder(vars.snapshot(), spawn, loop.step);
  queueBotLap();
}

// --- replay ----------------------------------------------------------------
const simConfig = (): SimConfig => {
  const g = gauntlet.value;
  const pc = provingCourse.value;
  return {
    ship: params(),
    walls: walls(),
    track: onTrack() ? track.value : null,
    course:
      g || pc || track.value.branches?.length
        ? {
            gauntlet: g ?? undefined,
            proving: pc ? { course: pc, rules: provingRules() } : undefined,
            nearMiss: nearMissDistance.value,
            pit: { refill: pitRefill.value, speed: pitSpeed.value },
          }
        : undefined,
  };
};

// --- proving ladder ----------------------------------------------------------
const LADDER_KEY = 'kocmoc.proving.ladder';
function loadLadder(): Ladder {
  try {
    return parseLadder(JSON.parse(localStorage.getItem(LADDER_KEY) ?? 'null'));
  } catch {
    return {};
  }
}
let ladder = loadLadder();
/** the finished proving run, folded into the ladder once */
let outcome: RunOutcome | null = null;
const shipPreset = presets.find((x) => x.id === 'feel/balanced');
/** Ship preset in use (light/balanced/heavy), null when the ship is custom-tuned. */
function currentShip(): string | null {
  const snap = vars.snapshot();
  const active = activePreset(vars, 'preset:feel');
  const name = active ? active.name : Object.keys(snap['preset:feel'] ?? {}).length === 0 ? 'balanced' : null;
  const user = snap.user ?? {};
  if (shipPreset && Object.keys(shipPreset.vars).some((k) => k in user)) return null;
  return name;
}
/** Load ladder level `n` flown in ship preset `ship` (drops your own tuning of the ship's vars). */
function playLevel(n: number, ship: string): void {
  const sc = levelScenario(n, scenarios);
  const preset = presets.find((x) => x.id === `feel/${ship}`);
  if (!sc || !preset) return;
  const user = vars.snapshot().user ?? {};
  const drop = Object.keys(preset.vars).filter((k) => k in user);
  if (drop.length) vars.change(drop.map((path) => ({ layer: 'user', path, before: user[path], after: undefined })));
  applyPreset(vars, preset);
  applyScenario(vars, sc);
}
const levels = createLevels({ ladder: () => ladder, ship: currentShip, play: playLevel });

// --- race tracks -------------------------------------------------------------
/** The venue whose scenario is loaded as it ships (none once you've loaded something else). */
function currentVenue(): string | null {
  const layer = vars.snapshot().scenario ?? {};
  const keys = Object.keys(layer);
  const hit = venues().find((sc) => {
    const data = scenarioLayer(sc);
    return keys.length === Object.keys(data).length && keys.every((k) => valueEquals(layer[k], data[k]));
  });
  return hit?.name ?? null;
}
const tracks = createTracks({ venues: () => venues(), current: currentVenue, play: (sc) => applyScenario(vars, sc) });

/** Start a recording from its spawn and fast-forward to `tick`. */
function seekReplay(tick: number): void {
  if (!replay) return;
  respawn(0, 0, replay.rec.spawn);
  replay.player = new Player(replay.rec);
  const cfg = simConfig();
  const step = replay.rec.step;
  while (replay.player.tick < tick && replay.player.next(controls)) {
    stepSim(sim, controls, cfg, step);
    if (race) race.events.length = 0;
  }
  loop.reset();
}

function playRecording(rec: Recording): void {
  replay = { rec, player: new Player(rec), playing: true, speed: 1 };
  vars.restore(rec.layers); // may respawn via the effect below; seek spawns again from the recording
  seekReplay(0);
}

function exitReplay(): void {
  replay = null;
  respawn();
}

function download(name: string, data: unknown): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function saveRepro(note?: string): void {
  const rec = replay ? { ...replay.rec, ticks: replay.player.tick, note: note ?? replay.rec.note } : recorder?.finish({ note });
  if (!rec) return;
  if (replay) {
    // trim the inputs to the current tick so the bundle ends where you are
    let left = rec.ticks;
    const inputs: number[][] = [];
    for (const r of replay.rec.inputs) {
      if (left <= 0) break;
      inputs.push([Math.min(r[0], left), ...r.slice(1)]);
      left -= r[0];
    }
    rec.inputs = inputs;
  }
  download(`kocmoc-repro-${seedVar.value}-${rec.ticks}.json`, rec);
}

session.replayRun = () => {
  const rec = recorder?.finish();
  if (rec && rec.ticks > 0) playRecording(rec);
};
session.saveRepro = saveRepro;
session.playRecording = playRecording;

const replayBar = createReplayBar({
  toggle: () => replay && (replay.playing = !replay.playing),
  seek: (t) => seekReplay(t),
  speed: (x) => replay && (replay.speed = x),
  save: () => saveRepro(),
  exit: exitReplay,
});

// new track or mode → start over
effect(() => {
  void track.value;
  void gameMode.value;
  void gauntlet.value;
  void provingCourse.value;
  void raceLaps.value;
  if (!replay) respawn();
});
effect(() => {
  if (rivalBot.value) queueBotLap();
});
// keep ?seed= in the address bar on a track, so the URL names it
effect(() => {
  const url = new URL(location.href);
  if (onTrack()) url.searchParams.set('seed', String(seedVar.value));
  else url.searchParams.delete('seed');
  history.replaceState(null, '', url.pathname + url.search + url.hash);
});

setSpawnHandler(({ trackT, speed }) => respawn(trackT, speed));
setSpawnSource(() => ({
  trackT: race ? (race.near.s / track.value.length) : 0,
  speed: curr.vel.length(),
}));
const urlScenario = urlParams.get('scenario');
if (urlScenario) {
  const sc = scenarios.find((x) => x.name === urlScenario);
  if (sc) applyScenario(vars, sc);
  else console.warn(`kocmoc: no scenario named ${urlScenario}`);
}
// drop a scenario JSON on the page to load it
addEventListener('dragover', (e) => e.preventDefault());
addEventListener('drop', async (e) => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (!file) return;
  try {
    const raw = JSON.parse(await file.text());
    const rec = parseRecording(raw);
    if (rec) {
      playRecording(rec);
      return;
    }
    const sc = parseScenario(raw);
    if (sc) applyScenario(vars, sc);
    else console.warn('kocmoc: dropped file is not a scenario');
  } catch {
    console.warn('kocmoc: dropped file is not valid JSON');
  }
});

attachInput(renderer.domElement);
onKey(respawnKey, () => (replay ? seekReplay(0) : respawn()));
onKey(hudEditKey, () => hudEdit.set(!hudEdit.value));
onKey(autopilotKey, () => autopilot.set(!autopilot.value));
onKey(replayKey, () => (replay ? (replay.playing = !replay.playing) : session.replayRun()));
onKey(assistKey, () => assist.set(!assist.value));
onKey(cameraKey, cycleCamera);
onKey(cinematicKey, toggleCinematic);
onKey(vizKey, () => inputViz.set(!inputViz.value));
onKey(levelsKey, () => levels.toggle());
onKey(tracksKey, () => tracks.toggle());
onKey(nextLevelKey, () => {
  if (race?.proving?.result !== 'clear') return;
  playLevel(provingLevel.value + 1, currentShip() ?? 'balanced');
});
const levelsBtn = document.createElement('button');
levelsBtn.id = 'levels-btn';
levelsBtn.addEventListener('click', () => {
  levelsBtn.blur();
  levels.toggle();
});
document.body.appendChild(levelsBtn);
effect(() => {
  const codes = levelsKey.value.split(',').filter(Boolean);
  levelsBtn.textContent = codes.length ? `Levels (${keyLabel(codes[0].trim())})` : 'Levels';
});

const tracksBtn = document.createElement('button');
tracksBtn.id = 'tracks-btn';
tracksBtn.addEventListener('click', () => {
  tracksBtn.blur();
  tracks.toggle();
});
document.body.appendChild(tracksBtn);
effect(() => {
  const codes = tracksKey.value.split(',').filter(Boolean);
  tracksBtn.textContent = codes.length ? `Tracks (${keyLabel(codes[0].trim())})` : 'Tracks';
});

// controls panel (rebinding, invert pitch), lazy-loaded
let controlsUi: Promise<typeof import('./ui/controls')> | undefined;
const toggleControls = () => void (controlsUi ??= import('./ui/controls')).then((m) => m.toggle());
onKey(controlsKey, toggleControls);
const controlsBtn = document.createElement('button');
controlsBtn.id = 'controls-btn';
controlsBtn.addEventListener('click', () => {
  controlsBtn.blur(); // keep Space from re-clicking it
  toggleControls();
});
document.body.appendChild(controlsBtn);
effect(() => {
  const codes = controlsKey.value.split(',').filter(Boolean);
  controlsBtn.textContent = codes.length ? `Controls (${keyLabel(codes[0].trim())})` : 'Controls';
});

// on-screen sticks and buttons on touch screens, lazy-loaded
detectTouch();
let touchMod: Promise<typeof import('./ui/touch')> | undefined;
effect(() => {
  const on = touchUi.value;
  if (!on && !touchMod) return;
  void (touchMod ??= import('./ui/touch')).then((m) => {
    m.mount({
      respawn: () => respawn(),
      camera: cycleCamera,
      assist: () => assist.set(!assist.value),
      debug: () => void openDebug(),
      levels: () => levels.toggle(),
      tracks: () => tracks.toggle(),
    });
    m.show(on);
  });
});

let gizmoUi: ReturnType<typeof import('./debug/gizmos').createGizmos> | undefined;
let gizmoLoading = false;
effect(() => {
  if (gizmoLoading || !gizmos.some((g) => g.value)) return;
  gizmoLoading = true;
  void import('./debug/gizmos').then((m) => {
    gizmoUi = m.createGizmos({
      scene,
      ship: () => view,
      prevShip: () => prev,
      step: () => loop.step,
      track: () => (onTrack() ? track.value : null),
      near: () => race?.near ?? null,
      shipRadius: () => shipRadius.value,
    });
  });
});

let viz: Promise<typeof import('./debug/inputViz')> | undefined;
effect(() => {
  const on = inputViz.value;
  if (on || viz) void (viz ??= import('./debug/inputViz')).then((m) => m.show(on));
});

// --- watches ---------------------------------------------------------------
let fps = 0;
let frameMs = 0;
vars.watch('perf.fps', () => Math.round(fps), { tags: ['perf'] });
vars.watch('perf.frameMs', () => frameMs.toFixed(2), { tags: ['perf'], unit: 'ms' });
vars.watch('perf.drawCalls', () => renderer.info.render.calls, { tags: ['perf'] });
vars.watch('perf.triangles', () => renderer.info.render.triangles, { tags: ['perf'] });
vars.watch('sim.ticks', () => loop.ticks, { tags: ['sim'] });
vars.watch('ship.speed', () => curr.vel.length().toFixed(1), { tags: ['ship'], unit: 'm/s' });
vars.watch('ship.energy', () => curr.energy.toFixed(2), { tags: ['ship'] });
vars.watch('ship.pos', () => curr.pos.toArray().map((v) => v.toFixed(0)).join(', '), { tags: ['ship'] });
vars.watch('race.track.length', () => track.value.length.toFixed(0), { tags: ['race'], unit: 'm' });
vars.watch('race.track.attempts', () => track.value.attempts, { tags: ['race'], desc: 'layouts tried before one passed the checks' });
vars.watch('race.progress', () => (race ? (race.near.s / track.value.length).toFixed(3) : '–'), { tags: ['race'] });
vars.watch('race.wallDist', () => (race ? (race.loc.radius - race.near.dist).toFixed(1) : '–'), { tags: ['race'], unit: 'm', desc: 'distance to the wall' });
vars.watch('race.wallHits', () => race?.wallHits ?? 0, { tags: ['race'] });
vars.watch('race.obstacleHits', () => race?.obstacleHits ?? 0, { tags: ['race', 'gauntlet'] });
vars.watch('proving.timeLeft', () => (race?.proving ? race.proving.timeLeft.toFixed(1) : '–'), { tags: ['proving'], unit: 's' });
vars.watch('proving.gates', () => (race?.proving ? `${race.proving.hits} hit, ${race.proving.misses} missed of ${provingCourse.value?.gates.length ?? 0}` : '–'), { tags: ['proving'] });
vars.watch('race.oobResets', () => race?.oobResets ?? 0, { tags: ['race'], desc: 'times out of bounds put the ship back (open space)' });
vars.watch('gauntlet.chunks', () => gauntlet.value?.chunks.length ?? 0, { tags: ['gauntlet'] });
vars.watch('gauntlet.chunk', () => {
  const g = gauntlet.value;
  const c = g && race && g.chunks.find((x) => race!.near.s >= x.s0 && race!.near.s < x.s1);
  return c ? `${c.kind} ${(c.difficulty * 100).toFixed(0)}%` : '–';
}, { tags: ['gauntlet'], desc: 'chunk under the ship and its difficulty' });

// --- frame -----------------------------------------------------------------
const _scrape = new THREE.Vector3();
const _gate = new THREE.Vector3();

function provingHud(r: RaceState): ProvingHud | null {
  const ps = r.proving;
  const pc = provingCourse.value;
  if (!ps || !pc) return null;
  const rules = provingRules();
  const ship = currentShip();
  return {
    level: provingLevel.value,
    timeLeft: ps.timeLeft,
    gates: pc.gates.length,
    hits: ps.hits,
    misses: ps.misses,
    beacons: pc.beacons.length,
    collected: ps.collected,
    result: ps.result,
    score: ps.score,
    weights: { time: rules.scoreTime, gate: rules.scoreGate, beacon: rules.scoreBeacon },
    best: ship ? (ladder[ship]?.best[provingLevel.value] ?? null) : null,
    newBest: !!outcome?.newBest,
    badge: !!outcome?.badge,
    ship,
  };
}
/** hidden routes flown this session (track key # branch), shown on the minimap from then on */
const foundRoutes = new Set<string>();
function branchColors(): (string | null)[] {
  const bs = track.value.branches ?? [];
  const key = bs.some((b) => b.kind === 'hidden') ? bestKey() : '';
  return bs.map((b, k) => (b.kind === 'hidden' ? (foundRoutes.has(`${key}#${k}`) ? '#8a7fb0' : null) : routeColors[b.kind].value));
}
/** The route you're on, or the marked fork coming up. */
function routeHud(r: RaceState): { text: string; color: string } | null {
  const bs = track.value.branches;
  if (!bs?.length) return null;
  const color = (k: keyof typeof ROUTE_NAMES) => (k === 'hidden' ? '#ffffff' : routeColors[k].value);
  if (r.loc.route >= 0) {
    const k = bs[r.loc.route].kind;
    return { text: ROUTE_NAMES[k], color: color(k) };
  }
  const next = forkAhead(track.value, r.near.s, 450);
  return next && next.kind !== 'hidden' ? { text: `FORK · ${ROUTE_NAMES[next.kind]}`, color: color(next.kind) } : null;
}
let last = performance.now();
renderer.setAnimationLoop((now) => {
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  fps += (1 / Math.max(dt, 1e-4) - fps) * 0.05;
  const t0 = performance.now();

  const cfg = simConfig();
  const warp = juice.timeScale(paused.value ? 0 : dt);
  const playing = !replay || (replay.playing && !replay.player.done);
  const speedX = replay ? replay.speed : 1;
  const alpha = loop.advance(paused.value || !playing ? 0 : dt * timeScale.value * warp * speedX, (step) => {
    if (replay) {
      if (!replay.player.next(controls)) return;
    } else {
      if (autopilot.value && race) botControls(curr, track.value, race.near, race.time, controls, botTargets(cfg.course), botParams(botRoute.value), race.loc.route);
      else sampleInput(controls, step);
      quantize(controls);
      recorder?.push(controls);
    }
    stepSim(sim, controls, cfg, step);
    if (race && !replay) {
      const lap = ghostRec.update(race, curr);
      if (lap) lastLaps.set(bestKey(), lap);
      // a new best lap becomes the ghost for this track
      if (lap && race.bestLap === lap.lap) {
        ghost = lap;
        try {
          localStorage.setItem(ghostKey(), JSON.stringify(lap));
        } catch {
          /* storage full: keep it for this session only */
        }
      }
    }
  });
  replayBar.update({
    active: !!replay,
    playing: !!replay && replay.playing && !replay.player.done,
    tick: replay?.player.tick ?? 0,
    ticks: replay?.rec.ticks ?? 0,
    step: replay?.rec.step ?? loop.step,
  });
  // wall contact point (for sparks), and effects for what happened this frame
  let scrape: THREE.Vector3 | null = null;
  if (race?.contact) scrape = _scrape.subVectors(curr.pos, race.near.point).setLength(race.loc.radius).add(race.near.point);
  if (race) {
    for (const e of race.events) {
      if (e.type === 'route' && e.kind === 'hidden') foundRoutes.add(`${bestKey()}#${e.branch}`);
      const at = e.type === 'hit' ? (e.what === 'wall' ? (scrape ?? curr.pos) : race.obstacle.point) : undefined;
      juice.event(e, curr, at);
      cameraEvent(e.type);
    }
    race.events.length = 0;
  }
  // a finished proving run counts once on the ladder (not while watching a replay)
  if (race?.proving?.result && !outcome) {
    const ship = currentShip();
    outcome = { ladder, newBest: false, badge: false };
    if (!replay && ship) {
      outcome = recordRun(ladder, ship, provingLevel.value, race.proving.score, race.proving.result === 'clear');
      if (outcome.ladder !== ladder) {
        ladder = outcome.ladder;
        try {
          localStorage.setItem(LADDER_KEY, JSON.stringify(ladder));
        } catch {
          /* storage full: progress lasts this session */
        }
      }
    }
  }
  if (race && !replay && race.bestLap !== null && race.bestLap !== savedBest) {
    savedBest = race.bestLap;
    localStorage.setItem(bestKey(), JSON.stringify({ lap: race.bestLap, splits: race.bestSplits }));
  }
  lerpShip(view, prev, curr, alpha);

  sun.color.set(lightColor.value);
  sun.intensity = lightIntensity.value;
  sun.position.fromArray(lightDir.value);
  amb.intensity = ambient.value;
  field.update(gameMode.value === 'free');
  raceScene.update();
  sceneryScene.update();
  // rivals fly on race time in a race (lapping their one lap), on lap time in practice
  refreshRivals();
  const colors: Record<RivalKind, string> = { best: ghostColor.value, last: rivalLastColor.value, bot: rivalBotColor.value };
  for (const k of Object.keys(rivalModels) as RivalKind[]) {
    rivalModels[k].model.visible = false;
    rivalModels[k].mat.color.set(colors[k]);
    rivalModels[k].mat.opacity = ghostOpacity.value;
  }
  const L = track.value.length;
  const racing = !!race && race.laps > 0;
  if (race?.started) {
    const lerp = race.finished ? 0 : (1 - alpha) * loop.step;
    const t = (racing ? race.raceTime : race.lapTime) - lerp;
    for (const { kind, rival } of rivals) {
      const m = rivalModels[kind].model;
      const gl = rival.ghost.lap;
      if (racing && t >= race.laps * gl) continue;
      m.visible = sampleGhost(rival.ghost, racing ? t % gl : t, m.position, m.quaternion);
    }
  }
  gauntletScene.update(race ? race.time - (1 - alpha) * loop.step : 0);
  provingScene.update(race ? race.time : 0, race?.proving ?? null);
  gizmoUi?.update();

  shipModel.object.position.copy(view.pos);
  shipModel.object.quaternion.copy(view.quat);
  // replays are shown through the cinematic director unless turned off
  const rig = replay && cineReplay.value ? 'cinematic' : camMode.value;
  shipModel.object.visible = rig !== 'cockpit';
  shipModel.update(view.boosting ? 1 : Math.max(0, controls.thrust));
  const rect = viewports.mainRect();
  if (camera.aspect !== rect.w / rect.h) {
    camera.aspect = rect.w / rect.h;
    camera.updateProjectionMatrix();
  }
  cineScene.track = race ? track.value : null;
  cineScene.near = race?.near ?? null;
  cineScene.route = race?.loc.route ?? -1;
  updateCamera(camera, view, dt, zoom.value, rig);
  letterboxUi.update(rig === 'cinematic', rect);
  juice.frame({ dt, camera, ship: view, shipModel: shipModel.object, maxSpeed: p.maxSpeed.value, chase: rig === 'chase' || rig === 'far', scrape });

  const hint =
    pointerMode.value === 'stick' && !inputDebug.captured && !touchUi.value
      ? 'Click to steer with the touchpad · arrows/WASD to fly'
      : '';
  const raceHud = race && {
    lap: race.lap,
    started: race.started,
    lapTime: race.lapTime,
    lastLap: race.lastLap,
    bestLap: race.bestLap,
    delta: splitDelta(race),
    checkpoint: race.splits.length,
    checkpoints: track.value.checkpoints.length,
    seed: seedVar.value,
    laps: race.laps,
    raceTime: race.raceTime,
    finished: race.finished,
    finishTime: race.finishTime,
    lapTimes: race.lapTimes,
    standings: race.started && rivals.length
      ? racing
        ? race.finished
          ? standings(rivals.map((x) => x.rival), race.laps * L, race.finishTime!, L, race.laps)
          : standings(rivals.map((x) => x.rival), Math.min(raceDistance(race, L), race.laps * L), race.raceTime, L, race.laps)
        : standings(rivals.map((x) => x.rival), race.along, race.lapTime, L, 1)
      : null,
    rivalTimes: racing && !race.proving ? rivals.map((x) => ({ name: x.rival.name, time: x.rival.ghost.lap * race!.laps })) : [],
    oob: race.oob > 0 ? Math.max(0, oobTime.value - race.oob) : null,
    route: routeHud(race),
    proving: provingHud(race),
  };
  const keyOf = (k: { value: string }) => keyLabel(k.value.split(',')[0]?.trim() ?? '');
  const again = race?.proving
    ? touchUi.value
      ? 'tap respawn to fly again · LEVELS for the ladder'
      : `${keyOf(respawnKey)} retry${race.proving.result === 'clear' ? ` · ${keyOf(nextLevelKey)} next level` : ''} · ${keyOf(levelsKey)} levels`
    : touchUi.value
      ? 'tap respawn to race again'
      : `${keyOf(respawnKey)} to race again`;
  hud.update(view, { assist: assist.value, cam: rig, cruise: inputDebug.cruise, hint, race: raceHud, again });

  hudLayout.update({
    camera,
    shipPos: view.pos,
    shipQuat: view.quat,
    track: onTrack() ? track.value : null,
    nextCp: race?.started ? (race.nextCp === 0 ? 0 : track.value.checkpoints[race.nextCp]) : race ? 0 : null,
    target: race?.proving && provingCourse.value && !race.proving.result ? nextGatePoint(provingCourse.value, race.proving, _gate) : null,
    branchColors: onTrack() ? branchColors() : [],
  });
  sky.update(camera, renderer.getPixelRatio());
  renderer.info.reset();
  pipeline.render(scene, camera, layout.value === 'single' ? undefined : rect);
  viewports.render(view, dt);
  frameMs = performance.now() - t0;
});

// --- debug tools (lazy-loaded) ---------------------------------------------
let debug: Promise<typeof import('./debug')> | undefined;
const openDebug = (force?: boolean) => (debug ??= import('./debug')).then((m) => m.toggle(force));

addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' && !(isTyping(e) && (e.target as HTMLElement).closest('#kocmoc-debug') === null)) {
    e.preventDefault();
    if (document.pointerLockElement) document.exitPointerLock();
    void openDebug();
  }
});
if (new URLSearchParams(location.search).has('debug')) void openDebug(true);
