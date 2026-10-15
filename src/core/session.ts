import type { Recording } from '../sim/replay';

/**
 * Hooks the game registers so lazily loaded tools (debug panel) can drive it without importing
 * main.ts. Each defaults to a no-op until the game sets it.
 */
export const session = {
  /** replay the current run from its spawn */
  replayRun: (): void => {},
  /** download the current run as a bug-repro bundle */
  saveRepro: (_note?: string): void => {},
  /** load and play a recording */
  playRecording: (_rec: Recording): void => {},
};
