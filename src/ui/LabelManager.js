import * as THREE from 'three';

export class LabelManager {
  constructor(layer, camera, renderer) {
    this.layer = layer;
    this.camera = camera;
    this.renderer = renderer;
    this.labels = new Map();
    this.temp = new THREE.Vector3();
  }

  register(object, text, options = {}) {
    const el = document.createElement('div');
    el.className = `city-label ${options.small ? 'small' : ''}`;
    el.textContent = text;
    this.layer.appendChild(el);
    this.labels.set(object.uuid, { object, el, options });
  }

  update(distance) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const hideCloseLabels = distance < 520;
    this.labels.forEach(({ object, el, options }) => {
      object.getWorldPosition(this.temp);
      this.temp.y += options.yOffset ?? 40;
      const vector = this.temp.clone().project(this.camera);
      const x = (vector.x * 0.5 + 0.5) * rect.width;
      const y = (-vector.y * 0.5 + 0.5) * rect.height;
      const behind = vector.z > 1;
      const shouldHide = behind || (hideCloseLabels && !options.always);
      el.classList.toggle('hidden', shouldHide);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  }

  clear() {
    this.layer.replaceChildren();
    this.labels.clear();
  }
}
