# 安装与更新

## 安装要求

BlockCraft 1.0.13 需要：

- Paper 26.2 或 Folia 1.21.11；
- Java 25；
- 对服务器 `plugins` 目录的写入权限。

说明：兼容 Paper/Folia。Folia 运行时会优先走全局调度兼容层，建议先在测试服验证复杂高级配方时序。

BlockCraft 本体没有强制前置。以下插件只在使用对应功能时安装：

| 功能 | 可选前置 | 未安装时的行为 |
| --- | --- | --- |
| MMOItems 物品 | MMOItems、MythicLib | `MMOITEMS` 配方不可匹配或生成 |
| CraftEngine 物品和方块 | CraftEngine 26.7.x | `CRAFTENGINE` 配方和结构不可用 |
| CustomFishing 物品 | CustomFishing 2.3.x | `CUSTOMFISHING` 配方不可匹配或生成 |
| 金币费用 | Vault、经济插件 | `VAULT` 配方拒绝启动，不会误扣材料 |
| 点券费用 | PlaceholderAPI、点券插件 | `POINTS` 配方拒绝启动，不会误扣材料 |
| 等级费用 | 无 | `XP` 直接使用 Bukkit 玩家经验等级 |

## 首次安装

1. 关闭服务器。
2. 把 `BlockCraft-1.0.13.jar` 放入服务器的 `plugins` 目录。
3. 按需安装上表中的软依赖。
4. 启动服务器并等待控制台出现 `BlockCraft 1.0.13 已启用`。
5. 插件会生成默认配置和示例配方。
6. 修改配置后执行 `/blockcraft reload`。

首次启动后的目录结构：

```text
plugins/BlockCraft/
├─ config.yml
├─ structures.yml
├─ preview.yml
├─ messages.yml
├─ data.yml
└─ recipes/
   ├─ nature_crystal.yml
   └─ custom_items_example.yml
```

`data.yml` 保存祭坛中心、基座、环绕槽和待领取成品的真实 `ItemStack`，不建议手动修改。

## 验证前置挂钩

启动日志会分别显示挂钩状态，例如：

```text
CraftEngine 物品与方块挂钩已启用。
CustomFishing 物品挂钩已启用。
```

管理员也可以使用以下指令验证物品生成：

```text
/blockcraft give <玩家> mmoitems <类型> <ID> [数量]
/blockcraft give <玩家> craftengine <命名空间:ID> [数量]
/blockcraft give <玩家> customfishing <物品ID> [数量]
```

## 更新插件

1. 关闭服务器并备份 `plugins/BlockCraft`。
2. 替换旧 Jar。
3. 启动服务器。
4. 检查控制台中的配置和配方加载结果。

普通 YAML 配置升级时只补充缺失节点，不覆盖已有自定义值。旧版单文件 `recipes.yml` 会复制为 `recipes/legacy.yml`，原文件保留作为备份。

## 卸载

先让玩家取走祭坛中心、基座、环绕槽中的物品和待领取产物，再关闭服务器并移走 BlockCraft Jar。若要彻底删除数据，请先备份后再处理 `plugins/BlockCraft` 目录。
