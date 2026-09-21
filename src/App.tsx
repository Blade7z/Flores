import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { Sun } from './components/Sun';
import { Clouds } from './components/Clouds';
import { Ground } from './components/Ground';
import { FlowerField } from './components/FlowerField';
import { PetalRain } from './components/PetalRain';
import { Fireflies } from './components/Fireflies';
import { Burst } from './components/Burst';
import { chime } from './lib/chime';
import { rand, randInt } from './lib/random';
import type { BurstItem, GrownFlower } from './types';

const MAX_FLOWERS = 40;

function App() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const idRef = useRef(0);
  const [grown, setGrown] = useState<GrownFlower[]>([]);
  const [bursts, setBursts] = useState<BurstItem[]>([]);
  const [sent, setSent] = useState(false);

  const spawnBurst = useCallback(
    (kind: BurstItem['kind'], bx: number, by: number, count: number) => {
      idRef.current += 1;
      setBursts((prev) => [...prev, { id: idRef.current, kind, bx, by, count }]);
    },
    [],
  );

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const plantFlower = useCallback(
    (left: number, bottom: number, scale?: number, variant?: number) => {
      idRef.current += 1;
      const flower: GrownFlower = {
        id: idRef.current,
        left: Math.min(96, Math.max(4, left)),
        bottom: Math.min(20, Math.max(3, bottom)),
        scale: scale ?? rand(0.8, 1.35),
        variant: variant ?? randInt(0, 4),
        flipped: Math.random() > 0.5,
      };
      setGrown((prev) => [...prev.slice(-(MAX_FLOWERS - 1)), flower]);
    },
    [],
  );

  const handleSceneClick = (e: MouseEvent) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    plantFlower(x, Math.min(18, Math.max(3, 100 - y)));
    spawnBurst('sparkle', Math.min(96, Math.max(4, x)), y, 8);
    chime('grow');
  };

  const sendKiss = (e: MouseEvent) => {
    e.stopPropagation();
    setSent(true);
    spawnBurst('hearts', 50, 55, 22);
    for (let i = 0; i < 3; i += 1) {
      plantFlower(rand(15, 85), rand(5, 16));
    }
    chime('kiss');
  };

  return (
    <main
      ref={sceneRef}
      className="scene"
      onClick={handleSceneClick}
      aria-label="Campo de flores amarillas interactivo"
    >
      <Sun />
      <Clouds />
      <Ground layer="far" />
      <FlowerField grown={grown} />
      <Ground layer="near" />

      <Fireflies />
      <PetalRain />

      <div className="overlay">
        <div className="overlay__inner">
          <span className="eyebrow">Primavera · 21 de septiembre</span>
          <h1 className="title">
            Flores amarillas
            <span className="title-em">para vos</span>
          </h1>
          <p className="verse" hidden={sent}>
            Para la persona que enciende mis días: cada pétalo guarda un poco de tu luz.
          </p>

          <div className="cta-row">
            <button type="button" className="cta" onClick={sendKiss}>
              <svg className="heart" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21.5s-6.7-4.35-9.3-7.6C.6 11 2 7.7 5 7.4c1.9-.2 3.3.6 4 1.7.7-1.1 2.1-1.9 4-1.7 3 .3 4.4 3.6 2.3 6.1C18.7 17.15 12 21.5 12 21.5Z" />
              </svg>
              {sent ? 'Enviar otro beso' : 'Enviar un beso'}
            </button>
          </div>

          {sent && <p className="love-note">Gracias por existir. Te quiero, hoy y siempre.</p>}

          <span className="hint">
            <svg
              className="hint__flower"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <g transform="translate(12 12)">
                <ellipse cx="0" cy="-7" rx="2.6" ry="4.8" />
                <ellipse cx="0" cy="-7" rx="2.6" ry="4.8" transform="rotate(72)" />
                <ellipse cx="0" cy="-7" rx="2.6" ry="4.8" transform="rotate(144)" />
                <ellipse cx="0" cy="-7" rx="2.6" ry="4.8" transform="rotate(216)" />
                <ellipse cx="0" cy="-7" rx="2.6" ry="4.8" transform="rotate(288)" />
                <circle r="2.6" />
              </g>
            </svg>
            Tocá en cualquier lado y plantá tu flor
          </span>

          {grown.length >= 3 && (
            <span className="counter">
              Tu jardín tiene {grown.length} {grown.length === 1 ? 'flor' : 'flores'}
            </span>
          )}
        </div>
      </div>

      <div className="bursts" aria-hidden="true">
        {bursts.map((b) => (
          <Burst key={b.id} item={b} onDone={removeBurst} />
        ))}
      </div>

      <div className="vignette" />
    </main>
  );
}

export default App;