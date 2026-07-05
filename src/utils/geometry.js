import * as THREE from 'three';

export function vec3([x, y = 0, z = 0]) {
  return new THREE.Vector3(x, y, z);
}

export function makeRoundedBox(width, height, depth, radius = 0) {
  if (radius <= 0) return new THREE.BoxGeometry(width, height, depth);
  return new THREE.BoxGeometry(width, height, depth, 3, 3, 3);
}

export function makeLine(points, color, width = 4, options = {}) {
  const vectors = points.map(vec3);
  const curve = new THREE.CatmullRomCurve3(vectors, options.closed ?? false, 'catmullrom', 0.24);
  const geometry = new THREE.TubeGeometry(curve, options.segments ?? 96, width, options.radialSegments ?? 8, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.72,
    metalness: options.metalness ?? 0.04,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0
  });
  material.userData.baseColor = color;
  material.userData.glow = options.glow ?? 0;
  return new THREE.Mesh(geometry, material);
}

export function makeFlatBox({ width, depth, height = 2, color, materialFactory = null, options = {} }) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = materialFactory
    ? materialFactory(color, { roughness: 0.86, metalness: 0.02, ...options })
    : new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  return mesh;
}

export function makeGroundPolygon(points, color, materialFactory, options = {}) {
  const shape = new THREE.Shape();
  points.forEach(([x, , z], index) => {
    if (index === 0) shape.moveTo(x, z);
    else shape.lineTo(x, z);
  });
  shape.closePath();
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  const material = materialFactory(color, {
    roughness: options.roughness ?? 0.86,
    metalness: options.metalness ?? 0.02,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  return mesh;
}

export function rectangleToPolygon(cx, cz, width, depth, y = 0) {
  return [
    [cx - width / 2, y, cz - depth / 2],
    [cx + width / 2, y, cz - depth / 2],
    [cx + width / 2, y, cz + depth / 2],
    [cx - width / 2, y, cz + depth / 2]
  ];
}

export function makeEllipseSurface({ center, radius, color, materialFactory, segments = 72, start = 0, end = Math.PI * 2, opacity = 1 }) {
  const [cx, y, cz] = center;
  const [rx, rz] = radius;
  const points = [[cx, y, cz]];
  for (let i = 0; i <= segments; i += 1) {
    const a = start + (end - start) * (i / segments);
    points.push([cx + Math.cos(a) * rx, y, cz + Math.sin(a) * rz]);
  }
  return makeGroundPolygon(points, color, materialFactory, { transparent: opacity < 1, opacity, roughness: 0.48 });
}

export function makeRoadSegment(start, end, width, color, materialFactory, options = {}) {
  const [x1, y1, z1] = start;
  const [x2, y2, z2] = end;
  const dx = x2 - x1;
  const dz = z2 - z1;
  const length = Math.hypot(dx, dz);
  const geometry = new THREE.BoxGeometry(length, options.height ?? 1.2, width);
  const material = materialFactory(color, {
    roughness: options.roughness ?? 0.78,
    metalness: options.metalness ?? 0.03,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
  mesh.rotation.y = -Math.atan2(dz, dx);
  mesh.receiveShadow = true;
  return mesh;
}

export function makeRoadPath(points, width, color, materialFactory, options = {}) {
  const group = new THREE.Group();
  for (let i = 0; i < points.length - 1; i += 1) {
    group.add(makeRoadSegment(points[i], points[i + 1], width, color, materialFactory, options));
  }
  points.forEach((point) => {
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(width / 2, width / 2, options.height ?? 1.25, 24),
      materialFactory(color, { roughness: options.roughness ?? 0.78, metalness: 0.03 })
    );
    cap.rotation.x = Math.PI / 2;
    cap.position.set(point[0], point[1], point[2]);
    cap.receiveShadow = true;
    group.add(cap);
  });
  return group;
}

export function makeDisk({ radius, height = 1.2, color, materialFactory, segments = 48 }) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, segments),
    materialFactory(color, { roughness: 0.82, metalness: 0.02 })
  );
  mesh.receiveShadow = true;
  return mesh;
}

export function setPositionFromData(mesh, position, yOffset = 0) {
  mesh.position.set(position[0], position[1] + yOffset, position[2]);
  return mesh;
}

export function tagObject(object, userData) {
  object.userData = { ...(object.userData || {}), ...userData };
  object.traverse?.((child) => {
    if (child.isMesh) {
      child.castShadow = child.castShadow ?? true;
      child.receiveShadow = child.receiveShadow ?? true;
    }
  });
  return object;
}
