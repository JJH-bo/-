# Release 说明

当前仓库已经保存 V6 的核心信息：

- `index.html`：稳定入口页面，展示 V6 纽约城区建模版的城市规划结构。
- `data/city-data.json`：城区、建筑、道路、桥梁、河流、地铁线、验收标准等结构化数据。
- `docs/V6_城市建模规格书.md`：完整设计规格书。
- `notes/development-log.md`：开发记录。

原本在对话中生成的 `.docx` 规格书与 `.zip` 完整包属于二进制文件。当前 GitHub 连接器主要适合提交 UTF-8 文本内容，因此仓库中优先保存了可审查、可继续开发的文本版规格和入口页面。

后续如要做正式工程化版本，建议把工程拆成：

```text
src/
  city-engine.js
  city-data.js
  render-webgl.js
  interactions.js
public/
  index.html
assets/
  textures/
  icons/
docs/
  V6_城市建模规格书.md
```
