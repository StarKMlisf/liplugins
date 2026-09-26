# LiPet Wiki

## 0.29.4 · WorldGuard 与召唤跟随

新增 `lipet-spawn`、`lipet-attack` 区域开关，控制召唤与攻击。收回坐下宠物后再次召唤恢复跟随。MM 在禁刷怪区域仍需 WG `mobs.block-plugin-spawning: false`（影响该世界所有插件生成，普通自然刷怪仍受区域限制）；未配置时明确提示并回滚，不再空指针。原版宠物无需这一额外设置。完整重启注册旗标，勿用热卸载代替。

详见 [WorldGuard 与召唤跟随](更新日志-2026-09-26-WorldGuard与召唤跟随.md)。

## 0.29.3 · 主人保护

禁止宠物把主人设为原版仇恨目标，并周期清理绕过事件直接写入的主人目标。伤害前后两次检查宠物本体、投射物及可追溯的间接来源，对主人取消并归零伤害。普通怪物仍能正常伤害玩家，不改已有配置。必须完整重启并确认启动版本为 0.29.3-SNAPSHOT。

## 0.29.2 · 追击与绕障

保留主动索敌，修复近距离隔墙停步及追击被空闲跟随距离打断；原地卡住约 4 秒会放弃目标，主动扫描短暂跳过它。主人远离后仍优先返回。更新 Jar 必须正常重启服务端并核对启动版本，配置重载不能替换正在运行的代码。

## 0.29.1 · 主动索敌

空闲宠物现在可主动攻击附近可见敌对怪物，默认扫描范围 8 格；排除玩家、宠物、驯服生物及部分中立生物。坐下、骑乘、牵引、返回主人时不索敌，主人走远仍优先跟随。公共及独立宠物配置支持 `behavior.auto-attack.enabled/radius`，配置重载可生效。

## 0.29.0 · 品质、性格与闪光

新捕捉宠物可获得五档品质、可配置性格和稀有闪光。成长倍率与名称随档案保存，
召回、重载和重新读取存档不重抽，旧宠物保持原数值。仓库、详情、名牌与 PAPI 均可显示。
新增 traits.yml；材料进化、探索派遣留待后续批次。
详见本次品质、性格与闪光更新文档。

## 0.28.0 · 骑乘、命名与多行名牌

原版骑乘新增自动迈步和 LOOK/MOVEMENT 朝向；ModelEngine 保留独立驾驶控制。
新增 naming.yml 命名规则与 nameplate.lines 多行排版，兼容已有配置和名字。
0.28.0 为扩展开发第一批；品质/性格/闪光已在 0.29.0 补充，材料进化与探索派遣仍待后续。
配置说明见本次更新文档。

## 0.27.29 · 跟随与模型骑乘稳定性

地面宠物在主人附近停靠，减少贴身重叠；脱战返回不再反复重置路径。
模型虚拟座位跨 Folia 区域时保留骑乘判断，暂停不安全的读取；减少骑乘时名牌重复刷新。
不新增必填配置，具体行为及验证范围见本次更新说明。

## 0.27.28 · 单宠名牌与战斗跟随

单宠物 nameplate 支持覆盖及热重载；主人走远时宠物脱战返回，返回途中不重新接战。
补充模型驾驶座 Bukkit 输入同步与骑乘期间技能控制。两份龙配置的缩进问题与模型测试边界见本次更新说明。

## 0.27.27 · MM 模型与骑乘等级

新增骑乘解锁等级；调整模型回收、独立名牌跟随与模型驾驶座联动。[查看配置说明](更新日志-2026-09-12-MM模型与骑乘等级.md)。

适用版本：`0.29.0-SNAPSHOT`

适用服务端：

- Paper / Folia `1.21.11`
- Paper / Folia `26.1.2`
- Paper / Folia `26.2`

运行建议：Java 25。插件成品 Jar 使用 Java 21 字节码构建，便于跨版本运行。

## 2026-09-08 · 0.27.26 · 独立背包贴图标题

- 独立宠物背包可按实际 1-6 行容量选择资源包标题；默认关闭，缺失或空标题回退普通显示。
- 普通标题也可在 gui.yml 配置，支持宠物名字；不改变容量、存储和物品。
- 默认 API 与 Paper 26.2 API 各 386 项测试通过；客户端贴图与实际背包存取待验收。

详见 [背包贴图标题配置](更新日志-2026-09-08-背包贴图标题.md)。

## 2026-09-06 · 0.27.25 · 生命周期逐项排查

- 区分首次召唤与属性刷新，重载、区块恢复和成长保留实时血量；喂食追加治疗不覆盖异步期间的新伤害。
- 保留待保存死亡事件，失败后召唤/收回先重试死亡落盘，避免变回活宠；保留首次冷却，退出保存失败记录日志。
- 两套 API 各 383 项测试通过；旧版末影人血量 5→20 问题实机复现，新版修复并验证死亡数据库失败恢复。
- 待保存事件仅在内存中，崩溃持久化、背包多人编辑、重载原子性及原服联动仍未完成。

详见 [逐项检查结果、剩余风险与验证边界](逐项排查-2026-09-06-生命周期与死亡重试.md)。

## 历史更新 · 2026-09-06 · 0.27.24 · 死亡扣级惩罚

- 默认死亡扣 1 级、最低 1 级；`config.yml -> death-penalty` 可关闭或调整，支持 `/lipet reload`。
- 实际掉级时清空当前级经验，优先扣未分配属性点，不足部分按当前四维比例扣回；达到下限或关闭时保留成长数据。
- 死亡状态和惩罚一起持久化，revision 冲突有限重试，重复死亡不重复扣级；主人通知回到其 Folia 区域。
- 两套 API 各 377 项测试通过，Folia 实测配置重载、真实死亡、重复回调、完整重启及复活后的等级和属性。

详细规则、初始属性扣回边界和升级步骤见 [死亡扣级惩罚](更新日志-2026-09-06-死亡扣级惩罚.md)。

## 今日更新 · 2026-09-06 · 0.27.23 · Folia 专项排查

- 修复延迟/重复任务退休回调、跨区战斗目标、弹射物属性读取和 MythicMobs 技能目标边界。
- 捕捉跨区中断退款、目标退休清理和保存后原实体移除分别调度；玩家离线时退款球退为捕捉位置掉落物。
- GUI 开关延迟到下个玩家 tick，过期菜单点击不影响新菜单；跟随任务拒绝旧会话，方块探测限制区域和高度。
- 默认 API 与 Paper 26.2 API 各 366 项测试通过，Folia 26.2 隔离服定向测试通过。
- 仍有同宠物背包并发编辑、配置快照及捕捉崩溃一致性风险，详见 [完整排查报告及验证边界](Folia专项排查-2026-09-06.md)。

## 今日更新 · 2026-09-06 · 0.27.22

- 修复只读 LiPet 菜单缺少拖拽保护，玩家可以通过拖拽交互改动菜单槽位并造成展示物品异常的问题。
- 主菜单、宠物商城、道具商城、仓库、详情、管理和放生确认页统一在最高事件优先级取消点击，并单独取消所有触及顶部菜单槽位的拖拽。
- 只在玩家自身背包槽位之间拖拽时不会被拦截；宠物独立背包仍允许正常存取，不会被当作只读菜单。
- 本次无新增配置，旧服替换 Jar 后即可生效。

默认兼容 API 与 Paper 26.2 Build 111 API 各 361 项测试通过。完整记录见 [2026-09-06 GUI 物品保护修复](更新日志-2026-09-06-GUI物品保护.md)。

## 上一版 · 2026-09-06 · 0.27.21

- 修复 Folia 新实体在生成当 tick 暂时返回 `isValid=false`，被误判成保护插件取消生成并导致召唤失败的问题。
- 宠物生成后统一等待自己的下一次实体区域任务完成确认；被 Folia 实体调度器接纳后继续初始化，实体死亡或任务被拒绝才回滚。
- 首次生成宠物和已有持久化外观的捕捉宠物都使用该流程，不新增配置，也不覆盖管理员现有设置。
- Folia 26.2 实测带外观狼正常召唤，移动到距离玩家 1024 格的另一区域后，重进恢复主人 UUID 和跨区域收回均通过。

默认兼容 API 与 Paper 26.2 Build 111 API 各 359 项测试通过。完整记录见 [2026-09-06 Folia 认主与召唤时序修复](更新日志-2026-09-06-Folia认主与召唤时序.md)。

## 上一版 · 2026-09-06 · 0.27.20

- 玩家未手动收回宠物就退出时，若重进时活动实体仍存在，插件会在宠物实体线程按档案中的主人 UUID 重新绑定原版驯服关系。
- 宠物区块重新载入与热重载也执行同一恢复；鹦鹉仍保持非原版驯服，避免上肩导致实体索引丢失。
- `config.yml -> feeding.cooldown-seconds` 控制同一只宠物两次成功喂食的间隔，默认 `1.0` 秒，允许 `0-60` 的小数；`0` 表示关闭。
- 冷却中会显示剩余秒数且不扣物品。无效食物、非主人、无效果和数据库失败不会消耗冷却；数据库失败还会撤销已经预留的冷却。
- 修改冷却后执行 `/lipet reload` 生效。升级只补缺失配置与中文注释，不覆盖服主已有值。

默认兼容 API 与 Paper 26.2 Build 111 API 各 359 项测试通过。完整记录见 [2026-09-06 重进认主与喂食冷却](更新日志-2026-09-06-重进认主与喂食冷却.md)。

## 上一版 · 2026-09-05 · 0.27.19

- 修复属性加点在数据库 revision 短暂冲突时一次写入失败就直接终止的问题；活动宠物会先与数据库权威档案对账，仓库宠物会重新读取，最多重试两次。
- 力量不再增加暴击率，只增加攻击、暴击伤害与少量吸血；暴击率统一由敏捷增加，和 GUI 说明保持一致。
- 兼容 `gui.yml` 中 `strength` 等小写属性动作；错误 UUID、缺少参数或未知属性会显示 `pet-attribute-invalid-action`，不会再从背包点击事件抛异常。
- 属性点为零时显示独立的 `pet-attribute-no-points`。升级仅补全缺少的消息节点，不覆盖管理员自定义文本、GUI 或宠物数据。

默认兼容 API 全量 353 项测试通过。属性职责、动作解析、YAML 默认项、SQLite 持久化及已有功能全部通过。完整记录见 [2026-09-05 属性加点与属性归属修复](更新日志-2026-09-05-属性加点与属性归属.md)。

## 上一版 · 2026-09-05 · 0.27.18

- 修复 Residence 领地设置 `sun=true` 后，世界实际仍为雨天而让 LiPet 烈焰人继续受到淋雨伤害的问题。
- 只在世界有风暴、伤害类型为原版 `DROWNING`、目标是 LiPet 烈焰人且目标未处于水或气泡柱时查询 Residence；当前位置有效继承 `sun=true` 才取消伤害。
- 普通烈焰人、领地外、未设置 `sun=true`、`rain=true` 领地和真实泡水伤害均保留原版行为；Residence 未安装或 API 查询失败时安全回退为不干预。
- 修复连续属性加点后多个界面刷新共用较早数据库查询，导致界面显示旧点数、旧属性或看起来加点未生效的问题；保存成功后直接用本次已确认档案刷新。
- 不新增配置，不修改 Residence Flag，也不覆盖管理员已有 GUI、属性、模型或食物设置；必须停服换 Jar 后完整启动。

默认兼容 API 与 Paper 26.2 Build 111 API 各 349 项测试通过。Paper 26.2 隔离服验证 `sun=true`、普通烈焰人、移除 `sun`、`sun` 与 `rain` 同时启用以及真实泡水五个边界；泡水场景生命从 20 降至 10。完整记录见 [2026-09-05 Residence 天气与属性加点修复](更新日志-2026-09-05-Residence天气与属性加点.md)。

## 更早版本 · 2026-09-05 · 0.27.17

- 修复主手风弹喂旋风人时，紧随其后的物品使用仍发射风弹并额外扣除的问题。
- 只为该宠物配置中认可的食物登记喂食保护；在异步喂食结算前阻止对应的原版物品使用。
- 同时保护副手回退。正常朝空处投掷、未配置成食物的物品、技能书和信号棒不改变原有入口。
- 喂食成功扣一份，创造模式不扣除；不是主人、无效果或等级受限等失败也不应改为发射食物。
- 不新增配置，不修改已有专属食物及经验数值；停服换 Jar 后完整启动，`/lipet reload` 不能替换代码。

默认兼容构建与 Paper 26.2 API 全量构建各 343 项测试通过。验证边界和升级说明见 [2026-09-05 风弹喂食冲突修复](更新日志-2026-09-05-风弹喂食冲突修复.md)。

## 更早版本 · 2026-09-04 · 0.27.16

- 捕捉时记录为幼体的原版宠物现在会锁定自然年龄，不会过一段时间自行变成成年并偏离数据库外观。
- 区块重新载入、热重载恢复活动实体时再次按宠物档案校正年龄；旧版已经长大的幼体宠物在重新召唤后恢复幼体并保持。
- 成年宠物仍保持成年，并主动清除可能遗留的幼体锁龄，不冻结繁殖冷却等原版年龄计时。
- Paper 26.2 Build 111 实测狼、猫、马原版成年边界本身会保留实体 UUID、PDC、驯服状态和主人 UUID，修复只处理 LiPet 捕捉外观未锁龄的缺口。
- 不新增配置，不覆盖数据库、宠物类型、食物、模型或其他管理员设置；必须停服换 Jar 后完整启动。

完整说明见 [2026-09-04 捕捉幼体认主修复](更新日志-2026-09-04-捕捉幼体认主修复.md)。默认构建与 Paper 26.2 API Profile 各 333 项测试通过。

## 上一版 · 2026-09-04 · 0.27.15

- 修复快乐恶魂跟随时原生路径已返回成功、实体却不稳定移动的问题；快乐恶魂现在清除旧路径并直接使用飞行速度。
- 成年快乐恶魂高 4 格，跟随与安全召回的脚底目标由固定抬高 1.5 格改为抬高 3 格，减少贴地、碰撞和卡住。
- 战斗追击采用同一移动策略，不再重新进入不适用的地面路径。
- 骑乘每 tick 继续读取玩家当前视角，并为快乐恶魂额外同步身体 yaw，避免实体运动方向与身体朝向分离。
- 不新增配置，也不覆盖管理员现有速度、跟随距离、传送距离、骑乘类型、模型和食物设置；升级必须更换 Jar 并重启服务器。

完整说明见 [2026-09-04 快乐恶魂移动修复](更新日志-2026-09-04-快乐恶魂移动修复.md)。默认构建与 Paper 26.2 API Profile 各 330 项测试通过。Paper 26.2 Build 111 的成年快乐恶魂在主人水平移动 14 格后，40 tick 内水平跟随 2.823 格并抬升 0.605 格；随后通过原地转向、持续前进转向和多层模型座位骑乘回归，测试服安全关闭且无残留 Java 进程。测试使用服务端原生模拟玩家，尚未进行真人网络客户端或 Folia 实服体感验收。

## 更早版本 · 2026-09-04 · 0.27.14

- 逐项检查 Paper 26.2 的全部 `87` 种默认可捕捉原版宠物，仍保证每一种都有独立食物；另有 2 个自定义示例文件，总计生成 89 个文件。
- 有原版食物标签或同族规则的生物优先使用原版接受的物品：枯骆驼为兔子脚，猪灵类为熟猪排，硫磺魔方为黏液球，狼为肉类，猫为生鱼，僵尸马为红色蘑菇，僵尸鹦鹉螺为河豚。
- 狼模板不再把驯服用品骨头当食物，猫模板不再使用原版猫不接受的熟鱼。
- 没有原生喂食机制的敌对生物继续使用生态、掉落物或修复材料作为主题食物，方便服主辨认和继续自定义。
- 旧服已有 `growth.foods` 仍不会被覆盖；需要按更新日志手动更换对应节点，经验仍建议保持 `4`。

完整说明见 [2026-09-04 原版宠物专属食物校准](更新日志-2026-09-04-原版宠物专属食物校准.md)。默认构建与 Paper 26.2 API Profile 各 327 项测试通过；最终 Jar 在 Paper 26.2 Build 111 生成 87 个原版宠物文件和 2 个自定义示例，实读 8 组代表性文件确认新食物、旧节点移除且经验为 `4`，随后安全关闭。

## 更早版本 · 2026-09-04 · 0.27.13

- 所有官方默认食物统一为每次 `4` 点经验；默认战斗配置中，1 点最大生命的最弱目标约提供 `6` 点经验，20 点生命的常见目标提供 `15` 点经验。
- 公共熟牛肉、CraftEngine 食物案例、狼与猫模板、原版商城模板、新生成的原版可捕捉宠物和缺失食物补全全部使用相同默认值。
- 附魔金苹果仍保留高治疗和属性点效果，但喂食经验也为 `4`，不再通过高额经验取代战斗成长。
- 升级仍不覆盖管理员已有的 `growth.foods`。旧服需要手动将对应 `experience` 改为 `4`；自定义服务器仍可配置其他非负数。

完整说明见 [2026-09-04 默认喂食经验平衡](更新日志-2026-09-04-默认喂食经验平衡.md)。默认构建与 Paper 26.2 API Profile 各 325 项测试通过；最终 Jar 在 Paper 26.2 Build 111 全新生成 89 个独立宠物类型文件，确认公共食物和烈焰人专属食物均为 `4`，并完成启动、重载和安全关闭。

## 上一版 · 2026-09-04 · 0.27.12

- 修复 Folia/Shiroha 宠物在区域边界移动时，名牌刷新失败后的旧容错代码再次读取乘客并把 owning-region 异常抛出实体任务的问题。
- 每次名牌刷新先核对宠物是否由当前区域线程拥有；迁区临界点延后一 tick 通过宠物实体调度器重试一次。
- 第二次仍失败时保留上一次名牌状态并按宠物限频记录，不再在异常分支调用 `getPassengers()`、修改实体或继续抛出调度异常。
- 骑乘事件及环境行为循环把已在宠物区域确认的骑乘状态直接交给名牌服务；仍兼容 ModelEngine 多层座位，并保留骑乘时对所有观察者隐藏名牌的行为。
- 本版不增加配置项，不覆盖 `nameplate.hide-while-ridden`、文字、偏移、背景或其他管理员设置。

完整说明见 [2026-09-04 Folia 名牌跨区修复](更新日志-2026-09-04-Folia名牌跨区.md)。默认构建与 Paper 26.2 API Profile 各 324 项测试通过；最终 Jar 在 Paper 26.2 Build 111 完整启动到 `Done`，完成 SQLite、PlayerPoints 启用、`/lipet reload` 和安全关闭。当前工作区没有 Shiroha/Folia 服务端核心；针对所给堆栈完成了确定性迁区调度测试，仍需在目标 Shiroha 服换 Jar 验收。

## 上一版 · 2026-09-04 · 0.27.11

- 全部默认可捕捉原版生物都有独立食物；例如烈焰人使用烈焰粉、狼使用骨头、猫使用鳕鱼、岩浆怪使用岩浆膏。
- 新安装生成完整中文注释。升级旧服时，只为完全缺少 `growth.foods` 的官方原版宠物文件补全；已有食物配置、数值、注释和自定义宠物文件保持不变。
- 同一只宠物在一次数据库保存期间继续获得的战斗经验会合并为下一批写入，仍按玩家操作队列结算；两名玩家同时刷级时不会为每次击杀分别挤入 SQLite 写队列。
- 数据库 revision 冲突会重读最新记录并重试；活动宠物的主人、宠物、实体索引原子更新，关服保存等待已排队的经验批次，避免重启后读回旧等级。
- 战斗经验保存失败时，控制台和在线主人都会收到明确提示；宠物币仍是独立奖励，不再用“币到账”掩盖经验写入失败。

完整说明见 [2026-09-04 原版食物与成长持久化修复](更新日志-2026-09-04-原版食物与成长持久化.md)。默认兼容构建与 Paper 26.2 Profile 各 321 项测试通过；同一最终 Jar 在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成真实 SQLite 启动、状态检查、热重载和安全关闭。Paper 26.2 的旧服配置实际补全 77 个原版宠物文件，已有自定义食物的狼文件 SHA-256 前后相同；当前没有真人客户端或 Folia / MySQL 实服验证。

## 上一版 · 2026-09-03 · 0.27.10

- 技能书在提交数据库前先写入持久预扣台账并扣除一本，同一玩家的技能升级与其他宠物写操作严格串行，连续右键不会并发覆盖等级。
- MySQL 在事务内锁定宠物及技能记录；失败、满级和宠物不存在时退还本次技能书，玩家掉线或服务器重启后继续退款。
- 成长刷新、实体移动属性、跟随和战斗追击统一叠加“基础速度 + 敏捷 + 速度技能”，加敏捷后不会被后续刷新覆盖。
- GUI 的 `<speed>` 和 `%lipet_active_speed%` 最多显示三位小数；默认敏捷 0 为 `0.25`，敏捷 1 为 `0.255`，不再都显示成 `0.3`。
- 本次没有新增管理员配置项，原技能数值、宠物速度、GUI 文本和中文注释保持不变；需要停服替换 Jar 后重启。

完整说明见 [2026-09-03 技能书与敏捷速度修复](更新日志-2026-09-03-技能书与敏捷速度.md)。默认兼容构建与 Paper 26.2 Profile 各 315 项测试通过；同一最终 Jar 在 Paper 26.1.2 Build 70、Paper 26.2 Build 111 的真实 SQLite 中连续完成 5 次技能升级，第 6 次稳定返回满级。两服真实狼实体的 `MOVEMENT_SPEED` 均从 5 级迅捷的 `0.35` 在增加 1 点敏捷后变为 `0.355`，并安全关闭；未做真人客户端、Folia 或 MySQL 实服验证。

## 上一版 · 2026-09-02 · 0.27.9

- 道具商城余额不足使用 `item-shop-insufficient-funds`，默认明确写“无法购买该道具”；宠物商城的原提示不变。
- 道具扣款后的发放任务受理后退休会结束并退款，不再出现 Future 一直等待。
- 宠物速度同时写入实体支持的 `MOVEMENT_SPEED` 和 `FLYING_SPEED`，覆盖鹦鹉等具有独立飞行属性的实体。
- 骑乘每 tick 读取疾跑键；`behavior.riding-sprint-multiplier` 默认 `1.5`、范围 `1.0-3.0`，同时放大水平速度和飞行俯仰升降速度。
- `/lipet store`、管理 GUI 与信号棒共用回收反馈；超过 100 tick 提示一次，`pet-store-pending: ""` 可关闭，结果提示异常与数据库保存失败分开说明。
- 旧配置只补缺失节点和中文注释，已有货币 ID、价格、骑乘速度与管理员消息保留。

完整说明见 [2026-09-02 商城、飞行加速与回收更新](更新日志-2026-09-02-商城飞行加速与回收.md)。默认兼容构建与 Paper 26.2 Profile 各 312 项测试通过；同一最终 Jar 在 Paper 26.1.2 Build 70、26.2 Build 111 各完成 8 轮真实 SQLite 回收，并验证鹦鹉 `FLYING_SPEED` 与 1.5 倍疾跑。两服均安全关闭；未做真人客户端或 Folia 实服验证。

## 上一版 · 2026-09-01 · 0.27.8

- 修复实体任务受理后在执行前退休，却未结束召唤 Future 的问题；同一玩家后续操作不再因这条遗留结果长期排队。
- 执行、拒绝、退休和同步异常都会结束实体任务；召唤失败依据本次最后一次已成功保存的 revision 回滚并释放租约。首个 ACTIVE 写入冲突或失败时只释放租约，不按猜测的版本号回滚其他记录。
- 同步依赖错误不会毒化玩家串行队列；查询占位会在成功或失败后释放。取消请求返回值不会让仍在执行的写入提前解锁。
- 命令和仓库使用相同反馈处理，等待超过 100 tick（正常 TPS 下约 5 秒）仅提示一次；`messages.yml` 的 `pet-call-pending` 设为 `""` 可关闭。
- 提示解析或发送异常会记录玩家 UUID 与请求信息；使用独立的 `pet-call-feedback-failed` 文本，避免把已经成功的召唤误报为业务失败。
- 旧版 `/lipet reload` 不重建已卡住的运行时队列；升级需停服备份、替换 Jar 后重启。保留既有宠物数据、管理员消息和 0.27.7 骑乘配置。

完整说明见 [2026-09-01 召唤无响应修复](更新日志-2026-09-01-召唤无响应修复.md)。默认兼容构建（Paper 1.21.11 API、Java 21 字节码）与 Paper 26.2 Profile 各 306 项测试通过，失败、错误和跳过均为 0。同一最终 Jar 在 Paper 26.1.2 Build 70、26.2 Build 111 与真实 SQLite 验证受理后退休、失败回滚、队列恢复，以及无需重载重试后仅存在一个实体与会话；26.2 狼骑乘回归也通过。两服均安全关闭；未做真人客户端、真实 MEG 画面或 Folia 实服验证。

## 上一版 · 2026-09-01 · 0.27.7

- `nameplate.hide-while-ridden: true` 改为骑乘时对所有玩家隐藏宠物名牌，同时清空载体的原版名称，避免旁观者或准星仍看到文字。
- 普通骑乘隐藏复用同一个 TextDisplay，不靠反复删除重建；下马或把隐藏开关改为 `false` 并重载后恢复显示，宠物档案中的名字不变。
- 单行名牌回退路径也遵守骑乘隐藏开关，避免双行名牌关闭或刷新失败时漏出名称。
- 上马后立即启动每 tick 骑乘控制，使用骑手当前视角与按键；不必松开再按前进键，原地转头和持续前进转向都会更新。
- 下马、玩家退出或骑乘对象失效后停止对应控制任务，防止旧任务继续影响宠物。
- 骑乘期间临时关闭 `aware`，暂停会把朝向拉回的原版 LookControl / MoveControl；保留 `hasAI`、坐下状态和物理动作，下马、退出、异常或换骑时恢复原感知状态。
- 管理员在骑乘中调整 AI/坐下状态时保留新选择；重载不会对仍在骑乘的宠物强制开启感知或重设坐下状态。
- 跟随、战斗及延迟回传在实际执行前检查包含模型嵌套座位的骑乘关系，避免后台动作抢骑手方向；旧骑乘的迟到恢复不会覆盖新骑乘。
- 升级保留 `nameplate.hide-while-ridden` 和其他自定义配置，不强制覆盖管理员选择。

配置与升级步骤见 [2026-09-01 骑乘名牌与视角转向更新](更新日志-2026-09-01-骑乘名牌与视角转向.md)。默认兼容构建（Paper 1.21.11 API）与 Paper 26.2 Profile 各 264 项测试通过，失败、错误、跳过均为 0；同一 Jar 在 Paper 26.1.2 Build 70 验证狼骑乘，在 26.2 Build 111 验证狼和蝙蝠骑乘，覆盖名牌、连续转向、真实重载和多层座位。本轮未测试真人网络客户端、真实 MEG 视觉或 Folia 运行。

## 上一版 · 2026-08-31 · 0.27.6

- `config.yml` 新增 `currency.playerpoints.display-name` 和 `currency.vault.display-name`，默认分别为“点券”和“金币”；内置货币仍默认“宠物币”。
- 三种名称均支持成功执行 `/lipet reload` 后生效；关闭再重新打开宠物商城、道具商城即可看到新名称，已经打开的菜单不自动重绘。
- 重载成功且数据库结果为 `NO_CHANGE` 或 `SWITCHED` 时，统一发布新的名称快照；校验失败、数据库切换失败或并发重载请求不会发布该请求的候选名称。
- `shop.yml` 的货币 ID 仍为 `INTERNAL`、`VAULT`、`PLAYERPOINTS`，余额、扣款方式和 `100.00` 价格格式均不因改名改变。
- 旧配置只补缺失节点与中文注释；自定义名称、注释和价格保留。服务器 ID、群组和内置货币初始余额继续按启动时读取。
- 默认构建与 Paper 26.2 Profile 各 216 项测试通过；同一 Jar 在 Paper 26.1.2 / 26.2 + PlayerPoints 3.3.5 完成服务端双商城 Lore、真实重载和实际扣款探针，未做真人客户端视觉测试。

完整配置和升级步骤见 [2026-08-31 货币名称与重载更新日志](更新日志-2026-08-31-货币名称重载.md)。

## 上一版 · 2026-08-30 · 0.27.5

- ModelEngine 模型可按等级门槛变化，例如 1 级 `a`、2 级 `b`，没有新门槛时沿用上一档。
- 原版宠物捕捉成功时生成四项初始随机属性，默认力量、体质、防御、敏捷各 0–5；保存后不因重召唤、重载或重启重新随机。
- 道具商店支持 `item.capture-ball`，通过捕捉球服务发放带识别标记的真实捕捉球；材质、名称和介绍来自 `capture.yml`。
- 默认商店包含普通捕捉球案例，原有商品、自定义数值和注释保留。

完整配置见 [等级模型、随机属性与捕捉球商店](等级模型与捕捉球商店.md)，版本记录见 [2026-08-30 更新日志](更新日志-2026-08-30-等级模型与随机捕捉.md)。

## 上一版 · 2026-08-29 · 0.27.4

- `capture.yml` 新增默认关闭的 `balls.craftengine_example`，包含 CE 完整物品 ID、名称、Lore 与概率案例。
- `pet-types.yml` 新增默认关闭的 `defaults.growth.foods.craftengine_example`，所有继承公共配置的宠物均可使用。
- 捕捉球和食物都支持 `enabled`；关闭案例不会进入补全、识别、扣除、发放或食物列表。
- 只需把 `yourpack:*` 改成真实 CraftEngine ID、设为 `true`，再执行 `/lipet reload`。
- 旧服只补缺失节点和注释，不覆盖现有 Material、CE ID 或食物数值。

完整记录见 [2026-08-29 CraftEngine 捕捉球与食物案例更新日志](更新日志-2026-08-29-CE捕捉球与食物案例.md)。

## 上一版 · 2026-08-29 · 0.27.3

- `pet-types.yml -> defaults` 统一保存所有宠物相同的属性、行为、成长、食物和技能；单宠 YML 只写身份与差异项。
- 默认捕捉规则允许的所有原版生物都会在 `宠物/原版宠物/` 下生成一个中文文件名的独立 YML，已有配置不覆盖。
- 旧默认目录 `宠物类型/` 会在安全时迁移为 `宠物/`；目录、子目录和文件名均支持中文。
- MCPets 单宠物配置可原样放进中文目录；`MythicMob` 由 MythicMobs 生成，`Mountable` 和 `MountType: flying` 会参与实际骑乘。
- 自动生成 `宠物/自定义宠物/正义工作室/龙骑/龙骑-普通.yml` 作为龙骑配置参考。

完整记录见 [2026-08-29 全量宠物配置与 MCPets 兼容更新日志](更新日志-2026-08-29-全量宠物配置与MCPets兼容.md)。

## 上两版 · 2026-08-29 · 0.27.2

- 老宠物数据中的 `bat`、`fox`、`minecraft:bat` 等 ID 会自动兼容到当前 `vanilla_<实体名>` 类型，不需要改库或重新捕捉。
- 召唤、同类型持有上限与管理员按类型操作共用兼容规则，避免旧 ID 和新 ID 被当成两只不同种类。
- 商城 10 种宠物现在各有一个独立 YML；已有狼、猫或服主自定义类型不会被覆盖。
- 每个新文件包含完整中文注释、原版属性、成长、食物、模型和 MythicMobs 等级技能示例。

完整记录见 [2026-08-29 老宠物类型兼容更新日志](更新日志-2026-08-29-老宠物类型兼容.md)。

## 更早版本 · 2026-08-29 · 0.27.1

- MM 技能冷却现在先于概率抽取判断，冷却期间不再产生无效随机数；`PASSIVE` 和 `INTERVAL` 每轮合并为一次扫描。
- MM 返回 `false` 时保留配置冷却；零冷却失败技能至少退避 1 秒，错误日志按技能名分别每 30 秒最多输出一次。
- 反射层兼容实例或静态 `getAPIHelper()`，并兼容 `float` / `double power` 七参数 API。
- `/lipet status` 显示含启用规则的宠物类型数和技能规则总数；旧官方状态文本自动迁移，自定义文本不覆盖。
- 默认构建与 Paper 26.2 Profile 各 148 项测试通过；Paper 26.2 Build 111 已验证旧配置迁移、规则计数、热重载、MM 缺失降级和安全关闭。

完整记录见 [2026-08-29 MythicMobs 技能优化日志](更新日志-2026-08-29-MythicMobs技能优化.md)。

## 上两版 · 2026-08-29 · 0.27.0

- 每个 `宠物类型/*.yml` 可单独配置 MythicMobs 技能，并通过 `unlock-level` 指定宠物达到多少级后解锁。
- 支持主人攻击/受击、宠物攻击/受击、主人交互及定时触发，并可配置概率、独立冷却、基础 `power` 与每级成长。
- 低于要求等级不会施放；达到等级后自动生效。技能施放前预占冷却，避免 MM 伤害递归触发。
- MythicMobs 为可选软依赖；没有安装时 LiPet 仍正常运行，`/lipet status` 会显示 MM 状态。
- 旧宠物类型文件只补带完整中文注释且默认关闭的示例，不覆盖服主已有值和注释。

完整记录见 [2026-08-29 MythicMobs 等级技能更新日志](更新日志-2026-08-29-MythicMobs等级技能.md)。

## 上一轮更新 · 2026-08-29 · 0.26.26

- 修复从同一只宠物的管理界面进入“完整属性”或“成长与加点”后，返回按钮错误跳到宠物仓库的问题。
- 属性面板会保存打开来源；从管理界面进入时返回原宠物管理页，从仓库或指令进入时仍返回宠物仓库。
- 属性加点成功并刷新面板后，返回来源继续保留，不会在操作一次后再次丢失。
- `gui.yml` 新增可完整自定义的 `info.navigation.manage`；旧配置只补缺失节点与中文注释，不覆盖服主已有设置。

完整记录见 [2026-08-29 管理菜单返回更新日志](更新日志-2026-08-29-管理菜单返回.md)。

## 上一轮更新 · 2026-08-29 · 0.26.25

- 仓库宠物介绍沿用“灵契档案”分区，并把潜行左键、潜行右键统一显示为绿色操作提示。
- 永久放生警告前增加空行，警告改为红色 `⚠放生会永久删除全部数据`，与普通操作区分开。
- 四种点击动作保持不变：左键召唤、右键管理、潜行左键收回、潜行右键进入放生确认。
- 升级仅识别和迁移官方历史默认 Lore，服主自定义排版、颜色和文字不会被覆盖。

完整记录见 [2026-08-29 仓库介绍样式更新日志](更新日志-2026-08-29-仓库介绍样式.md)。

## 上一轮更新 · 2026-08-29 · 0.26.24

- 宠物仓库 Lore 改为四条独立提示：左键召唤、右键查看与管理、潜行左键收回、潜行右键放生。
- 潜行左键由旧默认召唤动作改为真正的 `store` 收回动作；仅迁移官方旧值，服主自定义动作保持不变。
- 宠物类型默认存放在可中文命名的 `宠物类型/` 目录，支持多个 `.yml` / `.yaml` 和递归中文子目录。
- 新服生成 `狼.yml`、`猫.yml`；旧服在目标目录不存在时自动把旧 `types` 拆成独立文件并保留中文注释。
- 目录已存在时不自动搬迁或覆盖，旧 `pet-types.yml` 单文件格式继续兼容。
- Paper 26.2 Profile 共 131 项自动测试通过，覆盖四键迁移、中文多文件读取、路径安全、旧格式拆分及官方注释安全迁移。

完整记录见 [2026-08-29 仓库四键与宠物类型目录更新日志](更新日志-2026-08-29-仓库四键与宠物类型目录.md)。

## 上一轮更新 · 2026-08-29 · 0.26.23

- 主菜单原“宠物仓库”入口改名为“我的宠物”。
- 按钮最后一行改为“➥ 点击打开宠物列表”，更准确地说明点击后的页面内容。
- 宠物列表页面本身仍使用“宠物仓库”标题，指令和功能入口不变。
- 升级仅迁移官方旧按钮名称和完整旧 Lore；服主自定义名称与说明保持不变。
- Paper 26.2 Profile 共 121 项自动测试通过；Paper 26.2 Build 111 + PlayerPoints 3.3.5 已完成真实旧 `gui.yml` 迁移、状态检查和安全关闭验证。

完整记录见 [2026-08-29 我的宠物入口更新日志](更新日志-2026-08-29-我的宠物入口.md)。

## 上一轮更新 · 2026-08-29 · 0.26.22

- 玩家已有一只宠物正在跟随时，再召唤另一只会显示：`已达最大召唤数量，请将已召唤的休息后再召唤！`
- `/lipet call` 与宠物仓库召唤共用 `messages.yml` 的 `pet-already-active`，不会误用通用的“宠物召唤失败”。
- 升级时仅迁移历次官方默认文本，包括 Bukkit 保存后自动折行的旧值；服主自定义语言保持不变。
- 召唤上限、官方旧值迁移和自定义文本保护均有自动测试覆盖。
- Paper 26.2 Build 111 + PlayerPoints 3.3.5 已完成真实旧配置迁移、状态检查和安全关闭验证。

完整记录见 [2026-08-29 召唤上限提示更新日志](更新日志-2026-08-29-召唤上限提示.md)。

## 上一轮更新 · 2026-08-29 · 0.26.21

- 修复鹦鹉等飞行宠物安全回传后，宠物已经移动但双行名牌仍停留在旧位置的问题。
- 安全回传前主动移除 TextDisplay 乘客名牌，传送完成后立即在宠物当前位置恢复。
- 异步传送失败或调用直接报错时同样恢复名牌，不留下孤立文字，也不影响下次跟随。
- 新增传送前清理、成功恢复和失败恢复顺序测试。
- Paper 26.2 Profile 共 119 项自动测试通过；Paper 26.2 Build 111 + PlayerPoints 3.3.5 已完成启动、挂钩、状态查询和安全关闭验证。

完整记录见 [2026-08-29 鹦鹉名牌跟随更新日志](更新日志-2026-08-29-鹦鹉名牌跟随.md)。

## 上一轮更新 · 2026-08-29 · 0.26.20

- 修复宠物商城和宠物道具商城的 `<currency>` 把 `INTERNAL` 直接显示给玩家的问题。
- `INTERNAL` 现在读取 `config.yml` 的 `currency.internal.display-name`，默认显示“宠物币”。
- Vault 显示为 `Vault`，PlayerPoints 显示为 `PlayerPoints`；未知或未挂钩的提供器保留原始 ID，方便排查。
- 新增统一货币展示名称测试，确保两个商城共用同一解析规则。

完整记录见 [2026-08-29 商城货币显示更新日志](更新日志-2026-08-29-商城货币显示.md)。

## 更早更新 · 2026-08-29 · 0.26.19

- 新增默认自动授予的 `lipet.player` 普通玩家权限组；`lipet.admin` 显式继承玩家组，解决权限插件中普通功能没有自动 `true` 的问题。
- 新增 `/lipet top coin [页码]` 宠物币排行榜和 `/lipet top level [页码]` 宠物等级排行榜；每页数量可配置，SQLite/MySQL 异步分页查询。
- 宠物商城与宠物道具商城支持 `currency: "PLAYERPOINTS"`；PlayerPoints 是可选软依赖，价格必须填写整数。
- `/lipet status` 新增独立 PlayerPoints 状态行；旧版自定义总状态文本不会覆盖。
- 116 项自动测试通过；Paper 26.2 Build 111 + PlayerPoints 3.3.5 已完成真实挂钩、两种排行榜与安全关闭验证。

完整记录见 [2026-08-29 权限组、排行榜与 PlayerPoints 更新日志](更新日志-2026-08-29-权限排行榜与PlayerPoints.md)。

## 更早更新 · 2026-08-29 · 0.26.18

- 宠物仓库新增四种独立点击：左键和蹲下左键召回，右键查看属性与管理，蹲下右键进入放生二次确认。
- 仓库宠物图标新增红色永久放生说明；旧版默认 Lore 会自动迁移，缺失的 `SHIFT_LEFT`、`SHIFT_RIGHT` 节点会补齐，服主自定义 Lore 与动作不会覆盖。
- 已收回宠物现在也会绑定真实主人和宠物 UUID，蹲下右键可以正常打开确认页，不会误删其他宠物，也不会绕过二次确认。
- 修复仓库召回语言：已有活动宠物、找不到宠物、死亡冷却、跨服租约占用和真实失败分别使用对应 `messages.yml` 节点。
- 保留 `/lipet coin give|take|look`，并新增 `/lipet givecoin`、`/lipet takecoin`、`/lipet lookcoin` 等价快捷指令；权限仍为 `lipet.admin.coin`。
- 默认构建与 Paper 26.2 Profile 各 111 项测试通过；Paper 26.2 Build 111 已完成旧 GUI 配置迁移、分组宠物币命令与快捷命令实测。

完整记录见 [2026-08-29 仓库快捷操作、语言与宠物币更新日志](更新日志-2026-08-29-仓库快捷操作.md)。

## 上一轮更新 · 2026-08-29 · 0.26.17

- 新增 `/lipet coin give|take|look <玩家> [数量]` 与 `lipet.admin.coin`，管理员可查询、发放和安全扣除目标玩家的内置宠物币。
- 宠物币目标支持已知玩家名和完整 UUID；离线目标可手工输入，Tab 仍只显示在线玩家。余额不足时 `take` 会拒绝扣款，不产生负数。
- 骑乘隐藏不再删除和重建 TextDisplay，而是只对当前骑手隐藏原名牌，修复下坐骑后名字掉到实体下方的问题。
- 末影龙宠物会固定为 `HOVER` 阶段，避免原版阶段 AI 把龙带向末地传送门；飞行骑乘可按视角俯仰升降，跳跃键主动爬升。
- 默认构建与 Paper 26.2 Profile 各 106 项测试通过；Paper 26.2 Build 111 已完成真实 SQLite 宠物币增减、余额不足保护与安全关闭验证。

完整记录见 [2026-08-29 宠物币、名牌与末影龙更新日志](更新日志-2026-08-29-宠物币与末影龙.md)。

## 上一轮更新 · 2026-08-28

- `0.26.16`：新增实体挂载/离开监听，骑上宠物后立即隐藏双行名牌；凋零、末影龙等 Boss 宠物还可自动隐藏血条，下坐骑后恢复原可见状态。
- 末影龙身体部件现在会解析回龙本体，空手右键骑乘、潜行右键管理和信号棒右键不再因点中翅膀或身体部件而失效。
- 管理员玩家参数的 Tab 补全只显示在线玩家与 `-all`；离线名称和 UUID 仍可手工执行，不改变离线发放/收走能力。
- 新增 `/lipet delete [宠物名称]` 与 `lipet.command.delete`；不填写名称时删除当前已召唤宠物，操作会永久删除宠物数据且无法恢复。
- “已有宠物时再次召唤”提示会同时显示当前宠物和想召唤的目标宠物；旧默认错误文本会安全迁移，自定义语言保持不变。
- `0.26.14`：CraftEngine 从“仅识别喂食物品”升级为完整物品提供器；CE 完整 ID 可用于喂食、捕捉球、技能书、信号棒、商城商品、商城图标、GUI 按钮和填充物。
- LiPet 通过 CraftEngine 官方稳定 API 生成物品并反向校验 ID，保留 CE 模型和组件数据；不存在的 ID 不会退化成同底材原版物品。
- CraftEngine 重载完成后，LiPet 自动刷新物品索引；`/lipet status [CE物品ID]` 可查看中文状态、索引数量并执行生成 → 识别全链路自检，ID 参数支持 Tab 补全。
- CE 物品不可用时，GUI 使用带中文原因的屏障占位；商城购买自动退款；指令发放和捕捉返还给出中文提示，不会静默吞物品。
- `0.26.13`：主菜单、宠物商城、道具商城、仓库、属性、管理、放生确认和宠物背包中的每次有效库存点击都会播放 `sounds.click` 配置音效。
- 全部内置功能按钮、`custom-items` 自定义按钮、属性按钮、导航按钮和信息卡片均支持 `slots: [槽位...]`，可把同一图标与动作复制到多个位置。
- `slots` 非空时优先，空列表时回退旧版 `slot`；升级只补缺失节点和中文说明，不覆盖服主已有槽位、列表或注释。
- `0.26.12`：新增 `/lipet give <玩家|-all> <宠物类型> [宠物名称]`，可向服务器已知在线、离线玩家或全服玩家发放指定宠物。
- 新增 `/lipet take <玩家|-all> <宠物名称|UUID|宠物类型|-all>`；第一个 `-all` 表示全服玩家，第二个 `-all` 表示收走目标玩家名下全部宠物。
- 玩家参数支持名称与 UUID；离线目标仍可手工执行，当前 Tab 补全只显示在线玩家、`-all`、宠物类型和已缓存宠物名称。全服任务在数据库队列中顺序执行，避免瞬间压满 SQLite / MySQL。
- LiPet 宠物会在生成事件触发前写入专属标记，再由 `HIGHEST` 优先级监听器仅放行自己的宠物，因此 Residence 等领地禁止普通生物生成时仍可召唤宠物。
- 若其他插件在更晚阶段继续阻止实体生成，LiPet 会回滚召唤，不创建 TextDisplay 名牌，避免出现“只有宠物名字、没有宠物实体”。

CraftEngine 配置与验证记录见 [2026-08-28 CE 更新日志](更新日志-2026-08-28-CE.md)。管理员指令、权限和领地兼容记录见 [2026-08-28 更新日志](更新日志-2026-08-28.md)。

## 更早更新 · 2026-08-27

- `0.26.11`：新增 `/lipet manage <玩家> <宠物名称>`，管理员可进入指定在线玩家的指定宠物管理界面。
- `0.26.11`：`shop.yml` 新增 `enabled` 商城总开关；关闭后两个商城的指令、GUI 导航和购买入口全部禁用，`/lipet reload` 后立即生效。
- 跨玩家操作会同时绑定操作者、真实主人和宠物 UUID；管理员权限被撤销后，旧管理界面也不能继续操作。

完整配置、升级方式与验证记录见 [2026-08-27 更新日志](更新日志-2026-08-27.md)。

## 历史更新 · 2026-08-26

- `0.26.8`：修复 ModelEngine / MEG 模型与原版宠物载体重叠，增加载体隐藏、碰撞箱控制、幂等恢复和热重载刷新。
- `0.26.9`：支持使用 CraftEngine 自定义物品喂食，按完整命名空间 ID 精确识别，同时保留原版 Material 食物。
- `0.26.10`：取消会与 LuckPerms 冲突的 `/lp` 别名，只保留 `/lipet` 主指令。

配置示例、升级步骤与实测记录见 [2026-08-26 更新日志](更新日志.md)。

## 1. 插件定位

LiPet 是一个面向群组服的宠物插件，目标是提供完整、可配置的宠物体验，同时保持 Paper 26.x 可维护兼容。

当前核心能力：

- 宠物创建、召唤、收回、放生、改名
- 宠物商城、道具商城、宠物仓库 GUI
- 每日领取、宠物战斗、升级与捕捉宠物币奖励
- 管理员按玩家、UUID 或全服范围发放与收走宠物
- 捕捉球与捕捉仪式
- 宠物等级、经验、属性点和衍生战斗属性
- 宠物喂养、战斗经验、死亡冷却
- 宠物骑乘、坐下 / 跟随切换
- 每只宠物独立背包
- 宠物信号棒
- SQLite / MySQL 持久化
- Redis 群组同步预留
- Vault / PlayerPoints / PlaceholderAPI / ModelEngine / CraftEngine 软兼容

## 2. 安装

1. 将 `LiPet-0.27.24-SNAPSHOT.jar` 放入服务器 `plugins/` 目录。
2. 启动服务器一次，让插件生成默认配置。
3. 停服，编辑 `plugins/LiPet/` 下的配置文件。
4. 再次启动服务器。
5. 执行 `/lipet status` 检查状态。

单服推荐 SQLite。群组服推荐 MySQL，并按需开启 Redis 同步。

## 3. 配置文件

| 文件 | 用途 |
| --- | --- |
| `config.yml` | 存储、服务器 ID、群组、依赖下载、三种货币显示名称、内置货币初始余额、排行榜分页 |
| `pet-types.yml` | `defaults` 公共宠物参数、目录、原版自动注册、名牌、骑乘和背包全局设置；兼容旧 `types` 节点 |
| `宠物/**/*.yml` | 每只宠物的身份与差异项，也可直接放 MCPets 单宠物文件；目录和文件名可用中文 |
| `shop.yml` | 商城总开关、宠物商城和宠物道具商城 |
| `gui.yml` | GUI 标题、尺寸、槽位、留白/边框、图标、点击动作与音效 |
| `capture.yml` | 捕捉球、捕捉概率、捕捉仪式、音效、粒子、实体映射 |
| `skills.yml` | 技能书、技能等级、技能效果 |
| `items.yml` | 宠物信号棒等 LiPet 功能物品 |
| `rewards.yml` | 每日、战斗、升级、捕捉宠物币奖励与反馈效果 |
| `messages.yml` | 所有玩家提示文本 |

所有文本建议使用 MiniMessage 格式。插件会自动补全新增配置节点，不会覆盖已有自定义值。

## 4. 存储配置

### SQLite 单服

```yaml
storage:
  type: "SQLITE"
  sqlite:
    file: "lipet.db"
```

SQLite 适合单服，默认启用。宠物、技能、背包、货币等数据会写入 `plugins/LiPet/lipet.db`。

关服保存等待时间可在主配置调整：

```yaml
storage:
  shutdown-save-timeout-seconds: 20
```

建议保持 `20` 秒以上。LiPet 会先完成活动宠物收回，再排空 SQLite/MySQL 写入队列；若服务器曾崩溃，区块实体载入时会清理未绑定的旧宠物实体，避免再次召回后出现重复实体。

### MySQL 群组服

```yaml
storage:
  type: "MYSQL"
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "lipet"
    username: "root"
    password: "change-me"
    maximum-pool-size: 10
    connect-timeout-seconds: 10
    socket-timeout-seconds: 30
```

群组服必须使用 MySQL。每个子服需要设置不同的 `server.id`，同一组服务器使用相同的 `server.group`。

`connect-timeout-seconds` 控制连接失败需要等待多久，范围 `1-30` 秒；`socket-timeout-seconds` 控制查询和写入等待响应的时间，范围 `1-120` 秒。这两个限制也用于热切换候选库验证，避免错误地址长期卡住。

```yaml
server:
  id: "survival-1"
  group: "main"
```

### 数据库热切换

以下配置修改后可直接执行 `/lipet reload`，不需要重启服务器：

- `storage.type`
- `storage.sqlite.file`
- `storage.mysql.host / port / database / username / password`
- `storage.mysql.maximum-pool-size`
- `storage.mysql.connect-timeout-seconds / socket-timeout-seconds`

切换顺序：

1. 在后台下载或加载目标 JDBC 驱动。
2. 连接候选数据库并完成建表/迁移验证；此时旧库继续服务。
3. 安全保存并收回当前服务器的活动宠物。
4. 等待旧库已受理操作结束，切换窗口内的新请求进入队列。
5. 宠物、技能、背包、内置货币和奖励防重记录同时转向新库，再关闭旧连接。

任一步失败都会保留旧数据库运行时，并在控制台给出原因。`/lipet status` 显示的是当前真正生效的数据库类型与目标，而不是尚未成功应用的文件值。

重要：热切换不是数据迁移工具，不会自动复制两个独立数据库中的历史宠物和货币数据。更换为另一份 SQLite 文件或全新的 MySQL 库前，请停服备份并先完整迁移数据；切换到空库后看到的也会是空数据。`server`、`cluster` 和 Redis 通道设置仍需重启生效。

## 5. 玩家指令

`0.26.10-SNAPSHOT` 起只注册 `/lipet` 主指令，不再提供 `/lp` 别名，也不会再生成 `/lipet:lp`，避免与 LuckPerms 等权限插件冲突。

| 指令 | 说明 |
| --- | --- |
| `/lipet` | 玩家默认打开宠物中心；控制台默认显示帮助 |
| `/lipet menu` | 打开宠物中心 |
| `/lipet shop` | 打开宠物商城 |
| `/lipet itemshop` | 打开宠物道具商城 |
| `/lipet warehouse` | 打开宠物仓库 |
| `/lipet balance` | 查看宠物币余额 |
| `/lipet top <coin\|level> [页码]` | 查看宠物币或宠物等级排行榜 |
| `/lipet daily` | 领取每日宠物币 |
| `/lipet call <宠物名称>` | 召唤仓库中的宠物 |
| `/lipet store` | 收回当前已召唤宠物 |
| `/lipet sit` | 当前宠物坐下 / 继续跟随 |
| `/lipet mount` | 骑乘当前已召唤宠物 |
| `/lipet inventory [宠物名称]` | 打开当前或指定宠物背包 |
| `/lipet rename [宠物名称]` | 进入聊天框改名模式 |
| `/lipet release [宠物名称]` | 永久放生宠物 |
| `/lipet delete [宠物名称]` | 永久删除宠物 |
| `/lipet info <宠物名称>` | 查看宠物属性 |
| `/lipet help [页码]` | 查看帮助 |

## 6. 管理员指令

| 指令 | 说明 |
| --- | --- |
| `/lipet create <类型> <名称>` | 直接创建宠物 |
| `/lipet list` | 查看宠物列表 |
| `/lipet captureball <类型> [数量] [玩家]` | 发放捕捉球 |
| `/lipet skillbook <技能> [数量] [玩家]` | 发放技能书 |
| `/lipet signalstick [数量] [玩家]` | 发放宠物信号棒 |
| `/lipet give <玩家|-all> <宠物类型> [宠物名称]` | 向单个在线/离线玩家或所有已知玩家发放宠物 |
| `/lipet take <玩家|-all> <宠物名称|UUID|宠物类型|-all>` | 从单个在线/离线玩家或所有已知玩家名下收走宠物 |
| `/lipet coin look <玩家>` | 查询指定玩家的内置宠物币余额 |
| `/lipet coin give <玩家> <数量>` | 向指定玩家发放内置宠物币 |
| `/lipet coin take <玩家> <数量>` | 从指定玩家安全扣除内置宠物币 |
| `/lipet lookcoin <玩家>` | 快捷查询指定玩家的内置宠物币余额 |
| `/lipet givecoin <玩家> <数量>` | 快捷发放指定玩家的内置宠物币 |
| `/lipet takecoin <玩家> <数量>` | 快捷安全扣除指定玩家的内置宠物币 |
| `/lipet status` | 查看插件状态 |
| `/lipet reload` | 重载配置并热切换 SQLite / MySQL |
| `/lipet manage <玩家> <宠物名称>` | 打开指定在线玩家的指定宠物管理界面 |

### 管理指定玩家的宠物

```text
/lipet manage Steve 小狼
```

目标玩家当前必须在线，宠物可以处于已召唤或已收回状态。管理员可以查看属性、分配属性点、打开独立背包、聊天框改名、切换坐下、收回或放生该宠物。坐下与收回会再次核对当前活动宠物 UUID：如果选择的是已收回宠物，或玩家当前召唤的是另一只宠物，只会提示“宠物未召唤”，不会误操作另一只宠物。

该功能默认仅 OP 可用。管理界面的每次点击都会重新检查 `lipet.admin.manage`；权限被撤销后，已经打开的旧界面也会立即失效。

### 发放与收走宠物

```text
/lipet give Steve wolf 小狼
/lipet take Steve 小狼
/lipet take 069a79f4-44e9-4726-a5be-fca90e38aaf5 wolf
/lipet give -all cat
/lipet take -all cat
/lipet take Steve -all
```

- 单人目标支持不区分大小写的玩家名或完整 UUID。按名称操作时玩家必须已有 Bukkit 档案；完整 UUID 可直接定位数据库中的玩家，即使本地 `playerdata` 已被清理也可使用。
- `-all` 会合并服务器已知离线玩家与当前在线玩家，并按 UUID 去重；从未进入服务器且没有 Bukkit 档案的名字不会被凭空创建，未出现在本服档案中的目标需填写 UUID。
- `give` 的第二个参数必须是“宠物类型”目录或旧 `pet-types.yml` 中已启用的类型 ID；不写名称时使用该类型的默认显示名。玩家已经拥有同类型宠物或同名宠物时会安全跳过，不重复创建。
- `take` 的选择器支持宠物名称、宠物 UUID、宠物类型 ID，以及 `-all`。使用类型 ID 时会处理该类型宠物；使用第二个 `-all` 时会收走该玩家的全部宠物。
- 全服任务会逐个玩家、逐只宠物提交数据库操作，避免一次性产生大量并发写入；单个玩家失败不会中断后续目标。
- 收走已召唤宠物时会同时删除数据库记录、活动会话、原版实体、外部模型与双行名牌；离线玩家的已收回宠物可以直接处理。
- 两个指令均可由控制台执行。Tab 补全只联想 `-all`、当前在线玩家、宠物类型和当前已缓存的宠物名称；离线玩家名或 UUID 仍可手工输入执行。

### 管理宠物币

```text
/lipet coin look Steve
/lipet coin give Steve 1000
/lipet coin take 069a79f4-44e9-4726-a5be-fca90e38aaf5 250
```

- `look` 不需要数量；`give` 与 `take` 的数量必须大于 `0` 且不超过一万亿。
- 目标支持不区分大小写的已知玩家名和完整 UUID；离线玩家仍可手工输入，Tab 只显示在线玩家。
- `take` 使用数据库原子条件更新，余额不足时不会扣除任何金额，也不会产生负数。
- 指令只管理 LiPet `INTERNAL` 宠物币，不修改 Vault、PlayerPoints 或 PlayerCurrency 余额。
- 控制台可执行，权限为 `lipet.admin.coin`，全部反馈文本可在 `messages.yml` 自定义。

### 查看排行榜

```text
/lipet top coin [页码]
/lipet top level [页码]
```

- `coin` 统计已经建立 LiPet 内置宠物币账户的玩家，按余额从高到低显示。
- `level` 按宠物等级、经验排序；同一主人拥有多只宠物时，每只宠物都是独立名次。
- `config.yml` 的 `leaderboard.page-size` 控制每页 `1-20` 条。
- 排行榜查询在 SQLite/MySQL 仓库线程中完成，玩家和控制台均可执行；权限为 `lipet.command.top`。

## 7. 权限

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `lipet.command.use` | true | 使用 `/lipet` 主命令 |
| `lipet.command.menu` | true | 打开宠物中心 |
| `lipet.command.shop` | true | 打开宠物商城 |
| `lipet.command.itemshop` | true | 打开宠物道具商城 |
| `lipet.command.warehouse` | true | 打开宠物仓库 |
| `lipet.command.balance` | true | 查看宠物币余额 |
| `lipet.command.top` | true | 查看宠物币和宠物等级排行榜 |
| `lipet.command.daily` | true | 领取每日宠物币 |
| `lipet.admin.manage` | op | 管理指定在线玩家的指定宠物 |
| `lipet.admin.pet.give` | op | 向在线、离线或全服玩家发放宠物 |
| `lipet.admin.pet.take` | op | 从在线、离线或全服玩家名下收走宠物 |
| `lipet.admin.coin` | op | 查询、发放和扣除目标玩家的内置宠物币 |
| `lipet.command.call` | true | 召唤宠物 |
| `lipet.command.store` | true | 收回宠物 |
| `lipet.command.sit` | true | 坐下 / 跟随 |
| `lipet.command.mount` | true | 骑乘宠物 |
| `lipet.command.inventory` | true | 打开宠物背包 |
| `lipet.command.rename` | true | 修改宠物名称 |
| `lipet.command.release` | true | 放生宠物 |
| `lipet.command.delete` | true | 永久删除宠物 |
| `lipet.command.info` | true | 查看宠物信息 |
| `lipet.command.help` | true | 查看帮助 |
| `lipet.capture` | true | 使用捕捉球 |
| `lipet.command.create` | op | 创建宠物 |
| `lipet.command.list` | true | 查看宠物列表 |
| `lipet.command.captureball` | op | 发放捕捉球 |
| `lipet.command.skillbook` | op | 发放技能书 |
| `lipet.command.signalstick` | op | 发放信号棒 |
| `lipet.command.status` | op | 查看运行状态 |
| `lipet.command.reload` | op | 重载配置 |
| `lipet.player` | true | 普通玩家总权限；自动包含全部玩家功能 |
| `lipet.admin` | op | 管理员总权限 |

## 8. 宠物类型

`0.27.5` 新增 `model.levels`：支持 1 级用 `a`、2 级用 `b`，升级与召唤按门槛选择模型。完整配置见 [等级模型、随机属性与捕捉球商店](等级模型与捕捉球商店.md)。

宠物类型默认拆分在 `plugins/LiPet/宠物/` 目录。目录名称由 `pet-types.yml` 控制，支持中文和多级相对目录：

```yaml
type-files:
  enabled: true
  directory: "宠物"
  include-subdirectories: true
```

目录中可放多个 `.yml` 或 `.yaml`，默认递归读取子目录。文件名和子目录名可以使用中文；稳定的宠物类型 ID 仍只使用英文小写、数字、下划线或短横线。

新服首次启动会为默认捕捉规则允许的全部原版生物生成 `原版宠物/<中文名>.yml`，并生成 `自定义宠物/正义工作室/龙骑/龙骑-普通.yml` 示例。旧服升级只创建尚未配置的类型；同名文件、已有类型、数值和注释均不会被覆盖。若只存在旧官方 `宠物类型/` 目录，插件会整目录安全改名为 `宠物/`；新旧目录同时存在时不会自动合并。

所有宠物相同的值统一写在 `pet-types.yml`：

```yaml
defaults:
  attributes:
    base-health: 20.0
    base-damage: 3.0
    movement-speed: 0.25
  behavior:
    follow-distance: 10.0
    stop-distance: 3.0
    teleport-distance: 30.0
    mountable: true
    mount-type: "AUTO"
  inventory:
    size: 54
```

`宠物/原版宠物/狼.yml` 只写不同部分：

```yaml
types:
  wolf:
    inherit-defaults: true
    entity-type: "WOLF"
    display-name: "狼"
    legacy-ids:
      - "wolf"
      - "minecraft:wolf"
      - "vanilla_wolf"
    # 只有狼需要不同数值时才增加：
    attributes:
      base-health: 30.0
```

继承规则：

- 单宠节点会深层覆盖 `defaults`，例如只改 `base-health` 不会丢掉公共 `base-damage`。
- `inherit-defaults: false` 表示该宠物完全不继承，必须在自己的文件中写完整配置。
- `mythic-skills: {}` 等显式空节点用于清空对应公共段。
- 继承只在内存中合并，不会把大段默认值写回每只宠物的文件。

其他说明：

- `entity-type` 必须是当前 Paper 版本存在的 Bukkit 实体类型。
- `legacy-ids` 可填写旧数据库使用的类型 ID；官方会自动兼容原版 `实体名`、`minecraft:实体名` 到 `vanilla_<实体名>`。
- 一个文件可定义一个或多个类型；不同文件不能出现重复类型 ID。
- `type-files.include-subdirectories: false` 时只读取目录第一层文件。
- `type-files.directory` 只能是 LiPet 数据目录内的相对目录，禁止绝对路径和 `../` 越界。
- `owner-limit` 当前固定用于“一种宠物只能拥有一只”的限制。
- `model.provider` 支持 `NATIVE`、`MODEL_ENGINE`、`CRAFT_ENGINE`。
- `model.hide-base-entity` 仅在外部模型提供器中生效；ModelEngine/MEG 建议保持 `true`，它只隐藏原版载体外观，不会关闭宠物 AI。
- `model.override-hitbox` 控制 ModelEngine 是否使用模型蓝图碰撞箱；它与隐藏原版外观是两个独立选项。
- `auto-register-vanilla: true` 时会自动注册可生成的原版实体宠物类型。
- `follow-distance` 是开始追赶距离，`stop-distance` 是停止追赶距离；后者必须更小，避免宠物在临界点反复启停。
- 超过 `teleport-distance` 时只会在主人落地且未飞行、未滑翔时安全回传；回传带有短冷却，避免异步传送失败时连续刷传送。
- 原生寻路连续拒绝路径时，宠物会在主人安全落地后回传，不会停在原地，也不会使用速度强拖穿过障碍。

### MCPets 自定义宠物

MCPets 的单宠物 YML 可原样复制到 `plugins/LiPet/宠物/` 下任意中文子目录。例如原路径：

```text
plugins/MCPets/Pets/justice_studios/dragon_mounts/dragon-mounts-normal.yml
```

可改放到：

```text
plugins/LiPet/宠物/自定义宠物/正义工作室/龙骑/龙骑-普通.yml
```

核心格式：

```yaml
Id: pet_dragon_mounts
Enabled: true
MythicMob: dragon-mounts-red
EntityType: PHANTOM
Mountable: true
MountType: flying
Distance: 6
ComingBackRange: 15
Icon:
  Name: "龙骑"
```

- `MythicMob` 存在时使用 MythicMobs Mob ID 生成实体；未安装或未启用 MythicMobs 时会给出中文召唤失败原因。
- 当前主要直接执行 `Id`、`Enabled`、`MythicMob`、`EntityType`、`Name` / `Icon.Name`、`Mountable`、`MountType`、`Distance` 和 `ComingBackRange`。
- `MountType: flying` 强制飞行骑乘；`walking` 映射为地面骑乘。
- `SpawnRange` 会被读取保留，但本版仍在主人位置生成，不按该半径随机偏移。
- `Permission`、`Signals`、`Skins`、`DismountOnDamaged`、`DespawnOnDismount`、`AutoRide` 暂不执行，但无需从原 MCPets 文件删除。
- MCPets 转换只发生在内存中，复制进来的原文件不会被改写。修改后执行 `/lipet reload`。

### MythicMobs 等级技能

每个宠物类型都可维护独立的 MM 技能列表。下面示例应放在对应类型节点内，例如 `宠物/原版宠物/狼.yml` 的 `types.wolf`：

```yaml
mythic-skills:
  level-10-bite:
    enabled: true
    skill: "LiPetWolfBite"
    trigger: "PET_ATTACK"
    unlock-level: 10
    chance: 0.35
    cooldown-seconds: 8.0
    power: 1.0
    power-per-level: 0.05
```

- `skill` 是 MythicMobs 配置中的内部技能名，区分大小写。
- `unlock-level` 是解锁等级，必须在 `1` 到该宠物的 `growth.maximum-level` 之间。
- `chance` 范围为 `0.0-1.0`；`1.0` 表示每次符合触发条件都会尝试施放。
- `cooldown-seconds` 是同一只宠物、同一项技能的独立冷却。
- 最终 `power = power + max(0, 宠物等级 - unlock-level) × power-per-level`。例如本例 14 级时传入 MM 的 `power` 为 `1.2`。
- `trigger` 支持 `PET_ATTACK`、`PET_DEFEND`、`OWNER_ATTACK`、`OWNER_DEFEND`、`INTERACT`、`PASSIVE`、`INTERVAL`。
- `PASSIVE` 与 `INTERVAL` 在宠物行为循环中按冷却触发，至少需要 `0.5` 秒冷却；有战斗目标时传递战斗目标，否则使用主人。
- MM 技能会在施放前预占冷却，防止技能伤害再次进入同一触发链造成递归。
- MythicMobs 未安装或技能名不存在时不会影响 LiPet 其他功能；执行 `/lipet status` 可检查挂钩状态、含启用规则的宠物类型数和规则总数。
- 冷却中的技能不会重复抽取概率；`PASSIVE` 与 `INTERVAL` 每轮只扫描一次技能表。
- MM 返回 `false` 时会保留配置冷却；零冷却失败技能至少退避 1 秒，错误日志按技能名独立限频，避免错误技能刷屏。
- MM 5.x 的实例/静态 APIHelper 与 `float`/`double power` 变体均有反射兼容测试。

旧文件升级时只会增加带中文注释且 `enabled: false` 的 `level-skill-example`，不会自动施放占位技能，也不会覆盖已有配置。修改后执行 `/lipet reload` 即可重新载入。

### ModelEngine / MEG 模型

给宠物使用 ModelEngine 模型时，至少填写：

```yaml
model:
  provider: "MODEL_ENGINE"
  id: "你的模型ID"
  hide-base-entity: true
  override-hitbox: true
```

`hide-base-entity: true` 会通过 ModelEngine 的载体可见性接口隐藏脚下的原版生物，同时继续使用该实体承载 LiPet 的 AI、寻路、属性与碰撞。不要用隐身药水代替这个选项。重复召唤、区块重新加载和宠物运行状态恢复都会复用已有同 ID 模型，不会再次叠加；修改模型配置后执行 `/lipet reload`，当前已召唤宠物也会在其实体线程刷新。若将 `id` 改成另一个模型，插件会先卸载本轮运行期记录的旧模型再挂载新模型。

ModelEngine 的显示版本同为 `R4.1.0` 时，不同构建支持的 NMS 版本仍可能不同。Paper 26.x 必须安装包含 Java 25 / 26.x NMS 适配层的更新构建；若控制台出现 `Unsupported NMS Version: 26.1.2` 或类似错误，是当前 ModelEngine 构建不支持服务端版本，应先升级 ModelEngine。LiPet 不会把 ModelEngine 打进自身 Jar。

### 双行宠物名牌

召唤后的宠物默认使用两行头顶文字：第一行是宠物名称，第二行是主人玩家名。配置位于 `pet-types.yml` 顶层：

```yaml
nameplate:
  enabled: true
  owner-line: "<gradient:#7DD3FC:#C4B5FD>主人：</gradient><white><owner_name></white>"
  vertical-offset: 0.55
  view-range: 1.0
  line-width: 200
  text-opacity: 255
  shadowed: true
  see-through: false
  default-background: false
  background-color: "#00000000"
  # true：骑乘时对所有玩家隐藏；false：骑乘时保留名牌显示。下马后恢复。
  hide-while-ridden: true

riding:
  hide-boss-bar-while-ridden: true
```

- `owner-line` 支持 MiniMessage、RGB、渐变和 `<owner_name>` 占位符。
- `enabled: false` 会停用双行显示并使用原版单行宠物名称；单行回退仍遵守骑乘隐藏规则。
- `hide-while-ridden: true` 会在骑乘时对所有玩家隐藏双行名牌，同时清空载体原版名称；下马后恢复。设为 `false` 并重载则保留显示。普通上下马复用同一个 TextDisplay，不再删除重建。
- `riding.hide-boss-bar-while-ridden: true` 会同步隐藏凋零、末影龙等 Boss 血条，并在下坐骑时恢复骑乘前状态。
- 修改后执行 `/lipet reload`，已召唤宠物会在下一轮行为刷新时自动应用新样式。
- 名牌使用独立 PDC 关联宠物实体；区块重新载入时会校验并恢复。安全回传会先移除旧 TextDisplay，再在异步传送结束后立即重建，避免飞行宠物和名牌分离；死亡、收回和放生时会同步删除，不写入宠物数据库。

## 9. 属性与成长

`0.27.5` 起，新捕捉的原版宠物默认获得力量、体质、防御、敏捷各 0–5 的随机初始值；数值存入数据库，重召唤和重启不重抽。可在 `capture.yml -> vanilla-random-attributes` 关闭或调整，已有宠物及商店/指令创建不受影响。

核心属性：

- 力量：增加攻击伤害、暴击伤害与少量吸血，不增加暴击率
- 体质：增加生命与恢复
- 防御：增加伤害减免
- 敏捷：增加移动速度，并影响闪避等衍生属性

衍生属性：

- 最大生命
- 攻击伤害
- 伤害减免
- 暴击率
- 暴击伤害
- 闪避
- 击退抗性
- 吸血
- 生命恢复

成长配置位置：

```yaml
growth:
  maximum-level: 50
  base-experience: 100
  experience-per-level: 25
  attribute-points-per-level: 3
```

宠物可通过喂食和战斗获得经验。升级后获得自由属性点，玩家可在 GUI 中加点。

属性与宠物状态的中文名称位于 `messages.yml`：

```yaml
labels:
  unknown-pet: "未知宠物"
  attributes:
    strength: "力量"
    vitality: "体质"
    defense: "防御"
    agility: "敏捷"
  pet-states:
    stored: "已收回"
    active: "已召唤"
    transferring: "转移中"
    dead: "复活冷却"
    disabled: "已禁用"
```

属性加点消息可使用完整上下文变量，常用变量包括 `<pet_name>`、`<attribute>`、`<attribute_key>`、`<previous_value>`、`<value>`、`<previous_points>`、`<points>`、`<strength>`、`<vitality>`、`<defense>` 和 `<agility>`。`<attribute>` / `<attribute_name>` 是中文显示名，`<attribute_key>` 保留 `STRENGTH` 等稳定英文键，适合动作和外部插件。

## 10. 喂食

食物配置在对应的宠物类型 YML 中；旧 `pet-types.yml` 写法继续支持。`0.27.11` 起，全部默认可捕捉原版生物会生成独立食物，例如：

```yaml
types:
  vanilla_blaze:
    growth:
      foods:
        # 关闭从公共 defaults 继承的熟牛肉。
        COOKED_BEEF:
          enabled: false
        # 烈焰人使用烈焰粉。
        BLAZE_POWDER:
          enabled: true
          display-name: "烈焰粉"
          experience: 4
          healing: 6.0
          attribute-points: 0
          minimum-level: 1
          maximum-level: 0
```

旧官方原版宠物文件仅在完全没有 `growth.foods` 时自动补入对应规则；只要已经存在该节点，LiPet 就视为管理员自定义并原样保留。自定义宠物文件不会参与此次迁移。

公共或自定义食物写法：

```yaml
foods:
  # 旧版 Bukkit Material 写法继续支持。
  COOKED_BEEF:
    enabled: true
    display-name: "熟牛肉"
    experience: 4
    healing: 6.0
    attribute-points: 0
    minimum-level: 1
    maximum-level: 0

  # CraftEngine 物品必须填写完整 namespace:item_id。
  # 节点名只是管理员自定别名；使用 item-id 后也完整支持含点号的合法 ID。
  craftengine_example:
    # 默认关闭；改好真实 CE ID 后再启用。
    enabled: false
    item-id: "yourpack:pet_food"
    display-name: "灵契宠物粮"
    experience: 4
    healing: 8.0
    attribute-points: 0
    minimum-level: 1
    maximum-level: 0
```

规则：

- 玩家手持配置的原版或 CraftEngine 食物右键自己的宠物即可喂食。
- `enabled: false` 的食物不会参与识别、扣除或界面食物列表；旧食物未填写时按 `true` 兼容。
- 官方默认喂食经验为 `4`；默认击杀经验为 `round(5 + 目标最大生命 × 0.5)`，最低不少于 `1`。
- 升级不会覆盖已存在的食物数值；旧服如需采用当前平衡，请手动将对应食物的 `experience` 改为 `4`。
- CraftEngine 物品按完整自定义 ID 精确识别；即使多个物品都以 `PAPER` 为底材，也只会匹配配置的那一个。
- 简单 CE ID 可直接作为节点名，例如 `'default:pet_biscuit':`；ID 含 `.` 时请使用普通节点别名并填写 `item-id`。
- `CraftEngine` 是可选软依赖。未安装时原版食物仍可使用，CE 食物配置会保留但不会匹配。
- 修改食物规则后执行 `/lipet reload` 即可生效；CraftEngine 自身重载物品后无需重启 LiPet，LiPet 会监听 CE 重载事件并刷新索引。
- 不符合等级限制时不会消耗食物。
- 没有产生回血、经验或属性点效果时不会消耗食物。
- 数据保存失败时会退还食物。

### CraftEngine 完整物品挂钩

所有物品配置都接受 Bukkit 材质、`minecraft:` 原版完整 ID 或 CraftEngine 完整 ID。CE ID 必须包含命名空间，例如 `mypack:pet_token`；LiPet 不会把不存在的 CE 物品替换成相同底材的原版物品。

可配置入口：

- `宠物类型/*.yml` 或旧 `pet-types.yml`：`foods.*.item-id` 或食物节点名。
- `capture.yml`：`balls.*.material` 捕捉球。
- `skills.yml`：`skills.*.book.material` 技能书。
- `items.yml`：`signal-stick.material` 宠物信号棒。
- `shop.yml`：`entries.*.icon.material` 宠物商品图标，以及 `item-entries.*.item.material` / `icon.material` 道具商品和图标。
- `gui.yml`：全部按钮、信息卡片、自定义按钮和填充物的 `material`。

示例：

```yaml
# capture.yml
balls:
  craftengine_example:
    enabled: false
    material: "yourpack:pet_capture_ball"
    name: "<gradient:#69F0AE:#40C4FF><bold>灵契捕捉球</bold></gradient>"
    base-chance: 0.25
    low-health-bonus: 0.50
    maximum-chance: 0.75

# skills.yml
skills:
  power:
    book:
      material: "mypack:power_skill_book"

# items.yml
signal-stick:
  material: "mypack:pet_signal_stick"

# shop.yml
item-entries:
  growth_food:
    item:
      material: "mypack:growth_food"
      amount: 8
    icon:
      material: "mypack:growth_food_icon"

# gui.yml
main:
  buttons:
    warehouse:
      material: "mypack:warehouse_icon"
```

LiPet 会先让 CraftEngine 构建真实物品，再追加自己的 PDC 标记、名称与 Lore，因此 CE 模型和组件数据会保留。商城生成失败会原路退款；GUI 图标失败会显示屏障与中文错误；捕捉球、技能书和信号棒发放失败会提示具体 CE ID。

管理员可执行：

```text
/lipet status
/lipet status mypack:growth_food
```

第二条指令会用 CraftEngine 生成目标物品，再反向读取其完整 ID。只有显示“全链路自检通过”才说明该 ID 在当前服务端可生成、可识别。CraftEngine 未安装或 API 不兼容时 LiPet 仍可启动，原版物品功能继续可用，状态页会显示中文原因。

CraftEngine 当前稳定 API 面向物品、方块和家具，不提供 LiPet 活体宠物模型控制接口。因此“CE 完全挂钩”在本插件中指全部物品入口；活体宠物外观仍使用原版模型或 ModelEngine / MEG，避免虚假声明不存在的 CE 生物模型能力。

## 11. 捕捉系统

随机初始属性与可直接使用的商店捕捉球配置见 [等级模型、随机属性与捕捉球商店](等级模型与捕捉球商店.md)。

管理员发放捕捉球：

```text
/lipet captureball <类型> [数量] [玩家]
```

玩家手持捕捉球右键野生生物触发捕捉。

捕捉配置在 `capture.yml`：

```yaml
ritual:
  enabled: true
  duration-ticks: 50
  pulse-interval-ticks: 10
  particle: "ENCHANT"
  sounds:
    start: "BLOCK_BEACON_ACTIVATE"
    pulse: "BLOCK_AMETHYST_BLOCK_CHIME"
    success: "ENTITY_PLAYER_LEVELUP"
    failure: "ENTITY_ITEM_BREAK"
```

兼容处理：

- 无效 Sound / Particle 不会禁用插件，会自动回退安全默认值。
- 捕捉到的幼体会作为固定外观保存并锁定年龄；收回、重启或区块重新载入后仍保持幼体和主人关系。
- 疣猪兽、猪灵等跨维度僵尸化实体会做宠物保护。
- 怕阳光生物作为宠物时会防止白天自动燃烧。
- 缺少原版攻击 AI 的宠物会使用统一追击与近战攻击兜底。
- 同一种宠物默认只能拥有一只。

## 12. 宠物商城

### 商城总开关

```yaml
# 商城总开关。true=开放宠物商城和宠物道具商店；false=全部关闭。
enabled: false
```

修改后执行 `/lipet reload` 即可热生效。关闭时：

- `/lipet shop` 与 `/lipet itemshop` 只提示商城未开放，不会打开 GUI。
- 主菜单和仓库中的商城导航不能进入商城。
- 玩家已经打开的宠物商城或道具商城也不能继续购买。
- 帮助菜单会隐藏两个商城指令，但原有商品配置不会被删除或覆盖。

旧版 `shop.yml` 缺少 `enabled` 时，升级后会自动补入默认值 `true` 和中文注释，不改变管理员已有商品与 Lore。

宠物商城配置在 `shop.yml` 的 `entries`。

```yaml
entries:
  wolf:
    enabled: true
    pet-type: "wolf"
    pet-name: "<gradient:#B0BEC5:#FFFFFF>小狼</gradient>"
    currency: "INTERNAL"
    price: 250.0
    permission: ""
```

支持货币：

- `INTERNAL`：LiPet 内置宠物币
- `VAULT`：Vault 经济
- `PLAYERPOINTS`：PlayerPoints 点券；商品价格必须是整数

`shop.yml` 的 `currency` 填写提供器 ID，玩家看到的名称统一在 `plugins/LiPet/config.yml` 设置。两个商城的 Lore 使用 `<currency>` 读取名称：

```yaml
# config.yml；将下列节点合并到已有 currency 节点，勿重复创建同名根节点。
currency:
  # LiPet 内置货币；商品支付 ID 仍为 INTERNAL。
  internal:
    # 非空单行文本，支持 MiniMessage；默认“宠物币”，成功重载后生效。
    display-name: "宠物币"
    # 首次建账余额，范围大于等于 0；只在启动时读取，改名重载不会修改余额。
    initial-balance: 1000.0
  # Vault 经济货币；需要已启用的 Vault 和经济插件，商品支付 ID 仍为 VAULT。
  vault:
    # 非空单行文本，支持 MiniMessage；默认“金币”，成功重载后生效。
    display-name: "金币"
  # PlayerPoints 点数；需要已启用的 PlayerPoints，商品支付 ID 仍为 PLAYERPOINTS。
  playerpoints:
    # 非空单行文本，支持 MiniMessage；默认“点券”，成功重载后生效。
    display-name: "点券"
```

例如商品 `currency: "PLAYERPOINTS"`、`price: 100.0` 默认显示为 `100.00 点券`。名称改为“积分”后显示 `100.00 积分`；`100.00` 数字格式、价格、余额与实际扣款规则不变。PlayerPoints 金额仍必须是整数，`100.0` 与 `100.00` 均表示整数 100，不能填写 `100.5`。

从旧版首次升级需要停服替换为 `LiPet-0.27.6-SNAPSHOT.jar` 并重启一次。之后只改名称时，执行 `/lipet reload`，等待成功提示，再关闭并重新打开 `/lipet shop`、`/lipet itemshop`。已经打开的界面不会自动重绘；自定义 Lore 若写死 `PlayerPoints` 或其他名称，应改用 `<currency>`。

只有本次重载成功（数据库无需切换 `NO_CHANGE` 或切换成功 `SWITCHED`）才发布三个新名称；校验失败、数据库切换失败或被拒绝的并发重载请求均保留已生效名称。旧配置仅补缺失节点/注释，不覆盖管理员已有名称或注释。该热重载范围不含 `server.id`、群组和 `currency.internal.initial-balance`，这些仍按启动时读取。

PlayerPoints 没有安装或未正常启用时，LiPet 仍会启动，使用 `PLAYERPOINTS` 的商品会显示货币不可用。安装后执行 `/lipet status`，独立状态行应显示 `PlayerPoints: ONLINE`。

如果玩家已经拥有该类型宠物，购买会被拒绝。

### 宠物币获取

`0.26.6+` 默认提供四条可持续获取路径：

- `/lipet daily`：每个自然日领取一次；主菜单中央默认也有领取按钮。
- 宠物战斗：由已召唤宠物完成有效击杀，按“固定值 + 目标最大生命倍率”结算。
- 宠物升级：喂养或战斗升级成功并保存后，按实际提升等级数结算。
- 成功捕捉：捕捉结果保存成功后结算。

所有金额、每日上限、排除实体、重置时区、音效和粒子位于 `rewards.yml`。示例：

```yaml
reset-time-zone: "Asia/Shanghai"
daily:
  enabled: true
  amount: 100.0
combat:
  enabled: true
  base-amount: 1.0
  maximum-health-multiplier: 0.10
  minimum-amount: 1.0
  maximum-amount: 20.0
  daily-limit: 300.0
level-up:
  enabled: true
  amount-per-level: 25.0
  daily-limit: 300.0
capture:
  enabled: true
  amount: 15.0
  daily-limit: 150.0
```

`daily-limit: 0` 表示对应玩法不限制每日额度。每日领取防重复与三种玩法额度存入 `lipet_currency_reward`，奖励记录和余额会在同一数据库事务中更新，因此同时点击、跨服并发、重启或执行数据库热切换都不会重复领取。群组服必须让所有子服使用相同的 `reset-time-zone`；存储层会拒绝比已记录日期更早的周期，避免服务器时钟或时区不一致被用于反复领奖。热切换只切换数据目标，不会自动迁移旧库记录，迁库前仍需完整导入数据库。

管理员需要校正内置余额时使用 `/lipet coin give|take|look`。该指令直接复用当前 SQLite / MySQL 货币仓库及数据库热切换屏障，不会绕开正在进行的存储切换。

## 13. 宠物道具商城

默认商品 `basic_capture_ball` 为 45 宠物币购买 3 个普通捕捉球。使用 `item.capture-ball: basic` 关联 `capture.yml`，发放带有真实捕捉标记的球，实物名称、材质和 Lore 由球配置提供；不需要为商品再填 `item.material/name/lore`。捕捉球无效或关闭时拒绝购买，扣款后生成失败则退款。

道具商城配置在 `shop.yml` 的 `item-entries`。

```yaml
item-entries:
  growth_food:
    enabled: true
    currency: "INTERNAL"
    price: 30.0
    item:
      material: "COOKED_BEEF"
      amount: 8
```

适合出售宠物食物、技能书材料或服务器自定义道具。

道具商城同样支持 `INTERNAL`、`VAULT` 与 `PLAYERPOINTS`；使用 PlayerPoints 时价格必须是整数。

## 14. 宠物背包

命令：

```text
/lipet inventory [宠物名称]
```

特性：

- 每只宠物独立背包。
- SQLite / MySQL 持久化。
- 关闭 GUI 时自动保存。
- 删除宠物时清理背包数据。
- `inventory.size: 0` 表示禁用。
- 背包大小必须是 9 的倍数，最大 54。
- 默认背包为 54 格（6 行）。`inventory.minimum-size: 54` 会让旧版 18 格配置以 54 格运行，同时保留管理员原来的类型配置值。

菜单音效位于 `gui.yml` 的 `sounds` 节点，可分别配置打开、任意 LiPet 菜单/宠物背包点击和关闭音效；设置 `sounds.enabled: false` 可全部关闭。

### GUI 完整自定义

`gui.yml` 中每个界面均可独立设置标题、1-6 行尺寸、动态内容槽位和空槽填充。主菜单、宠物管理和放生确认默认使用 5 行；全部菜单默认使用 `BORDER` 边框填充，中央不会再被玻璃板铺满。

`0.26.7+` 的默认 Lore 使用青蓝紫灵契主色，经济信息使用金色，危险操作使用红色，并按功能定位、详细说明和操作引导分层。商城商品 Lore 同样支持完全自定义，`<price>`、`<currency>`、`<amount>` 等变量均会保留。升级时只有与旧版默认文本逐行完全一致的 Lore 才会自动换成新样式；管理员自定义过任意一行都会原样保留。

填充模式：

- `ALL`：填满全部空槽。
- `BORDER`：只填菜单四周边框。
- `NONE`：不放置任何填充物。
- `CUSTOM`：只填 `filler.slots` 指定的槽位。

所有内置按钮和 `custom-items` 都支持：

- `enabled`：显示或隐藏。
- `slot`：兼容旧配置的单个按钮槽位。
- `slots`：多槽位列表；非空时覆盖 `slot`，同一图标、变量和动作会复制到列表中的全部槽位，重复数字自动去重。写成 `[]` 时继续使用 `slot`。
- `material`、`amount`：材质与数量。
- `custom-model-data`、`item-model`：资源包模型标识。
- `glow`、`hide-tooltip`：附魔光效与提示隐藏。
- `name`、`lore`：MiniMessage 名称与描述。
- `action`：任意点击的默认动作。
- `actions.LEFT`、`RIGHT`、`SHIFT_LEFT`、`SHIFT_RIGHT`、`MIDDLE`、`DROP`：按点击方式覆盖动作。

常用动作：

```yaml
slot: 11
slots: [10, 11, 12]                    # 三个位置执行同一功能
action: "nav:warehouse"                # 打开插件内菜单
action: "command:balance"              # 执行 /lipet balance
action: "player-command:spawn"          # 玩家执行 /spawn
action: "console-command:give <player> apple 1"
action: "store"                         # 收回当前宠物
action: "close"                         # 关闭菜单
```

变量会同时应用于 GUI 标题、填充物、名称、Lore 和点击动作：

- 全部界面：`<player>`、`<player_name>`、`<player_uuid>`。
- 宠物商城：`<entry_id>`、`<pet_type>`、`<pet_type_id>`、`<pet_name>`、`<price>`、`<currency>`、`<permission>`。
- 道具商城：`<entry_id>`、`<item_type>`、`<item_name>`、`<amount>`、`<price>`、`<currency>`、`<permission>`。
- 宠物界面：`<owner_name>`、`<owner_id>`、`<pet_id>`、`<entity_id>`、`<pet_name>`、`<pet_type>`、`<pet_type_id>`、`<pet_state>`、`<pet_state_key>`、等级、经验、四维属性和全部衍生属性变量。
- 属性按钮：额外提供 `<attribute>`、`<attribute_name>`、`<attribute_key>`、`<value>`、`<attribute_value>`、`<points>`。显示文本中的 `<attribute>` 为中文；旧版动作中的 `<attribute>` 仍按英文键替换，推荐新动作明确使用 `<attribute_key>`。

仓库默认点击动作：

- `warehouse.pet-item.actions.LEFT`：左键召唤所选宠物伙伴。
- `warehouse.pet-item.actions.SHIFT_LEFT`：潜行左键收回当前已召唤宠物。
- `warehouse.pet-item.actions.RIGHT`：查看属性与管理。
- `warehouse.pet-item.actions.SHIFT_RIGHT`：潜行右键打开永久放生二次确认。

四项都可自由更换或写成空字符串禁用。`SHIFT_RIGHT` 只打开确认页，确认按钮才会真正删除宠物数据。

旧版紧凑默认布局会在升级时迁移到 5 行宽松布局；只要管理员改动过旧版行数或按钮槽位，就视为自定义布局并保留原值。其他新增节点只补缺项，不覆盖已有配置和值或注释。

## 15. 改名

命令：

```text
/lipet rename [宠物名称]
```

流程：

1. 执行命令或在管理 GUI 点击改名。
2. 插件提示进入聊天框输入模式。
3. 玩家直接在聊天框输入新名称。
4. 输入 `取消` 或 `cancel` 可退出。
5. 60 秒未输入会自动超时。

## 16. 信号棒

发放：

```text
/lipet signalstick [数量] [玩家]
```

使用方式：

- 右键：执行当前模式。
- 潜行 + 右键：切换模式。
- 支持右键空气、方块和宠物实体。

当前模式：

- 坐下 / 跟随
- 收回宠物
- 骑乘宠物
- 打开宠物背包

信号棒使用 PDC 标记识别，不依赖物品显示名。

## 17. 技能书

发放：

```text
/lipet skillbook <技能> [数量] [玩家]
```

默认技能：

- `power`：攻击强化
- `vitality`：生命强化
- `agility`：速度强化

玩家右键自己的已召唤宠物学习技能。技能达到最高等级后不会继续消耗技能书。

## 18. 骑乘

方式：

- 空手右键自己的已召唤宠物。
- 使用 `/lipet mount`。
- 使用信号棒骑乘模式。

骑乘参数在对应的宠物类型 YML 中；旧 `pet-types.yml` 写法继续支持：

```yaml
behavior:
  riding-speed: 0.35
  # 按住疾跑键时的倍率，范围 1.0-3.0。
  riding-sprint-multiplier: 1.5
  jump-velocity: 0.5
```

末影龙的翅膀、头部和身体属于独立交互部件；LiPet 会循环把这些部件解析回龙本体，因此普通右键骑乘和潜行右键管理都可正常使用。`0.26.17+` 会在召唤、区块恢复、跟随与骑乘时把末影龙稳定在 `HOVER` 阶段，避免原版阶段 AI 飞向末地传送门。飞行宠物会根据骑手视角俯仰升降，跳跃键可主动爬升。

`0.27.7` 起，骑乘控制上马即启动，每 tick 读取骑手当前视角与按键。即使按键没有改变，原地转头、按住前进键持续移动和飞行时改变俯仰也会更新控制；无需松开再按前进键。下马、玩家退出或骑乘对象失效时清理对应任务。

`0.27.9` 起，骑乘还会读取疾跑键。按住疾跑时以 `riding-speed × riding-sprint-multiplier` 计算移动；飞行宠物的水平速度和按视角俯仰产生的升降速度一起加速。默认倍率为 `1.5`；设为 `1.0` 可关闭加速效果。

骑乘期间临时关闭载体 `aware`，暂停可能把朝向拉回或清零俯仰的原版 LookControl / MoveControl；不会关闭 `hasAI`，不会切换坐下状态，也不取消实体物理与动作。下马、退出、控制异常或换骑后，在实体区域恢复此前的感知状态，并检查当前骑乘关系，避免迟到的旧恢复任务影响新骑乘。跟随、战斗和延迟回传也在执行前检查包含模型嵌套座位的骑乘关系，仍在骑乘时不抢方向或回传。

启用 `nameplate.hide-while-ridden` 时，骑手与其他玩家都不显示双行名牌，载体的原版名称也临时清空，避免准星仍显示名称。下马或将隐藏开关设为 `false` 并重载后恢复；宠物档案名不变，普通骑乘隐藏不删除重建 TextDisplay。双行名牌关闭或刷新失败时的单行回退也采用相同隐藏规则。完整配置见 [骑乘名牌与视角转向更新](更新日志-2026-09-01-骑乘名牌与视角转向.md)。

## 19. PlaceholderAPI

可用变量：

```text
%lipet_active_name%
%lipet_active_id%
%lipet_active_owner_id%
%lipet_active_owner_name%
%lipet_active_type%
%lipet_active_type_id%
%lipet_active_state%
%lipet_active_state_key%
%lipet_active_level%
%lipet_active_max_level%
%lipet_active_experience%
%lipet_active_required_experience%
%lipet_active_experience_percent%
%lipet_active_attribute_points%
%lipet_active_critical_chance%
%lipet_active_critical_damage%
%lipet_active_dodge%
%lipet_active_knockback_resistance%
%lipet_active_life_steal%
%lipet_active_strength%
%lipet_active_vitality%
%lipet_active_defense%
%lipet_active_agility%
%lipet_active_health%
%lipet_active_max_health%
%lipet_active_health_percent%
%lipet_active_damage%
%lipet_active_speed%
%lipet_active_riding_speed%
%lipet_active_resistance%
%lipet_active_regeneration%
%lipet_attribute_strength_name%
%lipet_attribute_vitality_name%
%lipet_attribute_defense_name%
%lipet_attribute_agility_name%
%lipet_pet_count%
%lipet_server_id%
```

`active_state` 返回 `messages.yml` 中配置的中文状态；`active_state_key` 返回 `ACTIVE` 等原始键。四个 `attribute_*_name` 变量返回可配置中文属性名称。`active_speed` 包含基础速度、敏捷和速度技能加成，并最多保留三位小数。没有活动宠物时，数值变量稳定返回 `0` / `0.0`，文本变量返回空文本，不会把未解析变量留在计分板上。

PlaceholderAPI 是软依赖。未安装时 LiPet 会跳过 PAPI Hook，不影响主体功能。
Paper 26.2 建议搭配 [PlaceholderAPI `2.12.3+`](https://github.com/PlaceholderAPI/PlaceholderAPI/releases/tag/2.12.3)；LiPet 不调用其版本专用内部接口。

## 20. 兼容说明

### 宠物 AI 与坐下状态

宠物每次召唤都会恢复原版 AI、Mob 感知和站立状态。非骑乘宠物的行为循环会修复被外部模型插件或旧实体数据意外关闭的 AI；玩家主动切换为“坐下”时暂停，切回“跟随”时恢复。骑乘期间则保留 `hasAI`，临时关闭 `aware` 以停用原版方向控制，避免与骑手输入竞争；下马后恢复原感知状态。

狼、猫等可驯服实体在收回前会先解除原版主人、驯服和坐下状态，再移除世界实体，避免原版驯服数据把实体继续保留下来。鹦鹉使用 LiPet 自己的主人标记，不再绑定原版主人，因此新召唤的鹦鹉不会自动飞到玩家肩上。

对于升级前已经停留在肩上的鹦鹉，`/lipet store`、管理菜单收回、信号棒收回和玩家退出流程都会同时检查左右肩。肩部数据会在发起保存时先安全摘除；若数据库保存失败，插件会把原肩部实体恢复，保存成功后才彻底清理。因此不会再出现聊天提示“已收回”但肩上仍有鹦鹉的情况。

跟随逻辑每 10 tick 更新一次：宠物超过 `follow-distance` 后启动原生寻路，进入 `stop-distance` 后停止；两者之间保持已有路径，避免来回启停。超过 `teleport-distance`，或原生寻路连续四次拒绝路径时，只有主人已落地且没有飞行或滑翔才会安全回传；主人仍在空中时宠物会等待。

召唤时会为宠物安装高优先级移动与目标控制 Goal，原版闲逛、逃跑和自动仇恨不能再反向覆盖插件路径。全部地面宠物都由服务端原生 Pathfinder 绕开方块：跟随每 10 tick 更新落点，战斗每 10 tick 刷新路径、每 2 tick 检查攻击距离；路径不可达时会停止旧路径，不会把宠物直线拖过障碍。飞行类或运行端确实没有寻路接口时才使用平滑速度兜底，并同步身体朝向；实际伤害仍由统一属性与攻击冷却计算。

### 文本样式

LiPet 会在最终写入前统一移除聊天消息、ActionBar、悬浮文本、GUI 标题与图标、捕捉球、技能书、信号棒和宠物名称的斜体装饰。根组件、嵌套组件和悬浮提示都会递归处理；即使旧配置使用 `&o` 或斜体标签，显示时也会强制转换为非斜体。

双行宠物名牌同样通过统一 MiniMessage 组件生成，宠物名和“主人”行都不会使用斜体。

### Residence、领地生物生成与局部天气

召唤时，LiPet 使用 Bukkit `CUSTOM` 生成原因，并在生成事件前把宠物 UUID 与类型写入实体 PDC。`PetSpawnProtectionListener` 在 `HIGHEST` 优先级运行，仅当事件已取消且实体带有 LiPet 宠物标记时才撤销取消状态，因此不会放行野生生物、刷怪笼生物或其他插件实体。

Residence 当前会在较低优先级检查 `animals`、`canimals`、`monsters`、`cmonsters` 与 `nomobs` 等生成限制；LiPet 的专属放行发生在这些检查之后。即使某个未知保护插件在更晚阶段再次取消，LiPet 也会检测返回实体是否真实有效，并在失败时清理实体、停止后续初始化且不创建名牌。

`softdepend` 中声明 Residence 只用于稳定加载顺序，Residence 没有安装时 LiPet 仍可独立运行。该兼容不会修改领地 Flag，也不会给普通生物开放生成权限。

Residence 的 `sun=true` 通过玩家专属天气把领地显示为晴天，并不会改变世界实际风暴。`0.27.18+` 会在 LiPet 烈焰人收到原版水敏感伤害时查询其当前位置：世界确实有风暴、实体未在水或气泡柱中，并且 Residence 在该位置有效继承 `sun=true` 时，判定为局部晴天下不应发生的淋雨伤害并取消。

该处理只作用于带 LiPet PDC 标记的烈焰人。普通烈焰人、未设置晴天的领地、`rain=true`、领地外和真实泡水伤害都不改变。Residence 未安装、未启用或公开 API 不兼容时，LiPet 会保留原版伤害并只记录一次中文警告，不会因此禁用主体插件。

### Paper 26.1.2 / 26.2

LiPet 当前使用 Java 21 字节码构建，运行端推荐 Java 25。调度逻辑封装在 `PlatformScheduler`，业务层不直接散落调度调用。

活动宠物实体由加载索引维护。SQLite / MySQL 完成回调只读取线程安全状态，再把生命读取、属性刷新、召回和移除交给实体调度器；不会再从数据库线程调用区块实体查询。

`0.27.4-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 165 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + CraftEngine 26.8 + PlayerPoints 3.3.5 上使用真实 0.27.3 配置启动；升级保留原捕捉球材料和熟牛肉成长数值，只补入缺失的启用开关与默认关闭案例。将两个案例启用并统一改为 `default:topaz_pickaxe` 后，CraftEngine 索引 109 个物品，运行探针确认 CE 身份没有退化为原版金镐底材，并同时命中宠物食物和捕捉球配置，随后安全关闭。成品大小为 `790853` 字节，SHA-256 为 `3E080ACF098093C5AC09A1B2EE0390E692FFDA36F32EE4208B87A7C4C844DF03`；当前没有在线客户端，实际喂食与右键捕捉画面仍需目标测试服确认。

`0.27.3-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 160 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实 0.27.2 多 YML 配置启动：旧 `宠物类型/` 成功迁移为 `宠物/`，首次只生成 77 个缺失文件，最终为 87 种默认可捕捉原版生物各保留一份独立 YML，并直接载入原始 MCPets 龙骑文件。复制前后龙骑文件 SHA-256 同为 `3171CEC007C3B88C6234B5529F02F07B4F7B31347FF78B2EE55A5E8DF9A3EBD9`，证明加载未改写；热重载成功，第二次启动未重复生成，旧 ID 探针继续全部通过并安全关闭。MythicMobs 生成反射同时覆盖 MCPets 当前使用的 APIHelper 路径和旧 MobManager 后备路径。当前环境没有真实 MythicMobs Jar 和在线客户端，因此龙骑 Mob 的实际生成、模型与骑乘画面仍需目标测试服确认。成品大小为 `787007` 字节，SHA-256 为 `C2D0C846440CC81906A3FB719551E69EDE02DCA913045B5B99542ACCB83C71DF`。

`0.27.2-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 151 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实 0.27.1 旧配置启动；首次升级只新增缺失的 8 个商城宠物文件，原狼、猫文件 SHA-256 前后完全一致。运行时探针确认 `bat`、`minecraft:bat` 与 `fox` 均可解析到对应 `vanilla_` 类型，第二次启动没有重复生成文件；`/lipet reload` 成功并安全关闭。当前没有在线客户端，实际点击召唤的最终画面仍需目标测试服确认。成品大小为 `761171` 字节，SHA-256 为 `B4F035367B1242193775A5F43BCFF8A21909F09C4F41C39A553B56976288F859`。

`0.27.1-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 148 项自动测试通过，失败、错误和跳过均为 0。新增测试覆盖失败施放退避、冷却期间跳过随机抽取、两种定时触发合并扫描、静态 APIHelper、`double power` 和历史官方状态语言迁移。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实旧配置启动，并在隔离配置中启用一条 MM 规则；旧 `status-mythicmobs` 自动补入统计变量，`/lipet status` 显示 PlayerPoints `ONLINE`、MythicMobs `OFFLINE`、技能类型 `1`、规则 `1`，热重载后保持一致并安全关闭，LiPet 无报错。当前环境没有真实 MythicMobs Jar，因此 MM 技能在实际战斗中的最终施放仍需在安装 MM 的目标测试服确认。成品大小为 `750989` 字节，SHA-256 为 `B4630BFD0F23FD9CA0003B057269DED973ADD6E5C2743F6785523C45BA671B27`。

`0.27.0-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 144 项自动测试通过，失败、错误和跳过均为 0。测试覆盖等级锁、解锁后施放、概率、冷却、`power` 等级成长、MythicMobs 5.x 详细调用参数、旧宠物类型配置补全和非法值拒绝。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实 0.26.26 多 YML 配置启动，狼、猫文件均自动补入完整中文注释和默认关闭示例；`/lipet reload` 成功，`/lipet status` 显示 PlayerPoints `ONLINE`、MythicMobs `OFFLINE`，未安装 MM 时 LiPet 无报错并安全关闭。当前环境没有真实 MythicMobs Jar，因此 MM 技能在实际战斗中的最终施放仍需在安装 MM 的目标测试服确认。成品大小为 `748702` 字节，SHA-256 为 `D2090041BA7C187A86C8C627F2DF9D499723795ACFF2FC53EF4DD664D89D09E2`。

`0.26.26-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 137 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实 0.26.25 `gui.yml` 启动，缺失的 `info.navigation.manage` 按钮、完整中文注释及 `manage-return:<entity_id>` 动作成功自动补全，原仓库返回按钮保持不变；`/lipet reload` 成功，`/lipet status` 显示 PlayerPoints `ONLINE`，随后安全关闭，LiPet 自身日志无报错。当前没有在线客户端，管理页到属性/成长面板的实际点击和最终视觉仍需目标测试服确认。成品大小为 `729546` 字节，SHA-256 为 `C4C3EAF41D974E2296B5FF829393C4C7BFA4EB578C5541A82532306C8B1F5650`。

`0.26.25-SNAPSHOT` 默认构建与 Paper 26.2 Profile 各 132 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上使用真实 0.26.24 默认 `gui.yml` 启动，仓库 Lore 自动迁移为绿色潜行操作、警告前空行和红色永久删除提示；`/lipet reload` 成功，`/lipet status` 显示 PlayerPoints `ONLINE`，随后安全关闭，LiPet 自身日志无报错。当前没有在线客户端，仓库最终视觉和四种实际点击仍需目标测试服确认。成品大小为 `726864` 字节，SHA-256 为 `41F82C483C8375CDFD7B71A1A8AC1E2F0F92ED15D1664DD8068B8D9900661769`。

`0.26.24-SNAPSHOT` 共 131 项自动测试通过，失败、错误和跳过均为 0。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上完成两轮真实验证：旧服的 `pet-types.yml` 狼、猫配置被拆到 `宠物类型/wolf.yml`、`cat.yml`，全局旧节点清空，仓库 Lore、动作和官方注释迁移正确；全新安装则生成中文目录及 `狼.yml`、`猫.yml` 两个文件。两轮 `/lipet reload` 均成功，`/lipet status` 显示 PlayerPoints `ONLINE`，随后安全关闭，LiPet 自身日志无报错。当前没有在线客户端，仓库最终视觉和四种实际点击仍需目标测试服确认。成品大小为 `726809` 字节，SHA-256 为 `F57634F05DD8E1C68AD0A405289153DA706F17F93CB94810915B9E386B7169DD`。

`0.26.23-SNAPSHOT` 的 Paper 26.2 Profile 共 121 项自动测试通过。测试覆盖官方旧“宠物仓库”按钮名称与完整旧 Lore 的精确迁移，以及服主自定义名称和 Lore 保护；最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上将 0.26.22 真实旧 `gui.yml` 迁移为“我的宠物”和“➥ 点击打开宠物列表”，`/lipet status` 显示 PlayerPoints `ONLINE`，随后安全关闭。LiPet 自身日志无报错；当前没有在线客户端，菜单最终视觉仍需目标测试服确认。成品大小为 `711076` 字节，SHA-256 为 `F220C0EE7900372D4EEC25E14A66F5D0E042D90A8A42D783A88357565A850686`。

`0.26.22-SNAPSHOT` 的 Paper 26.2 Profile 共 119 项自动测试通过。测试覆盖已有活动宠物的专用 `pet-already-active` 映射、历次官方默认文本、Bukkit 自动折行后的旧值和自定义语言保护；最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 上将 0.26.21 真实旧配置迁移为“已达最大召唤数量，请将已召唤的休息后再召唤！”，并完成状态检查与安全关闭。当前没有在线客户端，聊天框最终显示需目标测试服确认。成品 SHA-256 为 `7AA16300F065436B0532A9AFBC9646F41E147D8D4DDC180ABBE6664A8542FD91`。

`0.26.20-SNAPSHOT` 的 Paper 26.2 Profile 共 117 项自动测试通过。`CurrencyRegistryTest` 验证商城配置 `INTERNAL` 会解析为 `currency.internal.display-name` 的“宠物币”，旧配置中同时保留 `currency: "INTERNAL"` 与自定义显示名。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 完成真实启动、挂钩、状态检查和安全关闭；当前没有在线客户端，商城 Lore 的最终客户端视觉仍需目标测试服确认。成品 SHA-256 为 `EC3A5D1A51D5FD9A7D436E1CCE0A11CA03C73F92EC0E4FF01A964B1375459077`。

`0.26.19-SNAPSHOT` 的 Paper 26.2 Profile 共 116 项自动测试通过。最终成品在 Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 完成真实启动，LiPet 日志确认 PlayerPoints API 挂钩成功，`/lipet status` 显示 `ONLINE`；宠物币榜完成真实 SQLite 余额排序，宠物等级榜显示离线 UUID 主人的宠物名、等级和经验，随后两插件安全关闭。当前没有在线客户端，商城实际点击扣除 PlayerPoints 仍需目标测试服最终确认。成品 SHA-256 为 `210DEC705F16F3FD2F5E9B4B0C65A3BD68A35C8C79F521466026A8DA8908BF15`。

`0.26.18-SNAPSHOT` 的默认兼容构建与 Paper 26.2 Profile 各有 111 项自动测试通过。最终成品在 Paper 26.2 Build 111 + Java 25 完成启动、旧 `gui.yml` 四键操作与中文注释迁移、`lookcoin` / `takecoin` 和分组 `coin give` 的真实 SQLite 增减回环，并安全关闭。当前没有在线客户端，仓库实际点击与视觉反馈仍需目标服务器最终确认。成品 SHA-256 为 `C88640A9866234E6EF6449D7D39848580AAF8DAC12BD7D8B5E6E4F4929EDA34F`。

`0.26.17-SNAPSHOT` 的默认兼容构建与 Paper 26.2 Profile 各有 106 项自动测试通过。Paper 26.2 Build 111 + Java 25 真实启动后，控制台 UUID 账户依次完成 `look 1000`、`give 250`、`look 1250`、`take 400`、`look 850`；再扣除 `900` 被余额不足保护拒绝且余额保持 `850`，随后安全关闭。末影龙 HOVER 阶段有自动测试覆盖；名牌第一人称显示和末影龙实际骑乘仍需在线玩家最终确认。

`0.26.16-SNAPSHOT` 共 103 项自动测试通过；同一 Java 21 成品 Jar 已在 Paper 26.2 Build 111 + Java 25 完成真实启动、SQLite 依赖加载、`/lipet status`、描述符版本检查和安全关闭。

`0.26.14-SNAPSHOT` 的默认兼容构建与 Paper 26.2 Profile 各有 102 项自动测试通过。测试覆盖原版/CE/AIR 物品 ID、CE 反射 API、生成失败分类、全部配置入口和旧配置安全补全；同一成品已搭配 CraftEngine 26.8.1 在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 加载 109 个 CE 物品，完成 `default:topaz_pickaxe` 生成 → 识别自检、CE 配置重载、LiPet 热重载和安全关闭。完整记录见 [2026-08-28 CE 更新日志](更新日志-2026-08-28-CE.md)。

`0.26.13-SNAPSHOT` 的默认兼容构建与 Paper 26.2 Profile 各有 99 项自动测试通过。新增测试覆盖多槽位解析、旧 `slot` 回退、重复槽位去重、旧配置安全补全、管理员注释保留及全部 GUI 类型点击反馈；同一成品已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成配置迁移、热重载和安全关闭验证。完整记录见 [2026-08-28 UI 更新日志](更新日志-2026-08-28-UI.md)。

`0.26.12-SNAPSHOT` 的默认兼容构建与 Paper 26.2 Profile 各有 91 项自动测试通过。新增测试覆盖单人及全服宠物发放、同类型跳过、按类型/全部收走、重叠指令串行化、类型与名称冲突保护、失败后继续、UUID 去重、离线玩家解析、Residence 优先级放行边界，以及 `plugin.yml` 权限和中文消息资源。

同一成品已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成真实启动、`/lipet status`、中文帮助、离线 UUID 宠物发放/收回和安全关闭验证；Paper 26.2 还通过了连续发放两只宠物后重叠执行“按类型收回”与“全部收回”的串行探针。详细结果和成品哈希记录在 [2026-08-28 更新日志](更新日志-2026-08-28.md)。

`0.26.10-SNAPSHOT` 移除了 `/lp` 别名；73 项自动测试全部通过，资源描述符回归测试会确保插件只注册 `lipet` 一个主指令且不存在别名节点。Paper 26.2 Build 111 实际启动验证了 `/lipet status` 与 `/lipet:lipet status` 正常，`/lp` 与 `/lipet:lp` 均返回未知指令，并完成安全关闭。

`0.26.9-SNAPSHOT` 同一通用 Jar 已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 搭配 CraftEngine 26.8-SNAPSHOT 完成真实运行探针：CE 物品 `default:topaz_pickaxe` 被识别为完整自定义 ID，同底材原版物品独立识别为 `minecraft:golden_pickaxe`，并成功命中 `pet-types.yml` 食物规则；72 项自动测试全部通过。

`0.26.8-SNAPSHOT` 同一通用 Jar 已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成真实启动及 ModelEngine R4.1.0 更新构建运行探针；真实 `magecat` 模型验证了原版载体不可见、重复挂载只有一份模型、卸载后载体恢复可见，68 项自动测试全部通过。`0.26.7-SNAPSHOT` 另已验证旧版 GUI/商城 Lore 自动迁移和优雅关服，管理员自定义 Lore 保持不变。

`0.26.6-SNAPSHOT` 同一通用 Jar 已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成真实启动、`rewards.yml` 加载、奖励表建表、每日指令注册、PlaceholderAPI 2.12.3 挂钩和优雅关服检查；SQLite 奖励事务另行验证了首次到账、同日防重、次日重置和余额同步，58 项自动测试全部通过。`0.26.5-SNAPSHOT` 已验证旧 `messages.yml` 中文名称节点增量补全和中文变量解析。`0.26.4-SNAPSHOT` 的 TextDisplay 双行主人名牌实体测试已验证实际生成、玩家名文本、重命名复用、透明背景和收回即时删除。`0.26.3-SNAPSHOT` 已验证 SQLite 在线热切换、`/lipet status` 实际目标检查，以及无效 MySQL 候选连接失败后继续使用原 SQLite。当前测试环境没有可用 MySQL 服务，因此 MySQL 到 MySQL 的成功在线切换仍应先在测试服验证后再用于生产服。

默认交付包使用最低兼容 API 构建，以便同一 Jar 继续运行于 Paper 26.1.2。项目提供锁定 `26.2.build.111-stable` 的 26.2 编译检查 profile：

```text
mvn -Ppaper-26.2 clean package
```

`plugin.yml` 的 `api-version` 刻意保留为 `1.21.11`，它表示最低可加载版本，并不表示只支持 1.21.11；改成 `26.2` 会让 Paper 26.1.2 拒绝加载同一 Jar。

捕捉仪式的音效和粒子使用 Bukkit Registry 解析。配置既可继续填写 `ENTITY_PLAYER_LEVELUP`、`ENCHANT`，也可填写 `minecraft:entity.player.levelup`、`minecraft:enchant`；不存在的键会记录中文警告并回退到安全默认值，不会因此禁用插件。

`0.25.7` 起新写入的宠物背包使用 Bukkit `ItemStack` 字节格式。旧版本保存的对象流数据仍可读取，并会在宠物背包下次保存时自然迁移，不需要手工转换数据库。

### 外部依赖

Vault、PlaceholderAPI、ModelEngine、CraftEngine 等为软依赖或 provided 依赖，不会打入 LiPet Jar。CraftEngine 挂钩通过其官方稳定 `bukkit.api` 物品接口完成 `getCustomItemId`、`byId`、`loadedItems` 与 `buildBukkitItem` 调用，并监听 `CraftEngineReloadEvent` 刷新索引；业务代码不链接或打包 CE 实现类。

SQLite / MySQL 驱动由运行时依赖管理器按配置下载到插件数据目录，不直接塞进成品 Jar。

## 21. 常见问题

### 捕捉的幼体长大后不认主

升级到 `0.27.16-SNAPSHOT` 并完整重启。旧版虽然把 `adult=false` 保存进宠物外观，却没有调用原版年龄锁，幼体仍会自然长大，导致世界实体状态与数据库外观不一致。新版会锁定捕捉到的幼体，并在区块恢复时重新校正；成年宠物不会被锁成幼体。

Paper 26.2 Build 111 的狼、猫、马边界探针确认原版自然成年不会更换 UUID，也不会清除 PDC、驯服状态或主人 UUID，因此不需要迁移数据库或重建宠物。旧版已经变成成年的捕捉幼体，只要停服替换 Jar 后重新召唤一次，就会按原档案恢复为幼体并保持。

### 召唤偶发完全无反应，重载也没用

`0.27.8` 修复了已受理的实体任务在玩家退出或实体移除时没有结束 Future 的问题。旧版同一玩家后续召唤、收回等操作会继续等候未完成的前序任务；`/lipet reload` 只重载配置，不会替换玩家操作队列，因此不能清除这类卡住状态。请停服备份后换用新 Jar 并重启，不要删除宠物数据库或反复点击召唤。

新版未完成超过 100 tick 时仅提示一次“正在召唤”，不会为显示提示而取消原操作或提前解除状态锁。失败会有对应反馈；如果提示本身解析或发送异常，后台会记录玩家 UUID、请求宠物与原因。看到“召唤结果提示异常”应先检查实际宠物状态，不能据此认定召唤没有成功。

可在 `plugins/LiPet/messages.yml` 自定义提示；将下面字段合并到已有根节点，不覆盖整份消息文件：

```yaml
# 未完成超过 100 tick（正常 TPS 下约 5 秒）时只提示一次；空字符串 "" 关闭此提示。
# 不会中断召唤、释放状态锁或重新创建宠物。
pet-call-pending: "<yellow>正在召唤宠物，请稍候，无需重复操作。</yellow>"
# 表示召唤业务失败，保留原消息节点，支持自定义 MiniMessage 文本。
pet-call-failed: "<red>宠物召唤失败，请稍后重试。"
# 表示结果提示处理异常，宠物可能已经生成；先查看实际状态及后台日志。
pet-call-feedback-failed: "<yellow>召唤结果提示异常，请先检查宠物状态，并联系管理员查看后台日志。</yellow>"
```

旧配置只补缺失节点和注释，已有文本及空值保留。完成换 Jar 和重启后，修改提示文本可执行 `/lipet reload`。持续等待时请收集实际加载版本、宠物类型、玩家 UUID、操作时间及相邻日志；详见 [召唤无响应修复](更新日志-2026-09-01-召唤无响应修复.md)。

### 重启后宠物不见了

检查 `storage.type`。当前推荐：

```yaml
storage:
  type: "SQLITE"
```

旧版 `MEMORY` 配置会自动迁移为 SQLite。生产服请备份 `plugins/LiPet/lipet.db` 或 MySQL 数据库。

### 插件显示 plugin is disabled

不要只看 `/lipet` 命令报错。需要查看服务器启动时最早的 LiPet 错误堆栈。

常见原因：

- 配置格式错误。
- 材质或实体类型拼错。
- 数据库连接失败。
- 运行时依赖无法下载。

### No sound found with the name UI_TOAST_CHALLENGE

这是旧配置里的无效音效名。`0.25.3+` 已修复：插件会自动回退为 `ENTITY_PLAYER_LEVELUP`，不再因此禁用。

### Thread LiPet-SQLite failed main thread check

这是 `0.26.0` 的数据库回调错误。升级到 `0.26.1+` 后，属性加点、喂养、召回和收回不再从 SQLite 线程查询区块实体。若升级后仍看到该堆栈，请先确认服务器实际加载的 Jar 版本不是旧版。

### 提示已收回，但可驯服宠物仍在

这是旧版本把狼、猫、鹦鹉等实体同时交给原版驯服系统管理造成的生命周期冲突。升级到 `0.26.2+` 后，收回会先清理原版驯服/坐下状态，并额外处理左右肩实体。升级后首次召回旧鹦鹉时会自动解除原版肩部行为。

### 宠物背包没有保存

背包在关闭界面时保存。如果服务器崩溃，最后一次打开中的背包可能来不及保存。生产服建议定期备份数据库。

### 信号棒没有反应

确认：

- 物品由 `/lipet signalstick` 发放。
- 玩家当前有已召唤宠物。
- 没有其他插件取消右键交互事件。

### 商城购买失败

检查：

- 玩家余额是否足够。
- `shop.yml` 中的 `pet-type` 是否存在且启用。
- 玩家是否已经拥有该类型宠物。
- Vault 模式下是否安装了 Vault 和经济插件。

### 宠物币只能消费，无法获取

升级到 `0.26.6+` 后检查：

- `rewards.yml` 顶层 `enabled` 以及对应玩法的 `enabled` 是否为 `true`。
- 玩家是否拥有 `lipet.command.daily` 权限。
- 战斗必须由当前召唤的宠物完成最后一击；玩家自己击杀不会获得宠物战斗奖励。
- 对应玩法是否已经达到 `daily-limit`；每日额度按 `reset-time-zone` 的零点重置。
- 数据库异常时查看控制台中的 `LiPet-Rewards` 错误，并确认当前 Jar 确实为新版本。

### 领地中召唤后只有名字，没有宠物实体

升级到 `0.26.12+`。新版本会在生成事件前标记实体，并在 Residence 检查后只放行 LiPet 宠物；实体没有真实生成成功时不会继续创建名牌。若升级后仍失败：

- 确认服务器只保留一个当前版本 Jar，执行 `/lipet status` 核对版本。
- 检查是否还有另一个保护插件在 `HIGHEST` 之后再次取消生成。
- 查看控制台是否出现“宠物实体生成被保护插件拦截”，并将完整事件监听器列表与日志交给维护者。
- 不建议全局打开领地怪物生成；LiPet 的专属放行不需要修改 Residence Flag。

### Residence 已设置晴天，LiPet 烈焰人仍被雨淋伤

升级到 `0.27.18+` 并完整重启。确认领地 Flag 是 `sun=true`，而不是仅靠客户端、季节或其他天气插件显示晴天。新版会按烈焰人当前位置读取 Residence 的有效 `sun` 标志；如果烈焰人站在水或气泡柱里，仍会保留原版伤害。控制台未出现“已挂钩 Residence”时，请检查 Residence 是否先于 LiPet 正常启用，以及是否只保留一份当前 LiPet Jar。

## 22. 升级建议

升级前：

1. 停服。
2. 备份 `plugins/LiPet/`。
3. 备份 SQLite 或 MySQL 数据。
4. 替换 Jar。
5. 启动服务器。
6. 执行 `/lipet status`。
7. 检查控制台是否有 LiPet 警告或错误。

LiPet 会补全新增配置节点，但不会覆盖已有自定义配置值。

升级到 `0.27.18` 不新增配置。停服备份并替换 Jar 后完整启动；控制台出现“已挂钩 Residence，领地局部晴天会保护 LiPet 烈焰人”即表示天气接口可用。属性加点界面修复也属于代码更新，`/lipet reload` 无法替代换包。

升级到 `0.27.16` 不新增配置。停服备份后替换 Jar 并完整启动；旧版已长大的捕捉幼体在重新召唤或区块恢复时会按照数据库中的幼体外观重新校正并锁龄。不要删除宠物数据库，也不要用旧 Jar 的 `/lipet reload` 代替换包。

若看到 `PetNameplateVisibility.hasPlayerPassenger`、`getPassengers` 和 `Accessing entity state off owning region's thread` 同时出现，说明仍在运行 `0.27.9` 等旧 Jar。请停服备份并替换为 `0.27.12` 后完整启动；`/lipet reload` 只能重读配置，不能替换名牌调度代码。本次升级没有新增配置，也不会覆盖已有名牌设置。

升级到 `0.27.11` 后，缺少 `growth.foods` 的官方原版宠物文件会自动补入物种食物；已有食物规则和自定义宠物不改。请停服备份后替换 Jar 并完整启动一次，再检查控制台补全数量。战斗经验会自动批量结算，关服保存等待批次完成；若数据库写入仍失败，检查控制台的宠物 ID 和 `messages.yml -> pet-combat-experience-save-failed` 提示。

升级到 `0.27.10` 不新增管理员配置节点；停服替换 Jar 并完整重启后生效。技能书异步预扣记录由 `pending-skillbook-refunds.yml` 自动维护，请勿手动修改。GUI 与 `%lipet_active_speed%` 会直接显示敏捷的千分位增量，原有速度和技能配置值不覆盖。

升级到 `0.27.9` 后会补全道具余额不足、回收等待/反馈异常消息和 `riding-sprint-multiplier`；已有支付 ID、价格、骑乘速度和自定义文本不覆盖。换 Jar 并重启后，可再用 `/lipet reload` 调整倍率或消息。

升级到 `0.27.8` 必须替换 Jar 后重启，旧版的配置重载不能修复已卡住的运行时操作队列。保留宠物数据与全部自定义消息；新增等待提示可设为空字符串关闭，不影响召唤结果或状态保存。

升级到 `0.27.7` 请停服备份后替换 Jar 并重启；保留已有 `nameplate.hide-while-ridden` 值与自定义注释。想让骑手及旁观者都不看到骑乘名牌时设为 `true`，想保留显示时设为 `false`；后续修改该配置可执行 `/lipet reload` 应用。

升级到 `0.27.6` 需要首次替换 Jar 并重启一次，不能用旧版 `/lipet reload` 加载新代码。此后修改三个 `currency.*.display-name` 时，只需重载成功后重新打开商城；原有价格、支付 ID、自定义名称和中文注释不会被覆盖。

## 23. 构建

普通通用包：

```text
mvn clean package
```

Paper 26.2 编译检查：

```text
mvn -Ppaper-26.2 clean package
```

输出：

```text
target/LiPet-0.27.24-SNAPSHOT.jar
```
