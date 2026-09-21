export function Ground({ layer }: { layer: 'far' | 'near' }) {
  if (layer === 'far') {
    return (
      <div className="hill hill--far" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" width="100%" height="150">
          <defs>
            <linearGradient id="hillFarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8fcd83" />
              <stop offset="1" stopColor="#5aa554" />
            </linearGradient>
          </defs>
          <path
            d="M0 320V286C180 210 340 194 540 218C720 240 900 160 1120 188C1280 208 1360 200 1440 210V320Z"
            fill="url(#hillFarFill)"
          />
          <path
            d="M0 286C180 210 340 194 540 218C720 240 900 160 1120 188C1280 208 1360 200 1440 210"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="hill hill--near" aria-hidden="true">
      <svg viewBox="0 0 1440 360" preserveAspectRatio="none" width="100%" height="200">
        <defs>
          <linearGradient id="hillNearFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#59b06a" />
            <stop offset="1" stopColor="#2c6f42" />
          </linearGradient>
        </defs>
        <path
          d="M0 360V312C160 244 360 212 600 252C780 282 960 224 1200 260C1360 284 1420 270 1440 272V360Z"
          fill="url(#hillNearFill)"
        />
        <path
          d="M0 312C160 244 360 212 600 252C780 282 960 224 1200 260C1360 284 1420 270 1440 272"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}