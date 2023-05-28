import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// scene
const scene = new THREE.Scene();

// sizes
const sizes = {
  width: window.innerWidth / 2.1,
  height: window.innerHeight
}

// obj loader
const gltfLoader = new GLTFLoader();
let mixer;
const clock = new THREE.Clock();

// location.reload();
  gltfLoader.load(`models/${localStorage.getItem("char")}.gltf`, (gltf) => {


    if (`${localStorage.getItem("char")}` === "john"){
      gltf.scene.scale.set(2, 2, 2);
    }else{
      gltf.scene.scale.set(4.5, 4.5, 4.5);
    }

    gltf.scene.position.y = -4;

    // Access the animation data
    const animations = gltf.animations;

    // Create an AnimationMixer and add the AnimationClips
    mixer = new THREE.AnimationMixer(gltf.scene);
    animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    // Add the GLTF object to the scene
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

renderer.setClearColor(0x000000, 0);

const loop = () => {
  controls.update();
  if (mixer) {
    mixer.update(clock.getDelta()); // clock is a Three.js Clock object
  }

  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()





