export function Ground({ layer }: { layer: 'far' | 'near' }) {
  if (layer === 'far') {
    return (
      <div className="hill hill--far" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" width="100%" height="180">
          <defs>
            <linearGradient id="hillFarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#362960" />
              <stop offset="1" stopColor="#1d1738" />
            </linearGradient>
          </defs>
          <path
            d="M0 320V286C180 210 340 194 540 218C720 240 900 160 1120 188C1280 208 1360 200 1440 210V320Z"
            fill="url(#hillFarFill)"
          />
          <path
            d="M0 286C180 210 340 194 540 218C720 240 900 160 1120 188C1280 208 1360 200 1440 210"
            fill="none"
            stroke="rgba(255,201,122,0.28)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="hill hill--near" aria-hidden="true">
      <svg viewBox="0 0 1440 360" preserveAspectRatio="none" width="100%" height="220">
        <defs>
          <linearGradient id="hillNearFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a2040" />
            <stop offset="1" stopColor="#14102a" />
          </linearGradient>
        </defs>
        <path
          d="M0 360V312C160 244 360 212 600 252C780 282 960 224 1200 260C1360 284 1420 270 1440 272V360Z"
          fill="url(#hillNearFill)"
        />
        <path
          d="M0 312C160 244 360 212 600 252C780 282 960 224 1200 260C1360 284 1420 270 1440 272"
          fill="none"
          stroke="rgba(255,201,122,0.22)"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}