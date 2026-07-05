export const cityData = {
  meta: {
    title: '张宇第15讲 微分方程知识城市 V6',
    version: 'V6.0.7 城市建模重构版',
    goal: '先让它像一座城市，再把微分方程知识嵌入城市基础设施。',
    principle: '城市第一，知识第二层嵌入。'
  },
  water: {
    river: {
      id: 'differential-river',
      name: '微分河',
      role: '变化率关系的主水系，分割概念/一阶、核心高阶线性与应用建模。',
      width: 46,
      points: [[-760, 0, -250], [-520, 0, -228], [-310, 0, -205], [-125, 0, -165], [70, 0, -110], [300, 0, -42], [520, 0, 36], [770, 0, 120]]
    },
    bay: {
      id: 'application-bay-water',
      name: '应用海湾水面',
      role: '现实建模接口，几何与物理应用从这里接入主城。',
      center: [650, 0, 175],
      radius: [230, 175]
    }
  },
  districts: [
    {
      id: 'entrance-harbor',
      name: '入口港·概念广场',
      borough: '入口港',
      position: [-560, 0, 170],
      size: [280, 10, 220],
      color: 0xdfeefa,
      accent: 0x4d96db,
      importance: 1,
      density: 'low',
      labelTier: 'far',
      grid: { rows: 2, cols: 3, minHeight: 10, maxHeight: 32, color: 0x9fc8ee, avoid: [[-560, 170, 90]] },
      role: '概念入口，低矮、开阔、清晰，像进入城市前的港口广场。',
      math: ['微分方程及其阶', '常微分方程', '线性微分方程', '微分方程的解', '通解', '初始条件与特解'],
      cityMeaning: '先建立入城证件：这座城研究未知函数与导数之间的关系。'
    },
    {
      id: 'queens-first-order',
      name: '皇后·一阶方程区',
      borough: '皇后',
      position: [-360, 0, -70],
      size: [390, 10, 330],
      color: 0xd9ecff,
      accent: 0x2fa8df,
      importance: 3,
      density: 'medium',
      labelTier: 'far',
      grid: { rows: 4, cols: 5, minHeight: 18, maxHeight: 64, color: 0x8fd3f4, avoid: [[-260, -95, 80], [-430, 5, 70]] },
      role: '大面积基础生活区，方法多、街区多、道路清楚，是后续转化的落脚点。',
      math: ['可分离变量型', '换元后可分离', '齐次型', '一阶线性', '伯努利方程', '全微分方程'],
      cityMeaning: '一阶方程不是一个点，而是基础城区；每类方法应像一条街或一个小区。'
    },
    {
      id: 'brooklyn-reduction',
      name: '布鲁克林·可降阶工业区',
      borough: '布鲁克林',
      position: [35, 0, 190],
      size: [350, 10, 255],
      color: 0xe8e0d5,
      accent: 0xb47a47,
      importance: 4,
      density: 'industrial',
      labelTier: 'far',
      grid: { rows: 3, cols: 4, minHeight: 26, maxHeight: 82, color: 0xc39262, avoid: [[-20, 170, 80], [170, 220, 80]] },
      role: '工业转换区，把二阶问题通过变量角色改变加工成一阶问题。',
      math: ['p=y\'', '缺 y：p=p(x)', '缺 x：p=p(y)', 'y\'\'=p dp/dy', '二阶下降平台'],
      cityMeaning: '这里的重点不是套路，而是研究对象从 y 变为 p。'
    },
    {
      id: 'manhattan-linear',
      name: '曼哈顿·高阶线性核心岛',
      borough: '曼哈顿',
      position: [170, 0, -130],
      size: [330, 12, 380],
      color: 0xd5e4f5,
      accent: 0x2f67c5,
      importance: 5,
      density: 'high',
      labelTier: 'far',
      grid: { rows: 6, cols: 5, minHeight: 48, maxHeight: 170, color: 0x6f8fc9, avoid: [[180, -180, 95], [250, -70, 80], [110, -70, 80]] },
      role: '最难、最重要、最高密度的核心岛，形成全城天际线。',
      math: ['线性解结构', '特征方程', '不等实根', '重根', '复根', '非齐次特解', '欧拉方程入口'],
      cityMeaning: '抽象层级越高，楼越高；特征方程中央塔必须压住全城。'
    },
    {
      id: 'application-bay',
      name: '应用海湾·现实建模码头',
      borough: '应用海湾',
      position: [535, 0, 120],
      size: [345, 10, 275],
      color: 0xd9f0ef,
      accent: 0x2fa894,
      importance: 3,
      density: 'scenic',
      labelTier: 'far',
      grid: { rows: 2, cols: 4, minHeight: 12, maxHeight: 54, color: 0x79c7b7, avoid: [[560, 125, 120], [455, 85, 90], [630, 40, 80]] },
      role: '现实世界接口，应用题在这里被翻译成变化率关系。',
      math: ['几何应用', '切线方向', '自行车后轮轨迹', '飞机减速模型', '牛顿冷却模型'],
      cityMeaning: '应用区不靠高度取胜，靠码头、跑道、轨迹线、实验塔的场景辨识。'
    },
    {
      id: 'red-hook-risk',
      name: '红钩·风险训练场',
      borough: '红钩',
      position: [-10, 0, -370],
      size: [315, 10, 165],
      color: 0xffe4d8,
      accent: 0xe24a2f,
      importance: 2,
      density: 'warning',
      labelTier: 'far',
      grid: { rows: 1, cols: 5, minHeight: 8, maxHeight: 28, color: 0xff8b6e, avoid: [[-10, -370, 160]] },
      role: '独立错误风险区，不污染主城中心，但必须随时可见。',
      math: ['除以零丢解', '对数绝对值', '常数合并错误', '初值定符号', '变量角色混乱', '换元定义域变化'],
      cityMeaning: '错误不是附属说明，而是独立训练场。'
    },
    {
      id: 'grey-island-difference',
      name: '灰岛·差分方程选学区',
      borough: '灰岛',
      position: [650, 0, -300],
      size: [205, 10, 135],
      color: 0xd8d8d8,
      accent: 0x9ca3af,
      importance: 1,
      density: 'distant',
      labelTier: 'far',
      grid: { rows: 1, cols: 2, minHeight: 8, maxHeight: 18, color: 0xbfc4cc },
      role: '数学三选学远景岛，数学一主线暂不深入。',
      math: ['差分方程'],
      cityMeaning: '放在远景，提醒边界，不抢主城视线。'
    }
  ],
  plazas: [
    { id: 'concept-square', name: '概念广场', district: 'entrance-harbor', position: [-560, 0, 170], radius: 76, color: 0xf7fbff, role: '入城开阔地，承载定义、阶、解与初值。' },
    { id: 'linear-civic-core', name: '曼哈顿线性核心广场', district: 'manhattan-linear', position: [180, 0, -180], radius: 88, color: 0xeaf2ff, role: '特征方程中央塔周围的核心广场。' },
    { id: 'risk-yard', name: '风险警戒训练场', district: 'red-hook-risk', position: [-10, 0, -370], radius: 62, color: 0xffc7b8, role: '错误点集中训练场。' }
  ],
  buildings: [
    { id: 'de-monument', district: 'entrance-harbor', name: '微分方程纪念碑', type: 'obelisk', position: [-600, 0, 170], size: [38, 92, 38], color: 0x5ba0e5, labelTier: 'landmark', formula: 'F(x,y,y\',...,y⁽ⁿ⁾)=0', role: '定义整座城市：未知函数与导数之间的关系。', risks: ['只看成计算题，会失去变化率关系的本质。'] },
    { id: 'order-tower', district: 'entrance-harbor', name: '阶塔', type: 'stepped-tower', position: [-655, 0, 120], size: [42, 82, 42], color: 0x7bb4e8, labelTier: 'landmark', formula: '阶=最高阶导数', role: '判断微分方程层级，决定解结构复杂度。' },
    { id: 'solution-hall', district: 'entrance-harbor', name: '通解/特解三联馆', type: 'triple-hall', position: [-535, 0, 205], size: [112, 44, 52], color: 0x9fc8ee, labelTier: 'mid', formula: '通解→初值→特解', role: '一般解族通过初始条件收缩为具体解。' },
    { id: 'initial-checkpoint', district: 'entrance-harbor', name: '初始条件检查站', type: 'checkpoint', position: [-485, 0, 125], size: [64, 34, 42], color: 0x81b8e8, labelTier: 'mid', formula: 'y(x₀)=y₀', role: '初值不只是代数代入，还约束符号、定义域与常数。' },

    { id: 'separable-street', district: 'queens-first-order', name: '可分离变量街', type: 'street-hall', position: [-455, 0, -145], size: [82, 56, 58], color: 0x6fb0e8, labelTier: 'mid', formula: 'dy/g(y)=f(x)dx', role: '将 x 与 y 的关系拆到两侧积分。', risks: ['除以 g(y) 前先检查 g(y)=0 的常值解。'] },
    { id: 'homogeneous-slope', district: 'queens-first-order', name: '齐次斜率坡区', type: 'slope-hall', position: [-355, 0, -135], size: [88, 52, 62], color: 0x77c0d8, labelTier: 'mid', formula: 'u=y/x', role: '当斜率只由 y/x 决定时，用 y=ux 把比例关系变成可分离。' },
    { id: 'linear-first-order', district: 'queens-first-order', name: '一阶线性馆', type: 'machine-hall', position: [-255, 0, -95], size: [86, 94, 72], color: 0x4f91dc, labelTier: 'landmark', formula: 'y\'+p(x)y=q(x)', role: '积分因子把左边补成乘积导数。', risks: ['p(x)、q(x) 必须是 x 的函数，不能把变量角色混乱。'] },
    { id: 'bernoulli-gate', district: 'queens-first-order', name: '伯努利转换门', type: 'gate', position: [-430, 0, 18], size: [90, 86, 58], color: 0x9b7ee8, labelTier: 'landmark', formula: 'z=y^(1-n)', role: '非线性通过换元进入一阶线性体系。', risks: ['除以 yⁿ 前要检查 y=0 是否被丢掉。'] },
    { id: 'exact-courtyard', district: 'queens-first-order', name: '全微分庭院', type: 'courtyard', position: [-315, 0, 42], size: [98, 42, 76], color: 0x79c7a7, labelTier: 'mid', formula: 'Pdx+Qdy=du', role: '把方程识别为势函数的全微分，解为 u=C。' },
    { id: 'substitution-market', district: 'queens-first-order', name: '换元集市', type: 'market', position: [-515, 0, -15], size: [84, 42, 58], color: 0x5fc7d8, labelTier: 'mid', formula: '换元后可分离', role: '一阶方程中许多“非标准”结构要先换元再落回基础街区。' },

    { id: 'reduction-elevator', district: 'brooklyn-reduction', name: '可降阶总电梯', type: 'elevator', position: [-20, 0, 170], size: [58, 150, 58], color: 0xb07d58, labelTier: 'landmark', formula: '二阶→一阶', role: '把研究对象从 y 改成 p=y\'，让高度下降。' },
    { id: 'missing-y-factory', district: 'brooklyn-reduction', name: '缺 y 厂房', type: 'factory', position: [78, 0, 175], size: [92, 68, 78], color: 0xc39262, labelTier: 'mid', formula: 'p=p(x), y\'\'=p\'', role: '不显含 y 时，把 p 看成 x 的函数。' },
    { id: 'missing-x-workshop', district: 'brooklyn-reduction', name: '缺 x 链式车间', type: 'chain-workshop', position: [178, 0, 222], size: [98, 76, 66], color: 0xc98954, labelTier: 'mid', formula: 'y\'\'=p dp/dy', role: '不显含 x 时，把 p 看成 y 的函数，这是最容易错的变量角色转换。' },
    { id: 'role-tower', district: 'brooklyn-reduction', name: '变量角色塔', type: 'warning-tower', position: [70, 0, 270], size: [48, 98, 48], color: 0xb76b45, labelTier: 'mid', formula: 'p(x) ↔ p(y)', role: '专门提醒 p 的自变量不是固定的。' },
    { id: 'second-order-drop-platform', district: 'brooklyn-reduction', name: '二阶下降平台', type: 'drop-platform', position: [-95, 0, 235], size: [105, 36, 62], color: 0xd0a273, labelTier: 'mid', formula: '高度下降：y\'\' → p\'', role: '用城市高差表达二阶降一阶。' },

    { id: 'linear-structure-building', district: 'manhattan-linear', name: '线性解结构大楼', type: 'skyscraper', position: [92, 0, -222], size: [56, 145, 58], color: 0x6f8fc9, labelTier: 'landmark', formula: 'y=C₁y₁+C₂y₂', role: '线性方程的核心是解空间结构，而不是孤立公式。' },
    { id: 'characteristic-tower', district: 'manhattan-linear', name: '特征方程中央塔', type: 'central-tower', position: [180, 0, -180], size: [72, 240, 72], color: 0x2f67c5, labelTier: 'landmark', formula: 'r²+pr+q=0', role: '指数试探把微分问题压缩为代数问题，全城最高地标。' },
    { id: 'distinct-real-root-twins', district: 'manhattan-linear', name: '不等实根双塔', type: 'twin-tower', position: [268, 0, -232], size: [62, 162, 48], color: 0x5780d8, labelTier: 'mid', formula: 'r₁≠r₂', role: '两个不同实根给出两条线性无关指数解。' },
    { id: 'repeated-root-tower', district: 'manhattan-linear', name: '重根摩天楼', type: 'stepped-skyscraper', position: [112, 0, -74], size: [62, 188, 62], color: 0x476ab0, labelTier: 'landmark', formula: '(C₁+C₂x)e^(rx)', role: '重根不能重复写同一个解，必须生成新的线性无关解。' },
    { id: 'complex-root-spiral', district: 'manhattan-linear', name: '复根旋转塔', type: 'spiral-tower', position: [252, 0, -76], size: [62, 176, 62], color: 0x7b67c9, labelTier: 'landmark', formula: 'e^(αx)(cosβx+sinβx)', role: '复根带来指数衰增与三角振荡，视觉上用螺旋表达。' },
    { id: 'nonhomogeneous-factory', district: 'manhattan-linear', name: '非齐次特解工厂', type: 'factory', position: [185, 0, 22], size: [104, 106, 64], color: 0x5a9bd5, labelTier: 'landmark', formula: 'y=y_h+y_p', role: '非齐次通解由齐次通解与一个特解叠加。' },
    { id: 'undetermined-lab', district: 'manhattan-linear', name: '待定系数实验楼', type: 'lab', position: [268, 0, 18], size: [82, 90, 58], color: 0x4d85c8, labelTier: 'mid', formula: '按 f(x) 设特解', role: '待定系数法服务于常系数非齐次方程。' },
    { id: 'euler-bridge-entry', district: 'manhattan-linear', name: '欧拉桥入口塔', type: 'bridgehead', position: [328, 0, -28], size: [56, 108, 52], color: 0x6a7fd4, labelTier: 'mid', formula: 'x=e^t', role: '欧拉方程接入常系数线性体系的入口。' },

    { id: 'geometry-dock', district: 'application-bay', name: '几何应用码头', type: 'dock', position: [420, 0, 170], size: [96, 36, 56], color: 0x57b7a5, labelTier: 'mid', formula: '切线方向→dy/dx', role: '把几何切线关系翻译为导数关系。' },
    { id: 'bike-trajectory-hall', district: 'application-bay', name: '自行车轨迹馆', type: 'trajectory-hall', position: [455, 0, 85], size: [86, 68, 66], color: 0x57b7a5, labelTier: 'landmark', formula: 'Q切线指向P', role: '后轮轨迹的切线方向始终指向前轮位置。' },
    { id: 'airplane-runway', district: 'application-bay', name: '飞机减速跑道', type: 'runway', position: [565, 0, 128], size: [142, 24, 38], color: 0x9db8c9, labelTier: 'landmark', formula: 'm dv/dt=-kv', role: '速度方向与阻力方向相反，变化率模型来自牛顿第二定律。' },
    { id: 'cooling-lab-tower', district: 'application-bay', name: '牛顿冷却实验塔', type: 'cooling-tower', position: [632, 0, 42], size: [58, 132, 58], color: 0x47a88d, labelTier: 'landmark', formula: 'T=T₀+Ce^(-kt)', role: '温度曲线指数逼近环境温度。' },
    { id: 'modeling-customs', district: 'application-bay', name: '现实关系海关', type: 'checkpoint', position: [520, 0, 12], size: [76, 42, 48], color: 0x6bc7ba, labelTier: 'mid', formula: '现实关系→变化率方程', role: '应用题的第一步是翻译，不是套公式。' },

    { id: 'zero-loss-pit', district: 'red-hook-risk', name: '除零丢解坑', type: 'risk-pit', position: [-120, 0, -370], size: [54, 24, 54], color: 0xe24a2f, labelTier: 'mid', formula: '除以前查零因子', role: '分离变量、伯努利等过程最容易在除法中丢解。' },
    { id: 'absolute-value-gate', district: 'red-hook-risk', name: '绝对值门', type: 'risk-gate', position: [-55, 0, -335], size: [64, 50, 42], color: 0xff8b44, labelTier: 'mid', formula: '∫du/u=ln|u|+C', role: '对数绝对值不能随手省略。' },
    { id: 'constant-merge-station', district: 'red-hook-risk', name: '常数合并站', type: 'risk-station', position: [15, 0, -372], size: [70, 40, 46], color: 0xf05252, labelTier: 'mid', formula: 'C 合并有条件', role: '常数合并不能破坏符号、定义域和解的范围。' },
    { id: 'initial-sign-checkpoint', district: 'red-hook-risk', name: '初值定符号检查点', type: 'checkpoint', position: [85, 0, -338], size: [72, 42, 46], color: 0xff6b4a, labelTier: 'mid', formula: '初值决定分支', role: '初始条件会决定符号、常数和定义区间。' },
    { id: 'substitution-domain-warning', district: 'red-hook-risk', name: '换元定义域警戒塔', type: 'warning-tower', position: [120, 0, -405], size: [48, 72, 48], color: 0xc0392b, labelTier: 'mid', formula: '换元改变定义域', role: '换元不是免费操作，必须跟踪定义域与可逆性。' }
  ],
  roads: [
    { id: 'zhangyu-main-avenue', name: '张宇主线大道', kind: 'main', points: [[-640, 2, 170], [-455, 2, -20], [-40, 2, 150], [165, 2, -30], [330, 2, -10], [530, 2, 100]], color: 0xf5ead0, width: 18, role: '概念→一阶→可降阶→高阶线性→欧拉→应用' },
    { id: 'queens-grid-a', name: '皇后方法街 A', kind: 'street', points: [[-530, 2, -190], [-210, 2, -190]], color: 0xffffff, width: 8, role: '一阶方法横街' },
    { id: 'queens-grid-b', name: '皇后方法街 B', kind: 'street', points: [[-530, 2, -30], [-210, 2, -30]], color: 0xffffff, width: 8, role: '一阶方法横街' },
    { id: 'queens-grid-c', name: '皇后方法街 C', kind: 'street', points: [[-500, 2, -220], [-500, 2, 80]], color: 0xffffff, width: 7, role: '一阶方法纵街' },
    { id: 'queens-grid-d', name: '皇后方法街 D', kind: 'street', points: [[-360, 2, -220], [-360, 2, 80]], color: 0xffffff, width: 7, role: '一阶方法纵街' },
    { id: 'brooklyn-industrial-loop', name: '布鲁克林工业环路', kind: 'industrial', points: [[-115, 2, 110], [20, 2, 95], [190, 2, 145], [205, 2, 260], [20, 2, 300], [-110, 2, 250], [-115, 2, 110]], color: 0xd8c0a0, width: 12, role: '可降阶加工区交通环线' },
    { id: 'manhattan-cross-avenue', name: '曼哈顿核心大道', kind: 'main', points: [[75, 2, -265], [180, 2, -180], [285, 2, -40]], color: 0xe7eef8, width: 12, role: '高阶线性核心轴线' },
    { id: 'bay-boardwalk', name: '应用海湾木栈道', kind: 'boardwalk', points: [[395, 2, 180], [460, 2, 110], [560, 2, 125], [640, 2, 45], [680, 2, 145]], color: 0xd5b98f, width: 11, role: '应用建模场景串联' },
    { id: 'risk-warning-road', name: '风险警戒线', kind: 'warning', points: [[-145, 2, -370], [-55, 2, -335], [15, 2, -372], [85, 2, -338], [130, 2, -405]], color: 0xffa08a, width: 10, role: '风险点训练路线' }
  ],
  bridges: [
    { id: 'euler-bridge', name: '欧拉跨江大桥', kind: 'suspension', points: [[325, 16, -28], [380, 22, 16], [460, 16, 72]], color: 0xd8b16a, formula: 'x=e^t', role: '幂结构通过 x=e^t 接入常系数线性体系。' },
    { id: 'bernoulli-linear-bridge', name: '伯努利线性化桥', kind: 'beam', points: [[-430, 12, 18], [-345, 12, -25], [-255, 12, -95]], color: 0xa178ff, formula: 'z=y^(1-n)', role: '伯努利方程转入一阶线性馆。' },
    { id: 'reduction-first-order-bridge', name: '降阶回一阶桥', kind: 'beam', points: [[-20, 12, 170], [-185, 12, 70], [-315, 12, 42]], color: 0xc39262, formula: 'p=y\'', role: '可降阶工业区降到一阶方程基础区。' },
    { id: 'modeling-bridge', name: '现实建模桥', kind: 'beam', points: [[520, 12, 12], [430, 12, 45], [330, 12, -10]], color: 0x6bc7ba, formula: '现实关系→微分方程', role: '现实题从应用海湾进入主城方程结构。' }
  ],
  metro: [
    { id: 'blue-main-line', name: '蓝线：章节主线', points: [[-620, 8, 170], [-360, 8, -70], [35, 8, 190], [170, 8, -130], [535, 8, 120]], color: 0x2d79d8 },
    { id: 'green-substitution-line', name: '绿线：换元线', points: [[-515, 8, -15], [-430, 8, 18], [-255, 8, -95], [-20, 8, 170]], color: 0x29b06f },
    { id: 'purple-linearization-line', name: '紫线：线性化线', points: [[-430, 9, 18], [-255, 9, -95], [180, 9, -180], [328, 9, -28]], color: 0x8b5cf6 },
    { id: 'orange-modeling-line', name: '橙线：应用建模线', points: [[420, 8, 170], [455, 8, 85], [565, 8, 128], [632, 8, 42]], color: 0xf2a33b },
    { id: 'red-risk-line', name: '红线：风险提醒线', points: [[-120, 8, -370], [-55, 8, -335], [15, 8, -372], [85, 8, -338], [120, 8, -405]], color: 0xef4444 }
  ]
};
