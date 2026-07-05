import * as THREE from 'three';

export class InteractionManager {
  constructor({ camera, renderer, pickables, onPick }) {
    this.camera = camera;
    this.renderer = renderer;
    this.pickables = pickables;
    this.onPick = onPick;
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.bind();
  }

  bind() {
    this.renderer.domElement.addEventListener('click', (event) => this.handleClick(event));
  }

  handleClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, true);
    if (!hits.length) return;
    let object = hits[0].object;
    while (object.parent && !object.userData.type) object = object.parent;
    this.onPick(object);
  }
}
