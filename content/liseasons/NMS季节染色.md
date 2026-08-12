# NMS 季节染色

## 当前方案

1.0.61 只使用 NMS 群系调色板方案：

1. 找出在线玩家附近的已加载区块；
2. 在正确的服务器线程上分批修改区块内部群系调色板，并把区块标记为待保存；
3. 构造 NMS 群系数据包；
4. 通过 ProtocolLib 向对应玩家统一发送；
5. 客户端重新计算草地、树叶、水面和天空颜色。

不再使用旧版大量连续 `setBiome + refreshChunk` 的染色路径，也没有 Bukkit 染色回退。

## 这不是纯客户端伪装

虽然配置节点仍叫 `biome-spoof`，1.0.61 实际会替换服务端 NMS 区块中的群系调色板并调用 `markUnsaved`。因此：

- 修改后的群系数据可能保存进世界区块；
- 服务端其他插件和原版逻辑查询群系时，可能看到季节目标群系；
- 它不只影响颜色，也可能间接影响依赖群系查询的温度、生物、天气或其他插件逻辑；
- 当前没有保存原始群系备份；关闭模块或移除插件不会自动还原已改写区块；
- 下一季会把玩家附近区块继续改写为下一季目标群系。

首次在正式世界启用前务必备份世界。若必须保留原始群系数据，只能关闭 `biome-spoof.nms.enable`，不要在未备份的生产地图上试运行。

## 为什么 ProtocolLib 是强制前置

ProtocolLib 负责将 NMS 构造的数据包发送给客户端。`plugin.yml` 使用 `depend: [ProtocolLib]`，因此缺失时 LISeasons 不会加载。

它不是 PacketEvents；当前成品不需要 PacketEvents，也不会把 ProtocolLib 或 NMS 类打进 LISeasons Jar。

## 支持版本

1.0.61 内置版本签名适配：

- 1.21.11；
- 26.1.x，包括 26.1.2；
- 26.2。

Paper、Leaves、Lophine 在这些版本上共用匹配的 CraftBukkit/NMS 结构。若服务端后续更新导致内部签名改变，即使 Minecraft 大版本号相同，也可能需要新版本 LISeasons。

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
  step-xz: 4
  step-y: 4
  nms:
    enable: true
    max-chunks-per-packet: 64
  seasons:
    spring: "flower_forest"
    summer: "plains"
    autumn: "windswept_savanna"
    winter: "snowy_plains"
```

## 配置语义

| 键 | 说明 |
| --- | --- |
| `season-switch.<season>` | 单独控制某季是否执行群系染色 |
| `interval-ticks` | 色调服务轮询间隔 |
| `radius-chunks` | 玩家周围候选区块半径，取值 1～32 |
| `budget-chunks-per-tick` | 所有玩家共享的每轮检查预算，取值 1～64 |
| `step-xz` | 区块内水平采样步长 |
| `step-y` | 区块内垂直采样步长 |
| `nms.enable` | NMS 色调总开关 |
| `nms.max-chunks-per-packet` | 普通 Paper 单包最多合并区块数，取值 1～128 |
| `seasons.<season>` | 该季节使用的目标群系键 |

候选区块即使未加载、已经处理或无需修改，也会消耗本轮检查预算。这保证单轮工作量有硬上限。

## Paper 与 Folia 的差异

- Paper/Leaves/Lophine：一轮内已修改的多个区块可以合并到批量数据包，再发送给玩家。
- Folia：区块数据必须在所属区域线程访问，因此修改后在对应区域内即时发送，不跨区域收集再批量处理。

`max-chunks-per-packet` 主要影响普通 Paper 路径，不能把 Folia 的区域线程规则改成全服合包。

## 颜色不是贴图替换

季节目标群系决定客户端使用哪套原版群系颜色：

- 春季 `flower_forest`：鲜绿；
- 夏季 `plains`：稳定绿色；
- 秋季 `windswept_savanna`：偏黄；
- 冬季 `snowy_plains`：冷白/灰绿。

这会影响有群系色调的草、叶、水和天空，但不会把树叶材质模型换成新贴图。由于它会改写服务端群系数据，也不能把它视为只有玩家可见的资源包效果。秋季真实叶块替换由 `visual-effects.autumn-leaf-color` 负责，是另一个模块。

## 故障降级

如果 NMS 类、方法、字段或包签名无法匹配，插件会停用季节染色模块，并记录日志；日历、季节、体温、事件、节日等其他模块继续运行。

不会自动退回旧版逐点染色，因为那会重新引入连续 `setBiome`、`refreshChunk` 和大量数据包压力。

## 性能建议

优先按以下顺序调整：

1. 高在线时先降低 `radius-chunks`；
2. 再降低 `budget-chunks-per-tick`；
3. 保持 `step-xz: 4`、`step-y: 4`，除非确认需要更细采样；
4. 普通 Paper 可在 32～64 范围调整 `max-chunks-per-packet`；
5. 不要同时大幅提高半径、每轮预算和刷新频率。

预算较低时颜色会“逐步展开”，这是预期行为，不代表失效。

## 26.2 不变色检查表

1. 确认 LISeasons 为 1.0.61。
2. 确认 ProtocolLib 成功启用，版本支持当前服务端。
3. 确认 `biome-spoof.nms.enable: true`。
4. 确认当前季节的 `season-switch` 为 `true`。
5. 确认当前世界已启用。
6. 等待半径内区块进入分批预算，或重新进入世界。
7. 搜索日志中的 `NMS`、`ProtocolLib`、`biome`、`signature` 初始化错误。
8. 确认没有只替换 Jar 却未完整重启。

[返回首页](Home.md)
