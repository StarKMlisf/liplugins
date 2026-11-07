# 常见问题

## 为什么没有 Vault 也能买东西？

因为插件启用了内置余额兜底：

```yaml
economy:
  fallback-internal: true
```

如果安装了 Vault 和经济插件，并且 `prefer-vault: true`，插件会优先使用 Vault。

## 为什么商品卖不出去？

检查：

- 商品 `sell-price` 是否小于 0。
- 玩家背包里是否有足够数量。
- `trade.sell-match-method` 是否设置为 `STRICT`。
- 是否达到 `recycle-limit` 每日回收数量上限。

如果是 `STRICT`，出售物品必须同时匹配材料和显示名。

## 不同权限组能有不同每日回收数量吗？

可以，在 `config.yml` 配置：

```yaml
recycle-limit:
  enabled: true
  default-limit: 640
  groups:
    vip:
      permission: lishop.recycle.vip
      daily-limit: 1280
    svip:
      permission: lishop.recycle.svip
      daily-limit: 2560
    mvp:
      permission: lishop.recycle.mvp
      daily-limit: -1
```

玩家拥有多个权限时，插件取最高上限；`-1` 表示无限。

## 库存 -1 是什么意思？

`-1` 表示无限库存。

普通商店和每日随机商店都使用这个规则。

## 每日随机商店什么时候刷新？

每日随机商店按 `config.yml` 的时区判断日期：

```yaml
daily-random:
  timezone: Asia/Shanghai
```

日期变化后会自动抽取新的每日商品。

管理员也可以手动执行：

```text
/shop daily refresh
```

## 如何游戏内编辑每日商品池？

执行：

```text
/shop editor daily random
```

需要权限：

```text
lishop.admin
```

## 玩家交易所上架后物品去哪了？

物品会从玩家主手移除，并保存到：

```text
plugins/liShop/datas/exchange.yml
```

其他玩家购买后，物品会发放给买家。

## 可以使用玩家头颅吗？

可以。把已经带有玩家名或纹理的头颅放在背包中，通过 `/shop editor normal <商店ID>` 点击加入。编辑器会保存完整 Bukkit `ItemStack`，购买后仍保留头颅元数据。

只手写 `material: PLAYER_HEAD` 仍只会得到普通头颅，因为当前商品字段没有独立的 `skull-owner` 或 Base64 纹理解析器。HeadDatabase 物品建议同样通过游戏编辑器保存现成物品。

## 交易所打开时报 MiniMessage 旧颜色代码错误怎么办？

`1.1.2` 已兼容第三方物品 lore 中的 `§` 和 `&` 旧版颜色代码。

如果玩家上架的物品来自其他插件，物品描述里包含旧色码，交易所会自动按旧色码解析，不会再因为 MiniMessage 解析失败导致 `/shop exchange` 崩溃。

## 为什么 Jar 里没有 Vault 或 PlaceholderAPI？

这是设计要求。liShop 只打包自身业务代码，外部依赖由服务器运行环境提供。

## SQLite 或 MySQL 初始化失败怎么办？

检查 `advanced.yml` 的存储类型、数据库地址和账号，并确认 `plugins/liShop/lib/` 中的 JDBC 驱动校验通过。MySQL 跨服模式初始化失败时不会降级到本地状态；插件保留菜单和恢复镜像，但暂停需要共享状态的交易。修复数据库连接后执行 `/shop reload` 或重启子服。

## 如何让多个子服共享库存和交易所？

让所有子服连接同一个 MySQL，将 `storage.type` 设为 `MYSQL`，并启用 `storage.mysql.cluster-sync.enabled`。限量库存、每日额度、动态价格、礼包限购、内置余额和玩家交易所会使用共享表。Redis 是可选的冲突削减层，不是共享状态来源。

## 为什么 Vault 或 PlayerPoints 余额没有跨服同步？

Vault 和 PlayerPoints 是外部经济来源，liShop 只调用它们的 API，不直接修改它们的数据库。需要在对应经济插件中启用 MySQL 或其他跨服同步方案；只有 liShop 内置经济会写入 `lishop_shared_state`。

## Citizens NPC 点击没有反应怎么办？

确认 Citizens 已加载，然后执行 `/shop npc list` 检查 NPC 数字 ID 和绑定动作。`shop:<ID>` 中填写的是 `menus/` 的菜单 ID，并确保玩家拥有 `lishop.use` 及菜单独立权限。

## PlaceholderAPI 有哪些变量？

安装 PlaceholderAPI 后会自动注册 `%lishop_*%` 变量。完整列表见 [高级架构配置](Advanced-Architecture.md#placeholderapi)。如果关闭 `dependencies.check-placeholderapi`，Expansion 也不会注册。
