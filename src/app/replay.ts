// Replays of a run: play one back, seek in it, save it as a repro bundle.
import { vars } from '../core/vars';
import { session } from '../core/session';
import { Player, trimInputs, type Recording } from '../sim/replay';
import { stepSim } from '../sim/world';
import { seedVar } from '../world/race';
import { createReplayBar } from '../ui/replayBar';
import { respawn, type Game } from './game';
import { simConfig } from './tuning';

export type Replays = ReturnType<typeof createReplays>;

function download(name: string, data: unknown): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function createReplays(g: Game) {
  /** Start a recording from its spawn and fast-forward to `tick`. */
  function seek(tick: number): void {
    const replay = g.replay;
    if (!replay) return;
    respawn(g, 0, 0, replay.rec.spawn);
    replay.player = new Player(replay.rec);
    const cfg = simConfig();
    const step = replay.rec.step;
    while (replay.player.tick < tick && replay.player.next(g.controls)) {
      stepSim(g.sim, g.controls, cfg, step);
      if (g.race) g.race.events.length = 0;
    }
    g.loop.reset();
  }

  function play(rec: Recording): void {
    g.replay = { rec, player: new Player(rec), playing: true, speed: 1 };
    vars.restore(rec.layers); // may respawn via the restart effect; seek spawns again from the recording
    seek(0);
  }

  function exit(): void {
    g.replay = null;
    respawn(g);
  }

  function saveRepro(note?: string): void {
    const replay = g.replay;
    const rec = replay ? { ...replay.rec, ticks: replay.player.tick, note: note ?? replay.rec.note } : g.recorder?.finish({ note });
    if (!rec) return;
    // trim the inputs to the current tick so the bundle ends where you are
    if (replay) rec.inputs = trimInputs(replay.rec.inputs, rec.ticks);
    download(`kocmoc-repro-${seedVar.value}-${rec.ticks}.json`, rec);
  }

  session.replayRun = () => {
    const rec = g.recorder?.finish();
    if (rec && rec.ticks > 0) play(rec);
  };
  session.saveRepro = saveRepro;
  session.playRecording = play;

  const bar = createReplayBar({
    toggle: () => g.replay && (g.replay.playing = !g.replay.playing),
    seek: (t) => seek(t),
    speed: (x) => g.replay && (g.replay.speed = x),
    save: () => saveRepro(),
    exit,
  });

  return { seek, play, exit, bar };
}
