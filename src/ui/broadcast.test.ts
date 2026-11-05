import { describe, it, expect } from 'vitest';
import { broadcast } from './broadcast';

const base = { lap: 2, laps: 3, started: true, finished: false, raceTime: 75.5, lapTime: 20, finishTime: null, standings: null };

describe('broadcast overlay', () => {
  it('is blank before the start', () => {
    expect(broadcast(null)).toBeNull();
    expect(broadcast({ ...base, started: false })).toBeNull();
  });

  it('shows the lap and race clock without rivals', () => {
    expect(broadcast(base)).toEqual({ tag: 'LIVE', lap: 'LAP 2/3', gap: '', time: '1:15.500' });
  });

  it('shows the place and the gap to the rival just ahead', () => {
    const st = { position: 2, of: 3, rivals: [{ name: 'best', gap: -0.84 }, { name: 'bot', gap: 1.2 }] };
    expect(broadcast({ ...base, standings: st })).toMatchObject({ tag: 'P2/3', gap: '+0.84 BEST' });
  });

  it('when leading, shows the lead over the one behind', () => {
    const st = { position: 1, of: 3, rivals: [{ name: 'last', gap: 0.5 }, { name: 'bot', gap: 3 }] };
    expect(broadcast({ ...base, standings: st })?.gap).toBe('−0.50 LAST');
  });

  it('holds the finish time at the end', () => {
    expect(broadcast({ ...base, finished: true, finishTime: 90 })).toMatchObject({ lap: 'FINISH', time: '1:30.000' });
  });
});
