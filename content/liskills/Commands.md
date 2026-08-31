# 命令与权限

主命令是 `/liskills`，别名为 `/lsk` 与 `/skills`。全部子命令和参数提供 Tab 补全；发生别名冲突时使用完整名称。下表中的“玩家”要替换为在线玩家名，“技能ID”可在 [15 职业技能](Skills.md) 查询。

## 玩家命令

| 命令 | 用途 |
| --- | --- |
| `/lsk` | 打开技能总览 |
| `/lsk help` | 查看帮助 |
| `/lsk stats [玩家]` | 查看技能等级与经验 |
| `/lsk attributes [玩家]` | 查看九项属性 |
| `/lsk abilities mining` | 查看指定技能能力树 |
| `/lsk sources mining` | 查看当前配置的实际经验来源 |
| `/lsk cast mining` | 尝试施放主动，仍检查条件、魔力和冷却 |
| `/lsk mana [玩家]` | 查询当前魔力、上限与恢复 |
| `/lsk hud [on\|off\|toggle\|status]` | 开启、关闭、切换或查询个人 HUD；无参数为切换 |
| `/lsk jobs list` | 查看职业选择，要求模块已开启 |
| `/lsk jobs join mining` | 加入职业 |
| `/lsk jobs leave mining` | 退出职业 |
| `/lsk top total 1` | 查看总等级榜第 1 页，也可将 total 换为技能 ID |
| `/lsk rank mining` | 查看自己在指定技能缓存榜中的名次 |

HUD、施法及打开个人菜单需要玩家身份。查询他人需要额外权限；查询目标必须在线且档案已加载。

## 管理命令

| 命令 | 用途 |
| --- | --- |
| `/lsk validate` | 验证全部配置 |
| `/lsk reload` | 校验通过后发布新配置；存储变更需重启 |
| `/lsk xp add 玩家 mining 100` | 增加经验，允许正常跨级 |
| `/lsk xp set 玩家 mining 20` | 设置当前等级内的经验 |
| `/lsk level set 玩家 mining 10` | 设置等级并清零本级经验 |
| `/lsk export` | 异步导出技能档案到新目录 |
| `/lsk modifier list 玩家` | 查看命名玩家属性加成 |
| `/lsk modifier set 玩家 blessing health 2` | 设置名为 blessing 的持久生命属性加成 |
| `/lsk modifier remove 玩家 blessing` | 移除指定命名加成 |
| `/lsk item inspect` | 只读检查当前主手的 LiSkills 规则 |
| `/lsk item legacy-preview` | 预览可识别的旧物品标签，不写入 |
| `/lsk item legacy-migrate` | 转换支持且完整的旧物品标签 |
| `/lsk item stat bonus strength ADD 2 MAIN_HAND` | 在主手物品写入命名属性规则 |
| `/lsk item require gate mining 20 MAIN_HAND` | 写入挖矿 20 级使用要求 |

物品命令由管理员玩家手持物品执行。更完整的属性、特性、经验及清理示例见[装备与物品](Items.md)。

管理修改要求目标在线、档案加载成功，不直接编辑离线玩家文件。管理员赠送经验不按自然经验倍率放大，也不产生职业收入；奖励是否接受管理经验由奖励配置决定。

## 权限

| 节点 | 默认 | 用途 |
| --- | --- | --- |
| `liskills.use` | 所有玩家 | 技能菜单、自然经验和普通命令 |
| `liskills.hud` | 所有玩家 | HUD 显示与个人开关，同时要求 use |
| `liskills.skill.*` | 所有玩家 | 全部内置技能 |
| `liskills.skill.mining` 等 | 随技能权限 | 单独控制某个技能 |
| `liskills.stats.others` | OP | 查看其他在线玩家 |
| `liskills.admin` | OP | 校验、重载、改等级、装备、玩家修饰符及导出 |
| `liskills.items.bypass` | `false`，OP 也不自动获得 | 显式绕过物品等级/技能门槛，仅按需授予 |

权限不能绕过禁用世界、档案错误或最终保护取消。出现“无经验”时先查看技能权限和来源配置，不要直接授予全部管理权限。

测试装备门槛时核对 `liskills.items.bypass` 的实际权限结果。本插件不会仅因 OP 身份授予绕过权限，但权限插件的显式授权或通配符可能授予它；不要把“管理员能使用”误判为等级规则失效。
