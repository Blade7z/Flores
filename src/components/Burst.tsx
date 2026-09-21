import { useMemo } from 'react';
import { rand, pick } from '../lib/random';
import { HEART_COLORS } from '../constants';
import type { BurstItem } from '../types';

interface ParticleSpec {
  tx: number;
  ty: number;
  rot: number;
  dur: number;
  delay: number;
  color: string;
}

export function Burst({
  item,
  onDone,
}: {
  item: BurstItem;
  onDone: (id: number) => void;
}) {
  const particles = useMemo<ParticleSpec[]>(
    () =>
      Array.from({ length: item.count }).map(() => ({
        tx: rand(-170, 170),
        ty: rand(-240, -40),
        rot: rand(-170, 170),
        dur: rand(0.9, 1.6),
        delay: rand(0, 0.25),
        color: pick(HEART_COLORS),
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
            className={
              item.kind === 'sparkle'
                ? 'burst-particle__shape burst-particle__shape--sparkle'
                : 'burst-particle__shape'
            }
            style={{ color: p.color, background: item.kind === 'sparkle' ? p.color : undefined }}
          >
            {item.kind === 'hearts' ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.5s-6.7-4.35-9.3-7.6C.6 11 2 7.7 5 7.4c1.9-.2 3.3.6 4 1.7.7-1.1 2.1-1.9 4-1.7 3 .3 4.4 3.6 2.3 6.1C18.7 17.15 12 21.5 12 21.5Z" />
              </svg>
            ) : null}
          </span>
        </span>
      ))}
    </div>
  );
}