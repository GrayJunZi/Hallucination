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