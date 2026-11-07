# CraftEngine 捕捉球 PlaceholderAPI 变量

适用版本：LiPet `0.29.12-SNAPSHOT`；PlaceholderAPI `2.12.3+`。PlaceholderAPI 和 CraftEngine 都是可选软依赖，未安装时不影响 LiPet 原版宠物功能。

## 1. 公共变量

| 变量 | 返回内容 |
| --- | --- |
| `%lipet_capture_enabled%` | 捕捉系统是否启用，返回 `true` 或 `false` |
| `%lipet_capture_ball_count%` | `capture.yml` 中已启用的捕捉球数量 |
| `%lipet_capture_ball_ids%` | 已启用捕捉球 ID，使用英文逗号连接 |

## 2. 按捕捉球 ID 查询

下列变量中的 `<id>` 不是固定文字，必须替换成 `capture.yml -> balls` 下的实际 ID。假设捕捉球配置为 `balls.craftengine_example`，则 `<id>` 应替换为 `craftengine_example`。

| 变量模板 | 返回内容 |
| --- | --- |
| `%lipet_capture_ball_<id>_enabled%` | 捕捉系统和该捕捉球是否都已启用 |
| `%lipet_capture_ball_<id>_name%` | 配置中的名称，保留 MiniMessage 标签 |
| `%lipet_capture_ball_<id>_plain_name%` | 去除颜色和格式后的纯文本名称 |
| `%lipet_capture_ball_<id>_item_id%` | 完整物品 ID，例如 `yourpack:pet_capture_ball` |
| `%lipet_capture_ball_<id>_item_namespace%` | 物品命名空间，例如 `yourpack` |
| `%lipet_capture_ball_<id>_item_path%` | 物品路径，例如 `pet_capture_ball` |
| `%lipet_capture_ball_<id>_is_craftengine%` | 是否为非 `minecraft:` 自定义物品，返回 `true` 或 `false` |
| `%lipet_capture_ball_<id>_base_chance%` | 基础概率配置原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_base_chance_percent%` | 基础概率显示数值，范围 `0.0-100.0` |
| `%lipet_capture_ball_<id>_low_health_bonus%` | 低血量加成配置原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_low_health_bonus_percent%` | 低血量加成显示数值，范围 `0.0-100.0` |
| `%lipet_capture_ball_<id>_maximum_chance%` | 最高概率配置原值，范围 `0-1` |
| `%lipet_capture_ball_<id>_maximum_chance_percent%` | 最高概率显示数值，范围 `0.0-100.0` |

球 ID 支持小写字母、数字、下划线和短横线；例如 `my_ce_ball` 可直接用于 `%lipet_capture_ball_my_ce_ball_item_id%`。

## 3. CraftEngine 案例

`capture.yml`：

```yaml
balls:
  craftengine_example:
    # true 才会进入 LiPet 捕捉球列表和变量查询。
    enabled: true
    # 填写 CraftEngine 的完整物品 ID。
    material: "yourpack:pet_capture_ball"
    # 名称和 Lore 仍由 LiPet 使用 MiniMessage 渲染。
    name: "<gradient:#69F0AE:#40C4FF><bold>灵契捕捉球</bold></gradient>"
    lore:
      - "<gray>右键可捕捉的野生生物开始仪式</gray>"
    # 三项概率范围均为 0-1。
    base-chance: 0.25
    low-health-bonus: 0.50
    maximum-chance: 0.75
```

可在支持 PlaceholderAPI 的菜单、HUD、计分板或文本插件中使用：

```text
物品：%lipet_capture_ball_craftengine_example_item_id%
名称：%lipet_capture_ball_craftengine_example_plain_name%
基础概率：%lipet_capture_ball_craftengine_example_base_chance_percent%%
最高概率：%lipet_capture_ball_craftengine_example_maximum_chance_percent%%
```

最后一个 `%` 是自行显示的百分号，不属于变量。是否能在 CraftEngine 某个具体配置字段中解析 PAPI，取决于该字段本身是否支持玩家上下文和 PlaceholderAPI；LiPet 只负责注册并返回上述变量。

## 4. 异常返回

- 球 ID 不存在或已禁用时，`enabled` 返回 `false`，其他球属性返回空文本。
- 捕捉系统整体关闭时，`capture_enabled` 和所有球的 `enabled` 返回 `false`；球配置属性仍可查询，方便菜单显示停用状态。
- 替换新版 Jar 后必须完整重启服务器；`/lipet reload` 可刷新 `capture.yml` 的球 ID、物品 ID 和概率，但不能让旧 Jar 获得新变量。
