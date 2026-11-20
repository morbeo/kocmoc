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

## Track document (built, M8a)

One JSON file describes an authored track (`src/gen/trackDoc.ts`). The generators stop being the
only source and become "fill" tools that write into it.

```jsonc
{
  "kind": "kocmoc.track", "version": 1,
  "title": "Glass Loop", "closed": true,
  "seed": 309,            // scenery, screens and cavern movers are still generated from it
  "radius": 40,           // nominal tube radius, m
  "spacing": 4, "checkpoints": 8,
  "twist": 2,             // whole turns of roll over the track
  "points":   [ { "p": [0, 0, 0], "roll": 0.2, "r": 60 }, ... ],        // roll and r optional
  "branches": [ { "kind": "shortcut", "from": [3, 0.2], "to": [7, 0.5], "theta": 1.2, "amp": 40, "radius": 30 } ],
  "sections": [ { "kind": "hex", "from": [10, 0], "to": [12, 0.6], "ramp": 60, "seed": 4, "roll": 0 } ],
  "hazards":  [ { "kind": "iris", "at": [5, 0.4], "thickness": 2, "shape": { "k": "iris", ... } } ],
  "pads":     [ { "kind": "boost", "from": [2, 0.1], "to": [2, 0.8], "theta": 1.57, "half": 0.4, "depth": 6, "w": 0 } ],
  "vars":     { "render.track.color": "#4b3a78", "gen.race.profile": "halfpipe" }
}
```

- **Tracks are sampled exactly as the generator samples them** (`sampleTrack` in `src/gen/track.ts`
  is shared), so a baked track compiles back to the generator's centreline and frames within the
  0.1 m rounding of its points.
- **Anchors are `[segment, t]`** on the control polygon, not raw `s`: `s = (segment + t) / segments ×
  length`, the same parameter roll and radius are eased by. Moving a point changes arc lengths
  everywhere, but a hazard on segment 5 stays on segment 5.
- **Per-point radius**: the main track gets `rad[]` per sample (smoothstep between points, like roll)
  when any point's `r` differs from `radius`. `radiusAt` / `radiusAtS` feed `locate`, wall
  collision, `wallAt` / `reachAt` (sections, scenery), pads, hazard and pad meshes, and the tube,
  rail and ring meshes. Hazard shapes are in metres, so they don't scale with it.
- **Branches** keep the generator's shape (`branchFrom`: a Hermite cut or a bulge of `amp` m towards
  `theta`); free control points for branches come with the editor (M8e).
- **Open tracks** (`"closed": false`) compile, with frames that run free from the start and no
  segment back from the end. Race rules for them (start run-up, finish gate, run-off, minimap) are M8b.
- Positions are rounded to 0.1 m, angles to 0.001 rad and anchors to 1e-4, so files diff well and
  links stay short (a 12-point loop is about 600 characters as a link).
- `vars` holds the look (palette, profile, ground, sky, scenery settings), applied under the scenario.
- `parseTrackDoc` validates untrusted input (kinds, finite numbers in range, at most 2000 points and
  500 items per list, bad items dropped) and returns the rounded, canonical form.
- Not in v1: hand-placed screens and pinned scenery props (M8e); both are still generated from `seed`.

**In the game.** The file's canonical text is the var `gen.race.track` (empty = generated), so
undo, autosave, `#s=` links, repro bundles and replays carry it. `world/race.ts` compiles it and
`track` uses it in place of the generator (its forks and sections in race mode only, like the
generator's); hazards and pads come from the file in race mode. Saved bests and ghosts key on a
hash of the text (`kocmoc.best.track.<hash>|<mode>...`). A scenario takes an optional `track` (inline,
or the name of a bundled `tracks/<name>.json`); loading any scenario replaces a file loaded before.

**Getting files in and out** (debug panel `track` row): **bake** saves the track flown now (any
venue or seed, with its forks, sections, hazards, pads and look) as `*.kocmoc-track.json`; **load**
or a file drop opens one; **link** copies a `#t=<lz-string>` URL; **generated** goes back.

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

If you don't close it, the recording is a point-to-point track (below).

## Point-to-point tracks

`"closed": false` makes a track with a start and a separate finish, like a downhill run.

- Spline: an open centripetal Catmull-Rom, with its end tangents taken from the first and last
  segments. Frames are transported from the start with no closure fix, so there is no seam.
- Race rules: one run, no laps (`race.laps` is ignored). The start line is at `s = 0` and the finish
  gate at the end; checkpoints and splits work as now. Progress is plain `s` that never wraps.
- Ends: the tube is capped behind the start; past the finish it opens into a run-off area where the
  ship slows down, and the results card shows.
- Ghosts, rivals, positions and gaps work unchanged, since they already measure distance from the start.
  The bot flies it once instead of a lap.
- Branches can't merge after the finish, and the start-line and lap checks that look across the seam
  are skipped.
- The editor shows open tracks the same way; the lap timeline becomes a start-to-finish timeline.

## Editor

Desktop only: mouse and keyboard. On touch the track list and playtest still work, but the editor
is not offered.

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
| M8a | **Built.** Track doc + `compileTrack` (closed and open), per-point radius, anchors, explicit lists in place of generators, scenario `track` field, Bake, file and URL load. Test: a baked track compiles to the same samples as the generator |
| M8b | Point-to-point race rules: one run, finish gate, run-off, results; bot and ghosts on open tracks |
| M8c | Record by flying: ghost tube, sampling, close or bridge, fit, checks, save to library |
| M8d | Editor shell (desktop only): `edit` mode, orbit / fly / ortho cams, picking, point gizmo, insert / delete / roll / radius, undo, validation overlay |
| M8e | Placement: lap timeline, sections, branches, hazards, pads, movers, screens, scenery pins, Fill buttons |
| M8f | Playtest and share: play from here and back, bot lap, heat strip, My tracks in the track list, URL share |

M8a has only debug-panel UI but carries the risk (radius per sample touches collision, bot, scenery and sections),
so it goes first. Recording (M8c) can ship before the full editor: record, fit, fly.

## Spline tension (decided: not now)

Kochanek-Bartels splines would add per-point tension (and optionally continuity and bias) to
Catmull-Rom. High tension pulls the curve tight at a point and straightens the segments either side;
low tension rounds it out.

- For: hairpins next to straights without piling up points; recorded paths fit with fewer points.
- Against: another knob per point that interacts with roll and radius; high tension makes kinks that
  fail the bend check; three.js only has a global tension and not for the centripetal type, so it
  needs our own spline code; it adds a field every track has to carry.

Points plus insert / smooth cover the same need for now. The doc format leaves room for an optional
`"tension"` per point later, defaulting to today's curve so nothing changes.
