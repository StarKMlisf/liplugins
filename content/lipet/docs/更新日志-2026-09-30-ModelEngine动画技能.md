# 2026-09-30 · LiPet 2.2.0 · 已有 ModelEngine 动画技能

本次增加 12 项使用已有 ModelEngine 蓝图和动画的技能，目录从 100 项扩充到 112 项。原有 88 种生物的三槽保持不变，继续支持自动战斗释放、手动三槽指令、独立 CD、公共 CD、粒子和音效。

## 新增技能

| 技能 ID | 名称 | 实际效果 | CD（秒） | 模式 / 模型 ID | 动画 | 倍速 | 表现时间 / 模型倍率 |
| --- | --- | --- | ---: | --- | --- | ---: | --- |
| `model_frost_ring` | 寒晶环 | 使目标获得缓慢 I，持续 4 秒 | 15 | `EFFECT` / `liseasons_coldwave` | `idle` | 1 | 40 tick / 0.22 |
| `model_blizzard` | 飞雪幕 | 使目标获得缓慢 II，持续 6 秒 | 19 | `EFFECT` / `liseasons_blizzard` | `idle` | 1.25 | 40 tick / 0.2 |
| `model_heatwave` | 热浪灼击 | 立即并每秒对目标造成 1.2 点灼烧伤，最多 5 次 | 19 | `EFFECT` / `liseasons_heatwave` | `idle` | 1.4 | 40 tick / 0.18 |
| `model_tornado` | 小型旋风 | 以 1.3 强度推开目标，不附加伤害；不生成风弹实体 | 15 | `EFFECT` / `liseasons_tornado` | `idle` | 1.2 | 40 tick / 0.1 |
| `model_quake` | 地裂震击 | 对目标及其半径 2.5 格内合法敌人造成 5 点伤害 | 22 | `EFFECT` / `liseasons_earthquake` | `idle` | 1 | 40 tick / 0.13 |
| `model_tidal_push` | 潮浪冲撞 | 对目标造成 4.5 点伤害 | 10 | `EFFECT` / `liseasons_tsunami` | `idle` | 1.2 | 40 tick / 0.1 |
| `model_thunder_burst` | 雷云爆散 | 对目标及其半径 3 格内合法敌人造成 4.5 点伤害；不产生真实闪电、不破坏方块 | 20 | `EFFECT` / `liseasons_thunderstorm` | `idle` | 1.2 | 40 tick / 0.2 |
| `model_hail_strike` | 冰雹击 | 对目标造成 4.5 点伤害 | 11 | `EFFECT` / `liseasons_hail` | `idle` | 1.25 | 40 tick / 0.22 |
| `model_sand_veil` | 风沙遮蔽 | 使目标失明并获得虚弱 I，持续 3 秒；失明对玩家视觉最明显，不强制怪物丢失目标 | 20 | `EFFECT` / `liseasons_sandstorm` | `idle` | 1 | 40 tick / 0.18 |
| `model_parro_peck` | Parro 啄击 | 对目标造成 2.5 点伤害 | 7 | `PET` / 现有唯一模型 | `attack` | 1 | 20 tick / 保持宠物原大小 |
| `model_parro_dodge` | Parro 跃身闪避 | 4 秒内以 30% 概率闪避一次近战或投射物攻击，成功后结束 | 15 | `PET` / 现有唯一模型 | `jump` | 1 | 16 tick / 保持宠物原大小 |
| `model_parro_dash` | Parro 疾行 | 自身获得速度 I，持续 5 秒 | 18 | `PET` / 现有唯一模型 | `run` | 1.25 | 40 tick / 保持宠物原大小 |

九个 `EFFECT` 预置使用已有 LiSeasons 场景蓝图的 `idle` 动画，并缩小为宠物技能表现；不触发灾害、天气、真实闪电或方块破坏。三个 `PET` 预置使用 `parro_pet`、`parro_mount` 已有的 `attack`、`jump`、`run`。完整模型 ID、动画及配置示例见 [技能模型与特效](技能模型特效-2.0.md)。

## 已有宠物模型动画

- 新增 `visual.model-engine-target`：默认 `EFFECT` 使用独立临时模型；`PET` 播放当前宠物已挂载模型的动画。
- 新增 `visual.animation-speed`：有限倍率 0.1～4，默认 1.0，只改变模型动画播放速度。
- `PET` 的模型 ID 留空时仅匹配恰好一个已挂载模型，多模型需要准确指定。动画名必填，不能同时配置 `model-item`。
- 不换肤、不复制、不缩放或销毁宠物模型。表现结束只停止本次仍拥有的动画实例，其他系统后来播放的同名动画继续保留。
- `visual.duration-ticks` 控制单次表现，技能本身的 `duration-ticks` 控制增益、控制或闪避窗口；动画时长不等同于实际效果持续时间。

## 配置保留与分配

`long_1`、`long_2` 对应的 `loadouts.type-overrides` 缺失时补入三个 Parro 技能；已有管理员三槽列表完整保留。其余九项场景模型技能通过类型覆盖选用，不自动覆盖原版物种配装。可选旋风人、雪傀儡配装见 [112 技能目录](宠物技能目录-2.0.md)。

`catalog-version` 保持 2。旧官方目录迁移先执行，之后只为所有现存技能补缺失视觉字段和中文注释，包括管理员技能和保留的旧 ID；已有数值、开关、模型 ID、注释与配装保留。完整校验并保存成功后才切换运行快照；配置无效时保留上一版运行设置。

## 验证与交付状态

Maven 构建与 675 项单元测试全部通过，成品仅含 LiPet 自身业务类，未打包 ModelEngine 或其他依赖。

| 隔离环境 | 结果 |
| --- | --- |
| Paper 26.1.2-70 + ModelEngine R4.1.0 | 12 技能 / 418 项检查通过 |
| Paper 26.2-111 + ModelEngine R4.1.0 | 12 技能 / 418 项检查通过 |
| Folia 26.2-5 + ModelEngine R4.1.0 | 12 技能 / 416 项检查通过 |
| Paper 26.2-111，不安装 ModelEngine | 12 技能 / 102 项检查通过 |

验证覆盖实际伤害、控制、速度、闪避、共享冷却，真实模型注册、动画名、缩放与播放速度，原宠物与 Parro 骑乘模型保留，循环动画淡出、后来同名动画保留、到期/召回清理及缺模型/动画/插件回退。粒子与声音由服务端代理玩家的数据包检查确认；闪避检查将测试候选概率设为 100% 以验证事件链，发布默认值仍为 30%。

ModelEngine 的停止请求先进入淡出，再移除动画记录。复测确认原句柄收到停止请求，并在有界等待内结束；不会把固定四个 Bukkit tick 内仍在淡出的动画误判为泄漏。所有隔离测试服已正常停止。

真人客户端模型外观、资源包显示及实际骑乘操作尚未验收，不能以编译或服务端检查代替。2.2.0 交付路径为 `F:/26.2/待更新/LiPet-2.2.0`；正式服运行 Jar 与管理员配置未覆盖。正常停服后安装并重新启动，再以启动日志确认 `Enabling LiPet v2.2.0`。
