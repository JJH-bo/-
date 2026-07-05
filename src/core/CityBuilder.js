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
    this.fabricGroup.name = 'v6-3-manhattan-urban-fabric';
    this.streetGroup = new THREE.Group();
    this.streetGroup.name = 'v6-3-manhattan-street-grid';
    this.landGroup = new THREE.Group();
    this.landGroup.name = 'v6-3-manhattan-land-and-shore';
    this.detailGroup = new THREE.Group();
    this.detailGroup.name = 'v6-3-city-details';
  }

  build() {
    this.addWaterBase();
    this.addWaterFeatures();
    this.addLandMasses();
    this.addDistrictPickSurfaces();
    this.addPlazas();
    this.addGeneratedStreetGrid();
    this.addGeneratedFabricBuildings();
    this.addUrbanDetails();
    this.addRoads();
    this.addBridges();
    this.addBuildings();
    this.addMetro();
    this.scene.add(this.landGroup, this.streetGroup, this.fabricGroup, this.detailGroup, this.metroGroup);
    return this.pickables;
  }

  addWaterBase() {
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(2200, 1700, 4, 4),
      this.material(0x9db7bf, { roughness: 0.52, metalness: 0.02, transparent: true, opacity: 0.72, glow: 0x3fb7d8, nightIntensity: 0.12 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.08;
    water.receiveShadow = true;
    water.name = 'Hudson / East River 水域基底';
    this.scene.add(water);
  }

  addWaterFeatures() {
    const river = makeLine(this.data.water.river.points, 0x7eaeb8, this.data.water.river.width / 2, {
      roughness: 0.36,
      metalness: 0.02,
      transparent: true,
      opacity: 0.70,
      glow: 0x47c7ff,
      nightIntensity: 0.24,
      segments: 150
    });
    river.name = this.data.water.river.name;
    river.userData = { type: 'water', title: this.data.water.river.name, formula: '变化率关系的水系边界', description: this.data.water.river.role, baseColor: 0x7eaeb8, glow: 0x47c7ff };
    this.scene.add(river);
    this.scene.add(this.makeEllipseSurface(this.data.water.bay, 0x8fb9bd, 0.62));
    if (this.data.water.harbor) this.scene.add(this.makeEllipseSurface(this.data.water.harbor, 0x9dbbc1, 0.58));
  }

  makeEllipseSurface(water, color, opacity) {
    const [cx, y, cz] = water.center;
    const [rx, rz] = water.radius;
    const shape = new THREE.Shape();
    shape.absellipse(cx, cz, rx, rz, 0, Math.PI * 2, false, 0);
    const geometry = new THREE.ShapeGeometry(shape, 72);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, this.material(color, { transparent: true, opacity, roughness: 0.42, metalness: 0.02, glow: 0x47c7ff, nightIntensity: 0.12 }));
    mesh.position.y = y + 0.04;
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
      mesh.userData = { type: 'land', id: land.id, title: land.name, description: 'V6.3 的真实地理底盘：主城集中在曼哈顿，附属岛屿承担入口、风险与选学边界。', baseColor: land.color, payload: land };
      this.landGroup.add(mesh);
      this.pickables.push(mesh);
      const shoreline = makeLine([...land.polygon, land.polygon[0]], 0x6f7f82, land.id === 'manhattan-main-island' ? 1.8 : 1.4, { closed: true, roughness: 0.7, transparent: true, opacity: 0.72 });
      shoreline.name = land.name + ' 岸线';
      this.landGroup.add(shoreline);
    });
  }

  addDistrictPickSurfaces() {
    this.data.districts.forEach((district) => {
      const polygon = district.boundary || rectangleToPolygon(district.position[0], district.position[2], district.size[0], district.size[2], 2);
      const isPark = district.density === 'park';
      const mesh = makeGroundPolygon(polygon, district.color, this.material, { roughness: 0.9, transparent: true, opacity: isPark ? 0.40 : 0.16, glow: district.accent || 0, nightIntensity: 0.10 });
      mesh.position.y = isPark ? 0.22 : 0.16;
      mesh.name = district.name;
      mesh.userData = { type: 'district', id: district.id, title: district.name, description: district.role, math: district.math, cityMeaning: district.cityMeaning, labelTier: 'district', baseColor: district.color, payload: district };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addPlazas() {
    (this.data.plazas || []).forEach((plaza) => {
      const disk = makeDisk({ radius: plaza.radius, height: 0.9, color: plaza.color, materialFactory: this.material, segments: 72 });
      disk.position.set(plaza.position[0], plaza.position[1], plaza.position[2]);
      disk.name = plaza.name;
      disk.userData = { type: 'plaza', id: plaza.id, title: plaza.name, formula: plaza.formula, description: plaza.role, baseColor: plaza.color, payload: plaza };
      this.scene.add(disk);
      this.pickables.push(disk);
    });
  }

  addGeneratedStreetGrid() {
    this.data.districts.forEach((district) => {
      const grid = district.grid;
      if (!grid || district.density === 'park' || district.density === 'distant') return;
      const [dw, , dd] = district.size;
      const left = district.position[0] - dw / 2;
      const right = district.position[0] + dw / 2;
      const top = district.position[2] - dd / 2;
      const bottom = district.position[2] + dd / 2;
      const roadColor = district.density === 'risk' ? 0x6b3f36 : district.density === 'industrial' ? 0x584b41 : 0x444b52;
      const roadWidth = district.density === 'high' ? 4.8 : district.density === 'industrial' ? 6.6 : 5.8;
      for (let c = 1; c < grid.cols; c += 1) {
        const x = left + (dw * c) / grid.cols;
        const segment = [[x, 3.1, top + 14], [x, 3.1, bottom - 14]];
        if (this.lineInsidePolygon(segment, district.boundary)) this.streetGroup.add(makeRoadPath(segment, roadWidth, roadColor, this.material, { height: 0.55 }));
      }
      for (let r = 1; r < grid.rows; r += 1) {
        const z = top + (dd * r) / grid.rows;
        const segment = [[left + 14, 3.1, z], [right - 14, 3.1, z]];
        if (this.lineInsidePolygon(segment, district.boundary)) this.streetGroup.add(makeRoadPath(segment, roadWidth, roadColor, this.material, { height: 0.55 }));
      }
      if (district.id === 'linear-midtown') this.addBroadwayDiagonal(district);
    });
  }

  addBroadwayDiagonal(district) {
    const [dw, , dd] = district.size;
    const left = district.position[0] - dw / 2;
    const top = district.position[2] - dd / 2;
    const bottom = district.position[2] + dd / 2;
    for (let i = 0; i < 3; i += 1) {
      const x = left + 58 + i * 48;
      const segment = [[x, 3.4, top + 38], [x + 42, 3.4, bottom - 44]];
      this.streetGroup.add(makeRoadPath(segment, 3.1, 0x2f363d, this.material, { height: 0.45, glow: 0x6db6ff, nightIntensity: 0.10 }));
    }
  }

  addGeneratedFabricBuildings() {
    this.data.districts.forEach((district) => {
      const grid = district.grid;
      if (!grid || district.density === 'park') return;
      const [dw, , dd] = district.size;
      const cellW = dw / grid.cols;
      const cellD = dd / grid.rows;
      const lots = district.density === 'high' ? 2 : district.id === 'first-order-soho' ? 1 : 1;
      for (let r = 0; r < grid.rows; r += 1) {
        for (let c = 0; c < grid.cols; c += 1) {
          for (let lot = 0; lot < lots; lot += 1) {
            const seed = this.seed(district.id, r, c, lot);
            const x = district.position[0] - dw / 2 + cellW * (c + 0.5) + (lots === 2 ? (lot === 0 ? -cellW * 0.18 : cellW * 0.18) : (seed - 0.5) * cellW * 0.10);
            const z = district.position[2] - dd / 2 + cellD * (r + 0.5) + (this.frac(seed * 17.37) - 0.5) * cellD * 0.16;
            if (district.boundary && !this.pointInPolygon([x, z], district.boundary)) continue;
            if (this.isAvoided(x, z, grid.avoid)) continue;
            const dims = this.fabricDimensions(district, cellW, cellD, seed, lots);
            const height = this.fabricHeight(district, x, z, seed);
            const color = this.pickPalette(grid.palette, seed);
            this.fabricGroup.add(this.makeFabricBuilding(district, x, z, dims.width, dims.depth, height, color, seed));
          }
        }
      }
    });
  }

  makeFabricBuilding(district, x, z, width, depth, height, color, seed) {
    const group = new THREE.Group();
    group.name = district.borough + ' 城市肌理建筑';
    group.position.set(x, 2.05, z);
    const options = { roughness: district.density === 'high' ? 0.56 : district.density === 'industrial' ? 0.76 : 0.78, metalness: district.density === 'high' ? 0.08 : 0.03 };
    const body = makeFlatBox({ width, depth, height, color, materialFactory: this.material, options });
    body.position.y = height / 2;
    body.castShadow = true;
    group.add(body);
    if (district.density === 'high') this.addHighriseDetails(group, width, depth, height, color, seed);
    else if (district.grid.fabric === 'soho-brick') this.addSohoDetails(group, width, depth, height, color, seed);
    else if (district.density === 'industrial') this.addIndustrialDetails(group, width, depth, height, color, seed);
    else if (district.density === 'waterfront') this.addPierBuildingDetails(group, width, depth, height, color, seed);
    else if (district.density === 'risk') this.addRiskDetails(group, width, depth, height, color, seed);
    else this.addLowriseDetails(group, width, depth, height, color, seed);
    group.userData = { type: 'city-fabric', title: district.borough + ' 城市肌理建筑', description: '普通建筑负责形成曼哈顿街区密度，不单独绑定知识点。', district: district.id, baseColor: color };
    return group;
  }

  addHighriseDetails(group, width, depth, height, color, seed) {
    const rows = Math.min(16, Math.max(6, Math.floor(height / 17)));
    for (let i = 1; i <= rows; i += 1) {
      const y = (height * i) / (rows + 1);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 1.05, 1.0), this.material(0xe8edf0, { roughness: 0.42, glow: 0xd9f4ff, nightIntensity: 0.14 }));
      strip.position.set(0, y, -depth / 2 - 0.55);
      group.add(strip);
      if (i % 2 === 0) {
        const side = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, depth * 0.52), this.material(0xe8edf0, { roughness: 0.42, glow: 0xd9f4ff, nightIntensity: 0.10 }));
        side.position.set(width / 2 + 0.55, y, 0);
        group.add(side);
      }
    }
    if (height > 110) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(width * 0.66, height * 0.035, depth * 0.66), this.material(this.light(color, 0.16), { roughness: 0.58 }));
      cap.position.set(0, height + height * 0.018, 0);
      group.add(cap);
      this.roofPlant(group, width, depth, height, color);
    }
  }

  addSohoDetails(group, width, depth, height, color) {
    const rows = Math.max(3, Math.floor(height / 12));
    for (let r = 1; r <= rows; r += 1) {
      for (let c = -1; c <= 1; c += 1) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(width * 0.13, 3.0, 1.0), this.material(0xdfe7e5, { glow: 0xf6f6d8, nightIntensity: 0.08, roughness: 0.46 }));
        win.position.set(c * width * 0.23, r * height / (rows + 1), -depth / 2 - 0.58);
        group.add(win);
      }
    }
    const fireEscape = new THREE.Mesh(new THREE.BoxGeometry(1.4, height * 0.64, 2.0), this.material(0x394048, { roughness: 0.55 }));
    fireEscape.position.set(width / 2 + 1.4, height * 0.46, -depth * 0.25);
    group.add(fireEscape);
  }

  addIndustrialDetails(group, width, depth, height, color) {
    for (let i = -1; i <= 1; i += 1) {
      const roof = new THREE.Mesh(new THREE.BoxGeometry(width * 0.28, height * 0.15, depth * 1.04), this.material(this.light(color, 0.12), { roughness: 0.74 }));
      roof.position.set(i * width * 0.25, height * 0.72, 0);
      roof.rotation.z = i * 0.02;
      group.add(roof);
    }
    if (height > 26) {
      const chimney = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(2.6, width * 0.045), Math.max(2.6, width * 0.045), height * 0.55, 12), this.material(0x5f5851, { roughness: 0.7 }));
      chimney.position.set(width * 0.34, height * 0.88, depth * 0.28);
      chimney.castShadow = true;
      group.add(chimney);
    }
  }

  addPierBuildingDetails(group, width, depth, height, color) {
    const deck = new THREE.Mesh(new THREE.BoxGeometry(width * 1.2, 2.2, depth * 1.14), this.material(0x8b7357, { roughness: 0.82 }));
    deck.position.set(0, 1.0, 0);
    group.add(deck);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(width * 0.76, 3.6, depth * 0.72), this.material(this.light(color, 0.18), { roughness: 0.64 }));
    roof.position.set(0, height + 2.2, 0);
    group.add(roof);
  }

  addRiskDetails(group, width, depth, height) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 2.0, 2.0), this.material(0xffb199, { glow: 0xff5d42, nightIntensity: 0.24 }));
    marker.position.set(0, height + 2.2, -depth / 2 - 1.0);
    group.add(marker);
  }

  addLowriseDetails(group, width, depth, height, color) {
    if (height > 20) this.roofPlant(group, width, depth, height, color);
  }

  roofPlant(group, width, depth, height, color) {
    const plant = new THREE.Mesh(new THREE.BoxGeometry(width * 0.22, 5, depth * 0.18), this.material(this.dark(color, 0.22), { roughness: 0.65 }));
    plant.position.set(-width * 0.22, height + 3, depth * 0.18);
    group.add(plant);
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(Math.max(1.8, width * 0.06), Math.max(1.8, width * 0.06), 7, 12), this.material(0x8b735d, { roughness: 0.72 }));
    tank.position.set(width * 0.25, height + 5.5, -depth * 0.20);
    group.add(tank);
  }

  fabricHeight(district, x, z, seed) {
    const grid = district.grid;
    const base = grid.minHeight + (grid.maxHeight - grid.minHeight) * (0.20 + 0.80 * this.frac(seed * 19.91));
    if (district.density !== 'high') return base;
    const skyline = district.skyline || {};
    const primary = skyline.primary || [district.position[0], district.position[2]];
    const secondary = skyline.secondary || [district.position[0], district.position[2] + 130];
    const primaryBoost = Math.max(0, 1 - Math.hypot(x - primary[0], z - primary[1]) / (skyline.primaryRadius || 180));
    const secondaryBoost = Math.max(0, 1 - Math.hypot(x - secondary[0], z - secondary[1]) / (skyline.secondaryRadius || 130));
    return base + primaryBoost * 118 + secondaryBoost * 64;
  }

  fabricDimensions(district, cellW, cellD, seed, lots) {
    if (district.density === 'high') return { width: cellW * (0.34 + 0.12 * this.frac(seed * 2.1)) / lots, depth: cellD * (0.50 + 0.16 * this.frac(seed * 3.1)) };
    if (district.density === 'industrial') return { width: cellW * (0.64 + 0.16 * this.frac(seed * 2.3)), depth: cellD * (0.62 + 0.14 * this.frac(seed * 4.3)) };
    if (district.density === 'waterfront' || district.density === 'civic-low') return { width: cellW * (0.42 + 0.12 * this.frac(seed * 2.8)), depth: cellD * (0.38 + 0.12 * this.frac(seed * 4.8)) };
    if (district.density === 'risk') return { width: cellW * (0.42 + 0.10 * this.frac(seed * 2.8)), depth: cellD * (0.42 + 0.10 * this.frac(seed * 4.8)) };
    return { width: cellW * (0.48 + 0.14 * this.frac(seed * 2.6)), depth: cellD * (0.46 + 0.14 * this.frac(seed * 3.6)) };
  }

  addUrbanDetails() {
    this.addCentralParkDetails();
    this.addPiers();
    this.addStreetTrees();
    this.addFerryDots();
  }

  addCentralParkDetails() {
    const paths = [
      [[-86, 2.9, -442], [-52, 2.9, -398], [-12, 2.9, -360], [58, 2.9, -318]],
      [[-70, 2.9, -286], [-12, 2.9, -338], [44, 2.9, -430]]
    ];
    paths.forEach((pts) => this.detailGroup.add(makeRoadPath(pts, 3.6, 0x6b8f6a, this.material, { height: 0.35, glow: 0x5eead4, nightIntensity: 0.12 })));
    const lake = makeDisk({ radius: 28, height: 0.45, color: 0x8fb9bd, materialFactory: this.material, segments: 36 });
    lake.scale.set(1.7, 1, 0.72);
    lake.position.set(38, 2.7, -410);
    lake.name = 'Central Park 轨迹湖面';
    this.detailGroup.add(lake);
  }

  addPiers() {
    [-42, 26, 94, 164, 232].forEach((z, i) => {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(92 + i * 6, 2.0, 12), this.material(0x8b7357, { roughness: 0.80 }));
      pier.position.set(182 + i * 3, 2.6, z);
      pier.castShadow = true;
      pier.receiveShadow = true;
      this.detailGroup.add(pier);
    });
  }

  addStreetTrees() {
    const treePoints = [
      [-86, -465], [-70, -420], [-62, -365], [-48, -305], [72, -460], [64, -405], [74, -330],
      [-86, 280], [-82, 330], [-72, 390], [92, 265], [86, 330], [82, 402]
    ];
    treePoints.forEach(([x, z]) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 7, 8), this.material(0x6b4f38, { roughness: 0.72 }));
      trunk.position.set(x, 5.2, z);
      const crown = new THREE.Mesh(new THREE.ConeGeometry(5.0, 12, 10), this.material(0x5f8f62, { roughness: 0.78 }));
      crown.position.set(x, 14, z);
      this.detailGroup.add(trunk, crown);
    });
  }

  addFerryDots() {
    [[-350, 620], [-250, 600], [-145, 580]].forEach(([x, z]) => {
      const ferry = new THREE.Mesh(new THREE.BoxGeometry(16, 3, 7), this.material(0xe8eff2, { roughness: 0.62, glow: 0xffd48a, nightIntensity: 0.20 }));
      ferry.position.set(x, 4.2, z);
      this.detailGroup.add(ferry);
    });
  }

  addRoads() {
    this.data.roads.forEach((road) => {
      const isWarning = road.id?.includes('risk') || road.name?.includes('风险');
      const isMain = road.id?.includes('main') || road.name?.includes('主线');
      const mesh = makeRoadPath(road.points, road.width, road.color, this.material, { height: isMain ? 0.95 : 0.72, glow: isWarning ? 0xff5d42 : isMain ? 0x6db6ff : 0, nightIntensity: isWarning ? 0.48 : 0.28 });
      mesh.name = road.name;
      mesh.userData = { type: 'road', id: road.id, title: road.name, formula: road.formula || road.role, description: road.role || '城市道路', baseColor: road.color, payload: road };
      this.scene.add(mesh);
      this.pickables.push(mesh);
    });
  }

  addBridges() {
    this.data.bridges.forEach((bridge) => {
      const group = new THREE.Group();
      group.name = bridge.name;
      group.add(makeRoadPath(bridge.points, bridge.type === 'suspension' ? 15 : bridge.width || 10, bridge.color, this.material, { height: 1.25, glow: 0xffd15a, nightIntensity: 0.45 }));
      bridge.points.forEach((point, index) => {
        if (index === 0 || index === bridge.points.length - 1) return;
        const pylonHeight = bridge.type === 'suspension' ? 62 : 24;
        const pylon = new THREE.Mesh(new THREE.BoxGeometry(13, pylonHeight, 13), this.material(0x9b9487, { roughness: 0.62, glow: 0xffd15a, nightIntensity: 0.24 }));
        pylon.position.set(point[0], point[1] + pylonHeight / 2, point[2]);
        pylon.castShadow = true;
        group.add(pylon);
      });
      if (bridge.type === 'suspension') {
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

  light(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0xffffff), amount).getHex();
  }

  dark(color, amount) {
    return new THREE.Color(color).lerp(new THREE.Color(0x111827), amount).getHex();
  }
}
