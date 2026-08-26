# 插件联动与稳定 API

软依赖、Maven/Gradle、物品精确 ID、CraftEngineReloadEvent 和线程边界。

## 只使用稳定 API

CraftEngine 官方明确说明：`net.momirealms.craftengine.bukkit.api` 下的接口属于稳定 API 范围；内部实现包可能在测试阶段变化。插件不应直接依赖内部 manager、NMS proxy 或实现类完成日常物品识别。

官方 Maven 仓库：

```text
https://repo.momirealms.net/releases/
```

Gradle Kotlin DSL：

```kotlin
repositories {
    maven("https://repo.momirealms.net/releases/")
}

dependencies {
    compileOnly("net.momirealms:craft-engine-core:${craftengineVersion}")
    compileOnly("net.momirealms:craft-engine-bukkit:${craftengineVersion}")
}
```

Maven：

```xml
<repository>
    <id>momirealms-repo</id>
    <url>https://repo.momirealms.net/releases/</url>
</repository>

<dependency>
    <groupId>net.momirealms</groupId>
    <artifactId>craft-engine-bukkit</artifactId>
    <version>${craftengine.version}</version>
    <scope>provided</scope>
</dependency>
```

版本应与服务器安装的稳定版本一致。依赖使用 `compileOnly`/`provided`，不要把 CraftEngine 打入自己的插件 Jar。

## 声明软依赖

CraftEngine 为可选功能时：

```yaml
softdepend:
  - CraftEngine
```

启动时先检查插件是否存在且已启用。未安装时应关闭 CE 功能并输出清楚提示，不能让整个插件启动失败。

若你的插件核心功能完全依赖 CraftEngine，可以改为必需依赖，但仍应给出友好的中文缺失说明。

## 精确识别 CE 物品

不要只检查 Bukkit `Material`。多个 CE 物品可能共享同一原版底材，原版物品也可能使用相同底材。

```java
import net.momirealms.craftengine.bukkit.api.CraftEngineItems;
import org.bukkit.inventory.ItemStack;

public String customItemId(ItemStack itemStack) {
    var id = CraftEngineItems.getCustomItemId(itemStack);
    return id == null ? null : id.asString();
}
```

返回值示例：

```text
tutorial:ruby
default:topaz_pickaxe
```

若返回 `null`，该物品不是已识别的 CraftEngine 自定义物品。扣除物品前应再次确认当前手中物品的完整 ID，避免玩家在异步操作期间换手导致误扣。

## 读取已加载注册表的时机

不要在自己插件的 `onEnable` 中假设 `CraftEngineItems.loadedItems()` 已完整。官方 API 注释要求监听：

```java
import net.momirealms.craftengine.bukkit.api.CraftEngineItems;
import net.momirealms.craftengine.bukkit.api.event.CraftEngineReloadEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public final class CraftEngineReloadListener implements Listener {
    @EventHandler
    public void onCraftEngineReload(CraftEngineReloadEvent event) {
        var currentItems = CraftEngineItems.loadedItems();
        // 在这里刷新自己的 ID 缓存或重新校验配置。
    }
}
```

同类规则也适用于已加载方块、家具和图片。插件应在 CE 内容重载后重建缓存，而不是要求服主再手动重载一次你的插件。

## 线程边界

- Bukkit `ItemStack`、实体、世界和区块访问应留在允许的服务器线程/区域线程。
- 数据库或网络线程只处理不可变 ID、数值和序列化数据。
- Folia 上不要从全局调度器直接读写实体；使用实体或区域调度器。
- CE 重载事件中若要做重任务，先同步提取必要的不可变信息，再把纯计算移到后台。

## 配置兼容

支持 CE ID 的配置建议写成：

```yaml
food:
  item-id: "tutorial:ruby"
  experience: 20
```

若 YAML 路径本身可能把 `.` 当作层级分隔符，应把完整 ID 放在独立值中，不要强迫管理员把所有 ID 直接作为节点名。

升级配置时只补充缺失节点，不覆盖管理员已经修改的 CE ID、注释和数值。

## 兼容性测试

```text
[ ] CraftEngine 未安装时插件仍能按设计启动
[ ] CraftEngine 安装后能识别完整 ID
[ ] 同底材的两个 CE 物品不会互相匹配
[ ] 同底材原版物品不会被误识别
[ ] /ce reload all 后缓存自动刷新
[ ] 玩家换手或物品数量变化时不会误扣
[ ] Paper 与 Folia 的线程检查没有报错
```

官方参考：[CraftEngine API](https://xiao-momi.github.io/craft-engine-wiki/api/) 与 [稳定 Bukkit API 源码](https://github.com/Xiao-MoMi/craft-engine/tree/main/bukkit/src/main/java/net/momirealms/craftengine/bukkit/api)。
