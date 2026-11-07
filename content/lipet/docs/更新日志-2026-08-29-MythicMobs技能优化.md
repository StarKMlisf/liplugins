# LiPet 0.27.1 MythicMobs 技能优化

日期：2026-08-29

版本：`0.27.1-SNAPSHOT`

## 本次优化

- 冷却判断提前到概率抽取之前，冷却中的技能不再重复生成随机数。
- 宠物行为循环中的 `PASSIVE` 与 `INTERVAL` 改为一次扫描，减少定时热路径遍历。
- 技能冷却表只每分钟清理一次已离线宠物记录，不再每 10 tick 构造活动 UUID 集合。
- MythicMobs 返回 `false` 时保留配置冷却；零冷却技能失败后至少退避 1 秒，防止错误技能名或长期不满足的 MM 条件每 tick 重试。
- 失败日志由全局限频改为按技能名独立限频，每项错误技能 30 秒最多提示一次；MM 单纯返回 `false` 也会给出可排查的中文日志。
- 反射挂钩兼容实例或静态 `getAPIHelper()`，同时支持七参数 API 的 `float power` 与 `double power`。
- `/lipet status` 增加“技能类型”和“规则”统计，直接显示含启用规则的宠物类型数和启用规则总数。
- 历史官方 `status-mythicmobs` 默认语言会自动补入统计变量；服主自定义状态文本与注释不会被覆盖。

## 验证结果

- 默认 Maven 构建：148 项测试通过，失败、错误、跳过均为 0。
- Paper 26.2 Profile：148 项测试通过，失败、错误、跳过均为 0。
- Paper 26.2 Build 111 + Java 25 + PlayerPoints 3.3.5 隔离实服启动成功。
- 使用旧 `messages.yml` 和一条已启用的 MM 占位规则验证：状态语言自动迁移，`/lipet status` 显示 PlayerPoints `ONLINE`、MythicMobs `OFFLINE`、技能类型 `1`、规则 `1`。
- `/lipet reload` 成功，重载后统计保持一致；服务器安全关闭，LiPet 日志无报错。
- 当前环境没有真实 MythicMobs Jar，真实 MM 技能在战斗中的最终施放仍需在安装 MM 的目标测试服确认；反射调用、目标和两种 `power` 参数类型已由自动测试覆盖。

## 成品

- 文件：`target/LiPet-0.27.1-SNAPSHOT.jar`
- 大小：`750989` 字节
- SHA-256：`B4630BFD0F23FD9CA0003B057269DED973ADD6E5C2743F6785523C45BA671B27`
