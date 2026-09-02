# 五分钟快速上手

本页目标是创建一个最小可玩的经典地牢：玩家进入后看到标题，走到终点触发完成并返回出口。第一次操作建议在测试服进行。

## 1. 安装后先验收

启动服务器后执行：

```text
/lidungeon help
```

应看到 LiDungeon 版本号、中文分页帮助和 `/lidungeon` 命令。如果仍显示 `/md`，说明服务器加载的不是当前 Jar，或 `plugins/update/`、面板自动部署目录里还有旧文件。

控制台应出现功能、触发器和条件加载数量。无 MythicMobs、Citizens、PlaceholderAPI 时，基准值是：

```text
38 个功能 / 15 个触发器 / 9 个条件
```

## 2. 创建地牢

站在测试服中，以管理员身份执行：

```text
/lidungeon create tutorial classic lidungeon:void NORMAL
```

参数含义：

- `tutorial`：地牢 ID，建议只用小写英文、数字、下划线。
- `classic`：经典整图地牢。
- `lidungeon:void`：LiDungeon 虚空生成器。
- `NORMAL`：普通世界维度；还可使用 `NETHER`、`THE_END`。

创建成功后再执行：

```text
/lidungeon edit tutorial
```

`edit` 只能打开已经存在的地牢。出现“找不到地牢”时不要反复执行，应先检查 `create` 是否成功以及 `maps/tutorial/` 是否存在。

> Folia 不适合在运行中创建世界。Folia 正式服请先在 Paper 测试服创建并完成模板，再迁移 `maps/tutorial/`；详见 [Folia 与多世界实例](Folia与多世界.md)。

## 3. 设置三个位置

进入编辑实例后按顺序设置：

```text
/lidungeon setlobby
/lidungeon setspawn
```

- `setlobby`：启用大厅时，玩家先到这里等待。
- `setspawn`：地牢正式开始后，玩家从这里出发。

随后回到主世界，站在通关后要返回的位置执行：

```text
/lidungeon setexit tutorial
```

出口属于地牢配置，不要求在编辑实例内设置。

## 4. 放置最小流程

在编辑实例内领取功能构建器：

```text
/lidungeon functiontool
```

使用工具在地牢起点附近放置一个“地牢开始”触发器，可附加标题或消息功能；在终点放置“玩家检测器”触发器，并绑定“完成地牢”功能。

最小通关闭环是：

```text
玩家检测器 -> 完成地牢
```

不要用“离开地牢”代替“完成地牢”。只有“完成地牢”会登记通关，并按 `AccessCooldown.CooldownOnFinish` 处理进入冷却。

如果开启 `General.Lobby.Enabled: true`，还必须在大厅放置一个可触发的“开始地牢”功能，例如：

```text
右键方块 -> 开始地牢
```

## 5. 保存并离开编辑

执行：

```text
/lidungeon save
/lidungeon leave
```

看到保存成功后再离开。程序化地牢需要强制把所有房间标记为已修改时，可使用：

```text
/lidungeon save force
```

经典地牢在 Folia 下可能要等最后一名编辑者离开后才提交完整方块区域；不要在保存过程中关服或覆盖地图目录。

## 6. 测试玩家流程

给测试账号至少授予：

```text
dungeons.play
lidungeon.core
```

执行：

```text
/lidungeon play tutorial
```

依次验证：

1. 玩家能进入，没有停在排队或准备状态。
2. 出生点方向正确。
3. 终点触发器只触发预期次数。
4. 完成后回到出口。
5. `globalplayerdata/` 中的完成记录正常写入。
6. 再次进入时，钥匙、费用和冷却按配置生效。

## 7. 上线前再做一次多人测试

创建两人队伍，验证队长发起、队员距离、准备确认、死亡和断线重连。推荐测试以下分支：

- 全员准备；
- 一人未准备直到超时；
- 一人在其他世界或超过 `MaxPartyDistance`；
- 一人中途退出；
- 所有人耗尽生命；
- 最后一人离开后实例是否清理。

完整检查表见[上线验收清单](验证清单.md)。
