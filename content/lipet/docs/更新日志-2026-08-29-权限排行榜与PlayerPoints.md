# LiPet 0.26.19 权限组、排行榜与 PlayerPoints 更新

日期：2026-08-29  
版本：`0.26.19-SNAPSHOT`

## 权限组修复

- 新增 `lipet.player` 普通玩家权限组，`default: true`，安装插件后由 Bukkit 自动授予。
- 普通玩家可用的菜单、商城、仓库、召唤、收回、骑乘、改名、放生、删除、余额、排行榜和捕捉权限均明确写成 `children: true`。
- `lipet.admin` 显式继承 `lipet.player: true`，并继续保留原来的逐项子权限，兼容现有权限插件和旧权限配置。
- 新增排行榜权限 `lipet.command.top`，默认玩家可用。

## 两种排行榜

```text
/lipet top coin [页码]
/lipet top level [页码]
```

- `coin` 按 LiPet 内置宠物币余额从高到低排列。
- `level` 按宠物等级、当前经验从高到低排列，并显示宠物名与主人。
- 每页数量由 `config.yml` 的 `leaderboard.page-size` 控制，范围 `1-20`。
- SQLite 与 MySQL 都使用数据库排序、`LIMIT/OFFSET` 分页；不会在 Bukkit 主线程加载全部账户或宠物。
- 宠物币榜只统计已经建立过 LiPet 内置货币账户的玩家；从未产生账户记录的玩家不会凭空进入排行。
- 标题、条目、空数据、错误和用法文本全部位于 `messages.yml`，支持 MiniMessage 自定义。

## PlayerPoints 商城货币

```yaml
currency: "PLAYERPOINTS"
price: 100
```

- PlayerPoints 是可选软依赖；未安装时 LiPet 继续正常启动，使用该货币的商品显示货币不可用。
- LiPet 运行时挂钩 PlayerPoints 3.x 的 `look`、`take`、`give` API，不把 PlayerPoints 打入 LiPet Jar。
- PlayerPoints 使用整数点券，因此价格必须是 `0-2147483647` 的整数；非法配置会在加载时给出中文路径提示。
- 购买失败仍沿用 LiPet 的自动退款流程。
- `/lipet status` 会独立显示 `PlayerPoints: ONLINE/OFFLINE`。

## 验证记录

- Maven `-Ppaper-26.2 clean package`：116 项测试通过，0 失败。
- Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5：两插件正常启用，LiPet 日志确认 PlayerPoints 挂钩成功。
- `/lipet status` 实测显示 `PlayerPoints: ONLINE`。
- 真实 SQLite 账户完成宠物币榜排序；离线 UUID 发放宠物后，宠物等级榜显示主人、宠物名、等级和经验。
- LiPet 与 PlayerPoints 均正常关闭，未出现 LiPet 保存错误。
- 成品 SHA-256：`210DEC705F16F3FD2F5E9B4B0C65A3BD68A35C8C79F521466026A8DA8908BF15`。

运行验证没有在线客户端，因此商城实际点击扣除 PlayerPoints 的客户端流程仍应在目标测试服用普通玩家账号做一次最终确认；反射 API 形状、整数金额规则和挂钩加载已有自动测试与真实服务器验证。
