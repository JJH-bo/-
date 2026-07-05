# V6 开发记录

## 1. 错误方向淘汰

早期版本把二维知识图谱强行放进 3D 坐标系，形成节点与连线堆叠，视觉负担大，学习路径不清楚。这个方向已经废弃。

V6 不再做“知识网”，而是做“知识城市”。

## 2. V6 核心定位

微分方程不是一张知识网，而是一座按重要性、章节层级、方法关系、学习路径规划出来的城市。

最难、最重要的章节板块要占据城市最核心、最高、最有地标感的区域。

## 3. V6.3 设计转向

V6.3 不再继续五区纽约扩张，而是收束为：

- 曼哈顿全岛作为主城。
- Liberty Island + Battery Park 作为概念入口。
- SoHo / Greenwich 作为一阶方程方法街区。
- Chelsea / High Line 作为可降阶工业转换区。
- Midtown / Times Square 作为高阶线性核心。
- Central Park 作为几何应用区，也是唯一大空地。
- East River Piers 作为物理应用码头。
- Governors Island 作为独立风险训练场。
- Grey Island 作为差分方程远景选学区。

这次不再靠大色块讲分区，而是靠岛屿、水岸、街区密度、天际线、路牌、码头、公园和桥梁让城市自己说明知识结构。

## 4. V6.3.1 已完成：地理底盘重构

已完成：

1. `cityData.js` 改为 V6.3 曼哈顿全岛工程重构版。
2. 曼哈顿主岛、Liberty Island、Governors Island、Grey Island 进入结构化数据。
3. Central Park 被写死为唯一大空地。
4. Battery Park 成为概念登陆口。
5. 原先皇后/布鲁克林式命名从主导航中退出，改为曼哈顿真实区位映射。

## 5. V6.3.2 已完成：建筑类型库与城市细节层

已完成：

1. `BuildingFactory.js` 扩展出 central tower、triple hall、brick/street hall、bridgehead、gate、factory、elevator、spiral、runway、cooling、courtyard、trajectory、pit、stepped 等类型。
2. 普通建筑不再统一盒子：Midtown 高层、SoHo 红砖楼、Chelsea 工业厂房、East River 码头建筑、风险区建筑分别生成。
3. `CityBuilder.js` 增加 `v6-3-manhattan-urban-fabric`、`v6-3-manhattan-street-grid`、`v6-3-city-details` 分组。
4. 新增 `CityDetailLayer.js`，负责 Times Square 灯屏、High Line、高线支柱、Central Park 湖面/树/轨迹、East River 码头、Liberty Island 渡轮线、Governors Island 风险训练设施和章节入口路牌。
5. `main.js` 已挂载 `CityDetailLayer`，细节层进入主场景渲染流程。
6. `gh-pages/index.html` 已同步为 V6.3.2 曼哈顿细节公开预览。

## 6. 第二次开发指令已完成：稳定性与可读性压缩

本次重点不是继续堆东西，而是把已做内容压稳、压清楚：

1. `LabelManager.js` 增加可见标签硬上限，避免远景标签乱飞。
2. 标签按距离、层级、屏幕范围进行隐藏，近距离自动退回点击面板。
3. `PanelManager.js` 全面改成 V6.3 曼哈顿全岛语义，删除旧的皇后/布鲁克林解释残留。
4. `styles.css` 优化夜景、标签、按钮、移动视口和面板阅读体验。
5. 保留当前阶段边界：当前目标是 V6.3.2 城市建模可验收，不进入 V7 内部学习。

## 7. 第三次开发指令待完成：最终验收修

下一次开发指令只做收束，不继续无限加功能：

1. 检查公开入口加载状态。
2. 检查按钮视角是否对应 V6.3 曼哈顿分区。
3. 检查昼夜切换和地铁线显示。
4. 检查核心地标远中近可读性。
5. 给出“现在可以进去看”的明确版本说明。

## 8. 技术原则

- 稳定进入优先于视觉炫技。
- 工程版不依赖外部 CDN。
- 模块化工程继续保留，不退回单文件堆代码。
- 公开 `gh-pages` 临时预览可以单文件，但主工程必须以 `cityData.js`、`CityBuilder.js`、`BuildingFactory.js`、`CityDetailLayer.js` 等模块维护。
- 后续第一人称和建筑内部学习必须等城市形态达标后再做。
