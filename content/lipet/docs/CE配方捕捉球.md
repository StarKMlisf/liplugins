# CE 配方直接合成捕捉球

LiPet 2.0.1 起，CE 配方合成、CE 发放或其他来源得到的原始 CE 物品，都可以直接作为 LiPet 捕捉球使用。球的 `material` 必须等于实际 CE 完整物品 ID，例如 `lipet:basic_capture_ball`。

旧版只认 LiPet 指令/商店写入的捕捉球标记，因此同一个 CE 物品由 CE 配方生成时无法捕捉。2.0.1 接入了与喂食相同的完整物品 ID 识别服务，无需先用指令转换或额外写标记。

## 尚未创建 CE 物品时

交付包附带可选的 `CE捕捉球合成示例-2.0.1`，定义 `lipet:basic_capture_ball`。工作台四边各一枚史莱姆球、中心一枚铁锭，合成一个捕捉球。使用原版史莱姆球模型，可以自行换成 CE 自定义模型。

将示例里的 `CraftEngine/resources/lipet_capture_example` 放到服务器的 `plugins/CraftEngine/resources/`，再将 `LiPet捕捉球配置片段.yml` 的 `ce_basic` 节点合并到现有 `capture.yml -> balls` 下。不要覆盖整份配置，也不要写第二个 `balls` 顶层键。

也可以使用自己已有的 CE 物品；无需安装示例，只需将以下完整 ID 换成真实 ID：

```yaml
# 捕捉球定义；本片段应合并到现有 balls 下。
balls:
  # 内部球种 ID，不得与其他球种重名。
  ce_basic:
    # 布尔值：true 启用，false 停用。
    enabled: true
    # 已加载的 CE 完整物品 ID。
    material: 'lipet:basic_capture_ball'
    # 仅 LiPet 指令/商店生成时使用，支持 MiniMessage。
    name: '<green>普通捕捉球</green>'
    # 仅 LiPet 生成时使用的多行说明，可为空列表。
    lore: []
    # 满血基础成功率，0.0-1.0。
    base-chance: 0.15
    # 低血量附加概率上限，0.0-1.0。
    low-health-bonus: 0.45
    # 最终成功率上限，0.0-1.0。
    maximum-chance: 0.60
```

升级 Jar 后正常重启，确认 LiPet 2.0.1 和 CE 物品加载成功。之后只修改 LiPet 配置可用 `/lipet reload`。拿工作台产物右键可捕捉的野生生物，沿用现有概率、仪式、黑名单、世界限制与消耗规则。

## 识别与退款规则

- 每个 CE 完整 ID 只能对应一个启用的球种。重复配置会警告，原始 CE 物品因无法区分球种而拒绝识别。
- 名称、Lore、颜色和原版底材不作为球种判断依据，普通史莱姆球不能替代 CE 球。
- 旧 LiPet 标记球继续使用原球种；无效、已停用或损坏的标记不回退到 CE 匹配。
- 原始 CE 合成产物保留 CE 名称、Lore 与组件。LiPet 中的 `name/lore` 只在 LiPet 指令和商店生成物品时应用。
- 仪式取消、配置为失败不消耗、创建存档失败等退款路径，退回实际扣除的那一个物品快照，保留模型和自定义组件。
- 可选示例不会自动改写或启用服务器现有配置。
