import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function renderThreeJs() {
  let gltfName = "pillar.glb";

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);

  const renderer = new THREE.WebGLRenderer();
  const canvasWidth = 800;
  const canvasHeight = 600;
  renderer.setSize(canvasWidth, canvasHeight);

  const container = document.getElementById("container");
  const canvasContainer = document.createElement("div");
  canvasContainer.id = "canvas-container";
  container.appendChild(canvasContainer);
  canvasContainer.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const loader = new GLTFLoader();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(1, 0, 0);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(0, 0, 1);
  scene.add(directionalLight3);

  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight4.position.set(0, 0, -1);
  scene.add(directionalLight4);

  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight5.position.set(0, -1, 0);
  scene.add(directionalLight5);

  const directionalLight6 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight6.position.set(-1, 0, 0);
  scene.add(directionalLight6);

  function loadModel() {
    loader.load(
      gltfName,
      function (gltf) {
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        scene.add(gltf.scene);
        console.log("GLTF model loaded successfully:", gltf);
      },
      undefined,
      function (error) {
        console.error("Error loading GLTF model:", error);
      }
    );
  }

  loadModel();

  const minecraftButton = document.getElementById("minecraftButton");
  const hkLogoButton = document.getElementById("hkLogoButton");

  minecraftButton.addEventListener("click", function () {
    gltfName = "dirt.glb";
    console.log(gltfName);
    scene.remove(scene.children[scene.children.length - 1]);
    loadModel();
  });

  hkLogoButton.addEventListener("click", function () {
    gltfName = "pillar.glb";
    console.log(gltfName);
    scene.remove(scene.children[scene.children.length - 1]);
    loadModel();
  });

  function animate() {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  animate();
}
