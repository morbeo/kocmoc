// Read-only values shown in the debug panel (perf, ship, race, proving, gauntlet).
import { vars } from '../core/vars';
import { track } from '../world/race';
import { gauntlet } from '../world/gauntlet';
import { provingCourse } from '../world/proving';
import type { Game } from './game';

export function addWatches(g: Game): void {
  const { renderer } = g.stage;
  const { curr, loop } = g;
  vars.watch('perf.fps', () => Math.round(g.perf.fps), { tags: ['perf'] });
  vars.watch('perf.frameMs', () => g.perf.frameMs.toFixed(2), { tags: ['perf'], unit: 'ms' });
  vars.watch('perf.drawCalls', () => renderer.info.render.calls, { tags: ['perf'] });
  vars.watch('perf.triangles', () => renderer.info.render.triangles, { tags: ['perf'] });
  vars.watch('sim.ticks', () => loop.ticks, { tags: ['sim'] });
  vars.watch('ship.speed', () => curr.vel.length().toFixed(1), { tags: ['ship'], unit: 'm/s' });
  vars.watch('ship.energy', () => curr.energy.toFixed(2), { tags: ['ship'] });
  vars.watch('ship.pos', () => curr.pos.toArray().map((v) => v.toFixed(0)).join(', '), { tags: ['ship'] });
  vars.watch('race.track.length', () => track.value.length.toFixed(0), { tags: ['race'], unit: 'm' });
  vars.watch('race.track.attempts', () => track.value.attempts, { tags: ['race'], desc: 'layouts tried before one passed the checks' });
  vars.watch('race.progress', () => (g.race ? (g.race.near.s / track.value.length).toFixed(3) : '–'), { tags: ['race'] });
  vars.watch('race.wallDist', () => (g.race ? (g.race.loc.radius - g.race.near.dist).toFixed(1) : '–'), { tags: ['race'], unit: 'm', desc: 'distance to the wall' });
  vars.watch('race.wallHits', () => g.race?.wallHits ?? 0, { tags: ['race'] });
  vars.watch('race.obstacleHits', () => g.race?.obstacleHits ?? 0, { tags: ['race', 'gauntlet'] });
  vars.watch('proving.timeLeft', () => (g.race?.proving ? g.race.proving.timeLeft.toFixed(1) : '–'), { tags: ['proving'], unit: 's' });
  vars.watch('proving.gates', () => (g.race?.proving ? `${g.race.proving.hits} hit, ${g.race.proving.misses} missed of ${provingCourse.value?.gates.length ?? 0}` : '–'), { tags: ['proving'] });
  vars.watch('race.oobResets', () => g.race?.oobResets ?? 0, { tags: ['race'], desc: 'times out of bounds put the ship back (open space)' });
  vars.watch('gauntlet.chunks', () => gauntlet.value?.chunks.length ?? 0, { tags: ['gauntlet'] });
  vars.watch('gauntlet.chunk', () => {
    const gt = gauntlet.value;
    const race = g.race;
    const c = gt && race && gt.chunks.find((x) => race.near.s >= x.s0 && race.near.s < x.s1);
    return c ? `${c.kind} ${(c.difficulty * 100).toFixed(0)}%` : '–';
  }, { tags: ['gauntlet'], desc: 'chunk under the ship and its difficulty' });
}
