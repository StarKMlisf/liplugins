# liShop Wiki

当前版本：`1.9.0`

`liShop` 是一个基于 Bukkit/Paper API 的通用服务器商店插件，提供普通 GUI 商店、每日随机商店、个人每日回收商店、玩家交易所、游戏内编辑器、礼包商城和数据库存储。

## 页面索引

- [完整使用手册](Complete-Guide.md)
- [安装与更新](Installation.md)
- [指令与权限](Commands-And-Permissions.md)
- [主配置说明](Configuration.md)
- [普通商店配置](Normal-Shop.md)
- [农作物商店](Crop-Shops.md)
- [每日随机商店](Daily-Random-Shop.md)
- [礼包商城](Bundle-Mall.md)
- [玩家交易所](Player-Exchange.md)
- [动态价格与防囤货](Dynamic-Pricing-And-Anti-Hoarding.md)
- [游戏内编辑器](In-Game-Editor.md)
- [经济与依赖](Economy-And-Dependencies.md)
- [高级架构配置](Advanced-Architecture.md)
- [MySQL 多服互通](MySQL-Cluster.md)
- [常见问题](FAQ.md)
- [论坛发布介绍](Forum-Introduction.md)

## 核心功能

- `/shop` 打开农作物商店总菜单，包含种子、每日收购、农作物道具和玩家交易所入口。
- `/shop daily` 打开独立每日随机商店。
- `/shop bundle` 打开礼包商城。
- `/shop exchange` 打开玩家交易所。
- `/shop list` 查看当前加载的全部菜单 ID。
- `/shop open <菜单ID>` 打开任意菜单。
- `config.yml` 的 `commands.shortcuts` 可为任意菜单增加快捷入口。
- `/shop editor normal <商店ID>` 游戏内编辑普通商店。
- `/shop editor daily random` 游戏内编辑每日随机商品池。
- `/shop createshop <商店ID> [1-6行]` 游戏内创建商店和菜单。
- 普通商店编辑器和每日随机商品池编辑器支持上一页/下一页。
- 普通商店编辑器支持直接点击背包物品新增商品并绑定菜单空槽。
- 普通商店支持分页，商品超过菜单商品槽位数量时自动显示上一页/下一页按钮。
- 普通商店支持 Shift+左键/右键后在聊天输入本次购买/出售数量。
- 局内新增普通商品和每日商品会保存完整 `ItemStack`，可保留 CraftEngine 等自定义物品数据。
- Vault 存在时优先使用 Vault 经济；Vault 不存在时使用插件内置余额。
- 支持按权限组设置每日回收数量上限。
- 支持按权限组设置每日购买数量上限，防止囤货。
- 支持库存和成交热度驱动的价格浮动。
- 支持材料基础价值表，让未配置回收价的物品也有价值。
- 礼包商城支持 Vault 金币和 PlayerPoints 点券。
- 普通库存、每日库存、限购计数、补货时间和动态价格统计使用并发内存状态，交易时不直接读写 YAML。
- `runtime.yml` 与 `exchange.yml` 使用合并快照、异步写盘和临时文件原子替换，降低高并发交易时的主线程磁盘开销。
- 支持 YAML、SQLite、MySQL 主存储以及三者之间的双向迁移。
- 支持非阻塞 Redis 分布式交易锁，故障时自动降级为本地公平锁。
- 支持 Citizens 原生 NPC 右键绑定和 liShop 内置 PlaceholderAPI 变量。

## 文件结构

插件首次启动后会生成以下主要目录和文件：

```text
plugins/liShop/
├─ config.yml
├─ messages.yml
├─ daily-random.yml
├─ menus/
│  └─ main.yml
├─ shops/
│  └─ blocks.yml
├─ datas/
│  ├─ runtime.yml
│  └─ exchange.yml
├─ lib/
├─ items/
└─ languages/
```

## 兼容说明

- 插件按 Paper `1.21.11-R0.1-SNAPSHOT` API 编译，并加入 Folia 调度兼容。
- 业务逻辑使用 Bukkit 标准 API，不依赖 Paper 独占能力。
- Jar 不打包 Paper、Vault、PlaceholderAPI、Kyori 等外部依赖。
