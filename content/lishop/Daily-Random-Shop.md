# 每日随机商店

每日随机商店通过 `daily-random.yml` 配置商品池，每天从商品池中抽取固定数量商品展示。

玩家打开：

```text
/shop daily
```

管理员强制刷新当天随机结果：

```text
/shop daily refresh
```

## 配置文件

文件位置：

```text
plugins/liShop/daily-random.yml
```

示例：

```yaml
enabled: true
selection-size: 5
seed-mode: DATE

pool:
  daily_diamond:
    material: DIAMOND
    amount: 1
    name: "<aqua>每日钻石</aqua>"
    lore:
      - "<dark_gray>每日随机商店限定商品</dark_gray>"
    buy-price: 450.0
    stock: 32
```

## 字段说明

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用每日随机商店 |
| `selection-size` | 每日抽取数量，范围 1 到 45 |
| `seed-mode` | `DATE` 同一天固定结果，`RANDOM` 每次刷新随机 |
| `pool` | 候选商品池 |

商品字段：

| 字段 | 说明 |
| --- | --- |
| `material` | Bukkit Material 名称 |
| `item-stack` | 可选，游戏内编辑器保存的完整 Bukkit ItemStack，用于保留 CraftEngine 等自定义物品数据 |
| `amount` | 每次购买数量 |
| `name` | 显示名，支持 MiniMessage |
| `lore` | 描述，支持 MiniMessage |
| `buy-price` | 今日购买价格，小于 0 表示不可购买 |
| `stock` | 今日库存，`-1` 表示无限 |

## 数据保存

每日抽取结果和今日库存保存在：

```text
plugins/liShop/datas/runtime.yml
```

## 游戏内编辑

打开每日商品池编辑器：

```text
/shop editor daily random
```

支持：

- 编辑每日商品池。
- 调整每日商品价格。
- 调整每日商品每次购买数量。
- 调整每日商品库存。
- 删除每日商品。
- 读取主手物品新增到每日商品池。
- 强制刷新当天随机结果。

## 新增主手物品

在 `/shop editor daily random` 界面点击“新增主手物品”按钮。

插件会读取：

- 主手物品材料。
- 主手物品数量。
- 主手物品完整 Bukkit ItemStack，用于保留 CraftEngine 等自定义物品数据。

新增商品默认价格和库存由 `config.yml` 控制：

```yaml
editor:
  daily-default-price: 100.0
  daily-default-stock: 16
```

该操作只读取主手物品，不会消耗玩家手中的物品。
