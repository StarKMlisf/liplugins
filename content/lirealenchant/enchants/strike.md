# 雷击

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

武器命中时按等级概率召唤单体落雷。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:strike` |
| 类型 | 普通 |
| 稀有度 | 史诗 |
| 最高等级 | 3 |
| 适用装备 | 武器 |
| 实际触发 | 武器或弹射物命中 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [流血](./bleed.md) (`bleed`)、火焰附加 (`fire_aspect`)、火矢 (`flame`)、[霜冻](./frost.md) (`frost`)、[永冻](./permafrost.md) (`permafrost`)、[毒藤](./poison_ivy.md) (`poison_ivy`)、[电闪雷鸣](./sparks.md) (`sparks`)、[风暴](./storm.md) (`storm`)、[雷神之怒](./thor.md) (`thor`)、[刺痛](./twinge.md) (`twinge`)、[毒刺之地](./venomous_ground.md) (`venomous_ground`)、[凋亡](./withering.md) (`withering`)、[创伤](./wound.md) (`wound`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 8% | 额外造成 2.5 点伤害 | 瞬时 | 无 | 闪电视觉效果 | 雷声 |
| 2 | 12% | 额外造成 3.5 点伤害 | 瞬时 | 无 | 闪电视觉效果 | 雷声 |
| 3 | 16% | 额外造成 4.5 点伤害 | 瞬时 | 无 | 闪电视觉效果 | 雷声 |

## 配置位置

`plugins/LiRealEnchant2/enchants/strike.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
