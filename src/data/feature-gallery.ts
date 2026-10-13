export interface FeatureShot { file: string; title: string; width: number; height: number; }
export interface FeatureGallery { slug: string; name: string; forum: string; date: string; shots: FeatureShot[]; }
// 仅登记已逐图核实的游戏实拍，保留拍摄日期与原帖来源。
export const featureGalleries: FeatureGallery[] = [
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
