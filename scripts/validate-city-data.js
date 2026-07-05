import { cityData } from '../src/data/cityData.js';

const districtIds = new Set(cityData.districts.map((district) => district.id));
const errors = [];

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

if (!cityData.water?.river?.points) errors.push('必须定义微分河 water.river.points');
else requirePointList('微分河', cityData.water.river.points);

if (!cityData.water?.bay?.center || !cityData.water?.bay?.radius) errors.push('必须定义应用海湾 water.bay.center 与 radius');

for (const district of cityData.districts) {
  if (!district.id || !district.name) errors.push('城区必须有 id 和 name');
  if (!Array.isArray(district.position) || district.position.length !== 3) errors.push(`城区 ${district.id} position 必须是三维坐标`);
  if (!Array.isArray(district.size) || district.size.length !== 3) errors.push(`城区 ${district.id} size 必须是三维尺寸`);
  if (!district.grid) errors.push(`城区 ${district.id} 必须有 grid，用于生成街区肌理`);
}

for (const plaza of cityData.plazas || []) {
  if (!districtIds.has(plaza.district)) errors.push(`广场 ${plaza.id} 引用了不存在的城区 ${plaza.district}`);
}

for (const building of cityData.buildings) {
  if (!districtIds.has(building.district)) errors.push(`建筑 ${building.id} 引用了不存在的城区 ${building.district}`);
  if (!building.type) errors.push(`建筑 ${building.id} 必须有 type，不能退回无语义盒子`);
  if (!building.role) errors.push(`建筑 ${building.id} 必须有城市/数学语义 role`);
  if (!building.formula) errors.push(`建筑 ${building.id} 必须有公式牌匾 formula`);
}

for (const road of cityData.roads) requirePointList(`道路 ${road.id}`, road.points);

for (const bridge of cityData.bridges) {
  requirePointList(`桥梁 ${bridge.id}`, bridge.points);
  if (!bridge.formula) errors.push(`桥梁 ${bridge.id} 必须有结构转化公式`);
  if (!bridge.role) errors.push(`桥梁 ${bridge.id} 必须有结构转化语义 role`);
}

for (const line of cityData.metro) requirePointList(`地铁线 ${line.id}`, line.points);

if (errors.length) {
  console.error('V6 城市数据校验失败：');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('V6 城市数据校验通过。');
console.log(`城区：${cityData.districts.length}`);
console.log(`广场：${cityData.plazas.length}`);
console.log(`建筑：${cityData.buildings.length}`);
console.log(`道路：${cityData.roads.length}`);
console.log(`桥梁：${cityData.bridges.length}`);
console.log(`地铁线：${cityData.metro.length}`);
