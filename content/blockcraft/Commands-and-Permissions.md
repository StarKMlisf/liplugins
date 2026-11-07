# 指令与权限

主指令：

```text
/blockcraft
```

别名：`/bc`、`/altar`。所有子指令都有 Tab 补全。

## 指令列表

| 指令 | 用途 | 执行者 | 权限 |
| --- | --- | --- | --- |
| `/blockcraft help` | 显示帮助 | 玩家/控制台 | `blockcraft.use` |
| `/blockcraft info` | 查看准星所指祭坛状态 | 玩家 | `blockcraft.command.info` |
| `/blockcraft preview <配方ID>` | 打开只读配方预览 | 玩家 | `blockcraft.command.preview` |
| `/blockcraft cancel` | 取消附近自己发起的合成 | 玩家 | `blockcraft.command.cancel` |
| `/blockcraft reload` | 重载配置、结构、消息、GUI 和配方目录 | 玩家/控制台 | `blockcraft.command.reload` |
| `/blockcraft debug` | 检查准星所指结构 | 玩家 | `blockcraft.command.debug` |
| `/blockcraft give ...` | 生成原版或挂钩物品 | 玩家/控制台 | `blockcraft.command.give` |

`blockcraft.admin` 玩家执行 `/blockcraft cancel` 时，可以取消搜索范围内其他玩家发起的合成。

## Give 指令

```text
/blockcraft give <玩家> vanilla <材质> [数量]
/blockcraft give <玩家> mmoitems <类型> <ID> [数量]
/blockcraft give <玩家> craftengine <命名空间:ID> [数量]
/blockcraft give <玩家> customfishing <物品ID> [数量]
```

数量范围为 1-64。目标玩家必须在线。自定义来源不可用或 ID 不存在时，不会生成替代物品。

## 权限节点

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `blockcraft.use` | 所有玩家 | 使用主指令和祭坛交互 |
| `blockcraft.recipe.*` | 所有玩家 | 使用全部祭坛配方 |
| `blockcraft.recipe.<配方ID>` | 由权限插件决定 | 使用单个配方 |
| `blockcraft.command.info` | 所有玩家 | 查看祭坛信息 |
| `blockcraft.command.preview` | 所有玩家 | 打开配方预览 |
| `blockcraft.command.cancel` | 所有玩家 | 取消自己发起的合成 |
| `blockcraft.command.reload` | OP | 重载插件 |
| `blockcraft.command.debug` | OP | 调试结构 |
| `blockcraft.command.give` | OP | 生成测试物品 |
| `blockcraft.admin` | OP | 包含全部 BlockCraft 权限和管理能力 |

## 配方权限

配方可以单独配置：

```yaml
permission: 'blockcraft.recipe.nature_crystal'
```

玩家满足以下任意一项即可使用：

- 拥有该配方填写的权限；
- 拥有 `blockcraft.recipe.*`；
- 拥有 `blockcraft.admin`。

留空字符串表示该配方不做额外权限检查，但玩家仍需 `blockcraft.use` 才能与祭坛交互。

