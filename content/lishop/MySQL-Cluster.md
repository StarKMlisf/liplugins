# MySQL 多服互通

liShop `1.9.0` 在 MySQL 模式下使用结构化共享状态，不再依赖多个子服互相覆盖整份 YAML 快照。

## 配置

所有子服的 `advanced.yml` 必须连接同一个数据库：

```yaml
storage:
  type: MYSQL
  mysql:
    host: 127.0.0.1
    port: 3306
    database: lishop
    username: root
    password: "修改为实际密码"
    use-ssl: false
    pool-size: 10
    connect-timeout-millis: 5000
    socket-timeout-millis: 10000
    cluster-sync:
      enabled: true
```

完成配置后完整重启所有子服。启动日志出现“`MySQL 跨服共享状态已启用`”表示初始化成功。

## 共享内容

- 普通商店限量库存与补货时间。
- 每日购买、每日回收和农作物每日收购个人额度。
- 每日随机商店结果与库存。
- 动态价格交易统计。
- 礼包每日和永久购买次数。
- liShop 内置经济余额。
- 玩家交易所上架、待领取和近期成交记录。

## 不自动共享的内容

- `shops/`、`menus/`、`config.yml` 和 CraftEngine 资源包仍需在各子服保持一致。
- Citizens NPC 绑定属于各子服配置。
- Vault 和 PlayerPoints 的余额由对应经济插件管理，需要为这些插件单独启用其 MySQL 互通。

## 数据表

liShop 自动创建：

- `lishop_snapshots`
- `lishop_shared_state`
- `lishop_exchange_listings`
- `lishop_exchange_claims`
- `lishop_exchange_transactions`
- `lishop_exchange_meta`

不要为每个子服配置不同数据库前缀，否则无法互通。

## 并发规则

- 库存和个人额度使用 MySQL 条件更新原子预占。
- 定时补货使用比较并交换，只有一个子服执行同一轮补货。
- 交易所购买、下架和领取使用事务及 `SELECT ... FOR UPDATE`。
- 数据库异常时取消强一致交易，避免自动退回单服状态造成复制物品。
- Redis 仍可用于降低跨服同时请求时的重复工作，但 MySQL 原子状态本身不要求必须安装 Redis。

## 从旧版本升级

1. 停止所有子服并备份 `plugins/liShop/` 和 MySQL。
2. 在一台子服上先启动 `1.9.0`，等待表创建和旧交易所数据导入完成。
3. 确认没有数据库错误后，再启动其他子服。
4. 使用两个不同子服分别上架、购买并检查库存和个人额度。

`%lishop_cluster%` 返回 `true` 表示当前实例已启用 MySQL 共享状态。
