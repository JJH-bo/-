import * as THREE from 'three';

const toHex = (value) => (typeof value === 'number' ? value : new THREE.Color(value).getHex());

export function createMaterialFactory() {
  const cache = new Map();
  return function material(color, options = {}) {
    const baseColor = toHex(color);
    const key = `${baseColor}-${JSON.stringify(options)}`;
    if (cache.has(key)) return cache.get(key);
    const mat = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: options.roughness ?? 0.76,
      metalness: options.metalness ?? 0.04,
      transparent: options.transparent ?? false,
      opacity: options.opacity ?? 1,
      emissive: options.emissive ?? 0x000000,
      emissiveIntensity: options.emissiveIntensity ?? 0
    });
    mat.userData.baseColor = baseColor;
    mat.userData.nightColor = options.nightColor ?? baseColor;
    mat.userData.glow = options.glow ?? options.emissive ?? 0;
    mat.userData.nightIntensity = options.nightIntensity ?? 0.38;
    cache.set(key, mat);
    return mat;
  };
}

export function makeGlassMaterial(color = 0x8fd3ff, options = {}) {
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    roughness: options.roughness ?? 0.24,
    metalness: options.metalness ?? 0.08,
    transmission: options.transmission ?? 0.18,
    transparent: true,
    opacity: options.opacity ?? 0.72,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0
  });
  mat.userData.baseColor = color;
  mat.userData.glow = options.glow ?? 0x78d8ff;
  mat.userData.nightIntensity = options.nightIntensity ?? 0.28;
  return mat;
}

export function applyNightMode(scene, enabled) {
  scene.traverse((obj) => {
    if (!obj.material) return;
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach((mat) => {
      if (!mat.userData || mat.userData.baseColor === undefined) return;
      if (enabled) {
        const base = new THREE.Color(mat.userData.baseColor);
        base.lerp(new THREE.Color(0x071827), 0.46);
        mat.color.copy(base);
        if (mat.userData.glow) {
          mat.emissive.setHex(mat.userData.glow);
          mat.emissiveIntensity = mat.userData.nightIntensity ?? 0.42;
        }
      } else {
        mat.color.setHex(mat.userData.baseColor);
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }
      mat.needsUpdate = true;
    });
  });
}
