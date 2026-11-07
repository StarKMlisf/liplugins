# liShop 完整使用手册

适用版本：`1.9.0`

liShop 是通用 GUI 商店插件。农作物商店只是随插件提供的一组示例配置，不是插件的固定业务边界。普通资源、装备、材料、服务器回收、每日随机、礼包和玩家交易所都可以同时使用。

## 兼容环境

| 项目 | 要求 |
| --- | --- |
| Java | Java 21 |
| 编译 API | Paper `1.21.11-R0.1-SNAPSHOT` |
| 目标服务端 | Paper、Leaf、Folia `26.1.2` 系列 |
| Folia 描述 | `folia-supported: true` |
| 必需前置 | 无 |
| 可选前置 | Vault、经济插件、PlayerPoints、PlaceholderAPI、Citizens、CraftEngine |

插件 Jar 只包含 liShop 自身业务代码，外部依赖不会被打入成品。

## 安装

1. 使用 Java 21 启动服务端。
2. 将 `liShop-1.9.0.jar` 放入 `plugins/`。
3. 根据需要安装可选前置。
4. 启动一次服务器生成配置。
5. 修改配置后执行 `/shop reload`。

主要文件结构：

```text
plugins/liShop/
├─ config.yml
├─ messages.yml
├─ advanced.yml
├─ daily-random.yml
├─ bundles.yml
├─ item-values.yml
├─ menus/
├─ shops/
├─ datas/
│  ├─ runtime.yml
│  └─ exchange.yml
├─ lib/
└─ backups/
```

## 五分钟创建商店

```text
/shop createshop minerals 6
/shop editor normal minerals
```

打开编辑器后，点击玩家背包中的物品即可加入商店。再点击商品进入详情，设置购买价、回收价、每次交易数量和库存。完成后使用 `/shop open minerals` 打开同名菜单。

通过背包加入的商品会保存完整 Bukkit `ItemStack`，适合保留 CraftEngine 模型、名称、PDC、附魔和玩家头颅纹理。

## 指令

主指令为 `/shop`，别名为 `/lishop`。

### 玩家指令

| 指令 | 功能 |
| --- | --- |
| `/shop` | 打开默认农作物总菜单 |
| `/shop open [菜单ID]` | 打开 `menus/<ID>.yml` |
| `/shop list` | 列出当前加载的菜单 ID |
| `/shop daily` | 打开独立每日随机商店 |
| `/shop bundle` | 打开礼包商城 |
| `/shop exchange` | 打开玩家交易所 |
| `/shop exchange sell <总价>` | 上架主手整组物品 |
| `/shop exchange mine` | 查看和下架自己的商品 |
| `/shop exchange claims` | 打开退回物品领取箱 |
| `/shop balance` | 查看自己的余额 |
| `/shop <快捷入口>` | 打开 `commands.shortcuts` 对应菜单 |

### 管理指令

| 指令 | 功能 |
| --- | --- |
| `/shop reload` | 保存运行数据并重载配置 |
| `/shop createshop <ID> [1-6行]` | 创建同名商店和菜单 |
| `/shop editor normal <商店ID>` | 编辑普通商店 |
| `/shop editor daily <商店ID>` | 编辑带每日规则的商店商品 |
| `/shop editor daily random` | 编辑独立每日随机商品池 |
| `/shop daily refresh` | 强制重新抽取当天每日商品 |
| `/shop migrate <来源> <目标>` | 在 YAML、SQLite、MySQL 之间迁移 |
| `/shop npc bind <NPC ID> <动作>` | 绑定 Citizens NPC |
| `/shop npc unbind <NPC ID>` | 解除 NPC 绑定 |
| `/shop npc list` | 查看 NPC 绑定 |
| `/shop balance <玩家>` | 查看指定玩家余额 |
| `/shop givebalance <玩家> <金额>` | 增加余额 |
| `/shop takebalance <玩家> <金额>` | 扣除余额 |
| `/shop setbalance <玩家> <金额>` | 设置余额 |

## 权限

| 权限 | 默认值 | 功能 |
| --- | --- | --- |
| `lishop.use` | true | 使用商店、交易所和余额指令 |
| `lishop.admin` | op | 创建、编辑、迁移、NPC 绑定和余额管理 |
| `lishop.bundle` | true | 打开礼包商城 |
| `lishop.recycle.<组名>` | false | 使用对应每日回收上限 |
| `lishop.purchase.<组名>` | false | 使用对应每日购买上限 |

菜单还可以在 `menus/*.yml` 的 `permission` 字段设置独立权限。

## 普通 GUI 商店

普通商店采用布局和商品分离结构：

- `menus/<ID>.yml`：标题、行数、导航、装饰和商品槽位。
- `shops/<ID>.yml`：物品、价格、数量、库存和补货规则。

菜单示例：

```yaml
title: "<dark_gray>矿物商店</dark_gray>"
size: 54
shop: minerals
permission: ""

decorations:
  home:
    material: NETHER_STAR
    name: "<aqua>返回总菜单</aqua>"
    slots: [49]
    open-menu: main

products: {}
```

商品示例：

```yaml
display-name: "<aqua>矿物商店</aqua>"

products:
  diamond:
    material: DIAMOND
    amount: 1
    name: "<aqua>钻石</aqua>"
    lore:
      - "<gray>服务器矿物商品</gray>"
    buy-price: 500.0
    sell-price: 125.0
    stock: 128
    restock:
      enabled: true
      interval-minutes: 60
      amount: 16
      max-stock: 128
```

数值规则：

- `buy-price: -1`：禁止购买。
- `sell-price: -1`：禁止回收。
- `stock: -1`：无限库存。
- `stock: 0`：售罄。
- `amount`：一次基础交易数量。

商品超过一页容量后自动分页，翻页和编辑器工具槽不会被商品覆盖。

## 交易操作

- 左键：按基础数量购买。
- 右键：按基础数量出售。
- Shift 左键：在聊天输入购买数量。
- Shift 右键：在聊天输入出售数量。
- 输入 `cancel` 或 `取消`：取消并返回菜单。

输入数量受 `trade.max-amount` 限制。

## CraftEngine 和完整物品

手写 CraftEngine 商品：

```yaml
products:
  tomato_seed:
    craftengine-id: customcrops:tomato_seeds
    amount: 1
    buy-price: 30.0
    sell-price: -1
    stock: -1
```

也可以在游戏编辑器中直接点击现成物品。编辑器会写入 `item-stack`，GUI 展示和购买发放均使用保存的真实物品，不会把名称替换为 `PAPER` 等底层材料名。

从 `1.8.1` 起，liShop 会监听 `CraftEngineReloadEvent`。首次启动或执行 CraftEngine 重载时，CE 商品会等物品注册表完成后自动载入，不需要配置固定延迟，也不需要再次执行 `/shop reload`。

对于 ItemsAdder、Oraxen、HeadDatabase 等插件，liShop 当前没有承诺通过其专属物品 ID 直接创建物品；但只要物品能被 Bukkit 序列化，通过编辑器保存完整 `ItemStack` 后通常可以保留元数据。

## 每日随机商店

独立每日随机商店配置在 `daily-random.yml`：

```yaml
enabled: true
selection-size: 5
seed-mode: DATE

pool:
  daily_diamond:
    material: DIAMOND
    amount: 1
    name: "<aqua>每日钻石</aqua>"
    buy-price: 450.0
    stock: 32
```

- `selection-size`：每天抽取数量。
- `DATE`：同一天保持固定结果。
- `RANDOM`：每次强制刷新重新随机。
- 编辑入口：`/shop editor daily random`。

编辑器支持调整价格、数量、库存，增加/删除商品和强制刷新当天结果。

## 每日个人回收商店

任意 `shops/*.yml` 都可以增加 `daily-buyback`，不局限于农作物：

```yaml
daily-buyback:
  enabled: true
  selection-size: 50
  personal-daily-limit: 300
  minimum-price-multiplier: 0.5
  timezone: Asia/Shanghai
```

- 每天随机展示 `selection-size` 项。
- 限额按玩家个人计算，不是全服共享。
- 同一商店内所有入选商品共享个人总额度。
- 出售量越接近上限，倍率越接近最低值。
- 状态按钮集中显示已出售量、剩余额度和价格比例。

农作物示例入口为 `/shop open crop_buyback`，配置仍位于普通 `shops/` 和 `menus/` 目录。

## 动态价格和防囤货

```yaml
dynamic-pricing:
  enabled: true
  value-fallback-enabled: true
  min-multiplier: 0.5
  max-multiplier: 2.5
  stock-influence: 0.75
  trade-influence: 0.5
  trade-normalizer: 512
```

库存减少、购买量增加会推高价格；回收量增加会压低价格。倍率受最小值和最大值约束。

每日购买和回收上限可以按权限组设置。玩家拥有多个组权限时取最高值，任一匹配组为 `-1` 时表示无限。

## 礼包商城

`bundles.yml` 支持 Vault 金币、PlayerPoints 点券、每日限购、总限购、多物品奖励和购买广播。`currency` 可填写 `VAULT` 或 `POINTS`。

## 玩家交易所

主要配置：

```yaml
exchange:
  enabled: true
  max-listings-per-player: 10
  min-price: 1.0
  max-price: 100000000.0
  listing-fee-fixed: 0.0
  listing-fee-rate: 0.01
  tax-rate: 0.05
  expire-hours: 72
  history-limit: 500
```

交易所支持搜索、三种排序、近期成交均价、白名单/黑名单、手续费、成交税和过期领取箱。

## YAML、SQLite 和 MySQL

```yaml
storage:
  type: YAML
```

可用值：`YAML`、`SQLITE`、`MYSQL`。SQLite/MySQL 使用 `lishop_snapshots` 表保存 `runtime` 和 `exchange` 故障恢复快照。MySQL 跨服模式另外使用结构化共享表，以原子条件更新和行锁处理库存、额度、动态价格、礼包限购、内置余额和玩家交易所。

```yaml
storage:
  type: MYSQL
  mysql:
    cluster-sync:
      enabled: true
```

所有子服必须连接同一个数据库并部署相同的 `shops/`、`menus/` 配置。Vault 和 PlayerPoints 的跨服余额由对应经济插件负责。详细部署与数据表说明见 [MySQL 跨服互通](MySQL-Cluster.md)。

数据库驱动按需下载到 `plugins/liShop/lib/`，通过 SHA-256 校验后加载。关闭 `dependencies.runtime-download-enabled` 时需要手动提供驱动。

```text
/shop migrate YAML SQLITE
/shop migrate SQLITE MYSQL
/shop migrate MYSQL YAML
```

迁移来源必须是当前活动存储。成功后自动切换和重载；开启备份时数据先保存到 `plugins/liShop/backups/`。

## Redis 分布式锁

```yaml
locks:
  redis:
    enabled: true
    host: 127.0.0.1
    port: 6379
    username: ""
    password: ""
    database: 0
    lease-millis: 5000
    key-prefix: "lishop:lock:"
```

本地锁和 Redis 锁都只尝试一次，被占用时立即返回。Redis 使用 `SET NX PX` 获取锁，并通过 token 校验 Lua 脚本释放。连接异常时自动降级为本地锁；`lease-millis` 是异常自动释放租约，不是线程等待时间。

Redis 负责减少跨服并发冲突，MySQL 原子条件更新和行锁负责最终状态一致性。MySQL 共享状态不可用时，强一致交易会取消，避免降级后产生重复购买或超卖。

## Citizens NPC

检测到 Citizens 后，liShop 注册原生 `NPCRightClickEvent`：

```text
/shop npc bind 1 shop:main
/shop npc bind 2 daily
/shop npc bind 3 bundle
/shop npc bind 4 exchange
/shop npc bind 5 command:shop open blocks
/shop npc list
/shop npc unbind 1
```

动作支持 `shop:<菜单ID>`、`daily`、`bundle`、`exchange` 和 `command:<玩家指令>`。Citizens 缺失时会安全跳过事件注册。

## PlaceholderAPI

检测到 PlaceholderAPI 后自动注册持久化标识符 `lishop`：

| 变量 | 内容 |
| --- | --- |
| `%lishop_balance%` | 玩家余额 |
| `%lishop_storage%` | 当前存储类型 |
| `%lishop_cluster%` | MySQL 跨服共享状态是否启用 |
| `%lishop_purchase_used%` | 今日购买量 |
| `%lishop_purchase_limit%` | 今日购买上限 |
| `%lishop_purchase_remaining%` | 剩余购买量 |
| `%lishop_recycle_used%` | 今日回收量 |
| `%lishop_recycle_limit%` | 今日回收上限 |
| `%lishop_recycle_remaining%` | 剩余回收量 |
| `%lishop_exchange_listings%` | 当前上架数量 |
| `%lishop_exchange_claims%` | 待领取数量 |
| `%lishop_daily_<商店ID>_used%` | 每日商店已出售量 |
| `%lishop_daily_<商店ID>_limit%` | 每日商店个人上限 |
| `%lishop_daily_<商店ID>_remaining%` | 每日商店剩余额度 |
| `%lishop_daily_<商店ID>_multiplier%` | 当前回收比例百分数 |

权限相关变量要求玩家在线；离线解析返回 `0`。余额、存储和交易所计数支持离线解析。

## 数据与性能

- MySQL 跨服交易热路径使用原子条件更新或事务行锁，不依赖各子服缓存作最终判定。
- `runtime.yml` 和 `exchange.yml` 使用合并快照异步保存。
- YAML 采用临时文件原子替换。
- 重载和关闭时等待待写快照完成。
- 同一商品竞争时，未取得锁的请求立即收到繁忙提示。

## 更新旧版本

1. 停服并备份整个 `plugins/liShop/`。
2. 替换 Jar。
3. 保留已有 `shops/`、`menus/` 和数据文件。
4. 对照新版 `config.yml`、`advanced.yml` 补充节点。
5. 在测试服验证数据库、经济、CraftEngine、购买、回收和交易所。

## 常见故障

### `/shop open <ID>` 没有商品

- `<ID>` 必须是菜单 ID。
- 检查 `menus/<ID>.yml` 的 `shop` 指向。
- 检查商品是否有有效 `material`、`craftengine-id` 或 `item-stack`。
- 用 `/shop list` 查看实际加载菜单。

### CraftEngine 商品显示成 PAPER

- 优先使用游戏编辑器保存真实 CE 物品。
- 手写配置时检查完整 `craftengine-id`。
- 确认 CraftEngine 在 liShop 前成功加载。
- 正常启动时应先看到 CE 商品暂缓加载汇总，随后看到“CraftEngine 注册表已完成，CE 商品商店已重新加载”。
- 注册表完成后仍报告无效时，才需要核对 CraftEngine 中是否确实存在该完整 ID。
- 只配置 `material: PAPER` 无法恢复 CE 名称。

### 数据库没有启用

- 检查 `storage.type`、连接地址和账号。
- 检查 `lib/` 中驱动及 SHA-256。
- 初始化失败时插件会记录原因并降级到 YAML。

### NPC 点击无反应

- 确认 Citizens 已启用。
- 用 `/shop npc list` 检查数字 ID 和动作。
- 确认目标菜单能通过指令打开。
- 检查玩家和菜单权限。

更多页面：

- [普通商店](Normal-Shop.md)
- [游戏内编辑器](In-Game-Editor.md)
- [玩家交易所](Player-Exchange.md)
- [高级架构](Advanced-Architecture.md)
- [常见问题](FAQ.md)
