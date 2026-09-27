# LiPet 完整 PlaceholderAPI 变量

适用版本：LiPet `0.29.13-SNAPSHOT`；建议使用 PlaceholderAPI `2.12.3+`。

PlaceholderAPI 是可选软依赖。变量必须在具有玩家上下文的位置使用，完整写法为 `%lipet_变量名%`。

## 通用变量

| 变量 | 返回内容 |
|---|---|
| `%lipet_server_id%` | `config.yml` 中当前服务器 ID |
| `%lipet_pet_count%` | 当前玩家拥有的宠物数量 |
| `%lipet_active_exists%` | 是否已经召唤活动宠物，返回 `true` 或 `false` |
| `%lipet_has_active_pet%` | `%lipet_active_exists%` 的等价别名 |

## 内置宠物币

| 变量 | 返回内容 |
|---|---|
| `%lipet_pet_coin_balance%` | 当前玩家宠物币余额，固定保留两位小数，例如 `1025.50` |
| `%lipet_pet_coin_name%` | 宠物币显示名称，读取 `config.yml -> currency.internal.display-name` |
| `%lipet_pet_coin_formatted%` | 已格式化余额，例如 `1025.50 宠物币` |
| `%lipet_coin_balance%` | 宠物币余额别名 |
| `%lipet_coin_name%` | 宠物币名称别名 |
| `%lipet_coin_formatted%` | 格式化宠物币别名 |
| `%lipet_coin%` | 宠物币余额简写 |
| `%lipet_coins%` | 宠物币余额简写 |
| `%lipet_balance%` | 宠物币余额简写 |

玩家登录时 LiPet 会异步预热余额；发放、扣除、商城交易和玩法奖励结算后会同步刷新缓存。PAPI 只读取内存，不会在服务器线程等待 SQLite 或 MySQL。没有玩家上下文时余额返回 `0.00`，名称仍返回管理员配置值。

## 活动宠物身份与状态

| 变量 | 返回内容 |
|---|---|
| `%lipet_active_id%` | 活动宠物 UUID |
| `%lipet_active_owner_id%` | 主人 UUID |
| `%lipet_active_owner_name%` | 主人名称 |
| `%lipet_active_name%` | 宠物自定义名称 |
| `%lipet_active_type%` | 宠物类型中文显示名 |
| `%lipet_active_type_id%` | 宠物类型配置 ID |
| `%lipet_active_state%` | `messages.yml` 中配置的中文状态名 |
| `%lipet_active_state_key%` | 原始状态键，例如 `ACTIVE`、`SITTING` |

## 等级、经验与加点

| 变量 | 返回内容 |
|---|---|
| `%lipet_active_level%` | 当前等级 |
| `%lipet_active_max_level%` | 类型配置的最高等级 |
| `%lipet_active_experience%` | 当前经验 |
| `%lipet_active_required_experience%` | 当前等级升级所需经验 |
| `%lipet_active_experience_percent%` | 当前升级进度，范围 `0.0-100.0`，不附带 `%` |
| `%lipet_active_attribute_points%` | 未分配属性点 |
| `%lipet_active_strength%` | 已分配力量点数 |
| `%lipet_active_vitality%` | 已分配体质点数 |
| `%lipet_active_defense%` | 已分配防御点数 |
| `%lipet_active_agility%` | 已分配敏捷点数 |

## 战斗与衍生属性

| 变量 | 返回内容 |
|---|---|
| `%lipet_active_health%` | 当前生命值 |
| `%lipet_active_max_health%` | 最终最大生命值 |
| `%lipet_active_health_percent%` | 生命百分比，范围 `0.0-100.0` |
| `%lipet_active_damage%` | 最终攻击伤害 |
| `%lipet_active_speed%` | 基础速度、敏捷和速度技能合并后的最终移动速度 |
| `%lipet_active_riding_speed%` | 骑乘速度 |
| `%lipet_active_resistance%` | 伤害减免百分比，不附带 `%` |
| `%lipet_active_regeneration%` | 生命恢复值 |
| `%lipet_active_critical_chance%` | 暴击概率百分比，不附带 `%` |
| `%lipet_active_critical_damage%` | 暴击倍率百分比，不附带 `%` |
| `%lipet_active_dodge%` | 闪避概率百分比，不附带 `%` |
| `%lipet_active_knockback_resistance%` | 击退抗性百分比，不附带 `%` |
| `%lipet_active_life_steal%` | 吸血百分比，不附带 `%` |

## 品质、性格与闪光

| 变量 | 返回内容 |
|---|---|
| `%lipet_active_quality%` | 品质显示名 |
| `%lipet_active_quality_id%` | 品质配置 ID |
| `%lipet_active_nature%` | 性格显示名 |
| `%lipet_active_nature_id%` | 性格配置 ID |
| `%lipet_active_shiny%` | `messages.yml` 中配置的闪光“是/否”文本 |
| `%lipet_active_growth_multiplier%` | 捕捉时固化的成长倍率 |

## 可配置属性名称

| 变量 | 返回内容 |
|---|---|
| `%lipet_attribute_strength_name%` | 力量属性显示名 |
| `%lipet_attribute_vitality_name%` | 体质属性显示名 |
| `%lipet_attribute_defense_name%` | 防御属性显示名 |
| `%lipet_attribute_agility_name%` | 敏捷属性显示名 |

## 捕捉系统与 CraftEngine 捕捉球

| 变量 | 返回内容 |
|---|---|
| `%lipet_capture_enabled%` | 捕捉系统是否启用 |
| `%lipet_capture_ball_count%` | 已启用捕捉球数量 |
| `%lipet_capture_ball_ids%` | 已启用捕捉球 ID，英文逗号连接 |
| `%lipet_capture_ball_<id>_enabled%` | 指定球是否可用 |
| `%lipet_capture_ball_<id>_name%` | 保留 MiniMessage 标签的配置名称 |
| `%lipet_capture_ball_<id>_plain_name%` | 去除格式后的纯文本名称 |
| `%lipet_capture_ball_<id>_item_id%` | 完整物品 ID，例如 `yourpack:pet_capture_ball` |
| `%lipet_capture_ball_<id>_item_namespace%` | 物品命名空间，例如 `yourpack` |
| `%lipet_capture_ball_<id>_item_path%` | 物品路径，例如 `pet_capture_ball` |
| `%lipet_capture_ball_<id>_is_craftengine%` | 是否为非 `minecraft:` 自定义物品 |
| `%lipet_capture_ball_<id>_base_chance%` | 基础概率原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_base_chance_percent%` | 基础概率显示值，范围 `0.0-100.0` |
| `%lipet_capture_ball_<id>_low_health_bonus%` | 低血量加成原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_low_health_bonus_percent%` | 低血量加成显示值，范围 `0.0-100.0` |
| `%lipet_capture_ball_<id>_maximum_chance%` | 最高概率原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_maximum_chance_percent%` | 最高概率显示值，范围 `0.0-100.0` |

`<id>` 必须替换为 `capture.yml -> balls` 下的球 ID。详细 CE 配置案例见 [CraftEngine 捕捉球 PAPI 变量](CE捕捉球PAPI变量.md)。

## 无活动宠物时的返回规则

- `%lipet_active_exists%` 和 `%lipet_has_active_pet%` 返回 `false`。
- 等级、经验、加点等整数返回 `0`。
- 生命、伤害、速度、概率等小数返回 `0.0`。
- 名称、UUID、类型、状态、品质、性格等文本返回空文本。
- 未识别的变量交还 PlaceholderAPI 处理，不伪造返回值。

## 使用示例

```text
宠物币：%lipet_pet_coin_formatted%
宠物：%lipet_active_name% Lv.%lipet_active_level%
生命：%lipet_active_health% / %lipet_active_max_health%
品质：%lipet_active_quality% · %lipet_active_nature%
捕捉球：%lipet_capture_ball_craftengine_example_plain_name%
```

CraftEngine、菜单、HUD、计分板或聊天插件中的具体字段是否解析 PAPI，取决于该字段是否提供玩家上下文并调用 PlaceholderAPI；LiPet 负责注册和返回上述变量。
