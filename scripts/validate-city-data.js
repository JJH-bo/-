import { cityData } from '../src/data/cityData.js';

const districtIds = new Set(cityData.districts.map((district) => district.id));
const buildingIds = new Set(cityData.buildings.map((building) => building.id));
const errors = [];
const warnings = [];

const requiredDistricts = [
  'concept-liberty-battery',
  'first-order-soho',
  'reduction-chelsea',
  'linear-midtown',
  'geometry-central-park',
  'physics-east-river',
  'risk-governors',
  'grey-difference'
];
const requiredLandMasses = ['manhattan-main-island', 'liberty-island', 'governors-island', 'grey-island'];
const requiredBuildings = [
  'characteristic-tower',
  'linear-first-order-hall',
  'bernoulli-gate',
  'reduction-elevator',
  'complex-root-spiral',
  'cooling-lab-tower',
  'bike-trajectory-hall',
  'zero-loss-pit'
];

function requirePointList(owner, points) {
  if (!Array.isArray(points) || points.length < 2) errors.push(`${owner} 至少需要两个路径点`);
  if (Array.isArray(points)) {
    points.forEach((point, index) => {
      if (!Array.isArray(point) || point.length !== 3 || point.some((value) => typeof value !== 'number')) {
        errors.push(`${owner} 第 ${index + 1} 个路径点必须是 [x,y,z] 数字数组`);
      }
    });
  }
}

function requirePolygon(owner, polygon) {
  if (!Array.isArray(polygon) || polygon.length < 3) errors.push(`${owner} 必须是至少 3 个点的多边形`);
  if (Array.isArray(polygon)) {
    polygon.forEach((point, index) => {
      if (!Array.isArray(point) || point.length !== 3 || point.some((value) => typeof value !== 'number')) {
        errors.push(`${owner} 第 ${index + 1} 个多边形点必须是 [x,y,z] 数字数组`);
      }
    });
  }
}

if (!cityData.meta?.version?.includes('V6.3')) errors.push('meta.version 必须明确为 V6.3 阶段');

for (const id of requiredDistricts) {
  if (!districtIds.has(id)) errors.push(`缺少 V6.3 必需城区：${id}`);
}

const landIds = new Set((cityData.landMasses || []).map((land) => land.id));
for (const id of requiredLandMasses) {
  if (!landIds.has(id)) errors.push(`缺少 V6.3 必需岛屿/陆地：${id}`);
}

for (const id of requiredBuildings) {
  if (!buildingIds.has(id)) errors.push(`缺少 V6.3 必需核心地标：${id}`);
}

if (!cityData.water?.river?.points) errors.push('必须定义 Hudson / East River 水系 water.river.points');
else requirePointList('Hudson / East River 水系', cityData.water.river.points);

if (!cityData.water?.bay?.center || !cityData.water?.bay?.radius) errors.push('必须定义概念入口水面 water.bay.center 与 radius');
if (!cityData.water?.harbor?.center || !cityData.water?.harbor?.radius) errors.push('必须定义 East River 应用水面 water.harbor.center 与 radius');

for (const land of cityData.landMasses || []) requirePolygon(`陆地 ${land.id}`, land.polygon);

for (const district of cityData.districts) {
  if (!district.id || !district.name) errors.push('城区必须有 id 和 name');
  if (!Array.isArray(district.position) || district.position.length !== 3) errors.push(`城区 ${district.id} position 必须是三维坐标`);
  if (!Array.isArray(district.size) || district.size.length !== 3) errors.push(`城区 ${district.id} size 必须是三维尺寸`);
  if (!district.grid) errors.push(`城区 ${district.id} 必须有 grid，用于生成街区肌理`);
  if (!district.role) errors.push(`城区 ${district.id} 必须有 role`);
  if (!district.cityMeaning) errors.push(`城区 ${district.id} 必须有 cityMeaning`);
  if (district.boundary) requirePolygon(`城区边界 ${district.id}`, district.boundary);
}

const centralPark = cityData.districts.find((district) => district.id === 'geometry-central-park');
if (!centralPark || centralPark.density !== 'park') errors.push('Central Park 必须作为 density=park 的唯一大空地');
const otherParkLike = cityData.districts.filter((district) => district.id !== 'geometry-central-park' && district.density === 'park');
if (otherParkLike.length) errors.push(`除 Central Park 外不允许出现大 park 区：${otherParkLike.map((item) => item.id).join(', ')}`);

for (const plaza of cityData.plazas || []) {
  if (!districtIds.has(plaza.district)) errors.push(`广场 ${plaza.id} 引用了不存在的城区 ${plaza.district}`);
  if (!plaza.role) errors.push(`广场 ${plaza.id} 必须有 role`);
}

for (const building of cityData.buildings) {
  if (!districtIds.has(building.district)) errors.push(`建筑 ${building.id} 引用了不存在的城区 ${building.district}`);
  if (!building.type) errors.push(`建筑 ${building.id} 必须有 type，不能退回无语义盒子`);
  if (!building.role) errors.push(`建筑 ${building.id} 必须有城市/数学语义 role`);
  if (!building.formula) errors.push(`建筑 ${building.id} 必须有公式牌匾 formula`);
  if (!Array.isArray(building.position) || building.position.length !== 3) errors.push(`建筑 ${building.id} position 必须是三维坐标`);
  if (!Array.isArray(building.size) || building.size.length !== 3) errors.push(`建筑 ${building.id} size 必须是三维尺寸`);
}

for (const road of cityData.roads) {
  requirePointList(`道路 ${road.id}`, road.points);
  if (!road.role) errors.push(`道路 ${road.id} 必须有学习/城市语义 role`);
}

for (const bridge of cityData.bridges) {
  requirePointList(`桥梁 ${bridge.id}`, bridge.points);
  if (!bridge.formula) errors.push(`桥梁 ${bridge.id} 必须有结构转化公式`);
  if (!bridge.role) errors.push(`桥梁 ${bridge.id} 必须有结构转化语义 role`);
}

for (const line of cityData.metro) requirePointList(`地铁线 ${line.id}`, line.points);

const oldTerms = ['queens', 'brooklyn', 'red-hook', 'manhattan-linear'];
const serialized = JSON.stringify(cityData).toLowerCase();
for (const term of oldTerms) {
  if (serialized.includes(term)) warnings.push(`仍检测到旧版五区术语：${term}，请确认不是遗留命名`);
}

if (errors.length) {
  console.error('V6.3 城市数据校验失败：');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('V6.3 城市数据校验通过。');
console.log(`城区：${cityData.districts.length}`);
console.log(`陆地/岛屿：${cityData.landMasses.length}`);
console.log(`广场：${cityData.plazas.length}`);
console.log(`建筑：${cityData.buildings.length}`);
console.log(`道路：${cityData.roads.length}`);
console.log(`桥梁：${cityData.bridges.length}`);
console.log(`地铁线：${cityData.metro.length}`);
if (warnings.length) {
  console.warn('V6.3 校验警告：');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
