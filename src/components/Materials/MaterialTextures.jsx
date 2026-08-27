/**
 * Four generative macro-textures built from SVG filter noise — stands in
 * for material photography without any external image asset.
 */
export default function MaterialTextures() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="tex-oak" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.09" numOctaves="4" seed="7" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.55
                    0 0 0 0 0.36
                    0 0 0 0 0.2
                    0 0 0 0.9 0"
          />
        </filter>

        <filter id="tex-travertine" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="3" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.78
                    0 0 0 0 0.74
                    0 0 0 0 0.66
                    0 0 0 0.85 0"
          />
        </filter>

        <filter id="tex-steel" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.9 0.02" numOctaves="2" seed="11" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.66
                    0 0 0 0 0.68
                    0 0 0 0 0.7
                    0 0 0 0.5 0"
          />
        </filter>

        <filter id="tex-wool" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="5" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.78
                    0 0 0 0 0.68
                    0 0 0 0 0.52
                    0 0 0 0.6 0"
          />
        </filter>
      </defs>
    </svg>
  );
}
