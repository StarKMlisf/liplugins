# 离线迁移与旧档核对

迁移前必须停止会读写这些玩家数据的服务器和脚本，并保留源、目标及世界完整备份。MySQL 服务本身可以继续运行，但 LiSkills 和其他写入程序必须停止。

迁移不是改一行配置，也不是把旧目录覆盖到新目录。先预检，核对冲突和范围，再显式执行。

## 已有 LiSkills 更换存储

LiSkills 工程中的 `tools/migrate-storage.ps1` 支持 YAML、SQLite、MySQL 任意两端复制。以下命令以你已取得同版工具、Jar 和依赖为前提，本导航不托管这些文件。准备两个独立、互不包含的数据目录、两份完整 `storage.yml` 副本、当前 Jar、API 依赖和独立驱动目录。

~~~powershell
# 路径均为示例；默认只预检，不写入玩家档案。
& .\tools\migrate-storage.ps1 `
  -PluginJar 'C:\migration\LiSkills-1.13.0.jar' `
  -SourceDirectory 'C:\migration\old-data' `
  -SourceConfig 'C:\migration\from.yml' `
  -TargetDirectory 'C:\migration\new-data' `
  -TargetConfig 'C:\migration\to.yml' `
  -DriverDirectory 'C:\migration\drivers' `
  -ApiDirectory 'C:\migration\lib\api'
~~~

按同一命令追加 `-Apply` 才执行。工具需要 Java 25；SQL 模式按固定版本校验驱动。源和目标的类型由各自配置决定，工具不替你修改正式服 `storage.yml`。

相同 UUID 的全部字段一致才跳过，不同档案禁止覆盖，不取“等级较大值”自动合并。发现任一冲突时本批次拒绝写入。过程中磁盘或网络故障可能留下部分已新增档案；修复后相同结果可跳过，但要先保留报告核对，不能盲目删档重跑。

预检退出成功只表示没有冲突，不代表已复制。显式执行成功后还要核对数量和抽样字段，再部署目标并重启服务器。

## 旧技能系统导入范围

`tools/migrate-legacy.ps1` 位于 LiSkills 源码工程中。若你已取得同版完整工程，在包含 `pom.xml` 的项目根目录运行 `./build.ps1`，准备 `target/LiSkills-1.13.0.jar` 与 `lib/api/` 后再执行下面命令。仅把插件 Jar 放在脚本旁边不能满足这个入口的目录要求；本导航只说明用法，不提供或交付工程文件。

`SourceUserdata` 指向旧玩家 YAML，`TargetPlayers` 指向 LiSkills 新玩家目录。默认预检，显式 `Apply` 才新建目标，格式来源见[许可及来源](License.md)。

~~~powershell
# 默认只预检；路径改为停服备份中的实际位置，不创建或覆盖玩家档案。
& .\tools\migrate-legacy.ps1 `
  -SourceUserdata 'C:\migration\old-userdata' `
  -TargetPlayers 'C:\migration\LiSkills\players'

# 全批次预检通过并核对备份后，使用相同参数追加 -Apply 才执行。
& .\tools\migrate-legacy.ps1 `
  -SourceUserdata 'C:\migration\old-userdata' `
  -TargetPlayers 'C:\migration\LiSkills\players' `
  -Apply
~~~

可以用 `-JavaHome` 指定 Java 25。脚本需要同版已构建 Jar 和 API 依赖；不要使用 `java -jar` 直接启动插件。

旧格式导入只处理支持的 15 项技能等级与本级经验，不直接读取私有 SQL 表，不迁移魔力、旧属性点、能力阶级、装备标签、冷却、权限、任务或第三方数据。九属性和被动按新配置及导入后的等级重新计算；耐力、治疗、锻造和法术分别保留独立进度。15 项之外的旧自定义技能会在报告中列出并忽略，不会自动变成 LiSkills 自定义技能。

源文件名和文件内 UUID 必须一致；等级须为 1–1000 的整数，经验须为非负有限数字。0 级、重复技能、损坏数据、UUID 不符及目标同名文件已存在都会明确拒绝，不擅自改数值，也不覆盖正在使用的 LiSkills 档案。

这与上面的 LiSkills 存储迁移不同：旧格式导入遇到已有同名目标，即使内容相同也不会幂等跳过。写入途中发生故障可能留下部分本次新文件，应保留报告并核对或恢复迁移前备份，不能直接反复追加 `-Apply` 期待覆盖续传。源目录与目标目录相同或互相包含时也会拒绝。

如果以前的导入器跳过了四项额外技能，更新插件无法从缺失数据中还原旧等级。请保留原源备份，先导入新的空目录核对，再制定数据合并方案；不要清空已经继续游玩的正式档案。

## 不会一起迁移的资料

技能存储迁移只搬技能快照。奖励和收入的权威记录在 `reward-ledger/`；职业选择、HUD 偏好、持久玩家加成与背包在世界玩家数据中；人工来源标记在区块中。它们都需要另行备份和迁移。

旧装备先由管理员手持执行 `/lsk item legacy-preview`，仅支持且完整的标签才使用 `legacy-migrate` 转换。技能导入不会自动转换全服背包。

存在未解决 `recovery`、临时文件或不完整导出时，先备份并人工核对。不要跳过恢复证据迁移较旧数据。

相关页面：[存储与备份](Storage.md)、[装备与物品](Items.md)、[安装与升级](Installation.md)。
