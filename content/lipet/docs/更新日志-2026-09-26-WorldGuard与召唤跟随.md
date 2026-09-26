# LiPet 0.29.4 · WorldGuard 与召唤跟随

## WorldGuard 区域开关

安装 WorldGuard 7 及其匹配的 WorldEdit 后，正常启动服务器会注册两个独立 StateFlag：

| Flag | 默认值 | 用途 |
| --- | --- | --- |
| `lipet-spawn` | allow | 是否允许在此位置召唤 LiPet 宠物，包括原版载体和 MythicMobs 载体 |
| `lipet-attack` | allow | 是否允许宠物在此位置攻击，宠物与目标所在位置都需允许 |

例如在主城禁止普通生物生成，但允许召唤不攻击的宠物：

```text
/rg flag 主城 mob-spawning deny
/rg flag 主城 lipet-spawn allow
/rg flag 主城 lipet-attack deny
```

完全禁止该区域召唤宠物：

```text
/rg flag 主城 lipet-spawn deny
```

恢复战斗：

```text
/rg flag 主城 lipet-attack allow
```

这些是针对实体所在区域的开关，请使用默认 all 分组，不使用 `-g members/nonmembers` 玩家分组。OP 和玩家 WG bypass 不绕过这两个宠物开关。重叠区域、父区域及优先级由 WG 自身计算。

`lipet-spawn` 控制召唤，不会把走入该区域的现有宠物自动收回。`lipet-attack` 会持续检查已有宠物：停止索敌与追击，拒绝主人指挥和 LiPet 触发的 MM 技能；带可识别宠物归属的近战、投射物、尖牙、药水云、TNT 等伤害会再次被拦截，禁战位置的宠物爆炸也会取消。不取消其他插件已有的伤害保护。无归属的外部脚本、控制台直接改血等行为不能靠实体伤害归属识别。

## MM 宠物的 WG 前置配置

MythicMobs 5.13 会在 Bukkit 生成事件之前直接检查 WG 的 `mob-spawning`。因此，在禁刷怪区域召唤 MM 宠物，还需由管理员在 WG 对应世界配置（或其全局默认配置）合并以下设置，再正常重启：

```yaml
mobs:
  # 布尔值 true/false；false 允许插件主动生成，普通自然刷怪仍由区域 mob-spawning 控制。
  # 注意：影响该世界所有插件的主动生成，不只 LiPet；请结合其他插件的区域规则评估后设置。
  block-plugin-spawning: false
```

LiPet 不会自动修改这个设置。使用 MM 宠物且设置仍为 true、区域又禁止 mob-spawning 时，会提前返回可配置的 `pet-call-region-mythic-blocked` 提示并释放召唤状态，避免 MM 返回空值导致异常。原版宠物不要求更改此设置。即使设为 false，LiPet 仍执行独立的 `lipet-spawn` 限制。

## 召唤兼容

MM 载体现在在最早的 Bukkit 生成事件阶段获得 LiPet 标记，保护监听器可识别其为本次召唤的宠物，不再等 MM 返回后才标记。识别只覆盖同步召唤范围内的首个相同实体类型、相同位置根实体，该提前标记不会误认普通刷怪或所有 MM 生物；但上文 WG 的插件生成豁免本身会影响所有插件。宠物配置 `entity-type` 应与 MM Mob 的真实 Type 一致。

宠物 flag 允许时沿用 LiPet 的专用生成保护放行；拒绝时不创建实体，并正常回滚召唤状态、释放占用，玩家看到可配置的 `pet-call-region-denied` 提示。查询失效或 flag 类型冲突时保守禁止召唤与攻击，并在控制台给出中文提示。

未安装 WG 时不要求安装它，也不会改变原有插件前置。WG 及 WorldEdit 不打入 LiPet Jar，不会自动下载或替换服务器的领地插件。

## 重新召唤恢复跟随

坐下状态仅对应本次活动实体。宠物收回后再次召唤，会恢复 AI 与跟随，不再继承档案上次的坐下模式；当前召唤期间仍可正常切换坐下/跟随。新实体不会被旧实体尚未执行的切换请求改回坐下。

## 升级

备份旧 Jar 和插件数据，在维护窗口正常停止 Minecraft 服务端后替换为 `LiPet-0.29.4-SNAPSHOT.jar`，确保只保留一个 LiPet Jar，再启动。WG 自定义 flags 必须在插件加载阶段注册，不能用 `/lipet reload` 或 PlugManX 替代正常重启。无需关闭电脑。

## 验证范围

- 默认 API 与 Paper 26.2 API 两套构建各通过 462 项测试，无失败、错误或跳过。
- 隔离 Paper 26.2 + WorldGuard 7.0.19 + WorldEdit 7.4.5 + MythicMobs 5.13 + ModelEngine R4.1：原版狼、MM Parro 均通过召唤允许/拒绝、拒绝后重召、坐下收回再召跟随、禁战/恢复攻击验证；另验证投射物、爆炸和更高优先级目标区域禁战。MM 前置配置未满足时正确提示；启用插件生成豁免后自然刷怪仍被 WG 禁止。
- 隔离 Folia 26.2（无 WG）通过主动攻击、移动目标追击、隔墙绕障、坐下、重载开关、跟随优先回归；另通过僵尸、骷髅、苦力怕和箭矢主人保护、其他插件重新放行后再拦截及普通怪物伤害不受影响检查。
- 测试使用自动化探针及模拟玩家，不代表真人客户端视觉/骑乘验收；未验收 Folia 第三方 WG 分支组合。

WorldGuard 官方版与 Folia 分支并非相同实现，Folia 服需自行使用与服务端匹配的 WG/WE 版本，不要修改第三方 Jar 的 Folia 声明强行加载。

参考：[WorldGuard 自定义 flags](https://worldguard.enginehub.org/en/latest/developer/regions/custom-flags/)、[MCPets 禁刷怪区域召唤说明](https://mcpets.gitbook.io/mcpets/common-issues/common-issues/worldguard-making-pet-spawn-in-mob-denied-areas)。
