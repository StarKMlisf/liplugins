# 指令与权限

## 主指令

```text
/shop
/lishop
```

`/lishop` 是 `/shop` 的别名。

## 玩家指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/shop` | 打开 `menu.default-menu` 指定的通用总菜单 | `lishop.use` |
| `/shop open [菜单ID]` | 打开指定菜单 | `lishop.use` |
| `/shop list` | 查看已加载菜单 ID | `lishop.use` |
| `/shop <快捷入口>` | 打开 `commands.shortcuts` 映射的菜单 | `lishop.use` |
| `/shop daily` | 打开独立每日随机商店 | `lishop.use` |
| `/shop bundle` | 打开礼包商城 | `lishop.bundle` |
| `/shop exchange` | 打开玩家交易所 | `lishop.use` |
| `/shop exchange sell <价格>` | 上架主手物品 | `lishop.use` |
| `/shop exchange mine` | 查看自己的上架商品并下架 | `lishop.use` |
| `/shop exchange claims` | 打开过期和退回物品领取箱 | `lishop.use` |
| `/shop balance` | 查看自己的余额 | `lishop.use` |
| `/shop help` | 查看帮助 | `lishop.use` |

## 管理指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/shop reload` | 重载配置 | `lishop.admin` |
| `/shop createshop <商店ID> [1-6行]` | 游戏内创建同名商店配置和菜单配置 | `lishop.admin` |
| `/shop editor normal <商店ID>` | 打开普通商店编辑器 | `lishop.admin` |
| `/shop editor daily <商店ID>` | 编辑带每日规则的普通商店商品 | `lishop.admin` |
| `/shop editor daily random` | 打开独立每日随机商品池编辑器 | `lishop.admin` |
| `/shop daily refresh` | 强制刷新当天随机结果 | `lishop.admin` |
| `/shop migrate <来源> <目标>` | 在 YAML、SQLite、MySQL 之间迁移并切换存储 | `lishop.admin` |
| `/shop npc bind <NPC ID> <动作>` | 绑定 Citizens NPC 打开菜单或执行动作 | `lishop.admin` |
| `/shop npc unbind <NPC ID>` | 解除 NPC 绑定 | `lishop.admin` |
| `/shop npc list` | 查看 NPC 绑定 | `lishop.admin` |
| `/shop balance <玩家>` | 查看指定玩家余额 | `lishop.admin` |
| `/shop givebalance <玩家> <金额>` | 增加玩家余额 | `lishop.admin` |
| `/shop takebalance <玩家> <金额>` | 扣除玩家余额 | `lishop.admin` |
| `/shop setbalance <玩家> <金额>` | 设置玩家余额 | `lishop.admin` |

## 权限节点

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `lishop.use` | true | 允许打开商店、交易所和查看余额 |
| `lishop.admin` | op | 允许重载、编辑商店、刷新每日商店和管理余额 |
| `lishop.bundle` | true | 允许打开礼包商城 |
| `lishop.recycle.vip` | false | 使用 `recycle-limit.groups.vip.daily-limit` 的每日回收上限 |
| `lishop.recycle.svip` | false | 使用 `recycle-limit.groups.svip.daily-limit` 的每日回收上限 |
| `lishop.recycle.mvp` | false | 使用 `recycle-limit.groups.mvp.daily-limit` 的每日回收上限 |
| `lishop.purchase.vip` | false | 使用 `purchase-limit.groups.vip.daily-limit` 的每日购买上限 |
| `lishop.purchase.svip` | false | 使用 `purchase-limit.groups.svip.daily-limit` 的每日购买上限 |
| `lishop.purchase.mvp` | false | 使用 `purchase-limit.groups.mvp.daily-limit` 的每日购买上限 |

## Tab 补全

插件已为主指令、子指令、菜单 ID、商店 ID、玩家名和部分数值参数提供 Tab 补全。
