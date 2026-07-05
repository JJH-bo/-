import { cityData } from '../src/data/cityData.js';

const requiredDistrictIds = new Set(cityData.districts.map((district) => district.id));
const errors = [];

for (const building of cityData.buildings) {
  if (!requiredDistrictIds.has(building.district)) {
    errors.push(`建筑 ${building.id} 引用了不存在的城区 ${building.district}`);
  }
}

for (const road of cityData.roads) {
  if (!Array.isArray(road.points) || road.points.length < 2) {
    errors.push(`道路 ${road.id} 至少需要两个路径点`);
  }
}

for (const bridge of cityData.bridges) {
  if (!bridge.formula) errors.push(`桥梁 ${bridge.id} 必须有结构转化公式`);
}

if (errors.length) {
  console.error('V6 城市数据校验失败：');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('V6 城市数据校验通过。');
console.log(`城区：${cityData.districts.length}`);
console.log(`建筑：${cityData.buildings.length}`);
console.log(`道路：${cityData.roads.length}`);
console.log(`桥梁：${cityData.bridges.length}`);
console.log(`地铁线：${cityData.metro.length}`);
