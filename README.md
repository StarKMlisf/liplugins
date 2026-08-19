# 牢李插件系列文档站

这是牢李插件系列的独立网页与 Wiki 仓库，只包含文档站源码，不包含任何插件 Java 源码、Jar、构建产物或运行依赖。

## 在线文档

GitHub Pages：<https://starkmlisf.github.io/liplugins/>

当前收录：

- LISeasons：四季、节气、体温、世界规则、流星雨与运维文档。
- LiTitle：称号、商店、聊天、昵称、存储与跨服文档。
- LiRealEnchant：真实附魔系统文档与 122 篇独立附魔详情。
- BlockCraft：八基座祭坛合成插件 Wiki（NORMAL/ADVANCED、配方与粒子动画）。

## 本地运行

```bash
pnpm install
pnpm dev
```

生产构建：

```bash
pnpm build
```

## 目录

```text
content/       三款插件的 Markdown Wiki
public/        站点静态资源
src/           Astro 页面、组件、样式与文档渲染器
.github/       GitHub Pages 自动部署工作流
```

