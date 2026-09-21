import { useMemo } from 'react';
import { Flower } from './Flower';
import { FlowerGradients } from './FlowerGradients';
import { rand, randInt } from '../lib/random';

interface MeadowFlower {
  id: number;
  left: number;
  top: number;
  size: number;
  variant: number;
  flipped: boolean;
  durB: number;
  delB: number;
  onX: number;
  endX: number;
}

const BASE = Array.from({ length: 16 }).map((_, i) => {
  const top = rand(30, 86);
  return {
    id: i,
    left: Math.min(97, Math.max(3, ((i + 0.5) / 16) * 100 + rand(-4, 4))),
    top,
    size: (88 + (top / 100) * 110) * rand(0.9, 1.1),
    variant: randInt(0, 4),
    flipped: Math.random() > 0.5,
    durB: rand(4, 6.4),
    delB: rand(0, 2.6),
  };
});

export function FlowerField() {
  const meadow = useMemo<MeadowFlower[]>(
    () =>
      BASE.slice()
        .sort((a, b) => a.top - b.top)
        .map((f, i) => {
          const onX = 4 + i * 3.4;
          return {
            ...f,
            onX,
            endX: onX + 24 + rand(0, 9),
          };
        }),
    [],
  );

  return (
    <>
      <FlowerGradients />

      <div className="field-layer" aria-hidden="true">
        {meadow.map((f) => (
          <div
            key={f.id}
            className="flower flower--scrl"
            style={{
              left: `calc(${f.left}% - ${f.size / 2}px)`,
              top: `${f.top}%`,
              width: f.size,
              ['--durB' as string]: `${f.durB}s`,
              ['--delB' as string]: `${f.delB}s`,
              ['--onX' as string]: `${f.onX}%`,
              ['--endX' as string]: `${f.endX}%`,
            }}
          >
            <div className="flower__bloom">
              <Flower size={f.size} variant={f.variant} flipped={f.flipped} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}