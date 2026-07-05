import * as THREE from 'three';
import { BuildingFactory } from './BuildingFactory.js';
import { createMaterialFactory } from './materials.js';
import { makeDisk, makeEllipseSurface, makeFlatBox, makeLine, makeRoadPath, rectangleToPolygon, tagObject } from '../utils/geometry.js';

export class CityBuilder {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.material = createMaterialFactory();
    this.factory = new BuildingFactory(this.material);
    this.pickables = [];
    this.metroGroup = new THREE.Group();
    this.metroGroup.name = 'metro-lines';
    this.blockGroup = new THREE.Group();
    this.blockGroup.name = 'city-blocks';
  }

  build() {
    this.addGround();
    this.addWater();
    this.addDistricts();
    this.addPlazas();
    this.addGeneratedBlocks();
    this.addRoads();
    this.addBridges();
    this.addBuildings();
    this.addMetro();
    this.scene.add(this.blockGroup, this.metroGroup);
    return this.pickables;
  }

  addGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1800, 1180, 8, 8),
      this.material(0xe8f1f8, { roughness: 0.92, metalness: 0.01 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.name = '城市地基';
    this.scene.add(ground);
  }

  addWater() {
    const river = makeLine(this.data.water.river.points, 0x8ed4ee, this.data.water.river.width / 2, {
      roughness: 0.42,
      metalness: 0.02,
      transparent: true,
      opacity: 0.78,
      glow: 0x47c7ff,
      nightIntensity: 0.42
    });
    river.name = this.data.water.river.name;
    river.userData = { type: 'water', title: this.data.water.river.name, formula: '变化率关系的主水系', description: this.data.water.river.role, baseColor: 0x8ed4ee, glow: 0x47c7ff };
    this.scene.add(river);

    const bay = makeEllipseSurface({ center: this.data.water.bay.center, radius: this.data.water.bay.radius, color: 0x9bdceb, materialFactory: this.material, opacity: 0.72 });
    bay.position.y = 1.1;
    bay.name = this.data.water.bay.name;
    bay.userData = { type: 'water', title: this.data.water.bay.name, description: this.data.water.bay.role, baseColor: 0x9bdceb, glow: 0x47c7ff };
    this.scene.add(bay);
  }

  addDistricts() {
    this.data.districts.forEach((district) => {
      const [w, h, d] = district.size;
      const mesh = makeFlatBox({ width: w, depth: d, height: h, color: district.color, materialFactory: this.material, options: { transparent: true, opacity: 0.82 } });
      mesh.position.set(district.position[0], h / 2, district.position[2]);
      mesh.name = district.name;
      mesh.userData = {
        type: 'district',
        id: district.id,
        title: district.name,
        description: district.role,
        math: district.math,
        cityMeaning: district.cityMeaning,
        labelTier: 'district',
        baseColor: district.color,
        payload: district
      };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addPlazas() {
    (this.data.plazas || []).forEach((plaza) => {
      const disk = makeDisk({ radius: plaza.radius, height: 1.8, color: plaza.color, materialFactory: this.material, segments: 64 });
      disk.position.set(plaza.position[0], 6.2, plaza.position[2]);
      disk.name = plaza.name;
      disk.userData = { type: 'plaza', id: plaza.id, title: plaza.name, description: plaza.role, baseColor: plaza.color, payload: plaza };
      this.scene.add(disk);
    });
  }

  addGeneratedBlocks() {
    this.data.districts.forEach((district) => {
      const grid = district.grid;
      if (!grid) return;
      const [dw, , dd] = district.size;
      const cellW = dw / grid.cols;
      const cellD = dd / grid.rows;
      for (let r = 0; r < grid.rows; r += 1) {
        for (let c = 0; c < grid.cols; c += 1) {
          const seed = Math.sin((r + 1) * 47.17 + (c + 1) * 91.31 + district.importance * 13.7);
          const k = Math.abs(seed % 1);
          const x = district.position[0] - dw / 2 + cellW * (c + 0.5);
          const z = district.position[2] - dd / 2 + cellD * (r + 0.5);
          if (this.isAvoided(x, z, grid.avoid)) continue;
          const height = grid.minHeight + (grid.maxHeight - grid.minHeight) * k;
          const block = makeFlatBox({ width: cellW * 0.42, depth: cellD * 0.42, height, color: grid.color, materialFactory: this.material, options: { roughness: 0.7, metalness: 0.04 } });
          block.position.set(x, height / 2 + 8, z);
          block.name = `${district.borough} 街区建筑`;
          block.userData = { type: 'city-block', title: block.name, baseColor: grid.color, district: district.id };
          this.blockGroup.add(block);
        }
      }
    });
  }

  addRoads() {
    this.data.roads.forEach((road) => {
      const mesh = makeRoadPath(road.points, road.width, road.color, this.material, {
        height: road.kind === 'main' ? 1.6 : 1.1,
        glow: road.kind === 'warning' ? 0xff5d42 : 0,
        nightIntensity: 0.32
      });
      mesh.name = road.name;
      mesh.userData = { type: 'road', id: road.id, title: road.name, formula: road.role, description: '道路表达章节主线、方法街区或训练路线。', baseColor: road.color, payload: road };
      this.scene.add(mesh);
    });
  }

  addBridges() {
    this.data.bridges.forEach((bridge) => {
      const group = new THREE.Group();
      group.name = bridge.name;
      const deck = makeRoadPath(bridge.points, bridge.kind === 'suspension' ? 16 : 11, bridge.color, this.material, { height: 2, glow: 0xffd15a, nightIntensity: 0.42 });
      group.add(deck);
      bridge.points.forEach((point, index) => {
        if (index === 0 || index === bridge.points.length - 1) return;
        const pylon = new THREE.Mesh(new THREE.BoxGeometry(18, 58, 18), this.material(bridge.color, { roughness: 0.58, metalness: 0.08, glow: 0xffd15a }));
        pylon.position.set(point[0], point[1] + 29, point[2]);
        pylon.castShadow = true;
        group.add(pylon);
      });
      if (bridge.kind === 'suspension') {
        const cablePoints = bridge.points.map(([x, y, z], i) => [x, y + (i === 1 ? 72 : 24), z]);
        group.add(makeLine(cablePoints, 0xffe0a0, 2.4, { glow: 0xffd15a, nightIntensity: 0.55 }));
      }
      group.userData = { type: 'bridge', id: bridge.id, title: bridge.name, formula: bridge.formula, description: bridge.role, baseColor: bridge.color, glow: 0xffd15a, labelTier: 'landmark', payload: bridge };
      this.scene.add(group);
      this.pickables.push(group);
    });
  }

  addBuildings() {
    this.data.buildings.forEach((building) => {
      const mesh = this.factory.create(building);
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addMetro() {
    this.data.metro.forEach((line) => {
      const mesh = makeLine(line.points, line.color, 4.5, { glow: line.color, emissive: line.color, emissiveIntensity: 0.12, nightIntensity: 0.72 });
      mesh.name = line.name;
      mesh.userData = { type: 'metro', id: line.id, title: line.name, baseColor: line.color, glow: line.color, payload: line };
      this.metroGroup.add(mesh);
    });
  }

  setMetroVisible(visible) {
    this.metroGroup.visible = visible;
  }

  isAvoided(x, z, avoid = []) {
    return avoid.some(([ax, az, radius]) => Math.hypot(x - ax, z - az) < radius);
  }
}
