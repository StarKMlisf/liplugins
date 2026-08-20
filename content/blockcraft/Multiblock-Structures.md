# 多方块结构

所有结构定义都位于 `plugins/BlockCraft/structures.yml`。一个结构由核心、材料基座以及可选的纯结构支持方块组成。

## 坐标规则

核心坐标视为 `0,0,0`：

- X 正方向：东；
- Y 正方向：上；
- Z 正方向：南。

偏移格式为字符串 `X,Y,Z`。默认八基座结构：

```yaml
structures:
  natural_altar:
    display-name: '<gradient:#55ff55:#00d4ff>自然凝聚祭坛</gradient>'
    effect-type: MAGIC_CIRCLE
    particle: ENCHANT
    core:
      source: VANILLA
      material: LODESTONE
    pedestal:
      source: VANILLA
      material: POLISHED_DEEPSLATE
    allow-rotation: true
    pedestal-offsets:
      - '0,0,-3'
      - '2,0,-2'
      - '3,0,0'
      - '2,0,2'
      - '0,0,3'
      - '-2,0,2'
      - '-3,0,0'
      - '-2,0,-2'
```

![默认八基座位置](images/altar-top.png)

`effect-type` 与 `particle` 是此结构自己的合成特效，优先于 `config.yml` 全局设置。`effect-type` 可填 `MAGIC_CIRCLE`、`LINEAR`、`PARABOLA`、`DISAPPEAR`；`particle` 使用 Bukkit 粒子枚举名，例如 `ENCHANT`、`END_ROD`、`PORTAL`。

## 使用 CraftEngine 方块

核心和基座可以分别使用 CraftEngine 方块：

```yaml
structures:
  arcane_altar:
    display-name: '<gradient:#b06cff:#55e7ff>奥术祭坛</gradient>'
    core:
      source: CRAFTENGINE
      id: mypack:arcane_core
    pedestal:
      source: CRAFTENGINE
      id: mypack:arcane_pedestal
    allow-rotation: true
    pedestal-offsets:
      - '0,0,-3'
      - '2,0,-2'
      - '3,0,0'
      - '2,0,2'
      - '0,0,3'
      - '-2,0,2'
      - '-3,0,0'
      - '-2,0,-2'
```

`CRAFTENGINE` 的 `id` 必须使用 `namespace:block`。BlockCraft 比较的是 CraftEngine 真实方块 ID，不会把自定义方块伪装出的原版 BlockData 当作结构依据。

## 纯结构支持方块

支持方块只负责让多方块仪式结构完整，与核心和材料基座是三种不同角色：

- 不能在支持方块上放置或取回配方材料；
- 不会显示物品，也不占用基座槽位；
- 每次识别结构、放置材料和开始合成前都会校验；
- 任意一个支持方块缺失、材质错误或 CraftEngine ID 不符，整座祭坛均无效；
- 合成期间受到与核心、基座相同的破坏、爆炸和活塞保护；
- `allow-rotation: true` 时，其相对坐标会与整个结构一起旋转。

完整示例：

```yaml
structures:
  natural_altar:
    display-name: '<gradient:#55ff55:#00d4ff>自然凝聚祭坛</gradient>'
    core:
      source: CRAFTENGINE
      id: cloud:runic_altar
    pedestal:
      source: VANILLA
      material: POLISHED_DEEPSLATE

    supported_1:
      source: VANILLA
      material: OBSIDIAN

    allow-rotation: true
    pedestal-offsets:
      - '0,0,-3'
      - '2,0,-2'
      - '3,0,0'
      - '2,0,2'
      - '0,0,3'
      - '-2,0,2'
      - '-3,0,0'
      - '-2,0,-2'
    supported_1-offsets:
      - '0,-1,-3'
      - '2,-1,-2'
      - '3,-1,0'
      - '2,-1,2'
      - '0,-1,3'
      - '-2,-1,2'
      - '-3,-1,0'
      - '-2,-1,-2'
```

这表示每个材料基座正下方一格都必须存在黑曜石。`supported_1` 的名字必须和 `supported_1-offsets` 前缀完全一致。

可以继续增加不同方块类型：

```yaml
supported_2:
  source: CRAFTENGINE
  id: cloud:ritual_pillar
supported_2-offsets:
  - '1,0,1'
  - '-1,0,1'
  - '1,0,-1'
  - '-1,0,-1'
```

支持组名称必须以 `supported_` 开头。数字只是推荐命名，也可以使用 `supported_pillars`；对应坐标节点必须为 `<组名>-offsets`。

## 创建不同结构

同一个文件可以定义多个结构，并让不同配方通过 `structure` 选择：

```yaml
structures:
  small_altar:
    display-name: '<green>四方祭坛</green>'
    effect-type: DISAPPEAR
    particle: END_ROD
    core:
      source: VANILLA
      material: LODESTONE
    pedestal:
      source: VANILLA
      material: CHISELED_STONE_BRICKS
    allow-rotation: true
    pedestal-offsets:
      - '0,0,-2'
      - '2,0,0'
      - '0,0,2'
      - '-2,0,0'
```

要求：

- 至少配置一个基座坐标；
- 基座不能与核心使用同一个相对位置；
- 基座和所有支持组之间的坐标不能重复；
- 每个 `supported_*` 至少配置一个对应的 `supported_*-offsets`；
- `VANILLA` 必须填写有效方块材质；
- `CRAFTENGINE` 必须安装且 ID 存在。

## 旋转

`allow-rotation: true` 时，插件会尝试北、东、南、西四种 Y 轴旋转。对默认对称结构没有视觉差异；对不对称结构则允许玩家按四个朝向搭建。

`allow-rotation: false` 时只按配置中的原始坐标识别。

## 检查结构

把准星对准核心、任意基座或任意支持方块：

```text
/blockcraft debug
```

成功信息会显示结构 ID、核心世界与坐标、识别到的旋转方向和支持方块总数。搜索距离由 `config.yml` 的 `interaction.search-radius` 控制。
