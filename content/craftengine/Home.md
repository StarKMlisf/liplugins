# CraftEngine 中文教程

从安装、资源目录和自定义内容，到命令、API 联动与排错的非官方中文学习入口。

> 本站内容是面向中文服主与开发者的非官方整理，不隶属于 CraftEngine 官方。功能、授权、下载与最终配置格式始终以官方资料为准。

## 当前教程基线

- 教程版本：CraftEngine `26.8`。
- 官方运行要求：Java 21 或更高版本、Minecraft 1.20 或更高版本，运行于 Paper/Folia 及官方列出的兼容分支。
- 页面整理日期：2026-08-26。
- 使用完整 `namespace:id` 表示物品、方块和家具，例如 `tutorial:ruby`。

CraftEngine 可以通过服务端配置和资源包创建自定义物品、方块、家具、配方、图片、声音等内容，不要求玩家安装客户端模组。它会把 `resources/` 下的多个内容包合并、生成资源包并发送给玩家。

## 推荐阅读顺序

| 顺序 | 教程 | 完成后你会得到什么 |
| --- | --- | --- |
| 1 | [安装、更新与资源包托管](安装与资源包托管.md) | 插件可启动，玩家能接收资源包 |
| 2 | [资源目录、命名空间与热重载](资源目录与命名空间.md) | 一个规范的 `tutorial` 内容包 |
| 3 | [第一个自定义物品](自定义物品.md) | 可通过指令获得的自定义物品 |
| 4 | [模型、贴图与 BlockBench](模型与贴图.md) | 不再使用原版外观的物品 |
| 5 | [自定义方块与家具](方块与家具.md) | 能放置、破坏、掉落或乘坐的内容 |
| 6 | [配方、事件、函数与条件](配方事件与条件.md) | 可合成且能响应交互的内容 |
| 7 | [常用命令、热重载与调试](命令与热重载.md) | 能正确应用改动并定位资源来源 |
| 8 | [故障排查与上线检查](故障排查.md) | 能定位配置、贴图、下载和联动问题 |
| 9 | [插件联动与稳定 API](插件联动与API.md) | 能让自己的 Bukkit 插件精确识别 CE 内容 |

## 三条最重要的规则

1. YAML 只能用空格缩进，不能使用 Tab。
2. 配置、配方、模型贴图对应不同重载范围；不确定时使用 `/ce reload all`。
3. 插件联动必须比较完整 CE ID，不能只比较伪装用的原版 `Material`。

## 常用命令速查

```text
/ce
/ce reload config
/ce reload recipe
/ce reload all
/ce item get tutorial:ruby 1
/ce item give <玩家> tutorial:ruby 1
/ce resource create tutorial
/ce resource search craftengine:item tutorial:ruby
```

`/ce` 是 `/craftengine` 的默认别名。服务器可以在 `plugins/CraftEngine/commands.yml` 修改命令状态、路径和权限，但此类命令注册改动需要完整重启。

## 官方入口

- [CraftEngine 官方入门教程](https://xiao-momi.github.io/craft-engine-wiki/getting_start/)
- [CraftEngine 官方配置参考](https://xiao-momi.github.io/craft-engine-wiki/configuration/)
- [CraftEngine 官方命令参考](https://xiao-momi.github.io/craft-engine-wiki/reference/commands/)
- [CraftEngine 官方 API 文档](https://xiao-momi.github.io/craft-engine-wiki/api/)
- [CraftEngine GitHub 仓库](https://github.com/Xiao-MoMi/craft-engine)
- [CraftEngine 发布页](https://github.com/Xiao-MoMi/craft-engine/releases)

## 使用建议

先在测试服完成“创建资源 → 重载 → 获取物品 → 玩家接收资源包”的完整闭环，再把内容复制到正式服。不要只检查 YAML 能否解析；模型是否显示、方块是否掉落、家具点击与碰撞是否正常，都需要进入游戏实际验证。
