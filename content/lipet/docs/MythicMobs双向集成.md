# MythicMobs 双向集成

LiPet 2.3.0 在原有 `mythic-skills` 的基础上，向 MythicMobs 提供宠物主人目标、经验机制和宠物属性占位符。宠物可以继续按等级、触发器和冷却调用 MM 技能；MM 技能也可以读取 LiPet 档案和提交经验奖励。

这些名称由 LiPet 在 MythicMobs 中注册，不依赖 PlaceholderAPI。只在安装并启用 MythicMobs 时使用；不使用 MM 的服务器仍可使用原版宠物功能。

## 主人目标选择器

| 写法 | 用途 |
| --- | --- |
| `@LipetOwner` | 选择当前施法宠物的在线主人，建议新配置使用此名称 |
| `@PetOwner` | 兼容第三方宠物包；仅在未安装 MCPets 时由 LiPet 注册 |

选择器从技能施法者对应的 LiPet 活动宠物查找主人，不依赖 Bukkit 驯服实体的 owner 字段，因此 MM 生成的宠物也能使用。施法者不是已召唤且归属有效的 LiPet 宠物，或主人不在线时，不选择任何目标。

下面内容放在 MythicMobs 的技能文件中，用于在宠物主人位置显示粒子：

```yaml
# 示例技能名称；需由对应 MM Mob 或 LiPet mythic-skills 调用。
LiPetOwnerAura:
  # MM 技能列表；粒子只表现效果，不改变经验或属性。
  Skills:
    - effect:particles{p=happy_villager;amount=10;hS=0.5;vS=0.5} @LipetOwner
```

同服存在 MCPets 时，LiPet 不接管 `@PetOwner`；MCPets 的同名选择器不保证认识 LiPet 宠物。此时将要交给 LiPet 的技能明确改为 `@LipetOwner`。

## 从 MM 技能给予宠物经验

| 机制 | 参数 | 范围 |
| --- | --- | --- |
| `lipetExperience{amount=N}` | `amount` 为每次给予的经验 | 十进制正整数 `1` 至 `2147483647` |
| `petExperience{exp=N}` | MCPets 兼容名称；仅未安装 MCPets 时注册 | 同上 |

经验给予**机制选中的目标宠物**。给施法宠物自己奖励时必须使用 `@self`；`@LipetOwner` 选中的是玩家，不能用来给宠物加经验。目标必须是 LiPet 当前管理的活动宠物。小数、负数、零、超出范围及无效目标不会提交奖励。

```yaml
# 这是供其他 MM 技能调用的奖励技能；触发频率由服主安排。
LiPetExperienceReward:
  # 每次执行给予目标宠物 25 点经验；1..2147483647。
  Skills:
    - lipetExperience{amount=25} @self
```

未安装 MCPets 时，兼容包的同一行也可写成 `- petExperience{exp=25} @self`。与 MCPets 同服时使用 `lipetExperience` 避免同名机制冲突。

奖励进入 LiPet 原有经验、等级和持久化链，继续受等级上限等成长规则约束；不会另建一套 MM 经验。提交与保存是异步流程，MM 下一行立刻读取 `<lipet.level>` 时不保证已包含这次奖励。机制被接受也不等于数据库保存已经完成。不要把需要“经验已落库”的交易写成紧接其后的 MM 指令。

是否在击杀、交互或定时技能中调用由服主决定；如果同一击杀已经由 LiPet 奖励，再额外调用该机制就会重复奖励。该机制不会自动替所有第三方技能增加经验。

## 读取施法宠物属性

以下占位符读取 MM **施法者 caster 对应的 LiPet 宠物**，不会因为 `@target` 或 `@LipetOwner` 改变而切换档案。它们使用 `<lipet.…>`，与 PlaceholderAPI 的 `%lipet_…%` 是两条不同的接口。

| 占位符 | 返回内容 |
| --- | --- |
| `<lipet.level>` | 当前宠物等级 |
| `<lipet.damage>` | LiPet 计算的宠物攻击伤害数值；不是倍率，也不是本次命中后的最终扣血 |
| `<lipet.max_health>` | LiPet 计算的宠物最大生命值；不是当前剩余生命 |
| `<lipet.strength>` | 已分配力量点数 |
| `<lipet.defense>` | 已分配防御点数；不是减伤百分比 |
| `<lipet.agility>` | 已分配敏捷点数；不是移动速度 |
| `<lipet.vitality>` | 已分配体质点数；不是生命值 |
| `<lipet.quality>` | 存档中的稳定品质 ID，例如 `common`；不是带颜色的显示名 |

`damage` 与 `max_health` 使用 LiPet 的 `PetTraitStats` 计算结果，再加上已学习技能书提供的对应被动加成，包含该计算链中的等级成长、随机成长和性格等效果；不会额外读取临时药水、装备或其他插件直接修改的实体 attribute。它们是 LiPet 的计算属性，不是任何来源伤害都必须采用的最终值。

施法者不是有效 LiPet 活动宠物，宠物已召回或死亡，或其类型配置不存在时，数值占位符返回 `0`，quality 返回空字符串。只有归属仍有效的活动宠物才会返回对应档案值。

在 MM 的技能文件中按伤害属性计算技能数值：

```yaml
# 示例使用当前宠物的 LiPet 伤害数值；目标与触发时机由 MM 配置决定。
LiPetAttributeStrike:
  # a 为伤害表达式；1.5 是本例技能倍率，可按平衡需求调整为正数。
  # poweraffectsdamage 为布尔值；false 避免 MM 再乘 skill.power，使本例只按属性乘 1.5。
  Skills:
    - damage{a="<lipet.damage> * 1.5";poweraffectsdamage=false} @target
```

实际扣血还受 MM 的机制选项、目标护甲、事件监听器和区域规则影响。LiPet 不替第三方 MM 技能重写所有伤害规则，也不会通过占位符强制绕过保护。

## 原有 power 与等级技能

`mythic-skills` 的调用、等级解锁、trigger、概率、冷却和 power 计算保持原行为。最终值由 **MM 原生 `<skill.power>`** 读取：

```text
最终 power = power + max(0, 宠物等级 - unlock-level) × power-per-level
```

对应 LiPet 类型下的配置示例（合并到 `types.<类型ID>` 内，保留其他节点）：

```yaml
# 该宠物调用的 MM 技能列表；技能节点 ID 在当前宠物类型内唯一。
mythic-skills:
  level-10-strike:
    # 是否启用；true 开启，false 保留配置但不调用。
    enabled: true
    # 已在 MM Skills 中定义的技能名称，大小写一致，长度 1..128。
    skill: "LiPetPowerStrike"
    # 触发方式；本例宠物攻击时，其他可用值见 Wiki。
    trigger: "PET_ATTACK"
    # 解锁等级，1..当前类型 maximum-level。
    unlock-level: 10
    # 单次触发概率，必须大于 0 且不超过 1。
    chance: 1.0
    # 独立冷却秒数，0..3600；PASSIVE/INTERVAL 至少 0.5。
    cooldown-seconds: 8.0
    # 解锁时的基础 power，必须大于 0；MM 用 <skill.power> 读取最终值。
    power: 1.0
    # 每超过解锁等级一级增加的 power，至少 0；最高等级最终值不得超过 1000。
    power-per-level: 0.05
```

MM 技能示例：

```yaml
# 本例只沿用既有 power；14 级时 power 为 1.2。
LiPetPowerStrike:
  # 6 为技能基础伤害，可按服务器平衡调整为正数。
  # poweraffectsdamage 为布尔值；显式乘 <skill.power> 时设 false，避免默认流程再乘一次。
  Skills:
    - damage{a="6 * <skill.power>";poweraffectsdamage=false} @target
```

MM 的 `damage` 默认 `poweraffectsdamage=true`，会把 `a` 的计算结果再乘本次技能的 power。因此显式写 `6 * <skill.power>` 时要设 `poweraffectsdamage=false`；否则相当于 `6 × power × power`。本例 14 级、power 为 `1.2` 时，关闭重复乘算后的基础结果是 `7.2`。

如果直接沿用 MM 默认的一次 power 缩放，也可以写 `- damage{a=6} @target`，无需在 `a` 中再次引用 `<skill.power>`。LiPet 传入 power 的计算与调用没有改变。

`<lipet.damage>` 已表示 LiPet 算出的伤害数值。上一个属性伤害示例设置 `poweraffectsdamage=false`，确保按“宠物伤害 × 1.5”计算；保留默认 `true` 或另外显式乘 `<skill.power>` 时，两套成长就会共同生效。按设计选择或明确组合，不要误把 damage 当成 damagemodifier。

## 第三方 MCPets 包迁移边界

LiPet 已支持把含 `Id`、`MythicMob` 等核心字段的 MCPets 单宠物 YML 放入 `plugins/LiPet/宠物/` 子目录，在内存中转换读取，不改写原文件。MM Mob、Skills、模型蓝图和客户端资源包仍需安装到各自插件的正确位置；完整支持字段见 [Wiki 的 MCPets 说明](WIKI.md#mcpets-自定义宠物)。

本次补齐主人目标、宠物经验和属性读取三类接口，能减少技能重写。不能据此承诺任意 MCPets 包零改写迁移：

- 未安装 MCPets 时可兼容 `@PetOwner` 与 `petExperience{exp=N}`；同服存在 MCPets 时使用 LiPet 专名。
- `<pet.damagemodifier>` 是原插件的伤害倍率概念，不能等价替换成完整伤害数值；LiPet 不注册这一误导别名。按包的公式重新核对，以 `<lipet.damage>` 或原有 `<skill.power>` 表达。
- 依赖 MCPets 的其他机制、条件、Signals、Skins、权限或行为，需分别转换或继续由其原插件执行。本次没有实现这些未支持的 MCPets 功能。
- MM 自身事件启动的技能与 LiPet `mythic-skills` 的调用来源不同；LiPet 的主动攻击开关不等于禁用第三方 Mob 配置里的所有定时或事件技能。

## 安装与修改

升级到 2.3.0 时正常停服并备份配置、数据库和恢复台账，只保留一个 `LiPet-2.3.0.jar`，正常启动后确认 `Enabling LiPet v2.3.0`。不要覆盖现有宠物文件或数据库配置。

修改 LiPet 的 `mythic-skills` 后执行 `/lipet reload`；修改 MM Mob 或 Skills 后使用 MythicMobs 自身的重载流程。安装、卸载 MCPets 或更换 Jar 后正常重启，让自定义名称按当前前置组合重新注册。只执行 LiPet 重载不会替换 MM 已读取的技能定义。

本轮实际验证范围、依赖版本和成品哈希见 [2.3.0 更新说明](更新日志-2026-10-06-MythicMobs双向集成.md)。
