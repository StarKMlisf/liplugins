# 故障排查

## 服务器无法加载 BlockCraft

先检查：

- 是否为 Paper 26.2 或 Folia 1.21.11；
- 是否使用 Java 25；
- Jar 是否完整；
- 控制台是否出现 YAML 语法错误或重复插件 Jar。

执行 `/version BlockCraft` 应显示 `1.0.13`。

## 结构无法识别

把准星对准核心、任一基座或任一支持方块：

```text
/blockcraft debug
```

逐项检查：

1. 核心和所有基座是否处于配置的相对坐标；
2. 每一组 `supported_*` 的支持方块是否全部存在，且位置与对应 `supported_*-offsets` 一致；
3. `VANILLA` 材质名是否有效；
4. CraftEngine 方块是否使用真实 `namespace:block`；
5. CraftEngine 是否已成功启用；
6. `allow-rotation` 是否符合搭建方向；
7. 是否修改配置后忘记执行 `/blockcraft reload`。

支持方块不是基座：右键它不会放置材料。它只负责证明仪式结构完整。缺少任何一个支持方块时，核心、基座和支持方块都不会被识别为有效祭坛。

## 提示“无法匹配任何配方”

检查：

- 配方 `enabled` 是否为 `true`；
- `structure` 是否指向当前祭坛结构；
- 中心物品是否满足 `altar-item`；
- 不需要中心物品的配方是否因为中心仍有物品而无法匹配；
- 所有基座材料的总数量是否足够；
- `ADVANCED` 配方的 `surroundings` 是否全部放到祭坛环绕槽，数量是否足够；
- `allow-extra-materials: false` 时是否放入了配方外的材料；
- `ignore-altar-enchantments: false` 时中心附魔是否完全一致；
- 控制台是否提示配方加载失败。

数量多于需求不会导致失败。例如需要 16 个而实际放了 24 个，仍会正常匹配。

## 环绕物品无法放到祭坛

依次检查：

- 配方是否写了 `mode: ADVANCED`；
- 配方是否包含非空的 `surroundings`；
- 当前结构 ID 是否与该高级配方一致；
- 手中物品的来源、材质或自定义 ID 是否与 `surroundings` 完全匹配；
- 已放的其他环绕物是否仍属于同一个可用配方；中心物品不会阻止合法环绕材料放入；
- 是否已达到 `interaction.max-surrounding-slots`；
- 配方是否因 MMOItems、CraftEngine 或 CustomFishing 挂钩缺失而没有加载。

只有满足候选高级配方的物品才会进入环绕轨道。普通物品不会被当作环绕材料。

如果祭坛中心已有不同物品，合法环绕材料仍会进入环绕槽，不应再出现“祭坛中心已有不同物品”的提示。该中心物品只会在最终配方匹配时导致无法开始合成。

## 自定义物品挂钩不可用

启动日志会明确说明 MMOItems、CraftEngine 或 CustomFishing 的挂钩状态。确认前置已启用后，使用 `/blockcraft give` 验证 ID。

### CustomFishing

```text
/blockcraft give <玩家> customfishing rainbow_fish 1
```

如果指令提示无效物品：

- 确认填写的是 CustomFishing 注册物品 ID，不是材质名或显示名称；
- 确认 CustomFishing 内容配置成功加载；
- 使用 Tab 补全查看当前已注册 ID；
- 检查启动日志中是否有 CustomFishing 自身的内容错误。

### CraftEngine

必须使用完整命名空间 ID，例如 `nature:rune_of_earth`。CraftEngine 内容重载后 BlockCraft 会自动刷新显示。

### MMOItems

同时检查 `type` 和 `id`。两者都必须与 MMOItems 注册内容一致。

## GUI 显示屏障图标

屏障 Lore 中的 `{reason}` 会说明原因。常见情况：

- 物品来源插件未安装；
- 自定义物品 ID 不存在；
- 该配方本来就不需要中心物品。

屏障只表示无法生成预览图标，不会自动把错误 ID 替换为原版物品。

## Vault 配方无法启动

安装 Vault 本身还不够，必须有经济插件向 Vault 注册经济服务。启动日志若显示“检测到 Vault，但没有经济插件提供者”，则需要检查经济插件。

## POINTS 配方无法启动

检查：

- PlaceholderAPI 是否启用；
- `balance-placeholder` 是否能对该玩家返回数字；
- 余额输出是否仍包含未解析的 `%变量%`；
- `withdraw-commands` 是否为空；
- 指令是否可以由控制台正常执行；
- 退款指令是否与点券插件语法一致。

## XP 配方无法启动

- `amount` 必须是整数等级，不能填写 `30.5`；
- 玩家当前等级必须大于或等于费用；
- `amount: 30` 扣除的是 30 级，而不是 30 点经验值；
- 等级不足时只拒绝开始，不会消耗祭坛材料。

## YAML 修改后重载失败

常见错误：

- 使用 Tab 缩进；
- 冒号后的含冒号文本没有加引号；
- 缩进层级错误；
- 重复配方 ID；
- 原版材质、附魔或粒子枚举名拼写错误；
- `CRAFTENGINE` ID 没有命名空间。

先查看控制台给出的文件名和中文错误，再恢复最近修改的节点。建议每次只修改少量内容后执行 `/blockcraft reload`。

## 展示物消失但物品仍在

展示实体不是真实存储。先执行 `/blockcraft reload` 刷新；不要直接编辑 `data.yml`。若结构被破坏，修复结构或按服务器备份恢复数据。

## 粒子过多

优先调整：

```yaml
crafting:
  effect-interval-ticks: 8
  particles-per-path: 1
  particle-lifetime-ticks: 4
  magic-circle:
    points: 12
```

详细建议见 [[展示、粒子与音效|Effects-Displays-and-Sounds]]。
