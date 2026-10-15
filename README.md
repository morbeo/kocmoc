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
| `V` | cycle camera (chase, cockpit) |
| `F3` | input visualizer |
| `R` | respawn at the start (race) or origin (free) |
| `K` | controls: rebind keys, invert pitch |

Touchpad (`input.pointer.mode`): **stick** (default) — click the scene to capture the pointer, then move
your finger to steer; it re-centres on its own, `Esc` releases. Held click = boost. **scroll** —
two-finger scroll steers. Pinch sets a cruise throttle (or camera zoom, `input.pinch.action`).
Keys can be rebound in the controls panel (`K` or the **Controls** button), which also has invert-pitch
toggles for the touchpad/mouse Y axis and for the pitch keys. Every binding, curve (deadzone / expo / sensitivity) and flight parameter is a var in the debug table.

## Race

`game.mode` is `race` (default) or `free` (open rock field). Race tracks are generated from
`gen.race.seed` and the other `gen.race.*` vars: a closed Catmull-Rom loop with rotation-minimising
frames, optional barrel rolls (`gen.race.twist`) and banking, checked for self-intersection and
tight bends. `gen.race.profile` picks the look (tube, halfpipe, rails, gates); every profile collides
with the same invisible corridor. Cross the start line to start the clock. Laps, checkpoint splits and
a delta to your best are shown at the top, and best laps are saved per track.

- `?seed=42` opens that track; the address bar always shows the current seed.
- `?scenario=corkscrew-stress` loads a bundled scenario from `scenarios/`. Scenarios set mode, seed,
  spawn point, vars and presets. Load them from the debug table's **scenario** menu or drop a scenario
  JSON on the page; **save** downloads the current setup as one.

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

Adding a tunable value anywhere in the code:

```ts
const thrust = vars.num('ship.thrust.max', 120, { min: 0, max: 500, unit: 'm/s²', tags: ['feel'] });
// read thrust.value in the loop
```

Presets live in `presets/<group>/<name>.json` and apply to layer `preset:<group>`.

## Deploy

Pushing to `master` runs unit tests, builds and deploys via GitHub Actions. One-time setup:
repo **Settings → Pages → Source: GitHub Actions**.
