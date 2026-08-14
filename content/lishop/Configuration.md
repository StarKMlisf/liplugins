# 主配置说明

主配置文件：`plugins/liShop/config.yml`

所有文本消息支持 MiniMessage 格式，例如：

```text
<green>成功</green>
<gradient:#00ffaa:#66ccff>渐变文字</gradient>
```

## debug

```yaml
debug: false
```

是否输出更多调试日志。

## language

```yaml
language:
  default: zh_CN
```

当前仅作为语言标识和后续扩展预留。

## menu

```yaml
menu:
  auto-open: true
  default-menu: main
  sync-bundled-layouts-on-upgrade: true
  click-cooldown-ticks: 5
  ignore-click-outside: true
```

- `auto-open`：`/shop` 无参数时是否打开默认菜单。
- `default-menu`：默认菜单 ID，对应 `menus/main.yml`。
- `sync-bundled-layouts-on-upgrade`：首次升级时备份并同步内置示例布局，不处理玩家自行新增的菜单。
- `click-cooldown-ticks`：交易点击冷却，20 tick = 1 秒。
- `ignore-click-outside`：点击空白区域是否忽略。

## trade

```yaml
trade:
  give-method: SMART
  sell-match-method: BUKKIT
  max-amount: 2304
  shift-click-multiplier: 5
  refresh-menu-after-trade: true
```

- `give-method`：当前交易前都会检查背包容量，`SMART` 是推荐值。
- `sell-match-method`：`BUKKIT` 只匹配材料，`STRICT` 同时匹配显示名。
- `max-amount`：单次交易最大数量。
- `shift-click-multiplier`：Shift 点击批量交易倍数。
- `refresh-menu-after-trade`：交易成功后是否刷新 GUI。

## commands

```yaml
commands:
  shortcuts:
    resources: blocks
```

左侧是 `/shop` 后的快捷参数，右侧是菜单 ID。例如 `/shop resources` 会打开 `menus/blocks.yml`。

## economy

```yaml
economy:
  prefer-vault: true
  fallback-internal: true
  default-balance: 1000.0
```

- `prefer-vault`：优先挂钩 Vault。
- `fallback-internal`：Vault 不可用时启用内置余额。
- `default-balance`：新玩家内置余额初始值。

## data

```yaml
data:
  auto-save: true
  auto-save-period-ticks: 6000
```

控制余额、库存和交易所数据自动保存。

## editor

```yaml
editor:
  price-step: 10.0
  amount-step: 1
  stock-step: 16
  daily-default-price: 100.0
  daily-default-stock: 16
  add-item-default-buy-price: 100.0
  add-item-default-sell-price: 25.0
  add-item-default-stock: -1
```

控制游戏内编辑器按钮步长，以及从主手或背包新增商品时的默认价格和库存。

## daily-random

```yaml
daily-random:
  timezone: Asia/Shanghai
```

每日随机商店判断日期使用的时区。

## exchange

```yaml
exchange:
  enabled: true
  max-listings-per-player: 10
  min-price: 1.0
  max-price: 100000000.0
  listing-fee-fixed: 0.0
  listing-fee-rate: 0.01
  tax-rate: 0.05
  expire-hours: 72
  history-limit: 500
```

- `enabled`：是否启用玩家交易所。
- `max-listings-per-player`：每个玩家最多同时上架数量。
- `min-price` / `max-price`：允许的整组上架总价范围。
- `listing-fee-fixed` / `listing-fee-rate`：固定和按比例上架费。
- `tax-rate`：交易税率，卖家收到 `price * (1 - tax-rate)`。
- `expire-hours`：过期后转入领取箱的小时数。
- `history-limit`：用于近期均价的成交记录上限。

## restock

```yaml
restock:
  check-period-ticks: 1200
```

控制有限库存商品自动补货规则的统一检查周期。插件只运行一条全局检查任务。

## dependencies

```yaml
dependencies:
  check-vault: true
  check-placeholderapi: true
  runtime-download-enabled: true
```

- `check-vault`：是否提示 Vault 状态。
- `check-placeholderapi`：是否检测并注册 liShop 变量。
- `runtime-download-enabled`：是否允许按需下载 SQLite/MySQL JDBC 驱动到 `lib/`。

## recycle-limit

```yaml
recycle-limit:
  enabled: true
  timezone: Asia/Shanghai
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

控制玩家通过普通商店右键出售/回收物品的每日数量。

- `enabled`：是否启用每日回收上限。
- `timezone`：日期重置使用的时区。
- `default-limit`：没有特殊权限时的每日上限，`-1` 表示无限。
- `groups`：权限组上限配置。
- 玩家拥有多个回收权限时，插件取最高上限。
- 任意匹配组的 `daily-limit: -1` 表示该玩家无限回收。

## purchase-limit

```yaml
purchase-limit:
  enabled: true
  timezone: Asia/Shanghai
  default-limit: 640
```

控制玩家通过普通商店左键购买的每日数量，用于防止囤货。

## dynamic-pricing

```yaml
dynamic-pricing:
  enabled: true
  timezone: Asia/Shanghai
  value-fallback-enabled: true
  min-multiplier: 0.5
  max-multiplier: 2.5
  stock-influence: 0.75
  trade-influence: 0.5
  trade-normalizer: 512
```

控制普通商店价格浮动。库存减少和购买热度增加会推高价格，回收量增加会压低价格。

数据库、Redis、Citizens、交易所白名单/黑名单和物品源设置见 [高级架构配置](Advanced-Architecture.md)。
