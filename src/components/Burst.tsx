import { useMemo } from 'react';
import { rand, pick } from '../lib/random';
import { PETAL_COLORS } from '../constants';
import type { BurstItem } from '../types';

interface ParticleSpec {
  tx: number;
  ty: number;
  rot: number;
  dur: number;
  delay: number;
  color: string;
}

export function Burst({ item, onDone }: { item: BurstItem; onDone: (id: number) => void }) {
  const particles = useMemo<ParticleSpec[]>(
    () =>
      Array.from({ length: item.count }).map(() => ({
        tx: rand(-170, 170),
        ty: rand(-240, -40),
        rot: rand(-170, 170),
        dur: rand(0.9, 1.6),
        delay: rand(0, 0.25),
        color: pick(PETAL_COLORS),
      })),
    [item.count],
  );

  return (
    <div
      className="burst"
      style={{
        ['--bx' as string]: `${item.bx}%`,
        ['--by' as string]: `${item.by}%`,
      }}
      onAnimationEnd={() => onDone(item.id)}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="burst-particle"
          style={{
            ['--tx' as string]: `${p.tx}px`,
            ['--ty' as string]: `${p.ty}px`,
            ['--rot' as string]: `${p.rot}deg`,
            ['--pd' as string]: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span
            className="burst-particle__shape burst-particle__shape--sparkle"
            style={{ background: p.color }}
          />
        </span>
      ))}
    </div>
  );
}