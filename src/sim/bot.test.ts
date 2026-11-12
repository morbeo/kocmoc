import { describe, it, expect } from 'vitest';
import { Quaternion, Vector3 } from 'three';
import { generateTrack, nearestOnTrack, type RaceGenParams, type Track } from '../gen/track';
import type { Gauntlet, Plane } from '../gen/gauntlet';
import type { Branch } from '../gen/routes';
import type { ProvingCourse } from '../gen/proving';
import { newShip, noControls, type ShipState } from './ship';
import { spawnOnTrack } from './race';
import { BOT_ROUTES, botBranch, botControls, botTargets, defaultBot, takesBranch, type BotCourse } from './bot';

const gen: RaceGenParams = {
  seed: 3,
  points: 10,
  radius: 300,
  wobble: 0.3,
  height: 60,
  twist: 0,
  twistNoise: 0,
  tubeRadius: 20,
  spacing: 4,
  checkpoints: 4,
};
const track = generateTrack(gen);

/** A ship on the centreline at `s`, nose along the track, flying `speed`; `right`/`up` shift it across. */
function shipAt(s: number, speed: number, right = 0, up = 0): ShipState {
  const ship = newShip();
  spawnOnTrack(ship, track, s, speed);
  const i = Math.min(track.pos.length - 1, Math.floor((s / track.length) * track.pos.length));
  ship.pos.addScaledVector(track.right[i], right).addScaledVector(track.up[i], up);
  return ship;
}
const fly = (ship: ShipState, course: BotCourse | null = null, time = 0, p = defaultBot) =>
  botControls(ship, track, nearestOnTrack(track, ship.pos), time, noControls(), course, p);
/** the straightest stretch of the loop: where the autopilot on the centreline steers least */
const S = (() => {
  let best = 0;
  let least = Infinity;
  for (let s = 0; s < track.length - 300; s += 5) {
    const c = fly(shipAt(s, 60));
    const turn = Math.abs(c.yaw) + Math.abs(c.pitch);
    if (turn < least) [least, best] = [turn, s];
  }
  return best;
})();
const hole = (s: number, r: number, a0: number, gap: number): Plane => ({ kind: 'ring', s, thickness: 0.2, shape: { k: 'hole', r, a0, omega: 0, gap } });
const course = (planes: Plane[], lanes: Gauntlet['lanes'] = []): BotCourse => ({ planes, lanes });

describe('botTargets', () => {
  const g: Gauntlet = { chunks: [], planes: [hole(50, 0, 0, 4)], rocks: [], lanes: [{ s0: 10, s1: 20, x: 1, y: 2 }] };
  const gate = (s: number, x: number, y: number, r: number, reverse = false) => ({ s, x, y, r, reverse, pattern: 'slalom' as const, group: 0 });

  it('is null with no course, and the gauntlet itself without proving gates', () => {
    expect(botTargets(undefined)).toBeNull();
    expect(botTargets({})).toBeNull();
    expect(botTargets({ gauntlet: g })).toBe(g);
  });

  it('turns forward gates into still holes the size of their opening, sorted with the gauntlet planes, reverse gates left out', () => {
    const pc: ProvingCourse = { gates: [gate(80, 3, 4, 2.5), gate(30, 0, -2, 3, true), gate(20, -1, 0, 4)], beacons: [] };
    const out = botTargets({ gauntlet: g, proving: { course: pc } })!;
    expect(out.planes.map((p) => p.s)).toEqual([20, 50, 80]);
    expect(out.planes[2].shape).toEqual({ k: 'hole', r: 5, a0: Math.atan2(4, 3), omega: 0, gap: 2.5 });
    expect(out.lanes).toBe(g.lanes);
  });

  it('builds once per course, again when the gauntlet\'s lanes change; no gauntlet means no lanes', () => {
    const pc: ProvingCourse = { gates: [gate(40, 0, 0, 3)], beacons: [] };
    const a = botTargets({ proving: { course: pc } })!;
    expect(a.lanes).toEqual([]);
    expect(botTargets({ proving: { course: pc } })).toBe(a);
    const b = botTargets({ gauntlet: g, proving: { course: pc } })!;
    expect(b).not.toBe(a);
    expect(b.planes).toHaveLength(2);
    expect(botTargets({ gauntlet: g, proving: { course: pc } })).toBe(b);
  });
});

describe('route choice', () => {
  const branch = (kind: Branch['kind'], s0 = 100, s1 = 300): Branch =>
    ({ kind, s0, s1, length: 220, open0: 40, open1: 180, pos: [], tan: [], up: [], right: [], s: [], rad: [], radius: 10 }) as unknown as Branch;

  it('takesBranch: main never, shortcut the shortcuts and hidden ones, long the long ways, splits and pit lane, any all', () => {
    const kinds = ['shortcut', 'long', 'split', 'hidden', 'pit'] as const;
    const take = (route: Parameters<typeof takesBranch>[0]) => kinds.filter((k) => takesBranch(route, branch(k), 0));
    expect(take('main')).toEqual([]);
    expect(take('shortcut')).toEqual(['shortcut', 'hidden']);
    expect(take('long')).toEqual(['long', 'split', 'pit']);
    expect(take('any')).toEqual([...kinds]);
    expect(BOT_ROUTES).toContain('random');
  });

  it('random picks per fork, the same every time, and takes some and leaves some', () => {
    const picks = Array.from({ length: 16 }, (_, k) => takesBranch('random', branch('long'), k));
    expect(Array.from({ length: 16 }, (_, k) => takesBranch('random', branch('long'), k))).toEqual(picks);
    expect(picks).toContain(true);
    expect(picks).toContain(false);
  });

  it('botBranch: stays on a branch until past its merge, turns into a chosen one only before its mouth', () => {
    const t = { ...track, branches: [branch('shortcut'), branch('long', 400, 600)] } as Track;
    expect(botBranch(track, 0, 10, -1, 'any')).toBe(-1); // no branches
    expect(botBranch(t, 150, 250, 0, 'main')).toBe(0); // on branch 0, target before its merge
    expect(botBranch(t, 150, 350, 0, 'main')).toBe(-1); // target past it: back on the loop
    expect(botBranch(t, 100, 150, -1, 'shortcut')).toBe(0);
    expect(botBranch(t, 100, 150, -1, 'main')).toBe(-1);
    expect(botBranch(t, 100, 450, -1, 'long')).toBe(1);
    expect(botBranch(t, 100, 50, -1, 'any')).toBe(-1); // target before the fork
    // the mouth: 90% of the way to where the branch tube is clear (open0 / length of s0..s1)
    const mouth = 100 + (40 / 220) * 200 * 0.9;
    expect(botBranch(t, mouth - 1, 150, -1, 'any')).toBe(0);
    expect(botBranch(t, mouth + 1, 150, -1, 'any')).toBe(-1);
  });
});

describe('botControls', () => {
  it('on the centreline, nose along: straight ahead, no strafe or lift, thrust up to cruise, never boost', () => {
    const c = fly(shipAt(S, 20));
    expect(Math.abs(c.yaw)).toBeLessThan(0.3);
    expect(Math.abs(c.pitch)).toBeLessThan(0.3);
    expect(Math.abs(c.roll)).toBeLessThan(0.05);
    expect([c.strafe, c.lift]).toEqual([0, 0]);
    expect(c.thrust).toBe(1);
    expect(c.boost).toBe(false);
  });

  it('far over cruise speed it brakes; a slower cruise eases off sooner', () => {
    expect(fly(shipAt(S, 300)).thrust).toBe(-1);
    // the speed at which it stops pushing full thrust
    const easesAt = (speed: number) => {
      for (let v = 0; v < 300; v++) if (fly(shipAt(S, v), null, 0, { ...defaultBot, speed }).thrust < 1) return v;
      return 300;
    };
    expect(easesAt(60)).toBeLessThan(easesAt(110));
  });

  it('flying backwards counts as negative speed: full thrust', () => {
    const ship = shipAt(S, 0);
    ship.vel.set(0, 0, 40).applyQuaternion(ship.quat); // +Z is backwards for a ship looking down -Z
    expect(fly(ship).thrust).toBe(1);
  });

  it('steers back to the centreline from either side, and rolls back level', () => {
    const fromRight = fly(shipAt(S, 60, 12));
    const fromLeft = fly(shipAt(S, 60, -12));
    expect(fromRight.yaw).toBeLessThan(fromLeft.yaw);
    expect(Math.sign(fromRight.yaw)).toBe(-Math.sign(fromLeft.yaw));
    const rolled = shipAt(S, 60);
    rolled.quat.multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, -1), 0.5));
    expect(Math.abs(fly(rolled).roll)).toBeGreaterThan(0.5);
  });

  it('lines up on a gap close ahead with strafe and lift, slowing for it', () => {
    const ship = shipAt(S, 60);
    const gap = course([hole(S + 20, 6, 0, 3)]); // the hole sits 6 m to the right of the centreline
    const c = fly(ship, gap);
    expect(c.strafe).toBeGreaterThan(0);
    expect(Math.abs(c.lift)).toBeLessThan(Math.abs(c.strafe));
    const up = fly(ship, course([hole(S + 20, 6, Math.PI / 2, 3)]));
    expect(up.lift).toBeGreaterThan(0);
    expect(c.thrust).toBeLessThan(fly(ship).thrust);
  });

  it('a gap further ahead is aimed at but not strafed onto; planes behind and far beyond are ignored', () => {
    const ship = shipAt(S, 60);
    const far = fly(ship, course([hole(S + 50, 6, 0, 3)]));
    expect([far.strafe, far.lift]).toEqual([0, 0]);
    const behind = fly(ship, course([hole(S - 10, 6, 0, 3), hole(S + 400, 6, 0, 3)]));
    expect(behind).toEqual(fly(ship));
  });

  it('backs off when a solid wall is just ahead and the ship is not in the gap', () => {
    const wall = course([hole(S + 5, 8, 0, 2)]);
    expect(fly(shipAt(S, 2), wall).thrust).toBe(-1);
    // in the gap: it pushes on
    expect(fly(shipAt(S, 2, 8), wall).thrust).toBe(1);
  });

  it('through a debris field it follows the clear lane, at obstacle speed', () => {
    const ship = shipAt(S, 100);
    const lane = course([], [{ s0: S - 20, s1: S + 60, x: 10, y: 0 }]);
    const inLane = fly(ship, lane);
    expect(inLane.yaw).toBeGreaterThan(fly(ship).yaw);
    expect(inLane.thrust).toBeLessThan(fly(ship).thrust);
    expect([inLane.strafe, inLane.lift]).toEqual([0, 0]);
    // a lane already passed changes nothing
    expect(fly(ship, course([], [{ s0: S - 200, s1: S - 100, x: 10, y: 0 }]))).toEqual(fly(ship));
  });

  it('writes into the controls it is given and returns them', () => {
    const ship = shipAt(S, 40);
    const out = noControls();
    expect(botControls(ship, track, nearestOnTrack(track, ship.pos), 0, out)).toBe(out);
  });
});
