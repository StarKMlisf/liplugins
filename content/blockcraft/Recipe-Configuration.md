# 配方配置

配方文件放在：

```text
plugins/BlockCraft/recipes/*.yml
```

每个文件都可以保存一个或多个配方。建议按玩法、等级或装备系列拆分文件，避免单个 YAML 过于臃肿。

## 完整示例

```yaml
# 配方文件结构版本，请勿手动修改。
config-version: 6

recipes:
  nature_crystal:
    enabled: true
    mode: NORMAL
    display-name: '<gradient:#55ff55:#00ffff>自然结晶</gradient>'
    structure: natural_altar
    permission: 'blockcraft.recipe.nature_crystal'
    priority: 100
    duration-ticks: 100
    allow-extra-materials: false
    success-chance: 85.0
    keep-altar-item-on-failure: true
    inherit-altar-enchantments: true
    ignore-altar-enchantments: true
    cost:
      type: NONE
      amount: 0
    broadcast: '<gradient:#ff557f:#ff55fd>恭喜玩家 <green>{player}</green> 合成出了 {recipe}</gradient>'

    altar-item:
      source: VANILLA
      material: DIAMOND
      amount: 1
      enchantments: {}

    ingredients:
      emerald:
        source: VANILLA
        material: EMERALD
        amount: 4
      seeds:
        source: VANILLA
        material: WHEAT_SEEDS
        amount: 8

    result:
      source: VANILLA
      material: AMETHYST_SHARD
      amount: 1
      enchantments:
        minecraft:mending: 1
      name: '<gradient:#55ff55:#00ffff>自然结晶</gradient>'
      lore:
        - '<gray>由祭坛凝聚而成</gray>'
```

## 配方顶层字段

| 字段 | 默认值/范围 | 说明 |
| --- | --- | --- |
| `enabled` | `true` | 是否加载配方 |
| `mode` | `NORMAL` | `NORMAL` 为传统中心 + 基座合成；`ADVANCED` 还要求祭坛环绕材料 |
| `display-name` | 配方 ID | MiniMessage 显示名称 |
| `structure` | 必填 | `structures.yml` 中的结构 ID |
| `permission` | 空 | 使用该配方需要的权限；空表示不单独限制 |
| `priority` | `0`，范围 -10000 至 10000 | 多个配方都能匹配时，数值大的先匹配 |
| `duration-ticks` | `100`，范围 1 至 72000 | 合成时间；20 tick 约等于 1 秒 |
| `allow-extra-materials` | `false` | 是否允许基座出现配方未声明的材料种类 |
| `success-chance` | `100.0`，范围 0 至 100 | 最终成功概率百分比 |
| `keep-altar-item-on-failure` | `true` | 概率失败时是否保留中心物品 |
| `inherit-altar-enchantments` | `false` | 成功时是否把中心附魔合并到产物 |
| `ignore-altar-enchantments` | `true` | 匹配中心物品时是否忽略其附魔 |
| `cost` | `NONE` | 免费、Vault 金币、指令型点券或玩家经验等级 |
| `broadcast` | 空 | 仅成功时发送的全服 MiniMessage 播报 |

经验等级费用示例：

```yaml
cost:
  type: XP
  amount: 30
```

这会扣除发起玩家 30 级，而不是 30 点经验值。`XP` 的 `amount` 只能填写整数。费用的扣除与退款规则见 [[经济、成功率与失败|Economy-and-Success]]。

## NORMAL：A + B = C

- `altar-item`：祭坛中心的前置物 A；
- `ingredients`：周围基座的材料 B；
- `result`：成功后展示的产物 C。

如果不需要中心前置物，删除整个 `altar-item` 段：

```yaml
recipes:
  pedestal_only:
    enabled: true
    display-name: '<aqua>纯基座配方</aqua>'
    structure: natural_altar
    ingredients:
      material:
        source: VANILLA
        material: PRISMARINE_SHARD
        amount: 16
    result:
      source: VANILLA
      material: HEART_OF_THE_SEA
      amount: 1
```

这种配方要求祭坛中心没有额外物品，避免误匹配。

## ADVANCED：A + B + D = C

高级形式在传统中心前置物 A、基座材料 B 之外，再增加直接放到祭坛核心上的环绕材料 D：

```yaml
recipes:
  advanced_example:
    enabled: true
    mode: ADVANCED
    display-name: '<gradient:#8aff80:#4ac6ff>自然之刃</gradient>'
    structure: natural_altar
    duration-ticks: 160
    allow-extra-materials: false
    success-chance: 70.0
    keep-altar-item-on-failure: true
    cost:
      type: NONE
      amount: 0

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

    surroundings:
      emerald:
        source: VANILLA
        material: EMERALD
        amount: 4

    result:
      source: MMOITEMS
      type: SWORD
      id: FOREST_BLADE
      amount: 1
```

- 手持 `surroundings` 声明的物品右键祭坛核心，物品会进入环绕槽，而不是占用正中心；
- 环绕物位于核心方块侧边约一格处，并持续绕核心旋转、上下浮动；
- 只有当前结构中已启用 `ADVANCED` 配方声明过、且与其他已放环绕物仍能组成同一配方的物品，才能进入环绕槽；中心物品不限制环绕材料的放入；
- 中心暂时放错物品时仍可先放置合法环绕材料，但启动合成前中心物品必须正确匹配 `altar-item`；
- `ADVANCED` 必须配置至少一种 `surroundings`，`NORMAL` 不允许配置该段；
- 同一种环绕材料多放时仍可合成，只扣配方要求量，余量继续环绕展示；
- 概率失败时环绕材料与基座材料一样按配方数量消耗，`keep-altar-item-on-failure` 只控制中心前置物。

## 材料数量和分配

每个物品的 `amount` 范围为 1 至 64。相同材料可以分散到多个基座，插件会累计数量并生成精确的扣除计划；环绕材料也按自身环绕槽独立累计与扣除。

若实际数量超过需要量，只扣配方要求的数量。例如需要 16 个，实际放入 24 个，成功或概率失败结算后仍保留 8 个。

## 附魔匹配

附魔格式：

```yaml
enchantments:
  minecraft:sharpness: 5
  minecraft:unbreaking: 3
```

- 支持等级 1 至 255；
- 省略命名空间时自动使用 `minecraft`；
- `ignore-altar-enchantments: true` 时，中心附魔不参与匹配；
- `ignore-altar-enchantments: false` 时，中心附魔必须与 `altar-item.enchantments` 完全一致，包括不能多出其他附魔；
- `inherit-altar-enchantments: true` 时，中心物品的直接附魔或附魔书储存附魔会合并到产物；
- 同一种附魔保留双方较高等级，不进行等级相加。

## 产物名称和 Lore

`result.name` 和 `result.lore` 只直接修改 `VANILLA` 产物，并支持 MiniMessage。MMOItems、CraftEngine 和 CustomFishing 产物由各自插件生成，其名称与数据以来源插件为准。

## 多个配方和优先级

不同文件不能出现重复配方 ID。若多个配方材料相似，优先把更严格的配方设为较高 `priority`，防止宽松配方抢先匹配。

修改完成后执行：

```text
/blockcraft reload
```

配方加载失败会在控制台显示文件路径、配方 ID 和具体中文原因。
