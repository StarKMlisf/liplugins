# PacketEvents 客户端季节染色

## 当前方案

LISeasons 1.0.65 的季节群系颜色是纯客户端视图：

1. 服务端照常向玩家发送真实区块；
2. LISeasons 监听玩家收到的区块数据；
3. 原始区块包发送完成后，通过 PacketEvents 追加 `CHUNK_BIOMES`；
4. 客户端使用季节目标群系重新计算草地、树叶、水面和天空颜色；
5. 换季时，已有视距内的区块再按共享预算分批刷新。

插件不调用 Bukkit `setBiome`、`refreshChunk`，也不写 NMS 群系容器或 `markUnsaved`。

## 不会修改服务端群系

这条数据边界与 RealisticSeasons 官方描述的客户端数据包方案一致：看起来变了，服务端群系没有变化。

- 世界存档中的群系保持原样；
- `/locate biome` 和服务端群系查询仍使用真实群系；
- Bukkit API 和其他插件读取到的仍是真实群系；
- 关闭 LISeasons 后不需要还原群系存档；
- 不会因为季节颜色把平原永久保存成雪原。

玩家客户端的 F3 群系显示可能变成当前伪装目标，这是客户端视图，不代表存档已经改变。

参考：[RealisticSeasons 官方 FAQ](https://wiki.realisticseasons.com/faq)明确说明其群系外观通过客户端数据包实现，不改变服务端群系。

## PacketEvents 是强制前置

PacketEvents 负责：

- 按玩家客户端协议解析目标群系；
- 构造并合并 `CHUNK_BIOMES`；
- 在玩家新收到区块时自动追加季节群系包；
- 静默发送 LISeasons 自己生成的数据包，避免重复进入监听链。

`plugin.yml` 使用 `depend: [packetevents]`。缺失 PacketEvents 时，LISeasons 不会加载；低于 2.13.0 时，颜色模块拒绝初始化。ProtocolLib 不再需要。

## 支持版本

当前编译基线和配置支持：

- Paper/Leaves/Lophine 1.21.1-1.21.8；
- 1.21.9（Paper 官方只有 Alpha 构建）；
- 1.21.10；
- 1.21.11；
- 26.1.x，包括 26.1.2；
- 26.2。

Folia 使用独立区域调度路径，真实加载验证从官方稳定构建 1.21.8 开始。PaperMC 官方没有 Folia 1.21.1 构建，因此不声明不存在的 Folia 1.21.1 运行验证。

染色模块已经不依赖 CraftBukkit/NMS 类和字段；兼容重点变为 Paper API、PacketEvents 版本和对应客户端协议。

## 默认配置

```yaml
season-switch:
  spring: true
  summer: true
  autumn: true
  winter: true

interval-ticks: 40

biome-spoof:
  radius-chunks: 8
  budget-chunks-per-tick: 8
  packet:
    enable: true
    max-chunks-per-packet: 64
  seasons:
    spring: "flower_forest"
    summer: "plains"
    autumn: "windswept_savanna"
    winter: "snowy_plains"
```

| 键 | 说明 |
| --- | --- |
| `season-switch.<season>` | 单独控制某个季节是否发送颜色伪装 |
| `interval-ticks` | 已有区块的分批检查间隔 |
| `radius-chunks` | 玩家周围候选区块半径，取值 1～32 |
| `budget-chunks-per-tick` | 所有玩家共享的每轮检查预算，取值 1～64 |
| `packet.enable` | PacketEvents 客户端季节颜色总开关 |
| `packet.max-chunks-per-packet` | 单个 `CHUNK_BIOMES` 最多合并的区块数，取值 1～128 |
| `seasons.<season>` | 当前季节在客户端伪装成的原版群系键 |

升级 1.0.63 时，旧 `biome-spoof.nms.enable` 和 `max-chunks-per-packet` 会迁移到 `biome-spoof.packet`，已有开关和数值保持不变。迁移完成后旧 `nms` 节点会从配置中移除。

## 与 RealisticSeasons 的差异

二者现在都遵循“不修改服务端群系，只改变客户端视图”的原则，但 LISeasons 当前实现更简单：

- LISeasons 把一个季节映射到一个现有的原版目标群系；
- RealisticSeasons 文档提供按真实群系分别设置草、叶、水、天空、雾的十六进制颜色；
- LISeasons 尚未注入自定义 RGB 群系，也没有四阶段颜色混合；
- 因此当前 LISeasons 的颜色可配置粒度不等同于 RealisticSeasons。

桦树叶和云杉叶的颜色由客户端材质规则固定，单纯更换群系可能不明显。`visual-effects.autumn-leaf-color` 是另一个模块，会真实替换部分叶块；必须保留原树种的服务器应单独关闭它。

## 性能与缓存

- 新区块：监听原始区块包并自动追加一次群系包；
- 换季：按共享预算刷新已在视距内的区块；
- 移动：缓存只保留玩家当前世界和配置半径内的区块；
- 重进或换世界：清理玩家缓存和旧世界目标；
- 普通 Paper 与 Folia 都不读取其他区域的区块数据，只发送玩家数据包。

高在线时优先降低 `radius-chunks`，其次降低 `budget-chunks-per-tick`。`max-chunks-per-packet` 建议保持 32～64。

## 不变色检查表

1. 确认 LISeasons 为 1.0.65；
2. 确认 PacketEvents 2.13.0 或更高兼容版本已启用；
3. 确认 `biome-spoof.packet.enable: true`；
4. 确认当前季节的 `season-switch` 为 `true`；
5. 确认当前世界已启用季节；
6. 重新进入世界，或等待预算刷新视距；
7. 搜索日志中的 `PacketEvents`、`CHUNK_BIOMES`、`客户端群系伪装`错误；
8. 确认替换 Jar 后执行了完整重启。

如果日志出现：

```text
bitsPerEntry must be between 1 and 32, inclusive
```

说明仍在使用 1.0.64 的单群系包构造路径。1.0.65 已改用协议原生的单值调色板，不会再创建非法的 0-bit 存储；更新 LISeasons Jar 后完整重启即可。

[返回首页](Home.md)
