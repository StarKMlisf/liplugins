# 配置文件索引

## 文件与结构版本

| 文件 | 当前结构版本 | 用途 |
| --- | --- | --- |
| `config.yml` | 6 | 交互、逐基座/祭坛/环绕展示、粒子、音效、点券、保护和调试 |
| `structures.yml` | 4 | 核心、材料基座、支持方块、独立粒子特效以及原版/CraftEngine 身份 |
| `preview.yml` | 3 | 配方预览 GUI |
| `messages.yml` | 8 | 全部玩家消息与帮助文本 |
| `recipes/*.yml` | 6 | `NORMAL` / `ADVANCED` 多文件配方与四种费用类型 |
| `data.yml` | 自动维护 | 祭坛中心、基座、环绕物和待领取产物 |

不要手动修改 `config-version`。升级时插件只回填缺少的默认节点，不覆盖已有自定义值。

## config.yml

### interaction

| 节点 | 默认值 | 范围/说明 |
| --- | --- | --- |
| `insert-all` | `true` | 一次放入手中整组 |
| `insert-amount` | `1` | `insert-all: false` 时生效，1-64 |
| `allow-stacking` | `true` | 允许相同物品继续叠加 |
| `max-stack-size` | `64` | 单个位置最大保存数量，1-64 |
| `max-surrounding-slots` | `8` | 单个祭坛最多保存的独立环绕物品堆，1-32 |
| `search-radius` | `8` | info、debug、cancel 搜索范围，1-32 |
| `place-sound` | `minecraft:entity.item_frame.add_item` | 放入音效；留空关闭 |
| `place-sound-volume` | `0.8` | 0-10 |
| `place-sound-pitch` | `1.2` | 0.5-2 |
| `take-sound` | `minecraft:entity.item_frame.remove_item` | 取回音效；留空关闭 |
| `take-sound-volume` | `0.8` | 0-10 |
| `take-sound-pitch` | `1.0` | 0.5-2 |

### display

支持基座默认显示参数、每个基座槽位覆盖、祭坛中心前置物、`ADVANCED` 环绕物和待领取成品的独立高度与大小；环绕物另有轨道半径与公转速度。详细动画说明见 [[展示、粒子与音效|Effects-Displays-and-Sounds]]。

### crafting

包含全局粒子类型、空基座粒子开关、轨迹周期、单粒子点寿命、魔法阵、抛物线以及开始/成功/失败/取消音效。详细说明见 [[展示、粒子与音效|Effects-Displays-and-Sounds]]。

### economy.points

| 节点 | 说明 |
| --- | --- |
| `balance-placeholder` | 返回玩家点券余额的 PlaceholderAPI 变量 |
| `withdraw-commands` | 合成开始时由控制台执行的扣款指令列表 |
| `refund-commands` | 合成被取消时由控制台执行的退款指令列表 |

详细事务规则见 [[经济、成功率与失败|Economy-and-Success]]。

### protection

| 节点 | 默认值 | 说明 |
| --- | --- | --- |
| `prevent-break-while-crafting` | `true` | 阻止破坏合成中的核心、基座或支持方块 |
| `prevent-explosion` | `true` | 保护已存物品的祭坛免受爆炸影响 |
| `prevent-piston` | `true` | 阻止活塞移动已存物品的祭坛方块 |

### debug

`debug.enabled: true` 会输出额外调试信息，正式服通常保持 `false`。

## structures.yml

定义结构核心、材料基座、任意多组 `supported_*` 支持方块、结构专用 `effect-type` / `particle`、旋转和相对坐标。支持方块只参与结构完整性校验。参阅 [[多方块结构|Multiblock-Structures]]。

## preview.yml

定义 GUI 标题、9-54 格大小、全部功能槽位、填充图标、缺失图标、信息图标和追加 Lore。参阅 [[配方预览 GUI|Preview-GUI]]。

## messages.yml

所有消息都从此文件读取，代码中不硬编码玩家提示。支持：

- MiniMessage 标签；
- RGB，如 `<#55ff55>`；
- 渐变，如 `<gradient:#55ff55:#00d4ff>文本</gradient>`；
- 消息对应的 `{变量}`；
- 安装 PlaceholderAPI 后的百分号变量。

修改消息键名时要保留原有层级；只修改冒号后的文本最安全。

## recipes 目录

每个 `.yml` 可以包含多个 `recipes` 子节点。详细字段见 [[配方配置|Recipe-Configuration]]。

## 重载

```text
/blockcraft reload
```

重载会：

- 取消正在计时的合成并退款；
- 重新读取主配置、结构、消息、GUI 和全部配方文件；
- 刷新祭坛展示；
- 保留祭坛内部真实物品。
