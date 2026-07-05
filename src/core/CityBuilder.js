import * as THREE from 'three';
import { BuildingFactory } from './BuildingFactory.js';
import { createMaterialFactory } from './materials.js';
import { makeDisk, makeFlatBox, makeLine, makeRoadPath, makeGroundPolygon, rectangleToPolygon } from '../utils/geometry.js';

export class CityBuilder {
  constructor(scene, data) {
    this.scene = scene;
    this.data = data;
    this.material = createMaterialFactory();
    this.factory = new BuildingFactory(this.material);
    this.pickables = [];
    this.metroGroup = new THREE.Group();
    this.metroGroup.name = 'metro-lines';
    this.metroGroup.visible = false;
    this.fabricGroup = new THREE.Group();
    this.fabricGroup.name = 'urban-fabric-buildings';
    this.streetGroup = new THREE.Group();
    this.streetGroup.name = 'generated-street-grid';
    this.landGroup = new THREE.Group();
    this.landGroup.name = 'low-saturation-land-masses';
  }

  build() {
    this.addWaterBase();
    this.addWaterFeatures();
    this.addLandMasses();
    this.addDistrictPickSurfaces();
    this.addPlazas();
    this.addGeneratedStreetGrid();
    this.addGeneratedFabricBuildings();
    this.addRoads();
    this.addBridges();
    this.addBuildings();
    this.addMetro();
    this.scene.add(this.landGroup, this.streetGroup, this.fabricGroup, this.metroGroup);
    return this.pickables;
  }

  addWaterBase() {
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, 1500, 4, 4),
      this.material(0x9db7bf, { roughness: 0.52, metalness: 0.02, transparent: true, opacity: 0.72, glow: 0x3fb7d8, nightIntensity: 0.12 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.08;
    water.receiveShadow = true;
    water.name = '纽约缩略城市水域基底';
    this.scene.add(water);
  }

  addWaterFeatures() {
    const river = makeLine(this.data.water.river.points, 0x7eaeb8, this.data.water.river.width / 2, {
      roughness: 0.36,
      metalness: 0.02,
      transparent: true,
      opacity: 0.84,
      glow: 0x47c7ff,
      nightIntensity: 0.26,
      segments: 130
    });
    river.name = this.data.water.river.name;
    river.userData = { type: 'water', title: this.data.water.river.name, formula: '变化率关系的主水系', description: this.data.water.river.role, baseColor: 0x7eaeb8, glow: 0x47c7ff };
    this.scene.add(river);
    this.scene.add(this.makeWaterEllipse(this.data.water.bay, 0x8fb9bd, 0.78));
    if (this.data.water.harbor) this.scene.add(this.makeWaterEllipse(this.data.water.harbor, 0x9dbbc1, 0.68));
  }

  makeWaterEllipse(water, color, opacity) {
    const [cx, y, cz] = water.center;
    const [rx, rz] = water.radius;
    const points = [[cx, y, cz]];
    for (let i = 0; i <= 96; i += 1) {
      const a = Math.PI * 2 * i / 96;
      points.push([cx + Math.cos(a) * rx, y, cz + Math.sin(a) * rz]);
    }
    const mesh = makeGroundPolygon(points, color, this.material, { transparent: true, opacity, roughness: 0.42 });
    mesh.position.y = y + 0.05;
    mesh.name = water.name;
    mesh.userData = { type: 'water', title: water.name, description: water.role, baseColor: color, glow: 0x47c7ff };
    return mesh;
  }

  addLandMasses() {
    (this.data.landMasses || []).forEach((land) => {
      const mesh = makeGroundPolygon(land.polygon, land.color, this.material, { roughness: 0.86, metalness: 0.01 });
      mesh.name = land.name;
      mesh.position.y = 0.06;
      mesh.receiveShadow = true;
      mesh.userData = { type: 'land', id: land.id, title: land.name, description: '低饱和陆地体块，用真实城市地理替代彩色知识地毯。', baseColor: land.color, payload: land };
      this.landGroup.add(mesh);
      const shoreline = makeLine([...land.polygon, land.polygon[0]], 0x6f7f82, 1.4, { closed: true, roughness: 0.7, transparent: true, opacity: 0.72 });
      shoreline.name = land.name + ' 岸线';
      this.landGroup.add(shoreline);
    });
  }

  addDistrictPickSurfaces() {
    this.data.districts.forEach((district) => {
      const polygon = district.boundary || rectangleToPolygon(district.position[0], district.position[2], district.size[0], district.size[2], 2);
      const mesh = makeGroundPolygon(polygon, district.color, this.material, { roughness: 0.9, transparent: true, opacity: 0.18 });
      mesh.position.y = 0.16;
      mesh.name = district.name;
      mesh.userData = { type: 'district', id: district.id, title: district.name, description: district.role, math: district.math, cityMeaning: district.cityMeaning, labelTier: 'district', baseColor: district.color, payload: district };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addPlazas() {
    (this.data.plazas || []).forEach((plaza) => {
      const disk = makeDisk({ radius: plaza.radius, height: 0.9, color: plaza.color, materialFactory: this.material, segments: 64 });
      disk.position.set(plaza.position[0], plaza.position[1], plaza.position[2]);
      disk.name = plaza.name;
      disk.userData = { type: 'plaza', id: plaza.id, title: plaza.name, description: plaza.role, baseColor: plaza.color, payload: plaza };
      this.scene.add(disk);
      this.pickables.push(disk);
    });
  }

  addGeneratedStreetGrid() {
    this.data.districts.forEach((district) => {
      const grid = district.grid;
      if (!grid) return;
      const [dw, , dd] = district.size;
      const left = district.position[0] - dw / 2;
      const right = district.position[0] + dw / 2;
      const top = district.position[2] - dd / 2;
      const bottom = district.position[2] + dd / 2;
      const roadColor = district.id === 'red-hook-risk' ? 0x6b3f36 : 0x444b52;
      const roadWidth = district.id === 'manhattan-linear' ? 5.2 : district.density === 'industrial' ? 7.2 : 6.2;
      for (let c = 1; c < grid.cols; c += 1) {
        const x = left + (dw * c) / grid.cols;
        if (this.lineInsidePolygon([[x, 3.1, top + 18], [x, 3.1, bottom - 18]], district.boundary)) this.streetGroup.add(makeRoadPath([[x, 3.1, top + 18], [x, 3.1, bottom - 18]], roadWidth, roadColor, this.material, { height: 0.55 }));
      }
      for (let r = 1; r < grid.rows; r += 1) {
        const z = top + (dd * r) / grid.rows;
        if (this.lineInsidePolygon([[left + 18, 3.1, z], [right - 18, 3.1, z]], district.boundary)) this.streetGroup.add(makeRoadPath([[left + 18, 3.1, z], [right - 18, 3.1, z]], roadWidth, roadColor, this.material, { height: 0.55 }));
      }
      if (district.id === 'manhattan-linear') {
        for (let c = 0; c <= 2; c += 1) {
          const x = left + 58 + c * 56;
          this.streetGroup.add(makeRoadPath([[x, 3.4, top + 48], [x + 42, 3.4, bottom - 54]], 3.2, 0x2f363d, this.material, { height: 0.45 }));
        }
      }
    });
  }

  addGeneratedFabricBuildings() {
    this.data.districts.forEach((district) => {
      const grid = district.grid;
      if (!grid) return;
      const [dw, , dd] = district.size;
      const cellW = dw / grid.cols;
      const cellD = dd / grid.rows;
      const lots = district.id === 'manhattan-linear' ? 2 : 1;
      for (let r = 0; r < grid.rows; r += 1) {
        for (let c = 0; c < grid.cols; c += 1) {
          for (let lot = 0; lot < lots; lot += 1) {
            const seed = this.seed(district.id, r, c, lot);
            const x = district.position[0] - dw / 2 + cellW * (c + 0.5) + (lots === 2 ? (lot === 0 ? -cellW * 0.18 : cellW * 0.18) : (seed - 0.5) * cellW * 0.12);
            const z = district.position[2] - dd / 2 + cellD * (r + 0.5) + (this.frac(seed * 17.37) - 0.5) * cellD * 0.18;
            if (district.boundary && !this.pointInPolygon([x, z], district.boundary)) continue;
            if (this.isAvoided(x, z, grid.avoid)) continue;
            const dims = this.fabricDimensions(district, cellW, cellD, seed, lots);
            const color = this.pickPalette(grid.palette, seed);
            this.fabricGroup.add(this.makeFabricBuilding(district, x, z, dims.width, dims.depth, this.fabricHeight(district, x, z, seed), color, seed));
          }
        }
      }
    });
  }

  makeFabricBuilding(district, x, z, width, depth, height, color, seed) {
    const group = new THREE.Group();
    group.name = district.borough + ' 城市肌理建筑';
    group.position.set(x, 2.05, z);
    const body = makeFlatBox({ width, depth, height, color, materialFactory: this.material, options: { roughness: district.id === 'manhattan-linear' ? 0.56 : 0.78, metalness: district.id === 'manhattan-linear' ? 0.08 : 0.03 } });
    body.position.y = height / 2;
    body.castShadow = true;
    group.add(body);
    if (district.id === 'manhattan-linear') {
      const rows = Math.min(12, Math.max(4, Math.floor(height / 18)));
      for (let i = 1; i <= rows; i += 1) {
        const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 1.2, 1.0), this.material(0xe8edf0, { roughness: 0.42, glow: 0xd9f4ff, nightIntensity: 0.15 }));
        strip.position.set(0, (height * i) / (rows + 1), -depth / 2 - 0.55);
        group.add(strip);
      }
      if (height > 120) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(width * 0.68, height * 0.035, depth * 0.68), this.material(new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.16).getHex(), { roughness: 0.58 }));
        cap.position.set(0, height + height * 0.018, 0);
        group.add(cap);
      }
    }
    if (district.density === 'industrial' && this.frac(seed * 9.9) > 0.45) {
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(2.8, width * 0.045), Math.max(2.8, width * 0.045), height * 0.55, 12), this.material(0x5f5851, { roughness: 0.7 }));
      chimney.position.set(width * 0.34, height * 0.88, depth * 0.28);
      chimney.castShadow = true;
      group.add(chimney);
    }
    group.userData = { type: 'city-fabric', title: district.borough + ' 城市肌理建筑', description: '这类建筑不单独绑定知识点，负责形成真实街区密度与城市尺度。', district: district.id, baseColor: color };
    return group;
  }

  fabricHeight(district, x, z, seed) {
    const grid = district.grid;
    const base = grid.minHeight + (grid.maxHeight - grid.minHeight) * (0.25 + 0.75 * this.frac(seed * 19.91));
    if (district.id !== 'manhattan-linear') return base;
    const skyline = district.skyline || {};
    const primary = skyline.primary || [district.position[0], district.position[2]];
    const secondary = skyline.secondary || [district.position[0], district.position[2] + 130];
    const primaryBoost = Math.max(0, 1 - Math.hypot(x - primary[0], z - primary[1]) / (skyline.primaryRadius || 180));
    const secondaryBoost = Math.max(0, 1 - Math.hypot(x - secondary[0], z - secondary[1]) / (skyline.secondaryRadius || 130));
    return base + primaryBoost * 105 + secondaryBoost * 58;
  }

  fabricDimensions(district, cellW, cellD, seed, lots) {
    if (district.id === 'manhattan-linear') return { width: cellW * (0.30 + 0.12 * this.frac(seed * 2.1)) / lots, depth: cellD * (0.48 + 0.18 * this.frac(seed * 3.1)) };
    if (district.density === 'industrial') return { width: cellW * (0.56 + 0.18 * this.frac(seed * 2.3)), depth: cellD * (0.52 + 0.18 * this.frac(seed * 4.3)) };
    if (district.density === 'scenic' || district.density === 'low') return { width: cellW * (0.34 + 0.12 * this.frac(seed * 2.8)), depth: cellD * (0.34 + 0.12 * this.frac(seed * 4.8)) };
    return { width: cellW * (0.42 + 0.14 * this.frac(seed * 2.6)), depth: cellD * (0.40 + 0.14 * this.frac(seed * 3.6)) };
  }

  addRoads() {
    this.data.roads.forEach((road) => {
      const isMain = road.kind === 'main';
      const isWarning = road.kind === 'warning';
      const mesh = makeRoadPath(road.points, road.width, road.color, this.material, { height: isMain ? 0.95 : 0.72, glow: isWarning ? 0xff5d42 : isMain ? 0x6db6ff : 0, nightIntensity: isWarning ? 0.48 : 0.28 });
      mesh.name = road.name;
      mesh.userData = { type: 'road', id: road.id, title: road.name, formula: road.role, description: '白天作为真实城市道路，夜景模式才承担学习路径。', baseColor: road.color, payload: road };
      this.scene.add(mesh);
    });
  }

  addBridges() {
    this.data.bridges.forEach((bridge) => {
      const group = new THREE.Group();
      group.name = bridge.name;
      group.add(makeRoadPath(bridge.points, bridge.kind === 'suspension' ? 15 : 10, bridge.color, this.material, { height: 1.5, glow: 0xffd15a, nightIntensity: 0.45 }));
      bridge.points.forEach((point, index) => {
        if (index === 0 || index === bridge.points.length - 1) return;
        const pylonHeight = bridge.kind === 'suspension' ? 62 : 34;
        const pylon = new THREE.Mesh(new THREE.BoxGeometry(16, pylonHeight, 16), this.material(0x9b9487, { roughness: 0.62, glow: 0xffd15a, nightIntensity: 0.26 }));
        pylon.position.set(point[0], point[1] + pylonHeight / 2, point[2]);
        pylon.castShadow = true;
        group.add(pylon);
      });
      if (bridge.kind === 'suspension') {
        const cablePoints = bridge.points.map(([x, y, z], i) => [x, y + (i === 1 ? 68 : 24), z]);
        group.add(makeLine(cablePoints, 0xd6c49c, 2.0, { glow: 0xffd15a, nightIntensity: 0.55 }));
      }
      group.userData = { type: 'bridge', id: bridge.id, title: bridge.name, formula: bridge.formula, description: bridge.role, baseColor: bridge.color, glow: 0xffd15a, labelTier: bridge.id === 'euler-bridge' ? 'landmark' : 'mid', payload: bridge };
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
      const mesh = makeLine(line.points, line.color, 3.6, { glow: line.color, emissive: line.color, emissiveIntensity: 0.18, nightIntensity: 0.78, roughness: 0.46 });
      mesh.name = line.name;
      mesh.userData = { type: 'metro', id: line.id, title: line.name, baseColor: line.color, glow: line.color, payload: line };
      this.metroGroup.add(mesh);
    });
  }

  setMetroVisible(visible) {
    this.metroGroup.visible = visible;
  }

  pickPalette(palette = [0xd2d2cc], seed = 0) {
    return palette[Math.floor(this.frac(seed * 11.7) * palette.length) % palette.length];
  }

  seed(id, r, c, lot = 0) {
    let h = 0;
    for (let i = 0; i < id.length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 9973;
    return this.frac(Math.sin(h + (r + 1) * 47.17 + (c + 1) * 91.31 + (lot + 1) * 19.77) * 43758.5453);
  }

  frac(value) {
    return value - Math.floor(value);
  }

  isAvoided(x, z, avoid = []) {
    return avoid.some(([ax, az, radius]) => Math.hypot(x - ax, z - az) < radius);
  }

  pointInPolygon([x, z], polygon = []) {
    if (!polygon.length) return true;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
      const xi = polygon[i][0], zi = polygon[i][2];
      const xj = polygon[j][0], zj = polygon[j][2];
      const intersect = ((zi > z) !== (zj > z)) && (x < (xj - xi) * (z - zi) / ((zj - zi) || 1e-6) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  lineInsidePolygon(points, polygon) {
    if (!polygon) return true;
    return points.some((point) => this.pointInPolygon([point[0], point[2]], polygon));
  }
}
