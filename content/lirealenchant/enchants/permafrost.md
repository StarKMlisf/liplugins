# 永冻

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

剑命中时有概率冻结目标，附加强减速并显示冰壳效果。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:permafrost` |
| 类型 | 普通 |
| 稀有度 | 传说 |
| 最高等级 | 3 |
| 适用装备 | 剑 |
| 实际触发 | 近战命中 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [黑暗](./blackout.md) (`blackout`)、[流血](./bleed.md) (`bleed`)、[混乱](./confusion.md) (`confusion`)、火焰附加 (`fire_aspect`)、火矢 (`flame`)、[致盲](./flashbang.md) (`flashbang`)、[霜冻](./frost.md) (`frost`)、[麻痹](./paralyze.md) (`paralyze`)、[毒藤](./poison_ivy.md) (`poison_ivy`)、[束缚](./snare.md) (`snare`)、[电闪雷鸣](./sparks.md) (`sparks`)、[风暴](./storm.md) (`storm`)、[雷击](./strike.md) (`strike`)、[晕眩](./stun.md) (`stun`)、[雷神之怒](./thor.md) (`thor`)、[刺痛](./twinge.md) (`twinge`)、[毒刺之地](./venomous_ground.md) (`venomous_ground`)、[凋亡](./withering.md) (`withering`)、[创伤](./wound.md) (`wound`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 30% | 冻结目标并施加缓慢 VI、挖掘疲劳 II | 冻结 8 秒；减速 2.5 秒 | 无 | 雪花 34 个与发光浮冰方块 | 玻璃放置声 |
| 2 | 42% | 冻结目标并施加缓慢 VI、挖掘疲劳 II | 冻结 9 秒；减速 3.25 秒 | 无 | 雪花 44 个与发光浮冰方块 | 玻璃放置声 |
| 3 | 54% | 冻结目标并施加缓慢 VI、挖掘疲劳 II | 冻结 11.5 秒；减速 4 秒 | 无 | 雪花 54 个与发光浮冰方块 | 玻璃放置声 |

## 配置位置

`plugins/LiRealEnchant2/enchants/permafrost.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
