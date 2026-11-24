# Kocmoc — Track editor (M8)

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
  segment back from the end. Their race rules are in [Point-to-point tracks](#point-to-point-tracks-built-m8b).
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

## Record a track by flying (built, M8c)

1. Press **J** or pick **Record a track** in the track list. The game switches to free flight (open
   space, no walls; the mode it was in comes back on discard) and a see-through tube grows behind the
   ship, so you see the corridor as you make it. A ring marks the start.
2. While flying, `PathRecorder` (`src/gen/record.ts`) keeps a sample every `record.step` m (4):
   position, the ship's up vector and the tube radius at the time. Path source is the ship, or the
   editor's fly cam (M8d: **Record from here**).
3. Live controls: `]` / `[` tube radius by `record.radiusStep`, `U` pause/resume, `Backspace` undo
   the last `record.undo` m (200). The same actions are buttons under the recording HUD.
4. **J** again finishes (at least `record.minLength`, 200 m) and the sim stops while you choose:
   - **Close the loop** is offered when the path is at least 20 radii long, ends within
     `record.closeNear` radii (3) of the start and heads within about 60° of the start's heading (the
     start ring turns green). `closeLoop` cuts the end where it passes nearest the start.
   - **Bridge back to the start** joins the end to the start with a cubic Hermite curve (tangents
     along the path, as long as the gap), sampled like the rest.
   - **Keep it open** makes a point-to-point run (M8b rules).
5. **Fit** (`recordingToDoc`): a moving average over half a radius each side smooths out jitter;
   control points start one every 8 radii, then the sample that strays furthest from the spline is
   added in every segment where it strays more than `record.tolerance` (0.25) radii, until none do,
   so tight turns keep more points. Roll at each control point is the ship's up against the
   rotation-minimising frame of the unrolled spline, unwrapped; on a loop, whole turns become `twist`.
   Each point keeps the radius flown there; the file's `radius` is the median.
6. **Check** (`trackProblems`): the generator's acceptance tests per sample, the tube within 2.4 radii
   of another part of itself more than 4 radii further along, and bends tighter than 1.2 radii. Failing
   stretches are listed, drawn red on the fitted tube, and marked with red rings while you fly it.
7. **Fly it** loads the file like a dropped one (race mode; a mode left in the user layer is cleared),
   **Save to My tracks** stores it in IndexedDB (`kocmoc-tracks` database, `src/world/library.ts`),
   **Download file** saves `*.kocmoc-track.json`. **Back** returns to the choice, and from there to
   recording.

**My tracks**: the track list shows saved tracks above the venues, newest first, with a delete button.

## Point-to-point tracks (built, M8b)

`"closed": false` makes a track with a start and a separate finish, like a downhill run.
`tracks/canyon-run.json` is one (`?scenario=canyon-run`).

- Spline: an open centripetal Catmull-Rom, with its end tangents taken from the first and last
  segments. Frames are transported from the start with no closure fix, so there is no seam.
- Lines: a **run-up** of `RUN_UP` = 60 m (at most a tenth of the track) before the start line, and a
  **run-off** of `RUN_OFF` = 250 m (at most a fifth) after the finish gate (`openLines`, stored as
  `Track.start` / `Track.finish`). Checkpoints split start to finish evenly, `checkpoints[0]` is the
  start line. `raceSpan(track)` is the race distance: one lap on a loop, start to finish here.
- Race rules: one run, no laps (`race.laps` is ignored). The ship spawns halfway down the run-up;
  crossing the start line starts the clock, the finish gate stops it. Progress is `s` from the start
  line and never wraps; `segmentAt`, `sampleAt` and `pointOnTrack` clamp to the ends instead of wrapping.
- Ends: both ends of the tube are flat walls (`collideEnds`); the far one is drawn as a disc. Past the
  finish gate the run-off brakes the ship (at least 30 m/s², more if needed) to stop 15 m short of
  the end, and the results card shows.
- HUD: the lap label reads **RUN**, there is no race total, and the minimap draws the track open
  with a bar at the start line and the finish gate.
- Ghosts, rivals, positions and gaps measure distance from the start line up to `raceSpan`; the
  autopilot rival flies one run from the standing start.
- Not yet: checking that a branch on an open track merges before the finish gate, and the
  editor's start-to-finish timeline (both M8e).

## Editor shell (built, M8d)

Desktop only: mouse and keyboard. On touch the track list and playtest still work, but the editor
is not offered (no Edit buttons, `G` does nothing).

Opened with **G** (`input.key.edit`), **Edit this track** in the track list, or **edit** on a saved
track (`src/ui/editor.ts`). It is not a `game.mode` value: the game stays in race mode under it with
the sim stopped, the ship, HUD and corner buttons hidden, and game keys off. The track flown now is
edited: a loaded track file in place (in the layer that holds it), anything else baked first
(`bakeCurrent`, then loaded like a dropped file). Every edit writes the canonical text to
`gen.race.track` outside the vars history, so the race scene rebuilds, the edit survives a reload,
and closing (**G** again, or **Fly it**) races the edited track from the start. While editing, the
autopilot rival is not flown for each change.

**Cameras** (`edit.cam`, **V** cycles, buttons in the panel)
- **Orbit** (default, `OrbitControls`): drag to orbit, right-drag to pan, wheel zooms to the cursor.
- **Fly**: the flight axes (keys, pad) through `sampleInput` drive `flyStep` (`src/gen/edit.ts`):
  move along the camera's own axes at `edit.fly.speed` (×`edit.fly.boost`), turn at `edit.fly.turn`,
  no physics; hold the right button for mouse look (honours invert pitch), wheel changes the speed.
  **Record from here** (or **J**) records a path from the fly cam instead of the ship (`createRecording`
  `start('camera')`): no switch to open space, and **Edit it** on the result opens it in the editor.
  The review panel of a normal recording has **Edit it** too.
- **Top** and **side**: flat views as a 2° lens from 24 track radii away (so there is next to no
  perspective and the rest of the pipeline, picking and gizmo keep a perspective camera). Drag pans,
  right-drag spins about the vertical, the wheel zooms by narrowing the lens. The sky is replaced by
  the horizon colour (the dome sits inside the near plane).
- **.** focuses the selection (or a clicked problem), **Home** frames the whole track.
- **Turning in steps** (`edit.viewStep`: 15, 45 or 90°; **0** / numpad 0 or the panel cycles it):
  yaw (**1** / **2**, numpad 4 / 6), pitch (**3** / **4**, numpad 8 / 2) and roll (**5** / **6**,
  numpad 7 / 9) about the camera's own axes, round the orbit target (`turnView` in `src/gen/edit.ts`;
  the fly cam turns in place). The camera's up follows, and OrbitControls is told its new up, so
  orbiting goes round the turned view; top and side stop holding their angle until picked again.
  **H** (numpad 5) centers the selection, or the whole track, without zooming.

**Selecting and moving**
- Control points are drawn through the walls at a constant size on screen (first point green,
  selection yellow), with the control polygon dashed and the centreline (`src/world/editScene.ts`).
- Click picks a point (`Raycaster` on an `InstancedMesh`), shift- or ctrl-click toggles, **Ctrl+A**
  selects all, **Esc** none, a click on nothing clears. A drag that moves more than 5 px is the camera's.
- The `TransformControls` arrows on the selection's centre move every selected point; the track
  redraws while dragging (centreline only) and commits on release.
- **I** / Insert adds a point after the selected one, mid-segment on the spline; a double-click on the
  centreline adds one there (`sampleSegment` maps the sample to a spline segment and `t`). Roll and
  radius are eased from the neighbours.
- **Delete** (or **Backspace**) removes the selection, down to 4 points on a loop and 2 on a run.
- **;** / **'** roll by `edit.rollStep`, **[** / **]** change the tube radius by `edit.radiusStep`
  (the same keys as while recording); both can be typed in the panel for the selection. Each selected
  point shows its tube ring and a roll tick (the frame's up at that point, roll included).
- **M** smooths: each selected point (not the ends of a run) moves half way to its neighbours'
  midpoint, roll and radius too.
- Moving a point keeps anchors, so things placed on a segment ride along with it. Inserting and
  deleting re-anchor every item to the nearest point of the new centreline to where it was on the old
  one, which is exact away from the edit.
- **Undo** is the editor's own stack of doc texts (`EditHistory`): **Ctrl/Cmd+Z**, **Ctrl/Cmd+Shift+Z**
  or **Ctrl+Y**, ahead of the vars undo. Repeats of one key within 0.6 s (holding `'`) are one step.
  **Revert** goes back to the track as it was opened (undoable).
- The panel also renames the track, saves it to My tracks and downloads it.

**Validation**
`trackProblems` (the recording checks) runs after every committed edit. Failing stretches are red on
the see-through tube and ringed, and listed in the panel; a click looks at one. **View** switches
between the ghost tube (the solid track, pads and hazards hidden) and the track as raced.

Left for M8e: picking the tube surface for `s, theta`, drag handles for roll and radius (they are keys
and fields now), the other checks below, and everything on the timeline.

## Placement (M8e, planned)

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

**More validation**
Beyond the M8d checks (tube touching itself, too tight a bend): a section wall reaching another part
of the lap, a hazard with no way through, overlapping pads, each marked in 3D and clickable. They
reuse the same checks the generators use to accept a candidate.

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
| Library | IndexedDB (`idb-keyval`, own `kocmoc-tracks` database); listed under **My tracks** in the track list (built in M8c: play, delete) |
| File | export / import `*.kocmoc-track.json`; drop onto the page to load |
| URL | `#t=<lz-string>` like the existing `#s=`; a 60-point track with props is about 2–4 KB |
| Repo | `tracks/<name>.json`, referenced from a venue scenario |

`version` gates migrations. **Bake** turns any current venue into a doc, so the fifteen venues can
be opened, edited and saved as new tracks.

## Milestones

| # | Scope |
|---|---|
| M8a | **Built.** Track doc + `compileTrack` (closed and open), per-point radius, anchors, explicit lists in place of generators, scenario `track` field, Bake, file and URL load. Test: a baked track compiles to the same samples as the generator |
| M8b | **Built.** Point-to-point race rules: one run, start run-up, finish gate, run-off braking, end walls, results; bot and ghosts on open tracks; open minimap; bundled Canyon Run |
| M8c | **Built.** Record by flying: ghost tube, sampling, radius / pause / undo, close or bridge or open, fit, checks marked red, save to My tracks, download |
| M8d | **Built.** Editor shell (desktop only): orbit / fly / top / side cams, record from the fly cam, picking, point gizmo, insert / delete / roll / radius / smooth, undo, checks overlay |
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
