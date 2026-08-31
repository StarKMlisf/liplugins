import type { DocEntry } from './docs';

// LiSkills Wiki 元数据；project 由 docs.ts 的 defineDocs 统一补入。
export const liSkillsDocDefinitions: Omit<DocEntry, 'project'>[] = [
  {
    "file": "Home.md",
    "slug": "home",
    "title": "LiSkills 文档首页",
    "summary": "完整职业技能、HUD、安装与管理文档入口。",
    "group": "文档总览",
    "order": 1
  },
  {
    "file": "Skills.md",
    "slug": "skills",
    "title": "完整 15 职业技能",
    "summary": "查看技能ID、自然经验来源与耐力、治疗、锻造、法术的独立进度。",
    "group": "玩家文档",
    "order": 10
  },
  {
    "file": "Progression.md",
    "slug": "progression",
    "title": "成长、属性与主动能力",
    "summary": "理解70被动、九属性、魔力、工具与战斗主动以及默认生存上限。",
    "group": "玩家文档",
    "order": 11
  },
  {
    "file": "HUD-Uninstall.md",
    "slug": "hud-uninstall",
    "title": "HUD 与安全卸载",
    "summary": "设置生命魔力条、个人开关，并正确恢复技能生命加成。",
    "group": "玩家文档",
    "order": 12
  },
  {
    "file": "Commands.md",
    "slug": "commands",
    "title": "命令与权限",
    "summary": "玩家查询、管理员修改、装备编辑、HUD和权限速查。",
    "group": "玩家文档",
    "order": 13
  },
  {
    "file": "Installation.md",
    "slug": "install",
    "title": "安装与升级",
    "summary": "Paper与Folia环境、首次启动、依赖、备份和升级配置保护。",
    "group": "管理员文档",
    "order": 20
  },
  {
    "file": "Configuration.md",
    "slug": "config",
    "title": "配置文件与平衡",
    "summary": "16份中文配置、数值上限、经验曲线、菜单与安全重载。",
    "group": "管理员文档",
    "order": 21
  },
  {
    "file": "Sources-AntiExploit.md",
    "slug": "sources",
    "title": "来源与防刷",
    "summary": "真实采集、人工标记、保护取消、交易验证和区域边界。",
    "group": "管理员文档",
    "order": 22
  },
  {
    "file": "Items.md",
    "slug": "items",
    "title": "装备与物品门槛",
    "summary": "六槽装备、属性特性、自然经验倍率、等级要求与手持编辑。",
    "group": "管理员文档",
    "order": 23
  },
  {
    "file": "Jobs-Rewards.md",
    "slug": "jobs-rewards",
    "title": "职业、奖励与排行",
    "summary": "职业选择、Vault收入、升级奖励、防重账本和异步缓存榜单。",
    "group": "管理员文档",
    "order": 24
  },
  {
    "file": "Storage.md",
    "slug": "storage",
    "title": "存储与备份",
    "summary": "YAML、SQLite、MySQL、恢复记录及技能导出边界。",
    "group": "管理员文档",
    "order": 25
  },
  {
    "file": "Migration.md",
    "slug": "migration",
    "title": "离线迁移与旧档核对",
    "summary": "默认预检、完整15技能导入、存储搬迁、不覆盖和分项备份。",
    "group": "管理员文档",
    "order": 26
  },
  {
    "file": "Placeholders.md",
    "slug": "placeholders",
    "title": "PlaceholderAPI 占位符",
    "summary": "完整变量示例、内存快照、经验字段与HUD内部变量区别。",
    "group": "管理员文档",
    "order": 27
  },
  {
    "file": "Compatibility.md",
    "slug": "compatibility",
    "title": "Folia、Shiroha 与插件联动",
    "summary": "区域调度、跨区限制、依赖兼容和未实测构建的边界。",
    "group": "管理员文档",
    "order": 28
  },
  {
    "file": "Changelog.md",
    "slug": "changelog",
    "title": "更新说明",
    "summary": "1.13.0区域线程适配与近期职业、HUD更新。",
    "group": "管理员文档",
    "order": 29
  },
  {
    "file": "API.md",
    "slug": "api",
    "title": "开发者 API",
    "summary": "服务注册、自然经验事件、线程要求与独立API边界。",
    "group": "开发者文档",
    "order": 40
  },
  {
    "file": "License.md",
    "slug": "license",
    "title": "许可与来源",
    "summary": "GPL-3.0、原作者署名、对应源码和衍生修改范围。",
    "group": "开发者文档",
    "order": 41
  }
];

