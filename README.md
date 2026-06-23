# One More Sip — 课程作品网站

《One More Sip》（Campus Dormitory Absurdity）的游戏作品展示网站，单页结构，按作业要求分为四个板块：

1. **The Game** — 灵感、概念、游戏视频
2. **Designs** — 生活体验、核心情感、核心机制、图表
3. **Game World** — 视听设计、空间设计、文化层、叙事设计
4. **Development** — Agent 开发日志精选

纯静态网页（HTML + CSS + JS），无需任何构建工具，可直接部署到 GitHub Pages。

---

## 文件结构

```
OneMoreSip/
├─ index.html         主页面
├─ .nojekyll          告诉 GitHub Pages 不用 Jekyll 处理
├─ README.md
└─ assets/
   ├─ style.css       样式
   └─ script.js       醉酒滚动 + Drunk Level 进度条
```

---

## 部署到 GitHub Pages（拿到提交链接）

### 方法 A：网页上传（最简单，不用装 Git）

1. 在 GitHub 新建一个仓库，例如命名 `OneMoreSip`，设为 Public。
2. 进入仓库 → **Add file → Upload files**，把 `index.html`、`.nojekyll`、`README.md` 和整个 `assets` 文件夹一起拖进去上传，提交。
   - 注意要保持文件夹结构：`assets/style.css`、`assets/script.js` 必须在 `assets` 里。
3. 仓库页 → **Settings → Pages**。
4. **Source** 选 `Deploy from a branch`，Branch 选 `main`、文件夹选 `/ (root)`，点 **Save**。
5. 等 1–2 分钟，刷新这个页面，顶部会出现你的网址，形如：
   `https://你的用户名.github.io/OneMoreSip/`
6. 把这个链接交给老师即可。

### 方法 B：命令行（已装 Git）

```bash
cd OneMoreSip
git init
git add .
git commit -m "One More Sip course site"
git branch -M main
git remote add origin https://github.com/你的用户名/OneMoreSip.git
git push -u origin main
```
然后同样到 **Settings → Pages** 按上面第 3–5 步开启。

---

## 替换成你的真实素材

### 1) 游戏视频（The Game 板块）

打开 `index.html`，找到 `id="videoFrame"` 那一块，把里面的 `<div class="video-placeholder">…</div>` 整段替换掉：

**用 YouTube / Bilibili 嵌入：**
```html
<iframe src="https://www.youtube.com/embed/视频ID"
        allow="autoplay; fullscreen" allowfullscreen></iframe>
```
（B 站：在视频页「分享 → 嵌入代码」里复制 iframe；YouTube：视频页「分享 → 嵌入」。）

**用本地视频文件**（把文件放进 `assets/`，建议小于 50MB，否则 GitHub 单文件 100MB 上限会卡）：
```html
<video controls poster="assets/poster.png">
  <source src="assets/gameplay.mp4" type="video/mp4">
</video>
```

### 2) 开发日志（Development 板块）

`index.html` 里的 `<ol class="devlog">` 现在是 4 条占位条目。把每条 `<h4>` 标题和 `<p>` 正文换成你 `agent-development-log` 里的真实片段（建议保留「标签 + 标题 + 一句你学到了什么」的结构）。需要更多条目直接复制一个 `<li class="log-entry">…</li>` 即可。

### 3) 截图 / 美术图（可选）

如果之后有游戏截图，可以放进 `assets/`，在任意板块用 `<img src="assets/图片名.png" alt="说明">` 插入，会比现在的纯 CSS 场景更真实。

---

## 设计说明

- 配色直接取自设计文档：蓝灰瓷砖、昏暗走廊、暗黄灯光、脏米色、警示琥珀色。
- 标志性交互：**整个页面会随滚动「越来越醉」**——左上角的 Drunk Level 进度条上升，页面轻微倾斜、漂移，呼应游戏的醉酒机制。
- 开启了 `prefers-reduced-motion`：用户系统若设为「减少动态效果」，所有晃动会自动关闭，保证可访问性。
