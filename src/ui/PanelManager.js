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
    if (!items.length) return;
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
    this.addSection('V6.0.7 状态', '本轮开始从占位模型升级为城市模型：水系、海湾、广场、街区密度、道路、桥梁、地铁线和语义地标都由 cityData 驱动。');
    this.addPills('硬验收', ['真实城区', '道路桥梁河流', '曼哈顿天际线', '应用场景', '风险训练场']);
    this.addSection('操作', '拖拽旋转，滚轮缩放，点击城区或地标查看知识职责。');
  }

  showObject(object) {
    const data = object.userData || {};
    const payload = data.payload || {};
    const math = data.math || payload.math || (data.formula ? [data.formula] : []);
    this.clear();
    this.addTitle(data.title || object.name || '知识城市对象');
    this.addSection('城市职责', data.description || payload.role || '知识城市对象。');
    this.addPills('数学职责', math);
    if (data.formula) this.addPills('公式牌匾', [data.formula]);
    this.addSection('空间语义', data.cityMeaning || payload.cityMeaning || this.getCityMeaning(data, payload));
    this.addPills('风险提醒', data.risks || payload.risks || []);
  }

  getCityMeaning(data, payload) {
    const id = data.id || payload.id || '';
    const district = data.district || payload.district || '';
    if (id.includes('manhattan') || district.includes('manhattan')) return '最难、最重要、最高抽象层级，所以占据核心岛和最高天际线。';
    if (id.includes('queens') || district.includes('queens')) return '一阶方程是基础大区，方法街区多，承担全章入口。';
    if (id.includes('brooklyn') || district.includes('brooklyn')) return '可降阶是工业转换区，用电梯、厂房和平台表达变量角色转换。';
    if (id.includes('bay') || district.includes('bay')) return '应用区连接现实场景，把几何和物理关系翻译成变化率方程。';
    if (id.includes('risk') || district.includes('risk')) return '风险区独立存在，提醒计算合法性和条件边界。';
    if (data.type === 'bridge') return '桥梁只用于结构转化，不是装饰线。';
    return '这是微分方程城市的一部分。';
  }
}
