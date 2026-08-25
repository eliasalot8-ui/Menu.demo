function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToCss([r, g, b], alpha = 1) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function lerpColor(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mixed = a.map((channel, i) => Math.round(channel + (b[i] - channel) * t));
  return rgbToCss(mixed);
}

// Interpola sobre una lista de stops [{ at: 0..1, color: '#rrggbb' }]
export function multiLerp(stops, progress) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < stops.length - 1; i += 1) {
    const cur = stops[i];
    const next = stops[i + 1];
    if (p >= cur.at && p <= next.at) {
      const localT = (p - cur.at) / (next.at - cur.at || 1);
      return lerpColor(cur.color, next.color, localT);
    }
  }
  return stops[stops.length - 1].color;
}
