import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

let camera, scene, renderer;
init();
render();

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1.5, 4, 9);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf6eedc);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('./libs/gltf/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.setPath('./public/AVIFTest/');
  loader.load('forest_house.glb', (gltf) => {
    scene.add(gltf.scene);
    render();
  });

  // const dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath('./libs/gltf/');

  // const loader = new GLTFLoader();
  // loader.setDRACOLoader(dracoLoader);
  // loader.setPath('./public/AVIFTest/');
  // loader.load('forest_house.glb', function (gltf) {
  //   scene.add(gltf.scene);

  //   render();
  // });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.target.set(0, 2, 0);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const reflectionCube = new THREE.CubeTextureLoader()
//   .setPath('./public/SwedishRoyalCastle/')
//   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

// const loader = new GLTFLoader();
// loader.load(
//   './public/BoomBox.glb',
//   function (gltf) {
//     const boomBox = gltf.scene;
//     boomBox.position.set(0, 0.2, 0);
//     boomBox.scale.set(20, 20, 20);

//     boomBox.traverse(function (object) {
//       if (object.isMesh) {
//         object.material.envMap = reflectionCube;
//         object.geometry.rotateY(-Math.PI);
//         object.castShadow = true;
//       }
//     });

//     scene.add(boomBox);
//     animate();
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
