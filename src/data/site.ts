export const siteMeta = {
  name: '牢李插件系列',
  shortName: '牢李插件',
  englishName: 'LaoLi Plugins',
  description: '为 Minecraft 服务器制作可靠、清楚、能长期维护的玩法插件。',
  repository: 'https://github.com/StarKMlisf/LiSeasons',
};

export type WorkStatus = '持续维护' | '开发中' | '归档';

export interface WorkEntry {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  description: string;
  version: string;
  status: WorkStatus;
  platform: string;
  minecraft: string;
  java: string;
  priceCny?: number;
  dependencies: string[];
  features: string[];
}

export const works: WorkEntry[] = [
  {
    slug: 'liseasons',
    name: 'LISeasons',
    kicker: '季节、节气与服务器自然系统',
    summary: '让季节不只是计时器，而是会真正改变天空、群系、冰雪、作物、温度与夜空的世界规则。',
    description:
      'LISeasons 为长期生存服提供完整的时间与自然循环：四季、二十四节气、三种日历、体感温度、NMS 群系染色、冬冻春融、季节事件、节日和六页日历 GUI。',
    version: '1.0.61',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '1.21.11 · 26.1.2 · 26.2',
    java: 'Java 21',
    dependencies: ['ProtocolLib（必需）', 'PlaceholderAPI（可选）', 'CustomCrops（可选）', 'Dominion（可选）'],
    features: [
      '四季与二十四节气',
      'NMS 群系季节染色',
      '冬季结冰与春季融化',
      '体温、潮湿与环境影响',
      '16 种季节事件与真实感流星雨',
      '节日系统与六页日历 GUI',
    ],
  },
  {
    slug: 'lititle',
    name: 'LiTitle',
    kicker: '称号、聊天与跨服频道系统',
    summary: '把称号收集、商城、动态展示、聊天颜色与跨服频道整合成一套可长期运营的身份系统。',
    description:
      'LiTitle 面向生存服、群组服与 RPG 服务器，提供称号商店、仓库、卷轴、自动称号、进阶称号、彩色昵称，以及本服、全服、管理和私聊频道。',
    version: '0.1.93',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '1.21.11 · 26.1.2 · 26.2',
    java: 'Java 21',
    priceCny: 30,
    dependencies: ['Vault（必需）', 'PlaceholderAPI（可选）', 'PlayerPoints（可选）', 'AttributePlus（可选）'],
    features: [
      '称号商城、仓库与佩戴',
      '称号卷轴与有效期',
      '自动称号与进阶目标',
      '动态渐变称号和聊天颜色',
      '本服、全服、管理与私聊频道',
      'SQLite / MySQL 数据存储',
    ],
  },
  {
    slug: 'lirealenchant',
    name: 'LiRealEnchant',
    kicker: '真实注册的原创附魔系统',
    summary: '以 Paper Registry 注册 122 个真实附魔，为装备加入获取、冲突、槽位、铁砧与祛魔的完整循环。',
    description:
      'LiRealEnchant 为 Paper 26.1.2 提供 122 个 yunmengze 命名空间真实附魔和 385 个等级机制，覆盖武器、工具、护甲、远程、矛、盾牌、钓竿与鞘翅。',
    version: '2.0.0-dev196-paper26',
    status: '持续维护',
    platform: 'Paper',
    minecraft: '26.1.2',
    java: 'Java 25',
    priceCny: 50,
    dependencies: ['无强制前置', 'Vault（可选）', 'PlaceholderAPI（可选）', '基岩互通组件（可选）'],
    features: [
      '122 个真实附魔、385 个等级',
      '附魔台、战利品与村民交易',
      '附魔槽、扩槽器与双向冲突',
      '铁砧和真实附魔书',
      '祛魔、抽魔成书与净咒',
      'Java / 基岩玩家菜单适配',
    ],
  },
];
