# 牢李抽签（LichQian）1.1.0 使用说明

## 安装

1. 使用 Java 25 运行 Paper 26.1.2。
2. 安装 Vault 和一个 Vault 经济插件，例如 XConomy。
3. 可选安装 PlaceholderAPI。
4. 将 `LichQian-1.1.0.jar` 放入 `plugins/` 后重启服务器。
5. 首次启动会生成带完整中文注释的 `plugins/LichQian/config.yml`。

## 命令与权限

| 命令 | 功能 | 权限 |
| --- | --- | --- |
| `/lottery`、`/llcq` | 打开抽签 GUI | `lichqian.use` |
| `/lottery draw` | 直接抽签 | `lichqian.use` |
| `/lottery status` | 查看今日次数和重置倒计时 | `lichqian.use` |
| `/lichqian reload` | 安全重载配置 | `lichqian.admin.reload` |

全部命令均带 Tab 补全。`lichqian.admin` 默认包含 `lichqian.admin.reload`。

## 时间配置

```yaml
settings:
  # 0 为不限次数。
  daily_limit: 1

time:
  # IANA 时区，推荐中国服固定使用 Asia/Shanghai。
  zone: "Asia/Shanghai"
  # 每日重置时刻，24 小时制 H:mm。
  daily_reset: "00:00"
  # {reset_at} 的显示格式。
  reset_at_format: "yyyy-MM-dd HH:mm:ss z"
  title:
    fade_in: "10t"
    stay: "70t"
    fade_out: "20t"
```

每日次数保存在 `data.yml`。统计周期以配置时区为准：如果重置时间为 04:00，那么 03:59 仍属于前一天，04:00 起进入新周期。修改时区或重置时间后执行 `/lichqian reload` 即可立即生效。

## 持续时间格式

药水效果格式：`效果名:持续时间:等级`。等级从 0 开始，例如 `1` 表示 II 级。

```yaml
effects:
  - "SPEED:30s:1"       # 速度 II，30 秒
  - "REGENERATION:2m:0" # 生命恢复 I，2 分钟
  - "NIGHT_VISION:600:0" # 兼容旧版：无单位数字按秒处理
  - "LUCK:永久:0"        # 永久效果
```

可用单位：

- `t`：游戏刻，20t = 1 秒
- `ms`：毫秒
- `s`：秒
- `m`：分钟
- `h`：小时
- `d`：天
- `永久`、`infinite`、`-1`：永久

## 文本格式

消息、GUI 标题、物品名和 Lore 同时支持旧版 `&` 颜色代码与 MiniMessage。新配置推荐使用 MiniMessage，例如：

```yaml
gui:
  title: "<gradient:#FFF3A3:#FFB300:#FF6F00><bold>求签阁</bold></gradient> <white>📜"
```

代码内置多色渐变方法以及金色、红金色快捷渐变。

## GUI 和消息占位符

通用每日状态占位符：

- `{cost}`：单次费用
- `{daily_used}`：本周期已抽次数
- `{daily_limit}`：每日上限
- `{daily_remaining}`：剩余次数
- `{reset_in}`：距离重置的中文倒计时
- `{reset_at}`：带时区的准确重置时间

结果消息还支持 `{player}`、`{level}`、`{name}`、`{desc}`、`{items}`、`{effects}`、`{money_amount}` 和 `{money_formatted}`。

## PlaceholderAPI

| 变量 | 返回内容 |
| --- | --- |
| `%laolilottery_last_sign%` | 上次签位，跨重启保存 |
| `%laolilottery_sign_cost%` | 当前费用 |
| `%laolilottery_can_sign%` | 当前能否抽签 |
| `%laolilottery_daily_count%` | 本周期已抽次数 |
| `%laolilottery_daily_limit%` | 每日上限，0 表示不限 |
| `%laolilottery_daily_remaining%` | 剩余次数，不限时返回 -1 |
| `%laolilottery_reset_in%` | 重置倒计时 |
| `%laolilottery_reset_at%` | 准确重置时间 |

## 配置升级与故障保护

- 插件升级只补全缺失配置节点，已有费用、消息、签文和 GUI 不会被默认值覆盖。
- `config.yml` YAML 格式错误时，`/lichqian reload` 会拒绝应用并保留原文件。
- 没有有效签文时不会扣费。
- 发奖过程中发生异常时会自动尝试退款，并在退款失败时明确提示人工处理。
- 背包已满时，多余物品会掉落到玩家脚下。
