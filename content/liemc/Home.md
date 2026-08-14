# LIEMC —— 百人服同款 EMC 资源经济生态｜物品回收｜解锁兑换｜收藏检索｜跨服同步｜Folia 支持

![LIEMC Logo](../../../images/liemc-logo.png)

> 一款围绕 EMC 货币体系打造的 Minecraft 服务器资源经济插件。  
> 通过物品回收、解锁兑换、收藏检索、自动补充和跨服同步，为服务器构建更稳定的资源循环生态。

---

## 插件概述

LIEMC 是一款面向 Paper / Luminol `26.1.2` 的 EMC 资源经济插件，适合生存服、空岛服、百人服和多子服生态使用。

插件以 EMC 作为资源价值单位，让玩家可以将物品出售为 EMC，再使用 EMC 兑换已解锁的资源。相比传统商店，LIEMC 更强调“先获得、再解锁、后复购”的成长节奏，能够让服务器资源流通更自然，也更适合长期运营。

如果你的服务器需要一套能承载资源回收、方块兑换、玩家成长、跨服同步的经济系统，LIEMC 可以作为核心底座使用。

---

## 功能亮点

### 1. EMC 兑换系统

玩家可以通过 GUI 商店消耗 EMC 获取资源。

支持：

- EMC 商店菜单
- 分页浏览
- 左键获取 1 个
- 右键获取一组或配置数量
- EMC 余额显示
- 已解锁数量显示
- 自动补充开关入口
- 搜索入口
- 收藏入口

购买限制：

- 默认必须先解锁再兑换
- 未解锁物品无法直接购买
- 搜索页和收藏页可直接购买已解锁物品

---

### 2. 物品回收系统

玩家可以把可转换物品出售为 EMC。

支持：

- `/emc convert` 打开转换界面
- 手动放入物品转换
- `/emc sellall` 一键出售背包内所有可转换物品
- 出售成功后自动获得 EMC
- 出售成功后自动解锁对应物品

适合场景：

- 清理玩家背包中过量资源
- 让低价值资源重新进入经济循环
- 给长期挖矿、建筑、刷怪产出提供统一价值入口

---

### 3. 多条件解锁思路

当前默认解锁条件为：玩家必须先出售一次对应物品。

配置项：

```yml
unlock:
  require-before-withdraw: true
```

效果：

- 玩家第一次出售物品时自动解锁
- 解锁后才能在 EMC 商店复购
- 管理员可使用 `/emc unlockall` 为玩家全解锁

这种机制能避免玩家刚进入服务器就直接兑换全部资源，更适合生存服、空岛服和百人服的长期成长节奏。

---

### 4. 收藏与搜索系统

玩家可以对常用物品进行收藏，方便快速查找。

操作：

- 在 EMC 菜单中 Shift+点击物品收藏
- 再次 Shift+点击取消收藏
- 点击“我的收藏”按钮查看收藏列表
- 使用 `/emc search <关键词>` 搜索物品

说明：

- 收藏不会解锁物品
- 收藏不会绕过购买限制
- 搜索页和收藏页均可直接购买已解锁物品

---

### 5. 自动补充系统

玩家开启自动补充后，当手中物品消耗完时，插件会尝试扣除 EMC 并补充一组。

指令：

```text
/emc autorefill on
/emc autorefill off
```

适合：

- 建筑服大量铺方块
- 空岛服持续放置材料
- 生存服批量消耗资源

限制：

- 创造模式不会触发
- 物品必须存在于 EMC 配置
- EMC 不足时不会补充

---

### 6. 手持物品快速上架

管理员可以直接把主手物品添加进 EMC 商店。

指令：

```text
/emc addheld <id> <emc> [unlockCost] [withdrawAmount]
/emc addhand <id> <emc> [unlockCost] [withdrawAmount]
```

示例：

```text
/emc addheld custom_block 100
/emc addheld magic_ingot 500 0 16
```

添加后自动完成：

- 写入本服配置
- 保留物品名称
- 保留 CustomModelData
- 保留原始 lore
- 自动追加 EMC 商店 lore
- 自动分类排序
- 自动上架 EMC 商店
- 自动打开搜索页定位新物品
- 写入数据库同步表

---

### 7. 跨服同步系统

LIEMC 支持多服连接同一个 MySQL，实现玩家数据和管理员上架物品同步。

可同步内容：

| 内容 | 是否同步 |
| --- | --- |
| EMC 余额 | 是 |
| 已解锁物品 | 是 |
| 收藏列表 | 是 |
| 自动补充开关 | 是 |
| `/emc addheld` 新增商店物品 | 是 |
| 手动修改 config.yml | 否 |
| lang.yml | 否 |
| 菜单布局 | 否 |

新增商店物品会写入：

```text
liemc_shop_items
```

同步方式：

1. A 服执行 `/emc addheld example_block 100`
2. A 服立即上架并写入 MySQL
3. B 服执行 `/emc reload`
4. B 服自动拉取并写入本地配置
5. B 服 EMC 商店出现该物品

---

### 8. Folia / Luminol 支持

插件已在 `plugin.yml` 中声明：

```yml
folia-supported: true
```

适合 Paper / Luminol `26.1.2` 环境使用。

---

## 指令列表

### 玩家指令

| 指令 | 说明 |
| --- | --- |
| `/emc` | 打开 EMC 获取商店 |
| `/liemc` | 打开 EMC 获取商店 |
| `/emc convert` | 打开 EMC 转换界面 |
| `/emc search <关键词>` | 搜索 EMC 物品 |
| `/emc sellall` | 一键出售背包可转换物品 |
| `/emc balance` | 查看 EMC 余额 |
| `/emc pay <玩家> <数量>` | 转账 EMC |
| `/emc autorefill` | 切换自动补充 |
| `/emc autorefill on` | 开启自动补充 |
| `/emc autorefill off` | 关闭自动补充 |

### 管理员指令

| 指令 | 说明 |
| --- | --- |
| `/emc reload` | 重载配置并拉取跨服商店物品 |
| `/emc give <玩家> <数量>` | 给予玩家 EMC |
| `/emc giveall <数量>` | 给所有在线玩家 EMC |
| `/emc balance <玩家>` | 查看玩家 EMC |
| `/emc unlockall [玩家]` | 为玩家解锁全部物品 |
| `/emc stats` | 查看物品统计 |
| `/emc addheld <id> <emc> [unlockCost] [withdrawAmount]` | 添加手持物品并上架 |
| `/emc addhand <id> <emc> [unlockCost] [withdrawAmount]` | 添加手持物品并上架 |
| `/emc removeitem <id>` | 下架物品并同步到其他子服 |
| `/emc delitem <id>` | `/emc removeitem` 的别名 |
| `/emc sortitems` | 整理物品分类顺序 |

所有指令均支持 Tab 补全。

---

## 权限节点

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `liemc.use` | true | 使用基础 EMC 功能 |
| `liemc.admin` | OP | 使用管理命令 |

`liemc.admin` 自动继承 `liemc.use`。

---

## 兼容与依赖

| 项目 | 说明 |
| --- | --- |
| 服务端 | Paper / Luminol |
| 目标版本 | `26.1.2` |
| Folia | 支持加载 |
| 存储 | SQLite / MySQL |
| 经济 | internal / Vault / PlayerPoints |
| 变量 | PlaceholderAPI |

运行库通过 `plugin.yml libraries` 加载：

- HikariCP
- SQLite JDBC
- MySQL Connector/J

可选软依赖：

- Vault
- PlayerPoints
- PlaceholderAPI

如果 Vault 或 PlayerPoints 不存在，插件会自动回退到内置 EMC，避免启动失败。

---

## 配置示例

### 存储配置

```yml
storage:
  type: "mysql"

  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "liemc"
    username: "root"
    password: "1234"
    use-ssl: false
    pool-size: 10
```

SQLite 适合单服，MySQL 适合跨服。

### 经济来源

```yml
currency:
  provider: "internal"
```

可选：

- `internal`
- `vault`
- `playerpoints`

### 解锁配置

```yml
unlock:
  require-before-withdraw: true
```

---

## 物品配置示例

```yml
- id: "grass_block"
  material: "GRASS_BLOCK"
  name: "&f草方块"
  lore:
    - "&7EMC: &e{emc}"
    - "&7左键获取: &e{left_amount}"
    - "&7右键获取: &e{right_amount}"
    - "&8&m----------------"
    - "&e★ 收藏: &f{favorite}"
    - "&7Shift+点击: &e{favorite_action}"
  emc: 2
  withdraw-amount: 64
  unlock-cost: 0.0
  category: "01_建筑方块/01_自然基础"
```

---

## PlaceholderAPI

| 变量 | 说明 |
| --- | --- |
| `%liemc_balance%` | 玩家 EMC 余额 |
| `%liemc_unlocked%` | 玩家已解锁物品数量 |

---

## 安装方法

1. 将插件 jar 放入 `plugins` 文件夹。
2. 启动服务器生成配置。
3. 修改 `plugins/LIEMC/config.yml`。
4. 重启服务器或执行 `/emc reload`。
5. 输入 `/emc` 打开菜单测试。

当前构建：

```text
LIEMC-0.1.0+build.81.jar
```

---

## 常见问题

### 为什么物品不能兑换？

默认开启先解锁后兑换。玩家需要先出售一次该物品，解锁后才能兑换。

### 收藏会不会解锁物品？

不会。收藏只用于快速查找，不改变解锁状态。

### 搜索页和收藏页能购买吗？

可以。已解锁物品可直接购买，未解锁物品仍会被拦截。

### 如何删除 EMC 商店物品？

推荐执行 `/emc removeitem <id>`，该指令会同时删除本地配置、数据库上架记录，并写入跨服下架记录。

也可以直接从 `config.yml` 的 `items` 中删除完整物品段，然后执行 `/emc reload`。插件不会再从默认配置强制补回已删除物品。

### 跨服新增物品为什么没同步？

请确认：

1. 所有子服连接同一个 MySQL。
2. 新物品是通过 `/emc addheld` 或 `/emc addhand` 添加。
3. 其他子服执行了 `/emc reload` 或重启。
4. 控制台没有数据库同步失败提示。

### 手动改 config.yml 会同步吗？

新增或删除物品 ID 后执行 `/emc reload` 会同步变更。修改已有物品的 EMC 或属性时，建议使用 `/emc addheld` 更新，以确保跨服数据同步。

---

## 推荐使用场景

### 生存服

开启解锁机制，让资源复购建立在玩家实际获取过的基础上。

### 空岛服

通过 EMC 管理泥土、沙子、木材、矿物等资源价值，减少重复刷物资的枯燥感。

### 百人服

使用 MySQL 统一余额、解锁、收藏和上架物品，让多个子服共享同一套 EMC 生态。

### 建筑服

可以关闭解锁限制，让玩家更自由地兑换建筑材料。

---

## 一句话介绍

LIEMC 是一款为百人服和多子服生态打造的 EMC 资源经济插件，集物品回收、解锁兑换、收藏检索、自动补充、手持上架与跨服同步于一体。
