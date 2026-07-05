import * as THREE from 'three';
import { BuildingFactory } from './BuildingFactory.js';
import { createMaterialFactory } from './materials.js';
import { makeFlatBox, makeLine } from '../utils/geometry.js';

export class CityBuilder {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.material = createMaterialFactory();
    this.factory = new BuildingFactory(this.material);
    this.pickables = [];
    this.metroGroup = new THREE.Group();
    this.metroGroup.name = 'metro-lines';
  }

  build() {
    this.addGround();
    this.addWater();
    this.addDistricts();
    this.addRoads();
    this.addBridges();
    this.addBuildings();
    this.addMetro();
    this.scene.add(this.metroGroup);
    return this.pickables;
  }

  addGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1600, 1050),
      this.material(0xe8f1f8, { roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.name = '城市地基';
    this.scene.add(ground);
  }

  addWater() {
    const river = makeLine([[-760, 1, -260], [-430, 1, -210], [-150, 1, -170], [80, 1, -100], [320, 1, -40], [520, 1, 30], [760, 1, 120]], 0x8ed4ee, 32);
    river.name = '微分河';
    river.userData = { type: 'water', title: '微分河', formula: '变化率关系的主水系', baseColor: 0x8ed4ee, glow: 0x47c7ff };
    this.scene.add(river);

    const bay = new THREE.Mesh(
      new THREE.CircleGeometry(190, 48, 0, Math.PI),
      this.material(0x9bdceb, { transparent: true, opacity: 0.82, roughness: 0.55 })
    );
    bay.rotation.x = -Math.PI / 2;
    bay.rotation.z = Math.PI * 0.08;
    bay.position.set(650, 1.2, 190);
    bay.name = '应用海湾';
    bay.userData = { type: 'water', title: '应用海湾', formula: '现实建模接口', baseColor: 0x9bdceb, glow: 0x47c7ff };
    this.scene.add(bay);
  }

  addDistricts() {
    this.data.districts.forEach((district) => {
      const [w, h, d] = district.size;
      const mesh = makeFlatBox({ width: w, depth: d, height: h, color: district.color });
      mesh.position.set(district.position[0], h / 2, district.position[2]);
      mesh.name = district.name;
      mesh.userData = {
        type: 'district',
        id: district.id,
        title: district.name,
        description: district.role,
        math: district.math,
        baseColor: district.color,
        payload: district
      };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addRoads() {
    this.data.roads.forEach((road) => {
      const mesh = makeLine(road.points, road.color, road.width);
      mesh.name = road.name;
      mesh.userData = { type: 'road', title: road.name, formula: '张宇章节主线 / 方法街道', baseColor: road.color, payload: road };
      this.scene.add(mesh);
    });
  }

  addBridges() {
    this.data.bridges.forEach((bridge) => {
      const mesh = makeLine(bridge.points, bridge.color, 12);
      mesh.name = bridge.name;
      mesh.userData = { type: 'bridge', title: bridge.name, formula: bridge.formula, baseColor: bridge.color, glow: 0xffd15a, payload: bridge };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addBuildings() {
    this.data.buildings.forEach((building) => {
      let mesh;
      if (building.id.includes('tower')) mesh = this.factory.createTower(building);
      else if (building.id.includes('gate')) mesh = this.factory.createGate(building);
      else mesh = this.factory.createBuilding(building);
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addMetro() {
    this.data.metro.forEach((line) => {
      const mesh = makeLine(line.points, line.color, 4);
      mesh.name = line.name;
      mesh.userData = { type: 'metro', title: line.name, baseColor: line.color, glow: line.color, payload: line };
      this.metroGroup.add(mesh);
    });
  }

  setMetroVisible(visible) {
    this.metroGroup.visible = visible;
  }
}
