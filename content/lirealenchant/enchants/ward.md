# 护符

[返回附魔图鉴](../附魔图鉴.md) · [返回首页](../Home.md)

穿戴者受击时生成短暂吸收护盾。

| 项目 | 内容 |
|---|---|
| 注册键 | `yunmengze:ward` |
| 类型 | 普通 |
| 稀有度 | 普通 |
| 最高等级 | 3 |
| 适用装备 | 护甲 |
| 实际触发 | 穿戴者受到攻击 |
| 自然获取 | 附魔台、战利品、村民交易 |
| 默认启用 | 是 |
| 冲突附魔 | [药水免疫](./arcane_defence.md) (`arcane_defence`)、[群体减伤](./aura.md) (`aura`)、爆炸保护 (`blast_protection`)、火焰保护 (`fire_protection`)、[守护者](./guardians.md) (`guardians`)、[黑曜石盾](./obsidianshield.md) (`obsidianshield`)、弹射物保护 (`projectile_protection`)、保护 (`protection`)、[安全守护](./safeguard.md) (`safeguard`)、[石肤](./stone.md) (`stone`)、[卓越](./superior.md) (`superior`)、[坦克](./tank.md) (`tank`) |

## 每级实际参数

| 等级 | 概率 | 伤害或效果 | 持续时间 | 冷却 | 粒子 | 声音 |
|---:|---:|---|---|---|---|---|
| 1 | 14% | 获得吸收 1 | 5.5 秒 | 无 | 药水效果粒子 | 无 |
| 2 | 20% | 获得吸收 2 | 7 秒 | 无 | 药水效果粒子 | 无 |
| 3 | 26% | 获得吸收 3 | 8.5 秒 | 无 | 药水效果粒子 | 无 |

## 配置位置

`plugins/LiRealEnchant2/enchants/ward.yml`

- `enabled`、`max-level`、`targets` 和三个自然获取开关修改后可先执行 `/lre reload` 更新运行过滤。
- 注册键、最高等级、适用物品和原版候选池标签属于启动期结构，生产环境修改后应完整重启。
- 本页参数来自 dev195 最终实服 QA 报告；服务器自行修改机制参数后，以服务器配置与实测结果为准。
