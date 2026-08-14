# LiPet Wiki

适用版本：`0.25.9-SNAPSHOT`

适用服务端：

- Paper / Folia `1.21.11`
- Paper / Folia `26.1.2`
- Paper `26.2`

运行建议：Java 25。插件成品 Jar 使用 Java 21 字节码构建，便于跨版本运行。

## 1. 插件定位

LiPet 是一个面向群组服的宠物插件，目标是提供完整、可配置的宠物体验，同时保持 Paper 26.x 可维护兼容。

当前核心能力：

- 宠物创建、召唤、收回、放生、改名
- 宠物商城、道具商城、宠物仓库 GUI
- 捕捉球与捕捉仪式
- 宠物等级、经验、属性点和衍生战斗属性
- 宠物喂养、战斗经验、死亡冷却
- 宠物骑乘、坐下 / 跟随切换
- 每只宠物独立背包
- 宠物信号棒
- SQLite / MySQL 持久化
- Redis 群组同步预留
- Vault / PlaceholderAPI / ModelEngine 软兼容

## 2. 安装

1. 将 `LiPet-0.25.9-SNAPSHOT.jar` 放入服务器 `plugins/` 目录。
2. 启动服务器一次，让插件生成默认配置。
3. 停服，编辑 `plugins/LiPet/` 下的配置文件。
4. 再次启动服务器。
5. 执行 `/lipet status` 检查状态。

单服推荐 SQLite。群组服推荐 MySQL，并按需开启 Redis 同步。

## 3. 配置文件

| 文件 | 用途 |
| --- | --- |
| `config.yml` | 存储、服务器 ID、群组、依赖下载、内置货币 |
| `pet-types.yml` | 宠物类型、实体、模型、属性、行为、背包、成长、食物 |
| `shop.yml` | 宠物商城和宠物道具商城 |
| `gui.yml` | GUI 标题、槽位、图标、按钮 |
| `capture.yml` | 捕捉球、捕捉概率、捕捉仪式、音效、粒子、实体映射 |
| `skills.yml` | 技能书、技能等级、技能效果 |
| `messages.yml` | 所有玩家提示文本 |

所有文本建议使用 MiniMessage 格式。插件会自动补全新增配置节点，不会覆盖已有自定义值。

## 4. 存储配置

### SQLite 单服

```yaml
storage:
  type: "SQLITE"
  sqlite:
    file: "lipet.db"
```

SQLite 适合单服，默认启用。宠物、技能、背包、货币等数据会写入 `plugins/LiPet/lipet.db`。

关服保存等待时间可在主配置调整：

```yaml
storage:
  shutdown-save-timeout-seconds: 20
```

建议保持 `20` 秒以上。LiPet 会先完成活动宠物收回，再排空 SQLite/MySQL 写入队列；若服务器曾崩溃，区块实体载入时会清理未绑定的旧宠物实体，避免再次召回后出现重复实体。

### MySQL 群组服

```yaml
storage:
  type: "MYSQL"
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "lipet"
    username: "root"
    password: "change-me"
    maximum-pool-size: 10
```

群组服必须使用 MySQL。每个子服需要设置不同的 `server.id`，同一组服务器使用相同的 `server.group`。

```yaml
server:
  id: "survival-1"
  group: "main"
```

## 5. 玩家指令

| 指令 | 说明 |
| --- | --- |
| `/lipet` | 玩家默认打开宠物中心；控制台默认显示帮助 |
| `/lipet menu` | 打开宠物中心 |
| `/lipet shop` | 打开宠物商城 |
| `/lipet itemshop` | 打开宠物道具商城 |
| `/lipet warehouse` | 打开宠物仓库 |
| `/lipet balance` | 查看宠物币余额 |
| `/lipet call <宠物名称>` | 召唤仓库中的宠物 |
| `/lipet store` | 收回当前已召唤宠物 |
| `/lipet sit` | 当前宠物坐下 / 继续跟随 |
| `/lipet mount` | 骑乘当前已召唤宠物 |
| `/lipet inventory [宠物名称]` | 打开当前或指定宠物背包 |
| `/lipet rename [宠物名称]` | 进入聊天框改名模式 |
| `/lipet release [宠物名称]` | 永久放生宠物 |
| `/lipet info <宠物名称>` | 查看宠物属性 |
| `/lipet help [页码]` | 查看帮助 |

## 6. 管理员指令

| 指令 | 说明 |
| --- | --- |
| `/lipet create <类型> <名称>` | 直接创建宠物 |
| `/lipet list` | 查看宠物列表 |
| `/lipet captureball <类型> [数量] [玩家]` | 发放捕捉球 |
| `/lipet skillbook <技能> [数量] [玩家]` | 发放技能书 |
| `/lipet signalstick [数量] [玩家]` | 发放宠物信号棒 |
| `/lipet status` | 查看插件状态 |
| `/lipet reload` | 重载配置 |

## 7. 权限

| 权限 | 默认 | 说明 |
| --- | --- | --- |
| `lipet.command.use` | true | 使用 `/lipet` 主命令 |
| `lipet.command.menu` | true | 打开宠物中心 |
| `lipet.command.shop` | true | 打开宠物商城 |
| `lipet.command.itemshop` | true | 打开宠物道具商城 |
| `lipet.command.warehouse` | true | 打开宠物仓库 |
| `lipet.command.balance` | true | 查看宠物币余额 |
| `lipet.command.call` | true | 召唤宠物 |
| `lipet.command.store` | true | 收回宠物 |
| `lipet.command.sit` | true | 坐下 / 跟随 |
| `lipet.command.mount` | true | 骑乘宠物 |
| `lipet.command.inventory` | true | 打开宠物背包 |
| `lipet.command.rename` | true | 修改宠物名称 |
| `lipet.command.release` | true | 放生宠物 |
| `lipet.command.info` | true | 查看宠物信息 |
| `lipet.command.help` | true | 查看帮助 |
| `lipet.capture` | true | 使用捕捉球 |
| `lipet.command.create` | op | 创建宠物 |
| `lipet.command.list` | true | 查看宠物列表 |
| `lipet.command.captureball` | op | 发放捕捉球 |
| `lipet.command.skillbook` | op | 发放技能书 |
| `lipet.command.signalstick` | op | 发放信号棒 |
| `lipet.command.status` | op | 查看运行状态 |
| `lipet.command.reload` | op | 重载配置 |
| `lipet.admin` | op | 管理员总权限 |

## 8. 宠物类型

宠物类型在 `pet-types.yml` 中配置。

示例：

```yaml
types:
  wolf:
    entity-type: "WOLF"
    display-name: "狼"
    enabled: true
    owner-limit: 1
    model:
      provider: "NATIVE"
      id: ""
```

说明：

- `entity-type` 必须是当前 Paper 版本存在的 Bukkit 实体类型。
- `owner-limit` 当前固定用于“一种宠物只能拥有一只”的限制。
- `model.provider` 支持 `NATIVE`、`MODEL_ENGINE`、`CRAFT_ENGINE`。
- `auto-register-vanilla: true` 时会自动注册可生成的原版实体宠物类型。

## 9. 属性与成长

核心属性：

- 力量：增加攻击伤害
- 体质：增加生命与恢复
- 防御：增加伤害减免
- 敏捷：增加移动速度，并影响闪避等衍生属性

衍生属性：

- 最大生命
- 攻击伤害
- 伤害减免
- 暴击率
- 暴击伤害
- 闪避
- 击退抗性
- 吸血
- 生命恢复

成长配置位置：

```yaml
growth:
  maximum-level: 50
  base-experience: 100
  experience-per-level: 25
  attribute-points-per-level: 3
```

宠物可通过喂食和战斗获得经验。升级后获得自由属性点，玩家可在 GUI 中加点。

## 10. 喂食

食物配置在 `pet-types.yml`：

```yaml
foods:
  COOKED_BEEF:
    display-name: "熟牛肉"
    experience: 20
    healing: 6.0
    attribute-points: 0
    minimum-level: 1
    maximum-level: 0
```

规则：

- 玩家手持配置食物右键自己的宠物即可喂食。
- 不符合等级限制时不会消耗食物。
- 没有产生回血、经验或属性点效果时不会消耗食物。
- 数据保存失败时会退还食物。

## 11. 捕捉系统

管理员发放捕捉球：

```text
/lipet captureball <类型> [数量] [玩家]
```

玩家手持捕捉球右键野生生物触发捕捉。

捕捉配置在 `capture.yml`：

```yaml
ritual:
  enabled: true
  duration-ticks: 50
  pulse-interval-ticks: 10
  particle: "ENCHANT"
  sounds:
    start: "BLOCK_BEACON_ACTIVATE"
    pulse: "BLOCK_AMETHYST_BLOCK_CHIME"
    success: "ENTITY_PLAYER_LEVELUP"
    failure: "ENTITY_ITEM_BREAK"
```

兼容处理：

- 无效 Sound / Particle 不会禁用插件，会自动回退安全默认值。
- 疣猪兽、猪灵等跨维度僵尸化实体会做宠物保护。
- 怕阳光生物作为宠物时会防止白天自动燃烧。
- 缺少原版攻击 AI 的宠物会使用统一追击与近战攻击兜底。
- 同一种宠物默认只能拥有一只。

## 12. 宠物商城

宠物商城配置在 `shop.yml` 的 `entries`。

```yaml
entries:
  wolf:
    enabled: true
    pet-type: "wolf"
    pet-name: "<gradient:#B0BEC5:#FFFFFF>小狼</gradient>"
    currency: "INTERNAL"
    price: 250.0
    permission: ""
```

支持货币：

- `INTERNAL`：LiPet 内置宠物币
- `VAULT`：Vault 经济

如果玩家已经拥有该类型宠物，购买会被拒绝。

## 13. 宠物道具商城

道具商城配置在 `shop.yml` 的 `item-entries`。

```yaml
item-entries:
  growth_food:
    enabled: true
    currency: "INTERNAL"
    price: 30.0
    item:
      material: "COOKED_BEEF"
      amount: 8
```

适合出售宠物食物、技能书材料或服务器自定义道具。

## 14. 宠物背包

命令：

```text
/lipet inventory [宠物名称]
```

特性：

- 每只宠物独立背包。
- SQLite / MySQL 持久化。
- 关闭 GUI 时自动保存。
- 删除宠物时清理背包数据。
- `inventory.size: 0` 表示禁用。
- 背包大小必须是 9 的倍数，最大 54。

## 15. 改名

命令：

```text
/lipet rename [宠物名称]
```

流程：

1. 执行命令或在管理 GUI 点击改名。
2. 插件提示进入聊天框输入模式。
3. 玩家直接在聊天框输入新名称。
4. 输入 `取消` 或 `cancel` 可退出。
5. 60 秒未输入会自动超时。

## 16. 信号棒

发放：

```text
/lipet signalstick [数量] [玩家]
```

使用方式：

- 右键：执行当前模式。
- 潜行 + 右键：切换模式。
- 支持右键空气、方块和宠物实体。

当前模式：

- 坐下 / 跟随
- 收回宠物
- 骑乘宠物
- 打开宠物背包

信号棒使用 PDC 标记识别，不依赖物品显示名。

## 17. 技能书

发放：

```text
/lipet skillbook <技能> [数量] [玩家]
```

默认技能：

- `power`：攻击强化
- `vitality`：生命强化
- `agility`：速度强化

玩家右键自己的已召唤宠物学习技能。技能达到最高等级后不会继续消耗技能书。

## 18. 骑乘

方式：

- 空手右键自己的已召唤宠物。
- 使用 `/lipet mount`。
- 使用信号棒骑乘模式。

骑乘参数在 `pet-types.yml`：

```yaml
behavior:
  riding-speed: 0.35
  jump-velocity: 0.5
```

## 19. PlaceholderAPI

可用变量：

```text
%lipet_active_name%
%lipet_active_type%
%lipet_active_level%
%lipet_active_experience%
%lipet_active_attribute_points%
%lipet_active_critical_chance%
%lipet_active_critical_damage%
%lipet_active_dodge%
%lipet_active_knockback_resistance%
%lipet_active_life_steal%
%lipet_active_strength%
%lipet_active_vitality%
%lipet_active_defense%
%lipet_active_agility%
%lipet_active_health%
%lipet_active_max_health%
%lipet_active_damage%
%lipet_active_resistance%
%lipet_active_regeneration%
%lipet_active_state%
%lipet_pet_count%
%lipet_server_id%
```

PlaceholderAPI 是软依赖。未安装时 LiPet 会跳过 PAPI Hook，不影响主体功能。

## 20. 兼容说明

### 宠物 AI 与坐下状态

宠物每次召唤都会强制恢复原版 AI、Mob 感知和站立状态。行为循环也会修复被外部模型插件或旧实体数据意外关闭的 AI。只有玩家主动切换到“坐下”时，插件才会暂停 AI；再次切换为“跟随”会立即恢复。

战斗接近采用双模式导航：狼、敌对生物和傀儡等具备原版攻击寻路的实体完全交由原版 AI 控制，不覆盖速度；没有原版攻击寻路的被动生物使用每 2 tick 更新的平滑辅助移动，并主动面向目标。这样既保留了复杂地形寻路，也避免宠物被速度脉冲拖行或倒着靠近目标。

### 文本样式

LiPet 会统一移除消息组件、GUI 图标、宠物道具和宠物名称的斜体装饰。即使旧配置使用 `&o` 或斜体标签，显示时也会强制转换为非斜体。

### Paper 26.1.2 / 26.2

LiPet 当前使用 Java 21 字节码构建，运行端推荐 Java 25。调度逻辑封装在 `PlatformScheduler`，业务层不直接散落调度调用。

本版同一通用 Jar 已在 Paper 26.1.2 Build 70 与 Paper 26.2 Build 111 完成真实启动、`/lipet status` 和优雅关服验证。

默认交付包使用最低兼容 API 构建，以便同一 Jar 继续运行于 Paper 26.1.2。项目提供锁定 `26.2.build.111-stable` 的 26.2 编译检查 profile：

```text
mvn -Ppaper-26.2 clean package
```

`plugin.yml` 的 `api-version` 刻意保留为 `1.21.11`，它表示最低可加载版本，并不表示只支持 1.21.11；改成 `26.2` 会让 Paper 26.1.2 拒绝加载同一 Jar。

捕捉仪式的音效和粒子使用 Bukkit Registry 解析。配置既可继续填写 `ENTITY_PLAYER_LEVELUP`、`ENCHANT`，也可填写 `minecraft:entity.player.levelup`、`minecraft:enchant`；不存在的键会记录中文警告并回退到安全默认值，不会因此禁用插件。

`0.25.7` 起新写入的宠物背包使用 Bukkit `ItemStack` 字节格式。旧版本保存的对象流数据仍可读取，并会在宠物背包下次保存时自然迁移，不需要手工转换数据库。

### 外部依赖

Vault、PlaceholderAPI、ModelEngine 等为软依赖或 provided 依赖，不会打入 LiPet Jar。

SQLite / MySQL 驱动由运行时依赖管理器按配置下载到插件数据目录，不直接塞进成品 Jar。

## 21. 常见问题

### 重启后宠物不见了

检查 `storage.type`。当前推荐：

```yaml
storage:
  type: "SQLITE"
```

旧版 `MEMORY` 配置会自动迁移为 SQLite。生产服请备份 `plugins/LiPet/lipet.db` 或 MySQL 数据库。

### 插件显示 plugin is disabled

不要只看 `/lipet` 命令报错。需要查看服务器启动时最早的 LiPet 错误堆栈。

常见原因：

- 配置格式错误。
- 材质或实体类型拼错。
- 数据库连接失败。
- 运行时依赖无法下载。

### No sound found with the name UI_TOAST_CHALLENGE

这是旧配置里的无效音效名。`0.25.3+` 已修复：插件会自动回退为 `ENTITY_PLAYER_LEVELUP`，不再因此禁用。

### 宠物背包没有保存

背包在关闭界面时保存。如果服务器崩溃，最后一次打开中的背包可能来不及保存。生产服建议定期备份数据库。

### 信号棒没有反应

确认：

- 物品由 `/lipet signalstick` 发放。
- 玩家当前有已召唤宠物。
- 没有其他插件取消右键交互事件。

### 商城购买失败

检查：

- 玩家余额是否足够。
- `shop.yml` 中的 `pet-type` 是否存在且启用。
- 玩家是否已经拥有该类型宠物。
- Vault 模式下是否安装了 Vault 和经济插件。

## 22. 升级建议

升级前：

1. 停服。
2. 备份 `plugins/LiPet/`。
3. 备份 SQLite 或 MySQL 数据。
4. 替换 Jar。
5. 启动服务器。
6. 执行 `/lipet status`。
7. 检查控制台是否有 LiPet 警告或错误。

LiPet 会补全新增配置节点，但不会覆盖已有自定义配置值。

## 23. 构建

普通通用包：

```text
mvn clean package
```

Paper 26.2 编译检查：

```text
mvn -Ppaper-26.2 clean package
```

输出：

```text
target/LiPet-0.25.9-SNAPSHOT.jar
```
