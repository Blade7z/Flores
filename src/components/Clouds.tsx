const CLOUDS = [
  { top: '5%', dur: '52s', delay: '0s', w: 260 },
  { top: '11%', dur: '68s', delay: '-18s', w: 210 },
  { top: '17%', dur: '74s', delay: '-42s', w: 180 },
] as const;

export function Clouds() {
  return (
    <div aria-hidden="true">
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="cloud"
          style={{
            width: c.w,
            top: c.top,
            ['--dur-cloud' as string]: c.dur,
            ['--cloud-delay' as string]: c.delay,
          }}
        />
      ))}
    </div>
  );
}