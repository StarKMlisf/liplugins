# LiPet 0.27.0 MythicMobs 等级技能

日期：2026-08-29

版本：`0.27.0-SNAPSHOT`

## 新增内容

- 每个 `宠物类型/*.yml` 都可以维护自己的 MythicMobs 技能列表，不同宠物互不影响。
- 每项技能支持解锁等级、触发方式、触发概率、独立冷却、基础 `power` 和每级 `power` 成长。
- 低于 `unlock-level` 时技能完全不会施放；宠物升级达到要求后自动生效，不需要重新召唤或学习技能书。
- 支持 `PASSIVE`、`INTERVAL`、`OWNER_ATTACK`、`OWNER_DEFEND`、`PET_ATTACK`、`PET_DEFEND`、`INTERACT` 七种触发方式。
- 技能施放前会预占冷却，防止 MM 技能造成的伤害再次进入同一技能并递归触发。
- MythicMobs 只作为 `softdepend` 运行时挂钩，不会被打进 LiPet Jar；未安装时 LiPet 仍会正常启动和提供其他功能。

## 配置示例

把下面内容放在对应宠物类型下，例如 `plugins/LiPet/宠物类型/狼.yml` 的 `types.wolf` 内：

```yaml
mythic-skills:
  level-10-bite:
    # 是否启用这项技能。
    enabled: true
    # MythicMobs 技能文件中的内部技能名，区分大小写。
    skill: "LiPetWolfBite"
    # 宠物攻击目标时尝试触发。
    trigger: "PET_ATTACK"
    # 宠物达到 10 级才解锁。
    unlock-level: 10
    # 每次事件有 35% 概率触发，范围 0.0-1.0。
    chance: 0.35
    # 同一只宠物的这项技能独立冷却 8 秒。
    cooldown-seconds: 8.0
    # 解锁等级时传给 MythicMobs 的基础 power。
    power: 1.0
    # 每高于解锁等级 1 级，power 增加 0.05。
    power-per-level: 0.05
```

实际威力计算：

```text
最终 power = power + max(0, 宠物等级 - unlock-level) × power-per-level
```

例如上面的宠物在 14 级时，传给 MythicMobs 的 `power` 为 `1.2`。

## 触发方式

| 值 | 触发时机 |
| --- | --- |
| `PET_ATTACK` | 宠物攻击目标时 |
| `PET_DEFEND` | 宠物受到攻击时；即使成功闪避也会进入本触发器 |
| `OWNER_ATTACK` | 宠物主人攻击目标时 |
| `OWNER_DEFEND` | 宠物主人受到攻击时 |
| `INTERACT` | 主人对已召唤宠物进行普通主手交互时 |
| `PASSIVE` | 宠物行为循环中按冷却周期执行 |
| `INTERVAL` | 宠物行为循环中按冷却周期执行 |

`PASSIVE` 和 `INTERVAL` 必须配置至少 `0.5` 秒冷却。定时触发会优先把宠物当前战斗目标交给 MythicMobs；没有战斗目标时使用主人作为目标。

## 升级兼容

- 新服生成的 `狼.yml` 与 `猫.yml` 已包含带完整中文注释且默认关闭的示例。
- 旧宠物类型文件缺少 `mythic-skills` 时，会自动补入默认关闭的示例与中文注释。
- 插件只补缺失节点，不覆盖已有技能、值和管理员注释。
- 配置中的解锁等级不能高于该宠物的 `growth.maximum-level`，非法触发器、概率、冷却或 `power` 会在加载时给出明确中文配置错误。

## 验证

- 默认构建与 Paper 26.2 Profile 各 144 项自动测试通过，失败、错误和跳过均为 0。
- 测试覆盖等级锁、解锁后施放、概率与冷却、`power` 等级成长、MM 5.x 详细调用参数、配置补全与非法值拒绝。
- Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 使用真实 0.26.26 多 YML 配置启动，狼、猫文件均自动补入完整中文注释和默认关闭示例。
- `/lipet reload` 成功；`/lipet status` 显示 PlayerPoints `ONLINE`、MythicMobs `OFFLINE`；未安装 MM 时 LiPet 无报错并安全关闭。
- 当前环境没有真实 MythicMobs Jar，因此实际 MM 技能施放仍需在安装 MM 的目标测试服确认；反射单测已按当前 MM 5.x 七参数 API 验证目标和 `power` 传递。

## 成品

- 文件：`target/LiPet-0.27.0-SNAPSHOT.jar`
- 大小：`748702` 字节
- SHA-256：`D2090041BA7C187A86C8C627F2DF9D499723795ACFF2FC53EF4DD664D89D09E2`
