# LiAnimalScale Wiki

> 当前版本：`1.1.0`  
> 适配服务端：Paper/Folia/Luminol `1.21.11+`，兼容 `26.1.2`  
> Java 版本：Java `21`（1.21.11）/ Java `25`（26.1+）

## 1. 插件介绍

LiAnimalScale 是一个使用 Minecraft 原生 `minecraft:scale` 属性调整动物大小的
Paper/Folia/Luminol 插件。

插件不会生成盔甲架、展示实体或伪装实体，也不使用 NMS。修改倍率后，动物模型与
碰撞箱会按照游戏原生规则一起缩放。

主要功能：

- 对准某一个动物，单独设置它的大小。
- 查询或恢复某一个动物的倍率。
- 自动放大新生成的动物。
- 启动时批量处理当前已加载的动物。
- 使用白名单或黑名单限制自动处理的动物类型。
- 使用 MiniMessage 自定义渐变、RGB 和格式化消息。
- 配置升级时自动补充缺失节点，不覆盖已有自定义值。

## 2. 安装方法

1. 确认服务器为 Paper、Folia 或 Luminol `1.21.11+`。
2. `1.21.11` 使用 Java `21`；`26.1+` 使用 Java `25`。
3. 将 `LiAnimalScale-1.1.0.jar` 放入服务器的 `plugins` 目录。
4. 启动服务器。
5. 首次启动后会生成：

```text
plugins/LiAnimalScale/config.yml
plugins/LiAnimalScale/messages.yml
```

6. 修改配置后执行：

```text
/animalscale reload
```

插件使用的 Adventure 与 MiniMessage 由服务端根据 `plugin.yml` 自动加载，不会被
打入插件 Jar。服务器首次加载插件时需要能够访问 Maven Central。

## 3. 只放大指定的某一个动物

如果只想手动放大指定动物，不希望插件自动修改全部动物，请先关闭自动缩放：

```yaml
auto-scale:
  enabled: false
  apply-loaded-on-enable: false
```

保存配置并执行：

```text
/as reload
```

随后把游戏准星对准需要修改的动物，执行：

```text
/as set 3
```

这条指令只会把准星对准的那个动物放大为 `3` 倍，不会修改附近或其他世界中的动物。

常用单体操作：

```text
/as get
/as set 5
/as reset
```

- `get`：查询当前对准动物的倍率。
- `set 5`：只把当前对准动物设置为 `5` 倍。
- `reset`：只恢复当前对准动物的原始大小。

如果以前已经开启过自动缩放，可先执行下面的指令，把当前所有已加载动物设回
`1` 倍：

```text
/as applyloaded 1
```

注意：`applyloaded` 只能处理服务器当前已经加载的动物。已经卸载区块中的动物需要
在区块重新加载后再恢复。

## 4. 指令说明

主指令：

```text
/animalscale
```

可用别名：

```text
/as
/animalgiant
/动物缩放
```

### 4.1 查看帮助

```text
/animalscale help
```

显示插件的指令帮助。

### 4.2 设置单个动物倍率

```text
/animalscale set [倍率]
```

玩家需要在配置的检测距离内对准一个动物。

示例：

```text
/as set 3
/as set 10
```

省略倍率时使用 `settings.default-scale`：

```text
/as set
```

### 4.3 查询单个动物倍率

```text
/animalscale get
```

返回当前倍率和该实体的原生默认倍率。

### 4.4 恢复单个动物大小

```text
/animalscale reset
```

恢复准星对准动物的原生默认倍率。

### 4.5 批量设置已加载动物

```text
/animalscale applyloaded [倍率]
```

该指令会处理所有世界中当前已经加载的动物，不受自动缩放白名单或黑名单限制。

示例：

```text
/as applyloaded 4
/as applyloaded 1
```

省略倍率时使用 `settings.default-scale`。

### 4.6 重载配置

```text
/animalscale reload
```

重新加载 `config.yml` 和 `messages.yml`。

重载不会自动恢复已经修改过的动物。动物倍率需要通过 `reset` 或 `applyloaded`
主动修改。

## 5. 权限说明

| 权限 | 用途 | 默认拥有者 |
| --- | --- | --- |
| `lianimalscale.command` | 使用主指令和查看帮助 | 所有玩家 |
| `lianimalscale.get` | 查询所看动物倍率 | 所有玩家 |
| `lianimalscale.set` | 设置单个动物倍率 | OP |
| `lianimalscale.reset` | 恢复单个动物倍率 | OP |
| `lianimalscale.applyloaded` | 批量修改已加载动物 | OP |
| `lianimalscale.reload` | 重载插件配置 | OP |
| `lianimalscale.admin` | 包含全部 LiAnimalScale 权限 | OP |

所有子指令与倍率参数均提供 Tab 补全，并且补全结果会根据执行者的权限过滤。

## 6. 主配置详解

默认 `config.yml`：

```yaml
settings:
  target-distance: 12.0
  minimum-scale: 1.0
  maximum-scale: 16.0
  default-scale: 3.0

auto-scale:
  enabled: true
  apply-loaded-on-enable: true
  scale: 3.0
  list-mode: BLACKLIST
  entity-types: []
```

### 6.1 `settings.target-distance`

玩家使用 `set`、`get`、`reset` 时检测动物的最远距离。

- 单位：方块
- 有效范围：`1.0` 至 `64.0`
- 默认值：`12.0`

墙壁等实体方块会阻挡目标检测，不能隔墙修改动物。

### 6.2 `settings.minimum-scale`

管理指令允许使用的最小倍率。

- Minecraft 属性范围：`0.0625` 至 `16.0`
- 默认值：`1.0`

默认设为 `1.0`，表示插件主要用于放大动物。希望允许缩小动物时，可以把它改为
小于 `1.0` 的值。

### 6.3 `settings.maximum-scale`

管理指令允许使用的最大倍率。

- Minecraft 属性范围：`0.0625` 至 `16.0`
- 默认值：`16.0`
- 不能小于 `minimum-scale`

### 6.4 `settings.default-scale`

执行 `/as set` 或 `/as applyloaded` 时没有填写倍率，就使用这个值。

该值会被自动限制在最小倍率和最大倍率之间。

### 6.5 `auto-scale.enabled`

是否自动缩放之后新生成的动物。

```yaml
enabled: true
```

- `true`：新生成的符合条件动物自动使用 `auto-scale.scale`。
- `false`：不自动修改新生成动物，仍可使用单体指令。

### 6.6 `auto-scale.apply-loaded-on-enable`

插件启用后是否扫描所有世界当前已经加载的动物。

大型服务器如果不希望启动时执行一次实体扫描，可以设置为：

```yaml
apply-loaded-on-enable: false
```

### 6.7 `auto-scale.scale`

自动缩放使用的倍率，默认是 `3.0`。

该值同样会被限制在 `minimum-scale` 和 `maximum-scale` 之间。

### 6.8 `auto-scale.list-mode`

控制 `entity-types` 列表的模式：

- `BLACKLIST`：列表中的动物不自动缩放。
- `WHITELIST`：只自动缩放列表中的动物。

### 6.9 `auto-scale.entity-types`

填写 Bukkit `EntityType` 英文枚举名，不区分大小写。

只自动放大牛：

```yaml
auto-scale:
  enabled: true
  apply-loaded-on-enable: true
  scale: 3.0
  list-mode: WHITELIST
  entity-types:
    - COW
```

自动放大全部动物，但排除猫、狼和鹦鹉：

```yaml
auto-scale:
  enabled: true
  apply-loaded-on-enable: true
  scale: 3.0
  list-mode: BLACKLIST
  entity-types:
    - CAT
    - WOLF
    - PARROT
```

插件只处理 Bukkit `Animals` 类型。即使把怪物类型写入列表，也不会修改怪物。

## 7. 消息与 MiniMessage

所有玩家提示都位于 `messages.yml`，业务代码中没有硬编码玩家消息。

消息支持：

- MiniMessage 标准颜色标签。
- RGB 十六进制颜色。
- 多色渐变。
- 粗体、斜体、下划线等格式。
- `<prefix>` 全局前缀标签。

示例：

```yaml
prefix: "<gradient:#65D6CE:#86A8E7:#D16BA5><bold>动物缩放</bold></gradient> <dark_gray>»</dark_gray> "

scale-set: "<prefix><green>已将 <white><entity></white> 的倍率设置为 <aqua><scale>x</aqua>。</green>"
```

插件内部还提供多色渐变工具，可使用任意两种或更多颜色生成 MiniMessage 渐变文本。

## 8. 动物倍率是否持久保存

倍率直接写入实体的原生 `minecraft:scale` 基础属性。

正常情况下，Minecraft 会随实体数据保存该属性。因此：

- 区块卸载再加载后，倍率不会因为插件重载而自动丢失。
- 服务器重启不会自动恢复已经修改的动物。
- 卸载插件不会自动修改现有动物。
- 使用 `/as reset` 可以恢复单个动物。
- 使用 `/as applyloaded 1` 可以恢复当前已加载的全部动物。

## 9. 常见使用方案

### 9.1 只允许管理员手动指定动物

```yaml
auto-scale:
  enabled: false
  apply-loaded-on-enable: false
```

管理员对准动物执行：

```text
/as set 3
```

### 9.2 所有动物自动放大

```yaml
auto-scale:
  enabled: true
  apply-loaded-on-enable: true
  scale: 3.0
  list-mode: BLACKLIST
  entity-types: []
```

### 9.3 只自动放大牛和羊

```yaml
auto-scale:
  enabled: true
  apply-loaded-on-enable: true
  scale: 4.0
  list-mode: WHITELIST
  entity-types:
    - COW
    - SHEEP
```

### 9.4 缩小指定动物

先允许小于 `1.0` 的倍率：

```yaml
settings:
  minimum-scale: 0.25
```

重载后对准动物：

```text
/as set 0.5
```

## 10. 常见问题

### 插件没有出现在插件列表中

请依次检查：

1. Jar 是否位于当前服务器实例的 `plugins` 目录。
2. 服务端是否为 Paper、Folia 或 Luminol `1.21.11+`。
3. `1.21.11` 是否使用 Java `21`，`26.1+` 是否使用 Java `25`。
4. 首次启动时服务器能否下载 `plugin.yml` 中声明的运行库。
5. 查看启动日志中最早出现的 LiAnimalScale 错误，而不是只看后续指令报错。

### 提示“请对准一个动物实体”

检查：

- 准星与动物距离是否超过 `target-distance`。
- 中间是否有墙壁或其他实体方块。
- 目标是否属于 Bukkit `Animals`，怪物、村民和展示实体不属于动物。

### 关闭自动缩放后，旧动物仍然很大

关闭开关只会阻止后续自动处理，不会还原实体已经保存的属性。

加载需要恢复的区块后执行：

```text
/as applyloaded 1
```

也可以逐个对准动物执行：

```text
/as reset
```

### 修改配置后没有变化

执行：

```text
/as reload
```

配置重载只影响之后的操作，不会自动重写现有动物。

### 可以放大怪物或玩家吗

当前版本只接受 Bukkit `Animals`，不会修改玩家、怪物、村民、盔甲架或展示实体。

## 11. Folia、Luminol 与热加载

### 11.1 Folia/Luminol 区域线程支持

版本 `1.1.0` 已声明：

```yaml
folia-supported: true
```

插件不是只修改声明字段，而是使用 Paper、Folia 与 Luminol 共用的区域调度 API：

- GlobalRegionScheduler：收集服务器级实体快照和处理全局回调。
- EntityScheduler：读取或修改动物属性，任务会随实体跨区域移动。
- AsyncScheduler：读取并解析配置文件，避免阻塞区域 Tick。

玩家执行单体指令时，插件先在玩家所属区域完成视线检测，再把属性操作派发到目标
动物自己的 EntityScheduler。操作完成后的消息也会重新派发到玩家所属区域。

批量指令不会在某一个区域直接修改其他区域的动物。它只在全局区域收集快照，然后
为每个动物建立独立实体任务。

`EntitiesLoadEvent` 会处理后续加载区块中的已有动物，兼容 Folia 各区域不同的实体
加载时序。

### 11.2 配置热重载

推荐使用：

```text
/as reload
```

重载流程：

1. 在 AsyncScheduler 读取 `config.yml` 与 `messages.yml`。
2. 完整解析后生成不可变配置快照。
3. 通过一次 `volatile` 替换让所有区域线程看到新配置。
4. 根据执行者类型，把完成消息派发回玩家区域或全局区域。

因此多个 Folia/Luminol 区域可以并行读取配置，不会同时访问正在修改的
`YamlConfiguration`。

### 11.3 插件停用与重新启用

插件执行 `onDisable` 时会：

- 停止接受新的调度任务。
- 取消尚未执行的全局、异步和实体任务。
- 注销本插件的全部事件监听器。
- 清空本次生命周期持有的调度器引用。

重新启用时会重新创建配置快照、调度器、监听器和指令执行器，避免重复监听或旧任务
继续运行。

Paper `1.21.11` 与 `26.1.2` 的 `bukkit:reload confirm` 均通过真实服务器测试，
重载后插件能够继续自动缩放新动物。

Folia `1.21.11` 与 `26.1.2` 均通过单插件热加载测试。测试流程会完整停用旧实例、
注销旧命令映射，然后使用新类加载器从 Jar 创建新插件实例。重新加载后，新生成的牛
仍会自动变为 `3.0x`，`/as reload` 也能继续执行。

Luminol 是 Folia 下游，插件会沿用相同的区域调度路径，并在启动日志显示
`Luminol (Folia)`。版本 `1.1.0` 已使用 Luminol 官方 `1.21.11` API 对全部源码执行
独立构建验证，不引用任何 Luminol 私有实现类。

热插拔工具必须使用上述“新实例 + 新类加载器”流程。直接把已经停用且类加载器已关闭
的旧插件实例再次 `enable` 不是有效热加载方式，后续按需加载类时会失败。

Folia/Luminol 平台不支持服务器级 `bukkit:reload`。实测执行该指令会由 Folia 自身
抛出 `UnsupportedOperationException`，因此请勿在 Folia/Luminol 使用 `/reload` 或
`bukkit:reload confirm`。

日常修改配置请在三个平台都使用 `/as reload`。第三方热插拔工具如果没有正确卸载
旧实例、命令、类加载器或公共运行库，无法由 LiAnimalScale 单方面保证；更新 Jar 时
仍建议正常重启服务器。

## 12. 兼容与依赖

- 基准 API：Paper `1.21.11`，并隔离使用 Paper/Folia/Luminol 共用调度 API。
- 目标平台：Paper/Folia/Luminol `1.21.11+`，兼容 `26.1.2`。
- Java：成品为 Java 21 字节码；`1.21.11` 推荐 Java 21，`26.1+` 使用 Java 25。
- 不使用 NMS。
- 不使用 CraftBukkit 内部类。
- 不使用 NMS 或 CraftBukkit 内部线程接口。
- Vault：软依赖，已预留兼容入口。
- PlaceholderAPI：软依赖，已预留兼容入口。
- Adventure/MiniMessage：运行时库，不打入成品 Jar。
- Folia/Luminol：已声明并完成区域线程适配。

## 13. 构建源码

准备 Java `21` 和 Maven。默认 Paper API 构建：

```powershell
mvn clean package
```

Luminol 官方 API 兼容构建：

```powershell
mvn -Pluminol-compat clean package
```

生成文件：

```text
target/LiAnimalScale-1.1.0.jar
```

成品 Jar 只包含 `cn.lianimalscale` 自身业务类与插件资源，不包含 Paper API 或
第三方公共依赖。

## 14. 技术验证记录

版本 `1.1.0` 已完成以下验证：

- 使用 Java `21` 和 Paper `1.21.11` API 编译成功。
- 使用 Luminol 官方 `1.21.11` API 的独立兼容构建成功。
- Jar 中只包含插件自身业务命名空间。
- Paper `1.21.11` build 132 和 Folia `1.21.11` build 14 真实服务器启动成功。
- MiniMessage 运行库由服务端成功加载。
- Paper：新牛自动 `3.0x`，批量指令改为 `4.0x`。
- Folia：新牛自动 `3.0x`，跨区域批量指令改为 `5.0x`。
- `config.yml` 与 `messages.yml` 成功生成并保留中文注释。
- Paper/Folia 的 `/animalscale reload` 均成功完成异步配置重载。
- Paper 执行 `bukkit:reload confirm` 后插件完整停用、重新启用并继续工作。
- Folia 完整卸载旧实例并通过新类加载器重新加载后，新牛仍为 `3.0x`，配置热重载正常。
- Folia/Luminol 的服务器级 `bukkit:reload` 属于平台不支持操作，不能使用。
- 两个平台均以退出码 `0` 正常停服，最终日志未发现 LiAnimalScale 或线程所有权异常。
