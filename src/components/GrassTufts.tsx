import { useMemo } from 'react';
import { rand } from '../lib/random';

interface TuftSpec {
  left: number;
  bottom: number;
  width: number;
  sway: number;
  delay: number;
  tilt: number;
}

const COUNT = 18;

export function GrassTufts() {
  const tufts = useMemo<TuftSpec[]>(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        left: rand(2, 98),
        bottom: rand(20, 32),
        width: rand(22, 40),
        sway: rand(2.6, 4.2),
        delay: rand(0, 2.5),
        tilt: rand(-6, 6),
      })),
    [],
  );

  return (
    <div className="tufts" aria-hidden="true">
      {tufts.map((t, i) => (
        <div
          key={i}
          className="tuft"
          style={{
            left: `${t.left}%`,
            bottom: `${t.bottom}%`,
            width: t.width,
            rotate: `${t.tilt}deg`,
            ['--tuSway' as string]: `${t.sway}s`,
            ['--tuDelay' as string]: `${t.delay}s`,
          }}
        >
          <svg viewBox="0 0 60 34" fill="none">
            <path d="M30 34C28 22 24 16 16 10" stroke="#43a45f" strokeWidth="3" strokeLinecap="round" />
            <path d="M30 34C31 20 34 12 42 6" stroke="#3f9e5f" strokeWidth="3" strokeLinecap="round" />
            <path d="M30 34C30 18 30 10 30 4" stroke="#59b06a" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}