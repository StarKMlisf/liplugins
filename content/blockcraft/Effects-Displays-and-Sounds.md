# 展示、粒子与音效

## 旋转浮动物品

基座、祭坛中心和待领取产物使用不可拾取的 `ItemDisplay` 展示。真实物品仍保存在插件数据中。

```yaml
display:
  enabled: true
  pedestal:
    item-y-offset: 1.20
    item-scale: 0.65
    slots:
      '0':
        item-y-offset: 1.20
        item-scale: 0.65
      '1':
        item-y-offset: 1.35
        item-scale: 0.80
  altar:
    item-y-offset: 1.20
    item-scale: 0.65
  result:
    item-y-offset: 1.45
    item-scale: 0.65
  surroundings:
    item-y-offset: 1.20
    item-scale: 0.65
    orbit-radius: 1.0
    rotation-degrees-per-tick: 2.5
  show-label: true
  label-template: '<white>{name}</white> <gray>x {count}</gray>'
  label-y-offset: 1.80
  animation:
    enabled: true
    interval-ticks: 1
    rotation-degrees-per-tick: 3.0
    bob-amplitude: 0.12
    bob-period-ticks: 40
```

| 节点 | 有效范围 | 说明 |
| --- | --- | --- |
| `pedestal.item-y-offset` | 0.5-2.5 | 未覆盖槽位的基座默认高度 |
| `pedestal.item-scale` | 0.1-2.0 | 未覆盖槽位的基座默认大小 |
| `pedestal.slots.<编号>.item-y-offset` | 0.5-2.5 | 指定基座槽位的独立高度 |
| `pedestal.slots.<编号>.item-scale` | 0.1-2.0 | 指定基座槽位的独立大小 |
| `altar.item-y-offset` | 0.5-2.5 | 中心前置物高度 |
| `altar.item-scale` | 0.1-2.0 | 中心前置物大小 |
| `result.item-y-offset` | 0.5-3.0 | 待领取产物高度 |
| `result.item-scale` | 0.1-2.0 | 待领取产物大小 |
| `surroundings.item-y-offset` | 0.5-2.5 | `ADVANCED` 环绕物相对核心底部的高度 |
| `surroundings.item-scale` | 0.1-2.0 | 环绕物大小 |
| `surroundings.orbit-radius` | 0.25-4.0 | 环绕轨道水平半径；`1.0` 约为核心侧边一格 |
| `surroundings.rotation-degrees-per-tick` | -20 至 20 | 环绕轨道每 tick 转角；负数反转，0 停止公转 |
| `label-y-offset` | 0.8-3.0 | 悬浮文字高度 |
| `animation.interval-ticks` | 1-10 | 动画刷新间隔 |
| `rotation-degrees-per-tick` | -45 至 45 | 每 tick 旋转角度；负数反向 |
| `bob-amplitude` | 0-1 | 上下浮动幅度 |
| `bob-period-ticks` | 4-400 | 完成一次浮动周期所需时间 |

### 每个基座单独调整

`pedestal.slots` 的编号对应 `structures.yml` 中 `pedestal-offsets` 的排列顺序，第一条为槽位 `0`，第二条为槽位 `1`，依此类推。结构旋转后槽位编号仍然跟随原配置顺序。

未配置的槽位自动使用 `pedestal.item-y-offset` 和 `pedestal.item-scale`。结构超过八个基座时，可以继续增加 `'8'`、`'9'` 等数字节点。

### ADVANCED 环绕展示

每一种已放入的 `surroundings` 物品占一个独立环绕槽。插件按槽位数量把它们均匀分布在水平圆周上，整体绕祭坛核心公转；物品本身仍使用全局动画的旋转和上下浮动。`item-y-offset`、`item-scale`、`orbit-radius` 和公转速度均可独立调整。

环绕展示与基座、中心、成品一样只是视觉实体，真实物品和数量保存在 `data.yml`。重载、重启和区块重新加载后会恢复。

从旧版本升级时，原来的共享高度和大小会迁移到基座默认值、祭坛中心和成品配置；各基座继续继承基座默认值，因此旧祭坛的外观保持不变。

## 悬浮名称

`label-template` 支持 MiniMessage 和两个变量：

- `{name}`：物品实际名称；
- `{count}`：祭坛存储的真实数量。

示例：

```yaml
label-template: '<gradient:#55ff55:#00d4ff>{name}</gradient> <yellow>×{count}</yellow>'
```

MMOItems、CraftEngine 和 CustomFishing 物品会保留各自的自定义名称。

## 四种粒子轨迹

```yaml
crafting:
  effect-type: MAGIC_CIRCLE
  show-empty-pedestal-effects: false
```

| 类型 | 效果 |
| --- | --- |
| `MAGIC_CIRCLE` | 每个基座的粒子螺旋进入中心，同时在核心周围生成旋转圆环 |
| `LINEAR` | 每个基座沿直线路径向中心输送粒子 |
| `PARABOLA` | 每个基座生成抛物线并落入中心 |
| `DISAPPEAR` | 依次从有材料的基座直线输送粒子，抵达后隐藏该基座物品，最后在中心生成收缩聚合圆环 |

`show-empty-pedestal-effects: false` 时，`LINEAR` 和 `PARABOLA` 只从当前有材料物品的基座生成粒子；设为 `true` 后才从结构内全部基座生成。`DISAPPEAR` 始终只处理有材料的基座。

`DISAPPEAR` 中的“消失”只隐藏 `ItemDisplay` 与名称，不会提前删除 `data.yml` 中的真实物品。合成取消、结构失效或结算保存失败时会恢复展示；成功或概率失败时仍按配方数量统一结算，放多的剩余材料会重新显示。

通用设置：

```yaml
crafting:
  effect-interval-ticks: 4
  path-cycle-ticks: 40
  particles-per-path: 2
  particle: ENCHANT
  particle-lifetime-ticks: 8
```

| 节点 | 有效范围 | 说明 |
| --- | --- | --- |
| `effect-interval-ticks` | 1-20 | 创建新轨迹点和合成任务刷新的间隔 |
| `show-empty-pedestal-effects` | `true` / `false` | LINEAR、PARABOLA 是否从空基座生成粒子；默认 `false` |
| `path-cycle-ticks` | 4-1200 | `MAGIC_CIRCLE`、`PARABOLA` 从基座抵达中心的周期 |
| `particles-per-path` | 1-10 | 每条基座路径每次生成的数量 |
| `particle` | Bukkit 粒子枚举名 | 推荐 `ENCHANT`、`END_ROD`、`PORTAL` |
| `particle-lifetime-ticks` | 1-200 | 每一个新粒子点独立保持可见的时间 |

`particle-lifetime-ticks` 不是整场合成时间。Bukkit 没有通用粒子寿命参数，BlockCraft 会在设定时间内持续刷新单个轨迹点来实现可见寿命。

### 每个结构独立设置

`structures.yml` 中的设置优先于 `config.yml` 全局值：

```yaml
structures:
  natural_altar:
    effect-type: MAGIC_CIRCLE
    particle: ENCHANT
```

不同结构可以分别使用四种轨迹和不同 Bukkit 粒子。旧版结构升级时，插件会把升级前实际使用的全局 `effect-type` 与 `particle` 复制到每个结构，保持原有效果。

### 魔法阵参数

```yaml
crafting:
  magic-circle:
    turns: 1.5
    radius: 1.25
    points: 20
```

- `turns`：基座粒子旋入中心时绕行 0.25-8 圈；
- `radius`：中心圆环半径 0.25-8；
- `points`：每次生成 8-64 个圆环点。

### 抛物线参数

```yaml
crafting:
  parabola:
    arc-height: 2.0
```

`arc-height` 范围为 0-10，控制轨迹最高点额外抬升高度。

## 音效

```yaml
interaction:
  place-sound: minecraft:entity.item_frame.add_item
  place-sound-volume: 0.8
  place-sound-pitch: 1.2
  take-sound: minecraft:entity.item_frame.remove_item
  take-sound-volume: 0.8
  take-sound-pitch: 1.0

crafting:
  start-sound: minecraft:block.beacon.power_select
  success-sound: minecraft:ui.toast.challenge_complete
  failure-sound: minecraft:entity.generic.explode
  cancel-sound: minecraft:block.beacon.deactivate
```

使用原版命名空间音效 ID。将对应字符串设为空 `''` 可以关闭该音效。

## 性能建议

如果同时运行的祭坛很多：

- 增大 `effect-interval-ticks`；
- 降低 `particles-per-path`；
- 缩短 `particle-lifetime-ticks`；
- 降低 `magic-circle.points`；
- 把 `display.animation.interval-ticks` 从 1 调整为 2-4。
