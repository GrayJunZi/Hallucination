import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// 时钟
const clock = new THREE.Clock();

gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });

// 动画
const tick = () => {
  // 时钟
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime);

  // 匀速旋转动画
  // mesh.rotation.y = elapsedTime;

  // 每秒旋转一圈
  // mesh.rotation.y = elapsedTime * Math.PI * 2;

  // 匀速移动动画
  // mesh.position.y = elapsedTime;

  // 曲线移动动画
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // 相机移动
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);

  // 渲染
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
