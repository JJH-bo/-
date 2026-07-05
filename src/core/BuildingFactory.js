import * as THREE from 'three';

export class BuildingFactory {
  constructor(material) {
    this.material = material;
  }

  createBuilding(data) {
    const [w, h, d] = data.size;
    const geometry = new THREE.BoxGeometry(w, h, d);
    const mat = this.material(data.color);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(data.position[0], h / 2, data.position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = data.name;
    mesh.userData = {
      type: 'building',
      id: data.id,
      title: data.name,
      formula: data.formula,
      district: data.district,
      baseColor: data.color,
      glow: data.id.includes('tower') || data.id.includes('bridge') ? 0x6ab8ff : 0x000000,
      payload: data
    };
    return mesh;
  }

  createTower(data) {
    const mesh = this.createBuilding(data);
    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(data.size[0] * 0.54, data.size[0] * 0.8, 8),
      this.material(data.color, { roughness: 0.62, metalness: 0.08 })
    );
    cap.position.set(data.position[0], data.size[1] + data.size[0] * 0.4, data.position[2]);
    cap.castShadow = true;
    const group = new THREE.Group();
    group.add(mesh, cap);
    group.name = data.name;
    group.userData = mesh.userData;
    return group;
  }

  createGate(data) {
    const [w, h, d] = data.size;
    const group = new THREE.Group();
    const mat = this.material(data.color, { roughness: 0.62, metalness: 0.06 });
    const left = new THREE.Mesh(new THREE.BoxGeometry(w * 0.22, h, d), mat);
    const right = left.clone();
    const top = new THREE.Mesh(new THREE.BoxGeometry(w, h * 0.18, d), mat);
    left.position.set(data.position[0] - w * 0.33, h / 2, data.position[2]);
    right.position.set(data.position[0] + w * 0.33, h / 2, data.position[2]);
    top.position.set(data.position[0], h * 0.9, data.position[2]);
    group.add(left, right, top);
    group.name = data.name;
    group.userData = {
      type: 'building',
      id: data.id,
      title: data.name,
      formula: data.formula,
      district: data.district,
      baseColor: data.color,
      glow: 0xa178ff,
      payload: data
    };
    return group;
  }
}
