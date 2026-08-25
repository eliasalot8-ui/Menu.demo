import { useMemo } from 'react';
import { multiLerp } from '../utils/color';
import { CATEGORIES } from '../data/menu';
import { TONES } from './art/tones';
import './DayNightLayer.css';

// Los stops de ambientación salen directamente de la paleta de cada
// categoría, así el fondo global siempre coincide con el "clima"
// que ve la ilustración de esa sección (mañana clara → noche de bar).
const STOPS = CATEGORIES.map((cat, i) => ({
  at: i / (CATEGORIES.length - 1),
  color: TONES[cat.mood].bg,
}));

const ACCENT_STOPS = CATEGORIES.map((cat, i) => ({
  at: i / (CATEGORIES.length - 1),
  color: TONES[cat.mood].blobB,
}));

export default function DayNightLayer({ progress }) {
  const bg = useMemo(() => multiLerp(STOPS, progress), [progress]);
  const accent = useMemo(() => multiLerp(ACCENT_STOPS, progress), [progress]);
  const nightAmount = Math.max(0, (progress - 0.62) / 0.38);

  const specks = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        delay: (i % 7) * 0.6,
        size: 2 + (i % 3),
      })),
    []
  );

  return (
    <div className="day-night" style={{ '--dn-bg': bg, '--dn-accent': accent }} aria-hidden="true">
      <div className="day-night__wash" />
      <div className="day-night__specks" style={{ opacity: nightAmount }}>
        {specks.map((s) => (
          <span
            key={s.id}
            className="day-night__speck"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}
