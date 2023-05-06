import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// scene
const scene = new THREE.Scene();

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// obj loader

const gltfLoader = new GLTFLoader();

gltfLoader.load('assets/Final.gltf', (gltf) => {
  gltf.scene.scale.set(3, 3, 3)
  gltf.scene.position.y = -3
  scene.add(gltf.scene);
});



// light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10)
light.intensity = 2.55


// camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera)
camera.add(light)

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(2)

// controls


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

// resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)

})


const loop = () => {
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()





