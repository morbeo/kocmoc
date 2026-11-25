// The tuning vars main.ts owns (render, time, ship feel, race, rivals, debug), and the
// sim config built from them. They register on import; persistence is restored after.
import { vars } from '../core/vars';
import type { ShipParams } from '../sim/ship';
import type { SimConfig } from '../sim/world';
import type { WallParams } from '../sim/race';
import { BOT_ROUTES, defaultBot, type BotRoute } from '../sim/bot';
import { gauntlet, nearMissDistance, shipRadius } from '../world/gauntlet';
import { movers, padEffect, padLanes, pads } from '../world/pads';
import { onTrack, oobTime, openSpace, track } from '../world/race';
import { provingCourse, provingRules } from '../world/proving';

// --- render ------------------------------------------------------------------
export const lightColor = vars.color('render.light.color', '#ffffff', { tags: ['render'] });
export const lightIntensity = vars.num('render.light.intensity', 3, { min: 0, max: 10, hardMin: 0, tags: ['render'] });
export const lightDir = vars.vec3('render.light.dir', [1, 1.5, 1], { tags: ['render'], desc: 'direction towards the light' });
export const ambient = vars.num('render.ambient', 0.25, { min: 0, max: 2, hardMin: 0, tags: ['render'] });
// phones have 3× screens and small GPUs: render touch devices at a lower ratio by default
const coarse = matchMedia('(pointer: coarse)').matches;
export const pixelRatio = vars.num('render.pixelRatio', coarse ? 1.5 : 2, { min: 0.5, max: 3, hardMin: 0.25, hardMax: 4, tags: ['render', 'perf'], desc: 'max render resolution per CSS pixel (capped by the screen)' });

// --- time --------------------------------------------------------------------
export const simRate = vars.int('sim.rate', 120, { min: 30, max: 240, hardMin: 10, hardMax: 1000, unit: 'Hz', tags: ['sim'], desc: 'fixed physics steps per second' });
export const timeScale = vars.num('time.scale', 1, { min: 0.05, max: 4, hardMin: 0, hardMax: 16, unit: '×', tags: ['sim', 'debug'] });
export const paused = vars.bool('time.paused', false, { tags: ['sim', 'debug'] });
export const inputViz = vars.bool('debug.inputViz', false, { tags: ['debug', 'input'], desc: 'input visualizer (F3)' });
export const vizKey = vars.str('input.key.inputViz', 'F3', { tags: ['input', 'keys'], desc: 'KeyboardEvent.code, comma-separated' });

// --- ship feel ---------------------------------------------------------------
const feel = ['ship', 'feel'];
export const assist = vars.bool('ship.flightAssist', true, { tags: feel, desc: 'on: velocity follows the nose; off: Newtonian drift (F)' });
export const shipVars = {
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
export const params = (): ShipParams => ({
  thrust: shipVars.thrust.value,
  reverse: shipVars.reverse.value,
  strafe: shipVars.strafe.value,
  turnRate: shipVars.turnRate.value,
  turnResponse: shipVars.turnResponse.value,
  maxSpeed: shipVars.maxSpeed.value,
  overspeedDecay: shipVars.overspeedDecay.value,
  boostThrust: shipVars.boostThrust.value,
  boostSpeed: shipVars.boostSpeed.value,
  boostDrain: shipVars.boostDrain.value,
  boostRegen: shipVars.boostRegen.value,
  assist: assist.value,
  assistDamp: shipVars.assistDamp.value,
});

// --- race --------------------------------------------------------------------
const rtags = ['race', 'feel'];
export const wallBounce = vars.num('race.wall.bounce', 0.3, { min: 0, max: 1, hardMin: 0, hardMax: 2, tags: rtags, desc: 'share of into-wall speed bounced back' });
export const wallScrape = vars.num('race.wall.scrape', 0.8, { min: 0, max: 10, hardMin: 0, unit: '/s', tags: rtags, desc: 'speed lost while touching the wall' });
export const spawnT = vars.num('race.spawn.t', 0, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['race'], desc: 'spawn position as a fraction of the lap (0 = just behind the start line)' });
export const spawnSpeed = vars.num('race.spawn.speed', 0, { min: 0, max: 400, hardMin: 0, unit: 'm/s', tags: ['race'] });
export const autopilot = vars.bool('bot.enabled', false, { tags: ['bot'], desc: 'autopilot flies the track (P)' });
export const botRoute = vars.enum('bot.route', 'shortcut', BOT_ROUTES, { tags: ['bot', 'route'], desc: 'which branches the autopilot takes at forks: main never leaves the loop; shortcut takes shortcuts and hidden routes; long takes the long way, splits and the pit lane' });
export const pitRefill = vars.num('race.pit.refill', 0.5, { min: 0, max: 5, hardMin: 0, unit: '/s', tags: ['race', 'route'], desc: 'share of full boost the pit lane refills per second' });
export const pitSpeed = vars.num('race.pit.speed', 60, { min: 10, max: 300, hardMin: 1, unit: 'm/s', tags: ['race', 'route'], desc: 'pit lane speed limit (faster bleeds off)' });
export const ghostOn = vars.bool('race.ghost.enabled', true, { tags: ['race', 'ghost'], desc: 'race your best lap on this track' });
export const ghostOpacity = vars.num('race.ghost.opacity', 0.35, { min: 0, max: 1, hardMin: 0, hardMax: 1, tags: ['race', 'ghost'] });
export const ghostColor = vars.color('race.ghost.color', '#7fe7ff', { tags: ['race', 'ghost'] });
export const raceLaps = vars.int('race.laps', 3, { min: 0, max: 20, hardMin: 0, hardMax: 999, tags: ['race'], desc: 'laps to the finish; 0 = endless practice' });
export const rivalLast = vars.bool('race.rival.last', true, { tags: ['race', 'ghost'], desc: 'race your last lap this session too' });
export const rivalLastColor = vars.color('race.rival.lastColor', '#ffd166', { tags: ['race', 'ghost'] });
export const rivalBot = vars.bool('race.rival.bot', true, { tags: ['race', 'ghost'], desc: 'race a lap the autopilot flew from a standing start' });
export const rivalBotColor = vars.color('race.rival.botColor', '#b388ff', { tags: ['race', 'ghost'] });
export const rivalBotRoute = vars.enum('race.rival.botRoute', 'shortcut', BOT_ROUTES, { tags: ['race', 'ghost', 'route'], desc: 'which branches the autopilot rival takes at forks (see bot.route)' });

// --- debug -------------------------------------------------------------------
const gizmoNames = ['velocity', 'accel', 'collision', 'frames', 'checkpoints', 'nearest'] as const;
export const gizmos = gizmoNames.map((n) => vars.bool(`debug.gizmo.${n}`, false, { tags: ['debug', 'gizmo'] }));

// --- sim config --------------------------------------------------------------
export const walls = (): WallParams => ({ shipRadius: shipRadius.value, bounce: wallBounce.value, scrape: wallScrape.value, open: openSpace(), oobTime: oobTime.value });
export const botParams = (route: BotRoute) => ({ ...defaultBot, route });

/** Everything a sim step needs, from the current vars and course. */
export const simConfig = (): SimConfig => {
  const g = gauntlet.value;
  const pc = provingCourse.value;
  const pl = pads.value;
  const mv = movers.value;
  return {
    ship: params(),
    walls: walls(),
    track: onTrack() ? track.value : null,
    course:
      g || pc || track.value.branches?.length || pl.length || mv.length
        ? {
            gauntlet: g ?? undefined,
            proving: pc ? { course: pc, rules: provingRules() } : undefined,
            nearMiss: nearMissDistance.value,
            pit: { refill: pitRefill.value, speed: pitSpeed.value },
            pads: pl.length ? { list: pl, fx: padEffect(), lanes: padLanes.value } : undefined,
            movers: mv.length ? mv : undefined,
          }
        : undefined,
  };
};
