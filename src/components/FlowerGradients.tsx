import { FLOWER_VARIANTS } from '../constants';

export function FlowerGradients() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#43b974" />
          <stop offset="1" stopColor="#1f7c47" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#79dd97" />
          <stop offset="1" stopColor="#3f9e5f" />
        </linearGradient>
        <linearGradient id="leafDarkGrad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f9e5f" />
          <stop offset="1" stopColor="#2b7c45" />
        </linearGradient>
        <radialGradient id="shadeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0.55" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.18)" />
        </radialGradient>

        {FLOWER_VARIANTS.map((v, i) => (
          <g key={i}>
            <radialGradient id={`pet-${i}`} cx="50%" cy="62%" r="64%">
              <stop offset="0" stopColor={v.light} />
              <stop offset="0.55" stopColor={v.petal} />
              <stop offset="1" stopColor={v.deep} />
            </radialGradient>
            <radialGradient id={`petlight-${i}`} cx="50%" cy="60%" r="65%">
              <stop offset="0" stopColor="#fff6cf" />
              <stop offset="0.6" stopColor={v.light} />
              <stop offset="1" stopColor={v.petal} />
            </radialGradient>
            <radialGradient id={`core-${i}`} cx="45%" cy="40%" r="75%">
              <stop offset="0" stopColor="#ffd76a" />
              <stop offset="0.5" stopColor={v.core} />
              <stop offset="1" stopColor={v.coreDark} />
            </radialGradient>
          </g>
        ))}
      </defs>
    </svg>
  );
}