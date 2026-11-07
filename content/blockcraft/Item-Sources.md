# 物品来源与前置挂钩

BlockCraft 支持四种 `source`。同一配方可以混用不同来源。

| `source` | 必填字段 | 示例 |
| --- | --- | --- |
| `VANILLA` | `material` | `DIAMOND` |
| `MMOITEMS` | `type`、`id` | `MATERIAL` + `NATURE_ESSENCE` |
| `CRAFTENGINE` | `id` | `nature:rune_of_earth` |
| `CUSTOMFISHING` | `id` | `rainbow_fish` |

## 原版物品

```yaml
source: VANILLA
material: DIAMOND
amount: 2
```

`material` 使用 Bukkit 材质枚举名。原版产物还可以使用：

```yaml
name: '<gradient:#55ff55:#00ffff>自然结晶</gradient>'
lore:
  - '<gray>自定义说明</gray>'
```

为避免误消耗，自定义插件物品即使伪装成同一种原版材质，也不会被 `VANILLA` 配方当作普通物品。

## MMOItems

需要 MMOItems 和 MythicLib：

```yaml
source: MMOITEMS
type: MATERIAL
id: NATURE_ESSENCE
amount: 8
```

匹配依据是稳定的 `TYPE + ID`，不会因为等级、随机属性、宝石或 Lore 改变而失效。配置加载时会把 `type` 和 `id` 转成大写。

管理员生成指令：

```text
/blockcraft give <玩家> mmoitems <类型> <ID> [数量]
```

## CraftEngine 物品

需要 CraftEngine：

```yaml
source: CRAFTENGINE
id: nature:rune_of_earth
amount: 1
```

使用完整的命名空间物品 ID。BlockCraft 会在 CraftEngine 内容重载后刷新祭坛显示和配方可用状态。

管理员生成指令：

```text
/blockcraft give <玩家> craftengine <命名空间:ID> [数量]
```

CraftEngine 方块结构配置请参阅 [[多方块结构|Multiblock-Structures]]。

## CustomFishing 物品

需要 CustomFishing 2.3.x：

```yaml
source: CUSTOMFISHING
id: rainbow_fish
amount: 1
```

匹配依据是 CustomFishing 自身保存的真实物品 ID，不比较显示名、随机鱼尺寸、随机属性或 Lore。它可以用于：

- `altar-item`；
- `ingredients`；
- `surroundings`（仅 `ADVANCED` 配方）；
- `result`；
- 配方预览 GUI；
- 管理员生成指令和 Tab ID 补全。

管理员生成指令：

```text
/blockcraft give <玩家> customfishing <物品ID> [数量]
```

物品 ID 应填写 CustomFishing 内容配置中注册的 ID，而不是 Minecraft 材质名。

## 混合配方

```yaml
altar-item:
  source: CRAFTENGINE
  id: nature:rune_of_earth
  amount: 1

ingredients:
  essence:
    source: MMOITEMS
    type: MATERIAL
    id: NATURE_ESSENCE
    amount: 8
  fish:
    source: CUSTOMFISHING
    id: rainbow_fish
    amount: 1

result:
  source: MMOITEMS
  type: SWORD
  id: FOREST_BLADE
  amount: 1
```

如果某个来源挂钩不可用：

- 依赖它的材料不会误匹配；
- 依赖它的产物无法开始合成；
- 预览 GUI 使用缺失物品图标；
- 控制台会显示相应挂钩状态。
