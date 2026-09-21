let ctx: AudioContext | null = null;

function ensureCtx(): AudioContext | null {
  try {
    const w = window as unknown as {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    ctx ??= new (w.AudioContext ?? w.webkitAudioContext!)();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function pluck(ac: AudioContext, freq: number, start: number, duration: number, volume = 0.06) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const until = ac.currentTime + start;

  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.frequency.setValueAtTime(freq, until);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.35, until + duration);

  gain.gain.setValueAtTime(0.0001, until);
  gain.gain.exponentialRampToValueAtTime(volume, until + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, until + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start(until);
  osc.stop(until + duration + 0.05);
}

export function chime(): void {
  const ac = ensureCtx();
  if (!ac) return;
  pluck(ac, 523.25, 0, 0.55, 0.05);
  pluck(ac, 783.99, 0.07, 0.6, 0.045);
}

export function gardenChime(): void {
  const ac = ensureCtx();
  if (!ac) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((n, i) => pluck(ac, n, i * 0.06, 0.7, 0.05));
}