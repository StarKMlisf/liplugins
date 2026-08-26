# LIEMC 自定义 GUI 完整教程

LIEMC `0.1.0+build.98` 起将菜单外观独立到 `plugins/LIEMC/gui.yml`。获取、搜索、收藏和转换四套菜单可以分别调整，不需要修改 Java 代码。

## 1. 开始之前

1. 安装或升级到 `LIEMC-0.1.0+build.98.jar`。
2. 完整启动一次服务器，等待 `plugins/LIEMC/gui.yml` 自动生成。
3. 备份现有 `plugins/LIEMC/` 目录。
4. 修改 `gui.yml` 后执行 `/emc reload`。
5. 关闭并重新打开菜单，确认新布局已经生效。

不要使用第三方热加载插件替换完整升级流程。`/emc reload` 用于读取已经安装好的 LIEMC 配置，不负责替换 Jar。

## 2. 四套菜单分别控制什么

| 配置节点 | 玩家入口 | 用途 |
| --- | --- | --- |
| `menus.withdraw` | `/emc` | EMC 获取主菜单 |
| `menus.search` | `/emc search <关键词>` 或搜索按钮 | 搜索结果与购买 |
| `menus.favorites` | 收藏按钮 | 收藏列表与购买 |
| `menus.convert` | `/emc convert` | 放入物品并转换为 EMC |

搜索页和收藏页不是只读预览。玩家仍可左键或右键购买；Shift+点击只负责加入或取消收藏，不能绕过解锁与余额限制。

## 3. 槽位编号

Bukkit 箱子菜单从 `0` 开始编号。54 格菜单的编号如下：

```text
 0  1  2  3  4  5  6  7  8
 9 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
```

`item-slots` 支持单个槽位、连续范围和多段组合：

```yml
item-slots: "10-16,19-25,28-34,37-43"
```

菜单大小允许 `9`、`18`、`27`、`36`、`45`、`54`。其他整数会被限制到 9~54，并自动向上补齐成完整一行。

## 4. 通用菜单字段

| 字段 | 用途与范围 |
| --- | --- |
| `title` | 菜单标题，支持颜色、MiniMessage 和动态变量 |
| `size` | 总槽位数，最终为 9~54 的整行箱子大小 |
| `item-slots` | 商品展示槽或转换投入槽 |
| `previous-page-slot` | 上一页按钮槽位，范围 `0` 至 `size - 1` |
| `next-page-slot` | 下一页按钮槽位，范围 `0` 至 `size - 1` |
| `convert-slot` | 确认转换按钮槽位，范围 `0` 至 `size - 1` |
| `filler-item` | 填充菜单边框上的空槽位 |
| `custom-buttons` | 添加任意数量的自定义按钮 |

按钮及物品外观字段：

| 字段 | 用途与范围 |
| --- | --- |
| `enabled` | `true` 启用，`false` 完全隐藏并禁用 |
| `slot` | 按钮槽位，范围 `0` 至 `size - 1` |
| `close-after-click` | 点击后是否关闭菜单 |
| `material` | Bukkit 原版材质枚举名，例如 `BOOK`；无效名称回退为 `STONE` |
| `amount` | 显示数量，范围 1~64 |
| `custom-model-data` | 资源包模型编号；`0` 表示不设置 |
| `name` | 按钮名称 |
| `lore` | 多行按钮说明 |
| `glow` | 是否显示隐藏附魔光效 |
| `commands` | 点击后依次执行的指令列表 |

## 5. 颜色、渐变与文字

传统颜色和 RGB：

```yml
name: "&aEMC 余额: &e{balance}"
name: "&#37E6D2青色标题"
```

MiniMessage 多色渐变：

```yml
title: "<gradient:#37E6D2:#4F8CFF:#B86BFF>EMC 获取</gradient> <gray>{page}/{pages}"
```

同一行建议只使用一种格式，不要把 `&a` 与 `<gradient:...>` 混写。菜单按钮名称和 Lore 会自动取消原版斜体。

## 6. 动态变量

标题、按钮名称、Lore 和按钮指令可以使用：

| 变量 | 内容 |
| --- | --- |
| `{player}` | 玩家名 |
| `{uuid}` | 玩家 UUID |
| `{world}` | 当前世界名 |
| `{balance}` | 当前 EMC 余额 |
| `{unlocked}` | 已解锁物品数量 |
| `{auto_refill}` | 自动补充状态：开启或关闭 |
| `{page}` | 当前页码 |
| `{pages}` | 总页数 |
| `{count}` | 当前菜单结果总数 |
| `{query}` | 最多显示 16 字的搜索关键词 |
| `{query_full}` | 完整搜索关键词 |

商品自身的 `{emc}`、`{left_amount}`、`{right_amount}`、`{status}`、`{favorite}` 等变量仍在 `config.yml` 的商品名称和 Lore 中配置。

## 7. 修改主菜单布局

下面示例把标题改成青蓝紫渐变，并将商品区保持为四行七列：

```yml
menus:
  withdraw:
    title: "<gradient:#37E6D2:#4F8CFF:#B86BFF>服务器 EMC 商店</gradient> <gray>{page}/{pages}"
    size: 54
    item-slots: "10-16,19-25,28-34,37-43"
    previous-page-slot: 47
    next-page-slot: 51
```

这是局部示例。请在插件已经生成的完整 `gui.yml` 中修改对应字段，不要用示例覆盖整份文件。

## 8. 修改按钮外观

```yml
favorite-button:
  enabled: true
  slot: 48
  close-after-click: false
  item:
    material: "NETHER_STAR"
    amount: 1
    custom-model-data: 0
    name: "<gradient:#FFD34E:#FF8A4F>我的收藏</gradient>"
    lore:
      - "&7打开已经收藏的 EMC 物品"
      - "&7Shift+点击商品可切换收藏"
    glow: true
  commands: []
```

搜索、收藏、转换、余额和自动补充等内置按钮的 `commands: []` 留空时，会执行 LIEMC 对应的内置行为。填写指令后，会改为执行自定义指令。

如果不需要某个按钮：

```yml
search-button:
  enabled: false
```

## 9. 添加自定义按钮

`custom-buttons` 下的节点名可以自行命名，也可以添加多个：

```yml
custom-buttons:
  server_shop:
    enabled: true
    slot: 8
    close-after-click: true
    item:
      material: "EMERALD"
      amount: 1
      custom-model-data: 0
      name: "&a服务器商店"
      lore:
        - "&7玩家: &f{player}"
        - "&7点击打开服务器商店"
      glow: true
    commands:
      - "player:shop"
```

指令前缀：

```yml
commands:
  - "player:spawn"
  - "console:give {player} diamond 1"
  - "warp market"
```

- `player:`：以玩家身份执行。
- `console:`：以控制台身份执行。
- 不写前缀：默认以玩家身份执行。

控制台指令拥有完整权限，只应由可信管理员配置。

## 10. 使用资源包模型

如果服务器资源包已经为某个原版物品绑定 CustomModelData，可以这样使用：

```yml
item:
  material: "PAPER"
  amount: 1
  custom-model-data: 12001
  name: "&b自定义 EMC 图标"
  lore:
    - "&7需要玩家加载对应资源包"
  glow: false
```

`custom-model-data` 只选择模型编号，不会自动生成或下发资源包。

## 11. 转换菜单安全规则

`menus.convert.item-slots` 是玩家可放入待回收物品的槽位。确认按钮、返回按钮、一键出售按钮和自定义按钮占用的槽位会自动从投入槽中排除。

玩家使用 ESC 关闭转换菜单，或点击配置为关闭菜单的返回/自定义按钮时，未转换物品会先退回背包；背包已满的溢出物会掉落在玩家脚下。

转换界面自定义按钮如果需要跳转到其他菜单，建议设置：

```yml
close-after-click: true
```

这样 LIEMC 会先退还投入物品，再在下一游戏刻执行按钮指令。

## 12. 槽位冲突规则

- 自定义按钮优先于内置按钮。
- 功能按钮占用的槽位会从商品展示槽或转换投入槽中排除。
- 不要让两个内置功能按钮使用同一个槽位，否则玩家看到的图标和实际点击行为可能不一致。
- 如果配置的内容槽全部被按钮占用，插件会优先尝试使用其他内部空槽；9 格菜单则使用剩余可用槽位。

修改后应逐页检查，确认没有隐藏商品、错位按钮或不可用的翻页入口。

## 13. 旧配置迁移与升级

旧版本把菜单放在 `config.yml` 中。首次使用新版且尚无 `gui.yml` 时，LIEMC 会把旧菜单迁移到独立文件，并补齐搜索、收藏、自定义按钮等新节点。

升级补全遵循以下规则：

- 只添加缺失节点。
- 只补充缺失的默认注释。
- 不覆盖服主已有值。
- 不覆盖服主已有注释。
- `gui.yml` 是各子服本地外观，不通过 MySQL 同步。

多子服需要统一界面时，应把确认无误的 `gui.yml` 手动分发到每台子服，再分别执行 `/emc reload`。

## 14. 重载与验证清单

修改后执行：

```text
/emc reload
```

然后逐项验证：

1. `/emc` 能打开获取菜单，标题、余额和页码正确。
2. 上一页与下一页不会覆盖商品。
3. 搜索页可以购买，关键词和结果数正确。
4. 收藏页可以购买，Shift+点击可以取消收藏。
5. 左键购买 1 个，右键购买配置数量，并正确扣除 EMC。
6. 自动补充按钮能切换状态。
7. 转换菜单可以放入物品，返回和 ESC 不会吞物品。
8. 自定义按钮以正确身份执行指令。
9. 使用资源包模型时，客户端实际显示正确图标。

## 15. 常见问题

### 修改后没有变化

确认修改的是正在运行服务器的 `plugins/LIEMC/gui.yml`，执行 `/emc reload` 后关闭旧菜单并重新打开。再检查控制台是否出现 YAML 缩进或材质名错误。

### 按钮变成石头

`material` 不是有效的 Bukkit 原版材质枚举名。改成全大写名称，例如 `NETHER_STAR`、`BOOK`、`BLACK_STAINED_GLASS_PANE`。

### 商品少了一个或无法点击

检查 `item-slots` 是否与功能按钮重叠，并确认没有两个内置按钮共用槽位。新版会排除冲突内容槽，但错误布局仍可能让每页容量发生变化。

### MiniMessage 没有正确显示

确认标签完整闭合，并且同一行没有混用 `&` 颜色与 MiniMessage。格式错误时插件会安全回退到传统颜色解析。

### CustomModelData 没有模型

确认客户端加载了正确资源包、材质与模型绑定一致，并核对模型编号。只有配置 GUI 不能替代资源包文件。
