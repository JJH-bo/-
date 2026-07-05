# V6.4.2 街区-建筑-道路真实建模重构状态

## 已同步到 GitHub 的内容

### 1. 公开验收版

分支：gh-pages

文件：index.html

当前公开页版本：V6.4.2 微分方程知识城市｜街区-建筑-道路真实建模重构

公开入口继续使用：

https://jjh-bo.github.io/-/

### 2. V6.4.2 公开页包含的核心代码

当前 gh-pages/index.html 已包含：

- WebGL / Three.js 场景初始化
- 曼哈顿主岛水体和岸线
- Central Park 保护型大绿肺
- street / avenue / block / lot 生成逻辑
- roadSegment 道路生成逻辑
- crosswalk 斑马线逻辑
- 人行道与车行道分层
- block 内地块生成
- makeBuilding 建筑生成逻辑
- podium / body / facadeGrid / entrance / roofDetails
- brickWindows / factoryWindows
- Midtown、SoHo、Chelsea、Waterfront 不同区域建筑风格
- Central Park 内部湖面、路径、树阵、自行车后轮轨迹
- East River 码头、栈桥、桥梁、欧拉桥
- Liberty Island、Governors Island、Grey Island
- 悬停显示名称、点击显示知识职责
- 纽约夜景切换和地铁关系线

### 3. 主工程元数据已同步

分支：main

文件：package.json

当前版本号：0.8.2

当前描述：张宇第15讲《微分方程》WebGL 知识城市 V6.4.2：街区-建筑-道路真实建模重构版。

### 4. 需要继续工程化迁移的内容

当前 V6.4.2 公开验收版已经完整进入 gh-pages/index.html，但主工程模块化文件仍主要停留在 V6.3/V6.4 过渡结构。

下一步若继续长期开发，必须把 gh-pages/index.html 中的 V6.4.2 重构逻辑拆回主工程：

- src/core/BlockGridBuilder.js
- src/core/RoadFactory.js
- src/core/LotBuilder.js
- src/core/RealisticBuildingFactory.js
- src/core/ParkBuilder.js
- src/core/WaterfrontBuilder.js
- src/data/manhattanBlocks.js
- src/data/materialProfiles.js

这一步不是当前公开验收的必要条件，但它是后续 V6.5/V7 长期工程化的必要条件。

## 当前状态结论

- 公开可看版本已在 gh-pages。
- 主工程 package 元数据已同步到 V6.4.2。
- V6.4.2 的设计目标和状态已写入 docs。
- 公开预览代码已进入 GitHub。
- 后续若继续开发，必须从单页验收版回收为模块化工程结构。
