# API 自定义附魔

[返回首页](./Home.md)

## 工作方式

Paper 的真实附魔 Registry 在普通插件启用前冻结，因此定义与行为分为两个阶段：

1. 扩展第一次启动，通过 API 把 YAML 安装到 `plugins/LiRealEnchant2/enchants/addons/<扩展名>/`。
2. 完整重启服务器，LiRealEnchant2 在 Bootstrap 阶段注册真实附魔。
3. 扩展在 `onEnable()` 中注册 Java 行为。

如果管理员预先放好 YAML，则只需要一次正常启动。插件更新不会覆盖已经安装的扩展定义。

## 编译依赖

构建主项目后，将 `LiRealEnchantAPI-2.0.0-dev199.jar` 放入扩展项目的 `libs/`，只作为编译依赖：

```kotlin
dependencies {
    compileOnly(files("libs/LiRealEnchantAPI-2.0.0-dev199.jar"))
    compileOnly("io.papermc.paper:paper-api:26.1.2.build.+")
}
```

扩展不能把 API Jar 打进自己的成品 Jar。运行时由 LiRealEnchant2 提供 API 类。

## 插件依赖

扩展的 `paper-plugin.yml`：

```yaml
dependencies:
  server:
    LiRealEnchant2:
      load: BEFORE
      required: true
      join-classpath: true
```

## 安装定义

扩展 Jar 内放置 `enchants/my_enchant.yml`，并在主类中安装：

```java
LiRealEnchantApi api = LiRealEnchantApi.get();
DefinitionInstallResult result = api.installDefinition(this, "enchants/my_enchant.yml");
if (!result.ready()) {
    getLogger().warning(result.message());
    return;
}
```

定义必须包含：

```yaml
id: my_enchant
namespace: yunmengze
implementation: api
enabled: true
display-name: "&b我的附魔"
description: "这是玩家看到的说明。"
type: normal
rarity: rare
max-level: 3
tradeable: true
discoverable: true
enchantable: true
targets:
  - weapon
conflicts:
  - sharpness
mechanics:
  provider: api
  trigger: "攻击命中"
  chance-per-level: "{10 * %level%}%"
  cooldown-seconds: 0
  value-placeholder: "追加 {%level%} 点伤害"
  duration: "瞬时"
  particles: "由扩展实现"
  sound: "由扩展实现"
```

API v1 的 namespace 固定为 `yunmengze`。ID 必须全服唯一，只能使用 2-64 位小写字母、数字和下划线。

定义安装器会拒绝 122 个内置附魔 ID；行为注册层还会再次校验，因此扩展不能替换或叠加内置机制。已有同 ID 的 API 定义会被复用，不会生成第二份配置。

如果定义文件存在但扩展没有成功注册行为，LiRealEnchant2 会输出一次警告，并停止该附魔进入附魔台、村民和战利品，避免玩家获得没有效果的附魔。

## 注册行为

```java
NamespacedKey key = new NamespacedKey("yunmengze", result.enchantId());
LiEnchantRegistration registration = api.registerBehavior(this, key, new LiEnchantBehavior() {
    @Override
    public void onAttack(AttackContext context) {
        int level = context.activation().level();
        context.event().setDamage(context.event().getDamage() + level);
    }
});
```

可覆盖的回调：

| 回调 | 触发位置 |
|---|---|
| `onAttack` | 近战或已记录的弹射物造成伤害 |
| `onDefend` | 玩家穿戴或持有附魔物品时受击 |
| `onBlockBreak` | 主手工具破坏方块 |
| `onInteract` | 主手或副手交互 |
| `onShoot` | 弓、弩等发射弹射物 |
| `onProjectileHit` | 记录过的弹射物命中实体或方块 |

上下文提供原始 Bukkit 事件、玩家、附魔键、等级、物品和装备槽。修改伤害时优先修改当前事件，不要在伤害回调中反复调用 `damage()`。

## 常用接口

```java
api.enchantment(key);                  // 查询 Registry 附魔
api.definition(key);                   // 查询定义资料
api.level(item, key);                  // 读取物品等级
api.storedLevel(book, key);            // 读取附魔书等级
api.behaviorRegistered(key);           // 检查行为是否已经绑定
api.createBook(key, 2);                // 生成真实附魔书
api.apply(player, item, key, 2);       // 校验目标、冲突、槽位后附魔
api.refreshLore(item);                 // 刷新 LiReal 管理的 Lore
api.breakNaturally(player, block, tool); // 经领地保护事件破坏附带方块
```

`apply` 返回结构化状态，不会绕过最高等级、适用物品、冲突或附魔槽。需要管理员强制写入时，应由扩展自行明确实现权限和风险。

## Folia 与安全

- 回调在原始 Bukkit 事件所在的线程和区域执行。
- 不要把玩家、实体、方块操作直接扔到异步线程。
- 延迟操作使用实体调度器或区域调度器，并在执行前重新检查实体和方块状态。
- 范围挖掘必须调用 `api.breakNaturally(...)`，不要直接 `setType(AIR)`，否则会绕过 Residence、Dominion、Lands 等保护插件。
- API 会阻止同一附魔、同一触发类型的同步重入；扩展仍需自行管理冷却、概率和长期缓存。

完整代码随开发包中的 `LiRealEnchantExampleAddon-1.0.0.jar` 和 `example-addon/` 示例源码提供；正式服不要安装示例插件。
