# 玩家交易所

玩家交易所允许玩家上架主手物品，其他玩家用经济余额购买。

## 打开交易所

```text
/shop exchange
```

## 上架物品

玩家将要出售的物品拿在主手，执行：

```text
/shop exchange sell <价格>
```

示例：

```text
/shop exchange sell 500
```

也可以在交易所 GUI 点击“上架主手物品”，然后直接在聊天输入总价。

上架成功后，主手物品会被移走，并进入交易所内存状态；最新快照异步保存到 `datas/exchange.yml`。

## 查看自己的上架

```text
/shop exchange mine
```

在该界面点击自己的上架商品，会下架并取回物品。

## 购买商品

玩家打开 `/shop exchange` 后点击商品即可购买。

购买流程：

1. 检查交易是否仍存在。
2. 禁止购买自己上架的物品。
3. 检查买家背包空间。
4. 检查买家余额。
5. 扣除买家余额。
6. 给卖家打款。
7. 给买家发放物品。
8. 记录成交价格并删除该交易。

同一上架记录的购买、下架和过期处理使用独立公平锁，多个玩家同时购买时只有一个人能成功。

## 分页、排序与均价

交易所每页显示 45 个商品，底栏可以切换市场、我的上架、待领取物品以及前后页。默认按单件价格从低到高排列，也可以改为最新上架优先。

商品说明会显示整组价格、单件价格、近期成交平均单价和剩余上架时间。均价统计窗口在 `advanced.yml` 的 `market.average-price-hours` 设置。

打开菜单时，近期成交记录只聚合一次，再为当前页商品读取结果，不会为每个商品重复扫描整段成交历史。

交易所底栏的指南针可以搜索商品名称、Bukkit 材料名、物品 Lore 或卖家名称。搜索时输入 `clear` 可以清除条件。排序按钮可由每名玩家独立切换：

- 单件价格从低到高。
- 最新上架优先。
- 整组总价从高到低。

搜索词和排序模式只保存在内存中，不会修改其他玩家的市场视图，也不会反复读取数据文件。

## 过期领取箱

上架超过 `expire-hours` 后不会删除物品，而是转入卖家的领取箱：

```text
/shop exchange claims
```

也可以通过交易所底栏打开领取箱，点击物品领取。

在领取箱界面再次点击底栏“领取箱”按钮会批量领取所有能放入背包的物品；背包空间不足时，剩余物品继续安全保存在领取箱中。

## 配置

`config.yml`：

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
  sort-price-ascending: true
  history-limit: 500
```

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否启用玩家交易所 |
| `max-listings-per-player` | 每个玩家最多同时上架数量 |
| `min-price` / `max-price` | 允许的上架总价范围 |
| `listing-fee-fixed` | 固定上架手续费，下架时不返还 |
| `listing-fee-rate` | 按售价计算的上架手续费比例 |
| `tax-rate` | 交易税率，卖家收到 `price * (1 - tax-rate)` |
| `expire-hours` | 上架有效期，过期物品进入领取箱 |
| `sort-price-ascending` | 是否按单件价格从低到高排序 |
| `history-limit` | 保留的成交记录数量 |

## 数据文件

```text
plugins/liShop/datas/exchange.yml
```

该文件保存上架记录、过期领取物品和近期成交记录。

文件使用异步合并快照保存，并通过同目录临时文件原子替换；插件关闭或执行 `/shop reload` 前会等待待写快照完成。
