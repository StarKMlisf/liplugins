# 游戏内编辑器

游戏内编辑器需要权限：

```text
lishop.admin
```

## 普通商店编辑器

创建空商店和同名菜单：

```text
/shop createshop <商店ID> [1-6行]
```

打开：

```text
/shop editor normal <商店ID>
```

示例：

```text
/shop editor normal blocks
```

支持编辑：

- 购买价。
- 出售价。
- 每次交易数量。
- 库存。
- 是否允许购买。
- 是否允许出售。
- 点击玩家背包中的物品，直接新增为商店商品。
- 商品数量超过一页时，可使用上一页/下一页翻页。
- 编辑器底部功能键槽位不会用于放入商品，避免覆盖上一页/下一页等按钮。

点击商品进入详情后，可以选择“精确设置购买价、回收价、交易数量、库存”，然后在聊天输入数值：

- 购买价、回收价输入 `-1` 表示禁用对应交易。
- 库存输入 `-1` 表示无限库存。
- 输入 `cancel` 取消并返回商品详情。
- 删除商品必须按住 Shift 点击删除按钮，防止误操作。

普通商品删除后会同步清理商店 YAML、运行库存和菜单中的显式商品绑定。

编辑结果会写回 `shops/<商店ID>.yml`。

## 背包物品直接新增到普通商店

打开普通商店编辑器：

```text
/shop editor normal blocks
```

在编辑器打开时，点击自己背包里的任意物品，插件会：

1. 读取物品材料、数量、显示名和 lore。
2. 写入 `shops/<商店ID>.yml`。
3. 自动绑定到使用该商店的第一个菜单空槽。
4. 刷新编辑器。

从背包新增商品时会额外保存 Bukkit `item-stack` 字段。CraftEngine、ItemsAdder、Oraxen、HeadDatabase 等写入物品元数据的插件，只要物品本身能被 Bukkit 序列化，就会在购买发放和出售匹配时保留完整物品数据。

默认价格和库存由 `config.yml` 控制：

```yaml
editor:
  add-item-default-buy-price: 100.0
  add-item-default-sell-price: 25.0
  add-item-default-stock: -1
```

## 每日随机商店编辑器

打开：

```text
/shop editor daily random
```

支持编辑：

- 每日商品池。
- 每日商品购买价。
- 每日商品数量。
- 每日商品库存。
- 删除每日商品。
- 从主手物品新增每日商品。
- 强制刷新当天随机结果。
- 商品池数量超过一页时，可使用上一页/下一页翻页。
- 每日池编辑器底部功能键槽位不会用于显示商品，避免覆盖新增、刷新、上一页/下一页等按钮。

编辑结果会写回 `daily-random.yml`。

## 编辑步长

编辑器按钮步长由 `config.yml` 控制：

```yaml
editor:
  price-step: 10.0
  amount-step: 1
  stock-step: 16
```

## 库存规则

- `-1` 表示无限库存。
- `0` 表示售空。
- 大于 `0` 表示剩余可购买数量。

## 禁止购买或出售

普通商店：

- `buy-price: -1` 禁止购买。
- `sell-price: -1` 禁止出售。

每日随机商店：

- `buy-price: -1` 禁止购买。
