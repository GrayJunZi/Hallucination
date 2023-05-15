// 创建场景
const scene = new THREE.Scene();

// 红色立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 材料
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

// 网格
const mesh = new THREE.Mesh(geometry, material);
// 将网格添加至场景中
scene.add(mesh);

// 尺寸
const sizes = {
  width: 800,
  height: 600,
};

// 相机
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// 设置相机z轴位置
camera.position.z = 3;

// 将相机添加至场景中
scene.add(camera);

// 画布
const canvas = document.querySelector(".webgl");

// 渲染
const renderer = new THREE.WebGLRenderer({
  canvas,
});

// 设置尺寸
renderer.setSize(sizes.width, sizes.height);

// 渲染场景
renderer.render(scene, camera);
