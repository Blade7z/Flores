import { useMemo } from 'react';
import { Flower } from './Flower';
import { rand, randInt } from '../lib/random';

interface HeroFlower {
  id: number;
  left: number;
  bottom: number;
  size: number;
  variant: number;
  delay: number;
  dur: number;
  flipped: boolean;
  seedD: number;
}

const BASE_ROW = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: Math.min(96, Math.max(4, ((i + 0.5) / 14) * 100 + rand(-4, 4))),
  bottom: rand(16, 30),
  size: rand(46, 86),
  variant: randInt(0, 4),
  delay: rand(0, 2.4),
  dur: rand(3.6, 5.6),
  flipped: Math.random() > 0.5,
}));

export function HeroFlora() {
  const seeds = useMemo<HeroFlower[]>(
    () =>
      BASE_ROW.slice()
        .sort((a, b) => a.left - b.left)
        .map((f, i) => ({ ...f, seedD: i * 0.18 + rand(0, 0.25) })),
    [],
  );

  return (
    <>
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
    </>
  );
}