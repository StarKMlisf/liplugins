import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type DocGroup = '文档总览' | '玩家文档' | '管理员文档' | '开发者文档' | '附魔详情';

export interface DocEntry {
  project: string;
  file: string;
  slug: string;
  title: string;
  summary: string;
  group: DocGroup;
  order: number;
  sidebar?: boolean;
}

export interface DocSet {
  slug: string;
  name: string;
  version: string;
  summary: string;
  icon: 'grass' | 'leaf' | 'ice' | 'meteor' | 'book' | 'redstone' | 'gold' | 'amethyst';
  groups: DocGroup[];
  docs: DocEntry[];
}

type DocDefinition = Omit<DocEntry, 'project'>;

const defineDocs = (project: string, definitions: DocDefinition[]): DocEntry[] =>
  definitions.map((definition) => ({ project, ...definition }));

const liseasonsDocs = defineDocs('liseasons', [
  { file: 'Home.md', slug: 'home', title: 'LISeasons', summary: 'LISeasons 的使用、配置、维护和扩展指南。', group: '文档总览', order: 1 },
  { file: '玩家文档.md', slug: 'player', title: '玩家文档 · 总览', summary: '从查询季节、打开手账到应对冷暖与流星雨，快速开始 LISeasons 生存。', group: '玩家文档', order: 10 },
  { file: '玩家-四季与节气.md', slug: 'player-seasons', title: '看懂四季与节气', summary: '看懂日期、换季、群系颜色、冰雪、露天作物和二十四节气。', group: '玩家文档', order: 11 },
  { file: '玩家-体温生存.md', slug: 'player-temperature', title: '体温生存指南', summary: '读取体温与潮湿提示，并用环境、装备、物品和食物应对冷热。', group: '玩家文档', order: 12 },
  { file: '玩家-季节事件.md', slug: 'player-events', title: '季节事件与流星雨', summary: '了解 16 种默认事件的真实效果、高空流星和陨星奖励。', group: '玩家文档', order: 13 },
  { file: '玩家-日历与节日.md', slug: 'player-calendar', title: '日历与节日', summary: '使用六页季节手账，并分清世界日历、现实节日与到来提醒。', group: '玩家文档', order: 14 },
  { file: '玩家指令.md', slug: 'player-commands', title: '常用指令', summary: '普通玩家可用的日期、日历、事件与节日查询指令。', group: '玩家文档', order: 15 },
  { file: '管理员文档.md', slug: 'admin', title: '管理员文档 · 总览', summary: '面向服主与运维人员的 LISeasons 部署、配置、备份、性能和排障入口。', group: '管理员文档', order: 20 },
  { file: '功能清单.md', slug: 'features', title: '功能清单', summary: '按日历、世界、玩家、事件、界面和运维分类当前能力。', group: '管理员文档', order: 21 },
  { file: '安装与升级.md', slug: 'install', title: '安装与升级', summary: '前置依赖、首次安装、升级、重载与完整重启。', group: '管理员文档', order: 22 },
  { file: '日期-季节与二十四节气.md', slug: 'calendar-and-seasons', title: '日期、季节与二十四节气', summary: '三种日期模式、状态存储、节气表以及自动与手动状态。', group: '管理员文档', order: 23 },
  { file: '季节效果与世界规则.md', slug: 'world-rules', title: '季节效果与世界规则', summary: '作物、天气、视觉、生物以及冬冻春融。', group: '管理员文档', order: 24 },
  { file: '体温系统.md', slug: 'temperature', title: '体温系统', summary: '体温公式、潮湿、环境、装备、物品、HUD 与极端温度效果。', group: '管理员文档', order: 25 },
  { file: 'NMS季节染色.md', slug: 'nms-biome-color', title: 'NMS 季节染色', summary: '版本适配、批量群系更新、预算、持久化与降级。', group: '管理员文档', order: 26 },
  { file: '季节事件与流星雨.md', slug: 'events-and-meteors', title: '季节事件与流星雨', summary: '事件触发器、效果语法、真实感夜间流星与奖励配置。', group: '管理员文档', order: 27 },
  { file: '节日系统.md', slug: 'festivals', title: '节日系统', summary: '现实日期、节日配置、提醒行为与当前实现边界。', group: '管理员文档', order: 28 },
  { file: '日历GUI.md', slug: 'calendar-gui', title: '日历 GUI', summary: '六页菜单、字符布局、图标、动作和占位符。', group: '管理员文档', order: 29 },
  { file: '配置文件参考.md', slug: 'configuration', title: '配置文件参考', summary: '所有配置文件与主要节点的集中速查。', group: '管理员文档', order: 30 },
  { file: '指令-权限与占位符.md', slug: 'commands-permissions-placeholders', title: '指令、权限与占位符', summary: '管理员指令、权限节点和 PlaceholderAPI 完整参考。', group: '管理员文档', order: 31 },
  { file: '性能优化与故障排查.md', slug: 'performance-and-troubleshooting', title: '性能优化与故障排查', summary: '高在线调优、异步线程错误和常见故障检查。', group: '管理员文档', order: 32 },
  { file: '附属插件API.md', slug: 'api', title: '附属插件 API', summary: '通过 Bukkit ServicesManager 读取只读季节快照。', group: '开发者文档', order: 40 },
  { file: '开发构建与版本兼容.md', slug: 'development-and-compatibility', title: '开发构建与版本兼容', summary: '构建方式、NMS 版本矩阵、验证和发布信息。', group: '开发者文档', order: 41 },
]);

const lititleDocs = defineDocs('lititle', [
  { file: 'Home.md', slug: 'home', title: 'LiTitle 文档首页', summary: '从玩家使用到群组服部署，完整了解称号、聊天、昵称与跨服系统。', group: '文档总览', order: 1 },
  { file: '玩家入门.md', slug: 'player', title: '玩家入门', summary: '打开商店和仓库、佩戴称号、查看目标进度并设置昵称。', group: '玩家文档', order: 10 },
  { file: '称号商店与仓库.md', slug: 'titles-shop', title: '称号商店与仓库', summary: '购买、领取、佩戴、卸下称号，以及称号有效期和经济类型。', group: '玩家文档', order: 11 },
  { file: '自动称号与进阶.md', slug: 'automatic-titles', title: '自动称号与进阶', summary: '理解统计目标、击杀、进度、余额、物品提交和称号进阶。', group: '玩家文档', order: 12 },
  { file: '称号卷轴.md', slug: 'scrolls', title: '称号卷轴', summary: '发放、绑定、交易与右键解锁规则，以及卷轴配置入口。', group: '玩家文档', order: 13 },
  { file: '聊天频道与昵称.md', slug: 'chat-nicknames', title: '聊天频道与昵称', summary: '本服、全服、管理和私聊频道，以及中文昵称和彩色英文昵称。', group: '玩家文档', order: 14 },
  { file: '安装与升级.md', slug: 'install', title: '安装与升级', summary: '依赖、核心范围、首次启动、升级备份与重载方式。', group: '管理员文档', order: 20 },
  { file: '配置文件参考.md', slug: 'configuration', title: '配置文件参考', summary: '核心、聊天、语言、称号、卷轴和各类 GUI 配置文件速查。', group: '管理员文档', order: 21 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令、权限与占位符', summary: '玩家与管理员命令、权限节点和 PlaceholderAPI 变量。', group: '管理员文档', order: 22 },
  { file: '存储与跨服.md', slug: 'storage-network', title: '存储与跨服', summary: 'SQLite、MySQL、Redis、Velocity 与多子服配置一致性。', group: '管理员文档', order: 23 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '排查称号显示、昵称、聊天颜色、跨服同步和升级配置问题。', group: '管理员文档', order: 24 },
]);

const lirealMainDocs = defineDocs('lirealenchant', [
  { file: 'Home.md', slug: 'home', title: 'LiRealEnchant2 Wiki', summary: '真实附魔的能力总览、快速导航与实服验证基线。', group: '文档总览', order: 1 },
  { file: '玩家入门.md', slug: 'player', title: '玩家入门', summary: '认识真实附魔、打开图鉴，并完成获取、应用与祛魔流程。', group: '玩家文档', order: 10 },
  { file: '附魔图鉴.md', slug: 'enchantments', title: '附魔图鉴', summary: '122 个真实附魔、385 个等级的总表与独立详情入口。', group: '玩家文档', order: 11 },
  { file: '附魔获取与冲突.md', slug: 'acquisition-conflicts', title: '附魔获取与冲突', summary: '附魔台、战利品、村民交易、冲突组与来源开关。', group: '玩家文档', order: 12 },
  { file: '附魔槽与铁砧.md', slug: 'slots-anvil', title: '附魔槽与铁砧', summary: '附魔槽、扩槽器、铁砧应用、经验费用与冲突保护。', group: '玩家文档', order: 13 },
  { file: '祛魔系统.md', slug: 'disenchant', title: '祛魔、抽魔与净咒', summary: '移除普通附魔、抽取真实附魔书和处理诅咒的完整规则。', group: '玩家文档', order: 14 },
  { file: '粒子与技能表现.md', slug: 'particles-skills', title: '粒子与技能表现', summary: '主动技能、被动技能、粒子、声音与客户端可见反馈。', group: '玩家文档', order: 15 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: 'Paper 26.1.2、Java 25 的安装、更新与错误构建识别。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '玩家菜单、管理员发放、重载、测试和权限节点。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '来源、槽位、铁砧、祛魔、表现与兼容配置说明。', group: '管理员文档', order: 22 },
  { file: '管理员测试与排错.md', slug: 'testing-troubleshooting', title: '管理员测试与排错', summary: '部署前检查、测试命令、日志判断与常见故障定位。', group: '管理员文档', order: 23 },
  { file: 'YML自定义附魔.md', slug: 'yaml-custom-enchantments', title: 'YML 自定义附魔', summary: '使用变量、条件、六类触发器和安全动作白名单创建真实附魔。', group: '管理员文档', order: 24 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '关于真实注册、附魔来源、铁砧、Lore 和兼容性的集中解答。', group: '管理员文档', order: 25 },
  { file: '更新日志-dev196.md', slug: 'changelog-dev196', title: 'dev196 更新说明', summary: 'dev196 文档与默认说明更新，以及 dev195 机制验证基线。', group: '管理员文档', order: 30 },
  { file: '更新日志-dev197.md', slug: 'changelog-dev197', title: 'dev197 更新说明', summary: 'dev197 获取路径、槽位、适用性和矛附魔更新。', group: '管理员文档', order: 31 },
  { file: '更新日志-dev198.md', slug: 'changelog-dev198', title: 'dev198 更新说明', summary: 'dev198 自定义附魔 API、领地保护与行为测试更新。', group: '管理员文档', order: 32 },
  { file: '更新日志-dev199.md', slug: 'changelog-dev199', title: 'dev199 更新说明', summary: 'dev199 纯 YML 附魔机制、变量、条件与安全动作更新。', group: '管理员文档', order: 33 },
  { file: 'API自定义附魔.md', slug: 'api-custom-enchantments', title: 'API 自定义附魔', summary: '通过 API v1 扩展复杂事件、第三方插件联动和自定义 Java 行为。', group: '开发者文档', order: 40 },
]);

const liemcDocs = defineDocs('liemc', [
  { file: 'Home.md', slug: 'home', title: 'LIEMC 完整 Wiki', summary: 'EMC 兑换、回收、解锁、收藏、跨服、命令、权限、配置与常见问题。', group: '文档总览', order: 1 },
  { file: '玩家指南.md', slug: 'player', title: '玩家快速指南', summary: '从基础指令、解锁机制到经济来源与常见问题的玩家说明。', group: '玩家文档', order: 10 },
  { file: '功能清单.md', slug: 'features', title: '功能清单', summary: '集中查看兑换、回收、解锁、搜索、收藏、自动补充和跨服能力。', group: '玩家文档', order: 11 },
  { file: '兑换与回收.md', slug: 'conversion-economy', title: '兑换、回收与 EMC 经济', summary: '理解物品价值、转换菜单、一键出售、余额与玩家转账流程。', group: '玩家文档', order: 12 },
  { file: '解锁搜索与自动补充.md', slug: 'unlock-search-refill', title: '解锁、搜索、收藏与自动补充', summary: '先获得再解锁的成长规则，以及搜索、收藏和建筑补货功能。', group: '玩家文档', order: 13 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: '运行环境、首次安装、依赖选择、升级备份与验证步骤。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '玩家和管理员命令、权限节点与常用操作示例。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '存储、经济来源、解锁规则、商店物品和变量配置参考。', group: '管理员文档', order: 22 },
  { file: '自定义GUI教程.md', slug: 'custom-gui', title: '自定义 GUI 完整教程', summary: '配置四套菜单、槽位、渐变、动态变量、自定义按钮、模型、迁移与排错。', group: '管理员文档', order: 23 },
  { file: '存储与跨服.md', slug: 'storage-network', title: '存储与跨服', summary: 'SQLite、MySQL、共享数据、跨服上架与配置一致性。', group: '管理员文档', order: 24 },
  { file: '测试与故障排查.md', slug: 'testing-troubleshooting', title: '测试与故障排查', summary: '上线前检查、兑换测试、数据库判断与常见故障定位。', group: '管理员文档', order: 25 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '解答无法兑换、同步失败、收藏、下架和经济依赖问题。', group: '管理员文档', order: 26 },
]);

const lweDocs = defineDocs('lwe', [
  { file: 'Home.md', slug: 'home', title: 'LWE 小创世神完整文档', summary: '轻量选区施工、材料消耗、LIEMC 自动补料、安装与兼容边界。', group: '文档总览', order: 1 },
  { file: '玩家指南.md', slug: 'player', title: '玩家快速指南', summary: '设定选区并使用填充、覆盖、清液、清空及任务控制。', group: '玩家文档', order: 10 },
  { file: 'EMC联动与自动补充.md', slug: 'emc-auto-refill', title: 'EMC 联动与自动补充', summary: '材料查找顺序、自动补料开关、计费方式与失败条件。', group: '玩家文档', order: 11 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '全部玩家和管理员命令、参数补全与权限节点。', group: '管理员文档', order: 20 },
  { file: '安装配置与排错.md', slug: 'install-configuration-troubleshooting', title: '安装、配置与故障排查', summary: '版本要求、完整配置、升级步骤、Folia 边界与常见问题。', group: '管理员文档', order: 21 },
]);

const enderDragonDocs = defineDocs('enderdragon', [
  { file: 'Home.md', slug: 'home', title: 'EnderDragon 完整 Wiki', summary: '末影龙接管、召唤、奖励、指令、权限、变量、配置、自动复活与排错。', group: '文档总览', order: 1 },
  { file: '玩家指南.md', slug: 'player', title: '玩家指南', summary: '查看龙状态、参与战斗、理解奖励与可用召唤方式。', group: '玩家文档', order: 10 },
  { file: '召唤与自动复活.md', slug: 'summoning-revival', title: '召唤与自动复活', summary: '水晶、指令、倒计时和单龙独立复活规则。', group: '玩家文档', order: 11 },
  { file: '战斗与奖励.md', slug: 'rewards', title: '战斗、伤害与奖励', summary: '伤害记录、参与判定、排名奖励、物品池与命令奖励。', group: '玩家文档', order: 12 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: '运行环境、首次启动、配置升级和完整重启流程。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '召唤、状态、倒计时、奖励编辑和管理权限速查。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '主配置、龙配置、奖励、GUI、数据和复活文件结构。', group: '管理员文档', order: 22 },
  { file: '变量说明.md', slug: 'placeholders', title: 'PlaceholderAPI 变量', summary: '龙状态、是否可复活、单龙倒计时与格式化时间变量。', group: '管理员文档', order: 23 },
  { file: '测试与故障排查.md', slug: 'testing-troubleshooting', title: '测试与故障排查', summary: '召唤、击杀、奖励、自动复活和配置加载的验证流程。', group: '管理员文档', order: 24 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '集中解答重复召唤、奖励发放、龙 ID、重载和跨世界问题。', group: '管理员文档', order: 25 },
  { file: '项目说明.md', slug: 'project', title: '项目与源码说明', summary: '项目定位、公开仓库说明、统计信息与授权提示。', group: '开发者文档', order: 40 },
]);

const blockCraftDocs = defineDocs('blockcraft', [
  { file: 'Home.md', slug: 'home', title: 'BlockCraft 完整文档', summary: '八基座祭坛合成、NORMAL/ADVANCED 模式、物品挂钩、费用、粒子、音效和常见故障排查。', group: '文档总览', order: 1 },
  { file: 'Quick-Start.md', slug: 'quick-start', title: '五分钟快速开始', summary: '搭建祭坛、放置配方材料、启动合成和领取产物。', group: '玩家文档', order: 10 },
  { file: 'Item-Interaction.md', slug: 'item-interaction', title: '物品放置与领取', summary: '整组放置、潜行取回、悬浮显示、环绕材料与成品领取规则。', group: '玩家文档', order: 11 },
  { file: 'Preview-GUI.md', slug: 'preview-gui', title: '配方预览 GUI', summary: '使用指令预览配方，并自定义菜单布局、图标与说明文字。', group: '玩家文档', order: 12 },
  { file: 'Installation.md', slug: 'install', title: '安装与更新', summary: 'Paper/Folia、Java、前置插件、配置文件生成、配方与结构更新流程。', group: '管理员文档', order: 20 },
  { file: 'Compatibility.md', slug: 'compatibility', title: '兼容性说明', summary: 'Paper 26.2、Folia 1.21.11、Java 25、外部前置与当前边界。', group: '管理员文档', order: 21 },
  { file: 'Multiblock-Structures.md', slug: 'multiblock-structures', title: '多方块结构', summary: '核心、八基座、CraftEngine 方块、支持方块、旋转与结构专用特效。', group: '管理员文档', order: 22 },
  { file: 'Recipe-Configuration.md', slug: 'recipe-configuration', title: '配方配置', summary: 'NORMAL/ADVANCED、多文件配方、中心物、基座材料、环绕材料与附魔继承。', group: '管理员文档', order: 23 },
  { file: 'Item-Sources.md', slug: 'item-sources', title: '物品来源与前置挂钩', summary: '原版、MMOItems、CraftEngine 与 CustomFishing 物品识别和生成。', group: '管理员文档', order: 24 },
  { file: 'Economy-and-Success.md', slug: 'economy-and-success', title: '经济、成功率与失败', summary: '免费、金币、点券、玩家等级、成功概率和失败消耗规则。', group: '管理员文档', order: 25 },
  { file: 'Effects-Displays-and-Sounds.md', slug: 'effects-displays-sounds', title: '展示、粒子与音效', summary: '悬浮旋转、显示高度大小、四种粒子轨迹、粒子寿命和音效。', group: '管理员文档', order: 26 },
  { file: 'Commands-and-Permissions.md', slug: 'commands-permissions', title: '指令与权限', summary: '玩家与管理员指令、权限节点和 Tab 补全速查。', group: '管理员文档', order: 27 },
  { file: 'Configuration-Reference.md', slug: 'configuration-reference', title: '配置文件索引', summary: 'config、messages、structures、preview、recipes 与数据文件完整索引。', group: '管理员文档', order: 28 },
  { file: 'Troubleshooting.md', slug: 'troubleshooting', title: '故障排查', summary: '结构、配方、物品挂钩、费用、粒子、显示和 Folia 常见问题。', group: '管理员文档', order: 29 },
  { file: 'Developer-API.md', slug: 'developer-api', title: '开发者 API', summary: '只读祭坛查询 API、Bukkit 合成事件与扩展接入示例。', group: '开发者文档', order: 40 },
]);

const liShopDocs = defineDocs('lishop', [
  { file: 'README.md', slug: 'home', title: 'liShop Wiki 首页', summary: '文档索引、核心功能、文件结构与兼容范围总览。', group: '文档总览', order: 1 },
  { file: 'Complete-Guide.md', slug: 'complete-guide', title: '完整使用手册', summary: '从安装、建店、交易到数据库、性能和故障排查的一站式手册。', group: '文档总览', order: 2 },
  { file: 'Forum-Introduction.md', slug: 'features', title: '功能介绍', summary: '面向服主的功能亮点、运行环境、指令、权限与适用场景。', group: '文档总览', order: 3 },
  { file: 'Normal-Shop.md', slug: 'normal-shop', title: '普通商店', summary: '菜单、商品、分页、购买回收、库存、限额与编辑规则。', group: '玩家文档', order: 10 },
  { file: 'Crop-Shops.md', slug: 'crop-shops', title: '农作物商店', summary: '种子、每日收购、农作物道具与自定义价格配置。', group: '玩家文档', order: 11 },
  { file: 'Daily-Random-Shop.md', slug: 'daily-random-shop', title: '每日随机商店', summary: '商品池、刷新、权重、数据保存与游戏内编辑。', group: '玩家文档', order: 12 },
  { file: 'Bundle-Mall.md', slug: 'bundle-mall', title: '礼包商城', summary: '礼包内容、双货币、限购与全服广播。', group: '玩家文档', order: 13 },
  { file: 'Player-Exchange.md', slug: 'player-exchange', title: '玩家交易所', summary: '上架、购买、分页、均价、过期领取箱与数据保存。', group: '玩家文档', order: 14 },
  { file: 'Installation.md', slug: 'install', title: '安装与更新', summary: '前置依赖、首次安装、更新流程、当前产物与注意事项。', group: '管理员文档', order: 20 },
  { file: 'Commands-And-Permissions.md', slug: 'commands-permissions', title: '指令与权限', summary: '玩家和管理指令、权限节点与 Tab 补全。', group: '管理员文档', order: 21 },
  { file: 'Configuration.md', slug: 'configuration', title: '主配置说明', summary: '菜单、交易、经济、数据、编辑器、限额与动态价格节点。', group: '管理员文档', order: 22 },
  { file: 'In-Game-Editor.md', slug: 'editor', title: '游戏内编辑器', summary: '普通商店和每日商店的可视化编辑、步长与库存规则。', group: '管理员文档', order: 23 },
  { file: 'Dynamic-Pricing-And-Anti-Hoarding.md', slug: 'dynamic-pricing', title: '动态价格与防囤货', summary: '购买回收限额、价格波动、基础价值和数据保存。', group: '管理员文档', order: 24 },
  { file: 'Economy-And-Dependencies.md', slug: 'economy-dependencies', title: '经济与依赖', summary: 'Vault、内置余额、PlaceholderAPI、MiniMessage 与依赖策略。', group: '管理员文档', order: 25 },
  { file: 'Advanced-Architecture.md', slug: 'advanced-architecture', title: '高级架构配置', summary: '存储、JDBC、数据迁移、分布式锁、NPC、变量与物品源。', group: '管理员文档', order: 26 },
  { file: 'MySQL-Cluster.md', slug: 'mysql-cluster', title: 'MySQL 多服互通', summary: '共享数据、表结构、并发规则与旧版本迁移。', group: '管理员文档', order: 27 },
  { file: 'FAQ.md', slug: 'faq', title: '常见问题', summary: '集中排查经济、商品、库存、数据库、NPC 与变量问题。', group: '管理员文档', order: 28 },
]);

const liAnimalScaleDocs = defineDocs('lianimalscale', [
  { file: 'Home.md', slug: 'home', title: 'LiAnimalScale 完整 Wiki', summary: '安装、实体倍率、指令、权限、完整配置、Folia 兼容与技术验证。', group: '文档总览', order: 1 },
  { file: '快速开始.md', slug: 'quick-start', title: '快速开始', summary: '默认行为、常用指令、安装步骤、热加载与构建入口。', group: '玩家文档', order: 10 },
  { file: '玩家指南.md', slug: 'player', title: '玩家与管理操作', summary: '瞄准动物、设置倍率、查询、恢复和批量操作。', group: '玩家文档', order: 11 },
  { file: '倍率规则.md', slug: 'scaling-rules', title: '倍率与自动缩放规则', summary: '原生 SCALE 属性、倍率范围、白名单黑名单和已加载实体处理。', group: '玩家文档', order: 12 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: '兼容范围、首次安装、升级、热加载边界和验证。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '单体与批量缩放指令、权限节点和 Tab 补全。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '距离、最小最大倍率、默认倍率和自动缩放节点。', group: '管理员文档', order: 22 },
  { file: '兼容与线程.md', slug: 'compatibility', title: 'Paper、Folia 与热加载', summary: 'Bukkit 原生属性、区域线程调度、插件停用与重新启用。', group: '管理员文档', order: 23 },
  { file: '故障排查.md', slug: 'troubleshooting', title: '故障排查', summary: '目标选择、倍率不生效、旧实体残留和插件加载问题。', group: '管理员文档', order: 24 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '持久化、怪物玩家支持、关闭自动缩放和配置重载说明。', group: '管理员文档', order: 25 },
  { file: '更新日志.md', slug: 'changelog', title: '更新日志', summary: 'LiAnimalScale 各版本的功能和兼容性变更。', group: '管理员文档', order: 26 },
]);

const liPetDocs = defineDocs('lipet', [
  { file: 'docs/WIKI.md', slug: 'home', title: 'LiPet 完整 Wiki', summary: '0.26.16 安装、骑乘显示、末影龙交互、在线 Tab、删除指令、可配置 UI、数据库、成长与 CraftEngine。', group: '文档总览', order: 1 },
  { file: 'docs/PET_FEATURE_MATRIX.md', slug: 'feature-matrix', title: '功能矩阵', summary: '逐项核对宠物能力的实现范围、入口和当前状态。', group: '文档总览', order: 2 },
  { file: 'docs/更新日志-2026-08-28-骑乘交互.md', slug: 'changelog-2026-08-28-riding', title: '2026-08-28 骑乘与交互更新', summary: '凋零/末影龙骑乘显示、末影龙部件交互、在线 Tab、召唤语言和永久删除指令。', group: '文档总览', order: 3 },
  { file: 'docs/更新日志-2026-08-28-CE.md', slug: 'craftengine-integration', title: 'CraftEngine 完整物品挂钩', summary: 'CE 物品生成、识别、索引、热重载，以及喂食、捕捉球、技能书、商城、信号棒和 GUI 全入口配置。', group: '文档总览', order: 4 },
  { file: 'docs/更新日志-2026-08-28-UI.md', slug: 'changelog-2026-08-28-ui', title: '2026-08-28 UI 更新', summary: '全部菜单点击音效、功能按钮多槽位复制和旧配置安全迁移。', group: '文档总览', order: 5 },
  { file: 'docs/更新日志-2026-08-28.md', slug: 'changelog-2026-08-28', title: '2026-08-28 管理与召唤更新', summary: 'give/take、离线与全服批处理、Tab 补全及领地保护内安全召唤。', group: '文档总览', order: 6 },
  { file: 'docs/更新日志-2026-08-27.md', slug: 'changelog-2026-08-27', title: '2026-08-27 更新', summary: '指定玩家单宠管理、商城总开关、热重载、升级步骤和兼容验证。', group: '文档总览', order: 7 },
  { file: 'docs/更新日志.md', slug: 'changelog', title: '2026-08-26 更新日志', summary: 'MEG 模型重叠修复、CraftEngine 物品喂食、取消 /lp 别名及升级检查。', group: '文档总览', order: 8 },
  { file: 'docs/玩家入门.md', slug: 'player', title: '玩家入门', summary: '创建、召唤、收回、改名、骑乘宠物并使用完整 /lipet 指令。', group: '玩家文档', order: 10 },
  { file: 'docs/成长与喂养.md', slug: 'growth-feeding', title: '成长、属性与喂养', summary: '中文属性、衍生战斗数值、原版及 CraftEngine 食物和技能书。', group: '玩家文档', order: 11 },
  { file: 'docs/捕捉与商城.md', slug: 'capture-shop', title: '捕捉、宠物商城与道具商城', summary: '捕捉仪式、唯一拥有、宠物币获取、每日奖励与商城。', group: '玩家文档', order: 12 },
  { file: 'docs/跟随骑乘与战斗.md', slug: 'behavior-combat', title: '跟随、骑乘与战斗', summary: '原生寻路、坐下、召回、安全回传、骑乘、协战和模型兼容。', group: '玩家文档', order: 13 },
  { file: 'docs/背包与宠物道具.md', slug: 'items-inventory', title: '背包、信号棒与技能书', summary: '54 格宠物背包、聊天改名、信号棒、技能书和保存规则。', group: '玩家文档', order: 14 },
  { file: 'docs/安装与更新.md', slug: 'install', title: '安装与更新', summary: '运行环境、依赖、首次启动、备份和升级流程。', group: '管理员文档', order: 20 },
  { file: 'docs/命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '仅使用 /lipet 的玩家、商城、捕捉、奖励和管理员权限。', group: '管理员文档', order: 21 },
  { file: 'docs/配置说明.md', slug: 'configuration', title: '配置说明', summary: '主配置、消息、模型、食物、奖励、商城、技能和百分百自定义菜单。', group: '管理员文档', order: 22 },
  { file: 'docs/存储与跨服.md', slug: 'storage-network', title: '存储与跨服', summary: 'SQLite/MySQL 热切换、Redis、租约、切服和异常恢复。', group: '管理员文档', order: 23 },
  { file: 'docs/测试与故障排查.md', slug: 'testing-troubleshooting', title: '测试与故障排查', summary: '持久化、线程边界、AI、收回、商城、声音、模型和依赖检查。', group: '管理员文档', order: 24 },
  { file: 'docs/常见问题.md', slug: 'faq', title: '常见问题', summary: '解答宠物丢失、插件停用、线程报错、收回残留、背包与宠物币问题。', group: '管理员文档', order: 25 },
  { file: 'README.md', slug: 'project', title: '项目说明', summary: '项目目标、当前能力、指令、架构目标和构建要求。', group: '开发者文档', order: 40 },
  { file: 'docs/LIPET_DESIGN.md', slug: 'design', title: '设计与配置', summary: '宠物生命周期、数据结构、行为系统和扩展设计。', group: '开发者文档', order: 41 },
  { file: 'docs/ARCHITECTURE.md', slug: 'architecture', title: '架构与扩展', summary: '模块边界、服务职责、数据流和二次开发结构。', group: '开发者文档', order: 42 },
  { file: 'docs/FEATURE_ROADMAP.md', slug: 'roadmap', title: '功能路线图', summary: '功能实施顺序、阶段目标与尚未完成的边界。', group: '开发者文档', order: 43 },
]);

const lichQianDocs = defineDocs('lichqian', [
  { file: 'Home.md', slug: 'home', title: 'LichQian 使用说明', summary: '安装、命令、权限、时间、文本、GUI、变量和配置升级。', group: '文档总览', order: 1 },
  { file: '玩家入门.md', slug: 'player', title: '玩家入门', summary: '打开抽签菜单、直接抽签、查看次数和理解每日重置。', group: '玩家文档', order: 10 },
  { file: '签文与奖励.md', slug: 'draw-rules', title: '签文、费用与奖励', summary: '抽签条件、扣费、签文效果、持续时间和异常退款规则。', group: '玩家文档', order: 11 },
  { file: 'resource-pack/README.md', slug: 'resource-pack', title: '配套资源包', summary: '资源包目录、安装方式和客户端使用说明。', group: '玩家文档', order: 12 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: 'Paper、Java、Vault、首次启动、升级和配置保护。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '玩家抽签、状态查询、管理员重载和权限节点。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '每日次数、时区、重置、签文、标题动画、GUI 与消息。', group: '管理员文档', order: 22 },
  { file: '变量与文本.md', slug: 'placeholders', title: '变量、占位符与文本格式', summary: 'GUI 消息变量、PlaceholderAPI、MiniMessage 和时间格式。', group: '管理员文档', order: 23 },
  { file: '故障排查.md', slug: 'troubleshooting', title: '故障排查', summary: '经济依赖、无有效签文、YAML 错误、退款和背包已满问题。', group: '管理员文档', order: 24 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '每日重置、次数限制、药水等级、重载和奖励异常说明。', group: '管理员文档', order: 25 },
  { file: '开发与构建.md', slug: 'development', title: '开发与构建', summary: '兼容基线、分层结构、构建命令和验证记录。', group: '开发者文档', order: 40 },
  { file: '更新日志.md', slug: 'changelog', title: '更新日志', summary: 'LichQian 版本功能、修复与兼容性变更。', group: '管理员文档', order: 26 },
]);

const liSkinDocs = defineDocs('liskin', [
  { file: 'Home.md', slug: 'home', title: 'LiSkin 完整文档', summary: '基础用法、资源安装、分类 NPC 试衣间、旁观视角、皮肤配置、商店、权限与跨服。', group: '文档总览', order: 1 },
  { file: '功能介绍.md', slug: 'features', title: '功能与获取介绍', summary: '3D 武器与时装皮肤、玩家人偶试衣间、经济、跨服、指令、权限和安装说明。', group: '玩家文档', order: 10 },
  { file: '玩家入门.md', slug: 'player', title: '玩家入门', summary: '使用综合菜单或试衣 NPC 选择、试穿、解锁、应用和移除物品皮肤。', group: '玩家文档', order: 11 },
  { file: '皮肤应用与还原.md', slug: 'application', title: '皮肤应用与安全还原', summary: '兼容物品、分类、权限、PDC 标记和原始外观恢复。', group: '玩家文档', order: 12 },
  { file: '商店与试穿.md', slug: 'shop-preview', title: '商店、试穿与试衣间', summary: '购买、分类换装、沉浸旁观视角、人偶旋转展示和安全恢复。', group: '玩家文档', order: 13 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: 'CraftEngine 资源、运行环境、首次安装、升级与验证。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '菜单、解锁、应用、试穿、商店、调试和管理权限。', group: '管理员文档', order: 21 },
  { file: '配置说明.md', slug: 'configuration', title: '配置说明', summary: '皮肤条目、CE 模型、装备资产、分类、预览和试衣 NPC 节点。', group: '管理员文档', order: 22 },
  { file: '跨服与数据安全.md', slug: 'storage-network', title: '跨服与数据安全', summary: '解锁数据、所有者保护、跨服防刷、外观保存和恢复。', group: '管理员文档', order: 23 },
  { file: '故障排查.md', slug: 'troubleshooting', title: '故障排查', summary: '资源缺失、模型错误、权限还原、商店和跨服问题定位。', group: '管理员文档', order: 24 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '解答皮肤 ID、CE 模型、试穿、权限、价格和外观恢复问题。', group: '管理员文档', order: 25 },
]);

const jisseeChessDocs = defineDocs('jisseechessgames', [
  { file: 'Home.md', slug: 'home', title: 'JisseeChessGames 使用文档', summary: '运行要求、安装、棋盘生成、对局、指令、交互、持久化与配置。', group: '文档总览', order: 1 },
  { file: '玩家入门.md', slug: 'player', title: '玩家入门', summary: '通过全息或指令加入棋局，完成落子、走棋、认输和离开。', group: '玩家文档', order: 10 },
  { file: '棋类规则.md', slug: 'game-rules', title: '五子棋、象棋与军棋规则', summary: '三种自动对局的回合、合法移动、胜负和重置规则。', group: '玩家文档', order: 11 },
  { file: '棋盘与房间.md', slug: 'arenas-rooms', title: '棋盘、全息与房间', summary: '五类棋盘、右击全息、双人房间和手动玩法边界。', group: '玩家文档', order: 12 },
  { file: '安装与更新.md', slug: 'install', title: '安装与更新', summary: 'CraftEngine 资源、运行环境、安装顺序、验证和升级。', group: '管理员文档', order: 20 },
  { file: '命令与权限.md', slug: 'commands-permissions', title: '命令与权限', summary: '玩家房间、棋盘生成、管理、验证和权限节点。', group: '管理员文档', order: 21 },
  { file: '配置与存储.md', slug: 'configuration-storage', title: '配置、保护与持久化', summary: '主配置、消息、棋盘、房间、保护和升级合并规则。', group: '管理员文档', order: 22 },
  { file: '故障排查.md', slug: 'troubleshooting', title: '故障排查', summary: 'CE 资源、生成空间、房间恢复、全息和规则问题定位。', group: '管理员文档', order: 23 },
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '自动玩法范围、棋盘尺寸、围棋飞行棋、重启恢复和保护说明。', group: '管理员文档', order: 24 },
  { file: '验证与排错.md', slug: 'validation', title: '验证报告', summary: '五子棋、中国象棋和军棋的规则验证、迁移和运行测试边界。', group: '管理员文档', order: 25 },
  { file: '更新日志.md', slug: 'changelog', title: '更新日志', summary: 'JisseeChessGames 各版本功能、修复和数据兼容变更。', group: '管理员文档', order: 26 },
]);

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const enchantDirectory = path.resolve(currentDirectory, '../../content/lirealenchant/enchants');

function readEnchantMetadata(fileName: string) {
  const source = fs.readFileSync(path.join(enchantDirectory, fileName), 'utf8');
  const title = source.match(/^#\s+(.+)$/m)?.[1].trim() ?? path.basename(fileName, '.md');
  const summary = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#') && !line.startsWith('[') && !line.startsWith('|') && !line.startsWith('>'))
    ?.replace(/[*_`]/g, '') ?? `查看 ${title} 的等级、触发条件、效果、冷却、粒子与声音。`;
  return { title, summary };
}

const lirealEnchantDocs = fs.readdirSync(enchantDirectory)
  .filter((fileName) => fileName.endsWith('.md'))
  .sort((left, right) => left.localeCompare(right, 'en'))
  .map((fileName, index): DocEntry => {
    const id = path.basename(fileName, '.md');
    const metadata = readEnchantMetadata(fileName);
    return {
      project: 'lirealenchant',
      file: `enchants/${fileName}`,
      slug: `enchant-${id.replaceAll('_', '-')}`,
      title: metadata.title,
      summary: metadata.summary,
      group: '附魔详情',
      order: 1000 + index,
      sidebar: false,
    };
  });

export const docSets: DocSet[] = [
  { slug: 'liemc', name: 'LIEMC', version: '0.1.0+build.98', summary: 'EMC 经济、物品回收、解锁兑换、收藏检索、自定义 GUI、跨服同步与配置文档。', icon: 'gold', groups: ['文档总览', '玩家文档', '管理员文档'], docs: liemcDocs },
  { slug: 'lwe', name: 'LWE 小创世神', version: '0.1.0+build.15', summary: '轻量选区施工、材料消耗、LIEMC 自动补料、配置与故障排查。', icon: 'book', groups: ['文档总览', '玩家文档', '管理员文档'], docs: lweDocs },
  { slug: 'lirealenchant', name: 'LiRealEnchant2', version: '2.0.0-dev199-paper26', summary: '真实附魔、YML/API 扩展、获取、槽位、铁砧、祛魔、配置与 122 篇附魔详情。', icon: 'amethyst', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: [...lirealMainDocs, ...lirealEnchantDocs] },
  { slug: 'lititle', name: 'LiTitle', version: '0.1.93', summary: '称号、商店、仓库、聊天、昵称、存储与跨服部署文档。', icon: 'gold', groups: ['文档总览', '玩家文档', '管理员文档'], docs: lititleDocs },
  { slug: 'lipet', name: 'LiPet', version: '0.26.16-SNAPSHOT', summary: '宠物养成、骑乘显示、末影龙交互、在线 Tab、永久删除、完全自定义 UI、数据库与 CraftEngine 文档。', icon: 'leaf', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: liPetDocs },
  { slug: 'liskin', name: 'LiSkin', version: '1.9.7', summary: 'CraftEngine 外观皮肤、顶部分类换装、沉浸旁观视角、常驻 NPC、商店、权限与跨服文档。', icon: 'amethyst', groups: ['文档总览', '玩家文档', '管理员文档'], docs: liSkinDocs },
  { slug: 'jisseechessgames', name: 'JisseeChessGames', version: '2.1.0', summary: '棋盘生成、五子棋、中国象棋、军棋、房间、持久化与验证文档。', icon: 'book', groups: ['文档总览', '管理员文档'], docs: jisseeChessDocs },
  { slug: 'liseasons', name: 'LISeasons', version: '1.0.68', summary: '四季、节气、体温、世界规则、季节事件与运维开发文档。', icon: 'grass', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: liseasonsDocs },
  { slug: 'enderdragon', name: 'EnderDragon', version: '26.1.14', summary: '末影龙接管、召唤、复活、奖励、配置、变量与故障排查文档。', icon: 'meteor', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: enderDragonDocs },
  { slug: 'blockcraft', name: 'BlockCraft', version: '1.0.13', summary: '八基座祭坛合成、物品来源挂钩、费用与成功率、粒子与音效、故障排查与命令说明。', icon: 'redstone', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: blockCraftDocs },
  { slug: 'lianimalscale', name: 'LiAnimalScale', version: '1.1.0', summary: '动物缩放、命令权限、配置、Folia 兼容、热加载与验证文档。', icon: 'leaf', groups: ['文档总览', '玩家文档', '管理员文档'], docs: liAnimalScaleDocs },
  { slug: 'lichqian', name: 'LichQian', version: '1.1.0', summary: '抽签玩法、时间配置、文本、GUI、变量、资源包与构建文档。', icon: 'redstone', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: lichQianDocs },
  { slug: 'lishop', name: 'liShop', version: '1.9.0', summary: 'GUI 商店、动态价格、交易所、编辑器、经济、数据库与集群文档。', icon: 'ice', groups: ['文档总览', '玩家文档', '管理员文档'], docs: liShopDocs },
];

export const allDocs = docSets.flatMap((docSet) => docSet.docs);

export function getDocSet(slug: string) {
  return docSets.find((docSet) => docSet.slug === slug);
}
