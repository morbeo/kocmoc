# Kocmoc — Design

Browser space sim / racer. 6DOF flight through procedurally generated obstacle
courses (X-Wing / TIE Fighter training style) and 3D race tracks (Slipstream 5000
style). Cel-shaded, minimal, procedural. Static site on GitHub Pages.

**Guiding principle:** every number in the game is a registered variable. Tuning,
presets, A/B testing, snapshots, sharing and scenarios are all built on that.

---

## Stack

| Concern | Choice |
|---|---|
| Build | Vite + TypeScript, `base: './'` (works under any Pages path) |
| Rendering | Three.js |
| Reactivity (core) | `@preact/signals-core` — framework-agnostic, no UI dependency |
| UI (debug + HUD/menus) | Preact + `@preact/signals` (`preact/compat` as React escape hatch) |
| Fuzzy search | `fuzzysort` |
| Persistence | `idb-keyval` (snapshots), `localStorage` (autosave) |
| URL sharing | `lz-string` (compressed state in URL hash) |
| Large tables | `@tanstack/virtual-core` (when var count warrants it) |
| Tests | Vitest (unit, generators, determinism) in CI; Playwright smoke run locally only (too costly for CI) |
| Deploy | GitHub Actions → `gh-pages` branch: `master` at root, PR previews under `pr-preview/pr-N/` |

Debug tooling ships in the public build behind the `` ` `` hotkey and is
lazy-loaded (dynamic import), so players who never open it never download it.
No secrets or sensitive data exist anywhere in the client.

The UI talks to the game only through the registry API (`get/set/subscribe/
layers/history`), so the UI framework is replaceable without touching the game.

---

## 1. Variable registry

```ts
const thrust = vars.num('ship.thrust.max', 120, { min: 0, max: 500, unit: 'm/s²', tags: ['feel'] });
ship.accel = thrust.value * input.throttle;   // hot path: plain read
```

- Types: `num`, `int`, `bool`, `enum`, `color`, `vec3`, `str`.
- Metadata: default, min/max/step, unit, tags, description, options (enum),
  `regen` (changing it rebuilds procedural content).
- Each var's resolved value is a signal → UI cells re-render individually.
- Re-registering a path (HMR) returns the existing var with updated metadata.
- Layer values for unregistered paths are kept, and apply when the var registers
  (lazy modules, experiments).
- **Watches**: read-only live values (`vars.watch('ship.speed', () => …)`) shown
  in the same table.

### Layers (cascade, low → high)

```
default → preset:feel → preset:juice → preset:visual → preset:hud → scenario → user
```

Each var shows which layer currently supplies its value. Presets replace a whole
layer. Direct edits go to `user`.

### History, snapshots, sharing

- Undo/redo (`Ctrl/Cmd+Z`, `Ctrl/Cmd+Shift+Z`) across all edits; rapid edits to
  the same var coalesce into one step; restoring a snapshot is one step.
- Autosave of all layers to `localStorage` — tuning survives reloads.
- Named snapshots in IndexedDB; restore / delete / export.
- **A/B**: mark two snapshots as A and B, flip with `F2` mid-flight.
- Export/import JSON (file), share via URL hash (`#s=<lz-string>`).
- Built-in presets are JSON in `presets/` (bundled), so good setups get committed.
- Diff view (current vs snapshot/defaults, cherry-pick) — later milestone.

## 2. Fuzzy table (debug console)

- Toggle with `` ` ``. Docked/floating panel.
- Query syntax: free text = fuzzy over path/tags/description; `#tag`; `:mod`
  (modified from default); `:fav` (starred); `:watch` (watches only).
- Columns: ★, path (match highlighted), inline editor, default, source layer, reset.
- Editors: slider + number for numbers, checkbox, select, color picker, vec3
  triple, text. Wheel over a number nudges it (Shift = fine).
- Group-by-path view; pinned favourites mini-panel visible while flying — later.

## 3. Scenarios ("setups")

JSON describing a complete test situation; loadable from menu, file drop, or
`?scenario=name`.

```json
{
  "name": "corkscrew-stress",
  "mode": "race",
  "seed": 4815,
  "spawn": { "trackT": 0.42, "speed": 200 },
  "vars": { "gen.race.twist": 2.5, "cam.mode": "chase", "ship.flightAssist": false },
  "presets": ["feel/drifty", "juice/overkill"]
}
```

"Save current as scenario" captures everything. **Experiments** register
prototype code with its own vars and `setup/teardown`, toggled live from a flags
panel, so ideas can be tried and dropped without touching main code paths.

## 4. Debug tools

| Area | Tools |
|---|---|
| Time | pause, frame-step, time scale 0.05×–4× |
| Camera | detach free debug cam (sim continues), teleport to track position |
| Gizmos | velocity/thrust vectors, collision volumes, spline frames, checkpoint planes, trigger volumes, nearest-track-point |
| Render | wireframe, normals, depth, outline-only, per-pass toggles |
| Perf | FPS / frame-time graph, draw calls, triangles, per-system timings |
| Input | live visualizer: raw device → action → curved axis |
| Generation | seed browser with thumbnails, live regen on `regen` vars, reroll / lock |
| Replay | deterministic (fixed timestep + seeded RNG + recorded input), scrub timeline, "save bug repro" bundle |
| Bot | autopilot flies the spline; headless completability sweep over many seeds |

Automated tests: generator invariants (no self-intersection, curvature limits,
gaps wider than ship), replay determinism (CI); Playwright smoke screenshot (local).

## 5. Juice

Each effect has `juice.<fx>.enabled`, `juice.<fx>.intensity` and its own params;
`juice.master` scales all. Presets: **Off / Subtle / Arcade / Overkill**.

Screen shake (trauma), FOV kick, speed lines, hit-stop, near-miss slow-mo, camera
lag/overshoot, exaggerated banking, engine trails, wall-scrape sparks, checkpoint
flash + HUD pop, chromatic aberration / vignette, audio pitch & doppler.

## 6. Input — keyboard + touchpad

Devices → actions/axes → response curves (deadzone, exponent, sensitivity). All
bindings and curve params are vars; rebinding panel (`K`, `src/ui/controls.tsx`)
with up to two keys per action, clash warnings, and invert-pitch toggles for
pointer Y (`input.invert.pointerY`) and the pitch keys (`input.invert.keyPitch`).

- **Keyboard**: `W/S` thrust/brake, `A/D` strafe, `Space/C` up/down, `Q/E` roll,
  arrows pitch/yaw, `Shift` boost, `F` flight assist, `V` cycle camera.
- **Touchpad modes** (switchable):
  1. *Virtual stick* (default): pointer lock, finger moves a cursor offset from
     centre → turn rate, auto-recentre (`input.stick.recenter`).
  2. *Two-finger scroll*: `wheel` deltaX/deltaY → pitch/yaw.
  3. *Pinch*: `wheel` + `ctrlKey` (macOS) → throttle or zoom.
  4. Click/tap → bindable action.
- Browser pinch-zoom / swipe-back suppressed on the canvas.
- **Touch screens** (`src/ui/touch.ts`, `input.touch.*`, shown on coarse pointers or
  after a first touch; `input.touch.ui` forces it): two floating thumb sticks
  (default left = throttle + strafe, right = pitch + yaw; each stick axis is a var),
  pushing the throttle stick to the rim boosts, hold buttons for boost, lift and roll,
  a bar with tuning table, camera, assist, respawn, tilt and fullscreen.
  *Tilt* (`input.tilt.*`) steers from gravity in screen space, calibrated to how the
  device is held when switched on. `render.pixelRatio` defaults lower on touch devices.

## 7. Flight model

Quaternion orientation, 6DOF thrust, boost energy. `ship.flightAssist` (default
on) aligns velocity to heading; off = Newtonian drift. Collisions bounce with
speed loss (no death in time trials). Swept-sphere tests to prevent tunnelling.
Fixed-timestep simulation with interpolated rendering.

## 8. Cameras & displays

- **Rigs** (each with `cam.<rig>.*` vars, `V` cycles): cockpit, close chase
  (spring arm), far chase, look-back, track-side cinematic, top-down tactical,
  free debug, orbit.
- **Cinematic director** (`cinematic` rig, `X` toggles, `cam.cine.*` vars):
  cuts between track-side (telephoto, panning operator), low fly-by, hero
  (ahead, looking back), drone, orbit and low tail shots every 4–8 s, never the
  same twice. Static shots stand inside the corridor ahead on the spline and
  cut early once the ship is past. Near misses, hits and laps request a
  reaction shot after a 1.5 s minimum hold. Hard cuts by default
  (`cam.cine.blend` glides), letterbox bars, and replays play through it
  (`cam.cine.replay`).
- **Viewports**: scissor-rendered layouts in one canvas — single, PiP,
  side-by-side, 2×2; each viewport picks a rig (mirror, minimap, debug view).
  Layouts are presets.
- **Pop-out windows**: viewports or debug panels in separate windows for extra
  monitors, synced via `BroadcastChannel`.

## 9. Cel-shaded rendering

- `MeshToonMaterial` with stepped gradient ramp (`NearestFilter`); steps/colours
  are vars.
- Post-process outline: Sobel on depth + normals — consistent on all procedural
  geometry; thickness/colour/thresholds as vars. Optional inverted-hull outline
  on the ship.
- One strong star key light, cool ambient, Fresnel rim light.
- Selective bloom on emissives only; banded backgrounds; toon speed lines.
- Visual presets: Ink, Neon toon, Pastel, Mono.

## 10. UI customization

- HUD widgets (speed, timer, boost, checkpoint arrow, splits, minimap, standings):
  draggable, scalable, toggleable; layouts are presets.
- Themes (colours, fonts, scale) are vars.
- Reduced-motion preset; colourblind-friendly palettes.
- Dockable debug panels, layout persisted.

## 11. Game modes (MVP)

- **Race**: closed Catmull-Rom spline, parallel-transport frames + authored twist,
  extruded cross-section (tube / half-pipe / rails / gates), checkpoints,
  distance-to-spline wall collision.
- **Gauntlet**: spline corridor assembled from obstacle chunks with ramping
  difficulty — rotating gap rings, crushers, laser grids, debris fields, turbine
  pipes, gate slaloms.
- Seeded RNG; seed in URL. Time trial with splits; ghost of best run per seed in
  `localStorage`.

Out of scope: multiplayer, AI racers (ghosts are the rivals, §13), weapons, story, customization, online
leaderboards, track editor.

## 12. Proving ground (M6)

Borrowed from the X-Wing (1993) Pilot Proving Ground and the TIE Fighter (1994)
training simulator: a time-attack where the clock is a resource you earn, and
precision beats raw speed. `game.mode = proving`.

- **Gate hoops** (`src/gen/proving.ts`, `src/sim/proving.ts`): rings in track space
  (s, x, y, opening r), resolved once on an arc crossing. Inside = credit (+time), outside
  = miss (−time, no bounce). Patterns per group: slalom, spiral (teaches rolling), pairs,
  reverse (the group's last gate, centred, credited only when crossed backwards; missed
  once you are `proving.reverseWindow` m past it). Size and offset ramp with difficulty
  like the gauntlet's gaps; openings never go below 1.6 ship radii. The autopilot treats
  gates as still holes (it skips reverse gates).
- **Proving rules**: countdown from `proving.budget` after the start line; gates, misses and
  fly-through time beacons (off the racing line, near the wall) move the clock; one lap;
  timeout ends the run. Score = time left (clears only) + gates + beacons, each weighted.
  Results card with the breakdown. Race keeps the count-up trial.
- **Ladder**: `scenarios/proving-1..8.json` (smaller gates further off-centre each level,
  open space from 5, reverse gates from 6), calibrated so the autopilot clears each with a
  shrinking share of spare time (a unit test checks it); levels past 8 are generated from 8
  (`src/core/ladder.ts`). Ship presets light / balanced / heavy (`presets/feel/`); progress,
  best scores and a badge for level 8 per preset in `localStorage`. Level select panel (`L`),
  next level (`N`).
- **Open-space profile** (`gen.race.profile = open`, any track mode): no wall collision,
  faint guide rings, `race.oob.time` s outside the corridor puts the ship back on the
  centreline (costs `proving.oobPenalty` s in proving).
- Turrets that shoot back need weapons, which stay out of scope unless decided
  otherwise.

## 13. Race (M7)

Taken from Slipstream 5000 (1995): looping 3D tracks with multiple paths and
shortcuts, scenery that alternates open stretches with tunnels, and a race to a
finish with positions. AI racers stay out of scope; ghosts are the rivals.

- **M7a, race against ghosts (built)**: `race.laps` (default 3, 0 = endless practice)
  ends the race on the last line crossing and stops the clock; a results card shows
  the place, total, laps and the rivals' times. Rivals (`src/sim/rivals.ts`) are
  ghosts flying their one lap over and over: your best (`race.ghost.enabled`), your
  last lap this session (`race.rival.last`) and a lap the autopilot flies from a
  standing start (`race.rival.bot`, recorded in the background, deterministic per
  track and ship tuning). Each ghost's lap is profiled as distance from the line, so
  your place and the gaps (time the rival took to reach your distance) are exact;
  a standings HUD widget shows them. Practice compares lap by lap.
- **M7b, route graph (built)**: `src/gen/routes.ts` adds branches to the loop in race mode
  (`gen.race.forks`, `gen.race.pitLane`); each is its own sampled spline from fork `s0` to merge
  `s1` with frames matching the loop at both ends. Kinds: shortcut (a Hermite curve across a bend,
  0.75× tube), long way (a wide bulge, 1.1× tube), split (beside the loop, 0.8× tube, the walls
  between them a divider), hidden (a narrower unmarked shortcut) and a pit lane before the start line
  (refills boost, speed limit). The tube radius eases from the loop's at the mouths to the branch's.
  A candidate is kept if, once clear of the loop's tube, it stays clear until the merge, keeps away
  from the rest of the loop and other branches, and bends no tighter than 3 tube radii; then the
  autopilot (`src/sim/forks.ts`, fixed reference ship, so tracks don't change with your tuning) flies
  the section both ways and keeps the fork only if the time is in its band (`gen.race.route.*`).
  Checkpoints inside a fork move to its ends. Each step the ship is on the tube it is inside (it keeps
  its route while inside it, so the overlapping mouth has no lip), walls collide with that tube, and
  progress on a branch maps to main `s` by fraction, so laps, splits, positions, ghosts and rival
  profiles work unchanged. The loop's wall is cut where a branch's tube overlaps it (and the other way
  round). Glowing sign ring per marked route, HUD label for the fork ahead and the route you're on,
  branches on the minimap (hidden ones once found). `bot.route` / `race.rival.botRoute`: main,
  shortcut, long, random. Not done: funnels at the mouths, a split-route arrow, see-through sections.
- **M7c, alien venues (built)**: twelve race tracks on other worlds (two underground, enclosed like Descent's mines), picked from the track list (`T`,
  `src/ui/tracks.ts`); each is a scenario `scenarios/venue-*.json` with a `title`. They are built from:
  - layouts (`gen.race.shape`, `src/gen/track.ts`): the wobbly loop, a figure eight whose lobes pass
    over and under each other, torus knots (trefoil, a five-lobed star, a coil winding round a ring),
    an upright loop flown over the top, a rising and falling clover, a tangle of steep climbs and dives,
    and a stunt ring with two loop-the-loops (the first steps sideways so its exit clears its entry,
    the second steps back) and two corkscrews, each given a tenth of the curve's parameter so it is
    sampled finely enough; wobble and height noise are
    laid over the base curve and the usual retries keep it clear of itself;
  - scenery (`src/gen/scenery.ts`, `world.scenery.*`): spires, monoliths, peaks, orbs, ribs (runs of
    arches over the track), halos (glowing rings it threads), lattice beams, shards and columns; each
    prop is a set of balls checked against a hashed centreline of the loop and every branch, and is
    tried elsewhere if it would reach into the corridor; a banded floor and/or ceiling
    (`world.ground`) a gap from the track, with spires and peaks rooted in them;
  - sky (`render.sky.planet.*`, `render.sky.moons`): a toon-lit, striped planet with a ring whose
    near half is drawn over it, and moons;
  - sections (`src/gen/sections.ts`, `gen.race.sections` / `sectionKinds` / `sectionMin` / `sectionMax`,
    race mode only): stretches of the loop with their own cross-section. Polygons (hex, square,
    octagon, triangle, rect, diamond, five-pointed star) as corner lists, the wall distance at an angle
    found by casting a ray to their edge; ellipse; irregular and cavern as a few harmonics whose phases
    drift along the section. Every wall is at least one tube radius out, so the autopilot, ghosts and
    fork balance are unchanged; open sections have no walls and an out-of-bounds limit 3.5 tube radii
    out. The shape eases in from the round tube at each end. Sections keep clear of forks, the pit lane
    and the start line, and of any other part of the loop their widest wall could reach; the main tube
    is cut there and the section draws its own faceted walls (corners on vertices). Collision pushes
    out along the face normal (`collideSection`); scenery keeps clear of each section's reach;
  - hazards (`generateHazards` in `src/gen/gauntlet.ts`, `gen.race.hazards` / `hazardKinds` /
    `hazardDifficulty`, race mode only): single gauntlet-style plane obstacles round the lap, clear of
    the start, forks and shaped sections: iris apertures (an opening that dwells open and shut) and
    shutter gates (two or four doors), plus turbines, crushers, lasers and moving rings. Shut, an iris
    or shutter still leaves `gen.gauntlet.minClearance` ship radii in the middle; the autopilot aims
    there. They join the best-lap key;
  - giant screens (`src/gen/screens.ts`, `src/world/screens.ts`, `world.screens.*`, race mode): 16:9
    panels beside the track, clear of every corridor and out of shaped tunnels, turned to face the
    ship coming at them; a second camera with its own cinematic director state renders into a texture
    `world.screens.fps` times a second;
  - open profiles (rails, halfpipe, gates) so the scenery is in view, and per-venue palettes.
  The classic loop leaves the shape out of the track params, so saved bests and ghosts keep their keys.
- **Scenic biomes** (proposed): the lap cut into sections (canyon, cave, city,
  orbit) with their own tube radius and profile, palette, scenery and landmarks.
- Later: pickups and boost pads (built on §12 beacons), championship (cups as
  scenario lists, points, unlocks, an upgrade preset layer).

---

## Architecture

```
src/
  core/      loop, vars registry, layers, history, persistence, rng
  sim/       ship, collision, checkpoints, mode rules
  gen/       spline, frames, track extrusion, gauntlet chunks
  render/    toon materials, outline pass, post-fx, viewports
  cam/       camera rigs
  input/     devices → actions → curves
  juice/     effects
  ui/        HUD widgets, menus
  debug/     fuzzy table, gizmos, replay, perf, scenarios (lazy-loaded)
presets/     bundled preset JSON
scenarios/   bundled scenario JSON
```

## Milestones

| # | Scope |
|---|---|
| M0 | Scaffold, Pages deploy, **vars registry + layers + undo + snapshots + URL share**, fuzzy table v1, toon demo scene |
| M1 | Fixed-step loop, 6DOF ship, keyboard + touchpad input with curves, chase & cockpit cams, input visualizer |
| M2 | Cel shading (toon ramp + outline pass), starfield, render debug views |
| M3 | Race generator, gizmos, scenarios, seed in URL |
| M4 | Gauntlet chunks, juice system + presets |
| M5 | Replay + ghost, autopilot bot, viewports + pop-outs, HUD editor, diff view |
| M6 | Proving ground (§12): gate hoops, countdown rules + time beacons, level ladder + ship presets + badges, open-space profile |
| M7 | Race (§13). M7a: lap count, finish, results, positions and gaps against ghost rivals (best, last, autopilot). M7b: route graph (shortcut, long way, split, hidden, pit lane) balanced by the autopilot. M7c: twelve alien venues (track shapes incl. loops and corkscrews, shaped tunnel sections and open air, iris and shutter hazards, giant screens, scenery, sky planets, track list). _Proposed_: biomes along the lap, pickups and boost pads, championship |
