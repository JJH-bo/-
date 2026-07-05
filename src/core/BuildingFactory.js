import * as THREE from 'three';
import { makeLine, tagObject } from '../utils/geometry.js';

export class BuildingFactory {
  constructor(material) {
    this.material = material;
  }

  create(data) {
    const t = data.type || 'building';
    if (t.includes('central')) return this.centralTower(data);
    if (t.includes('gate')) return this.gate(data);
    if (t.includes('factory') || t.includes('workshop')) return this.factory(data);
    if (t.includes('elevator')) return this.elevator(data);
    if (t.includes('spiral')) return this.spiral(data);
    if (t.includes('twin')) return this.twin(data);
    if (t.includes('runway')) return this.runway(data);
    if (t.includes('cooling')) return this.cooling(data);
    if (t.includes('courtyard')) return this.courtyard(data);
    if (t.includes('dock')) return this.dock(data);
    if (t.includes('trajectory')) return this.trajectory(data);
    if (t.includes('pit')) return this.pit(data);
    if (t.includes('obelisk')) return this.obelisk(data);
    if (t.includes('stepped')) return this.stepped(data);
    if (t.includes('tower') || t.includes('skyscraper')) return this.tower(data);
    if (t.includes('hall') || t.includes('market') || t.includes('lab') || t.includes('checkpoint') || t.includes('station')) return this.hall(data);
    return this.basic(data);
  }

  basic(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  hall(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.68, d, data.color, [0, h * 0.34, 0]);
    this.box(g, w * 0.96, h * 0.16, d * 1.05, this.light(data.color, 0.15), [0, h * 0.78, 0]);
    this.box(g, w * 0.11, h * 0.44, d * 0.14, this.light(data.color, 0.1), [-w * 0.38, h * 0.24, -d * 0.56]);
    this.box(g, w * 0.11, h * 0.44, d * 0.14, this.light(data.color, 0.1), [w * 0.38, h * 0.24, -d * 0.56]);
    this.windowBand(g, w, h, d, 3);
    this.plaque(g, data);
    return this.done(g, data);
  }

  tower(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.82, d, data.color, [0, h * 0.41, 0], { glow: data.strongSymbol ? 0x9fd7ff : 0x000000, nightIntensity: 0.2 });
    this.box(g, w * 0.72, h * 0.12, d * 0.72, this.light(data.color, 0.16), [0, h * 0.88, 0]);
    this.box(g, w * 0.46, h * 0.08, d * 0.46, this.light(data.color, 0.24), [0, h * 0.98, 0]);
    this.cone(g, w * 0.22, h * 0.12, this.light(data.color, 0.34), [0, h * 1.08, 0]);
    this.windowBand(g, w, h, d, 8);
    this.plaque(g, data);
    return this.done(g, data);
  }

  centralTower(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.58, d, data.color, [0, h * 0.29, 0], { roughness: 0.5, metalness: 0.08, glow: 0x9fd7ff, nightIntensity: 0.22 });
    this.box(g, w * 0.78, h * 0.22, d * 0.78, this.light(data.color, 0.12), [0, h * 0.69, 0], { glow: 0x9fd7ff, nightIntensity: 0.24 });
    this.box(g, w * 0.54, h * 0.14, d * 0.54, this.light(data.color, 0.22), [0, h * 0.87, 0], { glow: 0x9fd7ff, nightIntensity: 0.28 });
    this.box(g, w * 0.28, h * 0.08, d * 0.28, this.light(data.color, 0.32), [0, h * 0.98, 0], { glow: 0x9fd7ff, nightIntensity: 0.32 });
    this.cone(g, w * 0.12, h * 0.24, this.light(data.color, 0.42), [0, h * 1.14, 0]);
    this.windowBand(g, w, h, d, 13);
    this.line(g, [[-w * 0.54, h * 0.93, -d * 0.54], [0, h * 1.12, 0], [w * 0.54, h * 0.93, d * 0.54]], 0xcdefff, 1.8, { glow: 0x7ecbff, nightIntensity: 0.34 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  stepped(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.42, d, data.color, [0, h * 0.21, 0]);
    this.box(g, w * 0.82, h * 0.28, d * 0.82, this.light(data.color, 0.08), [0, h * 0.56, 0]);
    this.box(g, w * 0.62, h * 0.19, d * 0.62, this.light(data.color, 0.16), [0, h * 0.80, 0]);
    this.box(g, w * 0.42, h * 0.12, d * 0.42, this.light(data.color, 0.25), [0, h * 0.96, 0]);
    this.windowBand(g, w, h, d, 8);
    this.plaque(g, data);
    return this.done(g, data);
  }

  obelisk(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.44, h * 0.16, this.light(data.color, 0.18), [0, h * 0.08, 0], { radialSegments: 24 });
    this.box(g, w * 0.48, h * 0.70, d * 0.48, data.color, [0, h * 0.51, 0], { glow: 0xbbe7ff, nightIntensity: 0.2 });
    this.cone(g, w * 0.28, h * 0.22, this.light(data.color, 0.28), [0, h * 0.97, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  twin(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.38, h, d, data.color, [-w * 0.28, h / 2, 0], { glow: 0x9fd7ff, nightIntensity: 0.18 });
    this.box(g, w * 0.38, h * 0.92, d, this.light(data.color, 0.1), [w * 0.28, h * 0.46, 0], { glow: 0x9fd7ff, nightIntensity: 0.18 });
    this.box(g, w * 0.96, h * 0.06, d * 0.62, this.light(data.color, 0.18), [0, h * 0.64, 0]);
    this.windowBand(g, w, h, d, 6);
    this.plaque(g, data);
    return this.done(g, data);
  }

  spiral(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.70, h * 0.86, d * 0.70, data.color, [0, h * 0.43, 0], { glow: 0xb9a9ff, nightIntensity: 0.18 });
    this.cylinder(g, w * 0.28, h * 0.92, this.light(data.color, 0.08), [0, h * 0.46, 0], { radialSegments: 28, transparent: true, opacity: 0.9 });
    const pts = [];
    for (let i = 0; i < 96; i += 1) {
      const a = (i / 95) * Math.PI * 5.2;
      pts.push([Math.cos(a) * w * 0.46, h * 0.07 + h * 0.86 * i / 95, Math.sin(a) * d * 0.46]);
    }
    g.add(makeLine(pts, 0xd8c7ff, 1.8, { glow: 0xb895ff, emissive: 0x5f42c9, emissiveIntensity: 0.12, nightIntensity: 0.42 }));
    this.windowBand(g, w, h, d, 7);
    this.plaque(g, data);
    return this.done(g, data);
  }

  gate(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.22, h, d, data.color, [-w * 0.34, h / 2, 0], { glow: 0xcdbbff, nightIntensity: 0.2 });
    this.box(g, w * 0.22, h, d, data.color, [w * 0.34, h / 2, 0], { glow: 0xcdbbff, nightIntensity: 0.2 });
    this.box(g, w, h * 0.17, d * 0.9, this.light(data.color, 0.14), [0, h * 0.90, 0], { glow: 0xcdbbff, nightIntensity: 0.24 });
    this.box(g, w * 0.42, h * 0.12, d * 0.72, this.dark(data.color, 0.12), [0, h * 0.08, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  factory(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.62, d, data.color, [0, h * 0.31, 0]);
    for (let i = -1; i <= 1; i += 1) this.box(g, w * 0.24, h * 0.17, d * 1.03, this.light(data.color, 0.12), [i * w * 0.25, h * 0.73, 0]);
    this.cylinder(g, w * 0.05, h * 0.78, this.dark(data.color, 0.18), [w * 0.40, h * 0.82, d * 0.28], { radialSegments: 12 });
    this.cylinder(g, w * 0.045, h * 0.58, this.dark(data.color, 0.12), [w * 0.24, h * 0.72, d * 0.34], { radialSegments: 12 });
    if (data.type?.includes('chain')) this.line(g, [[-w * 0.42, h * 0.78, -d * 0.42], [0, h * 0.96, 0], [w * 0.42, h * 0.78, d * 0.42]], 0x50473d, 2.0);
    this.plaque(g, data);
    return this.done(g, data);
  }

  elevator(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.55, h, d * 0.55, data.color, [0, h / 2, 0], { glow: 0xffc57a, nightIntensity: 0.22 });
    this.box(g, w * 1.20, h * 0.08, d * 1.20, this.light(data.color, 0.18), [0, h * 0.18, 0]);
    this.box(g, w * 1.05, h * 0.08, d * 1.05, this.light(data.color, 0.24), [0, h * 0.62, 0]);
    this.box(g, w * 1.34, h * 0.10, d * 1.34, this.light(data.color, 0.30), [0, h * 0.94, 0]);
    this.line(g, [[-w * 0.48, h * 0.18, -d * 0.48], [-w * 0.48, h * 1.02, -d * 0.48]], 0x2b211b, 2.2);
    this.line(g, [[w * 0.48, h * 0.18, d * 0.48], [w * 0.48, h * 1.02, d * 0.48]], 0x2b211b, 2.2);
    this.plaque(g, data);
    return this.done(g, data);
  }

  runway(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0], { roughness: 0.92 });
    for (let i = -4; i <= 4; i += 1) this.box(g, w * 0.055, h * 0.16, d * 0.09, 0xe9ecef, [i * w * 0.10, h + 0.12, 0], { glow: 0xffffff, nightIntensity: 0.34 });
    this.line(g, [[-w * 0.45, h + 2, 0], [w * 0.45, h + 2, 0]], 0xe9ecef, 1.5, { glow: 0xffffff, nightIntensity: 0.2 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  cooling(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.42, h * 0.78, data.color, [0, h * 0.39, 0], { radialSegments: 32, glow: 0x9ce8d8, nightIntensity: 0.22 });
    this.cylinder(g, w * 0.52, h * 0.12, this.light(data.color, 0.2), [0, h * 0.84, 0], { radialSegments: 32 });
    const pts = [];
    for (let i = 0; i < 44; i += 1) {
      const u = i / 43;
      pts.push([-w * 0.62 + u * w * 1.18, h * (0.86 - 0.55 * (1 - Math.exp(-3 * u))), d * 0.68]);
    }
    this.line(g, pts, 0xd27b6d, 2.0, { glow: 0xff7070, nightIntensity: 0.32 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  courtyard(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.12, d, this.light(data.color, 0.28), [0, h * 0.06, 0]);
    this.box(g, w * 0.88, h * 0.16, d * 0.12, data.color, [0, h * 0.18, -d * 0.44]);
    this.box(g, w * 0.88, h * 0.16, d * 0.12, data.color, [0, h * 0.18, d * 0.44]);
    this.box(g, w * 0.12, h * 0.16, d * 0.88, data.color, [-w * 0.44, h * 0.18, 0]);
    this.box(g, w * 0.12, h * 0.16, d * 0.88, data.color, [w * 0.44, h * 0.18, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  dock(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.24, d * 0.58, 0x8b7357, [0, h * 0.12, 0]);
    this.box(g, w * 0.42, h * 0.30, d, 0x9c8262, [-w * 0.22, h * 0.15, d * 0.36]);
    this.box(g, w * 0.70, h * 0.58, d * 0.38, data.color, [0, h * 0.54, -d * 0.16]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  trajectory(data) {
    const g = this.hall(data);
    const [w, h, d] = data.size;
    const pts = [];
    for (let i = 0; i < 54; i += 1) {
      const u = i / 53;
      pts.push([-w * 0.60 + u * w * 1.18, h + Math.sin(u * Math.PI) * h * 0.34, d * 0.64 + Math.cos(u * Math.PI) * d * 0.18]);
    }
    this.line(g, pts, 0x568f85, 2.4, { glow: 0x5eead4, nightIntensity: 0.35 });
    this.box(g, w * 0.08, h * 0.08, d * 0.08, 0x334155, [w * 0.45, h * 0.72, d * 0.55]);
    this.box(g, w * 0.08, h * 0.08, d * 0.08, 0x334155, [-w * 0.45, h * 0.58, d * 0.55]);
    return g;
  }

  pit(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, Math.min(w, d) * 0.46, h * 0.22, 0x32110d, [0, h * 0.08, 0], { radialSegments: 40 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.min(w, d) * 0.42, Math.min(w, d) * 0.055, 12, 40), this.material(data.color, { roughness: 0.7, glow: 0xff6b4a, nightIntensity: 0.45 }));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, h * 0.2, 0);
    g.add(ring);
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
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 12), this.material(color, { roughness: 0.58, metalness: 0.08 }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    g.add(mesh);
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

  windowBand(g, w, h, d, rows = 4) {
    for (let i = 0; i < rows; i += 1) {
      const y = h * (0.16 + i * (0.70 / Math.max(1, rows - 1)));
      this.box(g, w * 0.58, h * 0.012, 1.2, 0xe8edf0, [0, y, -d / 2 - 0.9], { glow: 0xd9f4ff, nightIntensity: 0.16 });
    }
  }

  light(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0xffffff), amount).getHex();
  }

  dark(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0x111827), amount).getHex();
  }
}
