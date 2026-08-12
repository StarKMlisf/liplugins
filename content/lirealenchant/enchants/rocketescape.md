# 火箭逃脱

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

穿戴护甲时潜行右键，主动向后弹射脱离危险。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:rocketescape` |
| 类型 | 普通 |
| 稀有度 | 史诗 |
| 最高等级 | 2 |
| 适用装备 | 靴子 |
| 实际触发 | 穿戴护甲时潜行右键 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [箭跃](./arrow_leap.md) (`arrow_leap`)、[悬浮](./ascend.md) (`ascend`)、[突进](./charge.md) (`charge`)、[疾速逃脱](./escape.md) (`escape`)、[动量](./momentum.md) (`momentum`)、[滑流](./slipstream.md) (`slipstream`)、[流线型](./streamlining.md) (`streamlining`)、[传送](./transmission.md) (`transmission`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 100% | 向后弹射，水平速度 1.05 | 瞬时 | 45 秒 | 无 | 烟花发射声 |
| 2 | 100% | 向后弹射，水平速度 1.3 | 瞬时 | 45 秒 | 无 | 烟花发射声 |

## 配置位置

`plugins/LiRealEnchant2/enchants/rocketescape.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
