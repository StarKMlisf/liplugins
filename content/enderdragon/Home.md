# EnderDragon 插件 Wiki

## 基础介绍

EnderDragon 是一个用于接管、增强和管理末影龙玩法的 Bukkit/Paper 插件，当前版本适配 Paper / Purpur `26.1.2`。

插件核心目标：

- 接管原版末影龙复活流程。
- 支持多种末影龙配置和随机权重刷新。
- 支持指令召唤、末影水晶召唤、倒计时复活、定点复活。
- 支持 GUI 管理奖励物品。
- 支持 YAML 配置奖励物品、奖励命令、是否发放物品。
- 支持 PlaceholderAPI 变量查询龙状态和复活状态。
- 支持中文龙 ID、中文配置文件名、中文奖励池。
- 支持末影龙发光描边、BossBar、击杀广播、伤害统计、龙蛋叠加掉落。

主命令：

```text
/enderdragon
/ed
```

依赖和软依赖：

```text
PlaceholderAPI  可选，用于变量
Vault           预留兼容
MMOItems        可选兼容
MythicLib       可选兼容
PetDragon       可选兼容
```

## 功能总览

### 末影龙接管

插件会接管启用世界中的末影龙实体，并在生成后应用插件配置：

- 龙名称
- 血量
- 护甲
- 韧性
- BossBar 样式
- 发光描边颜色
- 击杀广播
- 生成广播
- 击杀奖励
- 伤害统计
- 龙蛋掉落
- 自动复活规则

### 三种召唤方式

插件支持三种召唤来源：

```yaml
summon:
  crystal-respawn:
    enabled: true
  command:
    enabled: true
  countdown:
    enabled: true
```

说明：

| 配置项 | 作用 |
|---|---|
| `summon.crystal-respawn.enabled` | 是否允许原版末影水晶复活流程由插件接管 |
| `summon.command.enabled` | 是否允许 `/ed respawn` 和 `/ed spawn` 指令召唤 |
| `summon.countdown.enabled` | 是否允许倒计时、定点任务自动召唤 |

### 召唤前置检测

任意召唤方式执行前，插件都会检测末地世界是否已有末影龙。

检测范围：

- 原版 `EnderDragon`
- 插件记录的 ED 末影龙
- 世界初始化或地图重置生成的原版末影龙

只要当前末地已有任意末影龙，新的召唤会被阻止。

### 指令召唤限制

玩家执行指令召唤时，必须人在末地世界。

允许：

```text
玩家在 world_the_end 使用 /ed respawn
玩家在 world_the_end 使用 /ed spawn default
```

不允许：

```text
玩家在主世界使用 /ed respawn world_the_end
玩家在主世界使用 /ed spawn default world_the_end
```

控制台可以指定末地世界执行。

### 复活卡住保护

插件提交原版末影龙复活流程后，会进行后置检测。

如果原版复活流程启动后长时间没有生成龙，插件会：

1. 检测世界是否已有末影龙。
2. 检测原版复活流程是否仍在运行。
3. 若长时间没有实体生成，则重置原版复活水晶流程。
4. 重新摆放末影水晶并再次调用原版复活。

注意：

插件不会再直接 `spawn` 一条末影龙实体作为兜底，避免绕过原版末地战斗系统。

### 龙蛋叠加

如果龙蛋生成位置已有龙蛋或其他方块，插件可以向上寻找可放置位置。

```yaml
dragon-egg:
  enabled: true
  stack-if-exists: true
  max-stack-height: 16
```

效果：

```text
第一颗龙蛋：X Y Z
第二颗龙蛋：X Y+1 Z
第三颗龙蛋：X Y+2 Z
```

### 奖励系统

奖励支持两种管理方式：

- 游戏内 GUI 管理
- YAML 文件手动编辑

奖励可以配置：

- 是否发放物品
- 是否执行后台命令
- 物品和命令同时发放
- 只执行命令不发物品

示例：

```yaml
rewards:
  example_reward:
    item:
      material: DIAMOND
      amount: 3
      name: "&b龙息钻石"
      lore:
        - "&7击败末影龙后获得的奖励"
    give-item: true
    commands:
      enabled: true
      list:
        - "eco give %player% 5000"
        - "broadcast &d%player% 击败末影龙并获得了额外奖励！"
```

奖励命令支持变量：

| 变量 | 说明 |
|---|---|
| `%player%` | 玩家名 |
| `%player_name%` | 玩家名 |
| `%name%` | 玩家名 |
| `%uuid%` | 玩家 UUID |
| `%dragon%` | 龙显示名 |
| `%dragon_id%` | 龙 ID |
| `%world%` | 世界名 |

奖励分发说明：

- 击杀者奖励：发给最后击杀龙的玩家。
- 排名奖励：按伤害排名发放。
- 参与奖：按伤害记录发放，不要求玩家仍在末地。
- 随机参与奖励：从参与者中抽取。
- 掉落奖励：掉落在龙死亡位置。

玩家死亡回主城或传送到其他世界，只要仍在线，玩家类奖励仍会正常发放。

## 指令列表

### 查看帮助

```text
/ed
/ed help
```

作用：

查看插件帮助和可用命令列表。

权限：

```text
无特殊权限
```

### 重载插件

```text
/ed reload
```

作用：

- 重载 `config.yml`
- 重载语言文件
- 重载龙配置
- 重载奖励配置
- 重载 GUI 配置
- 重建自动复活任务

权限：

```text
ed.reload
```

### 重载 Groovy 脚本

```text
/ed reload script
```

作用：

重载 Groovy 脚本扩展。

前提：

```yaml
expansion:
  groovy: true
```

权限：

```text
ed.reload
```

### 查看龙状态

```text
/ed status
/ed status <世界名>
```

作用：

查看指定世界是否存在末影龙。

返回结果由配置决定：

```yaml
placeholder:
  dragon-status:
    alive: "存活"
    dead: "死亡"
```

示例：

```text
/ed status world_the_end
```

权限：

```text
ed.status
```

### 随机复活一条龙

```text
/ed respawn
/ed respawn <世界名>
```

作用：

根据权重或概率随机选择一条已启用的 ED 末影龙并复活。

示例：

```text
/ed respawn
/ed respawn world_the_end
```

限制：

- 玩家执行时必须人在末地世界。
- 控制台执行时必须填写世界名。
- 目标世界必须是末地环境。
- 当前末地已有末影龙时不会重复生成。

权限：

```text
ed.respawn
```

### 指定龙 ID 复活

```text
/ed spawn <龙ID>
/ed spawn <龙ID> <世界名>
```

作用：

复活指定 ID 的 ED 末影龙。

示例：

```text
/ed spawn default
/ed spawn default world_the_end
/ed spawn 初级末影龙 world_the_end
```

限制：

- 玩家执行时必须人在末地世界。
- 控制台执行时必须填写世界名。
- 龙 ID 必须存在。
- 当前末地已有末影龙时不会重复生成。

权限：

```text
ed.respawn
```

### 查看单龙自动复活信息

```text
/ed respawn_info <龙ID>
```

作用：

查看指定龙的自动复活配置和当前计时状态。

显示内容：

- 龙 ID
- 复活世界
- 复活模式
- 配置参数
- 剩余时间
- 计时状态

示例：

```text
/ed respawn_info default
/ed respawn_info 高级末影龙
```

权限：

```text
ed.respawn_info
```

### 倒计时复活状态

```text
/ed respawn_cd get <世界名>
```

作用：

查看旧版倒计时复活任务状态。

示例：

```text
/ed respawn_cd get world_the_end
```

权限：

```text
ed.respawn
```

### 设置倒计时复活时间

```text
/ed respawn_cd set <世界名> <秒>
```

作用：

设置击杀后倒计时复活时间。

示例：

```text
/ed respawn_cd set world_the_end 3600
```

权限：

```text
ed.respawn
```

### 启动倒计时复活

```text
/ed respawn_cd start <世界名>
```

作用：

手动启动指定世界的倒计时复活。

示例：

```text
/ed respawn_cd start world_the_end
```

权限：

```text
ed.respawn
```

### 移除倒计时复活

```text
/ed respawn_cd remove <世界名>
```

作用：

移除指定世界的倒计时复活任务。

示例：

```text
/ed respawn_cd remove world_the_end
```

权限：

```text
ed.respawn
```

### 移除全部倒计时复活

```text
/ed respawn_cd removeAll
```

作用：

移除全部倒计时复活任务。

权限：

```text
ed.respawn
```

### 打开奖励预览 GUI

```text
/ed drop gui
/ed drop gui <龙ID>
```

作用：

打开主奖励 GUI 或指定龙的奖励预览 GUI。

示例：

```text
/ed drop gui
/ed drop gui default
/ed drop gui 中级末影龙
```

权限：

```text
ed.drop.gui
```

### 打开奖励编辑 GUI

```text
/ed drop edit
/ed drop edit <龙ID>
```

作用：

打开主奖励编辑 GUI 或指定龙的奖励编辑 GUI。

权限：

```text
ed.drop.edit
```

### 添加手持物品到奖励池

```text
/ed drop add <龙ID> <概率>
```

作用：

把玩家手持物品添加到指定龙的奖励池。

概率范围：

```text
0 < 概率 <= 100
```

示例：

```text
/ed drop add default 10
/ed drop add 高级末影龙 2.5
```

权限：

```text
ed.drop.edit
```

### 删除奖励池物品

```text
/ed drop remove <龙ID> <序号>
```

作用：

删除指定龙奖励池中的某个物品。

示例：

```text
/ed drop remove default 1
```

权限：

```text
ed.drop.edit
```

### 清空奖励池

```text
/ed drop clear <龙ID>
```

作用：

清空指定龙的奖励池。

示例：

```text
/ed drop clear default
```

权限：

```text
ed.drop.edit
```

### 生成新版配置模板

```text
/ed update
```

作用：

生成新版配置模板文件，通常用于对照更新配置。

权限：

```text
ed.update
```

## 权限列表

| 权限 | 默认 | 说明 |
|---|---|---|
| `ed.admin` | OP | 管理员总权限，包含主要管理权限 |
| `ed.reload` | OP | 允许重载插件 |
| `ed.status` | 所有人 | 允许查看龙状态 |
| `ed.respawn_info` | 所有人 | 允许查看单龙复活信息 |
| `ed.drop.gui` | 所有人 | 允许打开普通奖励预览 GUI |
| `ed.drop.edit` | OP | 允许编辑奖励池 |
| `ed.respawn` | OP | 允许召唤、复活、管理倒计时复活 |
| `ed.update` | OP | 允许生成新版配置模板 |

`ed.admin` 包含：

```text
ed.reload
ed.status
ed.respawn_info
ed.drop.edit
ed.respawn
ed.update
```

## PlaceholderAPI 变量

变量前缀：

```text
%ed_变量名%
```

### 龙状态变量

| 变量 | 说明 |
|---|---|
| `%ed_dragon_status%` | 查询玩家当前世界的末影龙状态 |
| `%ed_dragon_status_<世界名>%` | 查询指定世界末影龙状态 |

返回文本：

```yaml
placeholder:
  dragon-status:
    alive: "存活"
    dead: "死亡"
```

示例：

```text
%ed_dragon_status%
%ed_dragon_status_world_the_end%
```

### 单龙复活变量

| 变量 | 说明 |
|---|---|
| `%ed_respawn_mode_<龙ID>%` | 查询指定龙启用的复活模式 |
| `%ed_respawn_time_<龙ID>%` | 查询指定龙的复活时间参数 |
| `%ed_respawn_remain_<龙ID>%` | 查询距离下一次复活的剩余时间 |
| `%ed_respawn_countdown_<龙ID>%` | 查询倒计时模式剩余时间 |

示例：

```text
%ed_respawn_mode_default%
%ed_respawn_time_default%
%ed_respawn_remain_default%
%ed_respawn_countdown_default%
%ed_respawn_mode_高级末影龙%
```

### 是否可以复活

| 变量 | 说明 |
|---|---|
| `%ed_can_respawn%` | 查询玩家当前世界是否允许复活 |
| `%ed_can_respawn_<世界名>%` | 查询指定世界是否允许复活 |

示例：

```text
%ed_can_respawn%
%ed_can_respawn_world_the_end%
```

### 旧版倒计时变量

| 变量 | 说明 |
|---|---|
| `%ed_respawn_cd_progress%` | 当前世界倒计时进度 |
| `%ed_respawn_cd_remainTime%` | 当前世界剩余秒数 |
| `%ed_respawn_cd_setTime%` | 当前世界设置秒数 |
| `%ed_respawn_cd_progress_<世界名>%` | 指定世界倒计时进度 |
| `%ed_respawn_cd_remainTime_<世界名>%` | 指定世界剩余秒数 |
| `%ed_respawn_cd_setTime_<世界名>%` | 指定世界设置秒数 |

示例：

```text
%ed_respawn_cd_progress_world_the_end%
%ed_respawn_cd_remainTime_world_the_end%
%ed_respawn_cd_setTime_world_the_end%
```

### 格式化倒计时变量

```text
%ed_respawn_cd_remain_<世界名>%
%ed_respawn_cd_remain_<世界名>$天$小时$分钟$秒%
```

示例：

```text
%ed_respawn_cd_remain_world_the_end%
%ed_respawn_cd_remain_world_the_end$天$小时$分钟$秒%
```

## 配置文件结构

插件主要配置目录：

```text
plugins/EnderDragon/
├─ config.yml
├─ lang/
├─ setting/
├─ reward/
├─ gui/
├─ data.yml
└─ respawn_cd.yml
```

### config.yml

核心配置文件，用于控制：

- 语言
- 伤害显示
- 龙配置文件列表
- 自动复活
- 倒计时复活
- 召唤方式开关
- 原版龙接管策略
- Placeholder 文本
- 龙蛋叠加
- 黑名单世界
- 黑名单生成原因
- 依赖钩子
- 高级设置

### setting 目录

每个 YAML 文件对应一条龙配置。

示例：

```text
plugins/EnderDragon/setting/default.yml
plugins/EnderDragon/setting/初级末影龙.yml
plugins/EnderDragon/setting/中级末影龙.yml
plugins/EnderDragon/setting/高级末影龙.yml
```

`config.yml` 中通过 `dragon_setting_file` 启用：

```yaml
dragon_setting_file:
  - 'default:5'
  - '初级末影龙:7'
  - '中级末影龙:5'
  - '高级末影龙:3'
```

格式：

```text
文件名:权重
```

说明：

- 文件名对应 `setting/<文件名>.yml`。
- 文件名支持中文。
- 龙 ID 默认读取 `unique_name`。
- 如果非 default 示例文件被改名，可以同步修改 `dragon_setting_file`。
- 权重仅在 `special_dragon_jude_mode: weight` 时生效。

### reward 目录

每条龙可以有独立奖励池。

示例：

```text
plugins/EnderDragon/reward/default.yml
plugins/EnderDragon/reward/初级末影龙.yml
plugins/EnderDragon/reward/中级末影龙.yml
plugins/EnderDragon/reward/高级末影龙.yml
```

奖励文件名通常与龙 ID 对应。

### gui 目录

用于配置奖励 GUI 页面。

常用配置：

```yaml
main_gui: main
```

表示 `/ed drop gui` 默认打开 `gui/main.yml`。

## 自动复活机制

插件支持两套自动复活机制。

### 击杀后倒计时复活

旧版倒计时配置：

```yaml
respawn_cd:
  enable: true
```

配合命令：

```text
/ed respawn_cd set <世界名> <秒>
/ed respawn_cd start <世界名>
/ed respawn_cd get <世界名>
```

适合：

- 击杀后固定冷却再复活。
- 例如击杀后 3600 秒复活。

### 服务器真实时间定点复活

旧版定点任务配置：

```yaml
auto_respawn:
  task_2:
    enable: true
    world_name: world_the_end
    dragon: default
    respawn_time: 'week:7,20:00'
```

支持格式：

| 格式 | 说明 |
|---|---|
| `minute:30` | 每 30 分钟复活 |
| `hour:4` | 每 4 小时复活 |
| `day:1,20:00` | 每天 20:00 复活 |
| `week:7,20:00` | 每周日 20:00 复活 |
| `month:1,20:00` | 每月 1 日 20:00 复活 |
| `year:200,20:00` | 每年第 200 天 20:00 复活 |

### 单龙独立复活规则

每条龙可以在自己的 `setting/<龙ID>.yml` 中配置独立复活规则。

支持模式：

```text
countdown
fixed_time
```

说明：

- `countdown`：击杀后倒计时复活。
- `fixed_time`：按服务器真实时间定点复活。
- 同一条龙只应启用一种模式。

可通过以下指令查看：

```text
/ed respawn_info <龙ID>
```

也可以通过变量查看：

```text
%ed_respawn_mode_<龙ID>%
%ed_respawn_time_<龙ID>%
%ed_respawn_remain_<龙ID>%
```

## 常见配置示例

### 只允许倒计时自动复活

```yaml
summon:
  crystal-respawn:
    enabled: false
  command:
    enabled: false
  countdown:
    enabled: true
```

### 允许水晶和指令召唤

```yaml
summon:
  crystal-respawn:
    enabled: true
  command:
    enabled: true
  countdown:
    enabled: false
```

### 奖励只执行命令，不发物品

```yaml
give-item: false
commands:
  enabled: true
  list:
    - "eco give %player% 5000"
```

### 奖励只发物品，不执行命令

```yaml
give-item: true
commands:
  enabled: false
  list: []
```

### 奖励既发物品又执行命令

```yaml
give-item: true
commands:
  enabled: true
  list:
    - "eco give %player% 5000"
```

## 常见问题

### 玩家不在末地能不能用指令召唤？

不能。

玩家执行 `/ed respawn` 或 `/ed spawn` 时，必须本人在末地世界。

控制台可以指定末地世界执行：

```text
/ed respawn world_the_end
/ed spawn default world_the_end
```

### 为什么提示当前世界已有末影龙？

插件召唤前会检测原版龙和 ED 龙。

只要末地存在任意末影龙，就会阻止重复召唤。

### 为什么奖励命令里的 `%player_name%` 也能用？

奖励命令已统一支持：

```text
%player%
%player_name%
%name%
%uuid%
%dragon%
%dragon_id%
%world%
```

推荐统一使用：

```text
%player%
```

### 玩家打龙后死亡回城，还能拿奖励吗？

可以。

排名奖励、参与奖励会按伤害记录发放，不要求玩家仍在末地。

说明：

- 玩家在线：物品奖励和命令奖励都能正常发放。
- 玩家离线：命令奖励仍可按玩家名执行；物品进背包需要玩家在线。

### 中文龙 ID 可以用吗？

可以。

以下位置支持中文：

- `setting/<中文文件名>.yml`
- `unique_name`
- `dragon_setting_file`
- `/ed spawn <中文龙ID>`
- `/ed drop gui <中文龙ID>`
- `/ed respawn_info <中文龙ID>`
- PlaceholderAPI 中的 `<龙ID>`

示例：

```text
/ed spawn 高级末影龙
%ed_respawn_mode_高级末影龙%
```

### 修改龙配置文件名后为什么没加载？

需要同步修改 `config.yml`：

```yaml
dragon_setting_file:
  - '新的文件名:5'
```

文件实际路径：

```text
plugins/EnderDragon/setting/新的文件名.yml
```

### 修改配置后怎么生效？

执行：

```text
/ed reload
```

如果修改了依赖加载、部分高级兼容项或服务端环境项，建议重启服务器。

## 推荐测试流程

1. 重启服务器或执行 `/ed reload`。
2. 进入末地世界。
3. 执行：

```text
/ed status
```

4. 如果显示死亡，执行：

```text
/ed spawn default
```

5. 确认生成广播出现。
6. 击杀龙，确认奖励、伤害统计、龙蛋叠加。
7. 使用 PlaceholderAPI 测试变量：

```text
%ed_dragon_status%
%ed_respawn_mode_default%
%ed_respawn_remain_default%
```

## 文件维护建议

- 修改龙属性：编辑 `setting/<龙ID>.yml`。
- 修改奖励：优先用 `/ed drop edit <龙ID>`，复杂命令奖励可编辑 `reward/<龙ID>.yml`。
- 修改语言提示：编辑 `lang/Chinese.yml`。
- 修改召唤开关：编辑 `config.yml` 的 `summon`。
- 修改定时复活：编辑 `auto_respawn` 或单龙 `respawn_rule`。

修改后执行：

```text
/ed reload
```
