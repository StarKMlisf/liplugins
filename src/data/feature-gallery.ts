export interface FeatureShot { file: string; title: string; width: number; height: number; format?: 'webp' | 'png' | 'jpg'; }
export interface FeatureGallery { slug: string; name: string; forum?: string; forumPendingReview?: boolean; date: string; shots: FeatureShot[]; software?: boolean; }
// 仅登记已逐图核实的游戏实拍，保留拍摄日期与原帖来源。
export const featureGalleries: FeatureGallery[] = [
  { slug: 'litechtree', name: 'LiTechTree', forum: 'https://www.minebbs.com/resources/litechtree-dialog-ce-paper-folia.18689/', forumPendingReview: true, date: '2026-10-24', shots: [
    { file: 'compact', title: '紧凑版第一章：研究基础工艺后获得 80 点（1.3.1）', width: 1280, height: 900, format: 'png' },
    { file: 'requirements', title: '节点悬浮说明：材料持有检查、费用和首次研究奖励', width: 1280, height: 900, format: 'png' },
    { file: 'mastery', title: '第十二章 · 世界工匠：终局分支与前置连线', width: 1280, height: 900, format: 'png' },
    { file: 'standard', title: '标准预设：同一资源包支持重载切换尺寸', width: 1280, height: 900, format: 'png' },
  ] },
  { slug: 'playerplushiestudio', name: '玩家玩偶工坊', forum: 'https://www.minebbs.com/resources/playerplushiestudio-craftengine.18163/', date: '2026-10-14', software: true, shots: [
    { file: 'preview', title: '玩家皮肤生成的玩偶模型实时预览（PlayerPlushieStudio 1.5.5）', width: 786, height: 607, format: 'jpg' },
  ] },
  { slug: 'liskills', name: 'LiSkills', forum: 'https://www.minebbs.com/resources/liskills-hud.18160/', date: '2026-10-14', shots: [
    { file: 'menu', title: '技能面板与角色成长概况（LiSkills 1.20.1）', width: 1920, height: 1080, format: 'png' },
  ] },
  { slug: 'liseasons', name: 'LISeasons', forum: 'https://www.minebbs.com/resources/liseasons.16365/', date: '2026-10-14', shots: [
    { file: 'calendar', title: '云梦泽季节手账 · 本月节气（LISeasons 1.0.87）', width: 1920, height: 1080, format: 'png' },
  ] },
  { slug: 'liemc', name: 'LIEMC', forum: 'https://www.minebbs.com/resources/liemc.17061/', date: '2026-10-14', shots: [
    { file: 'shop', title: 'EMC 商店的物品目录与检索入口（build.109）', width: 1920, height: 1080, format: 'png' },
  ] },
  { slug: 'lipet', name: 'LiPet', forum: 'https://www.minebbs.com/resources/lipet.18156/', date: '2026-10-14', shots: [
    { file: 'center', title: '宠物中心：商城、道具、我的宠物与每日奖励（LiPet 2.0.0）', width: 1920, height: 1080, format: 'png' },
    { file: 'panda', title: '召唤熊猫伙伴“小团子”与主人名牌（原版生物外观）', width: 1920, height: 1080, format: 'png' },
    { file: 'shop', title: '宠物商城：不同种类伙伴的购买入口', width: 1920, height: 1080, format: 'png' },
    { file: 'warehouse', title: '我的宠物：已拥有伙伴的召唤与管理入口', width: 1920, height: 1080, format: 'png' },
    { file: 'growth', title: '成长属性：力量、体质、防御与敏捷', width: 1920, height: 1080, format: 'png' },
    { file: 'items', title: '道具商店：当前服务器配置的宠物道具目录', width: 1920, height: 1080, format: 'png' },
    { file: 'skills', title: '三槽主动技能：林海震荡、树皮守护、根须弹震与冷却信息', width: 1920, height: 1080, format: 'png' },
  ] },
  { slug: 'liskin', name: 'LiSkin', forum: 'https://www.minebbs.com/resources/liskin-craftengine.17535/', date: '2026-07-28', shots: [
    { file: 'menu', title: '综合菜单与主手适配筛选', width: 1920, height: 991 },
  ] },
  { slug: 'lititle', name: 'LiTitle', forum: 'https://www.minebbs.com/resources/lititle.15700/', date: '2026-03-15', shots: [
    { file: 'warehouse', title: '称号仓库', width: 527, height: 405 },
    { file: 'shop', title: '称号商店（空商品配置示例）', width: 526, height: 389 },
    { file: 'colors', title: '聊天颜色选择', width: 510, height: 395 },
  ] },
  { slug: 'lirealenchant', name: 'LiRealEnchant2', forum: 'https://www.minebbs.com/resources/lirealenchant-paper.16740/', date: '2026-06-13 / 14', shots: [
    { file: 'slots', title: '装备附魔槽位与附魔说明', width: 1920, height: 991 },
    { file: 'particles', title: '透视附魔的粒子与冷却提示', width: 1920, height: 991 },
    { file: 'active', title: '主动附魔说明与冷却信息', width: 1920, height: 991 },
  ] },
  { slug: 'liwaystones', name: 'LiWaystones', forum: 'https://www.minebbs.com/resources/liwaystones.14876/', date: '2026-01-23', shots: [
    { file: 'menu', title: '游戏中的传送石碑外观', width: 1920, height: 991 },
    { file: 'detail', title: '选择传送目的地', width: 1920, height: 991 },
    { file: 'world', title: '石碑重命名与共享管理', width: 1920, height: 991 },
  ] },
  { slug: 'lichqian', name: 'LichQian', forum: 'https://www.minebbs.com/resources/lichqian.14575/', date: '2026-01-02', shots: [
    { file: 'result', title: '抽签结果、签文与效果提示', width: 1920, height: 991 },
  ] },
];
