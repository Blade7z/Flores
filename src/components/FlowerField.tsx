import { useMemo } from 'react';
import { Flower } from './Flower';
import { FlowerGradients } from './FlowerGradients';
import { rand, randInt } from '../lib/random';

interface MeadowFlower {
  id: number;
  left: number;
  bottom: number;
  size: number;
  variant: number;
  flipped: boolean;
  durB: number;
  delB: number;
  onX: number;
  endX: number;
}

const BASE = Array.from({ length: 16 }).map((_, i) => {
  // bottom % of viewport: near hill top is ~24vh = ~24%.
  // Flores del fondo más arriba, las del frente más cerca del suelo.
  const bottom = rand(22, 55);
  return {
    id: i,
    left: Math.min(97, Math.max(3, ((i + 0.5) / 16) * 100 + rand(-4, 4))),
    bottom,
    size: (70 + (bottom / 100) * 80) * rand(0.9, 1.1),
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
        .sort((a, b) => b.bottom - a.bottom)
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
              bottom: `${f.bottom}%`,
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