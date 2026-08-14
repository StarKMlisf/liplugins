# LiPet 功能平台规划

## 已纳入的目标

- MySQL 群组存储与 SQLite 单服存储。
- 99% 配置化 GUI。
- 原生实体、ModelEngine、CraftEngine 模型提供器。
- MiniMessage 与 RGB 宠物名称。
- 被动药水、攻击、防御、跳跃、飞行、火球、定时命令等能力。
- 宠物商城、仓库、升级、物品、箱子抽取和玩家交易。
- 内置货币、Vault 和 PlayerCurrency 多货币。
- 权限自动发放与权限失效回收。
- PlaceholderAPI 变量。
- 全量数据自动备份。

## 模块边界

```text
catalog     宠物商品定义和上架规则
warehouse   玩家拥有的宠物和仓库容量
currency    内置/Vault/PlayerCurrency 统一交易接口
ability     触发器、冷却、概率和能力执行器
model       Native/ModelEngine/CraftEngine 模型适配
gui         配置化页面、元素和动作
crate       宠物箱和权重随机
trade       玩家交易会话与双向确认
backup      SQLite/MySQL 全量备份与保留策略
```

## 模型配置

每个宠物类型使用统一模型配置：

```yaml
model:
  provider: "MODEL_ENGINE"
  id: "dragon_pet"
```

`NATIVE` 不需要模型 ID。ModelEngine 通过反射适配，API 不打入 LiPet。
CraftEngine 使用独立 Provider，待根据目标服务端安装版本完成实服适配。

## 能力设计

能力通过触发器组合，而不是写死在宠物类中：

- `PASSIVE`：持续药水效果。
- `OWNER_ATTACK`：主人攻击时触发。
- `OWNER_DEFEND`：主人受伤时触发。
- `PET_ATTACK`：宠物攻击时触发。
- `PET_DEFEND`：宠物受伤时触发。
- `INTERACT`：玩家主动交互。
- `INTERVAL`：按周期执行。

每项能力统一支持：

```text
chance       触发概率
cooldown     冷却时间
conditions   世界、权限、目标类型等条件
actions      药水、伤害、位移、火球、飞行、命令等动作
```

## 实施顺序

1. SQLite Repository 与存储迁移。
2. ModelEngine 实服适配和模型配置。
3. 宠物目录、仓库及数据库表。
4. 内置货币与统一多货币接口。
5. 配置化 GUI 和商城。
6. 能力触发器及预装能力。
7. 升级、宠物物品和权限宠物。
8. 宠物箱与玩家交易。
9. 自动备份和恢复验证。
10. CraftEngine 目标版本适配。
