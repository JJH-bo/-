export const cityData = {
  meta: {
    title: '张宇第15讲 微分方程知识城市 V6.3.1',
    version: 'V6.3.1 Manhattan Island Base',
    goal: '主城改为曼哈顿全岛，Liberty Island 承载概念入口，Governors Island 承载风险训练，Central Park 成为唯一大空地。',
    principle: '真实城市形态优先，知识作为第二层嵌入地标、道路、桥梁和夜景关系线。'
  },
  water: {
    river: { id: 'east-river-flow', name: 'East River 变化率水道', role: '东河表示未知函数随过程变化的变化率流动。', width: 44, points: [[115,0.4,-620],[150,0.4,-470],[175,0.4,-280],[184,0.4,-70],[176,0.4,140],[145,0.4,360],[76,0.4,600]] },
    bay: { id: 'upper-harbor-water', name: 'Upper Harbor 入口水域', role: '入口水域隔开主岛、概念岛和风险岛。', center: [-155,0.5,625], radius: [430,190] },
    harbor: { id: 'hudson-water', name: 'Hudson River 西岸水域', role: '哈德逊河强化曼哈顿的真实岛屿感。', center: [-410,0.55,-10], radius: [170,690] }
  },
  landMasses: [
    { id: 'manhattan-main', name: '曼哈顿主岛', district: 'manhattan-whole', color: 0xe3ded4, polygon: [[-118,1,-640],[65,1,-625],[112,1,-555],[145,1,-430],[160,1,-260],[154,1,-70],[140,1,110],[125,1,300],[94,1,485],[45,1,600],[-5,1,650],[-58,1,610],[-92,1,500],[-122,1,320],[-148,1,90],[-166,1,-150],[-164,1,-405],[-145,1,-555]] },
    { id: 'liberty-island', name: 'Liberty Island 概念岛', district: 'battery-concept', color: 0xd7c49c, polygon: [[-505,1,636],[-485,1,602],[-430,1,585],[-365,1,606],[-350,1,648],[-388,1,688],[-455,1,696],[-500,1,674]] },
    { id: 'governors-island', name: 'Governors Island 风险岛', district: 'red-hook-risk', color: 0xc66d55, polygon: [[182,1,620],[250,1,570],[345,1,580],[424,1,640],[390,1,720],[292,1,742],[205,1,700]] },
    { id: 'grey-island-land', name: 'Grey Island 差分选学岛', district: 'grey-island-difference', color: 0xb9b9b3, polygon: [[365,1,-560],[515,1,-585],[575,1,-482],[505,1,-382],[340,1,-410]] }
  ],
  districts: [
    { id: 'battery-concept', name: 'Battery Park 概念登陆口', borough: 'Battery Park', position: [-22,0,548], size: [150,4,136], color: 0xd7c49c, accent: 0xd9a84f, importance: 2, density: 'low', labelTier: 'district', boundary: [[-95,2,486],[56,2,482],[55,2,615],[-16,2,644],[-82,2,604]], grid: { rows: 2, cols: 4, minHeight: 8, maxHeight: 28, fabric: 'civic-low', palette: [0xd7d3c8,0xe7e1d5,0xcfc7b7], avoid: [[-38,548,72],[6,570,52]] }, role: '曼哈顿南端概念入口。', math: ['微分方程及其阶','常微分方程','线性微分方程','解','通解','初始条件与特解'], cityMeaning: '低矮开阔，像真正入城公园。' },
    { id: 'soho-first-order', name: 'SoHo Greenwich 一阶方程街区', borough: 'SoHo', position: [-18,0,335], size: [245,4,230], color: 0xb8c7b5, accent: 0x6f8fa6, importance: 3, density: 'medium', labelTier: 'district', boundary: [[-126,2,215],[105,2,215],[116,2,430],[82,2,486],[-86,2,500],[-136,2,430]], grid: { rows: 5, cols: 7, minHeight: 22, maxHeight: 68, fabric: 'soho-brick', palette: [0xa86e5a,0xb48264,0x9b7767,0xc49a7b], avoid: [[54,362,82],[-42,314,78],[-92,414,62],[76,292,58]] }, role: '一阶方法的中低层街区。', math: ['可分离变量','齐次型','一阶线性','伯努利方程','全微分方程'], cityMeaning: '街区承载方法，不做漂浮节点。' },
    { id: 'chelsea-reduction', name: 'Chelsea High Line 可降阶工业区', borough: 'Chelsea', position: [-103,0,112], size: [128,4,250], color: 0xc5aa87, accent: 0x9a6d4a, importance: 4, density: 'industrial', labelTier: 'district', boundary: [[-156,2,-10],[-56,2,-8],[-50,2,218],[-118,2,248],[-154,2,180]], grid: { rows: 5, cols: 3, minHeight: 24, maxHeight: 76, fabric: 'chelsea-warehouse', palette: [0xa58f76,0x9d8064,0x857a70,0xc0a077], avoid: [[-126,132,78],[-102,62,72],[-80,182,56]] }, role: '二阶可降阶的工业加工区。', math: ['p = y prime','缺 y 型','缺 x 型','变量角色转换'], cityMeaning: '厂房、电梯、平台表达降阶加工。' },
    { id: 'manhattan-linear', name: 'Midtown Times Square 高阶线性核心区', borough: 'Midtown', position: [28,0,-92], size: [255,4,315], color: 0xaeb8c2, accent: 0x59728f, importance: 5, density: 'high', labelTier: 'district', boundary: [[-90,2,-250],[135,2,-260],[150,2,35],[118,2,82],[-58,2,76],[-104,2,-55]], grid: { rows: 8, cols: 7, minHeight: 62, maxHeight: 210, fabric: 'midtown-tower', palette: [0xbfc5c9,0xd6d8d9,0xaeb8c2,0xc7c9c4], avoid: [[28,-98,112],[-46,-35,78],[88,-32,78],[76,64,84],[-54,-142,76]] }, skyline: { primary: [28,-98], secondary: [76,64], primaryRadius: 150, secondaryRadius: 118 }, role: '全城最高最密的高阶线性核心。', math: ['特征方程','不等实根','重根','复根','非齐次特解','欧拉方程'], cityMeaning: '最高天际线只给最重要内容。' },
    { id: 'central-park-geometry', name: 'Central Park 几何应用区', borough: 'Central Park', position: [-8,0,-380], size: [180,4,245], color: 0x8fb98c, accent: 0x4b8f7e, importance: 3, density: 'park', labelTier: 'district', boundary: [[-96,2,-500],[92,2,-500],[92,2,-268],[-96,2,-268]], grid: { rows: 1, cols: 1, minHeight: 0, maxHeight: 0, fabric: 'park', palette: [0x8fb98c], avoid: [[-8,-380,180]] }, role: '唯一大空地，承载切线与轨迹。', math: ['切线方向','曲线轨迹','自行车后轮轨迹'], cityMeaning: '空地必须有数学职责。' },
    { id: 'east-river-physics', name: 'East River Piers 物理应用码头', borough: 'East River', position: [158,0,92], size: [86,4,360], color: 0x9fbfc4, accent: 0x598a96, importance: 3, density: 'pier', labelTier: 'district', boundary: [[120,2,-80],[195,2,-72],[198,2,260],[118,2,274]], grid: { rows: 6, cols: 2, minHeight: 18, maxHeight: 56, fabric: 'pier', palette: [0xb9c0ba,0xd0c3a8,0xc7beb0], avoid: [[172,172,74],[150,8,92],[158,-38,70]] }, role: '飞机减速、牛顿冷却等现实建模接口。', math: ['飞机减速','牛顿冷却','速度阻力','初始条件建模'], cityMeaning: '应用区靠码头和跑道辨识，不靠高楼。' },
    { id: 'red-hook-risk', name: 'Governors Island 风险训练场', borough: 'Governors Island', position: [300,0,650], size: [240,4,150], color: 0xc66d55, accent: 0xb83b2b, importance: 4, density: 'risk', labelTier: 'district', boundary: [[182,2,620],[250,2,570],[345,2,580],[424,2,640],[390,2,720],[292,2,742],[205,2,700]], grid: { rows: 2, cols: 4, minHeight: 8, maxHeight: 28, fabric: 'risk-yard', palette: [0xb94a37,0xc36d4b,0xd28a67], avoid: [[270,642,64],[342,635,60]] }, role: '独立风险训练岛。', math: ['除零丢解','对数绝对值','常数合并','初值定符号'], cityMeaning: '风险独立成岛，不污染主城。' },
    { id: 'grey-island-difference', name: 'Grey Island 差分方程选学区', borough: 'Grey Island', position: [470,0,-480], size: [190,4,130], color: 0xb9b9b3, accent: 0x8d8f8d, importance: 1, density: 'remote', labelTier: 'district', boundary: [[365,2,-560],[515,2,-585],[575,2,-482],[505,2,-382],[340,2,-410]], grid: { rows: 2, cols: 3, minHeight: 8, maxHeight: 18, fabric: 'remote-low', palette: [0xa9adb0,0xb9b9b3,0x969a9b], avoid: [[430,-455,46]] }, role: '差分方程远景选学岛。', math: ['差分方程'], cityMeaning: '低饱和远景，不进入主城核心。' }
  ],
  plazas: [
    { id: 'battery-landing-plaza', name: 'Battery Park 概念登陆广场', district: 'battery-concept', position: [-38,2.6,548], radius: 48, color: 0xe3d4b6, role: '从自由岛进入主城的概念广场。' },
    { id: 'times-square-core', name: 'Times Square 特征方程广场', district: 'manhattan-linear', position: [28,2.6,-98], radius: 54, color: 0xd7dde1, role: '高阶线性核心广场。' },
    { id: 'high-line-platform', name: 'High Line 降阶平台', district: 'chelsea-reduction', position: [-126,2.6,132], radius: 34, color: 0xb69772, role: '降阶转换平台。' },
    { id: 'park-trajectory-lawn', name: 'Central Park 轨迹草坪', district: 'central-park-geometry', position: [-8,2.6,-380], radius: 58, color: 0x7dad7b, role: '几何轨迹草坪。' }
  ],
  buildings: [
    { id: 'liberty-concept-torch', name: '自由女神概念火炬', district: 'battery-concept', type: 'obelisk', position: [-430,2,640], size: [42,128,42], color: 0x8798a5, formula: 'F(x,y,y prime,...)=0', role: '微分方程研究未知函数与导数之间的关系。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'solution-triplet-hall', name: '通解特解三联馆', district: 'battery-concept', type: 'triple-hall', position: [-48,2,548], size: [96,42,36], color: 0xb7b4aa, formula: '通解 -> 初值 -> 特解', role: '区分通解、特解与初始条件。', strongSymbol: true },
    { id: 'linear-first-order', name: '一阶线性馆', district: 'soho-first-order', type: 'hall', position: [54,2,362], size: [86,82,58], color: 0x9ca8ad, formula: 'y prime + p(x)y = q(x)', role: '积分因子把左边补成乘积导数。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'bernoulli-gate', name: '伯努利转换门', district: 'soho-first-order', type: 'gate', position: [-42,2,314], size: [86,76,48], color: 0x8b8396, formula: 'z = y^(1-n)', role: '换元后转成一阶线性方程。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'separable-street-hall', name: '可分离变量街馆', district: 'soho-first-order', type: 'street-hall', position: [-92,2,414], size: [74,54,46], color: 0xa86e5a, formula: 'dy/g(y)=f(x)dx', role: '变量分离前检查零因子。', strongSymbol: true },
    { id: 'exact-courtyard', name: '全微分庭院', district: 'soho-first-order', type: 'courtyard', position: [76,2,292], size: [72,36,54], color: 0xaab7a4, formula: 'partial P/partial y = partial Q/partial x', role: '判断是否存在势函数。' },
    { id: 'reduction-elevator', name: '可降阶总电梯', district: 'chelsea-reduction', type: 'elevator', position: [-126,2,132], size: [50,138,50], color: 0x8c7663, formula: 'p = y prime', role: '把研究对象从 y 变为 p。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'missing-x-workshop', name: '缺 x 链式车间', district: 'chelsea-reduction', type: 'chain-workshop', position: [-102,2,62], size: [88,72,64], color: 0x9d8064, formula: 'y double prime = p dp/dy', role: '不显含 x 时令 p=p(y)。', strongSymbol: true },
    { id: 'characteristic-tower', name: '特征方程中央塔', district: 'manhattan-linear', type: 'central-tower', position: [28,2,-98], size: [64,290,64], color: 0x9eabb8, formula: 'r^2 + pr + q = 0', role: '全城最高核心，微分问题转为代数特征方程。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'linear-structure-building', name: '线性解结构大楼', district: 'manhattan-linear', type: 'skyscraper', position: [-54,2,-142], size: [54,150,50], color: 0xb8c0c8, formula: 'y = C1 y1 + C2 y2', role: '线性解空间结构。', strongSymbol: true },
    { id: 'repeated-root-tower', name: '重根退台塔', district: 'manhattan-linear', type: 'stepped-tower', position: [-46,2,-35], size: [56,198,56], color: 0xa6afb8, formula: '(C1+C2x)e^(rx)', role: '重根引入 x 因子。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'complex-root-spiral', name: '复根旋转塔', district: 'manhattan-linear', type: 'spiral-tower', position: [88,2,-32], size: [58,178,58], color: 0xa4a0b7, formula: 'e^(alpha x)(cos beta x + sin beta x)', role: '复根带来指数与三角振荡。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'nonhomogeneous-factory', name: '非齐次特解工厂', district: 'manhattan-linear', type: 'factory', position: [76,2,64], size: [104,92,66], color: 0xa8b3bb, formula: 'y = yh + yp', role: '齐次通解加一个非齐次特解。', strongSymbol: true },
    { id: 'geometry-pavilion', name: '几何应用亭', district: 'central-park-geometry', type: 'hall', position: [-42,2,-375], size: [54,38,38], color: 0x8ba49f, formula: '切线方向 -> dy/dx', role: '几何条件翻译成导数关系。', strongSymbol: true },
    { id: 'bike-trajectory-hall', name: '自行车轨迹馆', district: 'central-park-geometry', type: 'trajectory', position: [28,2,-350], size: [96,18,54], color: 0x4b8f7e, formula: 'Q 的切线方向指向 P', role: '后轮轨迹模型。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'airplane-runway', name: '飞机减速跑道', district: 'east-river-physics', type: 'runway', position: [156,2,8], size: [132,8,28], color: 0x717b82, formula: 'm dv/dt = -kv', role: '阻力导致速度变化率。', strongSymbol: true },
    { id: 'cooling-lab-tower', name: '牛顿冷却实验塔', district: 'east-river-physics', type: 'cooling-tower', position: [172,2,172], size: [58,116,58], color: 0x8aa099, formula: 'T = T0 + C e^(-kt)', role: '温度指数逼近环境温度。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'zero-loss-pit', name: '除零丢解坑', district: 'red-hook-risk', type: 'risk-pit', position: [270,2,642], size: [62,30,62], color: 0xb94a37, formula: '除以前查零因子', role: '除法前检查零因子是否产生解。', strongSymbol: true, labelTier: 'landmark' },
    { id: 'absolute-value-gate', name: '绝对值门', district: 'red-hook-risk', type: 'risk-gate', position: [342,2,635], size: [70,48,40], color: 0xc36d4b, formula: 'int du/u = ln abs(u) + C', role: '对数绝对值不能省略。', strongSymbol: true }
  ],
  roads: [
    { id: 'zhangyu-main-avenue', name: '张宇主线大道', color: 0x3e4852, width: 9, points: [[-430,4,640],[-38,4,548],[-18,4,335],[-126,4,132],[28,4,-98],[-8,4,-380],[172,4,172]], role: '概念到应用的章节主线。' },
    { id: 'hudson-shore-drive', name: 'Hudson Shore Drive', color: 0x4b535a, width: 5, points: [[-145,4,-555],[-164,4,-405],[-166,4,-150],[-148,4,90],[-122,4,320],[-92,4,500],[-58,4,610]], role: '西岸道路。' },
    { id: 'east-river-drive', name: 'East River Drive', color: 0x4b535a, width: 5, points: [[65,4,-625],[112,4,-555],[145,4,-430],[160,4,-260],[154,4,-70],[140,4,110],[125,4,300],[94,4,485],[45,4,600]], role: '东岸道路。' },
    { id: 'high-line-path', name: 'High Line 降阶转换线', color: 0x8b7357, width: 6, points: [[-148,6,188],[-126,6,132],[-82,6,88],[28,6,-98]], role: '降阶通向高阶线性。' }
  ],
  bridges: [
    { id: 'battery-ferry', name: 'Battery Ferry 概念渡轮线', color: 0xe8eff2, points: [[-430,8,640],[-250,8,600],[-65,8,560]], formula: '概念岛 -> Battery Park', role: '从概念进入主城。', labelTier: 'landmark' },
    { id: 'risk-ferry', name: '风险训练渡轮线', color: 0xd08b74, points: [[56,8,602],[180,8,632],[270,8,642]], formula: '主城 -> 风险检查', role: '风险复查路径。' }
  ],
  metro: [
    { id: 'blue-main-line', name: '蓝线 章节主线', color: 0x2d79d8, points: [[-430,16,640],[-38,16,548],[-18,16,335],[-126,16,132],[28,16,-98],[-8,16,-380],[172,16,172]] },
    { id: 'green-substitution-line', name: '绿线 换元降阶线', color: 0x29b06f, points: [[-42,16,314],[54,16,362],[-126,16,132],[28,16,-98]] },
    { id: 'purple-linearization-line', name: '紫线 线性化线', color: 0x8b5cf6, points: [[-42,16,314],[54,16,362],[28,16,-98],[76,16,64]] },
    { id: 'orange-application-line', name: '橙线 应用建模线', color: 0xf59e0b, points: [[-8,16,-380],[156,16,8],[172,16,172]] },
    { id: 'red-risk-line', name: '红线 风险提醒线', color: 0xef4444, points: [[270,16,642],[342,16,635],[-92,16,414],[-102,16,62]] }
  ]
};
