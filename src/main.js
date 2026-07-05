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
scene.background = new THREE.Color(0xeaf3fb);
scene.fog = new THREE.Fog(0xeaf3fb, 900, 2200);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(48, 1, 1, 5000);
const rig = new CameraRig(camera, renderer.domElement);
const panel = new PanelManager(document.querySelector('#info-panel'));
const labels = new LabelManager(document.querySelector('#label-layer'), camera, renderer);

const city = new CityBuilder(scene, cityData);
const pickables = city.build();

new InteractionManager({
  camera,
  renderer,
  pickables,
  onPick: (object) => panel.showObject(object)
});

function addLights() {
  const hemi = new THREE.HemisphereLight(0xffffff, 0xd2e4f2, 1.8);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffffff, 3.4);
  sun.position.set(-500, 850, 600);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -900;
  sun.shadow.camera.right = 900;
  sun.shadow.camera.top = 900;
  sun.shadow.camera.bottom = -900;
  scene.add(sun);
}

function registerLabels() {
  scene.traverse((object) => {
    if (!object.userData || !object.userData.title) return;
    if (object.userData.type === 'district') labels.register(object, object.userData.title, { yOffset: 52 });
    if (object.userData.type === 'building' && shouldShowBuildingLabel(object)) labels.register(object, object.userData.title, { yOffset: 34, small: true });
  });
}

function shouldShowBuildingLabel(object) {
  const id = object.userData.id || '';
  return id.includes('tower') || id.includes('linear-first') || id.includes('bernoulli') || id.includes('elevator');
}

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

let night = false;
let metroVisible = true;

document.querySelector('#btn-reset').addEventListener('click', () => rig.flyToPreset('overview'));
document.querySelector('#btn-day-night').addEventListener('click', () => {
  night = !night;
  document.body.classList.toggle('night', night);
  scene.background.setHex(night ? 0x061525 : 0xeaf3fb);
  scene.fog.color.setHex(night ? 0x061525 : 0xeaf3fb);
  applyNightMode(scene, night);
});
document.querySelector('#btn-metro').addEventListener('click', () => {
  metroVisible = !metroVisible;
  city.setMetroVisible(metroVisible);
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
setTimeout(() => document.querySelector('#loading')?.remove(), 850);
animate();
