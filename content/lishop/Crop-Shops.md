# 农作物商店

liShop 随包提供一组适配 CraftEngine `customcrops` 农作物包的示例配置。它们仍是普通的 `shops/*.yml` 与 `menus/*.yml`，可删除、改名或替换，不会把 liShop 限制成农作物专用插件。

`1.8.2` 默认 `/shop` 总菜单已经提供种子商店、每日收购、农作物道具商店和玩家交易所四个入口。

## 每日随机收购

`crop_buyback` 每天固定随机展示 50 种农作物。每名玩家拥有独立的每日总出售额度，默认 300 个；出售任意入选农作物都会累计到该玩家自己的额度，不会占用其他玩家的额度。

回收价格按玩家个人当天累计出售量线性下降：当天尚未出售时为基础价格的 100%，达到 300 个个人上限时降至最低 50%。菜单商品说明会实时显示个人已出售数量、剩余额度和当前价格倍率。

可在 `shops/crop_buyback.yml` 的 `daily-buyback` 节点调整：

- `selection-size`：每日随机展示数量。
- `personal-daily-limit`：每名玩家的每日共享出售上限。
- `minimum-price-multiplier`：达到个人上限时的最低价格倍率。
- `timezone`：每日刷新和额度重置时区。

## 前置要求

- 服务端安装并成功加载 `CraftEngine`。
- CraftEngine 中安装用户提供的 `customcrops` 资源包。
- liShop 会通过 CraftEngine API 按 `craftengine-id` 创建真实物品，不会退化成纸、糖或苹果底材。
- liShop `1.8.1` 会等待 `CraftEngineReloadEvent` 后自动刷新这些商店；启动阶段的暂缓加载汇总不代表物品 ID 无效。

## 种子商店

```text
/shop open crop_seeds
```

- 商店文件：`shops/crop_seeds.yml`
- 菜单文件：`menus/crop_seeds.yml`
- 收录 49 个真实存在的种子、幼苗、孢子和菌株。
- 苹果配置只有生长阶段，没有可购买的 `customcrops:apple_seeds`，因此未生成虚假苹果种子。

## 每日收购商店

```text
/shop open crop_buyback
```

- 商店文件：`shops/crop_buyback.yml`
- 菜单文件：`menus/crop_buyback.yml`
- 收录 145 个普通、银星、金星品质收购物品。
- 只允许玩家出售，`buy-price` 固定为 `-1`。
- 回收数量计入 `recycle-limit` 每日上限。
- 普通、银星、金星采用递增价格，并继续受动态价格系统影响。

## 农作物道具商店

```text
/shop open crop_tools
```

- 商店文件：`shops/crop_tools.yml`
- 菜单文件：`menus/crop_tools.yml`
- 收录 27 个农具、洒水器、肥料与农田设施。
- 包含 4 级浇水壶、测试镰刀、3 级洒水器、15 种肥料、种植盆、稻草人、土壤勘测仪和温室玻璃。

## 自定义价格

所有价格都可以在对应 `shops/*.yml` 中修改，也可以使用：

```text
/shop editor normal crop_seeds
/shop editor daily crop_buyback
/shop editor normal crop_tools
```

在游戏内调整价格、数量和库存。

需要 `/shop seeds`、`/shop crops` 等短入口时，可在 `config.yml` 的 `commands.shortcuts` 中自行映射菜单 ID。
