import { useMemo } from 'react';
import { rand } from '../lib/random';

interface GlowSpec {
  left: number;
  bottom: number;
  x: number;
  dur: number;
  delay: number;
}

const COUNT = 12;

export function Fireflies() {
  const glows = useMemo<GlowSpec[]>(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        left: rand(3, 97),
        bottom: rand(0, 42),
        x: rand(-4, 4),
        dur: rand(9, 16),
        delay: -rand(0, 16),
      })),
    [],
  );

  return (
    <div className="fireflies" aria-hidden="true">
      {glows.map((g, i) => (
        <span
          key={i}
          className="glow"
          style={{
            left: `${g.left}%`,
            bottom: `${g.bottom}%`,
            ['--glow-x' as string]: `${g.x}vw`,
            ['--glow-dur' as string]: `${g.dur}s`,
            ['--glow-delay' as string]: `${g.delay}s`,
          }}
        />
      ))}
    </div>
  );
}