# 动态价格与防囤货

liShop 从 `1.1.1` 开始支持普通商店动态价值系统。

## 目标

- 防止玩家低价大量囤货。
- 让商品价格随库存和成交热度浮动。
- 让没有单独配置回收价的物品也能通过基础价值表获得回收价值。

## 每日购买上限

配置位置：`config.yml`

```yaml
purchase-limit:
  enabled: true
  timezone: Asia/Shanghai
  default-limit: 640
  groups:
    vip:
      permission: lishop.purchase.vip
      daily-limit: 1280
    svip:
      permission: lishop.purchase.svip
      daily-limit: 2560
    mvp:
      permission: lishop.purchase.mvp
      daily-limit: -1
```

规则：

- 普通玩家每天最多购买 `default-limit` 个商品单位。
- 玩家拥有多个购买权限时，取最高上限。
- `daily-limit: -1` 表示无限购买。
- 每天按 `timezone` 自动重置。

## 每日回收上限

配置位置：`config.yml`

```yaml
recycle-limit:
  enabled: true
  default-limit: 640
```

右键出售/回收会计入每日回收数量。

## 动态价格

配置位置：`config.yml`

```yaml
dynamic-pricing:
  enabled: true
  value-fallback-enabled: true
  min-multiplier: 0.5
  max-multiplier: 2.5
  stock-influence: 0.75
  trade-influence: 0.5
  trade-normalizer: 512
```

价格倍率由两部分组成：

- 库存影响：库存越少，价格越高；库存越多，价格越低。
- 成交影响：购买量大于回收量时涨价，回收量大于购买量时降价。

最终倍率会限制在 `min-multiplier` 和 `max-multiplier` 之间。

## 物品基础价值

配置位置：`item-values.yml`

```yaml
default-value: 1.0
values:
  STONE: 0.5
  OAK_LOG: 2.0
  DIAMOND: 125.0
```

当商品没有配置 `sell-price`，并且 `dynamic-pricing.value-fallback-enabled: true` 时，插件会使用 `item-values.yml` 里的材料价值作为回收基础价。

## 数据保存

动态价格统计数据保存在：

```text
plugins/liShop/datas/runtime.yml
```

每日会重置当日成交热度。
