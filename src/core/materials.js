import * as THREE from 'three';

export function createMaterialFactory() {
  const cache = new Map();
  return function material(color, options = {}) {
    const key = `${color}-${JSON.stringify(options)}`;
    if (cache.has(key)) return cache.get(key);
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: options.roughness ?? 0.76,
      metalness: options.metalness ?? 0.04,
      transparent: options.transparent ?? false,
      opacity: options.opacity ?? 1,
      emissive: options.emissive ?? 0x000000,
      emissiveIntensity: options.emissiveIntensity ?? 0
    });
    cache.set(key, mat);
    return mat;
  };
}

export function applyNightMode(scene, enabled) {
  scene.traverse((obj) => {
    if (!obj.material || !obj.userData.baseColor) return;
    if (enabled) {
      obj.material.color.setHex(obj.userData.nightColor ?? obj.userData.baseColor);
      if (obj.userData.glow) {
        obj.material.emissive.setHex(obj.userData.glow);
        obj.material.emissiveIntensity = 0.5;
      }
    } else {
      obj.material.color.setHex(obj.userData.baseColor);
      obj.material.emissive.setHex(0x000000);
      obj.material.emissiveIntensity = 0;
    }
  });
}
