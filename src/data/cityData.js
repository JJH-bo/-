export const cityData = {
  meta: {
    title: '张宇第15讲 微分方程知识城市 V6.3',
    version: 'V6.3 曼哈顿全岛工程重构版',
    goal: '放弃五区扩张，回到曼哈顿全岛与附属岛屿；先把地理底盘、章节分区、空地规则、建筑类型系统做扎实。',
    principle: '真实曼哈顿地理为主，学习结构做必要强化；中央公园是唯一大空地，自由女神像与风险区必须独立成岛。'
  },
  water: {
    river: {
      id: 'hudson-east-water-system',
      name: 'Hudson / East River 微分水系',
      role: '两侧水体把曼哈顿主岛、Liberty Island、Governors Island、Grey Island 分开，表达变化率关系的流动边界。',
      width: 42,
      points: [[-180, 0.4, -640], [-196, 0.4, -420], [-206, 0.4, -160], [-186, 0.4, 120], [-150, 0.4, 360], [-92, 0.4, 610]]
    },
    bay: {
      id: 'upper-bay-concept-water',
      name: '纽约上湾·概念入口水面',
      role: 'Liberty Island 与 Battery Park 之间的入城水面，微分方程概念从渡轮线进入主城。',
      center: [-250, 0.5, 625],
      radius: [330, 155]
    },
    harbor: {
      id: 'east-river-application-water',
      name: 'East River·物理应用水面',
      role: '物理应用的现实建模接口：码头、跑道、实验塔在这里把现实关系转为变化率方程。',
      center: [265, 0.55, 95],
      radius: [150, 360]
    }
  },
  landMasses: [
    { id: 'manhattan-main-island', name: '曼哈顿主岛', district: 'linear-midtown', color: 0xe3ded4, polygon: [[-118, 1.1, -640], [65, 1.1, -625], [112, 1.1, -555], [145, 1.1, -430], [160, 1.1, -260], [154, 1.1, -70], [140, 1.1, 110], [125, 1.1, 300], [94, 1.1, 485], [45, 1.1, 600], [-5, 1.1, 650], [-58, 1.1, 610], [-92, 1.1, 500], [-122, 1.1, 320], [-148, 1.1, 90], [-166, 1.1, -150], [-164, 1.1, -405], [-145, 1.1, -555]] },
    { id: 'liberty-island', name: 'Liberty Island·概念火炬岛', district: 'concept-liberty-battery', color: 0xd7c49c, polygon: [[-515, 1.05, 608], [-470, 1.05, 575], [-396, 1.05, 584], [-350, 1.05, 628], [-364, 1.05, 682], [-428, 1.05, 704], [-500, 1.05, 670]] },
    { id: 'governors-island', name: 'Governors Island·风险训练岛', district: 'risk-governors', color: 0xc66d55, polygon: [[178, 1.05, 596], [282, 1.05, 552], [418, 1.05, 596], [432, 1.05, 684], [328, 1.05, 728], [210, 1.05, 698]] },
    { id: 'grey-island', name: 'Grey Island·差分选学远景', district: 'grey-difference', color: 0xb9b9b3, polygon: [[360, 1.0, -540], [510, 1.0, -560], [545, 1.0, -450], [470, 1.0, -365], [330, 1.0, -405]] }
  ],
  districts: [
    {
      id: 'concept-liberty-battery', name: 'Liberty Island + Battery Park·概念入口', borough: '自由港', position: [-145, 0, 590], size: [520, 4, 185], color: 0xd7c49c, accent: 0xd9a847, importance: 1, density: 'civic-low', labelTier: 'district',
      boundary: [[-515, 2, 575], [20, 2, 520], [58, 2, 645], [-430, 2, 720]],
      grid: { rows: 2, cols: 5, minHeight: 8, maxHeight: 30, fabric: 'harbor-civic', palette: [0xd7d3c8, 0xe7e1d5, 0xcfc7b7], avoid: [[-430, 640, 95], [-18, 552, 92]] },
      role: '微分方程城市的登陆入口：先理解未知函数、导数、阶、通解、特解和初始条件。',
      math: ['微分方程及其阶', '常微分方程', '线性微分方程', '解', '通解', '初始条件与特解'],
      cityMeaning: '自由女神像不再接在大陆上，而是作为独立概念火炬岛，用渡轮线接入 Battery Park。'
    },
    {
      id: 'first-order-soho', name: 'SoHo / Greenwich·一阶方程方法街区', borough: '曼哈顿下城', position: [-10, 0, 345], size: [240, 4, 240], color: 0xb8c7b5, accent: 0x5f9f72, importance: 3, density: 'medium', labelTier: 'district',
      boundary: [[-126, 2, 225], [114, 2, 220], [98, 2, 470], [-92, 2, 500], [-124, 2, 380]],
      grid: { rows: 6, cols: 7, minHeight: 24, maxHeight: 70, fabric: 'soho-brick', palette: [0xa86e5a, 0xb48264, 0x9b7767, 0xc9b099], avoid: [[54, 362, 82], [-42, 314, 72], [-92, 414, 58]] },
      role: '一阶微分方程是基础街区，方法多、街巷多、入口清楚，但高度不压过中城核心。',
      math: ['可分离变量型', '换元后可分离', '齐次型', '一阶线性', '伯努利方程', '全微分方程'],
      cityMeaning: '以 SoHo 红砖、街角楼和方法街为视觉语言，避免一阶区变成抽象节点。'
    },
    {
      id: 'reduction-chelsea', name: 'Chelsea / High Line·可降阶工业区', borough: '曼哈顿西侧', position: [-96, 0, 112], size: [125, 4, 250], color: 0xc5aa87, accent: 0x9a6d4a, importance: 4, density: 'industrial', labelTier: 'district',
      boundary: [[-156, 2, -12], [-36, 2, -8], [-34, 2, 240], [-122, 2, 292], [-160, 2, 140]],
      grid: { rows: 5, cols: 3, minHeight: 24, maxHeight: 78, fabric: 'chelsea-factory', palette: [0xa58f76, 0x9d8064, 0x857a70, 0xc0a077], avoid: [[-126, 132, 62], [-102, 62, 70]] },
      role: "把二阶问题通过 p=y' 加工成一阶问题，核心不是套路，而是变量角色转换。",
      math: ["p=y'", '缺 y：p=p(x)', '缺 x：p=p(y)', "y''=p dp/dy", '二阶下降平台'],
      cityMeaning: '用 Chelsea 工厂、高线、传送带、电梯平台表达“阶数下降”。'
    },
    {
      id: 'linear-midtown', name: 'Midtown / Times Square·高阶线性核心区', borough: '曼哈顿中城', position: [28, 0, -92], size: [255, 4, 320], color: 0xaeb8c2, accent: 0x5f78a8, importance: 5, density: 'high', labelTier: 'district',
      boundary: [[-88, 2, -252], [142, 2, -270], [156, 2, 72], [-74, 2, 64]],
      grid: { rows: 9, cols: 6, minHeight: 72, maxHeight: 240, fabric: 'midtown-highrise', palette: [0xbfc5c9, 0xd6d8d9, 0xaeb8c2, 0xc7c9c4, 0x9da7b0], avoid: [[28, -98, 86], [-46, -35, 64], [88, -32, 62], [76, 64, 80]] },
      skyline: { primary: [28, -98], secondary: [76, 64], primaryRadius: 150, secondaryRadius: 115 },
      role: '全城最高、最密、最重要。高阶线性方程必须占据曼哈顿中城与时代广场核心。',
      math: ['二阶常系数齐次线性微分方程', '二阶常系数非齐次线性微分方程', 'n 阶常系数齐次线性微分方程', '线性解结构', '特征方程', '不等实根', '重根', '复根', '欧拉方程'],
      cityMeaning: '特征方程中央塔压住全城；齐次解结构和非齐次特解形成中城主次核心。'
    },
    {
      id: 'geometry-central-park', name: 'Central Park·几何应用区', borough: '曼哈顿公园', position: [-8, 0, -380], size: [185, 4, 260], color: 0x8fb98c, accent: 0x43a47b, importance: 3, density: 'park', labelTier: 'district',
      boundary: [[-100, 2, -510], [86, 2, -510], [86, 2, -250], [-100, 2, -250]],
      grid: { rows: 2, cols: 3, minHeight: 4, maxHeight: 12, fabric: 'park-scenic', palette: [0x8fb98c, 0xa7c99d, 0x6fa46e], avoid: [[-8, -380, 130], [-42, -375, 72]] },
      role: '中央公园是唯一允许的大空地，用轨迹、切线、道路和湖面承载几何应用。',
      math: ['切线方向', '曲线轨迹', '自行车后轮轨迹模型'],
      cityMeaning: '空地必须有数学职责：这里不是空白，而是曲线轨迹训练场。'
    },
    {
      id: 'physics-east-river', name: 'East River Piers·物理应用码头', borough: '东河水岸', position: [165, 0, 92], size: [110, 4, 360], color: 0x9fbfc4, accent: 0x4d8c93, importance: 3, density: 'waterfront', labelTier: 'district',
      boundary: [[112, 2, -80], [230, 2, -100], [230, 2, 282], [116, 2, 300]],
      grid: { rows: 5, cols: 2, minHeight: 12, maxHeight: 55, fabric: 'pier-lab', palette: [0xb9c0ba, 0xd0c3a8, 0xc7beb0], avoid: [[172, 172, 82], [180, 8, 72]] },
      role: '现实物理建模接口，码头、跑道、实验塔把速度、阻力、温度差翻译成变化率方程。',
      math: ['飞机减速模型', '牛顿冷却模型', '速度、阻力、变化率、初始条件建模'],
      cityMeaning: '物理应用不靠高楼，而靠真实场景。'
    },
    {
      id: 'risk-governors', name: 'Governors Island·风险训练场', borough: '总督岛', position: [300, 0, 650], size: [250, 4, 165], color: 0xc66d55, accent: 0xff5d42, importance: 4, density: 'risk', labelTier: 'district',
      boundary: [[178, 2, 596], [282, 2, 552], [418, 2, 596], [432, 2, 684], [328, 2, 728], [210, 2, 698]],
      grid: { rows: 3, cols: 4, minHeight: 8, maxHeight: 28, fabric: 'risk-yard', palette: [0xb94a37, 0xc36d4b, 0x9f3d30], avoid: [[270, 642, 68], [342, 635, 62]] },
      role: '风险点独立成岛，红橙警戒，不污染主城中心视图。',
      math: ['除以零丢解', '对数绝对值', '常数合并错误', '初值定符号', '变量角色 p(x) 与 p(y) 混乱', '换元后定义域变化', '通解与特解混淆'],
      cityMeaning: '错误不是附属注释，而是需要独立训练的城市区域。'
    },
    {
      id: 'grey-difference', name: 'Grey Island·差分方程选学区', borough: '远景灰岛', position: [435, 0, -455], size: [210, 4, 150], color: 0xb9b9b3, accent: 0x777777, importance: 1, density: 'distant', labelTier: 'district',
      boundary: [[360, 2, -540], [510, 2, -560], [545, 2, -450], [470, 2, -365], [330, 2, -405]],
      grid: { rows: 2, cols: 3, minHeight: 8, maxHeight: 18, fabric: 'distant-low', palette: [0xb9b9b3, 0xc8c8c2, 0xa9adb0], avoid: [[430, -455, 58]] },
      role: '差分方程只作为数学三选学远景，数学一主城不深入。',
      math: ['差分方程'],
      cityMeaning: '低饱和远景岛，存在但不抢主线。'
    }
  ],
  plazas: [
    { id: 'battery-concept-landing', name: 'Battery Park 概念登陆广场', district: 'concept-liberty-battery', position: [-18, 0.8, 552], radius: 58, color: 0xe5d7b6, role: '从自由女神概念岛登陆，进入定义、阶、解与初值。', formula: 'F(x,y,y\',...,y⁽ⁿ⁾)=0' },
    { id: 'times-square-linear-core', name: 'Times Square 特征方程广场', district: 'linear-midtown', position: [28, 0.8, -98], radius: 46, color: 0xcfd7df, role: '高阶线性核心广场，汇聚特征方程、根型和线性解结构。', formula: 'r²+pr+q=0' },
    { id: 'central-park-trajectory-lawn', name: 'Central Park 轨迹草坪', district: 'geometry-central-park', position: [-8, 0.8, -380], radius: 88, color: 0x8fb98c, role: '唯一大空地，承载曲线轨迹、切线方向和自行车后轮轨迹。', formula: '切线方向 → dy/dx' },
    { id: 'governors-risk-yard', name: 'Governors Island 风险训练场', district: 'risk-governors', position: [300, 0.8, 650], radius: 62, color: 0xc66d55, role: '集中训练除零、绝对值、常数合并和初值符号。', formula: '除以前查零因子' }
  ],
  buildings: [
    { id: 'liberty-concept-torch', name: '自由女神·概念火炬', district: 'concept-liberty-battery', type: 'central-tower', position: [-430, 0, 640], size: [34, 118, 34], color: 0x8798a5, strongSymbol: true, role: '微分方程城市入口火炬，指出研究对象是未知函数与导数之间的关系。', formula: "F(x,y,y',...,y⁽ⁿ⁾)=0", cityMeaning: '自由女神像独立成岛，不再连着曼哈顿。' },
    { id: 'solution-triple-hall', name: '通解/特解三联馆', district: 'concept-liberty-battery', type: 'triple-hall', position: [-48, 0, 548], size: [92, 42, 34], color: 0xb7b4aa, role: '通解含独立常数，初始条件确定常数后得到特解。', formula: '通解 → 初值 → 特解', cityMeaning: 'Battery Park 的低矮概念馆。' },
    { id: 'linear-first-order-hall', name: '一阶线性馆', district: 'first-order-soho', type: 'hall', position: [54, 0, 362], size: [84, 82, 58], color: 0x9ca8ad, strongSymbol: true, role: '一阶方程区主地标，积分因子把左边补成乘积导数。', formula: "y' + p(x)y = q(x)", cityMeaning: 'SoHo 方法街区的主馆。' },
    { id: 'bernoulli-gate', name: '伯努利转换门', district: 'first-order-soho', type: 'gate', position: [-42, 0, 314], size: [86, 76, 48], color: 0x8b8396, strongSymbol: true, role: '通过换元把伯努利方程转成一阶线性方程。', formula: 'z = y^(1-n)', cityMeaning: '门的语义是非线性穿门后进入线性。' },
    { id: 'separable-street-hall', name: '可分离变量街馆', district: 'first-order-soho', type: 'street-hall', position: [-92, 0, 414], size: [74, 54, 46], color: 0xa86e5a, role: '把 x 与 y 分到两边积分，除法前检查零因子。', formula: 'dy/g(y)=f(x)dx', cityMeaning: '红砖街区里的基础方法馆。' },
    { id: 'exact-courtyard', name: '全微分庭院', district: 'first-order-soho', type: 'courtyard', position: [82, 0, 296], size: [70, 42, 52], color: 0xaab7a4, role: '判断是否存在势函数 u(x,y)。', formula: '∂P/∂y=∂Q/∂x', cityMeaning: '庭院表达势函数的整体场。' },
    { id: 'reduction-elevator', name: '可降阶总电梯', district: 'reduction-chelsea', type: 'elevator', position: [-126, 0, 132], size: [48, 138, 48], color: 0x8c7663, strongSymbol: true, role: "令 p=y'，把二阶高度下降到一阶平面。", formula: '二阶 → 一阶', cityMeaning: 'Chelsea 工业区的垂直下降装置。' },
    { id: 'missing-x-workshop', name: '缺 x 链式车间', district: 'reduction-chelsea', type: 'factory', position: [-102, 0, 62], size: [88, 72, 64], color: 0x9d8064, strongSymbol: true, role: '不显含 x 时，p 的自变量从 x 变成 y。', formula: "y''=p·dp/dy", cityMeaning: '链式车间表达变量角色改变。' },
    { id: 'missing-y-factory', name: '缺 y 厂房', district: 'reduction-chelsea', type: 'factory', position: [-132, 0, 205], size: [80, 54, 58], color: 0xa58f76, role: '不显含 y 时令 p=y′，得到关于 p(x) 的一阶方程。', formula: "p=y'", cityMeaning: '工业转换区的基础厂房。' },
    { id: 'characteristic-tower', name: '特征方程中央塔', district: 'linear-midtown', type: 'central-tower', position: [28, 0, -98], size: [64, 290, 64], color: 0x9eabb8, strongSymbol: true, role: '高阶线性核心地标，把微分问题压缩为代数特征方程。', formula: 'r²+pr+q=0', cityMeaning: 'Times Square 中央塔，全城最高。' },
    { id: 'linear-structure-building', name: '线性解结构大楼', district: 'linear-midtown', type: 'stepped', position: [-54, 0, -142], size: [54, 150, 50], color: 0xb8c0c8, strongSymbol: true, role: '线性方程先看解空间结构，再组合通解。', formula: 'y=C₁y₁+C₂y₂', cityMeaning: '高阶线性区的结构骨架楼。' },
    { id: 'repeated-root-tower', name: '重根退台塔', district: 'linear-midtown', type: 'stepped', position: [-46, 0, -35], size: [56, 198, 56], color: 0xa6afb8, strongSymbol: true, role: '重根必须引入 x 因子生成新的线性无关解。', formula: '(C₁+C₂x)e^(rx)', cityMeaning: '退台表达重根层层展开。' },
    { id: 'complex-root-spiral', name: '复根旋转塔', district: 'linear-midtown', type: 'spiral', position: [88, 0, -32], size: [58, 178, 58], color: 0xa4a0b7, strongSymbol: true, role: '复根对应指数衰增和三角振荡。', formula: 'e^(αx)(cosβx+sinβx)', cityMeaning: '旋转塔表现三角函数振荡。' },
    { id: 'nonhomogeneous-factory', name: '非齐次特解工厂', district: 'linear-midtown', type: 'factory', position: [76, 0, 64], size: [104, 92, 66], color: 0xa8b3bb, strongSymbol: true, role: '非齐次通解由齐次通解与一个特解叠加。', formula: 'y=y_h+y_p', cityMeaning: '中城次核心，和齐次结构分开但连接。' },
    { id: 'euler-bridge-entry', name: '欧拉桥入口', district: 'linear-midtown', type: 'bridgehead', position: [116, 0, 116], size: [50, 70, 50], color: 0xb9aa86, role: '欧拉方程通过 x=e^t 接入常系数线性体系。', formula: 'x=e^t', cityMeaning: '连接特殊幂结构和常系数核心。' },
    { id: 'bike-trajectory-hall', name: '自行车后轮轨迹馆', district: 'geometry-central-park', type: 'trajectory', position: [-42, 0, -375], size: [80, 38, 55], color: 0x8ba49f, strongSymbol: true, role: '后轮 Q 的切线方向始终指向前轮 P。', formula: 'Q切线指向P', cityMeaning: '中央公园曲线路径上的几何应用馆。' },
    { id: 'airplane-runway', name: '飞机减速跑道', district: 'physics-east-river', type: 'runway', position: [180, 0, 8], size: [128, 18, 24], color: 0x717b82, role: '速度方向与阻力方向相反，建立变化率方程。', formula: 'm dv/dt=-kv', cityMeaning: '东河码头的现实建模跑道。' },
    { id: 'cooling-lab-tower', name: '牛顿冷却实验塔', district: 'physics-east-river', type: 'cooling', position: [172, 0, 172], size: [56, 116, 56], color: 0x8aa099, strongSymbol: true, role: '温度曲线指数逼近环境温度，初值决定常数。', formula: 'T=T₀+Ce^(-kt)', cityMeaning: '物理应用区的实验塔。' },
    { id: 'zero-loss-pit', name: '除零丢解坑', district: 'risk-governors', type: 'pit', position: [270, 0, 642], size: [72, 34, 72], color: 0xb94a37, strongSymbol: true, role: '分离变量、伯努利、变量替换中，除法前必须检查零因子是否给出解。', formula: '除以前查零因子', cityMeaning: '风险岛核心坑。' },
    { id: 'absolute-value-gate', name: '绝对值门', district: 'risk-governors', type: 'gate', position: [342, 0, 635], size: [70, 48, 40], color: 0xc36d4b, role: '对数绝对值不能随手省略，初值会进一步确定符号。', formula: '∫du/u=ln|u|+C', cityMeaning: '风险岛警戒门。' },
    { id: 'difference-distant-hall', name: '差分方程远景馆', district: 'grey-difference', type: 'hall', position: [430, 0, -455], size: [80, 34, 50], color: 0xa9adb0, role: '差分方程只作为数学三选学远景，不进入数学一主城。', formula: 'yₙ₊₁+a yₙ=f(n)', cityMeaning: '低饱和远景建筑。' }
  ],
  roads: [
    { id: 'zhangyu-main-avenue', name: '张宇主线大道', width: 11, color: 0x3e4852, role: '概念→一阶→可降阶→高阶线性→几何/物理应用的主学习路径。', formula: '概念 → 一阶 → 可降阶 → 高阶线性 → 应用', points: [[-430, 0.8, 640], [-18, 0.8, 552], [-10, 0.8, 345], [-126, 0.8, 132], [28, 0.8, -98], [-8, 0.8, -380], [172, 0.8, 172]] },
    { id: 'manhattan-avenue-grid', name: '曼哈顿南北大道', width: 7, color: 0x515a62, role: '主岛街区骨架，不再出现无意义大空地。', formula: '街区肌理承载知识区边界', points: [[-52, 0.9, -585], [-62, 0.9, -360], [-58, 0.9, -120], [-36, 0.9, 160], [-18, 0.9, 520]] },
    { id: 'high-line-reduction-road', name: 'High Line 降阶转换线', width: 7, color: 0x8b7357, role: 'Chelsea 可降阶工业区接入中城高阶核心。', formula: "p=y'", points: [[-145, 0.9, 190], [-96, 0.9, 112], [-20, 0.9, 42], [28, 0.9, -98]] },
    { id: 'central-park-trajectory-road', name: '中央公园轨迹路', width: 5, color: 0x4b8f7e, role: '几何应用中的曲线轨迹和切线方向。', formula: '轨迹 → 切线 → dy/dx', points: [[-82, 0.9, -420], [-42, 0.9, -350], [20, 0.9, -384], [74, 0.9, -308]] },
    { id: 'east-river-pier-road', name: '东河码头路', width: 9, color: 0x6f7b82, role: '物理应用区的现实场景道路。', formula: '现实关系 → 变化率方程', points: [[136, 0.9, -40], [230, 0.9, -34], [224, 0.9, 220], [138, 0.9, 282]] },
    { id: 'risk-warning-road', name: '风险警戒环线', width: 8, color: 0x9d4b39, role: '风险岛内的错误训练路径。', formula: '除零 / 绝对值 / 常数 / 初值', points: [[230, 0.9, 620], [270, 0.9, 642], [342, 0.9, 635], [382, 0.9, 682], [292, 0.9, 704], [230, 0.9, 620]] }
  ],
  bridges: [
    { id: 'battery-liberty-ferry', name: 'Battery Ferry 概念渡轮线', type: 'bridge', width: 8, color: 0xe8eff2, role: '从 Liberty Island 的概念火炬渡到 Battery Park 概念入口。', formula: '概念入城', points: [[-430, 1.2, 640], [-250, 1.2, 600], [-65, 1.2, 560]] },
    { id: 'euler-bridge', name: '欧拉跨江大桥', type: 'suspension', width: 12, color: 0xb9aa86, role: '欧拉方程通过 x=e^t 转为常系数线性方程，接入中城核心。', formula: 'x=e^t', points: [[116, 1.2, 116], [160, 1.2, 72], [210, 1.2, 20]] },
    { id: 'modeling-pier-bridge', name: '应用建模码头桥', type: 'bridge', width: 10, color: 0x9fbfc4, role: '现实关系进入微分方程建模。', formula: '现实关系 → dy/dx 或 dv/dt', points: [[110, 1.2, 120], [150, 1.2, 90], [190, 1.2, 70]] }
  ],
  metro: [
    { id: 'blue-main-line', name: '蓝线：章节主线', color: 0x2d79d8, points: [[-430, 8, 640], [-18, 8, 552], [-10, 8, 345], [-126, 8, 132], [28, 8, -98], [-8, 8, -380], [172, 8, 172]] },
    { id: 'green-substitution-line', name: '绿线：换元/降阶线', color: 0x29b06f, points: [[-42, 8, 314], [54, 8, 362], [-126, 8, 132], [28, 8, -98]] },
    { id: 'purple-linearization-line', name: '紫线：线性化线', color: 0x8b5cf6, points: [[-42, 8, 314], [54, 8, 362], [28, 8, -98], [76, 8, 64]] },
    { id: 'orange-application-line', name: '橙线：应用建模线', color: 0xf59e0b, points: [[-8, 8, -380], [70, 8, -250], [172, 8, 172]] },
    { id: 'red-risk-line', name: '红线：风险提醒线', color: 0xef4444, points: [[270, 8, 642], [342, 8, 635], [-92, 8, 414], [-102, 8, 62]] }
  ]
};
