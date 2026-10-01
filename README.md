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

## Debug tools

- `` ` `` toggles the variable table. Query: fuzzy text, `#tag`, `:mod`, `:fav`, `:watch`.
- `Ctrl/Cmd+Z` / `Ctrl/Cmd+Shift+Z` undo / redo, `F2` flips A/B snapshots.
- Changes autosave locally; **share** copies a link containing the full setup.

Adding a tunable value anywhere in the code:

```ts
const thrust = vars.num('ship.thrust.max', 120, { min: 0, max: 500, unit: 'm/s²', tags: ['feel'] });
// read thrust.value in the loop
```

Presets live in `presets/<group>/<name>.json` and apply to layer `preset:<group>`.

## Deploy

Pushing to `master` runs unit tests, builds and deploys via GitHub Actions. One-time setup:
repo **Settings → Pages → Source: GitHub Actions**.
