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
}

const MEADOW: MeadowFlower[] = Array.from({ length: 28 }).map((_, i) => {
  const top = rand(3, 88);
  const size = (58 + (top / 100) * 150) * rand(0.82, 1.18);
  return {
    id: i,
    left: Math.min(97, Math.max(3, ((i + 0.5) / 28) * 100 + rand(-3.5, 3.5))),
    top,
    size,
    variant: randInt(0, 4),
    flipped: Math.random() > 0.5,
    durB: rand(3.8, 6.2),
    delB: rand(0, 2.6),
  };
});

export function FlowerField() {
  const meadow = useMemo(() => MEADOW.slice().sort((a, b) => a.top - b.top), []);

  return (
    <>
      <FlowerGradients />

      <div className="field-layer" aria-hidden="true">
        {meadow.map((f) => (
          <div
            key={f.id}
            className="flower flower--scroll"
            style={{
              left: `calc(${f.left}% - ${f.size / 2}px)`,
              top: `${f.top}%`,
              width: f.size,
              ['--durB' as string]: `${f.durB}s`,
              ['--delB' as string]: `${f.delB}s`,
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