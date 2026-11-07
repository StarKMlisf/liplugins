# PlaceholderAPI 占位符

安装兼容的 PlaceholderAPI 后，LiSkills 注册 `liskills` 前缀。以下是完整可复制格式，不需要额外下载同名扩展。未安装 PlaceholderAPI 不影响技能和内置 HUD。

| 占位符 | 含义 |
| --- | --- |
| `%liskills_level_mining%` | 挖矿等级 |
| `%liskills_xp_mining%` | 当前等级内的经验 |
| `%liskills_progress_mining%` | 同样返回本级经验，**不是百分比** |
| `%liskills_required_mining%` | 当前升级需求；满级时为 0 |
| `%liskills_total_xp_mining%` | 按当前经验曲线计算的累计经验 |
| `%liskills_total_level%` | 已启用技能的等级总和 |
| `%liskills_mana%` | 当前可用魔力 |
| `%liskills_max_mana%` | 魔力上限 |
| `%liskills_stat_strength%` | 力量属性值 |
| `%liskills_stat_health%` | 生命属性点，**不是玩家实际最大生命** |
| `%liskills_ability_bountiful_harvest%` | 对应被动的当前阶级 |
| `%liskills_ability_value_bountiful_harvest%` | 对应被动的当前主数值 |

把 `mining` 换为其他已注册技能 ID，例如 `endurance`、`healing`、`forging`、`sorcery`，也支持合法的自定义技能。属性 ID 和被动 ID 分别参考 `stats.yml` 与 `abilities.yml`。

## 数据来自哪里

占位符只读取已经加载的内存档案和已发布属性快照，不会为每次占位符请求读磁盘，也不会跨 Folia 区域读取玩家实时背包。未加载、停用或不适用时相关数字可能为 0；未知字段不作为有效变量处理。

累计经验按当前曲线推算，修改曲线后可能改变，并不是不可变的历史入账总账。原版经验等级和技能等级是不同系统。

## 内置文本不是同一套变量

`messages.yml` 中的 `{health}`、`{max_health}`、`{mana}`、`{skill}` 是 LiSkills 对应消息的内部变量，不是 PlaceholderAPI 的百分号变量。各消息只支持其业务提供的变量。

HUD 的生命显示直接使用玩家实际最大生命，包含合法外部加成；若需要 HUD 文本变量和 MiniMessage 配色，见[HUD 与安全卸载](HUD-Uninstall.md)。

