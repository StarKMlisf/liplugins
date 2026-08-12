# 过载

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

弓弩命中时按对应等级概率造成额外 对应等级数值 伤害。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:overload` |
| 类型 | 普通 |
| 稀有度 | 传说 |
| 最高等级 | 3 |
| 适用装备 | 弓或弩 |
| 实际触发 | 弓弩或三叉戟命中 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [暴击率](./crit_luck.md) (`crit_luck`)、[强力暴击](./criticals.md) (`criticals`)、[跳投](./jumpshot.md) (`jumpshot`)、多重射击 (`multishot`)、[海神](./neptune.md) (`neptune`)、[穿透](./piercing.md) (`piercing`)、[快速射击](./rapid.md) (`rapid`)、[绝境爆发](./shura.md) (`shura`)、[颅骨穿刺](./skull_puncture.md) (`skull_puncture`)、[狙击](./snipe.md) (`snipe`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 10% | 触发后远程伤害 +10% | 单次命中 | 无 | 无 | 无 |
| 2 | 20% | 触发后远程伤害 +20% | 单次命中 | 无 | 无 | 无 |
| 3 | 30% | 触发后远程伤害 +30% | 单次命中 | 无 | 无 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/overload.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
