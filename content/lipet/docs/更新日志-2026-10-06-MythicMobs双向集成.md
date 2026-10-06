# 2026-10-06 · LiPet 2.3.0 · MythicMobs 双向集成

补充 MM 技能读取 LiPet 宠物主人、属性及给予经验的接口，减少第三方宠物技能包迁移时的改写。原有 `mythic-skills` 等级解锁、触发方式、冷却与 power 行为保持；MM 通过 `<skill.power>` 读取最终 power。

## 新增接口

| 功能 | 建议新配置使用 | 兼容名称 |
| --- | --- | --- |
| 选择施法宠物主人 | `@LipetOwner` | 未安装 MCPets 时注册 `@PetOwner` |
| 给予目标宠物经验 | `lipetExperience{amount=25} @self` | 未安装 MCPets 时注册 `petExperience{exp=25}` |
| 读取施法宠物属性 | `<lipet.level>`、`<lipet.damage>`、`<lipet.max_health>`、`<lipet.strength>`、`<lipet.defense>`、`<lipet.agility>`、`<lipet.vitality>`、`<lipet.quality>` | 不注册语义不同的 `<pet.damagemodifier>` |

经验必须为 `1..2147483647` 的正整数，奖励进入 LiPet 现有成长和异步保存链；机制提交后下一条 MM 技能不保证已经读到保存后的经验或等级。经验目标是宠物本身；`@LipetOwner` 是玩家目标，不能替代 `@self`。

占位符按施法宠物读取，quality 返回稳定品质 ID，strength/defense/agility/vitality 返回已分配属性点，damage 与 max_health 返回 LiPet 的属性计算结果。全部写法、实例及上下文说明见 [MythicMobs 双向集成指南](MythicMobs双向集成.md)。

## 配置与兼容边界

公共默认、狼/猫模板、原版商城模板和缺失配置补齐说明，均明确写出 `<skill.power>` 的 MM 读取方式。只补齐缺失的配置/注释，保留既有服主数值与自定义内容。

MM `damage` 默认还会自动乘一次技能 power。指南中显式引用 `<skill.power>` 或只按 `<lipet.damage>` 缩放的伤害示例，均设置 `poweraffectsdamage=false`，避免重复乘算；也可用 `damage{a=6}` 沿用 MM 默认的一次 power 缩放。此次只修正文档示例，不修改原有宠物包技能或 LiPet 的 power 调用。

MCPets 单宠文件的核心字段仍可由 LiPet 读取并在内存中转换。其他 MCPets 专属机制、条件或 Signals/Skins 不在本次实现内，不能承诺所有第三方包零改写。`<pet.damagemodifier>` 的倍率语义与 `<lipet.damage>` 的伤害数值不同，需要按原包公式核对，不能机械替换。

## 升级方式

正常停服备份配置、数据库与恢复台账，将旧 LiPet Jar 移出 `plugins` 扫描目录，只保留 `LiPet-2.3.0.jar`。正常启动后确认 `Enabling LiPet v2.3.0`。不使用 PlugMan 或 `/reload` 替代正常重启。

继续保留原有 112 项技能、模型、GUI 标题变量、自动攻击开关和 [CE 物品贴图包 1.0.0](CE物品贴图.md)。本次不要求重装客户端资源包；第三方包新增模型或贴图时按该包要求处理。

## 验证结果

最终 LiPet 2.3.0 Jar 的 **837 项测试全部通过**，失败、错误与跳过均为 0。同一最终 Jar 完成本轮以下检查：

| 对象 | 已完成检查 | 范围 |
| --- | --- | --- |
| Paper 26.2 build 111 + MythicMobs 5.13.0 | 76 项通过 | 首次预置技能67项＋SQLite进程重启9项：双主人、8属性、15/12/12实扣伤害、保护取消、4种经验语法、升级存档、无效输入、MM重载及回召死亡边界。 |
| Folia 26.2 build 5 + MythicMobs 5.13.0 | 87 项通过 | 首次67项＋SQLite重启9项＋既有停服清理告警后的再次重启11项；数据仍在、重召成功、探针清理前无重复标记宠物。活动宠物停服有已捕获的区域清理告警，不能称全程无警告。 |
| Paper + MCPets 名称注册测试替身 | 19 项通过 | MM重载后两个旧名称由替身回调接收，LiPet不抢占；lipetExperience仍可给目标宠物存档。非真实MCPets整包验收。 |
| Paper 26.2 build 111，不安装 MythicMobs | 7 项通过 | 同一成品启动、MM离线状态、配置重载及正常停服；无缺失MM类导致的加载错误。 |

### 已知限制与运行告警

- Folia活动MM宠物在停服调度器停止后，运行期实体移除出现已捕获的既有区域上下文告警。此前已将本体/自有名牌标记不写入世界；宠物数据保存完成，再次启动验证无重复标记宠物、SQLite属性经验保留且可重召。本轮不改停服代码。
- MCPets冲突只使用明确标识的名称注册测试替身，MM重载后验证让出别名，不是MCPets真实插件或第三方整包零改写迁移验收。
- MM 5.13 对公开 Placeholder#meta(BiFunction) API 发出 deprecated 提醒，当前实测可用。
- Windows系统性能计数器与Paper内置spark出现与LiPet无关的环境告警；不宣称服务端全部日志零warning。
- 代理Bukkit玩家和真实实体/数据库探针不等于真人客户端模型动画或视觉验收。


隔离服务端检查覆盖报告中列明的 MM 调用与数据路径，不等同真人客户端视觉验收，也不代表所有第三方 MCPets 包均能零改写迁移。客户包专有技能、模型和实际客户端表现仍需按该包核对；历史 MySQL、战斗或资源包测试不累计为本轮重跑。

最终已验 2.3.0 Jar SHA-256：

```text
30D5334C53A80C7176BC69598C703CD58A6D7A2E7E5D01E570BA17D9CD72FA56
```
