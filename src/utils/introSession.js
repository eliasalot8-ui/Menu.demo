// Recuerda si la intro ya se mostró en esta sesión del navegador
// (sessionStorage: se borra al cerrar la pestaña, a diferencia de una
// cookie). Nunca debe romper la experiencia si el storage no está
// disponible (modo privado, permisos, etc.).
const KEY = 'nomada:intro-shown';

export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    // sessionStorage no disponible — seguimos sin recordar, sin romper nada.
  }
}
