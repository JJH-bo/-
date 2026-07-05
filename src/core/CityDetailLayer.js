import * as THREE from 'three';
import { createMaterialFactory } from './materials.js';
import { makeLine, makeRoadPath, makeDisk } from '../utils/geometry.js';

export class CityDetailLayer {
  constructor(scene) {
    this.scene = scene;
    this.material = createMaterialFactory();
    this.group = new THREE.Group();
    this.group.name = 'v6-3-2-manhattan-detail-layer';
  }

  build() {
    this.addTimesSquareScreens();
    this.addHighLineStructure();
    this.addCentralParkScene();
    this.addEastRiverPiers();
    this.addLibertyIslandHarbor();
    this.addGovernorsRiskTraining();
    this.addChapterGateways();
    this.scene.add(this.group);
    return this.group;
  }

  addTimesSquareScreens() {
    const signs = [
      { x: -18, y: 92, z: -110, w: 24, h: 32, c: 0x6db6ff },
      { x: 52, y: 108, z: -128, w: 28, h: 38, c: 0xb895ff },
      { x: 62, y: 76, z: -44, w: 22, h: 28, c: 0xffd15a },
      { x: -10, y: 58, z: -36, w: 20, h: 24, c: 0x8ef0a8 }
    ];
    signs.forEach((s) => {
      const screen = this.box(s.w, s.h, 1.2, s.c, [s.x, s.y, s.z], { glow: s.c, nightIntensity: 0.62, roughness: 0.38 });
      this.group.add(screen);
    });
    const plazaRing = new THREE.Mesh(
      new THREE.TorusGeometry(52, 1.6, 8, 72),
      this.material(0x9fd7ff, { roughness: 0.42, glow: 0x9fd7ff, nightIntensity: 0.45 })
    );
    plazaRing.rotation.x = Math.PI / 2;
    plazaRing.position.set(28, 4.3, -98);
    plazaRing.name = 'Times Square 特征方程灯环';
    this.group.add(plazaRing);
  }

  addHighLineStructure() {
    const points = [[-148, 18, 210], [-132, 20, 132], [-104, 22, 64], [-62, 22, 8], [-18, 21, -48]];
    this.group.add(makeLine(points, 0x6f5b48, 2.2, { glow: 0xffc57a, nightIntensity: 0.34, segments: 80 }));
    points.forEach(([x, y, z]) => {
      this.group.add(this.box(5, y - 3, 5, 0x594a3d, [x, (y - 3) / 2 + 2, z], { roughness: 0.72 }));
    });
    for (let i = 0; i < points.length - 1; i += 1) {
      const [a, b] = [points[i], points[i + 1]];
      const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
      this.group.add(this.box(22, 3.4, 7, 0x8b7357, mid, { glow: 0xffc57a, nightIntensity: 0.18 }));
    }
  }

  addCentralParkScene() {
    const loopA = [[-90, 3.3, -458], [-70, 3.3, -410], [-36, 3.3, -352], [22, 3.3, -372], [70, 3.3, -318]];
    const loopB = [[-72, 3.3, -285], [-22, 3.3, -330], [34, 3.3, -425], [76, 3.3, -472]];
    this.group.add(makeRoadPath(loopA, 3.2, 0x537c53, this.material, { height: 0.35, glow: 0x5eead4, nightIntensity: 0.14 }));
    this.group.add(makeRoadPath(loopB, 2.7, 0x638d5f, this.material, { height: 0.35, glow: 0x5eead4, nightIntensity: 0.10 }));
    const lake = makeDisk({ radius: 28, height: 0.44, color: 0x8fb9bd, materialFactory: this.material, segments: 42 });
    lake.scale.set(1.72, 1, 0.72);
    lake.position.set(38, 2.65, -410);
    lake.name = 'Central Park 几何轨迹湖';
    this.group.add(lake);
    const treeCoords = [];
    for (let i = 0; i < 34; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = -495 + (i % 17) * 14;
      treeCoords.push([side * (72 + (i % 5) * 3), z]);
    }
    treeCoords.forEach(([x, z]) => this.addTree(x, z));
    this.group.add(makeLine([[-82, 11, -420], [-42, 16, -350], [20, 12, -384], [74, 18, -308]], 0x5eead4, 1.8, { glow: 0x5eead4, nightIntensity: 0.48 }));
  }

  addEastRiverPiers() {
    [-58, 10, 78, 146, 214, 276].forEach((z, i) => {
      const pier = this.box(86 + i * 7, 2.2, 12, 0x8b7357, [184 + i * 4, 3.0, z], { roughness: 0.82 });
      pier.name = 'East River 码头栈桥';
      this.group.add(pier);
      if (i % 2 === 0) {
        this.group.add(this.box(20, 9, 18, 0xb9c0ba, [226 + i * 4, 8.5, z + 3], { roughness: 0.68 }));
      }
    });
    const runwayGlow = makeLine([[118, 5.8, 8], [278, 5.8, 8]], 0xffffff, 1.5, { glow: 0xffffff, nightIntensity: 0.32 });
    runwayGlow.name = '飞机减速跑道中心线';
    this.group.add(runwayGlow);
  }

  addLibertyIslandHarbor() {
    const pedestal = this.box(58, 18, 58, 0xb8b1a4, [-430, 11, 640], { roughness: 0.74, glow: 0xffd48a, nightIntensity: 0.12 });
    pedestal.name = '自由女神概念岛基座';
    this.group.add(pedestal);
    const ferryLine = [[-430, 7, 640], [-350, 7, 620], [-250, 7, 600], [-145, 7, 580], [-65, 7, 560]];
    this.group.add(makeLine(ferryLine, 0xfff1c2, 1.7, { glow: 0xffd48a, nightIntensity: 0.46, segments: 90 }));
    [[-348, 620], [-250, 600], [-145, 580]].forEach(([x, z]) => {
      const boat = this.box(17, 3.4, 7.2, 0xe8eff2, [x, 5.2, z], { roughness: 0.62, glow: 0xffd48a, nightIntensity: 0.22 });
      boat.name = '概念渡轮';
      this.group.add(boat);
    });
  }

  addGovernorsRiskTraining() {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(78, 2.2, 8, 70),
      this.material(0xff5d42, { roughness: 0.62, glow: 0xff5d42, nightIntensity: 0.55 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(300, 5.2, 650);
    ring.name = '风险训练场警戒环';
    this.group.add(ring);
    [[226, 618], [246, 690], [372, 620], [350, 704], [300, 572], [300, 724]].forEach(([x, z]) => {
      this.group.add(this.box(10, 26, 10, 0xb94a37, [x, 15, z], { glow: 0xff5d42, nightIntensity: 0.34 }));
    });
  }

  addChapterGateways() {
    const gates = [
      { name: '一阶街区入口路牌', x: -20, z: 475, c: 0x5f9f72 },
      { name: '可降阶工厂入口路牌', x: -140, z: 245, c: 0xffc57a },
      { name: '高阶线性核心入口路牌', x: 18, z: 82, c: 0x9fd7ff },
      { name: '物理应用码头入口路牌', x: 132, z: 286, c: 0x9ce8d8 }
    ];
    gates.forEach((g) => {
      this.group.add(this.box(4, 32, 4, 0x3d444c, [g.x, 18, g.z], { roughness: 0.58 }));
      const sign = this.box(24, 10, 2.4, g.c, [g.x, 36, g.z], { roughness: 0.42, glow: g.c, nightIntensity: 0.34 });
      sign.name = g.name;
      this.group.add(sign);
    });
  }

  addTree(x, z) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 7, 8), this.material(0x6b4f38, { roughness: 0.72 }));
    trunk.position.set(x, 5.2, z);
    const crown = new THREE.Mesh(new THREE.ConeGeometry(5.2, 12, 10), this.material(0x5f8f62, { roughness: 0.78 }));
    crown.position.set(x, 14, z);
    this.group.add(trunk, crown);
  }

  box(w, h, d, color, position, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.material(color, { roughness: 0.68, metalness: 0.04, ...options }));
    mesh.position.set(position[0], position[1], position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
}
