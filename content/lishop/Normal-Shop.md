# 普通商店配置

普通商店由两个配置层组成：

- `menus/*.yml`：菜单布局。
- `shops/*.yml`：商店商品数据。

菜单和商店分离，一个菜单可以绑定一个商店。

## 菜单配置

示例：`menus/main.yml`

```yaml
title: "<gradient:#00ffaa:#66ccff>服务器商店</gradient>"
size: 54
shop: blocks

decorations:
  border:
    material: BLACK_STAINED_GLASS_PANE
    name: " "
    slots: [0,1,2,3,4,5,6,7,8]

products:
  stone:
    slot: 20
  oak_log:
    slot: 22
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `title` | GUI 标题，支持 MiniMessage |
| `size` | GUI 大小，必须是 9 的倍数，范围 9 到 54 |
| `shop` | 绑定商店 ID，对应 `shops/<id>.yml` |
| `decorations` | 装饰按钮，只显示，不交易 |
| `products` | 每页商品显示槽位模板，商品会按 `shops/*.yml` 中的顺序分页填入这些槽位 |

## 分页规则

- `menus/*.yml` 里的 `products` 槽位会作为每一页的商品显示模板。
- 商品实际顺序来自 `shops/<商店ID>.yml` 的 `products` 配置顺序。
- 商品数量超过一页可显示数量时，菜单右下角会出现“下一页”，左下角会出现“上一页”。
- 下一页/上一页按钮会覆盖对应位置的装饰按钮。

## 商店配置

示例：`shops/blocks.yml`

```yaml
display-name: "<gradient:#00ffaa:#66ccff>基础资源商店</gradient>"

products:
  stone:
    material: STONE
    amount: 16
    name: "<gray>石头</gray>"
    lore:
      - "<dark_gray>基础建筑材料</dark_gray>"
      - "<green>左键购买</green> <red>右键出售</red> <yellow>Shift 批量</yellow>"
    buy-price: 32.0
    sell-price: 8.0
    stock: -1
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `material` | Bukkit Material 名称 |
| `craftengine-id` | 可选，CraftEngine 物品 ID；例如 `customcrops:tomato_seeds`，优先于 `material` |
| `item-stack` | 可选，游戏内编辑器保存的完整 Bukkit ItemStack，用于保留 CraftEngine 等自定义物品数据 |
| `amount` | 每次交易数量 |
| `name` | 商品显示名，支持 MiniMessage |
| `lore` | 商品描述，支持 MiniMessage |
| `buy-price` | 购买价格，小于 0 表示禁止购买 |
| `sell-price` | 出售价格，小于 0 表示禁止出售 |
| `stock` | 全局库存，`-1` 表示无限 |

有限库存商品可以配置自动补货：

```yaml
products:
  diamond:
    stock: 128
    restock:
      enabled: true
      interval-minutes: 60
      amount: 16
      max-stock: 128
```

插件只运行一条全局补货检查任务，不会为每件商品单独创建定时器。服务器离线期间错过的补货周期会在启动后按周期数补齐，但不会超过 `max-stock`。

## 交易方式

- 左键：购买。
- 右键：出售。
- Shift 左键：关闭菜单，在聊天输入本次购买数量。
- Shift 右键：关闭菜单，在聊天输入本次出售数量。

聊天输入数量后会立即执行本次购买或出售，并返回原商店页。输入 `cancel` 或 `取消` 可取消。本次输入数量受 `trade.max-amount` 限制。

## 每日回收数量上限

普通商店的右键出售会计入每日回收数量。

配置位置：

```yaml
recycle-limit:
  enabled: true
  default-limit: 640
  groups:
    vip:
      permission: lishop.recycle.vip
      daily-limit: 1280
```

玩家拥有多个回收权限时，取最高上限；上限为 `-1` 表示无限。

## 游戏内编辑

使用：

```text
/shop editor normal blocks
```

可以在 GUI 中调整普通商店商品的购买价、出售价、数量和库存。

也可以先使用 `/shop createshop <商店ID> [1-6行]` 创建空商店，再进入 `/shop editor normal <商店ID>`，直接点击背包物品加入商品。通过这种方式加入的商品会写入 `item-stack`，购买发放、背包空间判断和出售匹配都会按完整物品处理。
