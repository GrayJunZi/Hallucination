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