import { useMemo } from 'react';
import { rand, pick } from '../lib/random';
import { PETAL_COLORS } from '../constants';

interface PetalSpec {
  left: number;
  dur: number;
  delay: number;
  size: number;
  sway: number;
  color: string;
}

const COUNT = 30;

export function PetalRain() {
  const petals = useMemo<PetalSpec[]>(
    () =>
      Array.from({ length: COUNT }).map(() => ({
        left: rand(0, 100),
        dur: rand(6.5, 13),
        delay: -rand(0, 16),
        size: rand(9, 16),
        sway: rand(2.2, 4.2),
        color: pick(PETAL_COLORS),
      })),
    [],
  );

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            ['--petal-dur' as string]: `${p.dur}s`,
            ['--petal-delay' as string]: `${p.delay}s`,
            ['--petal-sway' as string]: `${p.sway}s`,
            ['--petal-color' as string]: p.color,
          }}
        >
          <span className="petal__leaf" />
        </div>
      ))}
    </div>
  );
}