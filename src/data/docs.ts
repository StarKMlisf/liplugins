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
  icon: 'grass' | 'gold' | 'amethyst';
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
  { file: '常见问题.md', slug: 'faq', title: '常见问题', summary: '关于真实注册、附魔来源、铁砧、Lore 和兼容性的集中解答。', group: '管理员文档', order: 24 },
  { file: '更新日志-dev196.md', slug: 'changelog-dev196', title: 'dev196 更新说明', summary: 'dev196 文档与默认说明更新，以及 dev195 机制验证基线。', group: '管理员文档', order: 25 },
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
  { slug: 'liseasons', name: 'LISeasons', version: '1.0.61', summary: '四季、节气、体温、世界规则、季节事件与运维开发文档。', icon: 'grass', groups: ['文档总览', '玩家文档', '管理员文档', '开发者文档'], docs: liseasonsDocs },
  { slug: 'lititle', name: 'LiTitle', version: '0.1.93', summary: '称号、商店、仓库、聊天、昵称、存储与跨服部署文档。', icon: 'gold', groups: ['文档总览', '玩家文档', '管理员文档'], docs: lititleDocs },
  { slug: 'lirealenchant', name: 'LiRealEnchant2', version: '2.0.0-dev196-paper26', summary: '真实附魔、获取、槽位、铁砧、祛魔、配置与 122 篇附魔详情。', icon: 'amethyst', groups: ['文档总览', '玩家文档', '管理员文档'], docs: [...lirealMainDocs, ...lirealEnchantDocs] },
];

export const allDocs = docSets.flatMap((docSet) => docSet.docs);

export function getDocSet(slug: string) {
  return docSets.find((docSet) => docSet.slug === slug);
}
