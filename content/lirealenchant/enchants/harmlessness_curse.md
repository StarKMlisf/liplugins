# 攻击失效诅咒

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

持有被诅咒武器攻击时，概率使本次攻击无效。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:harmlessness_curse` |
| 类型 | 诅咒 |
| 稀有度 | 诅咒 |
| 最高等级 | 1 |
| 适用装备 | 武器 |
| 实际触发 | 近战攻击 |
| 自然获取 | 附魔台、战利品 |
| 默认启用 | 是 |
| 冲突附魔 | [暴击率](./crit_luck.md) (`crit_luck`)、[强力暴击](./criticals.md) (`criticals`)、[伤害提升](./damage_boost.md) (`damage_boost`)、[生命偷取](./lifesteal.md) (`lifesteal`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 15% | 完全取消本次攻击 | 单次攻击 | 无 | 无 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/harmlessness_curse.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
