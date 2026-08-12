# 巨人杀手

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

目标生命比你越高，伤害加成越高。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:goliath` |
| 类型 | 普通 |
| 稀有度 | 稀有 |
| 最高等级 | 6 |
| 适用装备 | 剑 |
| 实际触发 | 攻击最大生命高于自己的目标 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | 节肢杀手 (`bane_of_arthropods`)、[Boss杀手](./boss_hunter.md) (`boss_hunter`)、[暗影打击](./brightness.md) (`brightness`)、[伤害提升](./damage_boost.md) (`damage_boost`)、[末地之力](./end_affinity.md) (`end_affinity`)、[末影杀手](./ender_slayer.md) (`ender_slayer`)、[终结](./finishing.md) (`finishing`)、[先发制人](./first_strike.md) (`first_strike`)、[近战提升](./introversion.md) (`introversion`)、[下界之力](./nether_affinity.md) (`nether_affinity`)、锋利 (`sharpness`)、[屠戮](./slaughter.md) (`slaughter`)、亡灵杀手 (`smite`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 100% | 按双方最大生命差增伤，上限 33% | 单次命中 | 无 | 无 | 无 |
| 2 | 100% | 按双方最大生命差增伤，上限 41% | 单次命中 | 无 | 无 | 无 |
| 3 | 100% | 按双方最大生命差增伤，上限 49% | 单次命中 | 无 | 无 | 无 |
| 4 | 100% | 按双方最大生命差增伤，上限 57% | 单次命中 | 无 | 无 | 无 |
| 5 | 100% | 按双方最大生命差增伤，上限 65% | 单次命中 | 无 | 无 | 无 |
| 6 | 100% | 按双方最大生命差增伤，上限 73% | 单次命中 | 无 | 无 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/goliath.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
