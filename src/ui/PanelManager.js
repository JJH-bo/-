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
    const h = document.createElement('h3');
    h.textContent = title;
    const p = document.createElement('p');
    p.textContent = text;
    this.element.append(h, p);
  }

  addPills(title, items) {
    const h = document.createElement('h3');
    h.textContent = title;
    const p = document.createElement('p');
    items.forEach((item) => {
      const span = document.createElement('span');
      span.className = 'pill';
      span.textContent = item;
      p.appendChild(span);
    });
    this.element.append(h, p);
  }

  showWelcome() {
    this.clear();
    this.addTitle('全城视角');
    this.addSection('项目定位', '这是 V6 微分方程知识城市的工程版。重点不是说明文档，而是把城市分区、地标、道路、桥梁、河流和知识语义全部沉淀为可迭代代码。');
    this.addPills('验收重点', ['真实城区', '曼哈顿天际线', '皇后街区', '布鲁克林工业区', '应用海湾']);
  }

  showObject(object) {
    const data = object.userData || {};
    const payload = data.payload || {};
    const math = data.math || payload.math || (data.formula ? [data.formula] : []);
    this.clear();
    this.addTitle(data.title || object.name || '知识城市对象');
    this.addSection('说明', data.description || payload.role || '知识城市对象。');
    this.addPills('数学职责', math);
    this.addSection('城市语义', this.getCityMeaning(data, payload));
    if (data.formula) this.addPills('外墙公式', [data.formula]);
  }

  getCityMeaning(data, payload) {
    const id = data.id || payload.id || '';
    const district = data.district || '';
    if (id.includes('manhattan') || district.includes('manhattan')) return '最难、最重要、最高抽象层级，所以占据核心岛和最高天际线。';
    if (id.includes('queens') || district.includes('queens')) return '一阶方程是基础大区，方法街区多，承担全章入口。';
    if (id.includes('brooklyn') || district.includes('brooklyn')) return '可降阶是加工转换区，用工业、电梯、厂房表达变量角色转换。';
    if (id.includes('bay') || district.includes('bay')) return '应用区连接现实场景，把几何和物理关系翻译成变化率方程。';
    if (id.includes('risk') || district.includes('risk')) return '风险区独立存在，提醒计算合法性和条件边界。';
    return '这是微分方程城市的一部分。';
  }
}
