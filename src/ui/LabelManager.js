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
    const tier = object.userData?.type === 'district' ? 'district' : (object.userData?.labelTier || 'mid');
    el.className = `city-label ${tier === 'landmark' ? 'landmark' : ''} ${tier === 'district' ? 'district' : ''} ${options.small ? 'small' : ''}`;
    el.textContent = text;
    this.layer.appendChild(el);
    this.labels.set(object.uuid, { object, el, options: { ...options, tier } });
  }

  update(distance) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.labels.forEach(({ object, el, options }) => {
      object.getWorldPosition(this.temp);
      this.temp.y += options.yOffset ?? 40;
      const vector = this.temp.clone().project(this.camera);
      const x = (vector.x * 0.5 + 0.5) * rect.width;
      const y = (-vector.y * 0.5 + 0.5) * rect.height;
      const behind = vector.z > 1;
      const near = distance < 430;
      const far = distance > 1180;
      const hideMid = options.tier !== 'district' && (near || far);
      const hideDistrict = options.tier === 'district' && near;
      el.classList.toggle('hidden', behind || hideMid || hideDistrict);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  }

  clear() {
    this.layer.replaceChildren();
    this.labels.clear();
  }
}
