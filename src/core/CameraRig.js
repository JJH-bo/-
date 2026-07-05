import * as THREE from 'three';
import { CAMERA_PRESETS } from '../config/constants.js';

export class CameraRig {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.target = new THREE.Vector3(...CAMERA_PRESETS.overview.target);
    this.distance = 1380;
    this.theta = -0.72;
    this.phi = 0.92;
    this.isDragging = false;
    this.last = { x: 0, y: 0 };
    this.bind();
    this.update();
  }

  bind() {
    this.domElement.addEventListener('pointerdown', (event) => {
      this.isDragging = true;
      this.last.x = event.clientX;
      this.last.y = event.clientY;
    });
    window.addEventListener('pointerup', () => { this.isDragging = false; });
    window.addEventListener('pointermove', (event) => {
      if (!this.isDragging) return;
      const dx = event.clientX - this.last.x;
      const dy = event.clientY - this.last.y;
      this.theta -= dx * 0.006;
      this.phi = THREE.MathUtils.clamp(this.phi + dy * 0.004, 0.32, 1.36);
      this.last.x = event.clientX;
      this.last.y = event.clientY;
      this.update();
    });
    this.domElement.addEventListener('wheel', (event) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 1.08 : 0.92;
      this.distance = THREE.MathUtils.clamp(this.distance * factor, 260, 2550);
      this.update();
    }, { passive: false });
  }

  update() {
    const sinPhi = Math.sin(this.phi);
    const x = this.target.x + this.distance * sinPhi * Math.sin(this.theta);
    const y = this.target.y + this.distance * Math.cos(this.phi);
    const z = this.target.z + this.distance * sinPhi * Math.cos(this.theta);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }

  flyToPreset(name) {
    const preset = CAMERA_PRESETS[name] ?? CAMERA_PRESETS.overview;
    this.target.set(...preset.target);
    this.camera.position.set(...preset.position);
    this.distance = this.camera.position.distanceTo(this.target);
    const offset = this.camera.position.clone().sub(this.target);
    this.theta = Math.atan2(offset.x, offset.z);
    this.phi = Math.acos(offset.y / this.distance);
    this.update();
  }
}
