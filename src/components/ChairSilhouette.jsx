/**
 * Static fallback for prefers-reduced-motion: a flat editorial silhouette
 * of the N01 shell, echoing the 3D lathe profile without any animation.
 */
export default function ChairSilhouette({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 460"
      role="img"
      aria-label="N01 Lounge Chair silhouette"
    >
      <defs>
        <linearGradient id="shellFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe6d1" />
          <stop offset="100%" stopColor="#d8cdb8" />
        </linearGradient>
      </defs>
      <path
        d="M120 420 C 90 420 70 400 70 360 L70 300 C 70 250 90 220 100 190 C 70 170 60 140 70 100 C 82 55 130 30 200 30 C 270 30 318 55 330 100 C 340 140 330 170 300 190 C 310 220 330 250 330 300 L330 360 C 330 400 310 420 280 420 Z"
        fill="url(#shellFill)"
      />
      <ellipse cx="200" cy="252" rx="112" ry="34" fill="#c7a97e" opacity="0.9" />
      <rect x="185" y="382" width="30" height="60" fill="#1c1a17" />
      <ellipse cx="200" cy="446" rx="80" ry="10" fill="#100e0c" />
    </svg>
  );
}
