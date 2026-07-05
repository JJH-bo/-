export class PanelManager {
  constructor(element) {
    this.element = element;
    this.showWelcome();
  }

  clear() {
    this.element.replaceChildren();
  }

  addTitle(text) {
    const h = document.createElement('h2');
    h.textContent = text;
    this.element.appendChild(h);
  }

  addSection(title, text) {
    if (!text) return;
    const h = document.createElement('h3');
    h.textContent = title;
    const p = document.createElement('p');
    p.textContent = text;
    this.element.append(h, p);
  }

  addPills(title, items = []) {
    const clean = items.filter(Boolean);
    if (!clean.length) return;
    const h = document.createElement('h3');
    h.textContent = title;
    const p = document.createElement('p');
    clean.forEach((item) => {
      const span = document.createElement('span');
      span.className = 'pill';
      span.textContent = item;
      p.appendChild(span);
    });
    this.element.append(h, p);
  }

  showWelcome() {
    this.clear();
    this.addTitle('V6.3.2 曼哈顿全岛视角');
    this.addSection('当前阶段', '这一版已从五区隐喻收束为曼哈顿全岛工程版：Liberty Island 负责概念入口，Battery Park 登陆，SoHo / Greenwich 承载一阶方法，Chelsea / High Line 承载可降阶，Midtown / Times Square 承载高阶线性核心，Central Park 承载几何应用，East River Piers 承载物理应用，Governors Island 独立承载风险训练。');
    this.addPills('硬验收目标', ['曼哈顿真岛', '附属岛独立', '高密街区', '核心天际线', '城市细节层', '夜景关系线']);
    this.addSection('操作', '拖拽旋转，滚轮缩放，点击城区或地标查看城市职责、数学职责、公式牌匾与空间语义。');
  }

  showObject(object) {
    const data = object.userData || {};
    const payload = data.payload || {};
    const math = data.math || payload.math || (data.formula ? [data.formula] : []);
    this.clear();
    this.addTitle(data.title || object.name || '知识城市对象');
    if (data.formula) this.addPills('公式牌匾', [data.formula]);
    this.addSection('城市职责', data.description || payload.role || '知识城市对象。');
    this.addPills('数学职责', math);
    this.addSection('空间语义', data.cityMeaning || payload.cityMeaning || this.getCityMeaning(data, payload));
    this.addPills('风险提醒', data.risks || payload.risks || []);
  }

  getCityMeaning(data, payload) {
    const id = data.id || payload.id || '';
    const district = data.district || payload.district || '';
    const text = `${id} ${district}`;
    if (text.includes('linear') || text.includes('midtown') || text.includes('characteristic')) return '高阶线性最抽象、最重要，所以占据 Midtown / Times Square，形成最高、最密、最核心的天际线。';
    if (text.includes('first') || text.includes('soho')) return '一阶方程是基础方法街区，采用 SoHo / Greenwich 的低中层街区语言：方法多、街巷清楚、但不压过中城核心。';
    if (text.includes('reduction') || text.includes('chelsea')) return '可降阶是工业转换区：通过 p=y′ 改变研究对象，把二阶问题下降到一阶问题。';
    if (text.includes('geometry') || text.includes('central-park')) return 'Central Park 是唯一大空地，空地本身承担轨迹、切线和几何建模职责，不是空白。';
    if (text.includes('physics') || text.includes('east-river')) return '物理应用靠真实场景识别：码头、跑道、实验塔把速度、阻力、温度差翻译为变化率关系。';
    if (text.includes('concept') || text.includes('liberty') || text.includes('battery')) return '概念从 Liberty Island 的火炬进入 Battery Park，象征先理解未知函数与导数关系，再进入主城。';
    if (text.includes('risk') || text.includes('governors')) return '风险区独立在 Governors Island，避免污染主城视图，同时提醒计算合法性、定义域和初值条件。';
    if (text.includes('grey') || text.includes('difference')) return '差分方程作为远景灰岛，只保留选学边界，不进入数学一主线。';
    if (data.type === 'bridge') return '桥梁只用于结构转化，不是装饰线。';
    return '这是微分方程知识城市的一部分。';
  }
}
