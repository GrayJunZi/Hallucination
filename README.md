# Hallucination

## Three.js Journey - The Ultimate Three.js Course

终极 Three.js 课程。

## 一、介绍

### 基础部分

- 创建第一个场景(scene)
- 渲染
- 添加对象(objects)
- 选择合适的材料(materials)
- 添加纹理(textures)
- 动画化(animating)
- 部署

### 经典技术

- 创建几何图形(geometries)
- 添加灯光(lights)和阴影(shadows)
- 与 3D 对象交互(3D objects)
- 添加粒子(particles)

### 高级技术

- 使用 Blender 创建 3D 模型
- 添加物理
- 为大项目组织代码

### 着色器(Shaders)

发挥 WebGL 的真正能力。

### 额外

- 添加后处理(post-processing)
- 优化性能
- 混合 WebGL 与 HTML

### 传送门场景

使用 Blender 创建传送门场景

### React Three Fiber

如何在 React 应用程序中使用 Three.js。
大量的技术和大量的实践创建一个具有物理、真实游戏机制、UI 和酷炫效果的游戏。

## 二、WebGL 与 Three.js

Three.js 是一个 3DJavaScript 库，它使开发人员能够为 Web 创建 3D 体验。它与 WebGL 一起工作，但你可以让它与 SVG 和 CSS 一起工作。

### 什么是 WebGL？

- JavaScript API
- 以惊人的速度渲染三角形
- 结果可以在一个<canvas>中绘制
- 兼容大多数现代浏览器
- 使用图形处理单元(GPU, Graphic Processing Unit)

CPU 计算速度非常快，但一个接一个的计算。GPU 速度稍慢，但可以进行数千次并行计算。

绘制一个三维模型，其原理是在合适的位置绘制许多三角形，并将它们涂上颜色，使它们看起来像我们想要的。

一旦点被放置，GPU 将绘制这些三角形的每个可见像素同样，这数千个像素将以极快的速度并行计算和绘制。

### 为什么使用 Three.js？

- JavaScript 库
- MIT 许可证
- 基于 WebGL

Three.js 是最流行的 WebGL 库，它非常稳定，它提供了许多功能，文档也可圈可点(remarkable)，社区正在努力更新，它仍然足够接近原生 WebGL。

## 三、基础场景(Basic Scene)

- 让 Three.js 以最简单的方式工作
- 无 bundler、无模块、无依赖
- 一个 JavaScript 和一个 HTML 文件

### 场景(scene)

它是一个容器，可以放置对象、模型，灯光等。

### 对象(objects)

- 原始几何图形(primitive geometries)
- 模型(models)
- 粒子(particles)
- 灯光(lights)

我们将创建一个网格(mesh)，结合图形与材料创建一个红色立方体。

### 几何(geometry)

实例化 `BoxGeometry`

### 材料(material)

实例化 `MeshBasicMaterial`

### 网格(mesh)

使用几何与材料实例化网格。

### 相机(camera)

- 不可见
- 作为渲染时的视点
- 可以有多个并在它们之间切换。
- 不同类型

我们将使用透视照相机 `PerspectiveCamera`

### 渲染(renderer)

- 从摄像机的角度渲染场景
- 将结果绘制到画布中
- canvas 是一个 HTML 元素，你可以在其中绘制一些东西。
- Three.js 将使用 WebGL 在画布中绘制渲染。
- 您可以创建它或你可以让 Three.js 来做。

## 四、本地服务(Local Server)

直接引入 `three.js` 的方式有两个问题，第一个是只能访问核心类`THREE`，第二个问题是打开 HTML 文件时，您的浏览器不会让 JavaScript 执行任何有关安全问题的指令，将无法加载本地文件，如纹理或模型。

但我们希望运行 JavaScript 代码，所以需要一个本地服务器

### 构建工具

有许多构建工具可以用例如 `Webpack`、`Vite`、`Gulp`、`Parcel` 等各有利弊(with pros and cons)。

最流行工具是 `Webpack` ，它被广泛使用，具有庞大的社区，可以用它做很多事情。

最受赞赏的构建工具是 `Vite`，具有如下优势：

- 安装速度更快
- 运行速度更快
- 不容易出现错误
- 更好的开发者体验

## 五、转换对象(Transform objects)

转换对象有如下四个属性:

- `position`
- `scale`
- `rotation`
- `quaternion`

继承自`Object3D`的所有类都具有诸如`PerspectiveCamera`或`Mesh`的属性。

### Scale

### Rotate Objects

使用`rotation` 或 `quaternion`。

使用圆周率`Math.PI` 可做半周旋转。

> 注意，当你在一个轴上旋转时，你可能也会旋转另一个轴默认情况下，旋转按照 x、y 和 z 顺序进行，你会得到奇怪的结果，比如轴不再工作了。这叫做万向节锁(gimbal lock)

### Scene Graph

## 六、动画(Animations)

Three.js 动画就像是做定格动画(stop motion)

- 移动物体
- 拍照
- 再移动物体
- 再拍照
  ...

大多数屏幕以 60 顿每秒(FPS)运行，但并非总是如此。无论速率如何，动画必须看起来相同。

### Request Animation Frame

`requestAnimationFrame`的目的是调用下一帧提供的函数。我们将在每个新帧上调用相同的函数。

控制每帧动画

```js
// 时间
let time = Date.now();

// 动画
const tick = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  mesh.rotation.y += 0.001 * deltaTime;

  // 渲染
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

### Clock

使用内置`Clock`解决帧率问题。

```js
// 时钟
const clock = new THREE.Clock();

// 动画
const tick = () => {
  // 时钟
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime;

  // 渲染
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
```

### 使用动画库

如果想有更多的控制，创建补间，创建时间线，等等。您可以使用像 GSAP 这样的动画库。

安装类库

```bash
npm install --save gsap@3.5.1
```

## 七、相机(Cameras)

### Camera

`Camera` 是一个抽象类，无法直接使用

### 阵列摄像机(Array Camera)

`ArrayCamera`在渲染的特定区域从多个摄像机渲染场景

### 立体摄像机(Stereo Camera)

立体摄像机通过两台摄像机模拟眼睛来渲染场景，以创建视差效果。与 VR 头显、红蓝眼镜或纸板等设备配合使用。

### 立方摄像机(Cube Camera)

`CubeCamera` 做六个渲染，每个都面向不同的方向可以为环境贴图反射贴图或阴影贴图等渲染周围环境。

### 自动摄像机(Orthographic Camera)

`OrthographicCamera` 无透视渲染场景。

自动摄像机与透视摄像机的不同在于透视(perspective)，这意味着无论到相机的距离如何，对象都具有相同的大小。

参数分别为 `left`、`right`、`top`、`bottom`、`near`、`far`。

```js
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
```

这会导致立方体看起来被压缩了(flat)，这是因为我们将一个正方形区域染成一个矩形画布我们需要使用画布比例(宽高比)。

```js
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
);
```

### 透视摄像机(Perspective Camera)

`PerspectiveCamera` 使用透视渲染场景。

#### 视野(Field of view)

透视摄像机的第一个参数为视野。

- 垂直视角(vertical vision angle)
- 以度(in degrees)
- `fov`

#### 纵横比(Aspect Ratio)

透视摄像机的第二个参数是纵横比，渲染的宽度除以渲染的高度。

#### 近与远(near and far)

透视摄像机的第三个和第四个参数称为近(near)和远(far)，分别对应摄像机能看多近和多远。

任何比近或比远的物体或物体的一部分都不会显示出来。

不要使用像 0 这样的极值，使用 `0.0001` 和 `9999999` 来预防 `z-fighting`(深度冲突亦称闪烁)。

### Control

#### 设备方向控制(Device Orientation Controls)

如果设备、操作系统和浏览器允许，则`DeviceOrientationControls`将自动检索设备方向并相应地旋转摄像机，它可用于创建沉浸式宇宙或 VR 体验。

#### 飞行控制(Fly Controls)

`FlyControls` 可以让你像在宇由飞船上一样移动摄像机你可以在所有 3 个轴上旋转，前进和后退。

#### 第一人称控制(First Person Controls)

`FirstPersonControls` 类似于 `FlyControls`，但是有一个固定的上轴。不像在 FPS 游戏中那样工作。

#### 指针锁定控制(Pointer Lock Controls)

`PointerLockControls` 使用 `pointer lock JavaScript API ` 难以使用几乎只处理指针锁定和相机旋转。

#### 轨道控制(Orbit Controls)

`OrbitControls` 类似于我们所做的具有更多特性的控件。

增加阻尼控制(damping)

```js
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
```

需要在每帧加入更新

```js
controls.update();
```

#### 轨迹球控制(Trackball Controls)

`TrackballControls` 类似于没有垂直角度限制的 `OrbitControls`

## 八、全屏与调整大小(Fullscreen and resizing)

### 处理像素比

有些人可能会在边缘看到模糊的渲染和阶梯效果如果是这样的话那是因为你是在像素比大于 1 的屏幕上测试。

### 全屏

```js
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
```

## 九、几何(Geometries)

- 由顶点(三维空间中的点坐标)和面(连接这些顶点以创建表面的三角形)组成。
- 可用于网格，也可用于粒子。
- 可以存储比位置更多的数据(UV 坐标，法线，颜色或任何我们想要的)。

### 内置几何

所有的几何体都继承自 `BufferGeometry`，这个类有许多内置方法例如 `translate()`、`rotate()`、`normalize()` 等。

- `BoxGeometry` - 长方体几何。
- `PlaneGeometry` - 平面几何。
- `CircleGeometry` - 圆形几何。
- `ConeGeometry` - 圆锥体几何。
- `CylinderGeometry` - 圆柱体几何。
- `RingGeometry` - 环形几何。
- `TorusGeometry` - 圆环几何。
- `TorusKnotGeometry` - 圆环结几何。
- `DodecahedronGeometry` - 十二面体几何。
- `OctahedronGeometry` - 八面体几何。
- `TetrahedronGeometry` - 四面体几何。
- `IcosahedronGeometry` - 二十面体几何。
- `SphereGeometry` - 球体几何。
- `ShapeGeometry` - 二维几何。
- `TubeGeometry` - 管状几何。
- `ExtrudeGeometry` - 拉伸几何。
- `LatheGeometry` - 扫描几何。
- `TextGeometry` - 三维文本。

###

在创建几何体之前，我们需要了解如何存储缓冲区几何体数据。

- 使用 `Float32Array` 存储。
- 只能存储浮点数。
- 固定长度。

## 十、调试 UI(Debug UI)

我们需要能够轻松地调整和调试它关系到开发者、设计者甚至客户这将有助于找到完美的颜色，速度，数量等。

我们可以创建或使用如下库来支持调试 UI。

- lil.GUI
- control-panel
- ControlKit
- Guify
- Oui

### lil.GUI

安装 `lil.gui`

```bash
npm install --save lil-gui
```

我们可以在面板中添加如下元素:

- `Range` - 对于具有最大值和最小值的数字。
- `Color` - 用于各种格式的颜色。
- `Text` - 对于简单的文本。
- `Checkbox` - 对于布尔值(true 或 false)。
- `Select` - 对于从一个值列表中选择。
- `Button` - 用于触发函数。
- `Folder` - 如果您有太多的元素，组织您的面板。

## 十一、纹理(Textures)

### 什么是纹理？

纹理是覆盖几何图形表面的图像许多类型具有许多不同的效果。

颜色(或反照率 Albedo)

- 应用于几何图形

Alpha

- 灰度图像
- 白色可见
- 黑色不可见

高度(或位移 Displacement)

- 灰度图像
- 移动顶点以创建一些浮雕
- 需要足够的细分

Normal(法线)

- 添加详细信息
- 不需要细分
- 顶点不会移动
- 把光线引到脸的方向
- 比添加大量细分的高度纹理更好的性能

环境遮挡(Ambient Occlusion)

- 灰度图像
- 在缝隙中添加伪阴影
- 物理上不准确
- 有助于创建对比度和查看细节

金属性(Metalness)

- 灰度图像
- 白色是金属色
- 黑色是非金属的
- 主要是为了反射

粗糙度(Roughness)

- 灰度图像
- 与金属性
- 白色是粗糙的
- 黑色光滑
- 主要是为了消光(dissipation)

### PBR 原则

这些纹理(特别是金属度和粗糙度)遵循 PBR 原则

- 基于物理的渲染
- 许多技术倾向于遵循现实生活中的方向来获得逼真的效果
- 成为逼真渲染的标准
- 许多软件、引擎和库都在使用

### 加载纹理

使用 `TextureLoader` 来加载纹理。

### 加载管理器

我们可以使用`LoadingManager`来使事件互化如果我们想知道全局加载进度，或者在加载所有内容时得到通知，那么它是很有用的。

### UV 展开(Unwrapping)

纹理以不同的方式被拉伸或挤压以覆盖几何体，这就是所谓的 UV 展开这就像打开折纸或糖果包装，使其变平，每个顶点在平面上都有一个二维坐标(通常是正方形)。

### 转换纹理(Transforming the texture)

- repeat
- offset

### 过滤和 MIP 映射(Filtering and Mipmapping)

#### 缩小过滤器(Minification Filter)

当纹理像素小于渲染像素时发生，换句话说，纹理太大的表面。

使用 `minFilter` 属性来改变纹理的缩小过滤器。

- `THREE.NearestFilter` - 具有更好的性能和更好的帧率。
- `THREE.LinearFilter`
- `THREE.NearestMipmapNearestFilter`
- `THREE.NearestMipmapLinearFilter`
- `THREE.LinearMipmapNearestFilter`
- `THREE.LinearMipmapLinearFilter`

#### 放大过滤器(Magnification Filter)

当纹理像素大于渲染像素时发生，换句话说，它覆盖的表面纹理太小。

使用 `magFilter` 属性来改变纹理的放大过滤器。

如果在`minFilter`上使用了`THREE.NearestFilter`，我们不需要 mip 映射，我们可以禁止 mipmaps 生成。

```js
colorTexture.generateMipmaps = false;
```

### 纹理格式和优化(Texture format and Optimisation)

- weight - 纹理文件的重量。
  - `.jpg` - 有损压缩，但通常更轻。
  - `.png` - 无损压缩，但通常较重。
- size - 纹理图像的大小
- data - 数据
  - 纹理支持透明度但在`.jpg`中我们不能有透明度，如果我们只想有一个结合颜色和 alpha 的纹理，我们最好使用`.png`文件。

### 在哪里找到纹理？

- [poliigon.com](https://poliigon.com)
- [3dtextures.me](https://3dtextures.me)
- [arroway-textures.ch](https://arroway-textures.ch)

## 十二、材质(Materials)

材质用于在几何图形的每个可见像素上添加颜色。我们不需要编写着色器，我们可以使用内置的材料。

### Mesh Basic Material

#### alphaMap

`alphaMap` 使用纹理控制透明度

#### side

`side` 可让您决定面的哪一侧是可见的。

- THREE.FrontSide
- THREE.BackSide
- THREE.DoubleSide

### Mesh Normal Material

法线是包含面外侧方向的信息

### Mesh Matcap Material

`MeshMatcapMaterial` 将通过使用法线作为参考来显示颜色，以在看起来像球体的纹理上选择正确的颜色。

寻找更多 [matcaps](https://github.com/nidorx/matcaps)

### Mesh Depth Material

MeshDepthMaterial 将简单地将几何图形涂成白色，如果它靠近 `near` ，则用黑色表示，如果它接近摄像机的`far`。

### Mesh Lambert Material

`MeshLambertMaterial` 具有与光相关的新特性。

### Mesh Phong Material

我们可以用 `shininess` 来控制光的反射，用 `specular` 来控制反射的颜色。

### Mesh Toon Material

`MeshToonMaterial` 与 `MeshLambertMaterial` 类似 但是卡通化的。

### Mesh Standard Material

`MeshStandardMaterial` 使用基于物理的渲染原则 (PBR)，像 `MeshLambertMaterial` 和 `MeshPhongMaterial` 一样，它支持光线，但有更真实的算法和更好的参数，如粗糙度和金属性。

aoMap(ambient occlusion map “环境光遮蔽贴图”) 会在纹理暗的地方添加阴影。我们必须添加第二组 UV，命名为 `uv2`。

`displacementMap` 将移动顶点以创建浮雕。

`normalMap` 会伪造法线方向，并在曲面上添加细节，不管细分是什么。

最后，我们可以使用`alphaMap`属性来控制 alpha 值，但别忘记加上 `transparent = true`

### Mesh Physical Material

`MeshPhysicalMaterial` 与 `MeshStandardMaterial` 相同，但具有闪烁涂层效果的支持。

### Points Material

### Shader Material 和 Raw Shader Material

`ShaderMaterial` 和 `RawShaderMaterial` 都可以用来创建您自己的材质。

### 环境图(Environment Map)

环境贴图是场景周围的图像，它可用于反射或折射，也可用于一般照明环境贴图支持多种材质，但我们将使用`MeshStandardMaterial`。

网站 [HDRIHaven](https://hdrihaven.com) 包含数百个令人敬畏的 HDRIs (High Dynamic Range Imaging, 高动态范围成像)不是立方体图。

将 HDRIs 转换为 Cube maps 可使用在线工具 [HDRI-to-CubeMap](https://matheowis.github.io/HDRI-to-CubeMap/)

### 添加调试 UI

```bash
npm install --save lil-gui
```

## 十三、3D 文本(Text)

我们将使用 `TextBufferGeometry` 类，但我们需要一种特殊的字体格式，称为 `typeface`。

### 如何得到 typeface 字体？

我们可以使用在线字体转换工具 [facetype.js](https://gero3.github.io/facetype.js)

我们也可以使用 Three.js 提供的字体 `/node_modules/three/examples/fonts/`

### 字体加载器

使用 `FontLoader` 来加载字体。

```js
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
```

### 文本图形

使用 `TextGeometry` 来创建文本图形

```js
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
```

### 居中文本

默认情况下，Three.js 使用球形边界。计算盒子边界使用 `computeBoundingBox()`。

```js
textGeometry.computeBoundingBox();
```

使用 `translate()` 方法改变位置。

```js
textGeometry.translate(
  -(textGeometry.boundingBox.max.x - bevelSize) * 0.5,
  -(textGeometry.boundingBox.max.y - bevelSize) * 0.5,
  -(textGeometry.boundingBox.max.z - bevelThickness) * 0.5
);
```

亦可以使用 `center()` 方法直接将文本进行居中。

```js
textGeometry.center();
```

## 十四、上线(Go live)

### 传统构建方式

"传统"托管解决方案，如 OVH、1and1 或 Gandhi，您必须使用 FTP 客户端手动上传文件。

#### 构建项目

- 运行 `npm run build` 命令构建项目。
- 上传 `/dist/` 文件夹下的所有文件。

### Netlify

- 持续集成(Continuous Integration), 自动测试、自动部署等。
- 开发者友好
- 易于设置

## 十五、灯光(Lights)

添加光源与添加网格一样简单我们用正确的类实例化，并将其添加到场景中。

### 环境光源(Ambient Light)

第一个参数是颜色(color)，第二个参数是强度(intensity)。

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

### 定向光源(Directional Light)

第一个参数是颜色(color)，第二个参数是强度(intensity)。

```js
const directionalLight = new THREE.DirectionalLight(0x00ffcc, 0.3);
scene.add(directionalLight);
```

修改光源方向。

第一个参数是 x 轴，第二个参数是 y 轴，第三个参数是 z 轴。

```js
directionalLight.position.set(1, 0.25, 0);
```

### 半球光源(Hemisphere Light)

半球光类似于环境光，但从天空发出的颜色与从地面发出的颜色不同。

第一个参数是 天空颜色(skyColor)，第二个参数是 地面颜色(groundColor)，第三个参数是 强度(intensity)。

```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
```

### 点光源(Point Light)

第一个参数是颜色(color)，第二个参数是强度(intensity)。

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5);
scene.add(pointLight);
```

移动光源位置。

```js
pointLight.position.set(1, -0.5, 1);
```

默认情况下，光线强度不会减弱，我们可以控制褪色的距离，以及它随着距离和衰减而褪色的速度。

第三个参数是 距离(distance)，第四个参数是 衰退(decay)。

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
```

### 矩形区域光源(Rect Area Light)

RectAreaLight 的工作原理就像你在拍摄组中看到的大矩形灯一样。它是定向光和漫射光的混合物。

第一个参数是颜色(color)，第二个参数是强度(intensity)，第三个参数是宽度(Width)，第四个参数是高度(Height)。

```js
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
scene.add(rectAreaLight);
```

修改光源位置。

```js
rectAreaLight.position.set(-1.5, 0, 1.5);
```

使用查看方法

```js
rectAreaLight.lookAt(new THREE.Vector3());
```

> RectAreaLight 只能在 `MeshStandardMaterial` 和 `MeshPhysicalMaterial` 中工作。

### 聚光灯(Spot Light)

`SpotLight` 就像手电筒，它是一个光锥，从一个点开始指向一个方向。

第一个参数是 颜色(color)，第二个参数是强度(intensity)，第三个参数是距离(distance)，第四个参数是 角度(angle)，第五个参数是 半影(penumbra)，第六个参数是 衰退(decay)。

```js
const spotLight = new THREE.SpotLight(
  0x78ff00,
  0.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
scene.add(spotLight);
```

移动光源位置。

```js
spotLight.position.set(0, 2, 3);
```

旋转光源。

```js
spotLight.target.position.x = -0.75;
```

### 性能(Performance)

#### 最小成本(Minimal Cost)

- Ambient Light
- Hemisphere Light

#### 适中成本 (Moderate Cost)

- Directional Light
- Point Light

#### 昂贵成本 (High Cost)

- RectAreaLight
- SpotLight

### 烘培(Baking)

光源成本比较高，当需要大量的灯光和光线时，可以使用烘培。
我们的想法是把光线烤进纹理里，这可以在一个 3D 软件中完成，缺点是我们不能再移动光了我们必须加载巨大的纹理。

### Helper

为了帮助我们定位灯光，我们可以使用 Helper。

- `HemisphereLightHelper`
- `DirectionalLightHelper`
- `PointLightHelper`
- `RectAreaLightHelper`
- `SpotLightHelper`

## 十六、阴影(Shadows)

阴影一直是实时 3D 渲染的一个挑战，开发人员必须找到技巧，以合理的帧速率显示真实的阴影。

three.js 有一个内置的解决方案，它并不完美但很方便。

### 阴影是如何工作的？

- 当你做一个渲染时，Three.js 会为每一个支持阴影的光做一个渲染。
- 这些渲染将模拟光线看到的东西，就像它是一个摄像机一样。
- 在这些灯光渲染过程中，`MeshDepthMaterial` 将替换所有的网格材质。
- 灯光渲染被存储为纹理，我们称之为阴影贴图(Shadow maps)。
- 然后，它们被用于每个应该接收阴影的材料，并投影到几何体上。

### 添加阴影

启用阴影渲染

```js
renderer.shadowMap.enabled = true;
```

遍历每个对象，并决定它是否可以使用 `castShadow` 投射阴影，是否可以使用 `receiveshadow` 接收阴影。

```js
sphere.castShadow = true;
plane.receiveShadow = true;
```

只有以下类型的灯光支持阴影。

- PointLight
- DirectionalLight
- SpotLight

```js
directionalLight.castShadow = true;
```

### 阴影贴图优化

#### 渲染大小

默认情况下，阴影贴图大小为 `512x512` 我们可以改进它，但对 mipmapping 保持 2 的幂。

```js
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
```

#### 近与远(Near and Far)

```js
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
```

为了帮助我们进行调试，我们可以使用 `CameraHelper` 和位于 `directionalLight.shadow.camera` 中用于阴影贴图的相机。

```js
const directionalLightCamerHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightCamerHelper);
```

#### 振幅(Amplitude)

我们可以控制摄像机在每一面的距离，分别用上、右、下和左。

```js
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
```

值越小，阴影越精确。如果太小，阴影将被裁剪。

我们可以隐藏 `camera helper`

```js
directionalLightCamerHelper.visible = false;
```

#### 模糊(blur)

```js
directionalLight.shadow.radius = 10;
```

#### 阴影贴图算法(Shadow map Algorithm)

不同类型的算法可应用于阴影贴图。

- `THREE.BasicShadowMap` - 性能很好但质量很差。
- `THREE.PCFShadowMap` - 性能较低但边缘更平滑(默认)。
- `THREE.PCFSoftShadowMap` - 性能更差但边缘更柔和。
- `THREE.VSMShadowMap` - 更少的性能，更多的约束，可以有意想不到的结果。

```js
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

> 启用 `THREE.PCFSoftShadowMap` 时模糊将会失效。

### 聚光灯(SpotLight)

修改阴影贴图大小。

```js
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
```

因为我们使用的是 SpotLight，Three.js 使用的是透视摄像头我们必须改变 `fov` 特性来适应振幅。

```js
spotLight.shadow.camera.fov = 30;
```

### 点光源(PointLight)

修改贴图大小

```js
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
```

修改远近

```js
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
```

### 烘焙阴影(Baking Shadows)

停用渲染器中的所有阴影。

```js
renderer.shadowMap.enabled = false;
```

### 烘焙阴影替代方案(Baking Shadows Alternative)

自定义阴影

```js
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);
```

## 十七、鬼屋(Haunted House)

## 十八、粒子(Particles)

粒子可以用来制造恒星、烟雾、雨、尘埃、火焰等。
你可以用一个合理的帧速率拥有数千个粒子每个粒子由一个平面(两个三角形)组成，总是面对着摄像机。

创建粒子就像创建网格

- 几何图形(`BufferGeometry`)
- 材料(`PointsMaterial`)
- `Points` 实例 (而不是网格)

### 实例化 SphereGeometry

几何图形的每个顶点都将成为一个粒子。

### 实例化 PointsMaterial

更改 `size` 属性以控制所有粒子的大小，并将 `sizeAttenuation` 更改为“指定远处粒子是否应小于关闭粒子。

### 自定义 Geometry

创建一个 `BufferGeometry` 并添加一个 `position` 属性，而不是`SphereGeometry`。

### 颜色、贴图和法线贴图

### 使用 Alpha Test

alphaTest 是一个介于 0 和 1 之间的值，它使 WebGL 能够知道何时不根据像素的透明度来渲染像素，默认情况下，该值为 0，表示无论如何都会呈现像素。

```js
particlesMaterial.alphaTest = 0.001;
```

### 使用 Depth Test

在绘制时，WebGL 会测试正在绘制的内容是否比已经绘制的内容更接近。

这称为深度测试，可以用 alphaTest 停用。

如果场景中有其他对象或粒子具有不同的颜色，停用深度测试可能会产生错误，在场景中添加一个多维数据集，可以看到。

### 使用 Depth Write

所绘制的深度存储在我们称之为深度缓冲区的，我们可以用 depthTest 命令告诉 WebGL 不要将粒子写入深度缓冲区，而不是不测试粒子是否比深度缓冲区中的粒子更近。

### 使用 Blending

WebGL 当前将像素一个一个地画在另一个之上通过混合属性，我们可以告诉 WebGL 将像素的颜色添加到已经绘制的像素的颜色中将`Blending`属性更改为`THREE.AdditiveBlending`

### 不同颜色

我们可以为每个粒子设置不同的颜色添加具有 3 个值 (红色、绿色和蓝色) 的颜色属性。

### 动画

类继承自 object3D，因此我们可以移动、旋转和缩放，在 tick 函数中旋转粒子。

### 使用自定义着色器(Shader)

动画粒子的最好方法是创建我们自己的着色器。

## 十九、银河生成器(Galaxy Generator)

### Geometry

### Material

### Points

### Tweaks

### 创建漩涡星系(Spirals)

- Radius
- Branches
- Spin
- Randomness
- Randomness Power
- Colors

## 二十、基于滚动的动画(Scroll Based Animation)

- 了解如何使用 Three.js 作为经典 HTML 页面的背景。
- 使相机平移以跟随滚动。
- 发现一些技巧，使其更具沉浸感基于光标位置添加视差动画。
- 当到达相应的部分时触发一些动画。

### HTML 滚动

### 固定弹性滚动(Elastic Scroll)

您可能会注意到，如果您滚动得太远，当页面超过限制时，您会得到一种弹性动画，这是一个很酷的功能，但页面的背面是白色的，不符合我们的经验。

### 永远旋转(Permanent Rotation)

添加旋转动画

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // meshes 动画
  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.1;
    mesh.rotation.y = elapsedTime * 0.12;
  }
};
```

### 添加滚动动画

获取当前滚动的位置

```js
let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});
```

调整相机位置

```js
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // 相机动画
  // 当向下滚动时，ScrollY是正的，但相机应该在y轴上向下滚动。
  camera.position.y = -scrollY;
};
```

`scrollY` 包含已滚动的像素数量，如果我们滚动 1000 像素，相机将下降 1000 个单位的场景。

### 视差(Parallax)

视差是通过不同的观察点看到一个物体的动作，这是我们的眼睛自然完成的这就是我们如何感受事物的深度。

### 触发旋转(Triggered Rotations)

安装 gsap

```bash
npm install gsap@3.5.1
```

## 二十一、物理(Physics)

- 我们创造了一个物理世界
- 我们创建一个 Three.js 3D 世界
- 当我们在 Three.js 世界中添加一个对象时，我们也在物理世界中添加一个
- 在每一帧中，我们让物理世界更新自己，并相应地更新 Three.js 世界

3D 物理库

- Ammo.js
- Cannon.js
- Oimo.js

2D 物理库

- Matter.js
- P2.js
- Planck.js
- Box2D.js

### 安装 cannon

```bash
npm install --save cannon
```

### 施加力(Apply Forces)

我们可以用来对物体施加压力有以下四种方法。

- `applyForce` - 应用来自空间特定点的力 (不一定在物体表面)比如风，多米诺骨牌上的一个小推力，或者愤怒的小鸟上的一个强大的力。
- `applyImpulse` - 像 `applyForce` 但不是增加力而是增加速度
- `applyLocalForce` - 与 `applyForce` 相同，但坐标是`Body`的局部坐标 (0，0，0 是`Body`的中心)
- `applyLocalImpulse` - 与 applylmpulse 相同，但坐标是`Body`的本地坐标。

### 性能(Performance)

- BroadPhase - 碰撞检测

我们称这一步为宽相位，我们可以使用不同的宽相位来获得更好的性能。

- `NaiveBroadphase` - 测试每一个`Bodies`对抗其他`Bodies`。
- `GridBroadphase` - quadrilles，只测试同一网格盒或相邻网格盒中的其他`Bodies`
- `SAPBroadphase` (扫掠和修剪, Sweep And Prune) - 在多次步骤中测试任意轴上的物体。

> 默认的宽相位是`NaiveBroadphase`，建议切换到`SAPBroadphase`，使用它最终会产生错误，如果`Bodies`移动非常快。

### 约束(Constraint)

约束启用两个主体之间的约束。

- `HingeConstraint` - 像一个门较链。
- `DistanceConstraint` - 迫使物体彼此之间保持一定距离。
- `LockConstraint` - 合并`Bodies`就像是一个整体。
- `PointToPointConstraint` - 将主体粘贴到特定点。

### Workers

做物理的计算机部件是 CPU 目前，所有事情都是由 CPU 中的同一个线程完成的，该线程可能会很快过载，解决的办法是使用`Workers`

### 更新 Cannon.js 为 Cannon-es

```bash
npm uninstall --save cannon
npm install --save cannon-es
```

## 二十二、导入模型(Imported models)

### 格式(Formats)

多种 3D 模型格式，每种格式对应一个问题

- 数据
- 重量
- 压缩
- 兼容性
- 版权

不同标准

- 专用于一个软件
- 非常轻，但可能缺乏具体的数据·几乎所有的数据，但都是沉重的
- 开放源代码
- 不开放源代码
- 二进制的
- ASCII

流行的格式

- OBJ
- FBX
- STL
- PLY
- COLLADA
- 3DS
- GLTF

GLTF 这种格式正在成为一种标准格式，应该可以满足我们的大部分需求。

- GL Transmission Format
- 由 Khronos 集团 (OpenGL,WebGL,Vulkan,Collada 和许多成员，如 AMD / ATI, 英伟达，苹果，id Software,Google，任天堂等)
- 支持不同的数据集，如几何，材质，摄像机，灯光，场景图，动画，骨架，变形等。
- 各种格式，如 json，二进制，嵌入纹理(embed textures)。
- 成为实时和大多数 3D 软件、游戏引擎和库支持的标准。

### 找一个模型

GLTF 团队提供各种模型进行测试
https://github.com/KhronosGroup/glTF-Sample-Models

### GLTF 格式

GLTF 文件可以有不同的格式
打开 `/static/models/Duck/` 查找 4 种主要格式

- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

- 默认格式
- 多个文件
- `Duck.gltf` 是一个 JSON，包含相机，灯光，场景，材质，对象转换，但没有几何和纹理。
- `Duck0.bin` 是一个二进制文件，通常包含几何数据 (顶点位置，UV 坐标，法线，颜色等)。
- `DuckCM.png` 是纹理。

我们加载 `Duck.gltf` 文件，其他文件应该会自动加载。

#### GLTF 二进制

- 只有一个文件
- 包含了我们讨论过的所有数据
- 二进制的
- 通常较轻
- 因为只有一个文件更容易加载，
- 很难更改数据

#### GLTF Draco

- 与 glTF 默认格式类似，但使用 Draco 算法压缩缓冲区数据
- 轻得多

#### GLTF Embedded

- 一个像 glTF-Binary 格式的文件
- JSON
- 沉重的

#### 如何选择呢？

问题是你想怎么处理这些资产如果你想改变文件，你最好使用 glTF 默认值加载多个文件可以更快如果有一个文件对你更好，你最好去使用 glTF-Binary

无论如何，您必须决定是否要使用 Draco 压缩

### 在 Three.js 中加载模型

我们需要使用 GLTFLoader 我们需要从示例中导入

```js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
```

使用`load(...)`的方法

- 文件的路径
- 成功回调函数
- 进度回调函数
- 错误回调函数

- `Mesh`应该是我们的鸭子
- 我们不需要`PerspectiveCamera`
- 摄像机和鸭子在`Object3D`中
- `Object3D`的比例设置为一个小值

我们有多种方法将鸭子添加到场景中

- 在我们的场景中添加整个`scene`。
- 将`scene`中的`children`添加到我们的场景中，而忽略透视相机。
- 在添加到场景之前过滤子元素。
- 只添加`Mesh`，最终得到一只比例、位置和旋转错误的鸭子。
- 在 3D 软件中打开文件，清理后再导出

将 Object3D 添加到场景中，忽略未使用的 PerspectiveCamera

```js
gltfLoader.load("/models/Duck/glTF/Duck.gltf", (gltf) => {
  scene.add(gltf.scene.children[0]);
});
```

- Draco 版本可以比默认版本轻得多
- 压缩应用于缓冲区数据(通常是几何图形)
- 德拉科不是 glTF 的专属但与此同时，它们也开始流行起来，而且在 glTF 出口商中实施得更快。
- Google 在开放源码 apache 许可下开发了 algorithm 算法。

### 动画

加载的 gltf 对象包含由多个`Animationclip`组成的 animations 属性

我们需要创建一个动画混合器 `AnimationMixer` 就像与一个对象关联的播放器，该对象可以包含一个或多个 `Animationclips`

### Three.js Editor

https://threejs.org/editor/

- 就像一个小小的在线 3D 软件
- 测试模型的好方法
- 仅适用于由一个文件组成的模型

## 二十三、光线投射与鼠标事件(Raycaster and Mouse Events)

### Raycaster

光线施法者可以将光线投射到特定的方向，并测试与之相交的物体

用法示例

- 检测播放器前面是否有一堵墙
- 测试激光枪是否击中了什么东西
- 测试鼠标下面是否有东西，以模拟鼠标事件
- 显示一个警告信息，如果宇宙飞船正驶向一个星球

每一项都包含有用的信息

- `distince`-射线的原点和碰撞点之间的距离
- `face` -射线击中几何体的哪一面
- `faceIndex` - 面部索引
- `Object` - 碰撞所涉及的对象
- `point` - 碰撞的确切位置的`Vector3`
- `uv` - 几何学中的 UV 坐标

#### 测试每一帧

如果我们想在物体移动时对其进行测试，我们必须在每一帧上进行测试
我们将激活球体，当光线与它们相交时将它们变成蓝色。

## 二十四、使用 Blender 自定义模型

### 建模软件选型

- Cinema 4D
- Maya
- 3DS Max
- Blender
- ZBrush
- Marmoset Toolbag
- Substance Painter

> 需要考虑用户体验(UX)、性能、特性、兼容性(Compatibility)和价格等。

我们将使用 Blender。

- 免费。
- 很好的性能。
- 轻量级。
- 适用于大多数操作系统。
- 很多功能。
- 广大社区。
- 易于使用。

### 下载 Blender

[Blender 官方下载地址](https://blender.org/download/)

### 界面(Interface)

#### Splash Screen

- Image
- Useful links
- Templates
- Recently opened files
- Version

#### 区域

- 3D 视图(3D Viewport)
- 时间线(Timeline)
- 概览(Outliner)
- 属性(Properties)

#### 快捷键

- [鼠标中键] 旋转
- [鼠标中键 + Shift] 移动
- [鼠标滚轮] 缩放
- [Ctrl + Shift + 鼠标中键] 缩放
- [Shift + `] 切换走路模式与飞行模式

轴(axes)

- [数字键 1] - 摄像机调至 Y 轴( + Ctrl 则调至反方向)。
- [数字键 3] - 摄像机调至 X 轴( + Ctrl 则调至反方向)。
- [数字键 7] - 摄像机调至 Z 轴( + Ctrl 则调至反方向)。

摄像机(camera)

- [数字键 0] - 获取摄像机视角(viewpoint)

重置

- [Shift + C] - 调整视角。

聚焦(focus)

将摄像机聚焦到一个物体上

- 点击鼠标左键选中物体。
- [数字键 .] - 聚焦到该物体上。
- [数字键 /] - 聚焦到该物体上，并隐藏其他所有内容。

选择(selecting)

- [鼠标左键] - 选择一个物体。
- [Shift + 鼠标左键] - 选择多个物体。
- [Ctrl + Z] - 撤销选择。
- [Shift + 鼠标左键] - 在选中状态下的物体上进行取消选中。
- [A] - 选中所有东西。
- [双击 A] - 撤销所有选中的东西。
- [B] - 选择矩形区域。
- [C] - 选择圆形区域（ + 滚轮 调整圆形区域大小）。

创建物体

- [Shift + A] - 在视口的指定位置按此快捷键弹出可创建物体的菜单。
- [F9] - 弹出物体的控制面板

删除物体

- [x] - 弹出删除菜单（需先选中物体）。

隐藏物体

- [H] - 隐藏物体（需先选中物体）。
- [Alt + H] - 显示所有隐藏物体。

- [Shift + H] - 隐藏未选中的物体。
- [Shift + Alt + H] - 显示所有未选中的隐藏的物体。

#### 转换物体

我们可以改变位置、旋转和比例。

可以使用左侧菜单来激活转换，或者可以使用快捷键。

- `G` - 改变位置。
- `R` - 改变旋转。
- `S` - 改变比例。

> 以上快捷键 + `X`、`Y`、`Z` 可在指定轴上做转换。

- [T] - 隐藏或显示左侧菜单。

#### 模式(Modes)

默认为 物体模式(Object Mode)，可以创建、删除对象等操作。

- [Ctrl + Tab] - 弹出模式菜单（需选中物体）。

编辑模式(Edit Mode)

类似于对象模式但是我们可以编辑顶点，边和面，要切换到边和面，可使用 3D 视口右上方的按钮，或按数字键 1、2、3 切换。

#### 着色(Shading)

Shading 是在 3D 视口中查看对象的方式，默认为 Solid，我们可以看到默认材质的物体，没有灯光支持(性能和方便)，使用 3D 视口右上角的按钮更改底纹，或按 z 键打开一个滚轮菜单。

- `Solid` - 默认每个对象都使用相同的材料
- `Material` - 类似于实体底纹，但具有材质预览
- `Wireframe` - 线框
- `Renderer` - 低质量渲染(逼真但性能较差)

#### 属性(Properties)

Properties 显示渲染属性、环境属性和活动对象属性 (根据活动对象的类型而有所不同)

- Modifier - 添加修饰符，非破坏性的修改，如细分，弯曲，增长，收缩等。
- Material Properties - 改变材质，打开 Blender 时，在第一个立方体上应用默认的一个名为 Material

#### 渲染引擎(Render Engines)

- EEVEE

  - 实时渲染引擎
  - 使用 GPU
  - 很好的性能
  - 写实(realism)、光线反射、反射和折射等局限性

- WorkBench

  - 传统(legacy)渲染引擎
  - 不常用
  - 性能
  - 不太写实(realistic)

- Cycles
  - 光线跟踪(Raytracing)引擎
  - 非常现实
  - 处理光反射、深度反射、深度折射等
  - 可能会非常长

> Eveee 是完美的，因为我们正在为实时渲染建模。

> 按 F12 通过相机渲染

#### 搜索(Search)

按 F3 打开“搜索”面板 (你可能需要添加 fn 键，具体取决于您的键盘和 0S)

如果您不知道快捷方式或按钮/菜单位置，则可用于查找功能

#### 保存启动文件

`File` -> `Default` -> `Save Startup file`

### 汉堡时间(HAMBURGER TIME)

以单位规模决定，搅拌机将一个单位视为一米

- 进入属性的 `Scene Properties` 选项卡
- 选择 `None` 作为 `Unit System`

#### Bottom Bun

## 二十五、真实渲染(Realistic Render)

### 添加环境图(Environment Map)

照明将由环境地图来处理
环境地图就像一张周围的照片，它可以是一张 360 度的照片，也可以是组成一个立方体的 6 张照片
我们将使用环境地图作为背景，并照亮我们的模型。

### 色调映射(Tone Mapping )

The tone 映射旨在将高动态范围 (HDR) 值转换为低动态范围(LDR)值
HDR 远不止下面的解释，但你可以看到，像图像的颜色值可以超过 1
我们的素材不是 HDR，但色调映射效果可以有一个逼真的结果，就像相机调整得不好一样。

- THREE.NoToneMapping (默认)
- THREE.LinearToneMapping
- THREE.ReinhardToneMapping
- THREE.CineonToneMapping
- THREE.ACESFilmicToneMapping

### 反走样(Antialiasing)

一个简单的解决方案是将染的分辨率提高到双倍，每个像素的颜色将自动从呈现的 4 个像素中平均。
这就是所谓的超级采样 super sampling(SSAA) 或全屏采样 fullscreen sampling (FSAA)，它是一种简单而高效的采样方式但性能较差。

另一个名为多重采样 multi sampling (MSAA) 的解决方案也将呈现每个像素的多个值 (通常为 0 就像超级采样一样，但只在几何边缘。
像素的值，然后取平均值，得到最终的像素值

### 阴影(Shadow)

我们可以调整光影的偏置和`normalBias`来修正它，倾斜通常有助于平坦的表面，这是我们的情况 normalBias 通常有助于圆形表面，增加它直到暗疮几乎看不出来。

## 二十六、大项目的代码结构(Code Structuring for Bigger Projects)

目前的代码量比较小，用注释来分割，具有以下缺点：

- 不适合大型项目
- 很难找到你想要的代码
- 难以重复使用特定部件
- 与其他变量的冲突
- 与其他开发人员的冲突

### 模块(Modules)

将我们的代码分离到多个文件中，并在需要的时候导入。

兼容性(compatibility)，大多数浏览器都只是模块导入。

### 类(Classes)

## 二十七、着色器(Shaders)

### 什么是 Shader？

- WebGL 的一个主要组成部分之一。
- 如果做原生 WebGL，必须先学习。
- 用`GLSL`编写的程序。
- 发送到 GPU
- 定位几何体的每个顶点。
- 将几何图形每个可见像素着色。

我们向着色器发送大量数据。

- 顶点坐标(Vertices coordinates)
- 网格变换(Mesh Transformation)
- 摄像机的相关信息
- 颜色(Colors)
- 纹理(Textures)
- 灯光(Lights)
- 灯雾(Fog)

#### 顶点着色器(Vertex Shader)

- `Vertex Shader` 在渲染中定位顶点。
- `fragment shader` 片段着色器将该几何体的每个可见片段 (或像素)着色。
- `fragment shader` 片段着色器在顶点着色器之后执行。
- 每个顶点之间变化的信息(比如它们的位置)被称为属性，只能在`vertex shader`中使用。
- 在顶点(或片段)之间不改变的信息被称为均匀(uniforms)，可以在`vertex shader`和`fragment shader`中使用。
- 我们可以将数据从`vertex shader`发送到`fragment shader`使用`varying`。
- 在顶点(vertices)之间插值变化(varyings)值。

### 为什么要编写我们自己的 Shaders？

- Three.js 材质有限制。
- 我们的着色器可以非常简单和高性能。
- 我们可以添加自定义后处理(post-processing)。

### 使用 RawShaderMaterial 创建第一个 Shader

我们可以使用 `ShaderMaterial` 和 `RawShaderMaterial` 两种方式创建自己的着色器。

- `ShaderMaterial` 将有一些代码自动添加到着色器代码中。
- `RawShaderMaterial` 将什么都没有。

简单引号内只能包含一行，我们可以使用`back quotes` 也被称为 `backtick`、`acute` 或左括号(模板文字)。

```js
const material = new THREE.RawShaderMaterial({
  vertexShader: ``,
  fragmentShader: ``,
});
```

创建一个简单的 Shader

```js
const material = new THREE.RawShaderMaterial({
  vertexShader: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;

    attribute vec3 position;

    void main()
    {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision mediump float;

    void main()
    {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `,
});
```

> 在 VSCode 中安装插件 `Shader languages support for VS Code` 以支持代码语法高亮。

> 在 VSCode 中安装插件 `WebGL GLSL Editor` 以支持代码格式化。

将 Shader 分离成多个文件将处理以下三种情况。

- 我们希望分离较大的 Shaders
- 我们希望重用 shader 代码块。
- 我们希望使用其他开发人员制作的外部着色器块。

安装 Vite 插件支持 glsl

```bash
npm install vite-plugin-glsl
```

### GLSL

着色器语言称为 GLSL (openGL Shading Language)
接近 C 语言

#### 日志(Logging)

glsl 中没有`console`所以无法打印日志。

#### 缩进(Indentation)

#### 分号(Semicolon)

分号很重要，不加分号将会报错

#### 变量

```glsl
flaot a = 1.0;
float b = 2.0;
float c = a / b;
float d = -1.123;
```

整型

```glsl
int foo = 123;
int bar  = -1;
int c = foo * bar;
```

类型转换

```glsl
float a = 1.0;
int b = 2;
int c = a * float(b);
```

布尔

```glsl
bool foo = true;
bool bar = false;
```

二维向量

```glsl
// vec2(x, y)
vec2 foo = vec2(1.0, 2.0);

foo.x = 1.1;
foo.y = 2.2;

foo *= 2.0;
```

三维向量

```glsl
vec3 foo = vec3(0.0);
vec3 bar = vec3(1.0, 2.0, 3.0);

bar.z = 4.0;
bar.y = 3.0;
bar.x = 2.0;

```

三维向量颜色

```glsl
vec3 purpoleColor = vec(0.0);
purpleColor.r = 0.5;
purpleColor.b = 1.0;
```

基于二维向量创建三维向量

```glsl
vec2 foo = vec2(1.0, 2.0);
vec3 bar = vec3(vec2, 3.0);
```

基于三维向量创建二维向量

```glsl
vec3 foo = vec3(1.0, 2.0, 3.0);
vec2 bar = foo.xy;
```

> 称为 Swizzle，顺序可以不同 `foo.xy`、`foo.yx`、`foo.xz`、`foo.yz`

四维向量

```glsl
// vec4(x, y, z, w)
// vec4(r, g, b, a)
vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);

float bar = foo.w;
```

#### 函数

```glsl
flaot addition()
{
  flaot a = 1.0;
  float b = 2.0;

  return a + b;
}

float result = addtion();
```

无返回值函数

```glsl
void addition()
{
  flaot a = 1.0;
  float b = 2.0;
}
```

带参数带返回值函数

```glsl
float addition (float a, float b)
{
  return a + b;
}
```

#### 原生函数(Native Function)

有许多内置函数例如 `sin`、`cos`、`min`、`pow`、`exp`、`mod`、`clamp` 等。

而且还有非常实用的功能，比如 `cross`、`dot`、`mix`、`step`、`smoothstep`、`length`、`distance`、`reflect`、`refract`、`normalize` 等。

#### 文档

没有初学者友好的文档

- `Shaderific` - 制作 shader 的 ios 应用程序文档。
- `Kronos Group registery` - OpenGL 文档但非常接近 WebGL。
- `Book of Shaders glossary` - 一个关于`fragment shader`的较好课程。

### 理解 Vetex Shader

#### 主函数

自动调用主函数，不返回任何值。

```glsl
void main()
{

}
```

#### gl_Position

- 已经存在且无需分配。
- 将包含顶点在屏幕上的位置。

`projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0)`，这个长指令将返回一个 vec4。

可以修改`gl_Position` 的 `x`、`y`的值。

```glsl
void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    gl_Position.x += 0.5;
    gl_Position.y += 0.5;
}
```

#### 位置属性(Position Attribute)

```glsl
attribute vec3 position;
```

- 为我们提供了位置属性
- 每个顶点之间的不同
- 包含属性的 x、y 和 z 坐标

#### Matrices Uniforms

每个矩阵将变换位置，直到我们得到最终的剪辑空间坐标。

- 三个矩阵
- 统一的，因为它们对所有顶点都是一样的。
- 每个矩阵都会做一部分转换。
- 为了应用一个矩阵，我们将它相乘。
- 矩阵必须具有与坐标相同的大小(vec4 的 mat4)。
- `modelMatrix` 应用相对于网格的变换 (position、rotation、scale)。
- `viewMatrix` 应用转换相对于相机(position、rotation、field of view、near、far)。
- `projectionMatrix` 将坐标转换为剪辑空间坐标。

我们还有一个更短的版本，是将`viewMatrix`和`modelMatrix`合并为一个`modelViewMatrix`。

### 理解 Fragment Shader

#### 主函数

和 `vertex shader` 一样也是自动调用不返回任何值。

```glsl
void main()
{

}
```

#### Precision

```glsl
precision mediump float;
```

决定浮点数的精度

- `highp` - 高精度可能会有性能下降，可能无法在某些设备上正常工作。
- `lowp` - 低精度会因为缺乏精度而产生 bug。
- `mediump` - 中精度在大多数设备上都能正常工作，所以通常使用`mediump`。

#### gl_FragColor

- 已存在且我们需要分配。
- 它将包含 fragment 的颜色。
- vec4(r, g, b, a)。

激活透明度需要将 `RawShaderMaterial` 中的 `transparent` 属性设置为 `true`。

#### 属性(Attributes)

#### Uniform

- 具有相同的着色器但具有不同的结果。
- 能够调整值。
- 设置值的动画效果。

#### 纹理(Texture)

#### ShaderMatrial

ShaderMaterial 是相同的，但在着色器代码中预先建立了`uniforms`、`attributes`和`precision`。

```glsl
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
attribute vec3 position;
attribute vec2 uv;
precision mediump float;
```

### 调试

## 二十八、着色器模式(Shader Patterns)

通常我们需要画一些特定的图案，比如星星、圆圈、光透镜、波等等。它可以是看到那些模式或移动顶点。

我们可以使用纹理，但绘制形状给我们更多的控制我们只有坐标和数学技能。

我们将画许多图案，从非常简单的渐变到非常复杂的柏林构图(perlin compositions)

### 发送 UV 坐标到片段(Send The UV Coordinates to the Fragment)

### Pattern 1

```glsl
varying vec2 vUV;

void main() {
    gl_FragColor = vec4(vUV, 1.0, 1.0);
}
```

### Pattern 2

```glsl
varying vec2 vUV;

void main() {
    gl_FragColor = vec4(vUV, 0.0, 1.0);
}
```

以及

```glsl
varying vec2 vUV;

void main() {
    gl_FragColor = vec4(vUV, 0.5, 1.0);
}
```

### Pattern 3

```glsl
varying vec2 vUV;

void main() {
    gl_FragColor = vec4(vUV.x, vUV.x, vUV.x, 1.0);
}
```

### Pattern 4

```glsl
varying vec2 vUV;

void main() {
    float strength = vUV.y;
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 5

```glsl
varying vec2 vUV;

void main() {
    float strength = 1.0 - vUV.y;
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 6

```glsl
varying vec2 vUV;

void main() {
    float strength = vUV.y * 10.0;
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 7

```glsl
varying vec2 vUV;

void main() {
    float strength = mod(vUV.y * 10.0, 1.0);
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 8

```glsl
varying vec2 vUV;

void main() {
    float strength = mod(vUV.y * 10.0, 1.0);

    strength = step(0.5, strength);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 9

```glsl
varying vec2 vUV;

void main() {
    float strength = mod(vUV.y * 10.0, 1.0);

    strength = step(0.8, strength);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 10

```glsl
varying vec2 vUV;

void main() {
    float strength = mod(vUV.x * 10.0, 1.0);

    strength = step(0.8, strength);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 11

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.8, mod(vUV.x * 10.0, 1.0));

    strength += step(0.8, mod(vUV.y * 10.0, 1.0));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 12

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.8, mod(vUV.x * 10.0, 1.0));

    strength *= step(0.8, mod(vUV.y * 10.0, 1.0));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 13

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.4, mod(vUV.x * 10.0, 1.0));

    strength *= step(0.8, mod(vUV.y * 10.0, 1.0));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 14

```glsl
varying vec2 vUV;

void main() {
    float barX = step(0.4, mod(vUV.x * 10.0, 1.0));
    barX *= step(0.8, mod(vUV.y * 10.0, 1.0));

    float barY = step(0.8, mod(vUV.x * 10.0, 1.0));
    barY *= step(0.4, mod(vUV.y * 10.0, 1.0));

    float strength = barX + barY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 15

```glsl
varying vec2 vUV;

void main() {
    float barX = step(0.4, mod(vUV.x * 10.0, 1.0));
    barX *= step(0.8, mod(vUV.y * 10.0 + 0.2, 1.0));

    float barY = step(0.8, mod(vUV.x * 10.0 + 0.2, 1.0));
    barY *= step(0.4, mod(vUV.y * 10.0, 1.0));

    float strength = barX + barY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 16

```glsl
varying vec2 vUV;

void main() {
    float strength = abs(vUV.x - 0.5);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 17

```glsl
varying vec2 vUV;

void main() {
    float strength = min(abs(vUV.x - 0.5), abs(vUV.y - 0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 18

```glsl
varying vec2 vUV;

void main() {
    float strength = max(abs(vUV.x - 0.5), abs(vUV.y - 0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 19

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.2, max(abs(vUV.x - 0.5), abs(vUV.y - 0.5)));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 20

```glsl
varying vec2 vUV;

void main() {
    float square1 = step(0.2, max(abs(vUV.x - 0.5), abs(vUV.y - 0.5)));
    float square2 = 1.0 - step(0.25, max(abs(vUV.x - 0.5), abs(vUV.y - 0.5)));
    float strength = square1 * square2;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 21

```glsl
varying vec2 vUV;

void main() {
    float strength = floor(vUV.x * 10.0) / 10.0;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 22

```glsl
varying vec2 vUV;

void main() {
    float strength = floor(vUV.x * 10.0) / 10.0;
    strength *= floor(vUV.y * 10.0) / 10.0;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 23

```glsl
varying vec2 vUV;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    float strength = random(vUV);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 24

```glsl
varying vec2 vUV;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 gridUV = vec2(floor(vUV.x * 10.0) / 10.0, floor(vUV.y * 10.0) / 10.0);
    float strength = random(gridUV);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 25

```glsl
varying vec2 vUV;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 gridUV = vec2(floor(vUV.x * 10.0) / 10.0, floor(vUV.y * 10.0 + vUV.x * 5.0) / 10.0);
    float strength = random(gridUV);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 26

```glsl
varying vec2 vUV;

void main() {
    float strength = length(vUV);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 27

```glsl
varying vec2 vUV;

void main() {
    float strength = distance(vUV, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 28

```glsl
varying vec2 vUV;

void main() {
    float strength = 1.0 - distance(vUV, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 29

```glsl
varying vec2 vUV;

void main() {
    float strength = 0.015 / distance(vUV, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 30

```glsl
varying vec2 vUV;

void main() {
    vec2 lightUV = vec2(vUV.x * 0.1 + 0.45, vUV.y * 0.5 + 0.25);
    float strength = 0.015 / distance(lightUV, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 31

```glsl
varying vec2 vUV;

void main() {
    vec2 lightUVX = vec2(vUV.x * 0.1 + 0.45, vUV.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUVX, vec2(0.5));

    vec2 lightUVY = vec2(vUV.y * 0.1 + 0.45, vUV.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUVY, vec2(0.5));

    float strength = lightX * lightY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 32

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {
    vec2 rotateUV = rotate(vUV, PI * 0.25, vec2(0.5));

    vec2 lightUVX = vec2(rotateUV.x * 0.1 + 0.45, rotateUV.y * 0.5 + 0.25);
    float lightX = 0.015 / distance(lightUVX, vec2(0.5));

    vec2 lightUVY = vec2(rotateUV.y * 0.1 + 0.45, rotateUV.x * 0.5 + 0.25);
    float lightY = 0.015 / distance(lightUVY, vec2(0.5));

    float strength = lightX * lightY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 33

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.2, distance(vUV, vec2(0.5)));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 34

```glsl
varying vec2 vUV;

void main() {
    float strength = abs(distance(vUV, vec2(0.5)) - 0.25);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 35

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.01, abs(distance(vUV, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 36

```glsl
varying vec2 vUV;

void main() {
    float strength = 1.0 - step(0.01, abs(distance(vUV, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 37

```glsl
varying vec2 vUV;

void main() {
    vec2 wavedUV = vec2(vUV.x, vUV.y + sin(vUV.x * 30.0) * 0.1);
    float strength = 1.0 - step(0.01, abs(distance(wavedUV, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 38

```glsl
varying vec2 vUV;

void main() {
    vec2 wavedUV = vec2(vUV.x + sin(vUV.y * 30.0) * 0.1, vUV.y + sin(vUV.x * 30.0) * 0.1);
    float strength = 1.0 - step(0.01, abs(distance(wavedUV, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 39

```glsl
varying vec2 vUV;

void main() {
    vec2 wavedUV = vec2(vUV.x + sin(vUV.y * 100.0) * 0.1, vUV.y + sin(vUV.x * 100.0) * 0.1);
    float strength = 1.0 - step(0.01, abs(distance(wavedUV, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 40

```glsl
varying vec2 vUV;

void main() {
    float angle = atan(vUV.x, vUV.y);
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 41

```glsl
varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 42

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 43

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    angle *= 20.0;
    angle = mod(angle, 1.0);
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 44

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float strength = sin(angle * 100.0);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 45

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float sinusoid = sin(angle * 100.0);

    float radius = 0.25 + sinusoid;
    float strength = 1.0 - step(0.01, abs(distance(vUV, vec2(0.5)) - radius));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

```glsl
#define PI 3.1415926535897932384626433832795

varying vec2 vUV;

void main() {
    float angle = atan(vUV.x - 0.5, vUV.y - 0.5);
    angle /= PI * 2.0;
    angle += 0.5;
    float sinusoid = sin(angle * 100.0);

    float radius = 0.25 + sinusoid * 0.02;
    float strength = 1.0 - step(0.01, abs(distance(vUV, vec2(0.5)) - radius));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 46

[Classic Perlin Noise](https://github.com/stegu/webgl-noise/blob/master/src/classicnoise2D.glsl)

```glsl
varying vec2 vUV;

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
    float strength = cnoise(vUV * 10.0);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 47

```glsl
varying vec2 vUV;

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    float strength = step(0.0, cnoise(vUV * 10.0) );

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 48

```glsl
varying vec2 vUV;

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    float strength = 1.0 - abs(cnoise(vUV * 10.0));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 49

```glsl
varying vec2 vUV;

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    float strength = sin(abs(cnoise(vUV * 10.0)) * 20.0);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### Pattern 50

```glsl
varying vec2 vUV;

//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x * 34.0) + 10.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

// Classic Perlin noise
float cnoise(vec2 P) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod289(Pi); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x, gy.x);
    vec2 g10 = vec2(gx.y, gy.y);
    vec2 g01 = vec2(gx.z, gy.z);
    vec2 g11 = vec2(gx.w, gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main() {
    float strength = step(0.9, sin(abs(cnoise(vUV * 10.0)) * 20.0));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
```

### 混合颜色(Mix Colors)

使用 `mix` 函数混合颜色。

```glsl
void main() {
    float strength = step(0.9, sin(abs(cnoise(vUV * 10.0)) * 20.0));

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUV, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}
```

### 设置强度

使用 `clamp` 函数设置强度。

```glsl
varying vec2 vUV;

void main() {
    float strength = step(0.8, mod(vUV.x * 10.0, 1.0));

    strength += step(0.8, mod(vUV.y * 10.0, 1.0));

    strength = clamp(strength, 0.0, 1.0);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUV, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}
```
