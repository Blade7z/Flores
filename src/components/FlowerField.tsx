import { useMemo } from 'react';
import { Flower } from './Flower';
import { FlowerGradients } from './FlowerGradients';
import { rand, randInt } from '../lib/random';
import type { FlowerSpec, GrownFlower } from '../types';

interface SeedSpec extends FlowerSpec {
  seedD: number;
}

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

const BACK_ROW = makeRow(16, { bottom0: 34, bottom1: 28, size0: 64, size1: 104 });
const MID_ROW = makeRow(14, { bottom0: 25, bottom1: 18, size0: 130, size1: 215 });

export function FlowerField({ grown }: { grown: readonly GrownFlower[] }) {
  const seeds = useMemo<SeedSpec[]>(() => {
    const all = [...BACK_ROW, ...MID_ROW].sort((a, b) => a.left - b.left);
    return all.map((f, i) => ({ ...f, seedD: i * 0.24 + rand(0, 0.3) }));
  }, []);

  return (
    <>
      <FlowerGradients />

      <div className="field-layer" aria-hidden="true">
        {seeds.map((f) => (
          <div
            key={f.id}
            className="flower flower--seed"
            style={{
              left: `calc(${f.left}% - ${f.size / 2}px)`,
              bottom: `${f.bottom}%`,
              width: f.size,
              ['--durB' as string]: `${f.dur}s`,
              ['--delB' as string]: `${f.delay}s`,
              ['--seedD' as string]: `${f.seedD}s`,
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