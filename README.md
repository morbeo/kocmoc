# Kocmoc

Browser space sim / racer — 6DOF flight, procedural obstacle courses and race tracks, cel-shaded.
See [docs/DESIGN.md](docs/DESIGN.md).

## Develop

```sh
npm install
npm run dev          # http://localhost:5173  (add ?debug to open the debug table)
npm test             # unit tests (vitest)
npm run test:e2e     # browser smoke test, local only (first run: npx playwright install chromium)
npm run build        # static build → dist/
```

## Controls

| Key | Action |
|---|---|
| `W` / `S` | thrust / reverse |
| `A` / `D`, `Space` / `C` | strafe left/right, up/down |
| arrows | pitch / yaw |
| `Q` / `E` | roll |
| `Shift` | boost (release to re-arm once empty) |
| `F` | flight assist on/off (off = Newtonian drift) |
| `V` | cycle camera (chase, cockpit, far, look-back, cinematic) |
| `X` | cinematic camera on/off |
| `F3` | input visualizer |
| `R` | respawn at the start (race) or origin (free) |
| `K` | controls: rebind keys, invert pitch |
| `P` | autopilot on/off |
| `B` | replay the run since the last respawn; in a replay, play/pause |
| `H` | HUD editor: drag widgets to move, scroll to resize, × to hide |
| `L` | proving ground levels: pick a ship and a level |
| `N` | next proving level (after a clear) |

Touchpad (`input.pointer.mode`): **stick** (default) — click the scene to capture the pointer, then move
your finger to steer; it re-centres on its own, `Esc` releases. Held click = boost. **scroll** —
two-finger scroll steers. Pinch sets a cruise throttle (or camera zoom, `input.pinch.action`).
Keys can be rebound in the controls panel (`K` or the **Controls** button), which also has invert-pitch
toggles for the touchpad/mouse Y axis and for the pitch keys. Every binding, curve (deadzone / expo / sensitivity) and flight parameter is a var in the debug table.

## Race

`game.mode` is `race` (default), `gauntlet` (the track filled with obstacles), `proving` (gates against the clock) or `free` (open rock field). Race tracks are generated from
`gen.race.seed` and the other `gen.race.*` vars: a closed Catmull-Rom loop with rotation-minimising
frames, optional barrel rolls (`gen.race.twist`) and banking, checked for self-intersection and
tight bends. `gen.race.profile` picks the look (tube, halfpipe, rails, gates, open); every profile but
`open` collides with the same invisible corridor. `open` is open space: faint guide rings, no walls, and
leaving the corridor for `race.oob.time` seconds puts you back on the centreline. Cross the start line to start the clock. Laps, checkpoint splits and
a delta to your best are shown at the top, and best laps are saved per track.

Races run `race.laps` laps (default 3; 0 = endless practice) and end with a results card. You race
ghosts: your best lap, your last lap this session and a lap the autopilot flew from a standing start
(`race.ghost.enabled`, `race.rival.last`, `race.rival.bot`). Each one flies its lap over and over, and
the standings widget shows your place and the time gap to each. Try `?scenario=sprint` for one short lap.

- `?seed=42` opens that track; the address bar always shows the current seed.
- `?scenario=corkscrew-stress` loads a bundled scenario from `scenarios/`. Scenarios set mode, seed,
  spawn point, vars and presets. Load them from the debug table's **scenario** menu or drop a scenario
  JSON on the page; **save** downloads the current setup as one.

## Gauntlet

`game.mode = gauntlet` fills the race track with obstacle chunks after a clear run-up: rotating gap
rings, slaloms, crushers, laser grids, turbines and debris fields. Difficulty ramps from
`gen.gauntlet.rampStart` to `gen.gauntlet.rampEnd` over the lap; at full difficulty the tightest gap
is `gen.gauntlet.minClearance` ship radii, and every gap is tested to stay flyable. Turn chunk kinds
on or off with `gen.gauntlet.kinds.*`. Obstacles bounce you like walls. Try
`?scenario=gauntlet-ramp` or `?scenario=laser-stress`.

## Proving ground

A time attack after the X-Wing and TIE Fighter training courses: the clock counts down, and you earn
time by flying well. Press `L` (or **Levels**) to pick a ship and a level.

- **Gates**: hoops in the corridor, in slalom, spiral and pair patterns. Through the opening adds
  `proving.gateBonus` s; past it outside costs `proving.missPenalty` s (no bounce). Orange gates are
  reverse gates: they count only when flown through backwards, so flip and come back.
- **Time beacons** sit off the racing line near the wall and add `proving.beaconBonus` s.
- The run is one lap. Clear it before the clock hits zero; the score is time left, gates and beacons
  (`proving.score.*`). The HUD arrow points at the next gate.
- **Ladder**: levels 1–8 are bundled scenarios (`proving-1` … `proving-8`, open space from level 5,
  reverse gates from level 6); later levels are generated from level 8 with a shorter clock and tighter
  gates. Each level opens once the one before is cleared.
- **Ships**: the light, balanced and heavy presets (`presets/feel/`). Progress, best scores and a badge
  for clearing level 8 are kept per ship in `localStorage`. A custom-tuned ship can fly but earns nothing.

Gate layout is `gen.proving.*` (gate size and offset ramp with difficulty, as in the gauntlet). A unit
test has the autopilot clear all 8 levels, with less time to spare at each level.

## Juice

Each effect has `juice.<fx>.enabled`, `juice.<fx>.intensity` and its own params; `juice.master`
scales them all. Presets **off / subtle / arcade / overkill** are in the debug table's **juice** menu.
Effects: screen shake, FOV kick, speed lines, hit-stop, near-miss slow-mo, camera lag and overshoot,
banking, wing-tip trails, wall sparks, checkpoint flash and HUD pop, chromatic aberration and
vignette, and sound (engine pitch, impacts, near-miss whoosh, checkpoint chime; off by default, on
in arcade and overkill).

## Debug tools

- `` ` `` toggles the variable table. Query: fuzzy text, `#tag`, `:mod`, `:fav`, `:watch`.
- `Ctrl/Cmd+Z` / `Ctrl/Cmd+Shift+Z` undo / redo, `F2` flips A/B snapshots.
- Changes autosave locally; **share** copies a link containing the full setup.
- `time.paused` / `time.scale` freeze or slow the sim; `sim.rate` sets the fixed physics step.
- `render.debug.view` shows a pipeline stage (`color`, `edges`, `normals`, `depth`); `render.wireframe`,
  `render.outline.enabled`, `render.bloom.enabled` and `render.stars.enabled` toggle individual passes.
- Visual presets: Ink, Neon, Pastel, Mono.
- Gizmos (`#gizmo`): velocity and acceleration vectors, collision sphere, track frames, checkpoint
  planes, nearest track point.
- **Replay**: every run is recorded (var layers, spawn, and each tick's controls) and replays
  bit for bit. `B` or **run → replay** plays it with a scrub bar; **save repro** downloads it as a
  bug-repro bundle, and **load repro** (or dropping the file on the page) plays one back.
- **Ghost**: your best lap on each track is saved and flies alongside you (`race.ghost.*`).
- **Autopilot** (`P`, `bot.enabled`) flies the track and threads gauntlet gaps. Unit tests use it to
  check that generated tracks and gauntlets can be completed over a sweep of seeds.
- **Viewports**: `view.layout` is single, pip, side or quad; each extra view picks a rig (look-back,
  top-down, orbit, track-side…) and can **pop out** into its own window for another monitor.
- **HUD layouts**: widget positions, sizes and visibility are `hud.*` vars; presets classic,
  minimal, racer.
- **diff** (run row) lists every var that differs from the defaults or from a saved snapshot, with
  one-click revert and copy as JSON.

Adding a tunable value anywhere in the code:

```ts
const thrust = vars.num('ship.thrust.max', 120, { min: 0, max: 500, unit: 'm/s²', tags: ['feel'] });
// read thrust.value in the loop
```

Presets live in `presets/<group>/<name>.json` and apply to layer `preset:<group>`.

## Deploy

Pushing to `master` runs unit tests, builds and publishes `dist/` to the `gh-pages` branch
(site root). Every pull request gets a preview at `/kocmoc/pr-preview/pr-<N>/`, linked in a
PR comment and removed when the PR closes. One-time setup, once a deploy has created the `gh-pages`
branch: repo **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`**.
