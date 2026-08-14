# LiPet 架构设计

## 1. 参考范围

LiPet 参考 MyPet 的 API/实现分离、Repository 抽象、管理器、技能树配置和 Hook 机制，但不复制其代码。MyPet 使用 `api`、`plugin`、`skills` 和版本适配模块；LiPet 第一阶段采用单 Jar、分层包结构，降低部署复杂度，同时保留未来拆分独立 API 模块的边界。

## 2. 分层

```text
LiPetPlugin（主类）
  └─ PluginBootstrap（启动编排）
      ├─ config       配置读取、保存、重载
      ├─ dependency   lib/ 依赖下载与缺失检测
      ├─ repository   宠物持久化接口
      ├─ sync         群组事件与租约接口
      ├─ manager      业务用例编排
      ├─ listener     Bukkit 事件入口
      ├─ command      指令执行与 Tab 补全
      ├─ hook         Vault/PAPI 可选适配
      ├─ api          对其他插件公开的稳定接口
      └─ util         无状态通用工具
```

## 3. 群组互通模型

权威状态存储与跨服通知必须分离：

- MySQL：宠物档案、主人关系、等级、技能、背包、版本号。
- Redis：宠物上线/下线通知、缓存失效、服务器心跳、宠物短租约。
- Bukkit/Paper 实体区域线程：只创建、读取和移除对应实体；数据库和网络操作必须异步。
- `revision`：每次保存递增，使用乐观锁拒绝旧数据覆盖新数据。
- `PetOperationCoordinator`：同一玩家的召回、收回、成长、改名和放生严格串行，避免 revision 交叉覆盖。
- `leaseOwner`：同一宠物同一时刻只允许一个服务器激活。
- 玩家切服：源服先读取实体状态并保存，成功后才移除实体和释放租约；目标服获取租约后加载。
- 异常宕机：租约带 TTL；`PetOrphanCleanupService` 会在启动和区块实体加载时清理未绑定的遗留实体。

不建议只依赖 Redis Pub/Sub 保存宠物数据，因为消息不会持久化；也不建议让每台服务器直接长期缓存完整宠物对象而没有 revision 校验。

## 4. 核心接口

- `PetRepository`：持久化端口，不暴露 JDBC、Redis 或 MongoDB 类型。
- `ClusterSyncGateway`：发布跨服事件和获取宠物租约。
- `PetManager`：宠物加载、保存、激活等业务用例入口。
- `PetOperationCoordinator`：按玩家串行化所有会修改宠物档案的操作。
- `PetOrphanCleanupService`：负责世界存档中的宠物实体对账与清理。
- `LiPetApi`：其他插件访问 LiPet 的稳定入口。

## 5. 后续迭代顺序

1. 完成运行时依赖类加载器和 SHA-256 校验。
2. 实现 MySQL Repository、Flyway 风格迁移器和连接池适配。
3. 实现 Redis 同步、服务器心跳和宠物租约。
4. 完成玩家切服状态机及故障恢复测试。
5. 再开发宠物类型、实体生命周期、属性与技能系统。
6. 最后加入 Vault、PlaceholderAPI、菜单和管理指令。
