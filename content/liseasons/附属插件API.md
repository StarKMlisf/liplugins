# 附属插件 API

LISeasons 通过 Bukkit `ServicesManager` 注册只读接口 `com.liseasons.api.LISeasonsApi`。

## 附属声明

如果你的插件必须依赖 LISeasons：

```yaml
depend: [LISeasons]
```

如果只是可选支持：

```yaml
softdepend: [LISeasons]
```

编译时将 LISeasons Jar 以 `compileOnly`/`provided` 方式加入，不要把 LISeasons 打进你的成品 Jar。

## 获取服务

```java
import com.liseasons.api.LISeasonsApi;
import com.liseasons.api.SeasonCalendarSnapshot;
import org.bukkit.Bukkit;
import org.bukkit.World;
import org.bukkit.plugin.RegisteredServiceProvider;

RegisteredServiceProvider<LISeasonsApi> registration =
        Bukkit.getServicesManager().getRegistration(LISeasonsApi.class);

if (registration == null) {
    // LISeasons 未安装、未启用，或 API 尚未注册。
    return;
}

LISeasonsApi api = registration.getProvider();
World world = Bukkit.getWorld("world");

api.calendar(world).ifPresent(snapshot -> {
    System.out.println(snapshot.date());
    System.out.println(snapshot.seasonKey());
    System.out.println(snapshot.seasonName());
    System.out.println(snapshot.solarTermKey());
    System.out.println(snapshot.solarTermName());
});
```

## 返回模型

```java
public record SeasonCalendarSnapshot(
        LocalDate date,
        String seasonKey,
        String seasonName,
        String solarTermKey,
        String solarTermName
) {}
```

`calendar(World)` 返回 `Optional.empty()` 的情况：

- `world` 为 `null`；
- LISeasons 的季节管理器尚未可用；
- 该世界没有启用季节系统。

返回的是不可变快照，不会把内部可变状态交给附属插件。

## 线程要求

API 在生成快照时会读取世界日期上下文。普通 Paper 应在主线程调用；Folia 应在目标世界正确的区域/全局上下文调用。不要从任意异步数据库、HTTP 或记分板线程直接访问 Bukkit `World`。

若只需玩家展示文本，优先使用 LISeasons 的 PlaceholderAPI 变量，因为它们读取预生成快照，已经为异步记分板场景做了隔离。

## Maven 本地 Jar 示例

如果项目没有远程仓库坐标，可把 LISeasons Jar 放入附属项目 `lib/`：

```xml
<dependency>
  <groupId>com.liseasons</groupId>
  <artifactId>LISeasons</artifactId>
  <version>1.0.61</version>
  <scope>system</scope>
  <systemPath>${project.basedir}/lib/LISeasons-1.0.61.jar</systemPath>
</dependency>
```

更规范的团队构建可以先把 Jar 安装到私有 Maven 仓库或本机 Maven 仓库，再使用 `provided`。

## Gradle 示例

```kotlin
dependencies {
    compileOnly(files("lib/LISeasons-1.0.61.jar"))
}
```

## API 稳定性

1.0.61 的公开面刻意保持很小：只提供日历快照读取，没有季节写入、事件强制触发或内部管理器暴露。附属插件不要反射 `com.liseasons.internal` 或 NMS 实现类。

[返回首页](Home.md)
