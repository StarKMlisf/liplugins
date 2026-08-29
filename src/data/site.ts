export const siteMeta = {
  name: '牢李插件系列',
  shortName: '牢李插件',
  englishName: 'LaoLi Plugins',
  description: '为 Minecraft 服务器制作可靠、清楚、能长期维护的玩法插件。',
  repository: 'https://github.com/StarKMlisf/liplugins',
};

export type WorkStatus = '持续维护' | '开发中' | '归档';
export type WorkAvailability = '免费' | '付费' | '暂不发售';

export interface WorkEntry {
  slug: string;
  name: string;
  catalogLabel: string;
  kicker: string;
  summary: string;
  description: string;
  version: string;
  status: WorkStatus;
  platform: string;
  minecraft: string;
  java: string;
  availability: WorkAvailability;
  priceCny?: number;
  originalPriceCny?: number;
  dependencies: string[];
  features: string[];
  artwork?: {
    src: string;
    alt: string;
  };
}

export const works: WorkEntry[] = [
  {
    slug: 'blockcraft',
    name: 'BlockCraft',
    catalogLabel: '合成',
    artwork: {
      src: '/images/blockcraft/altar-perspective.png',
      alt: 'BlockCraft 八基座祭坛的游戏内透视画面',
    },
    kicker: '八基座多方块祭坛合成',
    summary: '参考植物魔法流程的环形基座合成系统，支持多文件配方、物品来源挂钩、粒子动画与成功率机制。',
    description:
      'BlockCraft 在 Paper 26.2 下提供 NORMAL 与 ADVANCED 双模式祭坛合成：基座材料、环绕材料、前置物可混用原版、MMOItems、CraftEngine 与 CustomFishing 来源。支持费用类型、失败策略、粒子路径、展示浮动与完整中文配置文档。',
    version: '1.0.13',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '1.21.11 · 26.2',
    java: 'Java 25',
    availability: '付费',
    priceCny: 88,
    originalPriceCny: 108,
    dependencies: ['MMOItems（可选）', 'CraftEngine（可选）', 'CustomFishing（可选）', 'Vault（按经济类型）', 'PlaceholderAPI（按功能）'],
    features: [
      '八基座祭坛与可定制纯结构方块',
      'NORMAL 与 ADVANCED 祭坛合成模式',
      '原版、MMOItems、CraftEngine、CustomFishing 统一挂钩',
      '金币/点券/等级费用与成功率系统',
      '多文件配方目录与兼容性迁移',
      '中文 Wiki、GUI 配方预览与完整故障排查',
    ],
  },
  {
    slug: 'liseasons',
    name: 'LISeasons',
    catalogLabel: '季节',
    artwork: {
      src: '/images/featured-liseasons.webp',
      alt: '同一座山谷从春夏过渡到秋冬的季节变化',
    },
    kicker: '季节、节气与服务器自然系统',
    summary: '让季节不只是计时器，而是会真正改变天空、群系、冰雪、作物、温度与夜空的世界规则。',
    description:
      'LISeasons 为长期生存服提供完整的时间与自然循环：四季、二十四节气、三种日历、体感温度、PacketEvents 客户端群系染色、冬冻春融、季节事件、节日和六页日历 GUI。',
    version: '1.0.68',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: 'Paper 1.21.1+ · Folia 1.21.8+ · 26.2',
    java: 'Java 21',
    availability: '免费',
    dependencies: ['PacketEvents 2.13.0+（必需）', 'PlaceholderAPI（可选）', 'CustomCrops（可选）', 'Dominion（可选）'],
    features: [
      '四季与二十四节气',
      '客户端群系季节染色',
      '冬季结冰与春季融化',
      '体温、潮湿与季节 Buff BossBar',
      '16 种季节事件、流星雨与散落奖励',
      '节日系统与六页日历 GUI',
    ],
  },
  {
    slug: 'lititle',
    name: 'LiTitle',
    catalogLabel: '称号',
    kicker: '称号、聊天与跨服频道系统',
    summary: '把称号收集、商城、动态展示、聊天颜色与跨服频道整合成一套可长期运营的身份系统。',
    description:
      'LiTitle 面向生存服、群组服与 RPG 服务器，提供称号商店、仓库、卷轴、自动称号、进阶称号、彩色昵称，以及本服、全服、管理和私聊频道。',
    version: '0.1.93',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '1.21.11 · 26.1.2 · 26.2',
    java: 'Java 21',
    availability: '付费',
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
    name: 'LiRealEnchant2',
    catalogLabel: '附魔',
    artwork: {
      src: '/images/featured-lirealenchant.webp',
      alt: '夜色中的附魔图书馆与锻造工坊',
    },
    kicker: '真实注册的原创附魔系统',
    summary: '以 Paper Registry 注册 122 个真实附魔，为装备加入获取、冲突、槽位、铁砧与祛魔的完整循环。',
    description:
      'LiRealEnchant 为 Paper 26.1.2 提供 122 个 yunmengze 命名空间真实附魔和 385 个等级机制，覆盖武器、工具、护甲、远程、矛、盾牌、钓竿与鞘翅。',
    version: '2.0.0-dev199-paper26',
    status: '持续维护',
    platform: 'Paper',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '付费',
    priceCny: 50,
    dependencies: ['无强制前置', 'Vault（可选）', 'PlaceholderAPI（可选）', '基岩互通组件（可选）'],
    features: [
      '122 个真实附魔、385 个等级',
      '附魔台、战利品与村民交易',
      '附魔槽、扩槽器与双向冲突',
      '铁砧和真实附魔书',
      '祛魔、抽魔成书与净咒',
      'Java / 基岩玩家菜单适配',
      'YML 安全机制与 Java API 扩展',
    ],
  },
  {
    slug: 'liemc',
    name: 'LIEMC',
    catalogLabel: '经济',
    artwork: {
      src: '/images/featured-liemc.webp',
      alt: '夕阳中的 EMC 炼成工坊与资源方块',
    },
    kicker: 'EMC 资源经济与循环系统',
    summary: '用 EMC 串联物品回收、价值解锁、资源兑换与收藏检索，为生存服建立稳定的资源循环。',
    description:
      'LIEMC 是面向 Paper / Luminol 26.1.2 的 EMC 资源经济插件，提供物品回收、解锁兑换、收藏检索、自定义 GUI、CraftEngine 完整物品挂钩、全局商品 Lore、自动补充与 MySQL 跨服同步能力。',
    version: '0.1.0+build.106',
    status: '持续维护',
    platform: 'Paper / Luminol',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '付费',
    priceCny: 30,
    dependencies: ['Vault（可选）', 'PlaceholderAPI（可选）', 'MySQL / Redis（跨服功能按需）'],
    features: [
      'EMC 价值与资源经济',
      '物品回收和解锁兑换',
      '收藏、检索与批量操作',
      '完全自定义 GUI 与动态按钮',
      'CraftEngine 完整物品挂钩',
      '全局商品 Lore 模板与空白分隔行',
      '资源自动补充',
      'MySQL 8.0 跨服数据同步',
      'Paper / Folia 调度适配',
    ],
  },
  {
    slug: 'enderdragon',
    name: 'EnderDragon',
    catalogLabel: '末影龙',
    kicker: '末影龙复活、刷新与玩法增强',
    summary: '接管原版末影龙流程，通过多种龙配置、刷新规则、奖励和战斗反馈扩展末地长期玩法。',
    description:
      'EnderDragon 用于管理和增强服务器末影龙玩法，支持接管复活流程、多种末影龙配置、随机权重刷新、战斗提示与奖励结算。',
    version: '26.1.14',
    status: '持续维护',
    platform: 'Bukkit / Paper / Purpur',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '免费',
    dependencies: ['无强制前置', 'PlaceholderAPI（可选）', 'MythicMobs / MMOItems（可选）'],
    features: [
      '接管末影龙复活流程',
      '多种龙配置与随机权重',
      '刷新条件和时间控制',
      '血量、阶段与战斗提示',
      '掉落和奖励配置',
      '末地长期玩法管理',
    ],
  },
  {
    slug: 'lwe',
    name: 'LWE 小创世神',
    catalogLabel: '建筑',
    kicker: '生存服轻量选区施工工具',
    summary: '用限速任务完成选区填充、覆盖、清液与清空，并与 LIEMC 自动补料联动。',
    description:
      'LWE 小创世神是 LIEMC 的轻量施工附属：玩家可用坐标或镐子设定选区，按服务器限速逐步执行填充、覆盖、清液和清空；材料会依次从背包、潜影盒与 LIEMC 自动补充中取得。',
    version: '0.1.0+build.15',
    status: '持续维护',
    platform: 'Bukkit / Paper',
    minecraft: '1.21.x',
    java: 'Java 21',
    availability: '免费',
    dependencies: ['LIEMC 0.1.0+build.95（必需）'],
    features: [
      '坐标与镐子双选区方式',
      '填充、覆盖、清液与清空',
      '逐 tick 限速施工与未加载区块拦截',
      '背包、潜影盒与 LIEMC 自动补料',
      '任务暂停、恢复和取消',
      '完整中文配置、指令与故障排查',
    ],
  },
  {
    slug: 'lishop',
    name: 'liShop',
    catalogLabel: '商店',
    kicker: 'GUI 商店、动态价格与玩家交易所',
    summary: '提供可视化商店、动态价格、每日商品、玩家交易所和多服数据能力；当前版本仍在完善，暂不发售。',
    description:
      'liShop 面向生存服、RPG 服和群组服，整合 GUI 商店、购买回收、动态价格、每日随机商品、礼包商城、玩家交易所与 MySQL 多服互通。',
    version: '1.9.0',
    status: '开发中',
    platform: 'Paper / Leaf / Folia',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '暂不发售',
    dependencies: ['Vault（必需）', 'PlaceholderAPI（可选）', 'CraftEngine（可选）', 'MySQL（多服功能按需）'],
    features: [
      '配置驱动的 GUI 商店',
      '购买、回收与每日限额',
      '动态价格和随机商品',
      '礼包商城',
      '玩家交易所',
      'MySQL 多服互通',
    ],
  },
  {
    slug: 'lianimalscale',
    name: 'LiAnimalScale',
    catalogLabel: '体型',
    kicker: '动物体型缩放控制',
    summary: '直接使用 Bukkit 原生 SCALE 属性调整动物模型、碰撞箱与交互范围，不生成额外展示实体。',
    description:
      'LiAnimalScale 为 Paper、Folia 与 Luminol 提供动物实体缩放，通过原生 Attribute.SCALE 控制体型，并支持按世界、实体类型和生成场景配置。',
    version: '1.1.0',
    status: '持续维护',
    platform: 'Paper / Folia / Luminol',
    minecraft: '1.21.11+ · 26.1.2',
    java: 'Java 21+',
    availability: '免费',
    dependencies: ['无强制前置'],
    features: [
      '原生动物体型缩放',
      '模型、碰撞箱与交互同步',
      '按实体类型配置倍率',
      '按世界启用或禁用',
      '已加载实体自动处理',
      'Paper / Folia 调度兼容',
    ],
  },
  {
    slug: 'lipet',
    name: 'LiPet',
    catalogLabel: '宠物',
    kicker: '宠物养成、捕捉、骑乘与战斗',
    summary: '覆盖旧宠物类型兼容、一宠物一 YML、MythicMobs 等级技能、失败退避与状态统计、宠物获取、成长、双排行榜、PlayerPoints 商城、骑乘、捕捉、背包与跨服数据的一体化宠物系统。',
    description:
      'LiPet 是面向群组服的 Bukkit 宠物框架，包含旧原版类型 ID 自动兼容、商城 10 种宠物独立 YML、每种宠物独立配置且按等级解锁的 MythicMobs 技能、失败退避、API 变体兼容、规则状态统计与 power 等级成长，另含管理页原路返回、“我的宠物”列表、仓库四键、SQLite/MySQL 热切换、双排行榜、PlayerPoints/Vault 商城、属性成长、捕捉仪式、完全自定义 GUI、离线及全服宠物管理、骑乘、战斗导航、外部模型、CraftEngine 完整物品挂钩和扩展 API。',
    version: '0.27.2-SNAPSHOT',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '1.21.11 · 26.1.2 · 26.2',
    java: 'Java 21+',
    availability: '付费',
    priceCny: 68,
    dependencies: ['Vault / PlayerPoints（商城货币可选）', 'PlaceholderAPI（可选）', 'MythicMobs（等级技能可选）', 'ModelEngine / CraftEngine（按配置可选）', 'MySQL / Redis（跨服功能按需）'],
    features: [
      '宠物创建、召唤与持久化',
      '老版本原版宠物类型 ID 自动兼容',
      '商城 10 种宠物缺失时安全补齐独立 YML',
      '主菜单“我的宠物”与宠物列表入口',
      '召唤上限专用中文提示与旧语言迁移',
      '中文属性成长、喂养与升级',
      '每宠独立 MythicMobs 技能、等级解锁与 power 成长',
      'MM 失败退避、逐技能日志限频与规则状态统计',
      '捕捉仪式、商城与宠物币奖励',
      '跟随、坐下、召回与骑乘',
      '飞行宠物安全回传时名牌即时重建',
      '骑乘稳定隐藏名牌/Boss 条与末影龙飞行控制',
      '战斗 AI、死亡冷却与安全回传',
      '54 格背包与百分百自定义 GUI',
      '管理页属性/成长面板保留上下文并返回同一只宠物',
      '仓库四键操作、绿色潜行提示与独立红色永久删除警告',
      '中文目录、中文子目录与多 YML 宠物类型配置',
      '数据库热切换与跨服租约',
      '离线/全服 give、take 与领地召唤兼容',
      '在线玩家 Tab 补全与永久删除指令',
      '宠物币分组/快捷 give、take、look 与余额保护',
      '宠物币/宠物等级异步分页排行榜',
      '普通玩家权限组自动 true 与管理员继承',
      'PlayerPoints 宠物/道具商城结算',
      'INTERNAL 商城货币显示为可配置“宠物币”',
      '全部 UI 点击音效与按钮多槽位',
      'ModelEngine 载体隐藏与 CraftEngine 全物品入口',
    ],
  },
  {
    slug: 'lichqian',
    name: 'LichQian',
    catalogLabel: '抽签',
    kicker: '牢李抽签经济玩法',
    summary: '把抽签、经济扣款、结果反馈与奖励配置组合成轻量的服务器娱乐玩法。',
    description:
      'LichQian 是基于 Vault 经济的抽签插件，提供可配置签文、费用、概率、奖励、消息与 PlaceholderAPI 占位符。',
    version: '1.1.0',
    status: '持续维护',
    platform: 'Paper',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '免费',
    dependencies: ['Vault（必需）', '经济插件（必需）', 'PlaceholderAPI（可选）'],
    features: [
      '经济驱动的抽签流程',
      '签文、概率与费用配置',
      '奖励和结果反馈',
      '中文消息配置',
      'PlaceholderAPI 占位符',
      '管理员重载与状态检查',
    ],
  },
  {
    slug: 'liskin',
    name: 'LiSkin',
    catalogLabel: '换皮',
    kicker: 'CraftEngine 换皮与沉浸式试衣间',
    summary: '保留原物品属性完成 3D 换皮；顶部按分类选装，旁观视角观看并连续换装。',
    description:
      'LiSkin 以 CraftEngine 物品作为皮肤来源，为原物品提供收集、购买、应用和管理外观的完整流程。1.9.7 的 A/B 点原生玩家人偶试衣间支持顶部分类菜单、沉浸旁观视角和无指令连续换装，玩家可在购买前观看套用自身皮肤并自动旋转的实际模型。',
    version: '1.9.7',
    status: '持续维护',
    platform: 'Paper / Folia',
    minecraft: '26.1.2 · 26.2',
    java: 'Java 25',
    availability: '付费',
    priceCny: 68,
    dependencies: ['CraftEngine 26.7.4（必需）', 'Vault（按经济功能）', 'PlaceholderAPI（可选）'],
    features: [
      'CraftEngine 外观来源',
      '保留原物品材质和属性',
      '保留附魔、耐久与 NBT/PDC',
      '皮肤收集、购买和应用',
      '顶部 16 分类快速筛选',
      '沉浸旁观视角并自动恢复',
      '试衣中蹲下右键连续换装',
      '玩家自身皮肤人偶旋转预览',
    ],
  },
  {
    slug: 'jisseechessgames',
    name: 'JisseeChessGames',
    catalogLabel: '棋类',
    kicker: '五子棋、中国象棋与军棋玩法',
    summary: '自动生成棋盘并提供双人房间、回合控制、合法移动、吃子战斗、胜负结算、持久化和重启恢复。',
    description:
      'JisseeChessGames 是配套 Jissee Chess CraftEngine 内容的棋类插件，支持五类棋盘，并为五子棋、中国象棋和军棋提供完整对局逻辑。',
    version: '2.1.0',
    status: '持续维护',
    platform: 'Paper',
    minecraft: '26.1.2',
    java: 'Java 25',
    availability: '付费',
    priceCny: 30,
    dependencies: ['CraftEngine 26.7.4（必需）', 'Jissee-Chess-CE-1.0.3 内容包（必需）'],
    features: [
      '五类官方棋盘自动生成',
      '五子棋完整对局',
      '中国象棋完整对局',
      '军棋移动与战斗判定',
      '房间、回合和胜负控制',
      '持久化与重启恢复',
    ],
  },
];

export interface CatalogSection {
  id: 'paid' | 'free' | 'developing';
  number: number;
  title: string;
  description: string;
  works: WorkEntry[];
}

const workBySlug = new Map(works.map((work) => [work.slug, work]));
const selectWorks = (slugs: string[]) =>
  slugs.map((slug) => workBySlug.get(slug)).filter((work): work is WorkEntry => Boolean(work));

export const catalogSections: CatalogSection[] = [
  {
    id: 'paid',
    number: 1,
    title: '付费插件',
    description: '公开标价并持续维护的商业插件；购买前可先阅读完整功能、安装和配置文档。',
    works: selectWorks(['blockcraft', 'liemc', 'lirealenchant', 'lititle', 'lipet', 'liskin', 'jisseechessgames']),
  },
  {
    id: 'free',
    number: 2,
    title: '免费插件',
    description: '可免费获取的玩法与运维插件，同样提供完整使用和管理文档。',
    works: selectWorks(['liseasons', 'enderdragon', 'lwe', 'lianimalscale', 'lichqian']),
  },
  {
    id: 'developing',
    number: 3,
    title: '开发中 / 暂不发售',
    description: '功能与文档可供了解，但当前版本尚未开放购买。',
    works: selectWorks(['lishop']),
  },
];
