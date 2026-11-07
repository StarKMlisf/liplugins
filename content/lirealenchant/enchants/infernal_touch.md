# 自动熔炼

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

挖掘可熔炼方块时自动熔炼掉落物。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:infernal_touch` |
| 类型 | 普通 |
| 稀有度 | 稀有 |
| 最高等级 | 1 |
| 适用装备 | 镐 |
| 实际触发 | 破坏支持熔炼的方块 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [宝石化](./gemify.md) (`gemify`)、[霉运诅咒](./misfortune_curse.md) (`misfortune_curse`)、[下界勘探者](./nether_prospector.md) (`nether_prospector`)、精准采集 (`silk_touch`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 100% | 将铁、金、铜矿等掉落直接替换为熔炼产物 | 瞬时 | 无 | 无 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/infernal_touch.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
