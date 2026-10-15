/**
 * Procedural sound: an engine hum whose pitch follows speed, impact thumps, a near-miss whoosh
 * whose pitch falls as the obstacle passes (a cheap Doppler), and a checkpoint chime.
 * The AudioContext starts on the first key or click after audio is enabled (browser rule).
 */
export function createAudio() {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let engineGain: GainNode | null = null;
  let oscA: OscillatorNode | null = null;
  let oscB: OscillatorNode | null = null;
  let filter: BiquadFilterNode | null = null;
  let noise: AudioBuffer | null = null;
  let wanted = false;

  const start = () => {
    if (!wanted || ctx) return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.connect(ctx.destination);
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    engineGain = ctx.createGain();
    engineGain.gain.value = 0;
    filter.connect(engineGain).connect(master);
    oscA = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscB = ctx.createOscillator();
    oscB.type = 'square';
    oscA.connect(filter);
    oscB.connect(filter);
    oscA.start();
    oscB.start();
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  };
  addEventListener('keydown', start);
  addEventListener('pointerdown', start);

  const burst = (dur: number, f0: number, f1: number, gain: number, type: BiquadFilterType) => {
    if (!ctx || !master || !noise) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const bq = ctx.createBiquadFilter();
    bq.type = type;
    bq.Q.value = 2;
    bq.frequency.setValueAtTime(f0, t);
    bq.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
    src.connect(bq).connect(g).connect(master);
    src.start(t);
    src.stop(t + dur);
  };

  return {
    /** Turn sound on/off; the context is created on the next user gesture. */
    enable(on: boolean, volume: number) {
      wanted = on;
      if (ctx && master) {
        master.gain.setTargetAtTime(on ? volume : 0, ctx.currentTime, 0.05);
        if (on && ctx.state === 'suspended') void ctx.resume();
      }
    },
    /** `speed` 0..~2 (fraction of max speed), `boost` 0..1, `k` effect intensity */
    engine(speed: number, boost: number, k: number) {
      if (!ctx || !oscA || !oscB || !engineGain || !filter) return;
      const t = ctx.currentTime;
      const f = 45 * (1 + speed * 1.6 + boost * 0.6);
      oscA.frequency.setTargetAtTime(f, t, 0.05);
      oscB.frequency.setTargetAtTime(f * 1.503, t, 0.05);
      filter.frequency.setTargetAtTime(300 + 1800 * Math.min(speed, 1.5) + 1200 * boost, t, 0.08);
      engineGain.gain.setTargetAtTime(0.12 * Math.min(1, k) * (0.4 + 0.6 * Math.min(speed, 1)), t, 0.08);
    },
    thump(impact: number, k: number) {
      burst(0.25, 400, 60, Math.min(1, impact / 60) * Math.min(1.5, k), 'lowpass');
    },
    whoosh(k: number) {
      burst(0.45, 2400, 300, 0.5 * Math.min(1.5, k), 'bandpass');
    },
    chime(k: number) {
      if (!ctx || !master) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.setValueAtTime(880, t);
      o.frequency.setValueAtTime(1320, t + 0.08);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.25 * Math.min(1.5, k), t);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 0.35);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.35);
    },
  };
}
