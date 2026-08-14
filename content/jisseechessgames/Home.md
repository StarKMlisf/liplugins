# JisseeChessGames 2.1.0

这是配套 `Jissee-Chess-CE-1.0.3` 的 Bukkit/Paper 棋类插件。2.1.0 可以以目标方块为中心自动生成五类官方棋盘，为每块棋盘显示可右击加入的状态全息，并为五子棋、中国象棋和军棋提供统一的双人房间、回合控制、合法移动、吃子/战斗、胜负、持久化和重启恢复。插件同时保留 [Jissee/Chess 原模组](https://www.mcmod.cn/class/6109.html)中的骰子随机、工具快速回收和房间外手动军棋比较。

## 运行要求

- Java 25
- Paper 26.1.2（基准验证版本）
- CraftEngine 26.7.4 或兼容版本
- `Jissee-Chess-CE-1.0.3` 资源包

Vault 和 PlaceholderAPI 为可选软依赖；当前只保留检测与扩展接口，不会强制安装。

## 安装

1. 解压 `Jissee-Chess-CE-1.0.3.zip`。
2. 把其中的 `resources/chess` 目录复制到服务端的 `plugins/CraftEngine/resources/chess`。
3. 把 `JisseeChessGames-2.1.0.jar` 放入服务端 `plugins` 目录。
4. 完整重启服务端，不建议使用第三方热加载插件。
5. 在控制台执行 `/cg validate`；插件会检查五类棋盘、棋子和骰子所需的全部 CE 方块。

## 自动生成棋盘

管理员先看向 8 格以内的一块地面。目标方块会作为棋盘中心，玩家朝向决定双方与棋盘文字方向；目标点四周必须留出对应尺寸的两格高完整空间。偶数边长会使用靠起始侧的两个中央格之一。

```text
/cg arena create gomoku_main gomoku 15
/cg arena create weiqi_main weiqi
/cg arena create xiangqi_main xiangqi
/cg arena create junqi_main junqi
/cg arena create flight_main flight
```

固定尺寸和来源：

- 五子棋：9×9～19×19，默认 15×15；保留边框和星位。
- 围棋：19×19，来自上游官方 `weiqi_board.nbt`。
- 中国象棋：10×9，来自上游官方 `cncb_ew.nbt`，包含九宫、楚河汉界和炮/兵标记。
- 军棋：13×5，来自上游官方 `mtcb_ew.nbt`，包含铁路、公路、行营和大本营。
- 飞行棋：31×31，来自上游官方 `flight_chess_board.nbt`，包含完整四色区域和路线。

新建象棋会自动摆放标准 32 枚棋子；新建军棋会自动摆放双方各 25 枚棋子的合法预设阵型，军旗位于大本营、地雷位于后两排、所有行营保持为空。近侧棋子朝向创建者，远侧棋子朝向棋盘另一端的玩家。五子棋和围棋按规则从空盘开始；当前 CE 资源没有独立飞行棋飞机棋子，所以飞行棋只生成完整棋盘。

已有的空象棋或军棋棋盘可补摆开局棋子：

```text
/cg arena setup xiangqi_main
```

为避免误覆盖，棋子层存在任何方块时该指令会拒绝执行。旧命令 `/cg arena create <名称> [尺寸]` 仍按五子棋处理。`/cg arena types` 可查看类型，`/cg arena list` 会显示类型和尺寸。

## 棋盘全息大厅

每块建造完成的棋盘都会在靠近创建者的一侧显示原生全息，不需要安装 DecentHolograms、HolographicDisplays 等额外插件。全息会自动显示棋类、棋盘名、当前状态和玩家人数：

- 空闲：显示 `0/2`，玩家右击全息会自动建立房间并成为房主。
- 等待：显示 `1/2` 和房主名，另一名玩家右击后直接加入并开始。
- 进行中：显示 `2/2`、双方名字和当前行动玩家，其他玩家不能加入。
- 对局结束：提示棋盘正在等待自动重置。
- 围棋、飞行棋：显示“暂未开放自动对局”，保留手动游玩，不会误建房间。

全息使用 Bukkit 原生 `TextDisplay` 显示文字、`Interaction` 接收右击，始终朝向观看者。无人区域不会被全息强制加载；玩家靠近使棋盘区块加载后，全息会在最多一个刷新周期内出现。`config.yml` 的 `holograms` 节点可调整开关、刷新周期、高度、棋盘外偏移、点击范围和可视距离；`/cg reload` 会安全重建全息并应用新值。

## 自动双人对局

五子棋、象棋和军棋使用同一组指令。第一名玩家选择对应棋盘创建房间：

```text
/cg create room1 棋盘名
```

第二名玩家加入：

```text
/cg join room1
```

玩法：

- 五子棋：双方按回合右击空交点，自动判定横、竖、斜线五连和满盘和棋。
- 中国象棋：先右击己方棋子，再右击目标格；自动检查车、马腿、象眼、仕/将九宫、炮架、兵过河、将帅照面、送将、将军、将死和困毙。红方按标准规则先行。
- 军棋：先右击己方棋子，再右击目标格；自动检查公路一步移动、铁路直行、阻挡、工兵铁路转弯、行营保护、大本营禁移、地雷、炸弹、军旗和无棋可走。黑方先行。

军棋采用固定的双方各 25 枚合法预设阵型，适合两名玩家分别站在棋盘短边两端。棋子文字朝向各自玩家；军旗与地雷不可移动，进入大本营的棋子也不能再移动。最终棋面默认展示 8 秒，然后恢复为该棋类的初始状态，棋盘可继续创建下一局。

自动房间会锁定棋子层，阻止手动放置、镐回收和手持棋子比较。没有创建房间时，象棋和军棋棋盘仍保留原模组式手动操作。

## 指令

| 指令 | 说明 | 权限 |
| --- | --- | --- |
| `/cg help` | 显示帮助 | `jisseechessgames.use` |
| `/cg create <房间> <棋盘>` | 创建五子棋、象棋或军棋自动房间 | `jisseechessgames.play` |
| `/cg join <房间>` | 加入等待中的双人房间 | `jisseechessgames.play` |
| `/cg leave` | 离开等待房间或认输 | `jisseechessgames.play` |
| `/cg resign` | 主动认输 | `jisseechessgames.play` |
| `/cg list` | 查看房间列表 | `jisseechessgames.use` |
| `/cg status [房间]` | 查看对局状态 | `jisseechessgames.use` |
| `/cg dice` | 获取 CE 骰子 | `jisseechessgames.dice` |
| `/cg arena create <名称> <类型> [尺寸]` | 分批自动生成指定类型棋盘 | `jisseechessgames.arena.admin` |
| `/cg arena setup <名称>` | 给空的象棋或军棋棋盘摆放开局棋子 | `jisseechessgames.arena.admin` |
| `/cg arena types` | 查看全部棋盘类型 | `jisseechessgames.use` |
| `/cg arena delete <名称>` | 删除未占用棋盘 | `jisseechessgames.arena.admin` |
| `/cg arena tp <名称>` | 传送到棋盘中心 | `jisseechessgames.arena.admin` |
| `/cg arena list` | 查看棋盘列表 | `jisseechessgames.use` |
| `/cg stop <房间>` | 强制停止并清理房间 | `jisseechessgames.admin` |
| `/cg reload` | 安全重载配置和消息 | `jisseechessgames.admin` |
| `/cg validate` | 检查 CE 核心资源 | `jisseechessgames.admin` |

主指令别名为 `/cg` 和 `/qgame`。所有子指令都带 Tab 参数联想。

## 原模组交互

- 骰子正常放置后会随机朝向；按 Q 丢出后，静止一段时间会转为随机骰子方块。
- 镐左击棋子、斧左击棋盘可直接回收到背包，不消耗工具耐久。
- 未创建自动房间时，手持军棋右击已放置军棋可比较等级。炸弹参与时同归于尽；工兵可排雷；其他棋子撞雷时同归于尽。
- 自动棋盘区域受到破坏、放置、爆炸和活塞保护；管理员可用 `jisseechessgames.protection.bypass` 绕过玩家操作保护。
- 非五子棋棋盘的底层仍受保护，但棋子层允许放置 CE 象棋、围棋和军棋棋子；使用镐快速回收棋子。

## 持久化与配置

- `config.yml`：棋盘居中、自动开局棋子、三类自动房间、CE ID、保护、骰子和可选适配设置。
- `messages.yml`：所有玩家消息，支持 MiniMessage、RGB 与渐变。
- `arenas.yml`：已注册棋盘。
- `rooms.yml`：等待中和进行中的房间、双方 UUID、回合与每一格棋子。

升级时插件只补充缺失配置节点，不覆盖已有自定义值。活动对局会在每次落子后保存，正常重启后自动恢复棋面。

## 当前范围

2.1.0 已完成五类棋盘生成、棋盘状态全息与右击快捷加入，以及五子棋、中国象棋和固定预设阵型军棋的双人自动对局。围棋提子/打劫/数目和飞行棋掷骰/四方回合尚未接入自动房间；军棋暂不提供玩家自定义秘密布阵，世界模型的保密程度取决于双方是否留在各自棋盘端。

## 构建

编译期 API 全部位于 `lib/`，最终 JAR 不会打包这些依赖。

```powershell
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot"
.\gradlew.bat clean build selfTest --no-daemon --console=plain
```

构建与规则测试通过时会输出 `GAME_RULES_SELF_TEST PASS`。

## 许可证

插件源码使用 GPL-3.0。Jissee/Chess 原项目和 CE 资源移植的来源、许可证与素材说明包含在 `Jissee-Chess-CE-1.0.3.zip` 中。
