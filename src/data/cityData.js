export const cityData = {
  meta: {
    title: '张宇第15讲 微分方程知识城市 V6.1',
    version: 'V6.1 城市骨架验收版',
    goal: '推翻彩色知识沙盘，先建立真实纽约缩略城市骨架，再把微分方程知识嵌入地标与夜景关系层。',
    principle: '城市第一，知识第二层嵌入；70% 城市肌理，30% 知识地标。'
  },
  water: {
    river: {
      id: 'differential-river',
      name: '微分河',
      role: '变化率关系的主水系，像东河一样切开皇后一阶基础区、曼哈顿高阶线性岛与布鲁克林工业转换区。',
      width: 54,
      points: [[-150, 0.4, -570], [-128, 0.4, -410], [-112, 0.4, -245], [-92, 0.4, -70], [-60, 0.4, 110], [4, 0.4, 280], [120, 0.4, 460], [260, 0.4, 610]]
    },
    bay: {
      id: 'application-bay-water',
      name: '应用海湾水面',
      role: '现实建模接口，几何、物理应用从水岸、码头、跑道和实验塔进入变化率方程。',
      center: [520, 0.5, 255],
      radius: [270, 190]
    },
    harbor: {
      id: 'entrance-harbor-water',
      name: '入口港水面',
      role: '学习入口前的开阔水面，降低概念区高度，让用户从港口进入主城。',
      center: [-640, 0.55, 330],
      radius: [210, 145]
    }
  },
  landMasses: [
    { id: 'queens-land', name: '皇后一阶陆地', district: 'queens-first-order', color: 0xdedbd2, polygon: [[-720, 1, -360], [-250, 1, -420], [-170, 1, -240], [-180, 1, 130], [-300, 1, 285], [-690, 1, 230], [-760, 1, 40]] },
    { id: 'manhattan-island', name: '曼哈顿高阶线性核心岛', district: 'manhattan-linear', color: 0xd8d9d5, polygon: [[34, 1.15, -430], [240, 1.15, -470], [304, 1.15, -290], [284, 1.15, 72], [220, 1.15, 178], [80, 1.15, 154], [20, 1.15, -40]] },
    { id: 'brooklyn-land', name: '布鲁克林可降阶工业陆地', district: 'brooklyn-reduction', color: 0xd2c8bb, polygon: [[-30, 1.05, 195], [330, 1.05, 145], [420, 1.05, 330], [335, 1.05, 520], [55, 1.05, 508], [-105, 1.05, 365]] },
    { id: 'entrance-port-land', name: '入口港概念广场陆地', district: 'entrance-harbor', color: 0xe5e1d8, polygon: [[-745, 1.08, 135], [-540, 1.08, 118], [-465, 1.08, 238], [-535, 1.08, 365], [-730, 1.08, 350], [-790, 1.08, 250]] },
    { id: 'application-bay-land', name: '应用海湾水岸', district: 'application-bay', color: 0xd6d3c8, polygon: [[330, 1.05, 75], [735, 1.05, 20], [810, 1.05, 215], [750, 1.05, 455], [420, 1.05, 505], [300, 1.05, 360]] },
    { id: 'red-hook-risk-land', name: '红钩风险训练场陆地', district: 'red-hook-risk', color: 0xd8c1b5, polygon: [[-280, 1.05, 470], [-80, 1.05, 440], [48, 1.05, 545], [-26, 1.05, 675], [-260, 1.05, 655], [-350, 1.05, 560]] },
    { id: 'grey-island-land', name: '灰岛差分方程选学区', district: 'grey-island-difference', color: 0xc8c8c2, polygon: [[560, 1.0, -515], [760, 1.0, -535], [805, 1.0, -400], [700, 1.0, -320], [540, 1.0, -365]] }
  ],
  districts: [
    {
      id: 'entrance-harbor', name: '入口港·概念广场', borough: '入口港', position: [-630, 0, 245], size: [270, 4, 220], color: 0xe5e1d8, accent: 0x6b8fb5, importance: 1, density: 'low', labelTier: 'district',
      boundary: [[-745, 2, 135], [-540, 2, 118], [-465, 2, 238], [-535, 2, 365], [-730, 2, 350], [-790, 2, 250]],
      grid: { rows: 4, cols: 5, minHeight: 8, maxHeight: 28, fabric: 'civic-low', palette: [0xd7d3c8, 0xe7e1d5, 0xcfc7b7], avoid: [[-630, 245, 88], [-585, 278, 54]] },
      role: '低矮、开阔、清晰的入城港口，负责把“未知函数与导数的关系”放进城市入口。',
      math: ['微分方程及其阶', '常微分方程', '线性微分方程', '解', '通解', '初始条件与特解'],
      cityMeaning: '概念区不追求高度，像港口广场一样先建立入城方向。'
    },
    {
      id: 'queens-first-order', name: '皇后·一阶方程区', borough: '皇后', position: [-455, 0, -60], size: [520, 4, 540], color: 0xdedbd2, accent: 0x6f8fa6, importance: 3, density: 'medium', labelTier: 'district',
      boundary: [[-720, 2, -360], [-250, 2, -420], [-170, 2, -240], [-180, 2, 130], [-300, 2, 285], [-690, 2, 230], [-760, 2, 40]],
      grid: { rows: 8, cols: 9, minHeight: 16, maxHeight: 58, fabric: 'row-grid', palette: [0xc9c1b4, 0xd8d0c2, 0xb9b4aa, 0xe0d7c8], avoid: [[-375, -75, 88], [-525, 40, 68], [-470, -190, 58]] },
      role: '大面积基础生活区，街网更开阔，承载一阶方程的基础方法街区。',
      math: ['可分离变量型', '换元后可分离', '齐次型', '一阶线性', '伯努利方程', '全微分方程'],
      cityMeaning: '一阶方程是基础城区，面积大而不压迫；方法像真实街区，不像漂浮节点。'
    },
    {
      id: 'brooklyn-reduction', name: '布鲁克林·可降阶工业区', borough: '布鲁克林', position: [145, 0, 355], size: [455, 4, 340], color: 0xd2c8bb, accent: 0x9a6d4a, importance: 4, density: 'industrial', labelTier: 'district',
      boundary: [[-30, 2, 195], [330, 2, 145], [420, 2, 330], [335, 2, 520], [55, 2, 508], [-105, 2, 365]],
      grid: { rows: 5, cols: 8, minHeight: 22, maxHeight: 82, fabric: 'industrial', palette: [0x9d8d7a, 0xb39b7b, 0x857a70, 0xc0a077], avoid: [[75, 310, 92], [210, 285, 74]] },
      role: '工业加工区，把二阶问题通过变量角色转换加工成一阶问题。',
      math: ["p=y'", '缺 y：p=p(x)', '缺 x：p=p(y)', "y''=p dp/dy", '二阶下降平台'],
      cityMeaning: '可降阶不是套路，而是研究对象的工业转换：从 y 转到 p。'
    },
    {
      id: 'manhattan-linear', name: '曼哈顿·高阶线性核心岛', borough: '曼哈顿', position: [155, 0, -140], size: [245, 4, 625], color: 0xd8d9d5, accent: 0x5f78a8, importance: 5, density: 'high', labelTier: 'district',
      boundary: [[34, 2, -430], [240, 2, -470], [304, 2, -290], [284, 2, 72], [220, 2, 178], [80, 2, 154], [20, 2, -40]],
      grid: { rows: 13, cols: 6, minHeight: 46, maxHeight: 205, fabric: 'manhattan-highrise', palette: [0xbfc5c9, 0xd6d8d9, 0xaeb8c2, 0xc7c9c4, 0x9da7b0], avoid: [[150, -190, 80], [210, 20, 72], [120, -40, 58]] },
      skyline: { primary: [150, -190], secondary: [214, 26], primaryRadius: 185, secondaryRadius: 135 },
      role: '最难、最重要、最高密度的核心岛，以主核心+次核心天际线承载高阶线性结构。',
      math: ['线性解结构', '特征方程', '不等实根', '重根', '复根', '非齐次特解', '欧拉方程入口'],
      cityMeaning: '抽象层级越高，楼越高；特征方程中央塔必须压住全城。'
    },
    {
      id: 'application-bay', name: '应用海湾·现实建模码头', borough: '应用海湾', position: [560, 0, 270], size: [470, 4, 420], color: 0xd6d3c8, accent: 0x6d9489, importance: 3, density: 'scenic', labelTier: 'district',
      boundary: [[330, 2, 75], [735, 2, 20], [810, 2, 215], [750, 2, 455], [420, 2, 505], [300, 2, 360]],
      grid: { rows: 5, cols: 7, minHeight: 10, maxHeight: 48, fabric: 'waterfront', palette: [0xc7beb0, 0xd9d4c8, 0xb9c0ba, 0xd0c3a8], avoid: [[470, 220, 96], [640, 135, 82], [625, 330, 78]] },
      role: '现实世界接口，应用题在这里被翻译成变化率关系。',
      math: ['几何应用', '切线方向', '自行车后轮轨迹', '飞机减速模型', '牛顿冷却模型'],
      cityMeaning: '应用区不靠高度取胜，靠码头、跑道、水岸、轨迹线、实验塔辨识。'
    },
    {
      id: 'red-hook-risk', name: '红钩·风险训练场', borough: '红钩', position: [-165, 0, 560], size: [285, 4, 190], color: 0xd8c1b5, accent: 0xc7523b, importance: 2, density: 'warning', labelTier: 'district',
      boundary: [[-280, 2, 470], [-80, 2, 440], [48, 2, 545], [-26, 2, 675], [-260, 2, 655], [-350, 2, 560]],
      grid: { rows: 3, cols: 5, minHeight: 8, maxHeight: 26, fabric: 'risk-low', palette: [0xb68d7d, 0xc4a094, 0xa87968], avoid: [[-170, 555, 115]] },
      role: '独立错误风险区，不污染主城中心，但可以作为训练场随时进入。',
      math: ['除以零丢解', '对数绝对值', '常数合并错误', '初值定符号', '变量角色混乱', '换元定义域变化'],
      cityMeaning: '错误不是附属说明，而是独立训练场。'
    },
    {
      id: 'grey-island-difference', name: '灰岛·差分方程选学区', borough: '灰岛', position: [675, 0, -430], size: [220, 4, 170], color: 0xc8c8c2, accent: 0x858a8f, importance: 1, density: 'distant', labelTier: 'district',
      boundary: [[560, 2, -515], [760, 2, -535], [805, 2, -400], [700, 2, -320], [540, 2, -365]],
      grid: { rows: 2, cols: 3, minHeight: 8, maxHeight: 18, fabric: 'distant-low', palette: [0xb8b8b2, 0xa9adb0, 0xc7c7c0] },
      role: '数学三选学远景岛，数学一主线暂不深入。',
      math: ['差分方程'],
      cityMeaning: '放在远景灰岛，提示边界，不抢主城核心。'
    }
  ],
  plazas: [
    { id: 'concept-square', name: '概念广场', district: 'entrance-harbor', position: [-630, 2.5, 245], radius: 72, color: 0xece8dc, role: '入城开阔地，承载定义、阶、解与初值。' },
    { id: 'linear-civic-core', name: '曼哈顿线性核心广场', district: 'manhattan-linear', position: [150, 2.6, -190], radius: 54, color: 0xe6e6e2, role: '特征方程中央塔周围的核心广场，控制高阶线性主天际线。' },
    { id: 'nonhomogeneous-yard', name: '非齐次次核心广场', district: 'manhattan-linear', position: [214, 2.6, 26], radius: 44, color: 0xdfdfda, role: '非齐次特解与待定系数实验楼形成次核心，不与齐次核心混成一团。' },
    { id: 'brooklyn-loading-yard', name: '布鲁克林下降装卸场', district: 'brooklyn-reduction', position: [90, 2.5, 340], radius: 58, color: 0xc7b59f, role: '二阶高度下降到一阶平面的工业装卸场。' },
    { id: 'risk-yard', name: '风险警戒训练场', district: 'red-hook-risk', position: [-170, 2.5, 555], radius: 62, color: 0xd8a191, role: '错误点集中训练场，红橙警戒只在这里强显示。' }
  ],
  buildings: [
    { id: 'de-monument', district: 'entrance-harbor', name: '微分方程纪念碑', type: 'obelisk', position: [-662, 2, 238], size: [34, 82, 34], color: 0x8798a5, labelTier: 'landmark', formula: "F(x,y,y',...,y⁽ⁿ⁾)=0", role: '定义整座城市：未知函数与导数之间的关系。', strongSymbol: true, risks: ['只看成计算题，会失去变化率关系的本质。'] },
    { id: 'solution-hall', district: 'entrance-harbor', name: '通解/特解三联馆', type: 'triple-hall', position: [-585, 2, 282], size: [112, 36, 50], color: 0xb7b4aa, labelTier: 'mid', formula: '通解→初值→特解', role: '一般解族通过初始条件收缩为具体解。' },
    { id: 'linear-first-order', district: 'queens-first-order', name: '一阶线性馆', type: 'machine-hall', position: [-375, 2, -75], size: [92, 76, 66], color: 0x9ca8ad, labelTier: 'landmark', formula: "y'+p(x)y=q(x)", role: '积分因子把左边补成乘积导数，是一阶区最重要地标。', strongSymbol: true, risks: ['p(x)、q(x) 必须是 x 的函数，不能把变量角色混乱。'] },
    { id: 'bernoulli-gate', district: 'queens-first-order', name: '伯努利转换门', type: 'gate', position: [-525, 2, 42], size: [88, 72, 52], color: 0x8b8396, labelTier: 'landmark', formula: 'z=y^(1-n)', role: '非线性通过换元进入一阶线性体系。', strongSymbol: true, risks: ['除以 yⁿ 前要检查 y=0 是否被丢掉。'] },
    { id: 'separable-street-hall', district: 'queens-first-order', name: '可分离变量街馆', type: 'street-hall', position: [-480, 2, -190], size: [86, 46, 58], color: 0xb4aa9f, labelTier: 'mid', formula: 'dy/g(y)=f(x)dx', role: '把 x 与 y 的关系拆到两侧积分；除法前必须检查零因子。', risks: ['除以 g(y) 前先检查 g(y)=0 的常值解。'] },
    { id: 'reduction-elevator', district: 'brooklyn-reduction', name: '可降阶总电梯', type: 'elevator', position: [75, 2, 310], size: [58, 138, 58], color: 0x8c7663, labelTier: 'landmark', formula: '二阶→一阶', role: "把研究对象从 y 改成 p=y'，让高度下降。", strongSymbol: true },
    { id: 'missing-x-workshop', district: 'brooklyn-reduction', name: '缺 x 链式车间', type: 'chain-workshop', position: [205, 2, 285], size: [104, 68, 70], color: 0x9d8064, labelTier: 'landmark', formula: "y''=p dp/dy", role: '不显含 x 时，把 p 看成 y 的函数，这是最容易错的变量角色转换。', strongSymbol: true },
    { id: 'missing-y-factory', district: 'brooklyn-reduction', name: '缺 y 厂房', type: 'factory', position: [190, 2, 410], size: [108, 58, 82], color: 0xa58f76, labelTier: 'mid', formula: "p=p(x), y''=p'", role: '不显含 y 时，把 p 看成 x 的函数。' },
    { id: 'characteristic-tower', district: 'manhattan-linear', name: '特征方程中央塔', type: 'central-tower', position: [150, 2, -190], size: [74, 262, 74], color: 0x9eabb8, labelTier: 'landmark', formula: 'r²+pr+q=0', role: '指数试探把微分问题压缩为代数问题，全城最高地标。', strongSymbol: true },
    { id: 'linear-structure-building', district: 'manhattan-linear', name: '线性解结构大楼', type: 'skyscraper', position: [82, 2, -246], size: [58, 150, 58], color: 0xb8c0c8, labelTier: 'landmark', formula: 'y=C₁y₁+C₂y₂', role: '线性方程的核心是解空间结构，而不是孤立公式。', strongSymbol: true },
    { id: 'repeated-root-tower', district: 'manhattan-linear', name: '重根摩天楼', type: 'stepped-skyscraper', position: [96, 2, -82], size: [62, 186, 62], color: 0xa6afb8, labelTier: 'landmark', formula: '(C₁+C₂x)e^(rx)', role: '重根不能重复写同一个解，必须生成新的线性无关解。', strongSymbol: true },
    { id: 'complex-root-spiral', district: 'manhattan-linear', name: '复根旋转塔', type: 'spiral-tower', position: [242, 2, -82], size: [60, 176, 60], color: 0xa4a0b7, labelTier: 'landmark', formula: 'e^(αx)(cosβx+sinβx)', role: '复根带来指数衰增与三角振荡，外侧螺旋灯带表达振荡。', strongSymbol: true },
    { id: 'nonhomogeneous-factory', district: 'manhattan-linear', name: '非齐次特解工厂', type: 'factory', position: [210, 2, 28], size: [112, 92, 68], color: 0xa8b3bb, labelTier: 'landmark', formula: 'y=y_h+y_p', role: '非齐次通解由齐次通解与一个特解叠加，形成曼哈顿次核心。', strongSymbol: true },
    { id: 'euler-bridge-entry', district: 'manhattan-linear', name: '欧拉桥入口塔', type: 'bridgehead', position: [270, 2, 108], size: [54, 92, 48], color: 0xa9aeb8, labelTier: 'mid', formula: 'x=e^t', role: '欧拉方程接入常系数线性体系的入口。' },
    { id: 'geometry-dock', district: 'application-bay', name: '几何应用码头', type: 'dock', position: [410, 2, 246], size: [118, 30, 62], color: 0x9b8b72, labelTier: 'mid', formula: '切线方向→dy/dx', role: '把几何切线关系翻译为导数关系。' },
    { id: 'bike-trajectory-hall', district: 'application-bay', name: '自行车轨迹馆', type: 'trajectory-hall', position: [475, 2, 205], size: [92, 58, 70], color: 0x8ba49f, labelTier: 'landmark', formula: 'Q切线指向P', role: '后轮轨迹的切线方向始终指向前轮位置。', strongSymbol: true },
    { id: 'airplane-runway', district: 'application-bay', name: '飞机减速跑道', type: 'runway', position: [640, 2, 135], size: [180, 18, 40], color: 0x717b82, labelTier: 'mid', formula: 'm dv/dt=-kv', role: '速度方向与阻力方向相反，变化率模型来自牛顿第二定律。' },
    { id: 'cooling-lab-tower', district: 'application-bay', name: '牛顿冷却实验塔', type: 'cooling-tower', position: [625, 2, 330], size: [58, 122, 58], color: 0x8aa099, labelTier: 'landmark', formula: 'T=T₀+Ce^(-kt)', role: '温度曲线指数逼近环境温度。', strongSymbol: true },
    { id: 'zero-loss-pit', district: 'red-hook-risk', name: '除零丢解坑', type: 'risk-pit', position: [-198, 2, 552], size: [62, 26, 62], color: 0xb94a37, labelTier: 'landmark', formula: '除以前查零因子', role: '分离变量、伯努利等过程最容易在除法中丢解。', strongSymbol: true },
    { id: 'absolute-value-gate', district: 'red-hook-risk', name: '绝对值门', type: 'risk-gate', position: [-110, 2, 535], size: [66, 46, 42], color: 0xc36d4b, labelTier: 'mid', formula: '∫du/u=ln|u|+C', role: '对数绝对值不能随手省略。' }
  ],
  roads: [
    { id: 'zhangyu-main-avenue', name: '张宇主线大道', kind: 'main', points: [[-665, 4, 245], [-515, 4, 42], [-375, 4, -75], [-35, 4, 260], [150, 4, -190], [270, 4, 108], [520, 4, 245]], color: 0x4b5563, width: 13, role: '概念→一阶→可降阶→高阶线性→欧拉→应用；白天是主路，夜景才发光成学习路径。' },
    { id: 'manhattan-broadway-axis', name: '曼哈顿线性核心轴', kind: 'avenue', points: [[118, 4, -395], [150, 4, -190], [205, 4, 24], [245, 4, 145]], color: 0x39414b, width: 10, role: '高阶线性岛的纵向核心街道。' },
    { id: 'queens-method-boulevard', name: '皇后方法大道', kind: 'avenue', points: [[-690, 4, 38], [-525, 4, 42], [-375, 4, -75], [-230, 4, -210]], color: 0x4f585d, width: 11, role: '一阶方法街区主干道。' },
    { id: 'brooklyn-industrial-loop', name: '布鲁克林工业环路', kind: 'industrial', points: [[-30, 4, 272], [88, 4, 210], [285, 4, 235], [340, 4, 380], [190, 4, 470], [20, 4, 438], [-30, 4, 272]], color: 0x5c5147, width: 12, role: '可降阶加工区交通环线。' },
    { id: 'bay-boardwalk', name: '应用海湾木栈道', kind: 'boardwalk', points: [[370, 4, 300], [410, 4, 246], [475, 4, 205], [640, 4, 135], [700, 4, 250], [625, 4, 330], [520, 4, 420]], color: 0x8b7357, width: 10, role: '应用建模场景沿水岸串联。' },
    { id: 'risk-warning-road', name: '风险警戒线', kind: 'warning', points: [[-235, 4, 565], [-198, 4, 552], [-110, 4, 535], [-60, 4, 575], [-125, 4, 625]], color: 0x9d4b39, width: 9, role: '风险点训练路线，白天只作警戒道路，夜景发光提醒。' }
  ],
  bridges: [
    { id: 'euler-bridge', name: '欧拉跨江大桥', kind: 'suspension', points: [[270, 18, 108], [345, 24, 160], [430, 18, 225]], color: 0x9c8b6b, formula: 'x=e^t', role: '幂结构通过 x=e^t 接入常系数线性体系。' },
    { id: 'bernoulli-linear-bridge', name: '伯努利线性化桥', kind: 'beam', points: [[-525, 12, 42], [-455, 14, 0], [-375, 12, -75]], color: 0x8d7f91, formula: 'z=y^(1-n)', role: '伯努利方程转入一阶线性馆。' },
    { id: 'reduction-first-order-bridge', name: '降阶回一阶桥', kind: 'beam', points: [[75, 14, 310], [-85, 16, 205], [-300, 12, 108]], color: 0x8b7357, formula: "p=y'", role: '可降阶工业区降到一阶方程基础区。' },
    { id: 'modeling-bridge', name: '现实建模桥', kind: 'beam', points: [[520, 12, 245], [388, 14, 210], [270, 12, 108]], color: 0x7a8f86, formula: '现实关系→微分方程', role: '现实题从应用海湾进入主城方程结构。' }
  ],
  metro: [
    { id: 'blue-main-line', name: '蓝线：章节主线', points: [[-665, 12, 245], [-375, 12, -75], [75, 12, 310], [150, 12, -190], [270, 12, 108], [625, 12, 330]], color: 0x2d79d8 },
    { id: 'green-substitution-line', name: '绿线：换元线', points: [[-480, 13, -190], [-525, 13, 42], [-375, 13, -75], [75, 13, 310]], color: 0x29b06f },
    { id: 'purple-linearization-line', name: '紫线：线性化线', points: [[-525, 14, 42], [-375, 14, -75], [150, 14, -190], [270, 14, 108]], color: 0x8b5cf6 },
    { id: 'orange-modeling-line', name: '橙线：应用建模线', points: [[410, 13, 246], [475, 13, 205], [640, 13, 135], [625, 13, 330]], color: 0xf2a33b },
    { id: 'red-risk-line', name: '红线：风险提醒线', points: [[-198, 13, 552], [-110, 13, 535], [-60, 13, 575], [-125, 13, 625]], color: 0xef4444 }
  ]
};
