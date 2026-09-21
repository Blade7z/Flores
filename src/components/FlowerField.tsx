import { useMemo } from 'react';
import { Flower } from './Flower';
import { rand, randInt } from '../lib/random';
import type { FlowerSpec, GrownFlower } from '../types';

interface RowOpts {
  bottom0: number;
  bottom1: number;
  size0: number;
  size1: number;
}

function makeRow(n: number, o: RowOpts): FlowerSpec[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    left: Math.min(96, Math.max(3, ((i + 0.5) / n) * 100 + rand(-3.5, 3.5))),
    bottom: rand(o.bottom0, o.bottom1),
    size: rand(o.size0, o.size1),
    variant: randInt(0, 4),
    delay: rand(0, 2.5),
    dur: rand(3.8, 6.2),
    flipped: Math.random() > 0.5,
  }));
}

const BACK_ROW = makeRow(16, { bottom0: 27, bottom1: 22, size0: 64, size1: 104 });
const MID_ROW = makeRow(14, { bottom0: 20, bottom1: 15, size0: 130, size1: 210 });

export function FlowerField({ grown }: { grown: readonly GrownFlower[] }) {
  const staticFlowers = useMemo(() => [...BACK_ROW, ...MID_ROW], []);

  return (
    <>
      <div className="field-layer" aria-hidden="true">
        {staticFlowers.map((f) => (
          <div
            key={f.id}
            className="flower"
            style={{
              left: `calc(${f.left}% - ${f.size / 2}px)`,
              bottom: `${f.bottom}%`,
              width: f.size,
              ['--durB' as string]: `${f.dur}s`,
              ['--delB' as string]: `${f.delay}s`,
            }}
          >
            <Flower size={f.size} variant={f.variant} flipped={f.flipped} />
          </div>
        ))}
      </div>

      <div className="field-layer field-layer--front" aria-hidden="true">
        {grown.map((f) => {
          const size = 200 * f.scale;
          return (
            <div
              key={f.id}
              className="flower flower--grow__in"
              style={{
                left: `calc(${f.left}% - ${size / 2}px)`,
                bottom: `${f.bottom}%`,
                width: size,
                ['--durB' as string]: `${3.6 + f.scale}s`,
              }}
            >
              <Flower size={size} variant={f.variant} flipped={f.flipped} />
            </div>
          );
        })}
      </div>
    </>
  );
}