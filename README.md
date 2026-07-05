# 微分方程知识城市 V6｜纽约城区建模版

这是张宇《基础30讲》第15讲「微分方程」的 WebGL 知识城市工程项目。核心目标不是做二维知识网，而是把微分方程章节建模成一座可探索、可扩展、可继续开发的知识城市。

## 快速运行

```bash
npm install
npm run dev
```

打开终端提示的本地地址，即可进入工程版知识城市。

也可以直接查看 `index.html` 的入口结构，但正式运行建议走 Vite 开发服务。

## 项目定位

V6 的目标是：

> 远看像城市，中看能分区，近看地标有数学含义。

城市采用纽约式城区隐喻：

- **曼哈顿·高阶线性核心岛**：最高、最密、最重要的天际线，代表高阶线性微分方程、特征方程、非齐次解结构。
- **皇后·一阶方程区**：大面积基础街区，代表可分离变量、齐次方程、一阶线性、伯努利、全微分。
- **布鲁克林·可降阶工业区**：厂房、电梯、链式车间，代表二阶可降阶、变量角色转换。
- **应用海湾·现实建模码头**：自行车轨迹、飞机减速、牛顿冷却等现实场景。
- **微分河与欧拉桥**：河流代表变化率，桥梁代表结构转化。
- **红钩·风险训练场**：除零丢解、绝对值、常数合并、变量角色混乱等风险点。

## 当前工程结构

```text
/
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── data/
│   └── city-data.json
├── docs/
│   └── V6_城市建模规格书.md
├── notes/
│   └── development-log.md
├── release/
│   └── README.md
├── scripts/
│   └── validate-city-data.js
├── source/
│   └── implementation-plan.md
└── src/
    ├── main.js
    ├── styles.css
    ├── README.md
    ├── config/
    │   └── constants.js
    ├── data/
    │   └── cityData.js
    ├── core/
    │   ├── BuildingFactory.js
    │   ├── CameraRig.js
    │   ├── CityBuilder.js
    │   ├── InteractionManager.js
    │   └── materials.js
    ├── ui/
    │   ├── LabelManager.js
    │   └── PanelManager.js
    └── utils/
        └── geometry.js
```

## 可用命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 打包生产版本
npm run preview    # 预览打包产物
npm run lint:data  # 校验城市数据结构
```

## V6 硬验收标准

1. 有真实城区布局，不是一堆盒子。
2. 有道路、桥梁、河流、广场。
3. 天际线有层次，远看能分区。
4. 材质和光影明显提升。
5. 能让学习者有“进入微分方程城市”的感觉。

## 后续开发优先级

1. 继续强化城市建模和天际线。
2. 加入第一人称进入城市街道。
3. 做重点建筑内部学习：一阶线性馆、伯努利馆、可降阶电梯、高阶线性塔、应用海湾。
4. 加个人漏洞层和考试出口标准层。
5. 扩展到数学一其他章节，形成知识城市群。
