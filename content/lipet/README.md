# LiPet

LiPet 是一个面向群组服的 Bukkit 宠物插件框架，兼容 Paper/Folia 1.21.11、Paper/Folia 26.1.2 与 Paper 26.2。

`0.25.7-SNAPSHOT` 已使用同一通用 Jar 在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成启动、`/lipet status` 和优雅关服验证。

当前版本包含配置、持久化、宠物创建与召唤、属性成长、衍生战斗属性、喂养升级、骑乘、捕捉仪式、信息 GUI、跟随、坐下控制、放生、协助战斗、死亡冷却和扩展点。

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
`0.25.4-SNAPSHOT` 增加 Paper 26.2 兼容声明与 Maven 兼容编译 profile：`-Ppaper-26.2`。

`0.25.3-SNAPSHOT` 修复捕捉仪式音效兼容问题：无效 Bukkit Sound/Particle 会自动回退并写回安全默认值，不再导致插件启动失败。

`0.25.2-SNAPSHOT` 修复启动兼容检查过严导致插件被误禁用的问题，并放宽 server.id/server.group 命名，启动失败时额外输出完整堆栈。

宠物交互：

- 空手右键自己的已召唤宠物：骑乘，可用方向键驾驶并按跳跃键起跳。
- 潜行并空手右键自己的已召唤宠物：打开属性与管理界面。
- 在管理界面点击“修改宠物名字”后，直接在聊天框输入新名字；输入“取消”可退出。
- 手持 `pet-types.yml` 中配置的食物右键自己的宠物：回血并获得经验。
- 仓库左键宠物：召唤；右键宠物：查看等级、经验、属性和食物。

PlaceholderAPI 变量：

```text
%lipet_active_name%
%lipet_active_type%
%lipet_active_level%
%lipet_active_experience%
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
%lipet_active_damage%
%lipet_active_resistance%
%lipet_active_regeneration%
%lipet_active_state%
%lipet_pet_count%
%lipet_server_id%
```

Vault 通过 `LiPetApi#economy()` 暴露统一经济接口，供后续购买、复活和技能升级使用。仅安装 Vault 而未安装经济插件时，LiPet 会关闭经济挂钩但继续运行。

完整功能实施顺序见 [docs/FEATURE_ROADMAP.md](docs/FEATURE_ROADMAP.md)。
服主与玩家使用 Wiki 见 [docs/WIKI.md](docs/WIKI.md)。

## 架构目标

- 本地服务器只维护在线宠物会话，权威数据放在共享存储。
- MySQL 保存宠物持久状态，Redis 负责事件广播、短租约和缓存失效。
- 宠物实体、技能、存储、同步、第三方插件 Hook 均通过接口隔离。
- 主类只负责组装，配置、指令、监听器、管理器和 API 分层独立。
- 外部公共依赖不打入插件 Jar，统一下载到插件数据目录的 `lib/`。
- `pet-types.yml` 配置宠物实体、生命、伤害、速度、食物、升级经验、等级上限、跟随距离和复活时间。

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
/lipet rename [宠物名称]
/lipet shop
/lipet warehouse
/lipet balance
/lipet captureball <类型> [数量] [玩家]
/lipet skillbook <技能> [数量] [玩家]
/lipet signalstick [数量] [玩家]
/lipet help [页码]
/lipet status
/lipet reload
```

详细设计见 [docs/LIPET_DESIGN.md](docs/LIPET_DESIGN.md)。

## 构建要求

- JDK 21+（Paper 26.1.2 / 26.2 运行端推荐 Java 25）
- Maven 3.9+

```text
mvn clean package
```

输出：`target/LiPet-0.25.9-SNAPSHOT.jar`

每次迭代必须同步更新 `pom.xml` 版本。`plugin.yml` 会从 Maven 版本自动生成。
