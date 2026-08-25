import { toneFor } from './tones';

// Sistema de ilustración editorial en línea fina que reemplaza a la
// fotografía cuando no hay acceso a bancos de imágenes. Cada "type"
// dibuja una composición simple y coherente sobre un fondo de manchas
// suaves con el tono de la categoría (mañana cálida → noche de bar).
// Ver ASSETS_NEEDED.md para reemplazar esto por fotografía real.

function Icon({ type, stroke }) {
  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'espresso':
      return (
        <g {...common}>
          <path d="M34 46h32l-4 22a6 6 0 0 1-6 5H44a6 6 0 0 1-6-5z" />
          <path d="M66 50h6a7 7 0 0 1 0 14h-5" />
          <ellipse cx="50" cy="30" rx="17" ry="4" opacity="0.5" />
          <path d="M44 22c2-4 2-6-1-9M52 22c2-4 2-6-1-9M60 22c2-4 2-6-1-9" opacity="0.55" />
        </g>
      );
    case 'milk-cup':
      return (
        <g {...common}>
          <path d="M28 44h44l-5 26a7 7 0 0 1-7 6H40a7 7 0 0 1-7-6z" />
          <path d="M72 48h7a8 8 0 0 1 0 16h-6" />
          <path d="M40 44c3-6 20-6 24 0" opacity="0.6" />
          <path d="M40 20c2-4 2-6-1-9M50 20c2-4 2-6-1-9M60 20c2-4 2-6-1-9" opacity="0.5" />
        </g>
      );
    case 'iced-cup':
      return (
        <g {...common}>
          <path d="M36 32h28l-4 42a4 4 0 0 1-4 4H44a4 4 0 0 1-4-4z" />
          <path d="M40 44h20M39 54h22M40 64h20" opacity="0.45" />
          <path d="M58 26l6-14" />
        </g>
      );
    case 'viennoiserie':
      return (
        <g {...common}>
          <path d="M20 58c8-22 30-30 45-22 12 6 15 20 8 22-6 2-8-8-16-8-9 0-10 10-19 12-9 2-16-1-18-4z" />
          <path d="M34 46c6-8 16-12 24-10M30 54c8-10 20-14 30-10" opacity="0.5" />
        </g>
      );
    case 'toast':
      return (
        <g {...common}>
          <path d="M22 66V44a14 14 0 0 1 28 0v22z" />
          <path d="M50 66V44a14 14 0 0 1 28 0v22z" opacity="0.6" />
          <path d="M30 44c6-6 10 4 16-1s10 5 16 0" opacity="0.7" />
          <circle cx="40" cy="40" r="1.3" fill={stroke} opacity="0.7" />
          <circle cx="58" cy="38" r="1.3" fill={stroke} opacity="0.7" />
          <circle cx="49" cy="36" r="1.3" fill={stroke} opacity="0.7" />
        </g>
      );
    case 'plate-egg':
      return (
        <g {...common}>
          <circle cx="50" cy="48" r="26" opacity="0.45" />
          <path d="M40 46c-2-8 6-14 12-8 8-2 14 6 8 12-2 6-12 8-16 2-6 0-6-4-4-6z" />
          <circle cx="49" cy="47" r="5" />
          <path d="M22 56c4 2 8 2 12 0M66 40c4-2 8-2 12 0" opacity="0.4" />
        </g>
      );
    case 'bowl':
      return (
        <g {...common}>
          <path d="M22 46c0 14 12 24 28 24s28-10 28-24z" />
          <ellipse cx="50" cy="46" rx="28" ry="7" />
          <circle cx="42" cy="46" r="1.6" fill={stroke} />
          <circle cx="52" cy="49" r="1.6" fill={stroke} />
          <circle cx="60" cy="45" r="1.6" fill={stroke} />
        </g>
      );
    case 'board':
      return (
        <g {...common}>
          <rect x="14" y="30" width="72" height="38" rx="10" />
          <path d="M14 42h72M14 56h72" opacity="0.2" />
          <path d="M26 50c0-6 5-10 11-10s10 5 8 11-9 7-13 4-6-2-6-5z" opacity="0.65" />
          <circle cx="58" cy="46" r="3" opacity="0.6" />
          <circle cx="65" cy="51" r="3" opacity="0.6" />
          <circle cx="60" cy="55" r="3" opacity="0.6" />
          <path d="M20 60l10-6" opacity="0.55" />
        </g>
      );
    case 'burger':
      return (
        <g {...common}>
          <path d="M22 44c0-10 12-16 28-16s28 6 28 16z" />
          <circle cx="34" cy="34" r="1.4" fill={stroke} />
          <circle cx="44" cy="30" r="1.4" fill={stroke} />
          <circle cx="56" cy="30" r="1.4" fill={stroke} />
          <circle cx="66" cy="34" r="1.4" fill={stroke} />
          <path d="M20 50h60M22 58h56" />
          <path d="M20 50c0 12 6 16 30 16s30-4 30-16" />
        </g>
      );
    case 'milanesa':
      return (
        <g {...common}>
          <circle cx="50" cy="48" r="27" opacity="0.4" />
          <ellipse cx="47" cy="46" rx="20" ry="14" />
          <circle cx="40" cy="42" r="1.2" fill={stroke} />
          <circle cx="48" cy="38" r="1.2" fill={stroke} />
          <circle cx="55" cy="44" r="1.2" fill={stroke} />
          <circle cx="45" cy="52" r="1.2" fill={stroke} />
          <circle cx="53" cy="52" r="1.2" fill={stroke} />
          <path d="M70 54v10M75 54v10M80 54v10" opacity="0.5" />
        </g>
      );
    case 'pasta':
      return (
        <g {...common}>
          <path d="M20 50c0 14 13 22 30 22s30-8 30-22z" />
          <ellipse cx="50" cy="50" rx="30" ry="8" />
          <path d="M34 46c6 4 10-4 16 0s10-4 16 0" opacity="0.6" />
          <path d="M38 52c6 4 8-3 14 0s8-3 12 0" opacity="0.45" />
        </g>
      );
    case 'fries':
      return (
        <g {...common}>
          <path d="M32 46h36l-6 26a5 5 0 0 1-5 4H43a5 5 0 0 1-5-4z" />
          <path d="M38 46v-18M46 46v-24M54 46v-24M62 46v-18" />
        </g>
      );
    case 'dessert-slice':
      return (
        <g {...common}>
          <path d="M26 66l24-38 24 38z" />
          <path d="M32 66l18-30 18 30" opacity="0.5" />
          <path d="M35 55h30M38 62h24" opacity="0.4" />
          <circle cx="50" cy="24" r="4" opacity="0.6" />
        </g>
      );
    case 'juice-glass':
      return (
        <g {...common}>
          <path d="M38 30h24l-3 38a5 5 0 0 1-5 4H46a5 5 0 0 1-5-4z" />
          <path d="M39 42h22" opacity="0.5" />
          <path d="M56 26l5-12" />
        </g>
      );
    case 'soda':
      return (
        <g {...common}>
          <path d="M42 24h16v10l6 8v28a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6V42l6-8z" />
          <rect x="44" y="18" width="12" height="7" rx="2" />
        </g>
      );
    case 'cocktail-glass':
      return (
        <g {...common}>
          <path d="M24 26h52L50 54z" />
          <path d="M50 54v20M38 74h24" />
          <path d="M58 34c-3 4-3 8 0 12" opacity="0.5" />
          <circle cx="34" cy="30" r="2.2" opacity="0.6" />
        </g>
      );
    case 'beer':
      return (
        <g {...common}>
          <path d="M30 34h28v34a5 5 0 0 1-5 5H35a5 5 0 0 1-5-5z" />
          <path d="M58 40h6a6 6 0 0 1 0 16h-6" />
          <path d="M30 34c0-6 28-6 28 0" opacity="0.6" />
          <path d="M36 34v-4M44 34v-6M52 34v-4" opacity="0.4" />
        </g>
      );
    default:
      return <circle cx="50" cy="50" r="20" {...common} />;
  }
}

export default function Illustration({ type, mood = 'midday', className = '' }) {
  const tone = toneFor(mood);
  return (
    <svg
      viewBox="0 0 100 100"
      className={`illustration ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <filter id={`grain-${type}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono">
            <feFuncA type="linear" slope="0.06" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="100" height="100" fill={tone.bg} />
      <circle cx="30" cy="28" r="30" fill={tone.blobA} opacity="0.8" />
      <circle cx="72" cy="70" r="26" fill={tone.blobB} opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
      <g transform="translate(0,0)">
        <Icon type={type} stroke={tone.stroke} />
      </g>
      <rect width="100" height="100" filter={`url(#grain-${type})`} opacity="0.5" />
    </svg>
  );
}
