# LiPet

LiPet 是一个面向群组服的 Bukkit 宠物插件框架，兼容 Paper/Folia 1.21.11、Paper/Folia 26.1.2 与 Paper 26.2。

`0.27.7-SNAPSHOT` 修复骑乘时旁观者仍能看到宠物名牌，以及按住前进键后转动视角却不转向的问题。开启 `pet-types.yml -> nameplate.hide-while-ridden` 时，骑手和其他玩家都会隐藏双行名牌与载体原版名称，保留同一个 TextDisplay 并在下马后恢复；设为 `false` 可保持显示。骑乘上马即启动连续控制，每 tick 使用骑手当前视角与按键，原地和持续前进时都能跟随视角转向。完整说明见 [2026-09-01 骑乘名牌与视角转向更新](docs/更新日志-2026-09-01-骑乘名牌与视角转向.md)。

`0.27.6-SNAPSHOT` 新增 Vault / PlayerPoints 货币名称配置，并修复改名后重载不生效的问题。三个名称统一在 `config.yml -> currency.<internal|vault|playerpoints>.display-name` 设置，默认依次为“宠物币 / 金币 / 点券”。首次换用新 Jar 后重启一次；以后修改名称并成功执行 `/lipet reload`，关闭再打开宠物商城或道具商城即可看到新名称。重载失败或并发请求不会发布本次候选名称，货币 ID、价格及扣款规则保持不变。完整示例见 [2026-08-31 货币名称与重载更新日志](docs/更新日志-2026-08-31-货币名称重载.md)。

`0.27.5-SNAPSHOT` 新增 MEG 等级模型、原版捕捉随机属性和捕捉球商店。宠物可配置 1 级模型 `a`、2 级模型 `b`，升级后按等级门槛切换；原版捕捉成功时独立生成力量、体质、防御、敏捷并持久保存，默认各 0–5。道具商店使用 `item.capture-ball` 引用真实捕捉球，默认上架普通捕捉球案例。配置教程见 [等级模型、随机属性与捕捉球商店](docs/等级模型与捕捉球商店.md)。

`0.27.4-SNAPSHOT` 为 CraftEngine 捕捉球与宠物食物加入可直接修改的默认案例。`capture.yml -> balls.craftengine_example` 和 `pet-types.yml -> defaults.growth.foods.craftengine_example` 均带完整中文注释、`namespace:item_id` 写法和 `enabled: false` 安全开关；修改成自己的 CE ID 并启用即可使用。关闭的案例不会进入捕捉球指令补全、物品识别、扣除或宠物食物列表；旧服只补缺失节点，不覆盖现有材料、食物数值与管理员注释。默认构建与 Paper 26.2 Profile 各 165 项测试通过，并在 Paper 26.2 Build 111 + CraftEngine 26.8 验证 109 个 CE 物品索引及同一 CE 物品同时作为食物和捕捉球的配置链路。

`0.27.3-SNAPSHOT` 重构宠物配置为“公共默认值 + 单宠差异”：所有相同属性统一写在 `pet-types.yml` 的 `defaults`，每只宠物只在中文 `宠物/` 目录保存独立 YML 和不同项。首次启动会为默认捕捉规则允许的全部原版生物生成 `原版宠物/<中文名>.yml`，已有文件和自定义值不会覆盖；旧官方 `宠物类型/` 目录会在没有同名新目录时安全迁移。MCPets 单宠物文件可原样放入中文子目录，LiPet 会读取 `Id`、`MythicMob`、骑乘类型和距离等核心字段，并通过 MythicMobs 生成对应 Mob；同时提供 `自定义宠物/正义工作室/龙骑/龙骑-普通.yml` 中文示例。

`0.27.2-SNAPSHOT` 恢复老版本宠物类型兼容：数据库中的 `bat`、`fox` 或 `minecraft:bat` 等旧原版 ID 会自动解析到当前 `vanilla_<实体名>` 类型，召唤、同类型持有限制与管理员按类型操作使用同一兼容规则，不修改或删除旧宠物数据。插件会为商城现有 10 种宠物补齐一宠物一 YML；升级只创建缺失文件，已有类型、文件、数值和注释均不覆盖。默认构建与 Paper 26.2 Profile 各 151 项测试通过，并在 Paper 26.2 Build 111 验证旧配置补全、旧 ID 解析、热重载与安全关闭。

`0.27.1-SNAPSHOT` 对 MythicMobs 等级技能做稳定性和热路径优化：冷却中的技能不再重复抽取概率，`PASSIVE` 与 `INTERVAL` 合并为一次技能表扫描，冷却清理降为每分钟一次；MM 返回 `false` 时会保留配置冷却，零冷却错误技能至少退避 1 秒，错误日志按技能名分别限频，避免错误配置每 tick 重试或刷屏。反射挂钩同时兼容静态 `getAPIHelper()` 和 `double power` API 变体。`/lipet status` 新增已启用技能类型数与规则数，旧官方状态文本会安全迁移而不覆盖服主自定义语言。默认构建与 Paper 26.2 Profile 各 148 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 验证旧语言迁移、规则计数、热重载、MM 缺失降级和安全关闭。当前环境没有真实 MythicMobs Jar，实际 MM 技能施放仍需在安装 MM 的目标测试服确认。

`0.27.0-SNAPSHOT` 新增每种宠物独立的 MythicMobs 等级技能配置。服主可在任意 `宠物类型/*.yml` 中配置 MM 技能名、触发方式、解锁等级、概率、冷却、基础 `power` 与每级成长；低于解锁等级时完全不会施放，达到等级后自动生效。支持主人攻击/受击、宠物攻击/受击、交互及定时触发，并用预占冷却阻止 MM 伤害递归触发。MythicMobs 是可选软依赖，不安装时 LiPet 仍可正常运行；旧宠物类型文件只会补入带完整中文注释且默认关闭的示例，不覆盖服主配置。

`0.26.26-SNAPSHOT` 修复从宠物管理界面进入“完整属性”或“成长与加点”后无法返回原管理界面的问题。属性面板现在会保存打开来源：从仓库进入时返回宠物仓库，从管理界面进入时返回同一只宠物的管理页；完成属性加点并刷新界面后也会继续保留返回来源。旧服会在不覆盖自定义按钮的前提下，自动向 `gui.yml` 补充可完全自定义的 `info.navigation.manage` 返回按钮。默认构建与 Paper 26.2 Profile 各 137 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成真实 0.26.25 配置迁移、热重载、状态检查和安全关闭验证。

`0.26.25-SNAPSHOT` 按玩家界面重新整理宠物仓库介绍：潜行左键与潜行右键统一使用绿色操作色，永久放生警告前增加空行，并改为醒目的红色“⚠放生会永久删除全部数据”。升级只迁移历次官方默认 Lore，服主自定义介绍保持不变。默认构建与 Paper 26.2 Profile 各 132 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成 0.26.24 默认 Lore 迁移、热重载、状态检查和安全关闭验证。

`0.26.24-SNAPSHOT` 将宠物仓库图标操作拆成四条准确提示：左键召唤、右键查看属性与管理、潜行左键收回、潜行右键放生；潜行左键已改为真正的 `store` 动作，升级仅迁移官方旧 Lore、注释和旧默认动作。宠物类型改为默认读取可中文命名的 `宠物类型/` 目录，支持多个 `.yml` / `.yaml` 和中文子目录；旧 `pet-types.yml` 的 `types` 会在目标目录不存在时原样拆成一类型一文件，已有目录和服主自定义内容不会被覆盖。131 项测试通过；Paper 26.2 Build 111 + PlayerPoints 3.3.5 已完成旧服拆分迁移、新服中文文件生成、热重载和安全关闭验证。

`0.26.23-SNAPSHOT` 调整主菜单宠物入口：按钮标题由“宠物仓库”改为“我的宠物”，最后一行由“点击打开宠物仓库”改为“点击打开宠物列表”。实际列表页面仍叫“宠物仓库”；升级仅迁移官方旧按钮名称和 Lore，服主自定义文本保持不变。Paper 26.2 Profile 共 121 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 上完成真实 0.26.22 `gui.yml` 迁移、状态检查和安全关闭验证。

`0.26.22-SNAPSHOT` 将“已有一只宠物正在跟随时再次召唤”的结果改为独立召唤上限提示：`已达最大召唤数量，请将已召唤的休息后再召唤！`。指令与仓库 GUI 均继续通过 `pet-already-active` 语言节点显示，不再使用通用召唤失败文案；插件会自动迁移历次官方默认文本及 Bukkit 自动折行后的旧值，但保留服主自定义语言。Paper 26.2 Profile 共 119 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成真实旧配置迁移、状态检查和安全关闭验证。

`0.26.21-SNAPSHOT` 修复鹦鹉等飞行宠物安全回传后双行 TextDisplay 名牌停留在旧位置的问题。宠物传送前会主动清理乘客名牌，异步传送无论成功或失败都会在宠物当前实体区域立即恢复名牌，避免宠物和“名称 / 主人”文本分离；新增传送生命周期顺序及失败恢复测试。Paper 26.2 Profile 共 119 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成启动、挂钩和安全关闭验证。

`0.26.20-SNAPSHOT` 修复宠物商城和宠物道具商城把配置用货币 ID `INTERNAL` 直接显示给玩家的问题；两个商城的 `<currency>` 现在统一读取 `config.yml` 中的 `currency.internal.display-name`，默认显示“宠物币”，服主自定义名称同样生效。未知或未挂钩的提供器仍显示原始 ID，便于排查配置。Paper 26.2 Profile 共 117 项测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成启动、挂钩和安全关闭验证。

`0.26.19-SNAPSHOT` 新增默认自动授予的 `lipet.player` 普通玩家权限组，并让 `lipet.admin` 显式继承；新增 `/lipet top coin|level [页码]` 宠物币与宠物等级排行榜，SQLite/MySQL 均使用异步分页排序查询；宠物商城和道具商城新增 `PLAYERPOINTS` 货币提供器，运行时反射挂钩 PlayerPoints 3.x，不把第三方依赖打入 Jar。116 项自动测试通过，并在 Paper 26.2 Build 111 + PlayerPoints 3.3.5 完成真实挂钩、两种排行榜与安全关闭验证。

`0.26.18-SNAPSHOT` 为宠物仓库增加四种独立快捷操作：左键和蹲下左键召回伙伴、右键查看属性与管理、蹲下右键进入放生二次确认；仓库 Lore 会明确提示放生会永久删除且无法恢复，旧默认 Lore 和缺失动作节点会安全迁移，自定义内容保持不变。仓库召回不再把“已有活动宠物、死亡冷却、跨服占用”错误显示为统一召唤失败，而是使用对应中文语言节点。宠物币在原 `/lipet coin give|take|look` 基础上新增 `/lipet givecoin`、`takecoin`、`lookcoin` 快捷入口。默认构建与 Paper 26.2 Profile 各 111 项测试通过，并在 Paper 26.2 Build 111 完成旧 GUI 配置迁移和两种宠物币指令实测。

`0.26.17-SNAPSHOT` 新增 `/lipet coin give|take|look <玩家> [数量]` 管理员宠物币指令，可查询、发放和安全扣除在线/离线 UUID 账户，余额不足时拒绝产生负数；Tab 玩家参数仍只显示在线玩家。骑乘隐藏改为仅对骑手隐藏现有 TextDisplay，不再删除重建名牌，修复名字掉到实体下方的问题。末影龙会固定为 `HOVER` 阶段，身体部件继续解析回龙本体，并支持按视角俯仰飞行骑乘。默认构建与 Paper 26.2 Profile 各 106 项测试通过，成品已在 Paper 26.2 Build 111 完成真实 SQLite 币变动和安全关闭验证。

`0.26.16-SNAPSHOT` 新增独立骑乘可见性监听：玩家骑上宠物时立即隐藏双行名牌，Boss 宠物还会按 `riding.hide-boss-bar-while-ridden` 隐藏血条，下坐骑后自动恢复原状态；末影龙身体部件会统一解析回龙本体，因此空手右键骑乘、潜行右键管理和信号棒交互均可正常命中。管理员玩家参数的 Tab 补全只显示在线玩家，离线名称与 UUID 仍可手工执行；召唤冲突提示会同时显示当前宠物和目标宠物，并新增 `/lipet delete [宠物名称]` 永久删除入口。

`0.26.14-SNAPSHOT` 完成 CraftEngine 物品全链路挂钩：喂食、捕捉球、技能书、信号棒、宠物商城图标、道具商城商品与图标、全部 GUI 按钮及填充物都可直接填写 CE 完整物品 ID。插件会使用 CE 官方稳定 API 生成并反向识别物品，保留模型与组件数据；CE 重载后自动刷新物品索引，生成失败时显示中文提示或自动退款，不会伪装成同底材原版物品。默认构建与 Paper 26.2 Profile 各 102 项自动测试均通过，并已搭配 CraftEngine 26.8.1 在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 加载 109 个 CE 物品，完成全链路和热重载实测。

`0.26.13-SNAPSHOT` 将点击反馈覆盖到主菜单、商城、仓库、属性、管理、放生确认及宠物背包；`gui.yml` 的全部内置按钮、自定义按钮、属性按钮、导航按钮和信息卡片新增 `slots` 多槽位配置，非空时覆盖旧版 `slot`，空列表则继续使用原位置，升级不会覆盖服主布局。默认构建与 Paper 26.2 Profile 各 99 项自动测试均通过，同一成品已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成配置迁移、热重载和安全关闭验证。

`0.26.12-SNAPSHOT` 新增 `/lipet give <玩家|-all> <宠物类型> [名称]` 与 `/lipet take <玩家|-all> <宠物名称|UUID|类型|-all>`，支持向服务器已知的在线/离线玩家或全服玩家发放、收走宠物，并提供完整 Tab 补全与顺序数据库批处理；召唤实体会在生成事件前写入 LiPet 专属标记，并以高优先级仅放行自己的宠物，使 Residence 等领地保护开启生物生成限制时仍可召唤，同时阻止生成失败后留下孤立名牌。默认构建与 Paper 26.2 Profile 各 91 项自动测试均通过，同一成品已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成启动、指令和安全关闭验证。

当前版本包含配置、持久化、宠物创建与召唤、属性成长、衍生战斗属性、喂养升级、骑乘、捕捉仪式、信息 GUI、跟随、坐下控制、放生、协助战斗、死亡冷却、按等级解锁的 MythicMobs 技能和扩展点。

`0.5.0-SNAPSHOT` 已加入有界 JDBC 连接池、版本化数据库迁移、Redis 消息消费与去重、跨服 revision 防旧消息机制及安全关闭保存。

`0.6.0-SNAPSHOT` 已挂钩 Vault 与 PlaceholderAPI。两者均为可选前置，不会打入 LiPet Jar。

`0.7.0-SNAPSHOT` 新增 SQLite 单服存储、ModelEngine 模型 Provider 基础实现，以及能力、多货币、商城、GUI、宠物箱、交易和备份的模块边界。

`0.8.0-SNAPSHOT` 新增配置化宠物商城、宠物仓库 GUI、内置货币账户、SQLite/MySQL 货币持久化和购买失败自动退款。
`0.11.0-SNAPSHOT` 自动注册全部可生成原版生物，新增捕捉黑名单、技能书、技能等级和 SQLite/MySQL 技能持久化。
`0.12.0-SNAPSHOT` 新增宠物食物、经验升级、属性成长、骑乘、装备持久化和宠物详细信息界面。
`0.12.1-SNAPSHOT` 增加旧配置自动补全写回，升级后可直接编辑新增成长和界面节点。
`0.13.0-SNAPSHOT` 重做成长系统：战斗经验、食物等级限制、属性点、力量/体质/防御/敏捷、减伤、恢复和增强信息 GUI。
`0.18.0-SNAPSHOT` 移除宠物装备系统，新增暴击、暴击伤害、闪避、击退抗性、吸血等衍生属性，并为捕捉加入可配置的提示、音效与粒子仪式。
`0.19.0-SNAPSHOT` 默认启用 SQLite 持久化并迁移旧 MEMORY 配置，修复重启状态恢复；扩充宠物商城、限制每种宠物只能拥有一只，并加入聊天框交互改名。
`0.20.0-SNAPSHOT` 修复疣猪兽和猪灵跨维度僵尸化、宠物日照燃烧，并为缺少原版攻击 AI 的宠物增加统一追击与近战攻击兜底。
`0.21.0-SNAPSHOT` 新增 `/lipet sit` 坐下/跟随切换、`/lipet release` 放生指令、管理菜单坐下按钮、完整权限、补全与中文消息。
`0.22.0-SNAPSHOT` 新增 `/lipet mount` 指令入口，并建立 `docs/PET_FEATURE_MATRIX.md` 跟踪宠物功能进度。
`0.23.0-SNAPSHOT` 新增每只宠物独立背包：`/lipet inventory [宠物名称]`、管理菜单背包入口、SQLite/MySQL 持久化和旧 GUI 配置自动补全。
`0.24.0-SNAPSHOT` 新增宠物信号棒：`/lipet signalstick [数量] [玩家]` 发放，右键执行当前模式，潜行右键切换坐下/收回/骑乘/背包。
`0.25.0-SNAPSHOT` 曾新增安全自动更新能力。
`0.25.1-SNAPSHOT` 自查修复：宠物实体交互不再把信号棒/技能书误当食物消耗，信号棒支持右键宠物实体触发。
`0.25.5-SNAPSHOT` 按维护策略移除自动更新系统：删除 `updater` 配置、启动定时检查和 `/lipet update` 命令，避免插件自行联网下载 Jar。
`0.25.6-SNAPSHOT` 强化宠物生命周期一致性：同一玩家的召回、收回、成长、改名和放生改为串行执行；收回改为保存成功后再移除实体；关服会等待数据库写入队列排空，并自动清理崩溃后遗留的未绑定宠物实体。
`0.25.7-SNAPSHOT` 将 Paper 26.2 兼容基线升级到正式稳定构建 Build 111，完成 Adventure 5 API 移除项审计；捕捉音效和粒子改用 Bukkit Registry 解析，宠物背包改用新版 Bukkit 字节格式并兼容读取旧数据，同时保留 Paper 26.1.2 向后兼容交付。
`0.25.8-SNAPSHOT` 清理旧品牌字样，统一移除界面、道具和宠物名称斜体，并修复飞行宠物召唤后感知被关闭的问题；非坐下宠物会自动恢复原版 AI、感知与站立状态。

`0.25.9-SNAPSHOT` 重做战斗接近逻辑：具备攻击寻路的生物完全使用原版 AI，不再被自定义速度覆盖；被动生物使用高频平滑辅助移动，并同步身体朝向，修复攻击时被拖拽和倒着移动。
`0.26.0-SNAPSHOT` 重做跟随与追击导航：加入开始、停止、回传三段距离和回传冷却，主人飞行或滑翔时等待安全落地；全部地面宠物由高优先级受控 Goal 配合服务端原生 Pathfinder 绕障，原版闲逛、逃跑和仇恨不会再反向覆盖路径，新路径不可达时会停止旧路径而不会直线拖拽；消息、悬浮文本、GUI、道具和宠物名称在写入前统一强制非斜体。
`0.26.1-SNAPSHOT` 修复 SQLite 完成回调越过线程边界读取区块实体导致的喂养、属性加点、召回和收回连锁失败；活动宠物改用加载实体索引并随区块装卸维护，连续寻路失败会安全回传；全部菜单新增可配置打开、点击、关闭音效，宠物背包默认与最小容量调整为 54 格。
`0.26.2-SNAPSHOT` 修复可驯服生物收回残留：移除实体前解除原版主人、驯服与坐下状态，鹦鹉不再进入原版肩部数据；收回会同时检查左右肩，数据库保存失败时自动恢复肩部实体。主菜单、管理菜单和放生确认默认扩展为 5 行并仅绘制边框；GUI 的尺寸、槽位、填充模式、图标高级属性、按钮启停、普通/左右键动作及自定义指令均可在 `gui.yml` 配置。
`0.26.3-SNAPSHOT` 为 `/lipet reload` 加入 SQLite / MySQL 数据库热切换：候选驱动、连接与表结构先在后台验证，活动宠物保存完成后宠物数据与内置货币请求原子转向新库；切换窗口内的新请求自动排队，失败时继续使用旧库。MySQL 新增连接与读写超时配置，`/lipet status` 会显示当前实际数据库目标。
`0.26.4-SNAPSHOT` 为活动宠物增加双行头顶名牌：第一行显示宠物名称，第二行显示主人玩家名；文字、颜色、偏移、背景、透明度与可视范围可在 `pet-types.yml` 调整。名牌会随重命名和热重载刷新，并在区块恢复、传送、死亡、收回和孤儿清理流程中自动修复或删除。
`0.26.5-SNAPSHOT` 修复属性加点提示显示 `STRENGTH` 等英文枚举的问题；四项属性与五种宠物状态改为 `messages.yml` 可配置中文名称。属性成功/失败消息和全部宠物 GUI 补齐玩家、宠物、成长、衍生属性及原始键变量，PlaceholderAPI 对外目录同步扩展并保证无活动宠物时返回稳定默认值。
`0.26.6-SNAPSHOT` 新增 `/lipet daily`、主菜单每日领取入口及宠物战斗/升级/捕捉奖励；新增 `rewards.yml` 完整配置和 `lipet_currency_reward` 防重表。奖励额度与余额在同一事务内更新，并与宠物、技能、背包、货币账户共享数据库热切换屏障。
`0.26.7-SNAPSHOT` 美化全部内置 GUI 与商城商品 Lore，增加清晰分区、渐变色操作引导和更完整的用途提示；旧默认值自动升级，自定义 Lore 不覆盖。
`0.26.8-SNAPSHOT` 修复 ModelEngine/MEG 模型与原版载体重叠，加入幂等模型恢复、热重载刷新及可配置的载体隐藏与碰撞箱覆盖。
`0.26.9-SNAPSHOT` 新增 CraftEngine 物品喂食支持，按完整命名空间 ID 精确识别与扣除，并保留全部旧版 Bukkit Material 食物配置。
`0.26.10-SNAPSHOT` 取消 `/lp` 指令别名，仅保留 `/lipet`，避免与 LuckPerms 等权限插件的常用主指令冲突。
`0.26.11-SNAPSHOT` 新增跨玩家单宠管理界面与 `lipet.admin.manage` 权限；管理员的属性、背包、改名、坐下、收回和放生操作始终绑定宠物真实主人及指定宠物 ID。商城增加 `enabled` 总开关并覆盖指令、GUI 和购买入口。
`0.26.12-SNAPSHOT` 新增管理员宠物 `give` / `take` 指令、离线玩家与双层 `-all` 支持；仅对带 LiPet 标记的宠物撤销领地插件生成拦截，并在实体确实生成成功后才创建名牌。
`0.26.13-SNAPSHOT` 为全部 LiPet UI 与宠物背包补齐点击反馈；所有可配置按钮支持 `slots` 多槽位复制和旧版 `slot` 安全回退。
`0.26.14-SNAPSHOT` 将 CraftEngine 扩展为完整物品提供器：统一负责自定义物品识别、生成、索引、Tab 补全和 CE 重载同步，并覆盖喂食、捕捉球、技能书、信号棒、商城及 GUI。
`0.26.15-SNAPSHOT` 骑乘时临时隐藏双行宠物名牌，避免第一人称视角被 TextDisplay 遮挡。
`0.26.16-SNAPSHOT` 使用实体挂载监听同步名牌与 Boss 血条，修复凋零骑乘遮挡和末影龙部件交互；玩家 Tab 只提示在线目标，新增删除指令并修正重复召唤提示。
`0.26.17-SNAPSHOT` 新增管理员宠物币查询/发放/扣除；名牌骑乘隐藏不再删除重建；末影龙固定悬停阶段并支持飞行骑乘。
`0.26.18-SNAPSHOT` 新增仓库蹲下左键召回与蹲下右键放生确认，修复仓库召回语言分流，并增加 givecoin/takecoin/lookcoin 宠物币快捷指令。
`0.26.19-SNAPSHOT` 修复普通玩家权限组不会自动继承的问题，新增宠物币/宠物等级排行榜，并让两个商城支持 PlayerPoints。
`0.26.20-SNAPSHOT` 修复两个商城直接显示 `INTERNAL`，改为显示可配置的内置货币名称。
`0.26.21-SNAPSHOT` 修复飞行宠物安全回传后 TextDisplay 名牌停在旧位置的问题。
`0.26.22-SNAPSHOT` 为已有活动宠物时再次召唤增加明确的最大召唤数量提示，并安全迁移官方旧语言。
`0.26.23-SNAPSHOT` 将主菜单入口改为“我的宠物”，点击说明改为“打开宠物列表”。
`0.26.24-SNAPSHOT` 将仓库提示与四种点击动作一一对应，并把宠物类型配置拆分为支持中文目录和多 YML 的文件结构。
`0.26.25-SNAPSHOT` 统一仓库潜行操作的绿色提示，并将永久放生警告独立成红色段落。
`0.26.26-SNAPSHOT` 让管理页打开的属性与成长面板返回同一只宠物的管理页，并在加点刷新后保留返回来源。
`0.27.4-SNAPSHOT` 为捕捉球和宠物食物增加默认关闭、可直接修改的 CraftEngine 完整配置案例。
`0.27.3-SNAPSHOT` 增加全体可捕捉原版宠物独立 YML、公共默认值继承、中文目录迁移和 MCPets 单文件兼容。
`0.27.2-SNAPSHOT` 兼容旧原版宠物类型 ID，并为商城 10 种宠物安全补齐独立 YML。
`0.27.1-SNAPSHOT` 优化 MM 技能冷却与定时扫描，增加失败退避、逐技能日志限频、API 变体兼容和状态规则统计。
`0.27.0-SNAPSHOT` 为每个宠物类型增加独立 MythicMobs 技能列表，支持等级解锁、七种触发器、概率、冷却和 `power` 等级成长。
`0.25.4-SNAPSHOT` 增加 Paper 26.2 兼容声明与 Maven 兼容编译 profile：`-Ppaper-26.2`。

`0.25.3-SNAPSHOT` 修复捕捉仪式音效兼容问题：无效 Bukkit Sound/Particle 会自动回退并写回安全默认值，不再导致插件启动失败。

`0.25.2-SNAPSHOT` 修复启动兼容检查过严导致插件被误禁用的问题，并放宽 server.id/server.group 命名，启动失败时额外输出完整堆栈。

宠物交互：

- 空手右键自己的已召唤宠物：骑乘，可用方向键驾驶并按跳跃键起跳。
- 潜行并空手右键自己的已召唤宠物：打开属性与管理界面。
- 在管理界面点击“修改宠物名字”后，直接在聊天框输入新名字；输入“取消”可退出。
- 手持“宠物类型”目录或旧 `pet-types.yml` 中配置的原版或 CraftEngine 食物右键自己的宠物：回血并获得经验。
- 仓库左键宠物：召唤伙伴；右键宠物：查看属性与管理；潜行左键：收回当前宠物；潜行右键：进入永久放生二次确认。
- 管理员使用 `/lipet manage <在线玩家> <宠物名称>`：管理该玩家的指定宠物。
- 管理员使用 `/lipet give <玩家|-all> <宠物类型> [名称]`：向单个在线/离线玩家或全服玩家发放宠物。
- 管理员使用 `/lipet take <玩家|-all> <宠物名称|UUID|类型|-all>`：按选择器收走宠物，第二个 `-all` 表示目标名下全部宠物。
- 管理员使用 `/lipet coin give|take|look <玩家> [数量]`：查询、发放或扣除目标玩家的内置宠物币。
- 管理员也可使用 `/lipet givecoin`、`/lipet takecoin`、`/lipet lookcoin` 三条等价快捷指令。

PlaceholderAPI 变量：

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

`%lipet_active_state%` 返回可配置中文状态，需读取数据库原始状态键时使用 `%lipet_active_state_key%`。玩家没有召唤宠物时，数值变量返回 `0` 或 `0.0`，文本变量返回空文本。

Vault 通过 `LiPetApi#economy()` 暴露统一经济接口，供后续购买、复活和技能升级使用。仅安装 Vault 而未安装经济插件时，LiPet 会关闭经济挂钩但继续运行。

Paper 26.2 使用 PlaceholderAPI 时建议安装 [`2.12.3+`](https://github.com/PlaceholderAPI/PlaceholderAPI/releases/tag/2.12.3)；LiPet 只调用稳定的 `PlaceholderExpansion` 接口，PlaceholderAPI 仍是可选软依赖。

完整功能实施顺序见 [docs/FEATURE_ROADMAP.md](docs/FEATURE_ROADMAP.md)。
服主与玩家使用 Wiki 见 [docs/WIKI.md](docs/WIKI.md)。
`0.27.4` 的 CE 捕捉球与食物默认案例见 [2026-08-29 CraftEngine 案例更新日志](docs/更新日志-2026-08-29-CE捕捉球与食物案例.md)。`0.27.3` 的全量原版宠物配置与 MCPets 兼容见 [2026-08-29 配置重构更新日志](docs/更新日志-2026-08-29-全量宠物配置与MCPets兼容.md)。`0.27.2` 的旧宠物类型兼容与独立配置见 [2026-08-29 老宠物类型兼容与独立 YML](docs/更新日志-2026-08-29-老宠物类型兼容.md)。
`0.27.1` 的技能稳定性优化见 [2026-08-29 MythicMobs 技能优化日志](docs/更新日志-2026-08-29-MythicMobs技能优化.md)。`0.27.0` 的 MythicMobs 等级技能见 [2026-08-29 MythicMobs 等级技能更新日志](docs/更新日志-2026-08-29-MythicMobs等级技能.md)。`0.26.26` 的管理二级菜单返回修复见 [2026-08-29 管理菜单返回更新日志](docs/更新日志-2026-08-29-管理菜单返回.md)。`0.26.25` 的仓库介绍排版见 [2026-08-29 仓库介绍样式更新日志](docs/更新日志-2026-08-29-仓库介绍样式.md)。`0.26.24` 的仓库四键提示与宠物类型多文件目录见 [2026-08-29 仓库四键与宠物类型目录更新日志](docs/更新日志-2026-08-29-仓库四键与宠物类型目录.md)。`0.26.23` 的“我的宠物”入口调整见 [2026-08-29 我的宠物入口更新日志](docs/更新日志-2026-08-29-我的宠物入口.md)。`0.26.22` 的召唤上限语言修复见 [2026-08-29 召唤上限提示更新日志](docs/更新日志-2026-08-29-召唤上限提示.md)。`0.26.21` 的鹦鹉名牌跟随修复见 [2026-08-29 鹦鹉名牌更新日志](docs/更新日志-2026-08-29-鹦鹉名牌跟随.md)。`0.26.20` 的商城货币显示修复见 [2026-08-29 商城货币显示更新日志](docs/更新日志-2026-08-29-商城货币显示.md)。`0.26.19` 的权限组、排行榜与 PlayerPoints 支持见 [2026-08-29 权限排行榜更新日志](docs/更新日志-2026-08-29-权限排行榜与PlayerPoints.md)。`0.26.18` 的仓库快捷操作、语言与宠物币快捷指令见 [2026-08-29 仓库快捷操作更新日志](docs/更新日志-2026-08-29-仓库快捷操作.md)。`0.26.17` 的宠物币管理、名牌修复与末影龙飞行骑乘见 [2026-08-29 更新日志](docs/更新日志-2026-08-29-宠物币与末影龙.md)。`0.26.16` 的骑乘显示、末影龙交互、在线 Tab、召唤语言和删除指令见 [2026-08-28 骑乘与交互更新日志](docs/更新日志-2026-08-28-骑乘交互.md)。`0.26.14` 的 CraftEngine 完整物品挂钩见 [2026-08-28 CE 更新日志](docs/更新日志-2026-08-28-CE.md)。`0.26.13` 的全 UI 点击音效与多槽位按钮见 [2026-08-28 UI 更新日志](docs/更新日志-2026-08-28-UI.md)。`0.26.12` 的宠物发放/收走、离线全服批处理和领地召唤兼容见 [2026-08-28 更新日志](docs/更新日志-2026-08-28.md)。

## 架构目标

- 本地服务器只维护在线宠物会话，权威数据放在共享存储。
- MySQL 保存宠物持久状态，Redis 负责事件广播、短租约和缓存失效。
- 宠物实体、技能、存储、同步、第三方插件 Hook 均通过接口隔离。
- 主类只负责组装，配置、指令、监听器、管理器和 API 分层独立。
- 外部公共依赖不打入插件 Jar，统一下载到插件数据目录的 `lib/`。
- `pet-types.yml` 的 `defaults` 保存全部宠物共用属性；`宠物/` 中每只宠物一个 YML，只写身份和差异项，目录名、子目录和文件名均可使用中文。
- 修改 `storage.type`、`storage.sqlite.file` 或 `storage.mysql.*` 后执行 `/lipet reload` 即可热切换；`server` 与 `cluster` 身份/通道变更仍需重启。
- 热切换负责连接生命周期，不会把两个独立数据库的历史数据自动互相复制；迁移前应先将完整数据导入目标库并做好备份。

## 当前指令

```text
/lipet create <类型> <名称>
/lipet list
/lipet info <名称>
/lipet call <名称>
/lipet store
/lipet sit
/lipet mount
/lipet inventory [宠物名称]
/lipet release [宠物名称]
/lipet delete [宠物名称]
/lipet rename [宠物名称]
/lipet shop
/lipet itemshop
/lipet warehouse
/lipet balance
/lipet top <coin|level> [页码]
/lipet coin <give|take|look> <玩家> [数量]
/lipet givecoin <玩家> <数量>
/lipet takecoin <玩家> <数量>
/lipet lookcoin <玩家>
/lipet daily
/lipet give <玩家|-all> <宠物类型> [宠物名称]
/lipet take <玩家|-all> <宠物名称|UUID|宠物类型|-all>
/lipet captureball <类型> [数量] [玩家]
/lipet skillbook <技能> [数量] [玩家]
/lipet signalstick [数量] [玩家]
/lipet help [页码]
/lipet status
/lipet reload
/lipet manage <玩家> <宠物名称>
```

详细设计见 [docs/LIPET_DESIGN.md](docs/LIPET_DESIGN.md)。

## 构建要求

- JDK 21+（Paper 26.1.2 / 26.2 运行端推荐 Java 25）
- Maven 3.9+

```text
mvn clean package
```

输出：`target/LiPet-0.27.7-SNAPSHOT.jar`

每次迭代必须同步更新 `pom.xml` 版本。`plugin.yml` 会从 Maven 版本自动生成。
