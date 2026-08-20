# 配方预览 GUI

玩家使用以下指令打开只读菜单：

```text
/blockcraft preview <配方ID>
```

配方 ID 支持 Tab 补全。玩家不能从菜单取走或放入物品。

## 默认布局

`preview.yml` 默认使用 54 格背包：

```text
第 1 行： 0  1  2  3  4  5  6  7  8
第 2 行：[9 10 11 12 环绕] [13中心] [14 15 16 17 环绕]
第 3 行：18 19 20 21 22 23 24 25 26
第 4 行：27 [28 29 30 31 32 33 34 35 材料]
第 5 行：36 37 38 39 [40产物] 41 42 43 44
第 6 行：45 46 47 48 [49信息] 50 51 52 53
```

```yaml
menu:
  title: '<gradient:#55ff55:#00d4ff>配方预览 · {recipe}</gradient>'
  size: 54
  fill-empty: true
  layout:
    altar-slot: 13
    surrounding-slots: [9, 10, 11, 12, 14, 15, 16, 17]
    ingredient-slots: [28, 29, 30, 31, 32, 33, 34, 35]
    result-slot: 40
    info-slot: 49
```

## 调整尺寸和槽位

- `size` 只能使用 9、18、27、36、45、54；无效值回退为 54；
- 槽位从 0 开始，必须小于 `size`；
- `ingredient-slots` 的顺序对应配方 `ingredients` 的读取顺序；
- `surrounding-slots` 的顺序对应 `ADVANCED` 配方 `surroundings` 的读取顺序；
- 材料种类多于已配置材料槽时，超出的材料不会显示；
- 建议不要让中心、材料、产物和信息槽重复。

## 图标

```yaml
menu:
  icons:
    filler:
      material: GRAY_STAINED_GLASS_PANE
      name: ' '
      lore: []
    missing-item:
      material: BARRIER
      name: '<red>无法显示物品</red>'
      lore:
        - '<gray>{reason}</gray>'
    info:
      material: BOOK
      name: '<gradient:#55ff55:#00d4ff>{recipe}</gradient>'
      lore:
        - '<gray>配方 ID：</gray><white>{recipe_id}</white>'
        - '<gray>成功概率：</gray><white>{chance}%</white>'
```

`material` 必须是有效的原版物品材质。自定义物品图标会由相应来源插件实时生成；挂钩不可用或 ID 不存在时显示 `missing-item`。

## 配方变量

标题、信息图标和 Lore 支持：

| 变量 | 内容 |
| --- | --- |
| `{recipe}` | 配方显示名称 |
| `{recipe_id}` | 配方 ID |
| `{mode}` | 配方形式：`NORMAL` 或 `ADVANCED` |
| `{duration}` | 合成秒数，保留 1 位小数 |
| `{chance}` | 成功率，保留 2 位小数 |
| `{cost}` | `无`、金币、点券或经验等级描述 |
| `{permission}` | 配方权限，未设置时显示 `无` |
| `{failure_altar}` | 失败时中心物品为 `保留` 或 `消耗` |
| `{inherit_enchantments}` | 是否继承中心附魔 |
| `{ignore_altar_enchantments}` | 匹配时是否忽略中心附魔 |

物品追加 Lore 还支持：

| 变量 | 内容 |
| --- | --- |
| `{amount}` | 配方要求数量 |
| `{source}` | `VANILLA`、`MMOITEMS`、`CRAFTENGINE` 或 `CUSTOMFISHING` |
| `{item_id}` | 材质、`TYPE:ID` 或自定义物品 ID |
| `{reason}` | 无法生成预览图标的原因 |

## 追加物品 Lore

```yaml
menu:
  item-lore:
    ingredient:
      - ''
      - '<yellow>基座材料 × {amount}</yellow>'
      - '<dark_gray>来源：{source} / {item_id}</dark_gray>'
    surrounding:
      - ''
      - '<light_purple>祭坛环绕材料 × {amount}</light_purple>'
      - '<dark_gray>来源：{source} / {item_id}</dark_gray>'
    altar:
      - ''
      - '<aqua>祭坛中心前置物 × {amount}</aqua>'
    result:
      - ''
      - '<green>最终产物 × {amount}</green>'
```

修改后执行 `/blockcraft reload` 即可刷新菜单配置。
