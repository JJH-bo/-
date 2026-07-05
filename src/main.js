import * as THREE from 'three';
import './styles.css';
import { cityData } from './data/cityData.js';
import { CityBuilder } from './core/CityBuilder.js';
import { CameraRig } from './core/CameraRig.js';
import { InteractionManager } from './core/InteractionManager.js';
import { LabelManager } from './ui/LabelManager.js';
import { PanelManager } from './ui/PanelManager.js';
import { applyNightMode } from './core/materials.js';

const canvas = document.querySelector('#city-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe6edf1);
scene.fog = new THREE.Fog(0xe6edf1, 1180, 3100);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(45, 1, 1, 5400);
const rig = new CameraRig(camera, renderer.domElement);
const panel = new PanelManager(document.querySelector('#info-panel'));
const labels = new LabelManager(document.querySelector('#label-layer'), camera, renderer);

const city = new CityBuilder(scene, cityData);
const pickables = city.build();

new InteractionManager({ camera, renderer, pickables, onPick: (object) => panel.showObject(object) });

function addLights() {
  const hemi = new THREE.HemisphereLight(0xffffff, 0xb9cbd0, 1.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 3.2);
  sun.position.set(-620, 980, 720);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -1120;
  sun.shadow.camera.right = 1120;
  sun.shadow.camera.top = 980;
  sun.shadow.camera.bottom = -980;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 2400;
  scene.add(sun);
  const manhattanGlow = new THREE.PointLight(0x9fd7ff, 0.55, 620);
  manhattanGlow.position.set(150, 260, -190);
  scene.add(manhattanGlow);
}

function registerLabels() {
  scene.traverse((object) => {
    if (!object.userData || !object.userData.title) return;
    if (object.userData.type === 'district') labels.register(object, object.userData.title, { yOffset: 64 });
    if (object.userData.type === 'building' && shouldShowBuildingLabel(object)) {
      const height = object.userData.payload && object.userData.payload.size ? object.userData.payload.size[1] : 42;
      labels.register(object, object.userData.title, { yOffset: height + 18, small: object.userData.labelTier !== 'landmark' });
    }
    if (object.userData.type === 'bridge' && object.userData.labelTier === 'landmark') labels.register(object, object.userData.title, { yOffset: 34, small: true });
  });
}

function shouldShowBuildingLabel(object) {
  const payload = object.userData.payload || {};
  const id = object.userData.id || '';
  return payload.strongSymbol || id === 'euler-bridge-entry' || id === 'linear-first-order' || id === 'reduction-elevator';
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

let night = false;
let metroVisible = false;
city.setMetroVisible(false);

document.querySelector('#btn-reset').addEventListener('click', () => rig.flyToPreset('overview'));
document.querySelector('#btn-day-night').addEventListener('click', () => {
  night = !night;
  metroVisible = night;
  document.body.classList.toggle('night', night);
  scene.background.setHex(night ? 0x061525 : 0xe6edf1);
  scene.fog.color.setHex(night ? 0x061525 : 0xe6edf1);
  applyNightMode(scene, night);
  city.setMetroVisible(metroVisible);
});
document.querySelector('#btn-metro').addEventListener('click', () => {
  metroVisible = !metroVisible;
  city.setMetroVisible(metroVisible);
});
document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => rig.flyToPreset(button.dataset.preset));
});

function animate() {
  labels.update(camera.position.distanceTo(rig.target));
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

addLights();
registerLabels();
resize();
window.addEventListener('resize', resize);
setTimeout(() => {
  const loading = document.querySelector('#loading');
  if (loading) loading.remove();
}, 650);
animate();
