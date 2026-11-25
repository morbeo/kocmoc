// Boot: register tuning, restore saved state, then build the stage and the run and start the frame loop.
// Each piece lives in src/app/; the order here is the order things must happen in.
import { vars } from './core/vars';
import { initPersistence } from './core/persist';
// stylesheets in cascade order (later wins on ties); each module also imports its own
import './ui/replay.css';
import './ui/padNav.css';
import './ui/letterbox.css';
import './ui/hudLayout.css';
import './render/viewports.css';
import './ui/levels.css';
import './ui/tracks.css';
import './juice/juice.css';
import './ui/hud.css';
import './ui/record.css';
import { applySeedParam, openFromOutside, watchRestarts } from './app/load';
import { createStage } from './app/stage';
import { createGame } from './app/game';
import { createMenus } from './app/menus';
import { createReplays } from './app/replay';
import { bindKeys, lazyOverlays } from './app/keys';
import { addWatches } from './app/watches';
import { startFrames } from './app/frame';
import { bindDebug } from './app/debugTools';

// restore saved/shared tuning only after every var has registered (on import, above)
initPersistence(vars);
applySeedParam();

const stage = createStage();
const game = createGame(stage);
const menus = createMenus(game);
const replays = createReplays(game);
watchRestarts(game);
openFromOutside(replays);
bindKeys(game, replays, menus);
const overlays = lazyOverlays(game);
addWatches(game);
startFrames(game, replays, menus, overlays.gizmos);
bindDebug();
