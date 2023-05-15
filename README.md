# Hallucination

Three.js Journey - The Ultimate Three.js Course
---
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
- 与3D对象交互(3D objects)
- 添加粒子(particles)

### 高级技术

- 使用Blender创建3D模型
- 添加物理
- 为大项目组织代码

### 着色器(Shaders)

发挥WebGL的真正能力。

### 额外

- 添加后处理(post-processing)
- 优化性能
- 混合WebGL与HTML

### 传送门场景

使用Blender创建传送门场景

### React Three Fiber

如何在React应用程序中使用Three.js。
大量的技术和大量的实践创建一个具有物理、真实游戏机制、UI和酷炫效果的游戏。

## 二、WebGL与Three.js

Three.js是一个3DJavaScript库，它使开发人员能够为Web创建3D体验。它与WebGL一起工作，但你可以让它与SVG和CSS一起工作。

### 什么是WebGL？

- JavaScript API
- 以惊人的速度渲染三角形
- 结果可以在一个<canvas>中绘制
- 兼容大多数现代浏览器
- 使用图形处理单元(GPU, Graphic Processing Unit)

CPU计算速度非常快，但一个接一个的计算。GPU速度稍慢，但可以进行数千次并行计算。

绘制一个三维模型，其原理是在合适的位置绘制许多三角形，并将它们涂上颜色，使它们看起来像我们想要的。

一旦点被放置，GPU将绘制这些三角形的每个可见像素同样，这数千个像素将以极快的速度并行计算和绘制。

### 为什么使用Three.js？

- JavaScript 库
- MIT 许可证
- 基于WebGL

Three.js是最流行的WebGL库，它非常稳定，它提供了许多功能，文档也可圈可点(remarkable)，社区正在努力更新，它仍然足够接近原生WebGL。

## 三、基础场景(Basic Scene)

- 让Three.js以最简单的方式工作
- 无 bundler、无模块、无依赖
- 一个JavaScript和一个HTML文件

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
- canvas是一个HTML元素，你可以在其中绘制一些东西。
- Three.js将使用WebGL在画布中绘制渲染。
- 您可以创建它或你可以让Three.js来做。

## 四、本地服务(Local Server)

直接引入 `three.js` 的方式有两个问题，第一个是只能访问核心类`THREE`，第二个问题是打开HTML文件时，您的浏览器不会让JavaScript执行任何有关安全问题的指令，将无法加载本地文件，如纹理或模型。

但我们希望运行JavaScript代码，所以需要一个本地服务器

### 构建工具

有许多构建工具可以用例如 `Webpack`、`Vite`、`Gulp`、`Parcel` 等各有利弊(with pros and cons)。

最流行工具是 `Webpack` ，它被广泛使用，具有庞大的社区，可以用它做很多事情。

最受赞赏的构建工具是 `Vite`，具有如下优势：

- 安装速度更快
- 运行速度更快
- 不容易出现错误
- 更好的开发者体验