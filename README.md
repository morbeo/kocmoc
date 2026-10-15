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

Touchpad (`input.pointer.mode`): **stick** (default) — click the scene to capture the pointer, then move
your finger to steer; it re-centres on its own, `Esc` releases. Held click = boost. **scroll** —
two-finger scroll steers. Pinch sets a cruise throttle (or camera zoom, `input.pinch.action`).
Every binding, curve (deadzone / expo / sensitivity) and flight parameter is a var in the debug table.

## Debug tools

- `` ` `` toggles the variable table. Query: fuzzy text, `#tag`, `:mod`, `:fav`, `:watch`.
- `Ctrl/Cmd+Z` / `Ctrl/Cmd+Shift+Z` undo / redo, `F2` flips A/B snapshots.
- Changes autosave locally; **share** copies a link containing the full setup.
- `time.paused` / `time.scale` freeze or slow the sim; `sim.rate` sets the fixed physics step.
- `render.debug.view` shows a pipeline stage (`color`, `edges`, `normals`, `depth`); `render.wireframe`,
  `render.outline.enabled`, `render.bloom.enabled` and `render.stars.enabled` toggle individual passes.
- Visual presets: Ink, Neon, Pastel, Mono.

Adding a tunable value anywhere in the code:

```ts
const thrust = vars.num('ship.thrust.max', 120, { min: 0, max: 500, unit: 'm/s²', tags: ['feel'] });
// read thrust.value in the loop
```

Presets live in `presets/<group>/<name>.json` and apply to layer `preset:<group>`.

## Deploy

Pushing to `master` runs unit tests, builds and deploys via GitHub Actions. One-time setup:
repo **Settings → Pages → Source: GitHub Actions**.
