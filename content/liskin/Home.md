# LiSkin

LiSkin 是一个以 CraftEngine 物品为外观来源的物品换皮插件。

核心规则：

- 只改变外观字段。
- 不替换原物品。
- 不修改原物品 Material、属性、附魔、耐久。
- 不清空其他插件写入的 NBT/PDC。
- 基准兼容 Paper/Folia 26.1.2/26.2 + CraftEngine 26.7.4（当前项目采用的最新 CE API），服务器使用 Java 25。
- 使用 Paper/Folia 统一调度层，同一 JAR 可运行在 Paper、Purpur、Folia、Luminol 等主流分支。
- 商店同时支持 Vault 金币与 PlayerPoints 点券，可全局选择或按皮肤单独指定。
- 完整发行包已将 8 套素材合并为单一 `skins` CraftEngine 资源包，共 101 个 LiSkin 皮肤。

## 基础用法

1. 将 `LiSkin.jar` 放入服务器 `plugins` 目录。
2. 确保服务器已安装并启用 CraftEngine。
3. 需要金币商店时安装 Vault 与经济插件；需要点券商店时安装 PlayerPoints。
4. 启动后编辑 `plugins/LiSkin/skins.yml`。
5. 执行 `/liskin reload`。
6. 玩家直接输入 `/liskin` 即可使用全部常用功能。

## 配套 CraftEngine 资源安装

完整版 ZIP 已包含：

```text
CraftEngine-resources/
└─ skins/
   ├─ pack.yml
   ├─ configuration/
   │  └─ skins.yml
   ├─ resourcepack/
   └─ source-notices/
```

安装方式：

1. 将发行包中的 `CraftEngine-resources/skins` 整个复制到
   `plugins/CraftEngine/resources/skins`。
2. 将 `LiSkin-1.9.5.jar` 放入 `plugins`。
3. 首次安装可直接使用 LiSkin 自动生成的默认 `skins.yml`；发行包中的
   `all-packs-skins.yml` 也提供同一份完整皮肤配置，方便手动合并。
4. 完整重启服务器，让 CraftEngine 重新生成并分发资源包。

不要只复制 `configuration`。缺少 `resourcepack` 中的模型或贴图时，CE 物品会显示为错误模型。
如果以前安装过分开的 8 个资源目录，请先删除旧目录，避免 CraftEngine 重复注册同一物品。

## 内置皮肤

LiSkin 默认 `skins.yml` 已内置 101 个皮肤：原有 `可爱武器套装 / cutiecatpack`
以及本次移植的堕落天使、阿瑟鲁因动态武器、传奇饰品第一/二卷、饰品扩展第一辑、
趣味帽子和超级英雄饰品。所有背包、羽翼、披风与喷气背包均绑定胸甲槽。

如果服务器没有加载对应 CraftEngine 资源包，请把默认皮肤 ID 改成你自己的 CE 物品 ID。

## 常用指令

- `/liskin` 或 `/liskin menu`：打开综合菜单。
- `/liskin unlock`：手持 CE 物品解锁皮肤，也可以直接点击综合菜单中的“解锁主手皮肤物品”。
- `/liskin apply <皮肤ID>`：给主手物品应用皮肤。
- `/liskin preview <皮肤ID>`：临时试穿皮肤，默认 15 秒后自动恢复。
- `/liskin preview stop`：立即结束当前试穿。
- `/liskin fitting` 或 `/liskin fitting menu`：打开全部服装试衣菜单。
- `/liskin fitting start <皮肤ID>`：直接在旋转玩家人偶上试用指定皮肤。
- `/liskin fitting stop`：结束人偶试衣并返回原位置。
- `/liskin fitting set <a|b>`：管理员设置人偶展示点 A 和玩家观看点 B。
- `/liskin remove`：移除主手物品皮肤并恢复原外观。
- `/liskin wardrobe`：直接打开综合菜单的“已经拥有”筛选。
- `/liskin shop`：直接打开综合菜单的“全部皮肤”筛选。
- `/liskin debug hand`：管理员查看主手物品当前外观字段。
- `/liskin reload`：重载配置。
- `/liskin admin unlock <玩家> <皮肤ID>`：管理员为玩家解锁皮肤。
- `/liskin admin lock <玩家> <皮肤ID>`：管理员移除玩家已解锁皮肤。

## 综合菜单

- `/liskin` 会根据主手物品自动打开“适配主手”皮肤；空手时显示全部皮肤。
- 顶部可直接切换“适配主手 / 全部皮肤 / 已经拥有 / 我的收藏”，不需要反复输入指令。
- 无权限皮肤不会隐藏，会以 `🔒` 锁定状态显示对应权限节点。
- 皮肤统一使用左键购买或应用、右键试穿、Shift+点击收藏或取消收藏。
- 手持解锁、移除皮肤、结束试穿、翻页和关闭都在同一个 54 格菜单中。
- 购买成功后原菜单会立即刷新为“已拥有”，不会关闭，也不需要重新输入指令。
- 收藏在 YAML 模式本服保存，在 MySQL 模式跨服同步。
- `/liskin wardrobe` 与 `/liskin shop` 仅作为兼容旧习惯的快捷入口，旧权限节点仍可使用。

## 常驻 NPC 试衣间

LiSkin 1.9.5 可以在 A 点常驻一个原生玩家人偶 NPC。玩家蹲下并用主手右键 NPC 后，会直接看到全部皮肤的分页菜单；点击服装只启动试衣，不会购买、解锁或修改玩家手中的物品。

管理员设置步骤：

1. 站在模型展示位置执行 `/liskin fitting set a`。
2. 站在玩家观看位置，面向 A 点执行 `/liskin fitting set b`。
3. 执行 `/liskin reload`，或等待设置 A 点后 NPC 自动刷新。

开始试衣后，玩家会传送到 B 点，只看到 A 点生成的个人试穿人偶。人偶套用该玩家自己的皮肤并自动旋转，武器拿在主手，头饰、胸甲、护腿和靴子进入对应装备槽；背包等展示实体会跟随人偶一起旋转。到期、退出、死亡或执行 `/liskin fitting stop` 后，展示实体会清理，玩家按配置返回原位置。

常驻 NPC 被命令或其他方式移除后会自动恢复。服务器无人在线时，LiSkin 会保留 NPC 所在区块的插件加载票，确保它不会因为区块卸载而消失。

## Vault / PlayerPoints 商店

旧配置升级后仍默认使用 Vault，不会自动改变原有皮肤的扣款方式。若全服商店都使用 PlayerPoints：

```yml
economy:
  default-provider: "PLAYERPOINTS"
  playerpoints:
    display-name: "点券"
```

也可以只让某个皮肤使用点券：

```yml
skins:
  sakura_sword:
    currency: "PLAYERPOINTS"
    price: 500
```

- `currency` 可选 `DEFAULT`、`VAULT`、`PLAYERPOINTS`；`DEFAULT` 继承主配置。
- PlayerPoints 金额必须是 `0` 到 `2147483647` 的整数，`0` 表示免费。
- Vault 和 PlayerPoints 都是运行时软依赖，不会被打入 LiSkin 成品 Jar。
- 购买会先取得跨服事务锁，再检查余额并扣款；数据库提交失败时，会通过本次实际使用的原支付渠道退款。
- 菜单购买不会关闭界面，完成后会直接刷新为已拥有状态。

## Folia 兼容

- `plugin.yml` 已声明 `folia-supported: true`，不需要单独的 Folia 版本。
- 玩家背包、菜单、权限清理与试穿恢复均在玩家实体调度器执行。
- 3D 展示实体的生成、移动和删除均在所属区域/实体调度器执行。
- MySQL 查询以及收藏、购买、解锁写入均走异步调度，不阻塞区域线程。
- 全局周期任务只负责分发，不会在全局线程直接读取或修改玩家实体。

## 跨服安全模式

单服默认使用 `YAML`。群组服必须让所有子服连接同一个 MySQL，并为每台子服设置不同的 `server-id`：

```yml
storage:
  type: "MYSQL"
  server-id: "survival-1"
  cache-refresh-seconds: 3
  purchase-lock-seconds: 30
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "minecraft"
    username: "liskin"
    password: "change_me"
    table-prefix: "liskin_"
    migrate-yaml: true
```

- MySQL 模式把数据库作为唯一可信数据源，不会同时写本服 `players.yml`。
- MySQL 模式下未解锁皮肤不能走 `consume`/`both` 的直接消耗套用路径，必须先通过综合菜单安全解锁；这是为了避免跨服背包同步延迟产生重复外观物品。
- 商店购买和手持 CE 物品解锁共用数据库唯一事务锁。同一玩家即使同时卡在两个子服，也只能由一台子服完成该皮肤的扣费或物品消耗。
- 商店先取得跨服锁再扣款；数据库提交失败会尝试自动退款。手持解锁先取得跨服锁再消耗物品；提交失败会把物品退还。
- 玩家进服前会强制刷新解锁数据。数据库不可用时会拒绝进入，避免用旧缓存跨服绕过皮肤权限。
- 在线玩家缓存默认每 3 秒刷新解锁与收藏数据，刷新后会重新检查背包和装备；无权限或未解锁的已换皮物品会恢复默认外观。
- 默认创建 `liskin_unlocks`、`liskin_purchase_locks`、`liskin_favorites` 三张表。
- 首次启用且对应 MySQL 数据表为空时，`migrate-yaml: true` 会导入当前本服 `players.yml` 中的解锁与收藏记录。切换前请先备份各服数据，并只选择一台子服首先启动完成迁移。
- MySQL Connector/J 不打进插件 Jar。插件首次以 `MYSQL` 启动时会下载到 `plugins/LiSkin/lib/`；如果网络受限，可按 `config.yml` 中的版本和 URL 手动放置对应 Jar。
- `storage.type` 的切换需要完整重启服务器，不能只执行 `/liskin reload`。

## 最小皮肤配置

```yml
skins:
  sakura_sword:
    name: "<pink>樱花剑</pink>"
    ce-item: "example:sakura_sword"
    target-group: "sword"
```

## 完整字段说明

```yml
skins:
  sakura_sword:
    name: "<pink>樱花剑</pink>"
    ce-item: "example:sakura_sword"
    item-model: "example:sakura_sword"
    copy-equippable: false
    equipment-model: ""
    equipment-slot: ""
    display-entity: false
    display-slot: "CHEST"
    display-transform: "HEAD"
    display-offset-side: 0.0
    display-offset-up: 1.55
    display-offset-back: 0.0
    display-scale: 1.0
    target-group: "sword"
    permission: "liskin.skin.sakura"
    currency: "DEFAULT"
    price: 0.0
```

- `ce-item`：用于解锁、商店展示、创建外观来源物品的 CraftEngine 物品 ID。应用皮肤时，LiSkin 会先让 CraftEngine 执行 S2C 客户端态转换，再从转换后的源物品提取真实外观组件。
- `item-model`：写入目标物品的 `item_model` 组件兜底值。正常情况下优先使用 CraftEngine S2C 后源物品里的真实 `item_model`，这样可以兼容 CE 的 client-bound-data 与 item model 混淆。
- `craftengine-id` / `ce-identity`：从 1.7.1 起停用并忽略。身份标签会让 CraftEngine 按皮肤源物品的客户端材质渲染，可能把钻石剑显示成铁剑；LiSkin 现在只提取视觉组件。
- `copy-equippable`：是否同步处理 `equippable` 穿戴外观组件。盔甲/头饰建议开启。
- `equipment-model`：对应 `equippable` 的模型/资产 ID。普通 3D 头饰通常填 `none`，表示移除原版头盔 armor renderer，让客户端按 `item-model` 渲染头部物品；完整盔甲套装则填 CE 装备资产 ID，例如 `inkless:allay`。
- `equipment-slot`：强制写入 `equippable.slot`。3D 头饰建议填 `HEAD`，避免穿戴时槽位不正确导致不显示。
- `display-entity`：适合“只有 3D 物品模型、没有 CE 装备资产”的穿戴外观，例如背包套胸甲。开启后 LiSkin 会生成一个跟随玩家的 `ItemDisplay`，同时保留原物品全部属性。
- `display-slot`：从哪个装备槽读取皮肤物品，常用 `CHEST` / `HEAD`。
- `display-transform`：ItemDisplay 使用的物品显示变换，常用 `HEAD` / `FIXED`。如果模型位置不对，优先改这里和下面的偏移值。
- `display-offset-side` / `display-offset-up` / `display-offset-back`：显示实体相对玩家的左右、高度、背后偏移。
- `display-scale`：显示实体整体缩放。
- `permission`：皮肤权限，留空表示无额外权限。
- `currency`：`DEFAULT` 继承全局货币，也可指定 `VAULT` 或 `PLAYERPOINTS`。
- `price`：商店价格，`0.0` 表示免费；PlayerPoints 价格必须是非负整数。

## 权限保护与试穿

- `liskin.skin.use`：允许玩家持有并显示 LiSkin 皮肤。玩家缺少该权限时，拿到已换皮武器或装备会自动恢复默认外观。
- `liskin.category.<分类>`：限制对应分类皮肤，例如 `liskin.category.sword`。
- 每个皮肤还可以通过 `permission` 配置独立权限。
- 可配合 LuckPerms 管理以上 Bukkit 权限；未安装 LuckPerms 时仍使用服务器原生权限判定。
- `/liskin preview <皮肤ID>` 或在综合菜单右键皮肤可以试穿。
- 试穿不会解锁或购买皮肤；到期、切换物品、移动背包、死亡、退出和插件关闭时都会恢复。
- 试穿时间、是否允许试穿未解锁皮肤以及 GUI 提示可在 `config.yml` 的 `preview` 节点配置。

注意：`item-model` 填的是 CraftEngine 生成的物品模型 ID，例如 `cutiecatpack:cute_pickaxe`，不是 CE 配置里 `model: cutiecatpack:cutiecatpack/pickaxe` 这种模型文件路径。若 CE 物品没有单独配置 `item-model`，通常直接填它的 `ce-item` 即可。

## 盔甲 / 头饰示例

3D 头饰：

```yml
cat_ears:
  name: "<aqua>猫耳</aqua>"
  ce-item: "cutiecatpack:ears"
  item-model: "cutiecatpack:ears"
  copy-equippable: true
  equipment-model: "none"
  equipment-slot: "HEAD"
  target-group: "helmet"
```

完整装备资产：

```yml
allay_helmet:
  name: "<aqua>悦灵头盔</aqua>"
  ce-item: "inkless:allay_helmet"
  item-model: "inkless:allay_helmet"
  copy-equippable: true
  equipment-model: "inkless:allay"
  target-group: "helmet"
```

## 外观保存与还原

LiSkin 会在物品 PDC 中写入自己的私有键：

- `liskin:skin_id`
- `liskin:owner`
- `liskin:original_visual`
- `liskin:original_material`

这些数据只用于识别皮肤、还原原始视觉字段和锁定原物品材质，不会覆盖其他插件的数据。移除皮肤或无权限自动还原时，原物品品质必须保持不变，例如钻石剑仍然是钻石剑。
