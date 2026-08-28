import * as THREE from "three";

/**
 * Procedural N01 shell: a lathe revolve left open at the front, producing
 * a bucket/tub-chair silhouette without any external model or texture.
 */
export function shellGeometry() {
  const points = [
    new THREE.Vector2(0.06, 0.0),
    new THREE.Vector2(0.58, 0.02),
    new THREE.Vector2(0.74, 0.1),
    new THREE.Vector2(0.76, 0.24),
    new THREE.Vector2(0.68, 0.4),
    new THREE.Vector2(0.58, 0.56),
    new THREE.Vector2(0.55, 0.7),
    new THREE.Vector2(0.6, 0.84),
    new THREE.Vector2(0.68, 0.94),
    new THREE.Vector2(0.62, 1.0),
  ];
  const gapDeg = 78;
  const phiStart = THREE.MathUtils.degToRad(90 + gapDeg / 2);
  const phiLength = THREE.MathUtils.degToRad(360 - gapDeg);
  return new THREE.LatheGeometry(points, 72, phiStart, phiLength);
}

export function cushionGeometry() {
  const geo = new THREE.SphereGeometry(0.56, 48, 32);
  geo.scale(1, 0.3, 0.86);
  return geo;
}

export const CHAIR_MATERIALS = {
  shell: {
    color: "#e9dfc9",
    roughness: 0.86,
    metalness: 0.02,
    clearcoat: 0.12,
    clearcoatRoughness: 0.6,
    side: THREE.DoubleSide,
  },
  cushion: { color: "#c7a97e", roughness: 1, metalness: 0 },
  pedestal: { color: "#1c1a17", roughness: 0.28, metalness: 0.9 },
  foot: { color: "#100e0c", roughness: 0.35, metalness: 0.85 },
};
