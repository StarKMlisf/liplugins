# 装备属性与技能门槛

`items.yml` 可以按材质与公开 PDC 身份匹配装备，提供属性、特性、自然技能经验加成及等级要求。**总开关和默认示例均关闭**；开启前先评估对现有同材质物品的影响。

## 匹配和槽位

材质与 PDC 同时填写时必须同时匹配。PDC 按 STRING 精确比较，区分大小写；名称和 Lore 不作为可信身份。只匹配 `DIAMOND_SWORD` 会影响所有同材质剑，包括已有附魔物品。

支持主手、副手、头、胸、腿、脚六个槽位。背包、容器、光标不产生装备加成；同一槽位堆叠 64 件也只计算一次。主副手各放一件则可分别生效。

任何命中规则的要求未满足，这件物品的全部 LiSkills 加成都不生效，不能借另一条宽松规则领取部分加成。不会强制脱下已经穿戴的物品。

## 数值规则

| 写法 | 含义 | 例子 |
| --- | --- | --- |
| `ADD` | 固定增加属性值 | 力量加 2 |
| `MULTIPLY` | 固定加法之后乘倍率 | 1.10 表示乘 1.10 |
| `ADD_PERCENT` | 最后按基数百分比增加 | 10 表示再增加 10% |

装备属性按“基础、成长和加法之和 × 乘法之积 × 百分比之和对应倍率”计算，最后受属性与平衡上限约束。特性使用 `attack-damage`、`mining-luck` 等横线 ID，不是九属性 ID。

自然经验加成用百分数。比如 `all: 10` 加 `mining: 25`，表示挖矿合计 1.35 倍，其他技能 1.10 倍；多件物品的百分数相加，不反复相乘，也不放大管理员直接赠送经验。

## 使用限制

`requirements` 中的多项技能必须全部达标。技能不存在、停用、缺权限或档案未加载时不放行。`uses` 可限制攻击、破坏、放置、交互、射击、食用、抛竿和穿甲。

`uses` 留空时仅控制加成资格，不阻止使用。普通携带、容器转移、丢弃和脱下不主动限制。若限制 `interact`，不达标时手持该物品的交互会被取消，玩家可换到其他栏位再使用容器。

`liskills.items.bypass` 默认 `false`，OP 也不自动获得；只应显式授予需要绕过门槛的人，不应给所有玩家。禁用世界、排除模式、死亡或关闭成长系统时物品规则停止生效。

## 管理员手持编辑

下面命令仅编辑当前主手物品，要求 `liskills.admin`。规则名称由管理员指定，修改同名规则时不要偷偷换槽位。

~~~text
/lsk item inspect
/lsk item identify guardian_blade
/lsk item stat power strength ADD 2 MAIN_HAND
/lsk item trait damage attack-damage ADD 5 MAIN_HAND
/lsk item xp training mining 25 MAIN_HAND
/lsk item require gate mining 20 MAIN_HAND
/lsk item remove training
/lsk item clear
~~~

`clear` 清理 LiSkills 自有规则，不清除其他插件附魔、Lore 或原生装备修饰符。写入规则不代表已经启用 `items.yml`；总开关仍需管理员自行打开。

旧物品先执行 `/lsk item legacy-preview` 只读检查。支持且完整时再使用 `legacy-migrate`；未知、损坏或不能完整理解的标签不会猜测转换。等级档案迁移不会顺便转换背包内所有物品。

相关页面：[成长与能力](Progression.md)、[命令与权限](Commands.md)、[离线迁移](Migration.md)。
