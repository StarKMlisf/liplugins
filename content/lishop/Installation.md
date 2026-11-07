# 安装与更新

## 安装

1. 确认服务端使用 Java 21，并位于 Paper、Leaf 或 Folia `26.1.2` 兼容系列。
2. 将 `liShop-1.9.0.jar` 放入服务器 `plugins/` 目录。
3. 启动服务器。
4. 插件会自动生成默认配置。
5. 根据需要修改 `plugins/liShop/config.yml`、`advanced.yml`、`shops/*.yml`、`menus/*.yml`、`daily-random.yml`。
6. 执行 `/shop reload` 重载配置。

## 推荐依赖

`liShop` 可以无 Vault 运行，但生产服务器建议安装：

- `Vault`
- 任意 Vault 经济插件
- `PlaceholderAPI`，用于 `%lishop_*%` 内置变量
- `Citizens`，用于 NPC 原生右键打开商店
- `PlayerPoints`，礼包需要点券货币时安装
- `CraftEngine`，需要通过物品 ID 创建 CraftEngine 商品时安装

没有 Vault 时，插件会启用内置余额，默认新玩家余额由 `config.yml` 的 `economy.default-balance` 控制。

## 更新

1. 停服或确认没有玩家正在交易。
2. 替换旧 Jar。
3. 启动服务器。
4. 对比新旧默认配置，补充新增配置项。
5. 在测试服验证购买、回收、交易所、数据库和自定义物品。

## 当前产物

当前构建产物：

```text
target/liShop-1.9.0.jar
```

## 注意事项

- 插件权限节点已改为 `lishop.use` 和 `lishop.admin`。
- 旧的 `kmianshop.*` 权限节点不再使用。
- 如果从旧版本迁移，建议检查权限组配置。
- SQLite/MySQL 驱动会按需下载到 `plugins/liShop/lib/`；关闭运行时下载后需手动放置驱动。
- 数据存储切换请使用 `/shop migrate <当前存储> <目标存储>`，不要只修改 `storage.type` 后直接覆盖旧数据。
