# 高级架构配置

高级配置文件：

```text
plugins/liShop/advanced.yml
```

## 数据存储

liShop `1.9.0` 支持三种运行数据存储：

- `YAML`
- `SQLITE`
- `MYSQL`

`storage.type` 选择当前启动时读取的主存储。SQLite/MySQL 模式下，插件仍会异步维护 `datas/runtime.yml` 和 `datas/exchange.yml`，作为故障恢复镜像。

数据库使用 `lishop_snapshots` 表保存 `runtime` 与 `exchange` 两类完整 YAML 快照。MySQL 跨服模式还会使用结构化共享表处理交易热路径；快照只承担迁移和故障恢复镜像，不再作为跨服并发时的最终判定依据。

### MySQL 多服互通

将所有子服的 `storage.type` 设为 `MYSQL`，并让它们连接同一个数据库：

```yaml
storage:
  type: MYSQL
  mysql:
    cluster-sync:
      enabled: true
```

启用后，限量库存、购买/回收额度、每日随机库存、动态价格统计、礼包限购、内置余额和玩家交易所都会通过 MySQL 原子条件更新或行锁共享。数据库暂时不可用时，强一致交易会直接取消，不会退回各服内存继续成交。

普通商店与菜单定义仍来自每台服务器的 `shops/`、`menus/`，所有子服应部署同一份配置。Vault 和 PlayerPoints 属于外部经济插件，必须在对应经济插件中单独启用跨服数据库。完整部署说明见 [MySQL 跨服互通](MySQL-Cluster.md)。

### JDBC 驱动

liShop Jar 不包含 JDBC 驱动。首次启用对应数据库时，插件会按 `storage.drivers` 下载驱动到：

```text
plugins/liShop/lib/
```

下载完成后必须通过配置中的 SHA-256 校验才会加载。默认版本：

- SQLite JDBC `3.53.2.0`
- MySQL Connector/J `9.7.0`

关闭 `config.yml` 的 `dependencies.runtime-download-enabled` 后，服主需要自行将相同驱动文件放入 `lib/`。

### 数据迁移

迁移指令：

```text
/shop migrate <当前存储> <目标存储>
```

示例：

```text
/shop migrate YAML SQLITE
/shop migrate SQLITE MYSQL
/shop migrate MYSQL YAML
```

迁移过程在异步线程执行，来源必须是当前 `storage.type`。成功后会自动修改主存储类型并重载插件。开启 `migration.backup-before-migrate` 时，迁移前数据会保存到：

```text
plugins/liShop/backups/migration-时间-来源/
```

## 双层交易锁

本地层始终启用：

- `ReentrantLock(true)` 公平锁。
- 每个商品、交易记录或玩家限购记录使用独立锁键。
- 只进行一次非阻塞抢锁，被占用时立即返回繁忙提示，不等待事件线程。
- 最后一个使用者释放后，本地锁对象会通过引用计数安全清理。

启用 `locks.redis.enabled` 后，锁内执行顺序为：

1. 获取当前服务器的公平本地锁。
2. 使用 Redis `SET key token NX PX lease` 获取分布式锁。
3. 执行锁内库存、余额和交易记录二次检查。
4. 使用 Lua 脚本核对 token 后释放 Redis 锁。
5. 释放本地锁。

Redis 也只尝试一次；返回锁已占用时不会降级，否则会破坏跨服互斥。只有连接、认证或命令执行异常时才自动降级为本地锁，并在 `reconnect-delay-millis` 后尝试恢复 Redis。`lease-millis` 是异常情况下的自动释放租约，不是交易线程等待时间。

Redis 用于减少同一交易键的跨服并发冲突；MySQL 原子条件更新与行锁负责最终状态一致性。Redis 异常时可以降级为本地锁，但 MySQL 共享状态异常时强一致交易会取消，防止各子服分裂成交。

## Citizens NPC

安装 Citizens 后，可直接监听原生 `NPCRightClickEvent`。支持动作：

- `shop:<菜单ID>`
- `daily`
- `bundle`
- `exchange`
- `command:<玩家指令>`

指令绑定：

```text
/shop npc bind <NPC ID> <动作>
/shop npc unbind <NPC ID>
/shop npc list
```

第一次使用绑定指令时会自动开启 `npc.enabled`。也可以直接编辑：

```yaml
npc:
  enabled: true
  click-cooldown-millis: 500
  bindings:
    1: "shop:main"
    2: "daily"
    3: "exchange"
```

Citizens 未安装或未启用时，liShop 会跳过事件注册，不会因为缺失类而启动失败。

## PlaceholderAPI

安装 PlaceholderAPI 后，liShop 会注册标识符 `lishop` 的内置 Expansion。Expansion 设置为持久化模式，执行 `/papi reload` 后仍保持注册。

常用变量：

| 变量 | 内容 |
| --- | --- |
| `%lishop_balance%` | 玩家经济余额 |
| `%lishop_storage%` | 当前主存储类型 |
| `%lishop_cluster%` | MySQL 跨服共享状态是否已启用 |
| `%lishop_purchase_used%` | 今日已购买数量 |
| `%lishop_purchase_limit%` | 今日购买上限，`-1` 表示无限 |
| `%lishop_purchase_remaining%` | 今日剩余购买量 |
| `%lishop_recycle_used%` | 今日已回收数量 |
| `%lishop_recycle_limit%` | 今日回收上限，`-1` 表示无限 |
| `%lishop_recycle_remaining%` | 今日剩余回收量 |
| `%lishop_exchange_listings%` | 玩家当前上架数量 |
| `%lishop_exchange_claims%` | 玩家待领取物品数量 |
| `%lishop_daily_<商店ID>_used%` | 指定每日回收商店已出售量 |
| `%lishop_daily_<商店ID>_limit%` | 指定每日回收商店个人上限 |
| `%lishop_daily_<商店ID>_remaining%` | 指定每日回收商店剩余额度 |
| `%lishop_daily_<商店ID>_multiplier%` | 当前回收比例百分数 |

玩家权限相关变量需要玩家在线，离线解析时返回 `0`。余额、交易所计数和存储类型支持离线解析。

## 物品源兼容

CraftEngine 已提供实际物品创建与完整 `ItemStack` 保存支持。`advanced.yml` 中其他物品源目前用于安装状态检测和后续适配，不代表每个物品插件都已经实现专属物品解析器。
