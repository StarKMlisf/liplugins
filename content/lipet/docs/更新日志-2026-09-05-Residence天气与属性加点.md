# LiPet 0.27.18 · Residence 天气与属性加点修复

版本：`0.27.18-SNAPSHOT`，日期：2026-09-05。

## 修复内容

### Residence 局部晴天与烈焰人

Residence 的 `sun=true` 只给领地内玩家设置 `WeatherType.CLEAR`。世界底层仍处于风暴时，原版烈焰人实体继续通过水敏感机制收到 `DROWNING` 伤害，因此玩家看到晴天，LiPet 烈焰人却仍在掉血。

新版增加独立的 Residence 局部天气挂钩和伤害监听器：

- Residence 继续作为 `softdepend`，通过公开接口形状运行时反射读取，不打入 Residence 或 CMILib。
- 只处理带 LiPet `pet_id` 标记的烈焰人。
- 只处理世界有风暴、原版伤害原因为 `DROWNING`，且实体不在水或气泡柱中的情况。
- 读取烈焰人当前位置所属的最深层领地，并按 Residence 自己的父领地继承语义判断 `sun=true`。
- 普通烈焰人、领地外、`sun` 未设置/为 false、`rain=true` 和真实泡水伤害全部保持原版行为。
- Residence 未安装、未启用或 API 查询异常时安全回退为不取消伤害，并限为一次中文警告。

### 连续属性加点显示旧值

属性点原先已经成功写入数据库，但成功回调会再次异步查询玩家的全部宠物。连续点击时，多个刷新可能共用一条更早开始的查询，随后把旧属性和旧剩余点数重新画到 GUI，表现为属性回退或加点没有生效。

新版在数据库确认保存成功后，直接使用这次返回的权威 `PetProfile` 重建属性界面，不再为本次刷新发起第二次数据库查询。扣点、四维加一、revision 乐观锁和活动实体属性刷新规则保持不变。

## 升级方法

1. 正常停止服务器并备份 `plugins/LiPet/` 与数据库。
2. 删除旧 LiPet Jar，只保留 `LiPet-0.27.18-SNAPSHOT.jar`。
3. 完整启动服务器；`/lipet reload` 不能加载本次 Java 代码修复。
4. 安装 Residence 的服务器应看到“已挂钩 Residence，领地局部晴天会保护 LiPet 烈焰人”日志。
5. 在世界雨天进入 `sun=true` 领地测试 LiPet 烈焰人；再放入水中确认仍会受伤。

本次没有新增或修改 YML 节点，不覆盖 Residence Flag、宠物属性、GUI、模型、食物、价格或其他管理员设置。

## 验证

- 默认 Paper 1.21.11 兼容 API：349 项测试通过，失败、错误和跳过均为 0。
- Paper 26.2 Build 111 API Profile：349 项测试通过，失败、错误和跳过均为 0。
- Residence 6.0.3.2 源码接口复核：`getResidenceManager()` → `getByLoc(Location)` → `getPermissions()` → `has(flag, false)`，与 Residence 的 `FlagCombo.OnlyTrue` 和父领地继承语义一致；进入领地时 `rain` 在 `sun` 之后处理，因此两者同时启用时按雨天处理。
- Paper 26.2 Build 111 隔离服：LiPet 与 Residence 天气挂钩正常启用；`sun=true` 时 LiPet 烈焰人风暴水敏感事件被取消，普通烈焰人不取消；移除 `sun` 或同时启用 `sun` 与 `rain` 后，LiPet 烈焰人事件均不取消。
- 同一隔离服把 LiPet 烈焰人放进真实水方块，生命从 20 降至 10，证明水/气泡柱边界没有被误保护；测试服务器随后安全停止，未执行电脑关机。

最终 Jar：903969 字节；SHA-256：`6C4CE0677752ED482BDA82B7B81DBB6D4E5F0C631A68DA251AE613A1346AAB49`。
