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
| Deploy | GitHub Actions → GitHub Pages on push to `master` |

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
bindings and curve params are vars; rebinding panel.

- **Keyboard**: `W/S` thrust/brake, `A/D` strafe, `Space/C` up/down, `Q/E` roll,
  arrows pitch/yaw, `Shift` boost, `F` flight assist, `V` cycle camera.
- **Touchpad modes** (switchable):
  1. *Virtual stick* (default): pointer lock, finger moves a cursor offset from
     centre → turn rate, auto-recentre (`input.stick.recenter`).
  2. *Two-finger scroll*: `wheel` deltaX/deltaY → pitch/yaw.
  3. *Pinch*: `wheel` + `ctrlKey` (macOS) → throttle or zoom.
  4. Click/tap → bindable action.
- Browser pinch-zoom / swipe-back suppressed on the canvas.

## 7. Flight model

Quaternion orientation, 6DOF thrust, boost energy. `ship.flightAssist` (default
on) aligns velocity to heading; off = Newtonian drift. Collisions bounce with
speed loss (no death in time trials). Swept-sphere tests to prevent tunnelling.
Fixed-timestep simulation with interpolated rendering.

## 8. Cameras & displays

- **Rigs** (each with `cam.<rig>.*` vars, `V` cycles): cockpit, close chase
  (spring arm), far chase, look-back, track-side cinematic, top-down tactical,
  free debug, orbit.
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

- HUD widgets (speed, timer, boost, checkpoint arrow, splits, minimap):
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

Out of scope: multiplayer, AI racers, weapons, story, customization, online
leaderboards, mobile touch, track editor.

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
