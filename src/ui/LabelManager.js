import * as THREE from 'three';
import { LABEL_RULES } from '../config/constants.js';

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
    const classes = ['city-label'];
    if (tier === 'landmark') classes.push('landmark');
    if (tier === 'district') classes.push('district');
    if (options.small) classes.push('small');
    el.className = classes.join(' ');
    el.textContent = text;
    this.layer.appendChild(el);
    this.labels.set(object.uuid, { object, el, options: { ...options, tier } });
  }

  update(distance) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    let visibleCount = 0;
    const hardLimit = distance > 1350 ? 9 : distance > 760 ? 16 : 22;
    this.labels.forEach(({ object, el, options }) => {
      object.getWorldPosition(this.temp);
      this.temp.y += options.yOffset ?? 40;
      const vector = this.temp.clone().project(this.camera);
      const x = (vector.x * 0.5 + 0.5) * rect.width;
      const y = (-vector.y * 0.5 + 0.5) * rect.height;
      const offscreen = x < -80 || x > rect.width + 80 || y < -80 || y > rect.height + 80;
      const behind = vector.z > 1;
      let shouldHide = behind || offscreen || distance < LABEL_RULES.NEAR_HIDE;
      if (options.tier === 'district') {
        shouldHide = shouldHide || distance < LABEL_RULES.DISTRICT_MIN;
      } else if (options.tier === 'landmark') {
        shouldHide = shouldHide || distance < LABEL_RULES.LANDMARK_MIN || distance > LABEL_RULES.LANDMARK_MAX;
      } else {
        shouldHide = shouldHide || distance < LABEL_RULES.LANDMARK_MIN || distance > LABEL_RULES.MID_MAX;
      }
      if (!shouldHide && visibleCount >= hardLimit) shouldHide = true;
      if (!shouldHide) visibleCount += 1;
      el.classList.toggle('hidden', shouldHide);
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.opacity = this.opacityFor(distance, options.tier).toFixed(2);
    });
  }

  opacityFor(distance, tier) {
    if (tier === 'district') return distance > 1500 ? 0.86 : 0.95;
    if (tier === 'landmark') return distance > 1150 ? 0.72 : 0.92;
    return distance > 900 ? 0.60 : 0.78;
  }

  clear() {
    this.layer.innerHTML = '';
    this.labels.clear();
  }
}
