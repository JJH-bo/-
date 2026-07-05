# src 目录说明

这里是 V6 微分方程知识城市的工程源码，不再只是说明文档。

## 目录结构

```text
src/
├── main.js                     # WebGL 应用入口
├── styles.css                  # UI、面板、标签、加载层样式
├── config/
│   └── constants.js            # 摄像机预设、图层、模式常量
├── data/
│   └── cityData.js             # 城区、建筑、道路、桥梁、地铁线数据
├── core/
│   ├── BuildingFactory.js      # 地标建筑生成器
│   ├── CameraRig.js            # 斜俯视镜头控制
│   ├── CityBuilder.js          # 城市建造总控
│   ├── InteractionManager.js   # 点击拾取与交互
│   └── materials.js            # 材质与夜景模式
├── ui/
│   ├── LabelManager.js         # 远近标签显示系统
│   └── PanelManager.js         # 右侧知识面板
└── utils/
    └── geometry.js             # 几何辅助函数
```

## 核心原则

- 城市不是二维知识网。
- 区城、建筑、桥梁、道路必须有数学语义。
- 曼哈顿代表高阶线性核心区。
- 皇后代表一阶方程基础区。
- 布鲁克林代表可降阶工业转换区。
- 应用海湾代表现实建模。
- 红钩风险区代表计算合法性与边界风险。
