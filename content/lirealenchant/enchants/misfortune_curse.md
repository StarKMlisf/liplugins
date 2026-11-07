# 霉运诅咒

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

挖掘方块时概率使方块不掉落物品。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:misfortune_curse` |
| 类型 | 诅咒 |
| 稀有度 | 诅咒 |
| 最高等级 | 1 |
| 适用装备 | 全部工具 |
| 实际触发 | 破坏方块 |
| 自然获取 | 附魔台、战利品 |
| 默认启用 | 是 |
| 冲突附魔 | 时运 (`fortune`)、[宝石化](./gemify.md) (`gemify`)、[自动熔炼](./infernal_touch.md) (`infernal_touch`)、[下界勘探者](./nether_prospector.md) (`nether_prospector`)、精准采集 (`silk_touch`)、[刷怪笼采掘](./spawner_miner.md) (`spawner_miner`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 15% | 本次方块不掉落物品 | 单次破坏 | 无 | 无 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/misfortune_curse.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
