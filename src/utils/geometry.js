import * as THREE from 'three';

export function makeRoundedBox(width, height, depth, radius = 0) {
  if (radius <= 0) return new THREE.BoxGeometry(width, height, depth);
  return new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
}

export function makeLine(points, color, width = 4) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
  const tube = new THREE.TubeGeometry(curve, 80, width, 8, false);
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04 });
  return new THREE.Mesh(tube, material);
}

export function makeFlatBox({ width, depth, height = 2, color }) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  return mesh;
}

export function setPositionFromData(mesh, position, yOffset = 0) {
  mesh.position.set(position[0], position[1] + yOffset, position[2]);
  return mesh;
}
