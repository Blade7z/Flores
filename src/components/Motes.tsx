import { useMemo } from 'react';
import { rand } from '../lib/random';

interface MoteSpec {
  left: number;
  bottom: number;
  x: number;
  dur: number;
  delay: number;
}

const COUNT = 14;

export function Motes() {
  const motes = useMemo<MoteSpec[]>(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        left: rand(3, 97),
        bottom: rand(0, 40),
        x: rand(-4, 4),
        dur: rand(9, 16),
        delay: -rand(0, 16),
      })),
    [],
  );

  return (
    <div className="motes" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="glow"
          style={{
            left: `${m.left}%`,
            bottom: `${m.bottom}%`,
            ['--glow-x' as string]: `${m.x}vw`,
            ['--glow-dur' as string]: `${m.dur}s`,
            ['--glow-delay' as string]: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}