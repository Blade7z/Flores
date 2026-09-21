import { FLOWER_VARIANTS } from '../constants';

export interface FlowerProps {
  size?: number;
  variant?: number;
  flipped?: boolean;
}

const STEMS: Record<number, string> = {
  0: 'M60 62 C53 98 67 140 60 194',
  1: 'M60 62C66 94 54 138 60 194',
  2: 'M60 60 C56 104 64 144 60 192',
  3: 'M60 64 C66 100 54 140 60 192',
  4: 'M60 62 C58 106 62 146 60 194',
};

const LEAVES: Record<number, [string, string]> = {
  0: [
    'M60 106C32 92 20 100 18 118C30 128 52 124 60 110Z',
    'M60 142C86 128 100 136 100 154C88 166 66 158 60 146Z',
  ],
  1: [
    'M60 112C30 100 18 110 16 130C30 142 52 132 60 116Z',
    'M60 156C84 142 96 150 98 168C88 180 64 172 60 160Z',
  ],
  2: [
    'M60 110C34 96 22 104 20 122C32 134 54 126 60 114Z',
    'M60 150C82 136 94 146 96 164C86 176 62 166 60 154Z',
  ],
  3: [
    'M60 108C28 94 16 104 16 124C28 136 50 126 60 112Z',
    'M60 148C88 134 100 144 100 162C90 174 66 164 60 152Z',
  ],
  4: [
    'M60 110C32 98 20 108 18 126C32 138 52 128 60 114Z',
    'M60 152C86 140 98 148 100 166C88 178 64 168 60 156Z',
  ],
};

export function Flower({ size = 110, variant = 0, flipped = false }: FlowerProps) {
  const v = FLOWER_VARIANTS[variant % FLOWER_VARIANTS.length];
  const s = STEMS[variant % 5];
  const lv = LEAVES[variant % 5];
  const stemH = 194;
  const petalCount = 10;

  return (
    <svg
      style={{
        width: size,
        height: (size / 120) * stemH,
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
      viewBox={`0 0 120 ${stemH}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={s} stroke="var(--stem)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d={lv[0]} fill="var(--leaf)" />
      <path d={lv[1]} fill="var(--leaf-dark)" opacity={0.9} />

      <g>
        {Array.from({ length: petalCount }).map((_, i) => (
          <path
            key={i}
            d="M60 60 C78 56 82 28 60 14 C38 28 42 56 60 60Z"
            fill={v.petal}
            transform={`rotate(${i * 36} 60 60)`}
            opacity={0.92}
          />
        ))}
      </g>

      <g transform="translate(60 60) rotate(18) scale(0.68) translate(-60 -60)">
        {Array.from({ length: petalCount }).map((_, i) => (
          <path
            key={i}
            d="M60 60 C78 56 82 28 60 14 C38 28 42 56 60 60Z"
            fill={v.light}
            transform={`rotate(${i * 36} 60 60)`}
            opacity={0.95}
          />
        ))}
      </g>

      <circle cx="60" cy="60" r="13" fill={v.core} />
      <circle cx="60" cy="60" r="9" fill={v.coreDark} />
      <circle cx="56.5" cy="56.5" r="2.5" fill={v.light} opacity={0.6} />
      <circle cx="63" cy="58" r="1.5" fill={v.light} opacity={0.45} />
    </svg>
  );
}