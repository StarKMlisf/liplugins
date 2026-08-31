# 许可、来源与修改说明

LiSkills 1.13.0 是独立维护的精简派生实现。上游为 **AuraSkills 2.3.12**，原作者 **Archyx**，源码地址为 [Archy-X/AuraSkills](https://github.com/Archy-X/AuraSkills)，采用 **GPL-3.0** 许可证。LiSkills 与上游维护者没有官方从属关系，不声称拥有上游商标或得到其认可。

技能 ID、部分经验和成长默认数值、职业及能力定义参考上游源码与 Legacy 预设。本项目重新实现 Bukkit 运行层、中文配置、命令、菜单、存储、迁移、防刷、有限任务队列、HUD 与 Folia 兼容层。完整改动历史保存在发行包的 `NOTICE.md`。

玩家界面使用 LiSkills 名称，不改变来源署名、许可证义务或历史格式兼容性。法术没有默认主动或被动，亦不宣称等价实现上游所有 API、主题、语言包和第三方扩展。

## 源码和许可证

发行包保留 `LICENSE.md` 与 `NOTICE.md`，Jar 内包含 `META-INF/LICENSE.GPL-3.0.txt`。完整对应源码与构建资料随发行提供。再分发或修改时，请阅读随包许可证全文并履行其要求；本页只是项目说明，不替代许可证文本。

公共依赖不与业务代码合并打包，使用各自许可证，由服务端提供或按固定版本单独下载。Paper、Folia、Shiroha 和商业联动插件的实现不包含在 LiSkills 成品中。

## 历史格式工具

旧玩家 YAML 导入入口为发行源码中的 `tools/migrate-auraskills.ps1`，使用 `SourceUserdata`、`TargetPlayers`，默认预检，显式 `Apply` 才新建目标。它识别旧命名空间及完整 15 技能 ID，但只迁移支持的等级和本级经验，不是 AuraSkills API、私有 SQL 表或整服数据的替换工具。

普通玩家无需操作迁移脚本。管理员应先阅读[离线迁移](Migration.md)，停止服务器并完整备份，保留原始来源资料，不覆盖继续游玩的目标档案。

