const STEMS: Record<number, string> = {
  0: 'M60 64 C53 98 67 140 60 194',
  1: 'M60 64C66 94 54 138 60 194',
  2: 'M60 60 C56 104 64 144 60 192',
  3: 'M60 66 C66 100 54 140 60 192',
  4: 'M60 64 C58 106 62 146 60 194',
};

const LEAVES: Record<number, [string, string, string, string]> = {
  0: [
    'M60 108C32 94 20 102 18 120C30 130 52 126 60 112Z',
    'M60 144C86 130 100 138 100 156C88 168 66 160 60 148Z',
    'M60 110C46 104 32 106 21 120',
    'M60 146C74 140 90 142 97 156',
  ],
  1: [
    'M60 114C30 102 18 112 16 132C30 144 52 134 60 118Z',
    'M60 158C84 144 96 152 98 170C88 182 64 174 60 162Z',
    'M60 116C46 108 30 114 20 132',
    'M60 160C74 154 90 154 94 168',
  ],
  2: [
    'M60 112C34 98 22 106 20 124C32 136 54 128 60 116Z',
    'M60 152C82 138 94 148 96 166C86 178 62 168 60 156Z',
    'M60 114C44 106 28 112 23 124',
    'M60 154C76 148 90 150 92 164',
  ],
  3: [
    'M60 110C28 96 16 106 16 126C28 138 50 128 60 114Z',
    'M60 150C88 136 100 146 100 164C90 176 66 166 60 154Z',
    'M60 112C44 104 26 110 20 124',
    'M60 152C76 144 92 148 96 162',
  ],
  4: [
    'M60 112C32 100 20 110 18 128C32 140 52 130 60 116Z',
    'M60 154C86 142 98 150 100 168C88 180 64 170 60 158Z',
    'M60 114C46 108 30 112 22 128',
    'M60 156C76 150 92 152 96 166',
  ],
};

const PETAL_COUNT = 6;

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
      <path d={s} stroke="url(#stemGrad)" strokeWidth="6.5" strokeLinecap="round" fill="none" />

      {/* Leaves */}
      <g>
        <path d={lv[0]} fill="url(#leafGrad)" />
        <path d={lv[1]} fill="url(#leafDarkGrad)" opacity={0.92} />
        <path d={lv[2]} stroke="rgba(255,255,255,0.5)" strokeWidth="1.1" strokeLinecap="round" />
        <path d={lv[3]} stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Cabeza: pétalos + cara, se mece despacito */}
      <g className="fl-head">
        {/* Pétalos que respiran, cada uno con su propio tiempo */}
        {Array.from({ length: PETAL_COUNT }).map((_, i) => (
          <g key={i} transform={`rotate(${i * (360 / PETAL_COUNT)} 60 60)`}>
            <path
              className="fl-petal"
              style={{ ['--pw' as string]: `${(i * 0.22).toFixed(2)}s` }}
              d="M60 58 C 81 54, 83 20, 60 6 C 37 20, 39 54, 60 58 Z"
              fill={`url(#pet-${vi})`}
              stroke="#c98a10"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <ellipse cx="60" cy="17" rx="4.6" ry="7.4" fill="#fff3c4" opacity="0.5" />
          </g>
        ))}

        {/* Disco central */}
        <circle cx="60" cy="60" r="18.5" fill={`url(#core-${vi})`} stroke="#c98a10" strokeWidth="2.6" />
        <circle cx="60" cy="60" r="14" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.6" />

        {/* Ojos con parpadeo */}
        <g className="fl-blink" style={{ ['--blk' as string]: '0.4s' }}>
          <circle cx="51.5" cy="56.5" r="4.6" fill="#4a2a09" />
          <circle cx="53.2" cy="54.4" r="1.6" fill="#fff" opacity="0.92" />
        </g>
        <g className="fl-blink" style={{ ['--blk' as string]: '0.4s' }}>
          <circle cx="68.5" cy="56.5" r="4.6" fill="#4a2a09" />
          <circle cx="70.2" cy="54.4" r="1.6" fill="#fff" opacity="0.92" />
        </g>

        {/* Mejillas */}
        <ellipse cx="45.5" cy="65.5" rx="4.6" ry="3.1" fill="#ff9d5c" opacity="0.5" />
        <ellipse cx="74.5" cy="65.5" rx="4.6" ry="3.1" fill="#ff9d5c" opacity="0.5" />

        {/* Sonrisa */}
        <path
          d="M53.5 66.5 Q60 73 66.5 66.5"
          stroke="#4a2a09"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Destello de luz */}
        <circle cx="55" cy="55" r="1.4" fill="rgba(255,241,176,0.7)" />
      </g>
    </svg>
  );
}