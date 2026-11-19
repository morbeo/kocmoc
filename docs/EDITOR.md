# Kocmoc — Track editor (M8, proposed)

Make race tracks by flying them, then shape them in an editor: move points, set sections,
branches, hazards, pads and scenery, look at the whole thing from above, playtest, and share.

## How tracks are built today

Tracks are **not Bézier curves**. They are closed **centripetal Catmull-Rom splines**
(`CatmullRomCurve3` in `src/gen/track.ts`) through 4–180 control points. The curve passes
through every point, so there are no handles: the points are the whole shape.

The pipeline (`src/world/race.ts`, all `computed` signals):

1. `generateTrack`: control points from the seed and `gen.race.shape`, spline sampled every
   `spacing` m by arc length, rotation-minimising frames (double reflection), then roll (whole
   twist turns over the lap plus a per-point roll eased between points). The result is a `Track`:
   arrays `pos / tan / up / right / s`, one tube radius, checkpoints.
2. `addRoutes`: branches, each its own sampled spline from `s0` to `s1`, with a radius per sample.
3. `addSections`: shaped stretches `{ kind, s0, s1, ramp, seed, roll }`.
4. Hazards (`Plane { kind, s, shape }`), pads (`Pad { kind, s0, s1, theta, ... }`), movers,
   screens and scenery are generated against the finished track.

Everything after step 1 is placed by **arc length `s` and a cross-section position** (angle
`theta` or `x, y` in the frame). That is what makes an editor cheap: the generators already
produce plain data, so an authored track is the same data written down instead of rolled from a seed.

## Track document

One JSON file describes an authored track. The generators stop being the only source and become
"fill" tools that write into it.

```jsonc
{
  "kind": "kocmoc.track", "version": 1,
  "title": "Glass Loop", "author": "",
  "points": [ { "p": [0, 0, 0], "roll": 0, "r": 40 }, ... ],   // r: tube radius at this point
  "spacing": 6, "checkpoints": 8,
  "branches": [ { "kind": "shortcut", "from": [3, 0.2], "to": [7, 0.5], "points": [ ... ] } ],
  "sections": [ { "kind": "hex", "from": [10, 0], "to": [12, 0.6], "ramp": 60, "seed": 4, "roll": 0 } ],
  "hazards":  [ { "kind": "iris", "at": [5, 0.4], "shape": { ... } } ],
  "pads":     [ { "kind": "boost", "from": [2, 0.1], "to": [2, 0.8], "theta": 1.57, ... } ],
  "screens":  [ { "at": [8, 0.5], "side": 1 } ],
  "scenery":  { "seed": 1, "kinds": "columns,shards", "count": 120, "pinned": [] },
  "vars":     { "render.track.color": "#4b3a78", "gen.race.profile": "halfpipe" }
}
```

- **Anchors are `[segment, t]`** on the control polygon, not raw `s`. Moving a point changes arc
  lengths everywhere, but a hazard on segment 5 stays on segment 5. `compileTrack` turns anchors
  into `s` for the existing runtime.
- **Per-point radius** is new. The main track gets a `rad[]` per sample like branches already have;
  `wallAt`, collision, bot and scenery read it instead of the single `track.radius`.
- Positions are rounded to 0.1 m and angles to 0.001 rad on save, so files diff well and URLs stay short.
- `vars` holds the venue look (palette, profile, ground, sky), applied as the scenario layer.
- `parseTrackDoc` validates untrusted input like `parseScenario` does (types, ranges, at most
  2000 points and 500 items).

A scenario gains an optional `track` (inline doc or `tracks/<name>.json`). With it, the race
uses `compileTrack(doc)`; without it, nothing changes, so every venue, best and ghost keeps its key.
Authored bests key on a hash of the compiled doc.

## Record a track by flying

1. Pick **Record** in the editor (or the track list). The ship starts in open space (`profile: open`,
   no walls) with a ghost tube growing behind it, so you see the corridor as you make it.
2. While flying, the recorder drops a sample every few metres: position and the ship's roll against
   the rotation-minimising frame. Path source is the **ship** by default, or the **free camera** for
   paths the ship can't fly yet.
3. Live controls: tube radius up/down, pause/resume, undo the last stretch.
4. **Close the loop**: when you come back near the start heading the same way, it offers to close;
   otherwise **Bridge** joins the end to the start with a Hermite curve (as shortcuts are built today).
5. **Fit**: smooth out jitter, then reduce to control points within a tolerance (default 0.25 tube
   radius), keeping extra points where curvature is high. The result opens in the editor.
6. **Check**: the generator's acceptance tests (`minSeparation` > 2.4 R, `minCurvatureRadius` > 1.2 R)
   run on the result. Failures are marked red on the track instead of silently retrying.

Point-to-point tracks (no loop) are left for later: laps, progress, ghosts and rivals all assume a loop.

## Editor

A new game mode `edit`, opened from the track list or a free key (G today, rebindable).

**Cameras**
- Orbit around the selection or the whole track (default), fly cam (6DOF input without physics),
  top and side orthographic views. The debug "detach free cam" becomes the fly cam.
- Focus on selection, frame the whole track, jump to `s` from the timeline.

**Selecting and moving**
- Raycasts pick control points, the centreline (gives `s`) and the tube surface (gives `s, theta`).
- Points: drag with an axis gizmo (`TransformControls`), insert on a segment, delete, roll handle,
  radius handle, multi-select, smooth selection.
- Every edit is a command on the editor's own undo stack, same keys as vars undo.

**Lap timeline**
A strip along the bottom, one lap wide, like a video editor. Sections, branches, pads, hazards,
movers and screens are blocks on it; drag ends to change range, click to select. The 3D view and
the timeline select together.

**Placing things**
- Sections: drag a range, pick a kind, set ramp and roll.
- Branches: pick fork and merge on the timeline; a Hermite curve is made, then its points are editable.
- Hazards: click on the track for a plane; pick kind and timing (period, phase, dwell).
- Pads: click the wall for a boost strip (angle comes from where you clicked), or pick a range for a slow field.
- Screens: click beside the track. Scenery: generated settings plus pinned props you place by hand.
- Each generator gets a **Fill** button that writes its output into the doc ("4 hazards here, seed 7"),
  so a seeded venue can be baked and then hand-tuned.
- Look: the existing fuzzy table edits `doc.vars`.

**Validation**
A live list of problems (tube touching itself, too tight a bend, a section wall reaching another part
of the lap, a hazard with no way through, overlapping pads), each marked in 3D and clickable.
They reuse the same checks the generators use to accept a candidate.

## Playtest loop

- **Play from here**: spawn at the camera's nearest `s` (or the start) at a chosen speed. Escape
  returns to the editor at the same camera. Edits recompile the track the moment you return.
- **Bot lap**: the autopilot flies the track headless for completability and a reference time;
  per-fork times show whether a shortcut is really faster.
- **Heat strip** on the timeline from the last playtest: wall hits, big slowdowns, where you died.
- Playtest ghosts and bests save under the doc's hash, so they reset when the track changes.

## Save, load, share

| Where | How |
|---|---|
| Library | IndexedDB (`idb-keyval`, already used for snapshots); listed under **My tracks** in the track list |
| File | export / import `*.kocmoc-track.json`; drop onto the page to load |
| URL | `#t=<lz-string>` like the existing `#s=`; a 60-point track with props is about 2–4 KB |
| Repo | `tracks/<name>.json`, referenced from a venue scenario |

`version` gates migrations. **Bake** turns any current venue into a doc, so the fifteen venues can
be opened, edited and saved as new tracks.

## Milestones

| # | Scope |
|---|---|
| M8a | Track doc + `compileTrack`, per-point radius, anchors, explicit lists in place of generators, scenario `track` field, Bake, file and URL load. Test: a baked venue compiles to the same samples as the generator |
| M8b | Record by flying: ghost tube, sampling, close or bridge, fit, checks, save to library |
| M8c | Editor shell: `edit` mode, orbit / fly / ortho cams, picking, point gizmo, insert / delete / roll / radius, undo, validation overlay |
| M8d | Placement: lap timeline, sections, branches, hazards, pads, movers, screens, scenery pins, Fill buttons |
| M8e | Playtest and share: play from here and back, bot lap, heat strip, My tracks in the track list, URL share |

M8a has no UI but carries the risk (radius per sample touches collision, bot, scenery and sections),
so it goes first. M8b can ship before the full editor: record, fit, fly.

## Open questions

- Keep Catmull-Rom (recommended: it passes through what you flew) or add per-point tension?
- Desktop-first editor; on touch only playtest and the track list?
- Point-to-point tracks: worth a later milestone?
