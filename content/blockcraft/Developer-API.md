# 开发者 API

BlockCraft 1.0.13 提供只读祭坛查询 API 和三个 Bukkit 合成事件。

## 添加依赖

把 BlockCraft Jar 作为 `provided`/`compileOnly` 依赖，不要打进你的插件 Jar。

Maven 坐标：

```xml
<dependency>
    <groupId>cn.blockcraft</groupId>
    <artifactId>blockcraft</artifactId>
    <version>1.0.13</version>
    <scope>provided</scope>
</dependency>
```

如果未发布到 Maven 仓库，可先把 Jar 安装到本地仓库或由你的构建仓库托管。

在消费插件的 `plugin.yml` 中声明：

```yaml
depend:
  - BlockCraft
```

## 查询 API

```java
import cn.blockcraft.api.BlockCraftApi;
import cn.blockcraft.api.BlockCraftApiProvider;
import org.bukkit.Location;

BlockCraftApi api = BlockCraftApiProvider.get();
Location core = /* 祭坛核心位置 */;

api.stateAt(core).ifPresent(state ->
        getLogger().info("祭坛状态：" + state)
);

api.altarItem(core).ifPresent(item ->
        getLogger().info("中心物品数量：" + item.getAmount())
);

api.resultItem(core).ifPresent(item ->
        getLogger().info("待领取产物：" + item.getType())
);

api.pedestalItems(core).forEach((slot, item) ->
        getLogger().info("基座 " + slot + "：" + item.getType() + " x" + item.getAmount())
);

api.surroundingItems(core).forEach((slot, item) ->
        getLogger().info("环绕槽 " + slot + "：" + item.getType() + " x" + item.getAmount())
);
```

接口方法：

| 方法 | 返回值 |
| --- | --- |
| `stateAt(Location)` | `Optional<AltarState>`，状态为 `IDLE` 或 `CRAFTING` |
| `pedestalItems(Location)` | 基座槽位编号到 `ItemStack` 的只读副本 |
| `surroundingItems(Location)` | 高级配方环绕槽位编号到 `ItemStack` 的只读副本 |
| `altarItem(Location)` | 中心前置物副本 |
| `resultItem(Location)` | 待领取产物副本 |

`BlockCraftApiProvider.get()` 只能在 BlockCraft 启用后调用。BlockCraft 关闭后 API 实例会注销。

## 合成开始事件

`AltarCraftStartEvent` 在配方和权限验证完成、扣款前触发，可以取消：

```java
@EventHandler
public void onCraftStart(AltarCraftStartEvent event) {
    if (event.getPlayer().getWorld().getName().equals("disabled_world")) {
        event.setCancelled(true);
    }
}
```

可读取：

- `getPlayer()`；
- `getCoreLocation()`；
- `getRecipe()`；
- `isCancelled()` / `setCancelled(boolean)`。

取消开始事件时不会扣费、不会消耗材料，也不会进入计时。

## 合成完成事件

`AltarCraftCompleteEvent` 在材料已经安全扣除、结果已经保存到祭坛后触发：

```java
@EventHandler
public void onCraftComplete(AltarCraftCompleteEvent event) {
    getLogger().info(event.getPlayer().getName()
            + " 合成了 " + event.getRecipe().id());
    ItemStack resultCopy = event.getResult();
}
```

`getResult()` 返回结果副本。修改它不会替换祭坛中已经保存的产物。

## 概率失败事件

`AltarCraftFailEvent` 在成功率判定失败并按配方规则完成材料消耗后触发：

```java
@EventHandler
public void onCraftFail(AltarCraftFailEvent event) {
    getLogger().info(event.getPlayer().getName()
            + " 合成失败：" + event.getRecipe().id());
}
```

普通取消、结构损坏或产物生成失败不会触发 `AltarCraftFailEvent`；该事件只代表一次完成的概率失败结算。

## RecipeDefinition

事件中的 `getRecipe()` 提供：

- ID、显示名称和结构 ID；
- 权限与优先级；
- 持续时间和额外材料规则；
- 费用、成功率和失败规则；
- 附魔继承与匹配规则；
- 配方形式 `mode`；
- 中心物品、基座材料、环绕材料和结果定义。

结构定义中的 `supportGroups()` 返回全部纯结构支持方块组。每组 `StructureSupportDefinition` 包含组 ID、原版/CraftEngine 方块身份和相对坐标；这些方块只参与结构校验，不会出现在 `pedestalItems()` 中。

监听器应执行快速操作。需要访问 Bukkit 世界、实体或背包时，应遵循服务器主线程规则。
