import { useMemo } from 'react';
import { rand } from '../lib/random';

interface BugSpec {
  kind: 'bee' | 'butterfly';
  palette: 'a' | 'b';
  top: number;
  size: number;
  x: number;
  yb: number;
  yd: number;
  tilt: number;
  tiltDur: number;
  flap: number;
  flapTop: number;
  delay: number;
  mirror: boolean;
}

const COUNT = 7;

export function Bugs() {
  const bugs = useMemo<BugSpec[]>(
    () =>
      Array.from({ length: COUNT }).map((_, i) => {
        const butterfly = i % 2 === 0;
        return {
          kind: butterfly ? 'butterfly' : 'bee',
          palette: butterfly ? (i % 4 ? 'a' : 'b') : 'a',
          top: butterfly ? rand(58, 72) : rand(74, 84),
          size: butterfly ? rand(30, 40) : rand(24, 30),
          x: butterfly ? rand(13, 17) : rand(9, 13),
          yb: butterfly ? rand(18, 30) : rand(12, 20),
          yd: butterfly ? rand(2.6, 3.8) : rand(1.6, 2.4),
          tilt: rand(5, 9),
          tiltDur: rand(2.4, 3.6),
          flap: butterfly ? 0.14 : 0.12,
          flapTop: rand(0.09, 0.16),
          delay: rand(0.9, 6),
          mirror: Math.random() > 0.5,
        };
      }),
    [],
  );

  return (
    <div className="bugs" aria-hidden="true">
      {bugs.map((b, i) => (
        <div
          key={i}
          className={`bug${b.mirror ? ' bug--mirror' : ''}`}
          style={
            {
              ['--buY' as string]: `${b.top}%`,
              ['--buS' as string]: `${b.size}px`,
              ['--buX' as string]: `${b.x}s`,
              ['--buYd' as string]: `${b.yd}s`,
              ['--buYb' as string]: `-${b.yb}px`,
              ['--buT' as string]: `${b.tiltDur}s`,
              ['--buR' as string]: `${b.tilt}deg`,
              ['--buFlap' as string]: `${b.flap}s`,
              ['--buFlapTop' as string]: `${b.flapTop}s`,
              ['--buDel' as string]: `${b.delay}s`,
            } as React.CSSProperties
          }
        >
          <span className="bug__flyer">
            <span className="bug__tilt">
              {b.kind === 'butterfly' ? (
                <Butterfly palette={b.palette} />
              ) : (
                <Bee />
              )}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Butterfly({ palette }: { palette: 'a' | 'b' }) {
  const wing = palette === 'a' ? '#f7a33b' : '#c58bf2';
  const lower = palette === 'a' ? '#e8832a' : '#9a54d3';
  const dark = '#2b2220';
  const spot = 'rgba(255,255,255,0.55)';

  return (
    <svg viewBox="0 0 44 40" width="100%" fill="none" aria-hidden="true">
      <g className="bug__wing">
        <ellipse cx="13" cy="13" rx="10" ry="11" fill={wing} stroke={dark} strokeWidth="0.8" />
        <ellipse cx="12" cy="11" rx="4" ry="5" fill={spot} />
      </g>
      <g className="bug__wing--r">
        <ellipse cx="31" cy="13" rx="10" ry="11" fill={wing} stroke={dark} strokeWidth="0.8" />
        <ellipse cx="32" cy="11" rx="4" ry="5" fill={spot} />
      </g>
      <g className="bug__wing">
        <ellipse cx="13" cy="28" rx="7" ry="7.5" fill={lower} stroke={dark} strokeWidth="0.8" />
      </g>
      <g className="bug__wing--r">
        <ellipse cx="31" cy="28" rx="7" ry="7.5" fill={lower} stroke={dark} strokeWidth="0.8" />
      </g>
      <ellipse cx="22" cy="21" rx="3" ry="10" fill={dark} />
      <circle cx="22" cy="10" r="3.2" fill={dark} />
      <path d="M20 8C18 4 19 2 16 1" stroke={dark} strokeWidth="1" strokeLinecap="round" />
      <path d="M24 8C26 4 25 2 28 1" stroke={dark} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Bee() {
  const dark = '#2f2a24';

  return (
    <svg viewBox="0 0 44 40" width="100%" fill="none" aria-hidden="true">
      <g className="bug__wing-top">
        <ellipse cx="17" cy="12" rx="9" ry="5" fill="rgba(255,255,255,0.95)" stroke={dark} strokeWidth="0.8" />
      </g>
      <g className="bug__wing-top--r">
        <ellipse cx="27" cy="12" rx="9" ry="5" fill="rgba(255,255,255,0.95)" stroke={dark} strokeWidth="0.8" />
      </g>
      <ellipse cx="22" cy="24" rx="11" ry="7" fill="#f6c445" stroke={dark} strokeWidth="1.4" transform="rotate(-14 22 24)" />
      <ellipse cx="15" cy="23" rx="1.4" ry="6.4" fill={dark} transform="rotate(-14 15 23)" />
      <ellipse cx="22" cy="24.5" rx="1.4" ry="6.4" fill={dark} transform="rotate(-14 22 24.5)" />
      <ellipse cx="29" cy="26" rx="1.4" ry="6.4" fill={dark} transform="rotate(-14 29 26)" />
      <circle cx="34" cy="18" r="4" fill={dark} />
      <path d="M34 14C36 10 38 9 40 7" stroke={dark} strokeWidth="1" strokeLinecap="round" />
      <path d="M32 14C30 10 28 9 26 7" stroke={dark} strokeWidth="1" strokeLinecap="round" />
      <path d="M12 27L5 29.5" stroke={dark} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}