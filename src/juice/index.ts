import * as THREE from 'three';
import { vars } from '../core/vars';
import type { ShipState } from '../sim/ship';
import type { RaceEvent } from '../sim/race';
import { SKY_LAYER } from '../render/sky';
import { lens } from '../render/pipeline';
import { Particles, TimeWarp, Trauma, bankAngle, fovKick, shakeNoise, springStep, type Spring } from './core';
import { createAudio } from './audio';
import './juice.css';

// --- vars ----------------------------------------------------------------------
// Every effect has juice.<fx>.enabled and juice.<fx>.intensity; juice.master scales them all.
const tags = ['juice'];
export const master = vars.num('juice.master', 1, { min: 0, max: 2, hardMin: 0, hardMax: 10, tags, desc: 'scales every effect' });
function fx(name: string, desc: string, on = true, intensity = 1) {
  const t = ['juice', name];
  return {
    enabled: vars.bool(`juice.${name}.enabled`, on, { tags: t, desc }),
    intensity: vars.num(`juice.${name}.intensity`, intensity, { min: 0, max: 3, hardMin: 0, hardMax: 20, tags: t }),
  };
}
type Fx = ReturnType<typeof fx>;
/** Effective strength: 0 when off, else intensity × master. */
const k = (f: Fx) => (f.enabled.value ? f.intensity.value * master.value : 0);
const num = (name: string, v: number, o: Parameters<typeof vars.num>[2]) => vars.num(`juice.${name}`, v, { tags, ...o });

const shake = fx('shake', 'screen shake from hits (trauma)');
const shakeP = {
  decay: num('shake.decay', 1.6, { min: 0.1, max: 6, hardMin: 0.01, unit: '/s', desc: 'trauma lost per second' }),
  freq: num('shake.freq', 16, { min: 1, max: 40, hardMin: 0.1, unit: 'Hz' }),
  angle: num('shake.angle', 0.05, { min: 0, max: 0.3, hardMin: 0, unit: 'rad', desc: 'rotation at full trauma' }),
  offset: num('shake.offset', 0.4, { min: 0, max: 3, hardMin: 0, unit: 'm', desc: 'movement at full trauma' }),
  perSpeed: num('shake.perSpeed', 0.02, { min: 0, max: 0.1, hardMin: 0, desc: 'trauma added per m/s of impact' }),
};
const fov = fx('fov', 'field of view widens with speed and boost');
const fovP = {
  speed: num('fov.speed', 10, { min: 0, max: 40, hardMin: 0, unit: '°', desc: 'extra FOV at max speed' }),
  boost: num('fov.boost', 8, { min: 0, max: 40, hardMin: 0, unit: '°' }),
  from: num('fov.from', 0.4, { min: 0, max: 0.95, hardMin: 0, hardMax: 0.99, desc: 'kick starts at this fraction of max speed' }),
  response: num('fov.response', 5, { min: 0.5, max: 30, hardMin: 0.01, unit: '/s' }),
};
const lines = fx('speedLines', 'streaks from the screen edges at speed');
const linesP = {
  from: num('speedLines.from', 0.5, { min: 0, max: 1.5, hardMin: 0, desc: 'appear above this fraction of max speed' }),
  count: vars.int('juice.speedLines.count', 70, { min: 0, max: 300, hardMin: 0, hardMax: 2000, tags }),
};
const hitStop = fx('hitStop', 'brief freeze on a hard hit');
const hitStopP = {
  ms: num('hitStop.ms', 60, { min: 0, max: 300, hardMin: 0, unit: 'ms' }),
  threshold: num('hitStop.threshold', 25, { min: 0, max: 200, hardMin: 0, unit: 'm/s', desc: 'impacts below this don’t freeze' }),
};
const nearMiss = fx('nearMiss', 'slow motion when you just clear an obstacle');
const nearMissP = {
  scale: num('nearMiss.scale', 0.35, { min: 0.05, max: 1, hardMin: 0.01, hardMax: 1, desc: 'time scale at the start of the slow-mo' }),
  duration: num('nearMiss.duration', 0.6, { min: 0, max: 3, hardMin: 0, unit: 's' }),
};
const camLag = fx('camLag', 'chase camera trails behind when accelerating and overshoots');
const camLagP = {
  freq: num('camLag.freq', 1.6, { min: 0.2, max: 8, hardMin: 0.05, unit: 'Hz' }),
  damping: num('camLag.damping', 0.45, { min: 0.05, max: 2, hardMin: 0.01, desc: 'below 1 overshoots' }),
  gain: num('camLag.gain', 0.03, { min: 0, max: 0.2, hardMin: 0, unit: 's²', desc: 'offset per m/s² of acceleration' }),
  max: num('camLag.max', 3, { min: 0, max: 15, hardMin: 0, unit: 'm' }),
};
const bank = fx('bank', 'ship model leans into turns (visual only)');
const bankP = {
  gain: num('bank.gain', 0.35, { min: 0, max: 2, hardMin: 0, unit: 's' }),
  max: num('bank.max', 0.7, { min: 0, max: 1.5, hardMin: 0, unit: 'rad' }),
};
const trails = fx('trails', 'glowing ribbons from the wing tips');
const trailsP = {
  length: vars.int('juice.trails.length', 40, { min: 2, max: 200, hardMin: 2, hardMax: 1000, tags, desc: 'samples (frames) per trail' }),
  width: num('trails.width', 0.35, { min: 0, max: 3, hardMin: 0, unit: 'm' }),
};
const sparks = fx('sparks', 'sparks while scraping a wall and on impacts');
const sparksP = {
  rate: num('sparks.rate', 300, { min: 0, max: 2000, hardMin: 0, unit: '/s' }),
  size: num('sparks.size', 0.5, { min: 0.05, max: 3, hardMin: 0.01, unit: 'm' }),
};
const flash = fx('flash', 'screen flash and HUD pop on checkpoints');
const flashP = {
  strength: num('flash.strength', 0.3, { min: 0, max: 1, hardMin: 0, hardMax: 1 }),
  duration: num('flash.duration', 0.25, { min: 0.02, max: 2, hardMin: 0.01, unit: 's' }),
};
const lensFx = fx('lens', 'chromatic aberration and vignette with speed and hits');
const lensP = {
  aberration: num('lens.aberration', 0.006, { min: 0, max: 0.05, hardMin: 0, desc: 'RGB split at max speed' }),
  vignette: num('lens.vignette', 0.35, { min: 0, max: 1, hardMin: 0, hardMax: 1 }),
};
const audio = fx('audio', 'engine pitch, impacts, near-miss whoosh, checkpoint chime', false);
const audioP = { volume: num('audio.volume', 0.5, { min: 0, max: 1, hardMin: 0, hardMax: 1 }) };

// --- runtime -------------------------------------------------------------------

export interface JuiceFrame {
  /** real frame time, s */
  dt: number;
  camera: THREE.PerspectiveCamera;
  /** interpolated ship */
  ship: ShipState;
  shipModel: THREE.Object3D;
  maxSpeed: number;
  /** chase camera (lag applies) vs cockpit */
  chase: boolean;
  /** wall contact point, when scraping */
  scrape: THREE.Vector3 | null;
}

const TRAIL_MAX = 200;

export function createJuice(scene: THREE.Scene, glow: () => string) {
  const trauma = new Trauma();
  const warp = new TimeWarp();
  const sound = createAudio();
  let clock = 0;
  let kick = 0;
  let flashLeft = 0;
  let pulse = 0;
  const lag: Spring[] = [0, 1, 2].map(() => ({ x: 0, v: 0 }));
  const prevVel = new THREE.Vector3();
  const accel = new THREE.Vector3();
  let havePrev = false;

  // speed lines + flash: 2D overlays
  const canvas = document.createElement('canvas');
  canvas.id = 'speed-lines';
  document.body.appendChild(canvas);
  const g2 = canvas.getContext('2d');
  const flashEl = document.createElement('div');
  flashEl.id = 'juice-flash';
  document.body.appendChild(flashEl);
  const streaks = Array.from({ length: 2000 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random(), v: 0.6 + Math.random() }));
  let linesDrawn = false;

  // trails: two additive ribbons, on the sky layer so they skip the outline pass
  const tips = [new THREE.Vector3(-2.1, 0, 1.4), new THREE.Vector3(2.1, 0, 1.4)];
  const trailMat = new THREE.MeshBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide });
  const trailCol = new THREE.Color();
  const ribbons = tips.map(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL_MAX * 2 * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(TRAIL_MAX * 2 * 3), 3));
    const idx: number[] = [];
    for (let i = 0; i < TRAIL_MAX - 1; i++) idx.push(2 * i, 2 * i + 1, 2 * i + 2, 2 * i + 1, 2 * i + 3, 2 * i + 2);
    geo.setIndex(idx);
    const mesh = new THREE.Mesh(geo, trailMat);
    mesh.frustumCulled = false;
    mesh.layers.set(SKY_LAYER);
    scene.add(mesh);
    return { mesh, geo, hist: [] as { p: THREE.Vector3; side: THREE.Vector3 }[] };
  });

  // sparks
  const pool = new Particles(600);
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new THREE.BufferAttribute(pool.pos, 3);
  const sparkCol = new THREE.BufferAttribute(new Float32Array(pool.capacity * 3), 3);
  sparkGeo.setAttribute('position', sparkPos);
  sparkGeo.setAttribute('color', sparkCol);
  const sparkMat = new THREE.PointsMaterial({ vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, size: 0.5 });
  const sparkPts = new THREE.Points(sparkGeo, sparkMat);
  sparkPts.frustumCulled = false;
  sparkPts.layers.set(SKY_LAYER);
  scene.add(sparkPts);
  const burst = (at: THREE.Vector3, base: THREE.Vector3, n: number, spread: number) => {
    for (let i = 0; i < n; i++) {
      pool.emit(
        at.x, at.y, at.z,
        base.x * 0.5 + (Math.random() * 2 - 1) * spread,
        base.y * 0.5 + (Math.random() * 2 - 1) * spread,
        base.z * 0.5 + (Math.random() * 2 - 1) * spread,
        0.25 + Math.random() * 0.45,
      );
    }
  };

  const _q = new THREE.Quaternion();
  const _v = new THREE.Vector3();
  const _side = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);
  let sparkCarry = 0;
  let hudTime: HTMLElement | null = null;

  return {
    /** React to a sim event (hits, near misses, checkpoints). */
    event(e: RaceEvent, ship: ShipState, at?: THREE.Vector3) {
      if (e.type === 'hit') {
        const ks = k(shake);
        trauma.add(e.impact * shakeP.perSpeed.value * ks);
        const kh = k(hitStop);
        if (kh > 0 && e.impact >= hitStopP.threshold.value) warp.hitStop((hitStopP.ms.value / 1000) * Math.min(kh, 3));
        const kp = k(sparks);
        if (kp > 0 && at) burst(at, ship.vel, Math.round(Math.min(80, e.impact) * kp), 12);
        pulse = Math.min(1, pulse + e.impact / 60);
        if (k(audio) > 0) sound.thump(e.impact, k(audio));
      } else if (e.type === 'nearMiss') {
        const kn = k(nearMiss);
        if (kn > 0) warp.slowMo(1 - (1 - nearMissP.scale.value) * Math.min(1, kn), nearMissP.duration.value * Math.min(kn, 2));
        trauma.add(0.08 * k(shake));
        if (k(audio) > 0) sound.whoosh(k(audio));
      } else {
        if (k(flash) > 0) {
          flashLeft = flashP.duration.value;
          hudTime ??= document.querySelector('#race-hud .time');
          if (hudTime) {
            hudTime.style.setProperty('--pop', String(1 + 0.25 * Math.min(k(flash), 3)));
            hudTime.classList.remove('pop');
            void hudTime.offsetWidth; // restart the animation
            hudTime.classList.add('pop');
          }
        }
        if (k(audio) > 0) sound.chime(k(audio));
      }
    },

    /** Time scale for this frame (hit-stop, slow-mo); call once per frame with real dt. */
    timeScale(realDt: number): number {
      return warp.step(realDt);
    },

    /** Apply visual effects after the camera rig placed the camera. */
    frame(f: JuiceFrame) {
      const { dt, camera, ship } = f;
      clock += dt;
      const speed = ship.vel.length();
      const frac = speed / Math.max(f.maxSpeed, 1e-6);
      const boost = ship.boosting ? 1 : 0;

      // acceleration (smoothed) for camera lag
      if (havePrev && dt > 0) accel.lerp(_v.subVectors(ship.vel, prevVel).divideScalar(dt), 1 - Math.exp(-12 * dt));
      prevVel.copy(ship.vel);
      havePrev = true;

      // camera lag / overshoot
      const kl = f.chase ? k(camLag) : 0;
      const target = _v.copy(accel).multiplyScalar(-camLagP.gain.value * kl);
      if (target.length() > camLagP.max.value) target.setLength(camLagP.max.value);
      ['x', 'y', 'z'].forEach((ax, i) => springStep(lag[i], target[ax as 'x'], camLagP.freq.value, camLagP.damping.value, dt));
      camera.position.x += lag[0].x;
      camera.position.y += lag[1].x;
      camera.position.z += lag[2].x;

      // shake
      trauma.step(dt, shakeP.decay.value);
      const s = trauma.shake;
      if (s > 0) {
        const fq = shakeP.freq.value;
        camera.rotateX(shakeP.angle.value * s * shakeNoise(clock, fq, 1));
        camera.rotateY(shakeP.angle.value * s * shakeNoise(clock, fq, 2));
        camera.rotateZ(shakeP.angle.value * s * shakeNoise(clock, fq, 3));
        camera.translateX(shakeP.offset.value * s * shakeNoise(clock, fq, 4));
        camera.translateY(shakeP.offset.value * s * shakeNoise(clock, fq, 5));
      }

      // FOV kick
      const want = fovKick(speed, f.maxSpeed, boost, { speed: fovP.speed.value, boost: fovP.boost.value, from: fovP.from.value }) * k(fov);
      kick += (want - kick) * (1 - Math.exp(-fovP.response.value * dt));
      if (Math.abs(kick) > 1e-3) {
        camera.fov = Math.min(170, camera.fov + kick);
        camera.updateProjectionMatrix();
      }

      // exaggerated banking (model only)
      const kb = k(bank);
      if (kb > 0) f.shipModel.quaternion.multiply(_q.setFromAxisAngle(zAxis, bankAngle(ship.angVel.y, bankP.gain.value * kb, bankP.max.value)));

      // trails
      const kt = k(trails);
      const n = Math.min(TRAIL_MAX, trailsP.length.value);
      trailCol.set(glow()).multiplyScalar(2 * Math.min(1, kt) * Math.min(1, frac));
      ribbons.forEach((rb, ti) => {
        rb.mesh.visible = kt > 0;
        if (!rb.mesh.visible) {
          rb.hist.length = 0;
          return;
        }
        const p = tips[ti].clone().applyQuaternion(f.shipModel.quaternion).add(f.shipModel.position);
        const side = _side.set(1, 0, 0).applyQuaternion(f.shipModel.quaternion).clone();
        rb.hist.unshift({ p, side });
        if (rb.hist.length > n) rb.hist.length = n;
        const pos = rb.geo.attributes.position as THREE.BufferAttribute;
        const col = rb.geo.attributes.color as THREE.BufferAttribute;
        const w = trailsP.width.value * Math.min(kt, 3);
        for (let i = 0; i < TRAIL_MAX; i++) {
          const h = rb.hist[Math.min(i, rb.hist.length - 1)];
          // taper with age, and vanish before the trail reaches the chase camera
          const age = i < rb.hist.length ? 1 - i / n : 0;
          const near = Math.min(1, Math.max(0, (h.p.distanceTo(camera.position) - 4) / 10));
          const fade = age * age * near;
          const ww = w * age;
          pos.setXYZ(2 * i, h.p.x + h.side.x * ww, h.p.y + h.side.y * ww, h.p.z + h.side.z * ww);
          pos.setXYZ(2 * i + 1, h.p.x - h.side.x * ww, h.p.y - h.side.y * ww, h.p.z - h.side.z * ww);
          col.setXYZ(2 * i, trailCol.r * fade, trailCol.g * fade, trailCol.b * fade);
          col.setXYZ(2 * i + 1, trailCol.r * fade, trailCol.g * fade, trailCol.b * fade);
        }
        pos.needsUpdate = true;
        col.needsUpdate = true;
      });

      // sparks
      const kp = k(sparks);
      if (f.scrape && kp > 0 && speed > 5) {
        sparkCarry += sparksP.rate.value * kp * dt * Math.min(1, speed / 60);
        const count = Math.floor(sparkCarry);
        sparkCarry -= count;
        burst(f.scrape, ship.vel, count, 6);
      }
      pool.step(dt, 3);
      for (let i = 0; i < pool.capacity; i++) {
        const l = pool.maxLife[i] > 0 ? pool.life[i] / pool.maxLife[i] : 0;
        sparkCol.setXYZ(i, 3 * l, 1.8 * l * l, 0.6 * l * l * l);
      }
      sparkPos.needsUpdate = true;
      sparkCol.needsUpdate = true;
      sparkMat.size = sparksP.size.value;

      // speed lines
      const kL = k(lines);
      const amount = Math.max(0, Math.min(1, (frac - linesP.from.value) / Math.max(1 - linesP.from.value, 0.05))) * Math.min(kL, 2) + boost * 0.3 * Math.min(kL, 2);
      if (g2) {
        if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
          canvas.width = innerWidth;
          canvas.height = innerHeight;
        }
        if (amount > 0.01) {
          const W = canvas.width;
          const H = canvas.height;
          const R = Math.hypot(W, H) / 2;
          g2.clearRect(0, 0, W, H);
          g2.strokeStyle = `rgba(255,255,255,${Math.min(0.6, 0.35 * amount)})`;
          g2.lineWidth = 1.5;
          g2.beginPath();
          const cnt = Math.min(streaks.length, Math.round(linesP.count.value * Math.min(1.5, amount)));
          for (let i = 0; i < cnt; i++) {
            const st = streaks[i];
            st.r += st.v * dt * (1 + frac * 2);
            if (st.r > 1) {
              st.r = 0.35 + Math.random() * 0.2;
              st.a = Math.random() * Math.PI * 2;
            }
            const r0 = Math.max(0.35, st.r) * R;
            const r1 = r0 + R * 0.12 * amount * st.v;
            const c = Math.cos(st.a);
            const sn = Math.sin(st.a);
            g2.moveTo(W / 2 + c * r0, H / 2 + sn * r0);
            g2.lineTo(W / 2 + c * r1, H / 2 + sn * r1);
          }
          g2.stroke();
          linesDrawn = true;
        } else if (linesDrawn) {
          g2.clearRect(0, 0, canvas.width, canvas.height);
          linesDrawn = false;
        }
      }

      // checkpoint flash
      flashLeft = Math.max(0, flashLeft - dt);
      const fl = flashP.duration.value > 0 ? flashLeft / flashP.duration.value : 0;
      flashEl.style.opacity = String(fl * flashP.strength.value * Math.min(1, k(flash)));

      // lens
      pulse = Math.max(0, pulse - dt * 3);
      const kz = Math.min(k(lensFx), 3);
      lens.aberration = lensP.aberration.value * kz * (Math.min(frac, 1.5) ** 2 + boost * 0.5 + pulse * 2);
      lens.vignette = lensP.vignette.value * Math.min(1, kz) * (0.4 + 0.4 * Math.min(frac, 1) + pulse);

      // audio
      const ka = k(audio);
      sound.enable(ka > 0, audioP.volume.value * Math.min(1, ka));
      sound.engine(frac, boost, ka);
    },

    /** Forget motion history (after a respawn) so nothing streaks across the map. */
    reset() {
      havePrev = false;
      accel.set(0, 0, 0);
      for (const s of lag) s.x = s.v = 0;
      for (const rb of ribbons) rb.hist.length = 0;
      pool.life.fill(0);
    },
  };
}
