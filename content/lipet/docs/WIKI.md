# LiPet Wiki

适用版本：`0.26.18-SNAPSHOT`

适用服务端：

- Paper / Folia `1.21.11`
- Paper / Folia `26.1.2`
- Paper `26.2`

运行建议：Java 25。插件成品 Jar 使用 Java 21 字节码构建，便于跨版本运行。

## 今日更新 · 2026-08-29 · 0.26.18

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
- Vault / PlaceholderAPI / ModelEngine / CraftEngine 软兼容

## 2. 安装

1. 将 `LiPet-0.26.18-SNAPSHOT.jar` 放入服务器 `plugins/` 目录。
2. 启动服务器一次，让插件生成默认配置。
3. 停服，编辑 `plugins/LiPet/` 下的配置文件。
4. 再次启动服务器。
5. 执行 `/lipet status` 检查状态。

单服推荐 SQLite。群组服推荐 MySQL，并按需开启 Redis 同步。

## 3. 配置文件

| 文件 | 用途 |
| --- | --- |
| `config.yml` | 存储、服务器 ID、群组、依赖下载、内置货币 |
| `pet-types.yml` | 宠物类型、实体、模型、属性、行为、背包、成长、食物 |
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
- `give` 的第二个参数必须是 `pet-types.yml` 中已启用的类型 ID；不写名称时使用该类型的默认显示名。玩家已经拥有同类型宠物或同名宠物时会安全跳过，不重复创建。
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
- 指令只管理 LiPet `INTERNAL` 宠物币，不修改 Vault 或 PlayerCurrency 余额。
- 控制台可执行，权限为 `lipet.admin.coin`，全部反馈文本可在 `messages.yml` 自定义。

## 7. 权限

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `lipet.command.use` | true | 使用 `/lipet` 主命令 |
| `lipet.command.menu` | true | 打开宠物中心 |
| `lipet.command.shop` | true | 打开宠物商城 |
| `lipet.command.itemshop` | true | 打开宠物道具商城 |
| `lipet.command.warehouse` | true | 打开宠物仓库 |
| `lipet.command.balance` | true | 查看宠物币余额 |
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
| `lipet.admin` | op | 管理员总权限 |

## 8. 宠物类型

宠物类型在 `pet-types.yml` 中配置。

示例：

```yaml
types:
  wolf:
    entity-type: "WOLF"
    display-name: "狼"
    enabled: true
    owner-limit: 1
    model:
      provider: "NATIVE"
      id: ""
      hide-base-entity: true
      override-hitbox: true
    behavior:
      follow-enabled: true
      follow-distance: 10.0
      stop-distance: 3.0
      teleport-distance: 30.0
```

说明：

- `entity-type` 必须是当前 Paper 版本存在的 Bukkit 实体类型。
- `owner-limit` 当前固定用于“一种宠物只能拥有一只”的限制。
- `model.provider` 支持 `NATIVE`、`MODEL_ENGINE`、`CRAFT_ENGINE`。
- `model.hide-base-entity` 仅在外部模型提供器中生效；ModelEngine/MEG 建议保持 `true`，它只隐藏原版载体外观，不会关闭宠物 AI。
- `model.override-hitbox` 控制 ModelEngine 是否使用模型蓝图碰撞箱；它与隐藏原版外观是两个独立选项。
- `auto-register-vanilla: true` 时会自动注册可生成的原版实体宠物类型。
- `follow-distance` 是开始追赶距离，`stop-distance` 是停止追赶距离；后者必须更小，避免宠物在临界点反复启停。
- 超过 `teleport-distance` 时只会在主人落地且未飞行、未滑翔时安全回传；回传带有短冷却，避免异步传送失败时连续刷传送。
- 原生寻路连续拒绝路径时，宠物会在主人安全落地后回传，不会停在原地，也不会使用速度强拖穿过障碍。

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
  hide-while-ridden: true

riding:
  hide-boss-bar-while-ridden: true
```

- `owner-line` 支持 MiniMessage、RGB、渐变和 `<owner_name>` 占位符。
- `enabled: false` 会删除双行显示实体并恢复原版单行宠物名称。
- `hide-while-ridden: true` 会仅对当前骑手隐藏同一个双行名牌，下坐骑后恢复可见，不再删除重建 TextDisplay。
- `riding.hide-boss-bar-while-ridden: true` 会同步隐藏凋零、末影龙等 Boss 血条，并在下坐骑时恢复骑乘前状态。
- 修改后执行 `/lipet reload`，已召唤宠物会在下一轮行为刷新时自动应用新样式。
- 名牌使用独立 PDC 关联宠物实体；区块重新载入时会校验并恢复，传送导致挂载脱离时会自动重建，死亡、收回和放生时会同步删除，不写入宠物数据库。

## 9. 属性与成长

核心属性：

- 力量：增加攻击伤害
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

食物配置在 `pet-types.yml`：

```yaml
foods:
  # 旧版 Bukkit Material 写法继续支持。
  COOKED_BEEF:
    display-name: "熟牛肉"
    experience: 20
    healing: 6.0
    attribute-points: 0
    minimum-level: 1
    maximum-level: 0

  # CraftEngine 物品必须填写完整 namespace:item_id。
  # 节点名只是管理员自定别名；使用 item-id 后也完整支持含点号的合法 ID。
  pet-biscuit:
    item-id: 'my.pack:pet.food'
    display-name: "灵宠饼干"
    experience: 35
    healing: 8.0
    attribute-points: 0
    minimum-level: 1
    maximum-level: 0
```

规则：

- 玩家手持配置的原版或 CraftEngine 食物右键自己的宠物即可喂食。
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

- `pet-types.yml`：`foods.*.item-id` 或食物节点名。
- `capture.yml`：`balls.*.material` 捕捉球。
- `skills.yml`：`skills.*.book.material` 技能书。
- `items.yml`：`signal-stick.material` 宠物信号棒。
- `shop.yml`：`entries.*.icon.material` 宠物商品图标，以及 `item-entries.*.item.material` / `icon.material` 道具商品和图标。
- `gui.yml`：全部按钮、信息卡片、自定义按钮和填充物的 `material`。

示例：

```yaml
# capture.yml
balls:
  spirit:
    material: "mypack:spirit_capture_ball"

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

- `warehouse.pet-item.actions.LEFT`：召回伙伴。
- `warehouse.pet-item.actions.SHIFT_LEFT`：蹲下左键召回伙伴。
- `warehouse.pet-item.actions.RIGHT`：查看属性与管理。
- `warehouse.pet-item.actions.SHIFT_RIGHT`：打开永久放生二次确认。

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

骑乘参数在 `pet-types.yml`：

```yaml
behavior:
  riding-speed: 0.35
  jump-velocity: 0.5
```

末影龙的翅膀、头部和身体属于独立交互部件；LiPet 会循环把这些部件解析回龙本体，因此普通右键骑乘和潜行右键管理都可正常使用。`0.26.17+` 会在召唤、区块恢复、跟随与骑乘时把末影龙稳定在 `HOVER` 阶段，避免原版阶段 AI 飞向末地传送门。飞行宠物会根据骑手视角俯仰升降，跳跃键可主动爬升。

骑乘显示不再删除 TextDisplay。启用 `nameplate.hide-while-ridden` 时只对当前骑手隐藏同一个名牌实体，下坐骑后恢复；其他玩家仍能看到名称，因此不会再因反复删除、重挂载而把名字渲染到宠物下方。

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

`active_state` 返回 `messages.yml` 中配置的中文状态；`active_state_key` 返回 `ACTIVE` 等原始键。四个 `attribute_*_name` 变量返回可配置中文属性名称。没有活动宠物时，数值变量稳定返回 `0` / `0.0`，文本变量返回空文本，不会把未解析变量留在计分板上。

PlaceholderAPI 是软依赖。未安装时 LiPet 会跳过 PAPI Hook，不影响主体功能。
Paper 26.2 建议搭配 [PlaceholderAPI `2.12.3+`](https://github.com/PlaceholderAPI/PlaceholderAPI/releases/tag/2.12.3)；LiPet 不调用其版本专用内部接口。

## 20. 兼容说明

### 宠物 AI 与坐下状态

宠物每次召唤都会强制恢复原版 AI、Mob 感知和站立状态。行为循环也会修复被外部模型插件或旧实体数据意外关闭的 AI。只有玩家主动切换到“坐下”时，插件才会暂停 AI；再次切换为“跟随”会立即恢复。

狼、猫等可驯服实体在收回前会先解除原版主人、驯服和坐下状态，再移除世界实体，避免原版驯服数据把实体继续保留下来。鹦鹉使用 LiPet 自己的主人标记，不再绑定原版主人，因此新召唤的鹦鹉不会自动飞到玩家肩上。

对于升级前已经停留在肩上的鹦鹉，`/lipet store`、管理菜单收回、信号棒收回和玩家退出流程都会同时检查左右肩。肩部数据会在发起保存时先安全摘除；若数据库保存失败，插件会把原肩部实体恢复，保存成功后才彻底清理。因此不会再出现聊天提示“已收回”但肩上仍有鹦鹉的情况。

跟随逻辑每 10 tick 更新一次：宠物超过 `follow-distance` 后启动原生寻路，进入 `stop-distance` 后停止；两者之间保持已有路径，避免来回启停。超过 `teleport-distance`，或原生寻路连续四次拒绝路径时，只有主人已落地且没有飞行或滑翔才会安全回传；主人仍在空中时宠物会等待。

召唤时会为宠物安装高优先级移动与目标控制 Goal，原版闲逛、逃跑和自动仇恨不能再反向覆盖插件路径。全部地面宠物都由服务端原生 Pathfinder 绕开方块：跟随每 10 tick 更新落点，战斗每 10 tick 刷新路径、每 2 tick 检查攻击距离；路径不可达时会停止旧路径，不会把宠物直线拖过障碍。飞行类或运行端确实没有寻路接口时才使用平滑速度兜底，并同步身体朝向；实际伤害仍由统一属性与攻击冷却计算。

### 文本样式

LiPet 会在最终写入前统一移除聊天消息、ActionBar、悬浮文本、GUI 标题与图标、捕捉球、技能书、信号棒和宠物名称的斜体装饰。根组件、嵌套组件和悬浮提示都会递归处理；即使旧配置使用 `&o` 或斜体标签，显示时也会强制转换为非斜体。

双行宠物名牌同样通过统一 MiniMessage 组件生成，宠物名和“主人”行都不会使用斜体。

### Residence 与领地生物生成保护

召唤时，LiPet 使用 Bukkit `CUSTOM` 生成原因，并在生成事件前把宠物 UUID 与类型写入实体 PDC。`PetSpawnProtectionListener` 在 `HIGHEST` 优先级运行，仅当事件已取消且实体带有 LiPet 宠物标记时才撤销取消状态，因此不会放行野生生物、刷怪笼生物或其他插件实体。

Residence 当前会在较低优先级检查 `animals`、`canimals`、`monsters`、`cmonsters` 与 `nomobs` 等生成限制；LiPet 的专属放行发生在这些检查之后。即使某个未知保护插件在更晚阶段再次取消，LiPet 也会检测返回实体是否真实有效，并在失败时清理实体、停止后续初始化且不创建名牌。

`softdepend` 中声明 Residence 只用于稳定加载顺序，Residence 没有安装时 LiPet 仍可独立运行。该兼容不会修改领地 Flag，也不会给普通生物开放生成权限。

### Paper 26.1.2 / 26.2

LiPet 当前使用 Java 21 字节码构建，运行端推荐 Java 25。调度逻辑封装在 `PlatformScheduler`，业务层不直接散落调度调用。

活动宠物实体由加载索引维护。SQLite / MySQL 完成回调只读取线程安全状态，再把生命读取、属性刷新、召回和移除交给实体调度器；不会再从数据库线程调用区块实体查询。

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
target/LiPet-0.26.18-SNAPSHOT.jar
```
