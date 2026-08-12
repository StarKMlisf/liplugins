# 日历 GUI

玩家执行 `/seasons calendar` 可打开六页箱子菜单。

## 六个页面

| 枚举/配置名 | 文件 | 内容 |
| --- | --- | --- |
| `overview` | `gui/overview.yml` | 当前季节、日期、世界、本月节气、天气、体温和入口 |
| `month_terms` | `gui/month-terms.yml` | 当前月的节气列表 |
| `year_terms` | `gui/year-terms.yml` | 全年二十四节气 |
| `temperature` | `gui/temperature.yml` | 体感、空气、湿度、底温和环境说明 |
| `season_events` | `gui/season-events.yml` | 季节事件列表与翻页 |
| `festivals` | `gui/festivals.yml` | 全年节日列表与翻页 |

`gui.yml` 保留全局兜底和旧版兼容配置。对应独立页面文件存在时，以 `gui/<page>.yml` 为准。

## 菜单尺寸

```yaml
menu:
  rows: 6
  size: 54
```

有效大小会被限制在 9～54，并自动向上对齐为 9 的倍数。推荐只设置 `rows` 或让 `size` 与它一致。

## 字符布局

```yaml
layout:
  - "BBBBTBBBB"
  - "BAAAAAAAB"
  - "BAAAAAAAB"
  - "BAAAAAAAB"
  - "BBBBBBBBB"
  - "BPEFCMYHB"
```

每行 9 个字符，每个字符对应 `icons` 下的同名节点。空格表示不覆盖该槽位。

常用图标类型：

| `type` | 用途 |
| --- | --- |
| 普通/省略 | 静态装饰或信息图标 |
| `content` | 动态列表槽位；节气、事件、节日依次填入 |
| `season` | 季节信息 |
| `temperature` | 温度信息，可用冷热材质 |
| `page` | 页面导航，需要 `page` 字段 |
| `close` | 关闭菜单 |

## 动态项目

页面的 `items` 用于放置固定信息项或提供动态列表模板。

```yaml
items:
  event:
    enabled: true
    slot: -1
    material: FLOWERING_AZALEA
    amount: 1
    glow: false
    name: "<dark_green><bold><event></bold></dark_green>"
    lore:
      - "<gray><description></gray>"
    action: none
```

字段：

- `enabled`：是否显示；
- `slot`：固定槽位，`-1` 表示动态模板；
- `material`：默认 Bukkit Material；
- `active-material`：当前/激活状态材质；
- `cold-material`、`hot-material`：温度冷热材质；
- `season-materials`：按 `spring/summer/autumn/winter` 切换材质；
- `amount`：1～64；
- `custom-model-data`：可选模型编号；
- `glow`：附魔光效；
- `name`、`lore`：MiniMessage；
- `action`：点击动作。

## 点击动作

```text
none
close
page:overview
page:month_terms
page:year_terms
page:temperature
page:season_events
page:festivals
previous_page
next_page
```

页面名中的连字符和下划线都会归一化。点击 GUI 内任意槽位都会取消原版物品移动，避免玩家拿走菜单图标。

## 通用占位符

页面标题、布局图标和多数固定项可使用：

| 占位符 | 内容 |
| --- | --- |
| `<season>` | 当前季节中文名 |
| `<term>` | 当前节气中文名 |
| `<date>` | 当前日历月日 |
| `<month>` | 当前月份中文名 |
| `<terms>` | 本月节气摘要 |
| `<world>` | `messages.yml` 映射后的世界名 |
| `<page>` | 当前页面名 |
| `<temperature>` | 体感温度和状态 |
| `<air>` | 空气温度 |
| `<wetness>` | 湿度百分比 |
| `<weather>` | 当前季节环境说明 |
| `<next>` | 下一节气和剩余时间 |
| `<visual>` | 当前季节视觉摘要 |

## 页面专用占位符

### 本月/全年节气

`<term>`、`<date>`、`<season>`、`<current>`。

### 温度页

- 当前项：`<temperature>`、`<air>`、`<wetness>`；
- 底温项：`<season>`、`<base>`；
- 天气项：`<world>`、`<weather>`；
- 节气备忘：`<term>`。

### 季节事件页

- 标题：`<season>`、`<count>`、`<page>`；
- 事件：`<event>`、`<season>`、`<type>`、`<description>`、`<trigger>`、`<chance>`、`<priority>`、`<cooldown>`、`<effects>`。

### 节日页

- 标题：`<month>`、`<count>`、`<page>`；
- 节日：`<festival>`、`<date>`、`<category>`、`<description>`、`<today>`。

## 修改后重载

保存 YAML 后执行：

```text
/seasons reload
```

如果菜单打不开，先检查：

- YAML 缩进；
- 每行布局是否正好 9 个字符；
- 图标字符是否在 `icons` 中定义；
- Material 名是否存在于当前服务端版本；
- `slot` 是否在菜单大小范围内；
- MiniMessage 标签是否闭合。

[返回首页](Home.md)
