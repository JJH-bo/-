import * as THREE from 'three';
import { makeLine, tagObject } from '../utils/geometry.js';

export class BuildingFactory {
  constructor(material) {
    this.material = material;
  }

  create(data) {
    const type = data.type || 'building';
    if (type.includes('central')) return this.centralTower(data);
    if (type.includes('triple')) return this.tripleHall(data);
    if (type.includes('street')) return this.brickHall(data);
    if (type.includes('bridgehead')) return this.bridgehead(data);
    if (type.includes('gate')) return this.gate(data);
    if (type.includes('factory') || type.includes('workshop')) return this.factory(data);
    if (type.includes('elevator')) return this.elevator(data);
    if (type.includes('spiral')) return this.spiral(data);
    if (type.includes('runway')) return this.runway(data);
    if (type.includes('cooling')) return this.cooling(data);
    if (type.includes('courtyard')) return this.courtyard(data);
    if (type.includes('trajectory')) return this.trajectory(data);
    if (type.includes('pit')) return this.pit(data);
    if (type.includes('stepped')) return this.stepped(data);
    if (type.includes('tower') || type.includes('skyscraper')) return this.tower(data);
    if (type.includes('hall') || type.includes('lab') || type.includes('station')) return this.hall(data);
    return this.basic(data);
  }

  basic(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0]);
    this.roofDetails(g, w, h, d, data.color, 0.7);
    this.plaque(g, data);
    return this.done(g, data);
  }

  hall(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.66, d, data.color, [0, h * 0.33, 0], { roughness: 0.68 });
    this.box(g, w * 1.02, h * 0.12, d * 1.05, this.light(data.color, 0.16), [0, h * 0.72, 0]);
    this.box(g, w * 0.92, h * 0.06, d * 0.96, this.light(data.color, 0.26), [0, h * 0.82, 0]);
    this.box(g, w * 0.12, h * 0.40, d * 0.12, this.light(data.color, 0.1), [-w * 0.38, h * 0.24, -d * 0.56]);
    this.box(g, w * 0.12, h * 0.40, d * 0.12, this.light(data.color, 0.1), [w * 0.38, h * 0.24, -d * 0.56]);
    this.windowGrid(g, w, h * 0.66, d, { rows: 4, cols: 5, y0: h * 0.16, face: 'front' });
    this.plaque(g, data);
    return this.done(g, data);
  }

  tripleHall(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    for (let i = -1; i <= 1; i += 1) {
      const scale = i === 0 ? 1 : 0.86;
      this.box(g, w * 0.28, h * scale, d, this.light(data.color, i === 0 ? 0.08 : 0.0), [i * w * 0.31, h * scale / 2, 0]);
      this.box(g, w * 0.21, h * 0.06, d * 1.06, this.light(data.color, 0.25), [i * w * 0.31, h * scale + 2.2, 0]);
    }
    this.box(g, w * 0.94, h * 0.08, d * 1.1, this.light(data.color, 0.2), [0, h * 0.18, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  brickHall(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0], { roughness: 0.82, metalness: 0.01 });
    for (let row = 0; row < Math.max(3, Math.floor(h / 11)); row += 1) {
      for (let col = -2; col <= 2; col += 1) {
        this.box(g, w * 0.10, 3.2, 1.1, 0xdfe7e5, [col * w * 0.17, 8 + row * 10.5, -d / 2 - 0.65], { glow: 0xf6f6d8, nightIntensity: 0.08, roughness: 0.46 });
      }
    }
    this.box(g, 2.2, h * 0.70, 3.0, 0x394048, [w / 2 + 1.8, h * 0.44, -d * 0.26], { roughness: 0.55 });
    this.roofDetails(g, w, h, d, data.color, 0.55);
    this.plaque(g, data);
    return this.done(g, data);
  }

  tower(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.82, d, data.color, [0, h * 0.41, 0], { glow: data.strongSymbol ? 0x9fd7ff : 0x000000, nightIntensity: 0.2, metalness: 0.08 });
    this.box(g, w * 0.72, h * 0.12, d * 0.72, this.light(data.color, 0.16), [0, h * 0.88, 0]);
    this.box(g, w * 0.46, h * 0.08, d * 0.46, this.light(data.color, 0.24), [0, h * 0.98, 0]);
    this.cone(g, w * 0.20, h * 0.12, this.light(data.color, 0.34), [0, h * 1.08, 0]);
    this.windowGrid(g, w, h * 0.82, d, { rows: 11, cols: 5, y0: h * 0.12, face: 'front' });
    this.windowGrid(g, w, h * 0.82, d, { rows: 9, cols: 3, y0: h * 0.16, face: 'side' });
    this.roofDetails(g, w, h, d, data.color, 0.9);
    this.plaque(g, data);
    return this.done(g, data);
  }

  centralTower(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.55, d, data.color, [0, h * 0.275, 0], { roughness: 0.48, metalness: 0.10, glow: 0x9fd7ff, nightIntensity: 0.22 });
    this.box(g, w * 0.76, h * 0.22, d * 0.76, this.light(data.color, 0.12), [0, h * 0.66, 0], { glow: 0x9fd7ff, nightIntensity: 0.24 });
    this.box(g, w * 0.54, h * 0.14, d * 0.54, this.light(data.color, 0.22), [0, h * 0.84, 0], { glow: 0x9fd7ff, nightIntensity: 0.28 });
    this.box(g, w * 0.30, h * 0.08, d * 0.30, this.light(data.color, 0.32), [0, h * 0.97, 0], { glow: 0x9fd7ff, nightIntensity: 0.32 });
    this.cone(g, w * 0.105, h * 0.24, this.light(data.color, 0.44), [0, h * 1.13, 0]);
    this.windowGrid(g, w, h * 0.55, d, { rows: 14, cols: 7, y0: h * 0.09, face: 'front' });
    this.windowGrid(g, w, h * 0.55, d, { rows: 12, cols: 4, y0: h * 0.10, face: 'side' });
    this.line(g, [[-w * 0.52, h * 0.93, -d * 0.52], [0, h * 1.12, 0], [w * 0.52, h * 0.93, d * 0.52]], 0xcdefff, 1.8, { glow: 0x7ecbff, nightIntensity: 0.38 });
    if (data.id?.includes('liberty')) {
      this.box(g, w * 0.20, h * 0.10, d * 0.20, 0xffd48a, [w * 0.18, h * 1.22, 0], { glow: 0xffd48a, nightIntensity: 0.65 });
      this.cone(g, w * 0.08, h * 0.12, 0xffd48a, [w * 0.18, h * 1.32, 0]);
    }
    this.plaque(g, data);
    return this.done(g, data);
  }

  stepped(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    let y = 0;
    [[1, 0.38], [0.82, 0.26], [0.62, 0.20], [0.42, 0.12]].forEach(([scale, ratio], index) => {
      const hh = h * ratio;
      this.box(g, w * scale, hh, d * scale, this.light(data.color, index * 0.08), [0, y + hh / 2, 0], { glow: data.strongSymbol ? 0x9fd7ff : 0, nightIntensity: 0.18 });
      y += hh;
    });
    this.windowGrid(g, w, h * 0.80, d, { rows: 8, cols: 4, y0: h * 0.10, face: 'front' });
    this.roofDetails(g, w * 0.42, h, d * 0.42, data.color, 1.0);
    this.plaque(g, data);
    return this.done(g, data);
  }

  spiral(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.34, h * 0.92, this.light(data.color, 0.08), [0, h * 0.46, 0], { radialSegments: 36, glow: 0xb9a9ff, nightIntensity: 0.2 });
    this.box(g, w * 0.74, h * 0.08, d * 0.74, this.light(data.color, 0.18), [0, h * 0.08, 0]);
    const pts = [];
    for (let i = 0; i < 120; i += 1) {
      const a = (i / 119) * Math.PI * 5.6;
      pts.push([Math.cos(a) * w * 0.46, h * 0.07 + h * 0.86 * i / 119, Math.sin(a) * d * 0.46]);
    }
    g.add(makeLine(pts, 0xd8c7ff, 2.0, { glow: 0xb895ff, emissive: 0x5f42c9, emissiveIntensity: 0.14, nightIntensity: 0.46 }));
    this.windowGrid(g, w * 0.72, h * 0.80, d * 0.72, { rows: 8, cols: 4, y0: h * 0.10, face: 'front' });
    this.plaque(g, data);
    return this.done(g, data);
  }

  gate(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    const glow = data.district?.includes('risk') ? 0xff5d42 : 0xcdbbff;
    this.box(g, w * 0.22, h, d, data.color, [-w * 0.34, h / 2, 0], { glow, nightIntensity: 0.22 });
    this.box(g, w * 0.22, h, d, data.color, [w * 0.34, h / 2, 0], { glow, nightIntensity: 0.22 });
    this.box(g, w, h * 0.17, d * 0.9, this.light(data.color, 0.14), [0, h * 0.90, 0], { glow, nightIntensity: 0.28 });
    this.box(g, w * 0.46, h * 0.10, d * 0.72, this.dark(data.color, 0.12), [0, h * 0.08, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  factory(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.58, d, data.color, [0, h * 0.29, 0], { roughness: 0.78 });
    for (let i = -1; i <= 1; i += 1) {
      const roof = this.box(g, w * 0.27, h * 0.16, d * 1.04, this.light(data.color, 0.12), [i * w * 0.25, h * 0.72, 0], { roughness: 0.74 });
      roof.rotation.z = i * 0.02;
    }
    this.cylinder(g, w * 0.05, h * 0.78, this.dark(data.color, 0.18), [w * 0.40, h * 0.82, d * 0.28], { radialSegments: 12 });
    this.cylinder(g, w * 0.045, h * 0.58, this.dark(data.color, 0.12), [w * 0.24, h * 0.72, d * 0.34], { radialSegments: 12 });
    this.line(g, [[-w * 0.46, h * 0.78, -d * 0.38], [-w * 0.12, h * 0.90, -d * 0.05], [w * 0.20, h * 0.82, d * 0.18], [w * 0.48, h * 0.78, d * 0.36]], 0x50473d, 2.0, { glow: data.strongSymbol ? 0xffc57a : 0, nightIntensity: 0.26 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  elevator(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.52, h, d * 0.52, data.color, [0, h / 2, 0], { glow: 0xffc57a, nightIntensity: 0.24 });
    [0.18, 0.42, 0.66, 0.92].forEach((u, i) => this.box(g, w * (1.10 + i * 0.07), h * 0.055, d * (1.10 + i * 0.07), this.light(data.color, 0.14 + i * 0.05), [0, h * u, 0], { glow: 0xffc57a, nightIntensity: 0.20 }));
    this.line(g, [[-w * 0.48, h * 0.12, -d * 0.48], [-w * 0.48, h * 1.02, -d * 0.48]], 0x2b211b, 2.2);
    this.line(g, [[w * 0.48, h * 0.12, d * 0.48], [w * 0.48, h * 1.02, d * 0.48]], 0x2b211b, 2.2);
    this.plaque(g, data);
    return this.done(g, data);
  }

  bridgehead(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.92, h * 0.35, d * 0.92, data.color, [0, h * 0.175, 0], { roughness: 0.70, glow: 0xffd15a, nightIntensity: 0.18 });
    this.box(g, w * 0.46, h * 0.70, d * 0.46, this.light(data.color, 0.12), [0, h * 0.58, 0], { glow: 0xffd15a, nightIntensity: 0.22 });
    this.line(g, [[-w * 0.52, h * 0.62, 0], [0, h * 1.02, 0], [w * 0.52, h * 0.62, 0]], 0xd6c49c, 2.0, { glow: 0xffd15a, nightIntensity: 0.42 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  runway(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0], { roughness: 0.92 });
    for (let i = -5; i <= 5; i += 1) this.box(g, w * 0.045, h * 0.18, d * 0.08, 0xe9ecef, [i * w * 0.085, h + 0.12, 0], { glow: 0xffffff, nightIntensity: 0.36 });
    this.line(g, [[-w * 0.45, h + 2, 0], [w * 0.45, h + 2, 0]], 0xe9ecef, 1.5, { glow: 0xffffff, nightIntensity: 0.22 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  cooling(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.42, h * 0.78, data.color, [0, h * 0.39, 0], { radialSegments: 36, glow: 0x9ce8d8, nightIntensity: 0.24, topScale: 0.78 });
    this.cylinder(g, w * 0.52, h * 0.12, this.light(data.color, 0.2), [0, h * 0.84, 0], { radialSegments: 36 });
    const pts = [];
    for (let i = 0; i < 56; i += 1) {
      const u = i / 55;
      pts.push([-w * 0.62 + u * w * 1.18, h * (0.86 - 0.55 * (1 - Math.exp(-3 * u))), d * 0.68]);
    }
    this.line(g, pts, 0xd27b6d, 2.0, { glow: 0xff7070, nightIntensity: 0.34 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  courtyard(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.10, d, this.light(data.color, 0.28), [0, h * 0.05, 0]);
    this.box(g, w * 0.88, h * 0.16, d * 0.12, data.color, [0, h * 0.18, -d * 0.44]);
    this.box(g, w * 0.88, h * 0.16, d * 0.12, data.color, [0, h * 0.18, d * 0.44]);
    this.box(g, w * 0.12, h * 0.16, d * 0.88, data.color, [-w * 0.44, h * 0.18, 0]);
    this.box(g, w * 0.12, h * 0.16, d * 0.88, data.color, [w * 0.44, h * 0.18, 0]);
    this.line(g, [[-w * 0.24, h * 0.24, -d * 0.24], [w * 0.22, h * 0.24, d * 0.18]], 0x6f8fa6, 2.0, { glow: 0x8ef0a8, nightIntensity: 0.2 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  trajectory(data) {
    const g = this.hall(data);
    const [w, h, d] = data.size;
    const pts = [];
    for (let i = 0; i < 64; i += 1) {
      const u = i / 63;
      pts.push([-w * 0.60 + u * w * 1.18, h + Math.sin(u * Math.PI) * h * 0.34, d * 0.64 + Math.cos(u * Math.PI) * d * 0.18]);
    }
    this.line(g, pts, 0x568f85, 2.4, { glow: 0x5eead4, nightIntensity: 0.36 });
    this.box(g, w * 0.08, h * 0.08, d * 0.08, 0x334155, [w * 0.45, h * 0.72, d * 0.55]);
    this.box(g, w * 0.08, h * 0.08, d * 0.08, 0x334155, [-w * 0.45, h * 0.58, d * 0.55]);
    return g;
  }

  pit(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, Math.min(w, d) * 0.46, h * 0.22, 0x32110d, [0, h * 0.08, 0], { radialSegments: 44 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.min(w, d) * 0.42, Math.min(w, d) * 0.055, 12, 44), this.material(data.color, { roughness: 0.7, glow: 0xff6b4a, nightIntensity: 0.48 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, h * 0.2, 0);
    g.add(ring);
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * Math.PI * 2;
      this.box(g, w * 0.08, h * 0.22, d * 0.02, 0xffb199, [Math.cos(a) * w * 0.46, h * 0.34, Math.sin(a) * d * 0.46], { glow: 0xff5d42, nightIntensity: 0.36 });
    }
    this.plaque(g, data);
    return this.done(g, data);
  }

  group(data) {
    const g = new THREE.Group();
    g.position.set(data.position[0], data.position[1], data.position[2]);
    g.name = data.name;
    return g;
  }

  done(g, data) {
    return tagObject(g, { type: 'building', id: data.id, title: data.name, formula: data.formula, description: data.role, district: data.district, labelTier: data.labelTier ?? 'mid', risks: data.risks ?? [], baseColor: data.color, glow: data.strongSymbol ? 0x9fd7ff : 0, payload: data });
  }

  box(g, w, h, d, color, pos, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.material(color, { roughness: 0.68, metalness: 0.06, ...options }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  }

  cylinder(g, radius, height, color, pos, options = {}) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * (options.topScale ?? 1), height, options.radialSegments ?? 18), this.material(color, { roughness: 0.62, metalness: 0.06, transparent: options.transparent ?? false, opacity: options.opacity ?? 1, ...options }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  }

  cone(g, radius, height, color, pos) {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 14), this.material(color, { roughness: 0.58, metalness: 0.08 }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    g.add(mesh);
    return mesh;
  }

  line(g, points, color, width = 2, options = {}) {
    g.add(makeLine(points, color, width, options));
  }

  plaque(g, data) {
    const [w, h, d] = data.size;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w * 0.54, Math.max(2.2, h * 0.025), 1.6), this.material(0xf2f0e8, { roughness: 0.58, glow: data.strongSymbol ? 0xffffff : 0, nightIntensity: 0.16 }));
    mesh.position.set(0, Math.max(7, h * 0.16), -d / 2 - 1.05);
    g.add(mesh);
  }

  windowGrid(g, w, h, d, { rows = 4, cols = 4, y0 = 8, face = 'front' } = {}) {
    for (let r = 0; r < rows; r += 1) {
      const y = y0 + (h - y0 * 1.25) * r / Math.max(1, rows - 1);
      for (let c = 0; c < cols; c += 1) {
        const x = -w * 0.32 + (w * 0.64) * c / Math.max(1, cols - 1);
        if (face === 'front') this.box(g, w * 0.07, Math.max(1.4, h * 0.014), 1.05, 0xe8edf0, [x, y, -d / 2 - 0.75], { glow: 0xd9f4ff, nightIntensity: 0.12, roughness: 0.42 });
        else this.box(g, 1.05, Math.max(1.4, h * 0.014), d * 0.08, 0xe8edf0, [w / 2 + 0.75, y, -d * 0.25 + (d * 0.50) * c / Math.max(1, cols - 1)], { glow: 0xd9f4ff, nightIntensity: 0.10, roughness: 0.42 });
      }
    }
  }

  roofDetails(g, w, h, d, color, amount = 1) {
    if (amount <= 0) return;
    this.box(g, w * 0.22, Math.max(4, h * 0.045), d * 0.16, this.dark(color, 0.22), [-w * 0.22, h + Math.max(2, h * 0.025), d * 0.18], { roughness: 0.65 });
    this.cylinder(g, Math.max(2.2, w * 0.055), Math.max(6, h * 0.06), 0x8b735d, [w * 0.25, h + Math.max(4, h * 0.04), -d * 0.20], { radialSegments: 12 });
  }

  light(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0xffffff), amount).getHex();
  }

  dark(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0x111827), amount).getHex();
  }
}
