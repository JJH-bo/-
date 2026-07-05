export const cityData = {
  meta: {
    title: '张宇第15讲 微分方程知识城市 V6',
    version: 'V6 纽约城区建模版',
    goal: '把微分方程章节建模成一座可探索的知识城市，而不是二维知识网。'
  },
  districts: [
    {
      id: 'entrance-harbor',
      name: '入口港·概念广场',
      borough: '入口港',
      position: [-560, 0, 170],
      size: [250, 10, 210],
      color: 0xdfeefa,
      importance: 1,
      role: '概念入口，低矮、开阔、清晰。',
      math: ['微分方程及其阶', '常微分方程', '线性微分方程', '解、通解、特解', '初始条件']
    },
    {
      id: 'queens-first-order',
      name: '皇后·一阶方程区',
      borough: '皇后',
      position: [-360, 0, -70],
      size: [360, 10, 310],
      color: 0xd9ecff,
      importance: 3,
      role: '大面积基础生活区，街区多、道路清晰。',
      math: ['可分离变量', '齐次型', '一阶线性', '伯努利', '全微分']
    },
    {
      id: 'brooklyn-reduction',
      name: '布鲁克林·可降阶工业区',
      borough: '布鲁克林',
      position: [30, 0, 190],
      size: [330, 10, 240],
      color: 0xe8e0d5,
      importance: 4,
      role: '转换加工区，把二阶问题通过变量角色转换降为一阶。',
      math: ['p=y\'', '缺 y：p=p(x)', '缺 x：p=p(y)', 'y\'\'=p dp/dy']
    },
    {
      id: 'manhattan-linear',
      name: '曼哈顿·高阶线性核心岛',
      borough: '曼哈顿',
      position: [170, 0, -130],
      size: [310, 12, 360],
      color: 0xd5e4f5,
      importance: 5,
      role: '最难、最重要、最高密度的城市核心。',
      math: ['高阶线性解结构', '常系数齐次', '特征方程', '不等实根', '重根', '复根', '非齐次特解']
    },
    {
      id: 'application-bay',
      name: '应用海湾·现实建模码头',
      borough: '应用海湾',
      position: [520, 0, 120],
      size: [320, 10, 260],
      color: 0xd9f0ef,
      importance: 3,
      role: '现实问题压缩成微分方程的接口。',
      math: ['几何应用', '自行车后轮轨迹', '飞机减速', '牛顿冷却']
    },
    {
      id: 'red-hook-risk',
      name: '红钩·风险训练场',
      borough: '红钩',
      position: [-10, 0, -370],
      size: [290, 10, 150],
      color: 0xffe4d8,
      importance: 2,
      role: '独立错误风险区。',
      math: ['除零丢解', '绝对值', '常数合并', '符号分支', '变量角色混乱']
    },
    {
      id: 'grey-island-difference',
      name: '灰岛·差分方程选学区',
      borough: '灰岛',
      position: [620, 0, -280],
      size: [190, 10, 130],
      color: 0xd8d8d8,
      importance: 1,
      role: '数学三选学远景岛。',
      math: ['差分方程']
    }
  ],
  buildings: [
    { id: 'order-tower', district: 'entrance-harbor', name: '阶塔', position: [-615, 0, 135], size: [36, 75, 36], color: 0x7bb4e8, formula: '阶=最高阶导数' },
    { id: 'solution-hall', district: 'entrance-harbor', name: '通解三联馆', position: [-545, 0, 190], size: [90, 42, 42], color: 0x9fc8ee, formula: '通解→初值→特解' },
    { id: 'separable-street', district: 'queens-first-order', name: '可分离变量街', position: [-450, 0, -130], size: [70, 55, 50], color: 0x6fb0e8, formula: 'dy/g(y)=f(x)dx' },
    { id: 'homogeneous-slope', district: 'queens-first-order', name: '齐次斜率坡区', position: [-355, 0, -120], size: [80, 48, 55], color: 0x77c0d8, formula: 'u=y/x' },
    { id: 'linear-first-order', district: 'queens-first-order', name: '一阶线性馆', position: [-260, 0, -95], size: [78, 86, 66], color: 0x4f91dc, formula: 'y\'+p(x)y=q(x)' },
    { id: 'bernoulli-gate', district: 'queens-first-order', name: '伯努利转换门', position: [-430, 0, 5], size: [78, 74, 54], color: 0x9b7ee8, formula: 'z=y^(1-n)' },
    { id: 'exact-courtyard', district: 'queens-first-order', name: '全微分庭院', position: [-315, 0, 35], size: [90, 38, 70], color: 0x79c7a7, formula: 'Pdx+Qdy=du' },
    { id: 'reduction-elevator', district: 'brooklyn-reduction', name: '可降阶总电梯', position: [-20, 0, 170], size: [54, 130, 54], color: 0xb07d58, formula: '二阶→一阶' },
    { id: 'missing-y-factory', district: 'brooklyn-reduction', name: '缺 y 厂房', position: [75, 0, 175], size: [80, 62, 70], color: 0xc39262, formula: 'p=p(x)' },
    { id: 'missing-x-workshop', district: 'brooklyn-reduction', name: '缺 x 链式车间', position: [170, 0, 220], size: [90, 70, 60], color: 0xc98954, formula: 'p=p(y)' },
    { id: 'linear-structure-building', district: 'manhattan-linear', name: '线性解结构大楼', position: [95, 0, -220], size: [52, 135, 54], color: 0x6f8fc9, formula: 'y=C1y1+C2y2' },
    { id: 'characteristic-tower', district: 'manhattan-linear', name: '特征方程中央塔', position: [180, 0, -180], size: [64, 220, 64], color: 0x2f67c5, formula: 'r^2+pr+q=0' },
    { id: 'distinct-real-root-twins', district: 'manhattan-linear', name: '不等实根双塔', position: [260, 0, -230], size: [44, 150, 44], color: 0x5780d8, formula: 'r1≠r2' },
    { id: 'repeated-root-tower', district: 'manhattan-linear', name: '重根摩天楼', position: [110, 0, -70], size: [58, 175, 58], color: 0x476ab0, formula: '(C1+C2x)e^rx' },
    { id: 'complex-root-spiral', district: 'manhattan-linear', name: '复根旋转塔', position: [250, 0, -70], size: [56, 165, 56], color: 0x7b67c9, formula: 'e^αx(cosβx+sinβx)' },
    { id: 'nonhomogeneous-factory', district: 'manhattan-linear', name: '非齐次特解工厂', position: [185, 0, 20], size: [90, 95, 58], color: 0x5a9bd5, formula: 'y=yh+yp' },
    { id: 'bike-trajectory-hall', district: 'application-bay', name: '自行车轨迹馆', position: [455, 0, 85], size: [80, 60, 60], color: 0x57b7a5, formula: 'Q切线指向P' },
    { id: 'airplane-runway', district: 'application-bay', name: '飞机减速跑道', position: [560, 0, 125], size: [120, 22, 35], color: 0x9db8c9, formula: 'F=-kv' },
    { id: 'cooling-lab-tower', district: 'application-bay', name: '冷却实验塔', position: [630, 0, 40], size: [54, 120, 54], color: 0x47a88d, formula: 'T=T0+Ce^-kt' }
  ],
  roads: [
    { id: 'zhangyu-main-avenue', name: '张宇主线大道', points: [[-620, 0, 170], [-420, 0, -40], [-40, 0, 150], [165, 0, -30], [530, 0, 100]], color: 0xf5ead0, width: 16 },
    { id: 'queens-grid-a', name: '皇后方法街 A', points: [[-510, 0, -190], [-250, 0, -190]], color: 0xffffff, width: 7 },
    { id: 'queens-grid-b', name: '皇后方法街 B', points: [[-520, 0, -30], [-210, 0, -30]], color: 0xffffff, width: 7 }
  ],
  bridges: [
    { id: 'euler-bridge', name: '欧拉跨江大桥', points: [[255, 0, -5], [350, 0, 40], [460, 0, 75]], color: 0xd8b16a, formula: 'x=e^t' }
  ],
  metro: [
    { id: 'blue-main-line', name: '蓝线：章节主线', points: [[-620, 4, 170], [-360, 4, -70], [30, 4, 190], [170, 4, -130], [520, 4, 120]], color: 0x2d79d8 },
    { id: 'green-substitution-line', name: '绿线：换元线', points: [[-430, 4, 5], [-260, 4, -95], [-20, 4, 170], [180, 4, -180]], color: 0x29b06f },
    { id: 'orange-modeling-line', name: '橙线：应用建模线', points: [[520, 4, 120], [455, 4, 85], [560, 4, 125], [630, 4, 40]], color: 0xf2a33b }
  ]
};
