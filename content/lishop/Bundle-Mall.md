# 礼包商城

玩家通过以下指令打开礼包商城：

```text
/shop bundle
```

## 配置文件

文件位置：

```text
plugins/liShop/bundles.yml
```

示例：

```yaml
enabled: true
title: "<gradient:#ffcc66:#ff66cc>礼包商城</gradient>"
rows: 3

bundles:
  starter:
    slot: 11
    icon: CHEST
    name: "<green>新手礼包</green>"
    currency: VAULT
    price: 100.0
    daily-limit: 1
    total-limit: -1
    broadcast: true
```

## 双货币

`currency` 支持：

- `VAULT`：Vault 金币。
- `POINTS`：PlayerPoints 点券。

PlayerPoints 未安装时，点券礼包会提示余额不足，不会抛异常。

## 限购

- `daily-limit`：每日限购次数，`-1` 表示不限购。
- `total-limit`：总限购次数，`-1` 表示不限购。

## 全服广播

```yaml
broadcast: true
```

购买成功后会向全服广播。
