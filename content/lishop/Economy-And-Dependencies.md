# 经济与依赖

## Vault

插件会在运行时尝试挂钩 Vault。

配置：

```yaml
economy:
  prefer-vault: true
  fallback-internal: true
  default-balance: 1000.0
```

逻辑：

1. `prefer-vault: true` 时优先尝试 Vault。
2. Vault 可用时，购买、出售、交易所都使用 Vault 经济。
3. Vault 不可用且 `fallback-internal: true` 时，使用插件内置余额。

## 内置余额

内置余额保存在：

```text
plugins/liShop/datas/runtime.yml
```

管理员可用以下指令管理：

```text
/shop givebalance <玩家> <金额>
/shop takebalance <玩家> <金额>
/shop setbalance <玩家> <金额>
```

## PlaceholderAPI

安装 PlaceholderAPI 后会自动注册 `lishop` 内置 Expansion，例如：

```text
%lishop_balance%
%lishop_purchase_remaining%
%lishop_recycle_remaining%
%lishop_exchange_listings%
%lishop_exchange_claims%
```

完整变量列表见 [高级架构配置](Advanced-Architecture.md#placeholderapi)。

## MiniMessage

插件文本使用 Paper API 自带 Adventure/MiniMessage 能力，不额外打包 Kyori 依赖。

## 依赖打包策略

liShop Jar 不打包外部依赖。

运行时依赖通过服务器已有插件提供：

- Paper API：由服务器提供。
- Vault：由服务器插件提供。
- PlaceholderAPI：由服务器插件提供。

SQLite JDBC 和 MySQL Connector/J 也不会打入 liShop Jar。选择对应存储时，插件会按 `advanced.yml` 下载到 `plugins/liShop/lib/` 并校验 SHA-256；也可以关闭自动下载后手动放置。

Citizens 和 CraftEngine 都是软依赖。未安装时，NPC 原生点击或 CraftEngine ID 创建功能会保持关闭，不会阻止普通 Bukkit 商品商店启动。
