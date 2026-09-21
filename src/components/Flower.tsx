const STEMS: Record<number, string> = {
  0: 'M60 62 C53 98 67 140 60 194',
  1: 'M60 62C66 94 54 138 60 194',
  2: 'M60 60 C56 104 64 144 60 192',
  3: 'M60 64 C66 100 54 140 60 192',
  4: 'M60 62 C58 106 62 146 60 194',
};

const LEAVES: Record<number, [string, string, string, string]> = {
  0: [
    'M60 106C32 92 20 100 18 118C30 128 52 124 60 110Z',
    'M60 142C86 128 100 136 100 154C88 166 66 158 60 146Z',
    'M60 108C46 102 32 104 21 118',
    'M60 144C74 138 90 140 97 154',
  ],
  1: [
    'M60 112C30 100 18 110 16 130C30 142 52 132 60 116Z',
    'M60 156C84 142 96 150 98 168C88 180 64 172 60 160Z',
    'M60 114C46 106 30 112 20 130',
    'M60 158C74 152 90 152 94 166',
  ],
  2: [
    'M60 110C34 96 22 104 20 122C32 134 54 126 60 114Z',
    'M60 150C82 136 94 146 96 164C86 176 62 166 60 154Z',
    'M60 112C44 104 28 110 23 122',
    'M60 152C76 146 90 148 92 162',
  ],
  3: [
    'M60 108C28 94 16 104 16 124C28 136 50 126 60 112Z',
    'M60 148C88 134 100 144 100 162C90 174 66 164 60 152Z',
    'M60 110C44 102 26 108 20 122',
    'M60 150C76 142 92 146 96 160',
  ],
  4: [
    'M60 110C32 98 20 108 18 126C32 138 52 128 60 114Z',
    'M60 152C86 140 98 148 100 166C88 178 64 168 60 156Z',
    'M60 112C46 106 30 110 22 126',
    'M60 154C76 148 92 150 96 164',
  ],
};

export function Flower({
  size = 110,
  variant = 0,
  flipped = false,
}: {
  size?: number;
  variant?: number;
  flipped?: boolean;
}) {
  const vi = variant % 5;
  const s = STEMS[vi];
  const lv = LEAVES[vi];
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
      {/* Stem */}
      <path d={s} stroke="url(#stemGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Leaves con nervadura */}
      <path d={lv[0]} fill="url(#leafGrad)" />
      <path d={lv[1]} fill="url(#leafDarkGrad)" opacity={0.92} />
      <path d={lv[2]} stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" strokeLinecap="round" />
      <path d={lv[3]} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />

      {/* Outer petals */}
      <g>
        {Array.from({ length: petalCount }).map((_, i) => (
          <path
            key={i}
            d="M60 58 C77 53 81 26 60 12 C39 26 43 53 60 58Z"
            fill={`url(#pet-${vi})`}
            transform={`rotate(${i * 36} 60 60)`}
            opacity={0.94}
          />
        ))}
      </g>

      {/* Shade for depth behind inner petals */}
      <circle cx="60" cy="60" r="33" fill="url(#shadeGrad)" />

      {/* Inner petals — offset ring */}
      <g transform="translate(60 60) rotate(18) scale(0.68) translate(-60 -60)">
        {Array.from({ length: petalCount }).map((_, i) => (
          <path
            key={i}
            d="M60 58 C77 53 81 26 60 12 C39 26 43 53 60 58Z"
            fill={`url(#petlight-${vi})`}
            transform={`rotate(${i * 36} 60 60)`}
            opacity={0.95}
          />
        ))}
      </g>

      {/* Stamens */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          cx={60 + 12 * Math.cos(((i * 60 - 30) * Math.PI) / 180)}
          cy={60 + 12 * Math.sin(((i * 60 - 30) * Math.PI) / 180)}
          r="2"
          fill="#6d3f09"
          opacity={0.4}
        />
      ))}

      {/* Core */}
      <circle cx="60" cy="60" r="15" fill={`url(#core-${vi})`} />
      <circle cx="60" cy="60" r="15" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      <circle cx="56" cy="55.5" r="3" fill="#fff2b0" opacity={0.6} />
      <circle cx="63" cy="57.5" r="1.6" fill="#fff2b0" opacity={0.4} />
    </svg>
  );
}