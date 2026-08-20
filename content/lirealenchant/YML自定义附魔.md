# YML 自定义附魔

[返回首页](./Home.md)

dev199 支持只用单个 YML 文件创建真实 `yunmengze:*` 附魔。设计参考了 [Aiyatsbus 创建附魔的分层方式](https://wiki.polarastrum.cc/category/%E5%88%9B%E5%BB%BA%E9%99%84%E9%AD%94)：基础资料、变量、限制和触发机制彼此分开；LiReal 不执行 Kether、命令或任意 Java 类，只开放经过校验的动作白名单。

## 能做到什么

YML 适合制作不需要额外 Java 代码的常规附魔：

- 攻击增伤、暴击、吸血、中毒、缓慢、燃烧和击退。
- 护甲减伤、反伤提示、受击治疗和受击增益。
- 左右键主动技能、自身增益、声音和粒子表现。
- 射击时强化自己，或在投射物命中后给目标施加效果。
- 按等级、生命值、世界、权限、PVP/PVE、潜行和蓄力状态控制触发。

YML 不是任意插件脚本。范围选敌、连锁挖掘、修改方块掉落、生成实体、数据库、经济、GUI 和第三方插件联动仍应使用 [API 自定义附魔](./API自定义附魔.md)。YML 不允许执行命令、Kether、脚本、反射或任意 Java 类。

## 文件分层

一个 YML 附魔分为四层：

| 层级 | 主要节点 | 用途 |
| --- | --- | --- |
| Registry 基础资料 | `id`、`namespace`、`max-level`、`targets` | 决定真实附魔身份、等级和适用物品 |
| 展示与获取 | `display-name`、`description`、`placeholders`、三个来源开关 | 决定 Lore、资料库与自然获取 |
| 运行变量 | `variables` | 保存概率、伤害、时间等可复用数字公式 |
| 行为机制 | `mechanics.triggers` | 决定何时触发、满足什么条件、执行哪些动作 |

`mechanics.trigger`、`chance-per-level`、`value-placeholder`、`duration`、`particles` 和 `sound` 是资料库摘要，不会自动产生实际效果。真实行为必须写在 `mechanics.triggers` 中。

## 创建步骤

1. 启动一次 dev199，在 `plugins/LiRealEnchant2/enchants/` 找到 `_yaml-enchant-example.yml`。
2. 复制模板并去掉文件名前面的下划线，例如改为 `thunder_edge.yml`。
3. 修改 `id`、显示资料、目标、来源、变量、条件和动作。
4. 完整重启服务器，让 Paper 在 bootstrap 阶段注册真实附魔。
5. 查看启动日志中的 `Registry 注册` 和 `YML 机制`；两项都必须完整。
6. 使用 `/lre givebook <玩家> thunder_edge 1` 领取测试书，或使用 `/lre giveitem <玩家> diamond_sword thunder_edge 1` 直接生成测试装备。
7. 手持成品执行 `/lre debug hand`，确认真实附魔 ID、等级和槽位已经写入。

模板文件以下划线开头时不会被扫描，也不会改变现有 122 个内置附魔。

开始前先确认：

- 文件编码为 UTF-8，不能带错误缩进或 Tab。
- 文件名建议与 `id` 一致，例如 `frost_edge.yml`。
- 新 ID 不与 122 个内置 LiReal 附魔及其他自定义 YML 重复。
- `implementation: yaml` 和 `mechanics.provider: yaml` 均保留。
- 复制模板后必须去掉文件名前面的 `_`，否则插件会有意忽略它。

## 最小示例

```yaml
# id：唯一新 ID，只允许小写字母、数字和下划线，不能覆盖 122 个内置附魔。
id: frost_edge
# namespace：固定为 yunmengze。
namespace: yunmengze
# implementation：启用纯 YML 行为。
implementation: yaml
# enabled：是否注册和启用。
enabled: true
# display-name：支持 & 颜色代码。
display-name: "&b霜刃"
# description：支持 placeholders 中的显示变量。
description: "攻击时有 %chance% 概率追加 %damage% 点伤害。"
# placeholders：仅负责 Lore 和图鉴文字。
placeholders:
  chance: "{min(100, 25 * %level%)}%"
  damage: "{1.2 * %level%}"
# type/rarity/max-level：类型、品质和最高等级。
type: normal
rarity: rare
max-level: 3
# 三种自然获取路径开关。
tradeable: true
discoverable: true
enchantable: true
# 适用物品与冲突附魔。
targets: [weapon]
conflicts: [damage_boost]

# 数字变量：可在概率、冷却和动作参数中复用。
variables:
  leveled:
    chance: "min(100, 25 * %level%)"
    damage: "1.2 * %level%"
  ordinary:
    cooldown: 2

mechanics:
  # provider：与 implementation 保持一致。
  provider: yaml
  # 以下摘要字段用于图鉴展示。
  trigger: "近战攻击命中"
  chance-per-level: "{min(100, 25 * %level%)}%"
  cooldown-seconds: "2 秒"
  value-placeholder: "追加 {1.2 * %level%} 点伤害"
  duration: "瞬时"
  particles: "SNOWFLAKE"
  sound: "minecraft:entity.player.hurt_freeze"

  # triggers：真实执行区。
  triggers:
    attack:
      chance: "%chance%"
      cooldown-seconds: "%cooldown%"
      conditions:
        combat: any
        projectile: false
      actions:
        - type: extra-damage
          value: "%damage%"
        - type: particle
          target: target
          particle: SNOWFLAKE
          amount: 12
          offset-x: 0.3
          offset-y: 0.5
          offset-z: 0.3
          speed: 0.02
```

## 基础字段

| 节点 | 必填 | 取值 | 说明 |
| --- | --- | --- | --- |
| `id` | 是 | 小写字母、数字、下划线 | 唯一 ID；`frost-edge` 会归一化为 `frost_edge`，仍建议直接写下划线 |
| `namespace` | 是 | `yunmengze` | 当前固定命名空间，不能使用 `minecraft` |
| `implementation` | 是 | `yaml` | 声明由 YML 行为系统执行 |
| `enabled` | 否 | `true/false` | 默认为 `true`；关闭后不注册、不执行、不进入自然获取 |
| `display-name` | 是 | 文本 | 玩家看到的附魔名，支持 `&` 颜色代码 |
| `description` | 建议 | 文本 | Lore 与资料库描述，可引用 `placeholders` |
| `type` | 建议 | `normal/spell/curse/special` | 普通、技能、诅咒或特殊类型 |
| `rarity` | 建议 | 见下表 | 影响资料展示及 Registry 权重配置 |
| `max-level` | 是 | 大于等于 `1` | 最高等级，建议控制在 `1-10` |
| `tradeable` | 是 | `true/false` | 是否进入 LiReal 村民交易来源 |
| `discoverable` | 是 | `true/false` | 是否进入 LiReal 战利品来源 |
| `enchantable` | 是 | `true/false` | 是否进入 LiReal 附魔台来源 |
| `targets` | 是 | 物品组列表 | 控制书能否附到对应装备，并参与铁砧/菜单校验 |
| `conflicts` | 否 | 附魔 ID 列表 | 与原版附魔写 `minecraft:sharpness`，LiReal ID 可只写 `damage_boost` |

支持的品质：

| 配置值 | 含义 |
| --- | --- |
| `common` | 普通 |
| `uncommon` | 优良 |
| `rare` | 稀有 |
| `epic` | 史诗 |
| `legendary` | 传说 |
| `special` | 特殊 |
| `veryspecial` | 超特殊，内部归一化为 `super_special` |

三个自然获取开关只控制 LiReal 自定义附魔，不会关闭或替换原版 `minecraft:*` 附魔。管理员 `/lre givebook`、`/lre giveitem` 和测试工具不受自然获取开关影响。

## 适用物品

`targets` 必须使用插件已经识别的物品组。未知名称不会自动匹配新物品，可能导致附魔只能存在于书上。

| 分组 | 包含物品 |
| --- | --- |
| `sword`、`axe`、`pickaxe`、`shovel`、`hoe` | 对应全材质工具 |
| `spear` | 木、石、铜、铁、金、钻石、下界合金矛 |
| `bow` | 弓和弩；也可写 `bow_or_crossbow` |
| `crossbow`、`trident`、`mace` | 对应单独武器 |
| `fishing_rod`、`shield`、`shears`、`bundle` | 对应单独物品 |
| `helmet`、`chestplate`、`leggings`、`boots` | 对应护甲部位 |
| `elytra` | 鞘翅 |
| `weapon` | 剑、斧、矛、三叉戟、弓和弩 |
| `armor` | 四类常规护甲和海龟壳 |
| `all_tools` | 镐、斧、铲、锄和剪刀 |
| `all_equipment` | 常用工具、武器、护甲、鞘翅、钓鱼竿、盾牌和剪刀 |

按实际触发入口选择最窄的组。只在近战攻击触发的附魔优先写 `sword`、`axe`、`spear` 或 `mace`，不要为了省事全部写成 `all_equipment`。

```yaml
targets:
  - sword
  - spear

conflicts:
  - damage_boost
  - minecraft:sharpness
```

冲突会在铁砧、附魔台和菜单中校验。配置冲突时应测试“装备在左、附魔书在右”和“附魔书在左、装备在右”两种方向，确认无效结果不会消耗附魔书。

## 触发器

| 配置名 | 触发时机 | 附魔读取位置 |
| --- | --- | --- |
| `attack` | 玩家近战或投射物造成伤害 | 主手武器或发射时武器快照 |
| `defend` | 玩家受到实体伤害 | 护甲、主手和副手 |
| `block-break` | 玩家破坏方块 | 主手工具 |
| `interact` | 玩家左键或右键交互 | 事件对应手中的物品 |
| `shoot` | 玩家成功发射投射物 | 弓、弩或对应发射物品 |
| `projectile-hit` | 已记录的投射物命中实体或方块 | 发射时附魔快照 |

事件已被其他插件取消时不会触发。投射物会保存发射时等级，切换手持物不会串用新物品。

### 触发上下文

`target` 在不同触发器中含义不同，选择动作前应先确认上下文：

| 触发器 | `self` | `target` | 能否修改当前伤害 |
| --- | --- | --- | --- |
| `attack` | 攻击者 | 被攻击的生物或玩家 | 可以 |
| `defend` | 穿戴附魔的受击玩家 | 攻击者；箭等投射物会解析为发射者 | 可以 |
| `block-break` | 挖掘玩家 | 没有实体目标 | 不可以 |
| `interact` | 交互玩家 | 没有实体目标 | 不可以 |
| `shoot` | 发射玩家 | 没有实体目标 | 不可以 |
| `projectile-hit` | 发射玩家 | 命中的生物；命中方块时为空 | 不可以 |

因此：

- `extra-damage` 和 `damage-multiplier` 只应放在 `attack` 或 `defend`。
- `defend` 中的伤害倍率作用于玩家本次受到的伤害，例如 `0.8` 表示减伤 20%。
- `interact`、`shoot` 和 `block-break` 的药水、治疗应使用 `target: self`。
- `projectile-hit` 命中方块时，面向 `target` 的药水、治疗、点燃和击退会安全跳过。
- 粒子和声音没有实体目标时会回退到命中方块位置；仍没有方块时回退到玩家位置。
- 同一触发器中的 `actions` 按书写顺序执行。后续公式读取到的 `%event_damage%` 会反映前面已经修改的事件伤害。

### 常用组合

| 想实现的效果 | 推荐触发器 | 推荐条件/动作 |
| --- | --- | --- |
| 近战暴击 | `attack` | `projectile: false`、`full-charge: true`、`extra-damage` |
| 箭矢命中减速 | `attack` | `projectile: true`、`potion target` |
| 箭矢落点粒子 | `projectile-hit` | `particle target`、`sound target` |
| 护甲受击减伤 | `defend` | `damage-multiplier` 小于 `1` |
| 护甲受击反制 | `defend` | `potion/ignite/knockback target` |
| 右键主动增益 | `interact` | `interact-actions` + `potion self` |
| 射击后短暂加速 | `shoot` | `potion self` |
| 挖掘时自身增益 | `block-break` | `potion self`、方块位置粒子 |

## 条件

条件写在某个触发器的 `conditions` 下；同一触发器内全部条件必须同时满足。

| 节点 | 取值 | 说明 |
| --- | --- | --- |
| `combat` | `any/pvp/pve` | 全部、仅玩家、仅非玩家生物 |
| `projectile` | `true/false` | 只允许或排除投射物；删除则不检查 |
| `sneaking` | `true/false` | 要求潜行或要求未潜行；删除则不检查 |
| `full-charge` | `true/false` | 要求完整或未完整蓄力；删除则不检查 |
| `permission` | 权限节点 | 留空不检查 |
| `allowed-worlds` | 世界名列表 | 空列表允许全部世界 |
| `disabled-worlds` | 世界名列表 | 列表中的世界始终禁用 |
| `interact-actions` | Bukkit 交互类型列表 | 如 `RIGHT_CLICK_AIR`、`RIGHT_CLICK_BLOCK` |
| `target-types` | 实体 ID 列表 | 如 `player`、`zombie` |
| `player-health-min/max` | `0-100` | 玩家生命百分比范围 |
| `target-health-min/max` | `0-100` | 目标生命百分比范围 |

`chance` 范围会限制为 `0-100`，`cooldown-seconds` 范围会限制为 `0-86400`。冷却按“玩家 + 附魔 + 触发器”隔离，条件或概率失败不会消耗冷却。

条件使用注意：

- `full-charge: true` 只对 `attack` 的近战攻击有意义；投射物和其他触发器不会被视为完整近战蓄力。
- `interact-actions` 只对 `interact` 有意义，支持 `LEFT_CLICK_AIR`、`LEFT_CLICK_BLOCK`、`RIGHT_CLICK_AIR`、`RIGHT_CLICK_BLOCK` 和 `PHYSICAL`。
- `combat: pvp/pve` 需要实体目标。`interact`、`shoot` 和普通 `block-break` 应使用 `any`。
- `allowed-worlds` 与 `disabled-worlds` 使用真实世界文件夹名并区分大小写。黑名单优先于白名单。
- `target-health-min/max` 在没有实体目标时无法满足；默认 `0-100` 不强制要求目标。
- `permission` 是触发权限，不是获取权限。没有权限的玩家仍可持有该附魔，但技能不会执行。

```yaml
conditions:
  combat: pve
  projectile: false
  sneaking: true
  full-charge: true
  permission: "lirealenchant.use.shadow_strike"
  allowed-worlds: [world, resource_world]
  disabled-worlds: [spawn]
  target-types: [zombie, skeleton]
  player-health-min: 0
  player-health-max: 50
  target-health-min: 20
  target-health-max: 100
```

## 动作

| `type` | 必要参数 | 默认值与安全范围 | 作用 |
| --- | --- | --- | --- |
| `extra-damage` | `value` | `0-2048` | 增加当前伤害，不创建第二次伤害事件 |
| `damage-multiplier` | `value` | `0-64` | 乘算当前伤害；`0.8` 表示 80% |
| `potion` | `effect` | `target: target`；持续 `1-72000` tick；等级 `0-255` | 施加原版药水效果，`amplifier: 0` 为 I 级 |
| `particle` | `particle` | 数量 `1-500`；偏移 `0-16`；速度 `0-10` | 播放不需要额外数据的 Bukkit 粒子 |
| `sound` | `sound` | 音量 `0-16`；音调 `0.5-2` | 播放原版或资源包声音键 |
| `heal` | `value` | `target: self`；治疗 `0-2048` | 治疗且不超过最大生命 |
| `ignite` | 无 | `target: target`；默认 `3` 秒，最多 `3600` 秒 | 延长目标燃烧时间 |
| `knockback` | 无 | 水平默认 `0.8`、范围 `0-8`；垂直默认 `0.25`、范围 `-4` 到 `4` | 从附魔持有者方向击退 |

`target` 支持 `self` 和 `target`。没有目标的触发器使用 `target` 药水、治疗、点燃或击退时会安全跳过；粒子和声音会回退到方块或玩家位置。

表达式超过动作安全范围时会被限制到边界，而不是继续放大。例如 `amount: 10000` 最终只生成 500 个粒子。不要依赖这个保护做平衡，生产配置仍应填写合理值。

### 伤害动作

```yaml
actions:
  # 在原事件伤害上加 2 × 等级。
  - type: extra-damage
    value: "2 * %level%"
  # 再把已经增加后的伤害乘以 1.15。
  - type: damage-multiplier
    value: 1.15
```

伤害动作修改的是当前事件，因此不会额外制造一次伤害事件，也不会因为自身附魔再次触发。`defend` 使用 `damage-multiplier: 0.75` 可实现本次受击减伤 25%。

### 药水动作

```yaml
- type: potion
  target: target
  effect: minecraft:poison
  duration-seconds: "1 + %level%"
  amplifier: 0
  ambient: false
  particles: true
  icon: true
```

- `effect` 可省略 `minecraft:`，例如 `poison`、`slowness`、`speed`。
- `duration-seconds` 默认 `3` 秒；也可使用 `duration-ticks`，两者同时存在时 ticks 优先。
- `amplifier` 从 `0` 开始：`0` 是 I 级，`1` 是 II 级。
- `ambient`、`particles`、`icon` 默认分别为 `false`、`true`、`true`。

### 粒子动作

```yaml
- type: particle
  target: target
  particle: ELECTRIC_SPARK
  amount: 18
  offset-x: 0.35
  offset-y: 0.55
  offset-z: 0.35
  speed: 0.03
```

默认值为数量 `12`、X/Y/Z 偏移 `0.3/0.5/0.3`、速度 `0.02`。仅支持 Bukkit 中数据类型为 `Void` 的粒子；需要方块材质、物品、颜色或 Dust 数据的粒子会在加载时明确拒绝。

### 声音动作

```yaml
- type: sound
  target: target
  sound: minecraft:entity.lightning_bolt.impact
  volume: 0.8
  pitch: 1.25
```

原版声音必须使用 Registry 键，例如 `minecraft:entity.player.levelup`，不能写 Java 枚举式的 `ENTITY_PLAYER_LEVELUP`。资源包自定义声音可以写自己的命名空间键，例如 `my_pack:skills.frost_hit`。

### 治疗、点燃和击退

```yaml
actions:
  - type: heal
    target: self
    value: "0.5 * %level%"
  - type: ignite
    target: target
    duration-seconds: "1 + %level%"
  - type: knockback
    target: target
    horizontal: "0.5 + 0.1 * %level%"
    vertical: 0.25
```

不支持 `command`、`script`、`kether`、`class`，也不允许从 YML 反射加载类。需要连锁挖掘、复杂方块修改、数据库、经济或第三方插件逻辑时使用 [API 自定义附魔](./API自定义附魔.md)，并通过领地安全接口逐方块检查。

## 变量和公式

### 两套变量不要混用

| 节点 | 用途 | 能否控制技能 |
| --- | --- | --- |
| `placeholders` | 替换 `description` 和资料库文字 | 不能，只负责显示 |
| `variables` | 供概率、冷却和动作参数计算 | 可以 |

如果只修改 `placeholders.damage`，玩家看到的 Lore 会变化，但真实伤害不会变化。要同步调整数值，必须同时修改 `variables` 中对应公式。推荐让两边公式保持一致。

```yaml
description: "有 %chance% 概率追加 %damage% 点伤害。"
placeholders:
  chance: "{min(100, 20 + 10 * %level%)}%"
  damage: "{1.5 * %level%}"

variables:
  leveled:
    chance: "min(100, 20 + 10 * %level%)"
    damage: "1.5 * %level%"
```

### 内置运行变量

| 变量 | 含义 | 没有目标或伤害事件时 |
| --- | --- | --- |
| `%level%` 或 `{level}` | 当前附魔等级 | 始终可用 |
| `%event_damage%` | 当前伤害事件数值 | `0` |
| `%player_health%` | 附魔持有者当前生命 | 始终可用 |
| `%player_max_health%` | 附魔持有者最大生命 | 始终可用 |
| `%player_health_percent%` | 附魔持有者生命百分比 | 始终可用 |
| `%target_health%` | 目标当前生命 | `0` |
| `%target_max_health%` | 目标最大生命 | `0` |
| `%target_health_percent%` | 目标生命百分比 | `0` |

`variables.leveled` 和 `variables.ordinary` 在运行时都能使用公式。两者的区别主要是配置组织方式：`leveled` 用于明确表示随等级变化的数值，`ordinary` 用于固定值或公共参数。同名变量不能同时出现在两组中。

变量名建议只用小写字母、数字和下划线，并使用 `%变量名%` 或 `{变量名}` 引用：

```yaml
variables:
  leveled:
    base_damage: "1.2 * %level%"
    low_health_bonus: "%base_damage% * 0.5"
  ordinary:
    cooldown: 3
```

### 数学表达式

运行变量支持：

- 四则运算：`+ - * /`
- 小括号：`( )`
- 单参数函数：`ceil`、`floor`、`round`、`abs`、`sqrt`
- 双参数函数：`min`、`max`
- 三参数函数：`clamp(数值, 最小值, 最大值)`

示例：

```yaml
chance: "clamp(12 + 8 * %level%, 0, 100)"
damage: "round(%event_damage% * (0.08 + 0.02 * %level%))"
heal_amount: "max(1, %player_max_health% * 0.03 * %level%)"
```

`placeholders` 的展示公式只保证支持四则运算、括号、`ceil`、`floor`、`min` 和 `max`。复杂运行函数如果需要展示，建议改写成等价的简单表达式，或直接写清楚固定说明。

变量可引用其他变量，但循环引用会使该附魔被单独跳过。

所有变量会在 `1` 到 `max-level` 每个等级预先验证。未知变量、除零得到无穷值、负数开方、循环引用或超过 32 层嵌套都会让该 YML 行为单独跳过，并在日志中给出原因。

## 实战配方

以下配方展示常见设计方式。先复制 `_yaml-enchant-example.yml`，保留完整基础字段，再替换对应的 `id`、展示、`targets`、`variables` 和 `mechanics`。

### 配方一：蓄力吸血剑

完整蓄力近战有概率追加伤害并回复自身生命：

```yaml
id: blood_edge
display-name: "&c血刃"
description: "完整蓄力近战有 %chance% 概率追加 %damage% 点伤害并恢复生命。"
placeholders:
  chance: "{15 + 10 * %level%}%"
  damage: "{1.2 * %level%}"
targets: [sword, spear]

variables:
  leveled:
    chance: "15 + 10 * %level%"
    damage: "1.2 * %level%"
    heal: "0.5 * %level%"
  ordinary:
    cooldown: 1.5

mechanics:
  provider: yaml
  trigger: "完整蓄力近战"
  chance-per-level: "{15 + 10 * %level%}%"
  cooldown-seconds: "1.5 秒"
  value-placeholder: "追加 {1.2 * %level%} 伤害并恢复 {0.5 * %level%} 生命"
  duration: "瞬时"
  particles: "DAMAGE_INDICATOR"
  sound: "minecraft:entity.player.attack.crit"
  triggers:
    attack:
      chance: "%chance%"
      cooldown-seconds: "%cooldown%"
      conditions:
        projectile: false
        full-charge: true
      actions:
        - type: extra-damage
          value: "%damage%"
        - type: heal
          target: self
          value: "%heal%"
        - type: particle
          target: target
          particle: DAMAGE_INDICATOR
          amount: 8
        - type: sound
          target: self
          sound: minecraft:entity.player.attack.crit
          volume: 0.8
          pitch: 1.1
```

### 配方二：护甲受击减伤

受击时概率降低本次伤害，并短暂给予自身抗性提升：

```yaml
id: guardian_shell
display-name: "&9守护外壳"
description: "受击时有 %chance% 概率降低本次伤害。"
placeholders:
  chance: "{12 + 6 * %level%}%"
targets: [armor]

variables:
  leveled:
    chance: "12 + 6 * %level%"
    reduction_multiplier: "max(0.6, 0.9 - 0.05 * %level%)"
  ordinary:
    cooldown: 4

mechanics:
  provider: yaml
  trigger: "受到实体伤害"
  chance-per-level: "{12 + 6 * %level%}%"
  cooldown-seconds: "4 秒"
  value-placeholder: "降低本次伤害"
  duration: "1 秒"
  particles: "ENCHANT"
  sound: "minecraft:item.shield.block"
  triggers:
    defend:
      chance: "%chance%"
      cooldown-seconds: "%cooldown%"
      conditions:
        combat: any
      actions:
        - type: damage-multiplier
          value: "%reduction_multiplier%"
        - type: potion
          target: self
          effect: resistance
          duration-seconds: 1
          amplifier: 0
        - type: sound
          target: self
          sound: minecraft:item.shield.block
          volume: 0.7
          pitch: 1.2
```

`defend` 会检查四件护甲、主手和副手。相同附魔出现在多件装备且冷却为 `0` 时，每件装备都可能执行一次；护甲套装技能建议配置非零冷却，或只允许一个具体部位。

### 配方三：右键主动技能

手持武器右键获得速度和力量，具有独立冷却：

```yaml
id: battle_focus
display-name: "&e战意集中"
description: "手持武器右键，获得短暂速度与力量，冷却 %cooldown% 秒。"
placeholders:
  cooldown: "12"
targets: [sword]

variables:
  leveled:
    duration: "2 + %level%"
  ordinary:
    cooldown: 12

mechanics:
  provider: yaml
  trigger: "持剑右键"
  chance-per-level: "100%"
  cooldown-seconds: "12 秒"
  value-placeholder: "速度与力量"
  duration: "{2 + %level%} 秒"
  particles: "HAPPY_VILLAGER"
  sound: "minecraft:entity.player.levelup"
  triggers:
    interact:
      chance: 100
      cooldown-seconds: "%cooldown%"
      conditions:
        interact-actions: [RIGHT_CLICK_AIR, RIGHT_CLICK_BLOCK]
      actions:
        - type: potion
          target: self
          effect: speed
          duration-seconds: "%duration%"
          amplifier: 1
        - type: potion
          target: self
          effect: strength
          duration-seconds: "%duration%"
          amplifier: 0
        - type: particle
          target: self
          particle: HAPPY_VILLAGER
          amount: 20
        - type: sound
          target: self
          sound: minecraft:entity.player.levelup
          volume: 0.8
          pitch: 1.4
```

## 制作与测试流程

推荐每个新附魔都按下面顺序验证：

1. 复制模板，先只修改 ID、名称和一个最简单的触发器。
2. 完整重启，确认启动日志中的单附魔配置、Registry 和 YML 机制数量都没有跳过。
3. 执行 `/lre givebook <玩家> <id> 1`，确认书名、描述和最高等级正确。
4. 将书放入铁砧，分别测试正确物品、错误物品、冲突附魔和左右反放。
5. 执行 `/lre giveitem <玩家> <材质> <id> <等级>` 绕过获取流程，单独测试行为。
6. 使用 `/lre debug hand` 确认物品记录的真实 ID 和等级。
7. 分别测试最低等级、最高等级、概率、冷却、PVP、PVE、粒子和声音。
8. 再开启 `tradeable`、`discoverable`、`enchantable`，检查三种自然获取来源。

建议先使用 `chance: 100`、`cooldown-seconds: 0` 验证动作本身，确认动作正确后再恢复正式概率和冷却。这样能区分“条件没有满足”和“动作配置错误”。

## 重载与重启

| 修改内容 | `/lre reload` | 完整重启 |
| --- | --- | --- |
| `variables`、概率、冷却、条件、动作 | 立即生效 | 不需要 |
| 已注册附魔的 `description/placeholders` | 刷新受管理 Lore | 生产服建议重启后再复查资料库 |
| `tradeable/discoverable/enchantable` | 运行过滤立即更新 | 需要重建 Registry 候选标签时必须重启 |
| 已注册附魔改为 `enabled: false` | 停止 YML 行为与自然获取 | 重启后才从本次 Registry 注册中移除 |
| 新增、删除或重新启用启动时未注册的 ID | 无法改变 Paper Registry | 必须重启 |
| `id`、`namespace`、`implementation` | 不应热改 | 必须重启 |
| `display-name`、`type`、`rarity`、`max-level` | 部分运行展示可能刷新 | 必须重启以保证 Registry 一致 |
| `targets`、`conflicts` | 运行校验可能刷新 | 必须重启并重新测试铁砧与自然获取 |

不要使用 Bukkit `/reload`、PlugMan 或热卸载工具替换真实附魔插件。新增 ID 或修改 Registry 字段后应正常关闭服务器、替换配置，再完整启动。

## 启动诊断

正常日志示例：

```text
Registry 注册 123/123；YML 机制 1/1，跳过 0
```

YML 格式、变量、粒子、药水、实体或动作写错时，只跳过对应附魔行为并输出一行 `YML 附魔：<文件>：<原因>`。该附魔会停止自然获取，其他 122 个内置附魔和原版 `minecraft:*` 附魔继续正常工作。

YML 也不能绑定已有内置附魔 ID，避免原 Java 行为与新动作同时触发。需要调整内置附魔时，应修改它已经开放的机制参数；要设计不同效果请使用新的 ID。

## 常见问题

| 现象或日志 | 常见原因 | 处理方式 |
| --- | --- | --- |
| `YML 机制 0/0` | 文件以下划线开头，或 `implementation/provider` 均未声明为 `yaml` | 去掉文件名前导 `_`，检查实现声明 |
| `YML 机制 0/1，跳过 1` | 该文件已扫描但字段、变量或动作校验失败 | 查看紧邻的 `YML 附魔：文件：原因` 日志 |
| `定义未进入 Registry 目录` | 缺少显示资料、声明未被 bootstrap 读取，或新增后只执行了热重载 | 检查 `display-name` 和实现声明后完整重启 |
| `未知声音` | 使用了 Java 枚举名或错误资源键 | 改成 `minecraft:entity.player.levelup` 这种点分 Registry 键 |
| `未知粒子` | 名称不是当前 Bukkit `Particle`，或该粒子需要额外数据 | 换成 `ELECTRIC_SPARK`、`HAPPY_VILLAGER` 等无数据粒子 |
| 能领取书但技能不触发 | 触发器不匹配、条件失败、概率未命中或仍在冷却 | 临时设置概率 100、冷却 0，并逐项删除条件定位 |
| Lore 数值变了但实际伤害没变 | 只改了 `placeholders` | 同步修改 `variables` 和动作公式 |
| 实际伤害变了但 Lore 没变 | 只改了 `variables` | 同步修改 `placeholders` 并执行 `/lre reload` |
| 镐、剑或护甲不能附魔 | `targets` 使用了错误组名 | 从本文“适用物品”表选择精确组 |
| 护甲附魔能附到剑上 | `targets` 使用了 `weapon/all_equipment` | 护甲改为 `armor` 或具体护甲部位 |
| 左键地面也触发主动技能 | 没有限制 `interact-actions` | 只保留 `RIGHT_CLICK_AIR` 和 `RIGHT_CLICK_BLOCK` |
| 投射物命中动作没有伤害 | `projectile-hit` 没有伤害事件 | 伤害使用 `attack + projectile: true`，落点表现使用 `projectile-hit` |
| YML 报缩进或 `block mapping` 错误 | 使用 Tab、列表层级错误、冒号后的文本未加引号 | 改用空格缩进，并给公式和包含冒号的文本加双引号 |
| 自定义行为试图覆盖内置 ID | `id` 与 122 个内置附魔重复 | 创建全新的 ID；内置行为不允许 YML 二次绑定 |

## 发布前检查表

- [ ] 启动日志中配置、Registry 和 YML 机制数量全部正确，跳过数为 `0`。
- [ ] 最低等级和最高等级的 Lore 数值与真实效果一致。
- [ ] 正确装备可以附魔，错误装备、冲突附魔和反向铁砧操作均被拦截。
- [ ] 概率、冷却、PVP、PVE、生命条件和世界条件分别实测。
- [ ] 粒子数量不过量，声音键存在，资源包自定义声音已随资源包下发。
- [ ] 主动技能只响应预期按键，左键方块不会误触发右键技能。
- [ ] 村民交易、战利品和附魔台只出现已开启来源的 LiReal 附魔。
- [ ] 关闭全部 LiReal 获取时，原版 `minecraft:*` 附魔仍然正常出现。
- [ ] 使用 `/lre debug hand` 确认最终物品保存的是正确 ID、等级和附魔槽。
