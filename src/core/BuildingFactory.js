import * as THREE from 'three';
import { makeLine, tagObject } from '../utils/geometry.js';

export class BuildingFactory {
  constructor(material) {
    this.material = material;
  }

  create(data) {
    const t = data.type || 'building';
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
    this.box(g, w, h * 0.72, d, data.color, [0, h * 0.36, 0]);
    this.box(g, w * 0.95, h * 0.16, d * 1.08, this.light(data.color, 0.18), [0, h * 0.82, 0]);
    this.box(g, w * 0.12, h * 0.48, d * 0.16, this.light(data.color, 0.1), [-w * 0.38, h * 0.25, -d * 0.56]);
    this.box(g, w * 0.12, h * 0.48, d * 0.16, this.light(data.color, 0.1), [w * 0.38, h * 0.25, -d * 0.56]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  tower(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.86, d, data.color, [0, h * 0.43, 0], { glow: 0x64b5ff });
    this.box(g, w * 0.7, h * 0.12, d * 0.7, this.light(data.color, 0.18), [0, h * 0.92, 0]);
    this.cone(g, w * 0.42, h * 0.18, this.light(data.color, 0.26), [0, h * 1.07, 0]);
    this.windows(g, w, h, d);
    this.plaque(g, data);
    return this.done(g, data);
  }

  stepped(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.45, d, data.color, [0, h * 0.225, 0]);
    this.box(g, w * 0.78, h * 0.32, d * 0.78, this.light(data.color, 0.08), [0, h * 0.61, 0]);
    this.box(g, w * 0.55, h * 0.2, d * 0.55, this.light(data.color, 0.16), [0, h * 0.87, 0]);
    this.cone(g, w * 0.32, h * 0.14, this.light(data.color, 0.24), [0, h * 1.04, 0]);
    this.windows(g, w, h, d);
    this.plaque(g, data);
    return this.done(g, data);
  }

  obelisk(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.46, h * 0.18, this.light(data.color, 0.18), [0, h * 0.09, 0]);
    this.box(g, w * 0.52, h * 0.72, d * 0.52, data.color, [0, h * 0.54, 0], { glow: 0x64b5ff });
    this.cone(g, w * 0.34, h * 0.22, this.light(data.color, 0.28), [0, h * 1.01, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  twin(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.38, h, d, data.color, [-w * 0.28, h / 2, 0], { glow: 0x72b7ff });
    this.box(g, w * 0.38, h * 0.92, d, this.light(data.color, 0.1), [w * 0.28, h * 0.46, 0], { glow: 0x72b7ff });
    this.box(g, w * 0.96, h * 0.08, d * 0.62, this.light(data.color, 0.18), [0, h * 0.64, 0]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  spiral(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.32, h * 0.9, data.color, [0, h * 0.45, 0], { radialSegments: 24, glow: 0xa78bfa });
    const pts = [];
    for (let i = 0; i < 90; i += 1) {
      const a = (i / 89) * Math.PI * 5.4;
      pts.push([Math.cos(a) * w * 0.45, h * 0.08 + h * 0.86 * i / 89, Math.sin(a) * d * 0.45]);
    }
    g.add(makeLine(pts, 0xd8c7ff, 2.3, { glow: 0xb895ff, emissive: 0x5f42c9, emissiveIntensity: 0.12 }));
    this.plaque(g, data);
    return this.done(g, data);
  }

  gate(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.22, h, d, data.color, [-w * 0.34, h / 2, 0], { glow: 0xa178ff });
    this.box(g, w * 0.22, h, d, data.color, [w * 0.34, h / 2, 0], { glow: 0xa178ff });
    this.box(g, w, h * 0.18, d * 0.9, this.light(data.color, 0.12), [0, h * 0.9, 0], { glow: 0xa178ff });
    this.plaque(g, data);
    return this.done(g, data);
  }

  factory(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h * 0.66, d, data.color, [0, h * 0.33, 0]);
    for (let i = -1; i <= 1; i += 1) this.box(g, w * 0.24, h * 0.18, d * 1.03, this.light(data.color, 0.14), [i * w * 0.25, h * 0.77, 0]);
    this.cylinder(g, w * 0.06, h * 0.82, this.dark(data.color, 0.18), [w * 0.39, h * 0.88, d * 0.28], { radialSegments: 12 });
    this.cylinder(g, w * 0.055, h * 0.62, this.dark(data.color, 0.12), [w * 0.25, h * 0.78, d * 0.34], { radialSegments: 12 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  elevator(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w * 0.58, h, d * 0.58, data.color, [0, h / 2, 0], { glow: 0xffc57a });
    this.box(g, w * 1.22, h * 0.08, d * 1.22, this.light(data.color, 0.22), [0, h * 0.18, 0]);
    this.box(g, w * 1.08, h * 0.08, d * 1.08, this.light(data.color, 0.26), [0, h * 0.62, 0]);
    this.box(g, w * 1.38, h * 0.1, d * 1.38, this.light(data.color, 0.3), [0, h * 0.94, 0]);
    this.line(g, [[-w * 0.48, h * 0.2, -d * 0.48], [-w * 0.48, h * 1.02, -d * 0.48]], 0x2b211b, 2.4);
    this.line(g, [[w * 0.48, h * 0.2, d * 0.48], [w * 0.48, h * 1.02, d * 0.48]], 0x2b211b, 2.4);
    this.plaque(g, data);
    return this.done(g, data);
  }

  runway(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.box(g, w, h, d, data.color, [0, h / 2, 0], { roughness: 0.92 });
    for (let i = -3; i <= 3; i += 1) this.box(g, w * 0.07, h * 0.18, d * 0.08, 0xffffff, [i * w * 0.12, h + 0.18, 0], { glow: 0xffffff, nightIntensity: 0.35 });
    this.plaque(g, data);
    return this.done(g, data);
  }

  cooling(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, w * 0.42, h * 0.8, data.color, [0, h * 0.4, 0], { radialSegments: 32, glow: 0x72ffdf });
    this.cylinder(g, w * 0.52, h * 0.12, this.light(data.color, 0.2), [0, h * 0.86, 0], { radialSegments: 32 });
    const pts = [];
    for (let i = 0; i < 44; i += 1) {
      const u = i / 43;
      pts.push([-w * 0.62 + u * w * 1.18, h * (0.88 - 0.55 * (1 - Math.exp(-3 * u))), d * 0.68]);
    }
    this.line(g, pts, 0xff6b6b, 2.4, { glow: 0xff7070 });
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
    this.box(g, w, h * 0.26, d * 0.58, 0xb78b5e, [0, h * 0.13, 0]);
    this.box(g, w * 0.42, h * 0.32, d, 0xc69b6c, [-w * 0.22, h * 0.16, d * 0.36]);
    this.box(g, w * 0.7, h * 0.62, d * 0.38, data.color, [0, h * 0.58, -d * 0.16]);
    this.plaque(g, data);
    return this.done(g, data);
  }

  trajectory(data) {
    const g = this.hall(data);
    const [w, h, d] = data.size;
    const pts = [];
    for (let i = 0; i < 50; i += 1) {
      const u = i / 49;
      pts.push([-w * 0.58 + u * w * 1.16, h + Math.sin(u * Math.PI) * h * 0.38, d * 0.64 + Math.cos(u * Math.PI) * d * 0.18]);
    }
    this.line(g, pts, 0x14b8a6, 2.8, { glow: 0x5eead4 });
    return g;
  }

  pit(data) {
    const g = this.group(data);
    const [w, h, d] = data.size;
    this.cylinder(g, Math.min(w, d) * 0.46, h * 0.22, 0x32110d, [0, h * 0.08, 0], { radialSegments: 40 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.min(w, d) * 0.42, Math.min(w, d) * 0.055, 12, 40), this.material(data.color, { roughness: 0.7, glow: 0xff6b4a }));
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
    return tagObject(g, { type: 'building', id: data.id, title: data.name, formula: data.formula, description: data.role, district: data.district, labelTier: data.labelTier ?? 'mid', risks: data.risks ?? [], baseColor: data.color, glow: data.labelTier === 'landmark' ? 0x6ab8ff : 0, payload: data });
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
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * (options.topScale ?? 1), height, options.radialSegments ?? 18), this.material(color, { roughness: 0.62, metalness: 0.06, ...options }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  }

  cone(g, radius, height, color, pos) {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 8), this.material(color, { roughness: 0.58, metalness: 0.08 }));
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    g.add(mesh);
  }

  line(g, points, color, width = 2, options = {}) {
    g.add(makeLine(points, color, width, options));
  }

  plaque(g, data) {
    const [w, h, d] = data.size;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w * 0.58, Math.max(3, h * 0.035), 2), this.material(0xf8fbff, { roughness: 0.5, glow: 0xffffff, nightIntensity: 0.18 }));
    mesh.position.set(0, Math.max(8, h * 0.18), -d / 2 - 1.25);
    g.add(mesh);
  }

  windows(g, w, h, d) {
    for (let i = 0; i < 4; i += 1) {
      const y = h * (0.2 + i * 0.18);
      this.box(g, w * 0.06, h * 0.08, 1.4, 0xf2f7ff, [-w * 0.32, y, -d / 2 - 1.1], { glow: 0xcfefff, nightIntensity: 0.24 });
      this.box(g, w * 0.06, h * 0.08, 1.4, 0xf2f7ff, [w * 0.32, y, -d / 2 - 1.1], { glow: 0xcfefff, nightIntensity: 0.24 });
    }
  }

  light(color, amount) { return new THREE.Color(color).lerp(new THREE.Color(0xffffff), amount).getHex(); }
  dark(color, amount) { return new THREE.Color(color).lerp(new THREE.Color(0x111827), amount).getHex(); }
}
