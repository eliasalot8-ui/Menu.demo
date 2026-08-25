import { useRef } from 'react';
import './Button.css';

// Botón con "magnetic effect" mínimo en desktop (no-touch).
export default function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...rest }) {
  const ref = useRef(null);

  function handleMove(e) {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.28}px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = '';
  }

  return (
    <Tag
      ref={ref}
      className={`btn btn--${variant} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
