# LiPet 插件设计文档

> 文档版本：0.1  
> 插件版本：0.11.0-SNAPSHOT  
> 基准环境：Paper/Folia 1.21.11、26.1.2、Paper 26.2 / Bukkit 标准 API  
> 当前阶段：框架设计，不实现具体宠物玩法

## 1. 项目定位

LiPet 是一个面向 Minecraft 群组服务器的宠物插件。

玩家可以在不同子服务器之间共享自己的宠物数据。宠物在切服、服务器重启或异常掉线后，必须保持等级、经验、属性、技能、背包及状态一致。

设计参考 MyPet 的以下思想：

- API 与实现分离。
- 使用 Repository 隔离存储实现。
- 使用 Manager 组织业务逻辑。
- 宠物能力和技能由配置驱动。
- 为 Vault、PlaceholderAPI 等插件提供独立 Hook。

LiPet 不复制 MyPet 源码，也不直接沿用其集中式主类结构。

## 2. 第一阶段目标

第一阶段只建设可持续开发的工程框架：

- 建立明确的代码分层。
- 定义宠物领域模型。
- 定义持久化接口。
- 定义群组同步接口。
- 建立配置与消息系统。
- 建立主指令和 Tab 补全结构。
- 预留 Vault、PlaceholderAPI Hook。
- 预留运行时依赖下载机制。
- 确定跨服数据一致性方案。

第一阶段不开发：

- 宠物捕捉。
- 宠物召唤与实体生成。
- 宠物战斗。
- 宠物技能。
- 宠物背包。
- 宠物 GUI。
- 宠物交易和商店。

## 3. 核心设计原则

### 3.1 单一职责

每个类只承担一种职责：

- 主类只转发生命周期。
- Bootstrap 只负责组件组装。
- Command 只负责解析输入。
- Listener 只负责接收 Bukkit 事件。
- Manager 只负责业务用例。
- Repository 只负责持久化。
- Sync Gateway 只负责跨服同步。
- Hook 只负责第三方插件适配。

### 3.2 依赖方向

上层可以依赖下层接口，但领域层不得反向依赖 Bukkit 实体或数据库实现。

```text
Bukkit 入口层
    ↓
指令层 / 监听器层
    ↓
业务管理器层
    ↓
领域模型与 API
    ↓
Repository / Cluster Gateway 接口
    ↑
MySQL / Redis 具体实现
```
- 业务逻辑优先使用 Bukkit 标准 API。
- Paper/Folia 调度、骑乘输入等必须依赖高版本 API 的能力统一封装或集中在监听器中，避免散落到业务层。
- 不使用 NMS。
- Paper API 仅作为编译期依赖。
- 如果未来确实需要版本适配，必须放入独立兼容层。

## 4. 代码分层

建议基础包：

```text
cn.lipet.bukkit
```

目录结构：

```text
cn.lipet.bukkit
├─ LiPetPlugin                 插件主类
├─ bootstrap                  启动和关闭编排
├─ api                        对外公开 API
│  ├─ model                   稳定数据模型
│  ├─ repository              存储接口
│  └─ sync                    群组同步接口
├─ command                    主指令执行器与补全器
│  └─ subcommand              独立子指令
├─ config                     配置读取、保存和重载
├─ dependency                 运行时依赖管理
├─ hook                       第三方插件适配
├─ listener                   Bukkit 事件监听器
├─ manager                    业务管理器
├─ repository                 Repository 实现
├─ sync                       群组同步实现
└─ util                       无状态通用工具
```

当公开 API 稳定后，可拆分为：

```text
lipet-parent
├─ lipet-api
├─ lipet-core
├─ lipet-bukkit
└─ lipet-runtime
```

当前阶段采用单模块，避免框架尚未稳定时增加构建复杂度。

## 5. 插件生命周期

### 5.1 启动过程

```text
LiPetPlugin#onEnable
    ↓
加载 config.yml 和 messages.yml
    ↓
检查服务器 ID、群组 ID 和配置合法性
    ↓
检查并加载运行时依赖
    ↓
创建 Repository
    ↓
创建 ClusterSyncGateway
    ↓
创建业务 Manager
    ↓
注册 LiPetApi
    ↓
注册指令与 Tab 补全
    ↓
注册监听器
    ↓
注册 Vault / PlaceholderAPI Hook
    ↓
启动服务器心跳与同步订阅
```

任意关键组件启动失败时：

- 输出明确的中文错误。
- 不直接向用户打印无意义堆栈。
- 安全关闭已启动的组件。
- 禁用 LiPet，防止带病运行。

### 5.2 关闭过程

```text
停止接受新的宠物激活请求
    ↓
冻结当前服务器的活动宠物
    ↓
保存所有待保存状态
    ↓
释放宠物租约
    ↓
停止 Redis 订阅和服务器心跳
    ↓
关闭数据库连接池
    ↓
注销 Hook 和公开 API
```

## 6. 宠物领域模型

宠物数据模型不得直接保存 Bukkit `Entity` 对象。

基础模型建议包含：

```text
PetProfile
├─ petId                 宠物全局 UUID
├─ ownerId               主人 UUID
├─ petType               宠物类型标识
├─ displayName           宠物名称
├─ level                 等级
├─ experience            经验
├─ health                当前生命值
├─ attributes            属性数据
├─ skills                技能数据
├─ inventory             背包数据
├─ state                 持久状态
├─ revision              数据修订号
├─ createdAt             创建时间
└─ updatedAt             更新时间
```

宠物状态建议定义为：

```text
STORED       已存放，不生成实体
ACTIVE       已在某台服务器激活
TRANSFERRING 正在切服
DEAD         已死亡，等待复活
DISABLED     被管理员禁用
```

运行时实体与持久数据分离：

```text
PetProfile       可存储、可跨服
PetSession       当前服务器内的活动会话
Bukkit Entity    游戏世界中的实际实体
```

## 7. Repository 设计

核心层只依赖 `PetRepository` 接口。

主要职责：

- 按宠物 UUID 查询。
- 按主人 UUID 查询宠物列表。
- 新增宠物。
- 更新宠物。
- 删除宠物。
- 使用 revision 进行乐观锁校验。

所有数据库操作必须异步执行，禁止阻塞 Bukkit 主线程。

建议实现：

```text
PetRepository
├─ InMemoryPetRepository    测试和框架验证
└─ MySqlPetRepository       生产环境
```

SQLite 仅适合单服开发和测试，不用于群组服共享数据。

## 8. 群组互通设计

### 8.1 组件职责

群组互通由 MySQL 和 Redis 共同完成：

| 组件 | 职责 |
|---|---|
| MySQL | 保存宠物权威数据 |
| Redis | 消息通知、缓存失效、服务器心跳、宠物租约 |
| Bukkit 子服 | 维护当前服务器的宠物实体和会话 |

Redis 不作为宠物永久数据源。

### 8.2 宠物租约

同一只宠物不能同时在两台服务器生成。

Redis 中为活动宠物建立带 TTL 的租约：

```text
lipet:{group}:lease:{petId} = serverId
```

激活宠物前：

1. 子服尝试原子获取租约。
2. 获取成功后读取 MySQL 最新数据。
3. 在 Bukkit 主线程生成实体。
4. 定期续租。

获取失败时，说明宠物已在其他服务器活动。

### 8.3 玩家切服流程

```text
源服务器
    ↓
将宠物状态改为 TRANSFERRING
    ↓
移除宠物实体
    ↓
保存数据并增加 revision
    ↓
发布 PET_DEACTIVATED
    ↓
释放租约

目标服务器
    ↓
等待玩家加入
    ↓
获取宠物租约
    ↓
从 MySQL 读取最新 revision
    ↓
创建 PetSession
    ↓
在主线程生成宠物实体
    ↓
发布 PET_ACTIVATED
```

### 8.4 异常宕机恢复

租约必须带 TTL。

如果源服务器异常关闭：

- Redis 租约在 TTL 到期后自动失效。
- 目标服务器不能立即强制抢占，避免短暂网络抖动造成双实例。
- 租约到期后重新读取 MySQL 最新数据。
- 管理员可以使用恢复指令清理异常状态。

### 8.5 数据冲突

每条宠物记录包含 `revision`。

保存时执行：

```sql
UPDATE lipet_pet
SET data = ?, revision = revision + 1
WHERE pet_id = ? AND revision = ?
```

更新行数为零时表示版本冲突。

发生冲突后不得直接覆盖，应：

1. 丢弃当前旧快照。
2. 重新读取数据库数据。
3. 根据业务类型决定重试或终止。
4. 记录中文警告日志。

## 9. Redis 消息模型

建议统一消息结构：

```json
{
  "messageId": "UUID",
  "groupId": "main",
  "sourceServerId": "survival-1",
  "petId": "UUID",
  "eventType": "PET_UPDATED",
  "revision": 12,
  "createdAt": "2026-06-18T10:00:00Z"
}
```

事件类型：

- `PET_UPDATED`
- `PET_ACTIVATED`
- `PET_DEACTIVATED`
- `PET_DELETED`
- `CACHE_INVALIDATED`
- `SERVER_SHUTTING_DOWN`

消费者必须根据 `messageId` 去重，并忽略来自自己的重复消息。

## 10. 数据库设计草案

### 10.1 宠物主表

```sql
CREATE TABLE lipet_pet (
    pet_id CHAR(36) PRIMARY KEY,
    owner_id CHAR(36) NOT NULL,
    pet_type VARCHAR(64) NOT NULL,
    display_name VARCHAR(128) NOT NULL,
    level INT NOT NULL,
    experience BIGINT NOT NULL,
    state VARCHAR(32) NOT NULL,
    data_json JSON NOT NULL,
    revision BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    INDEX idx_lipet_pet_owner (owner_id)
);
```

### 10.2 服务器状态表

Redis 是服务器心跳的首选实现。MySQL 可额外保存服务器最后一次正常关闭记录，用于审计，不依赖该表进行实时在线判断。

### 10.3 数据迁移

数据库结构必须有版本：

```text
lipet_schema_history
├─ version
├─ description
├─ checksum
└─ installed_at
```

插件升级时只允许向前迁移，不在启动时执行破坏性降级。

## 11. 指令设计

主指令：

```text
/lipet
```

框架阶段：

```text
/lipet status
/lipet reload
```

后续规划：

```text
/lipet call [宠物]
/lipet store
/lipet list
/lipet info [宠物]
/lipet rename <名称>
/lipet skill
/lipet admin recover <玩家>
/lipet admin unlock <宠物UUID>
/lipet admin migrate
```

每个子指令必须：

- 使用独立执行类。
- 提供独立参数补全。
- 声明明确权限。
- 通过统一工具检查玩家或控制台身份。
- 不在代码中硬编码用户消息。

## 12. 配置文件设计

基础配置：

```text
config.yml       服务器、存储、Redis、依赖配置
messages.yml     所有用户消息
pet-types.yml    宠物类型
attributes.yml   属性规则
skills.yml       技能定义
levels.yml       等级和经验
```

要求：

- 每个配置项带完整中文注释。
- 配置类封装读取、保存、验证和重载。
- 配置加载后转换成不可变配置对象。
- 业务代码不直接调用 `getConfig()`。
- 非法配置必须指出具体路径和合法范围。

## 13. 文本系统

所有消息使用 MiniMessage。

支持：

- RGB 颜色。
- 多色渐变。
- 粗体、斜体和下划线。
- 悬浮提示。
- 点击事件。
- 统一前缀。
- 安全占位符替换。

固定快捷渐变示例：

```text
紫蓝渐变：#7C4DFF → #40C4FF
生命渐变：#FF5252 → #FFAB40
自然渐变：#69F0AE → #00BFA5
```

玩家名称、宠物名称等外部文本必须转义，不能直接拼接为 MiniMessage 标签。

## 14. 运行时依赖

外部公共依赖不打入 LiPet Jar。

运行时依赖统一存放：

```text
plugins/LiPet/lib/
```

依赖管理器负责：

- 检测类是否已由服务器提供。
- 根据固定 URL 下载依赖。
- 校验 SHA-256。
- 使用隔离类加载器加载。
- 输出中文缺失提示。
- 下载失败时安全停止对应功能。

规划依赖：

- MySQL Connector/J。
- HikariCP 或自研轻量连接管理适配。
- Redis 客户端。
- MiniMessage 仅在服务器未提供时处理。

依赖版本和哈希必须固定，不能每次启动自动选择最新版。

## 15. 第三方插件适配

### Vault

用途：

- 宠物购买费用。
- 复活费用。
- 技能升级费用。

Vault 缺失时，经济功能关闭，但基础宠物功能可以继续运行。

### PlaceholderAPI

预留变量：

```text
%lipet_active_name%
%lipet_active_level%
%lipet_active_health%
%lipet_pet_count%
%lipet_server_id%
```

核心业务不得直接依赖 PlaceholderAPI 类型。

## 16. 线程模型

Bukkit 主线程执行：

- 创建和移除实体。
- 修改实体属性。
- 操作背包界面。
- 发送 Bukkit 事件。

异步线程执行：

- MySQL 查询与保存。
- Redis 发布和订阅。
- 依赖下载。
- 数据序列化。

异步结果返回后，涉及 Bukkit API 的操作必须切回主线程。

禁止：

- 在主线程等待 `CompletableFuture#get()`。
- 在 Redis 回调线程直接操作实体。
- 多线程同时修改同一个 `PetSession`。

## 17. 错误处理与日志

日志格式建议：

```text
[LiPet] [模块] 中文说明 | context=value
```

示例：

```text
[LiPet] [Storage] 宠物数据保存失败 | petId=... ownerId=...
[LiPet] [Cluster] 宠物租约获取失败 | petId=... holder=survival-2
```

普通配置错误和依赖缺失不直接输出完整堆栈。

调试模式开启时，可以把详细异常写入独立日志文件。

## 18. 安全与可靠性

- 所有 SQL 使用预编译参数。
- Redis Key 必须带群组命名空间。
- 下载依赖必须校验 SHA-256。
- 宠物名称和配置文本必须进行 MiniMessage 转义。
- 管理指令必须有独立权限。
- 删除和强制解锁操作必须记录审计日志。
- 服务器 ID 在同一群组内必须唯一。

## 19. 测试策略

### 单元测试

- 宠物状态转换。
- revision 冲突。
- 配置验证。
- 消息占位符转义。
- 租约状态判断。

### 集成测试

- MySQL Repository 增删改查。
- Redis 租约原子性。
- Redis 消息去重。
- 数据库迁移。

### 群组场景测试

- 玩家正常切服。
- 源服务器切服过程中崩溃。
- Redis 短暂断线。
- MySQL 短暂断线。
- 两台服务器同时召唤同一宠物。
- 旧 revision 尝试覆盖新数据。

## 20. 开发里程碑

### M0：工程框架

- 分层目录。
- Bukkit 主类。
- Bootstrap。
- 配置和消息系统。
- Repository 和 Cluster Gateway 接口。
- 指令框架。
- Hook 模板。

### M1：基础设施

- 运行时依赖下载与类加载。
- MySQL Repository。
- 数据库迁移器。
- Redis Gateway。
- 心跳与租约。

### M2：宠物生命周期

- 宠物创建。
- 宠物存放。
- 宠物召唤。
- 实体移除。
- 玩家上线和离线处理。
- 群组切服状态机。

### M3：宠物成长

- 属性系统。
- 等级和经验。
- 技能框架。
- 配置驱动宠物类型。

### M4：扩展功能

- 宠物背包。
- GUI。
- Vault。
- PlaceholderAPI。
- 管理工具。

### M5：稳定性

- 压力测试。
- 故障恢复测试。
- 数据迁移测试。
- API 文档。
- 正式版发布。

## 21. 暂定技术决策

| 项目 | 决策 |
|---|---|
| 构建工具 | Maven |
| 插件形态 | 第一阶段单 Jar |
| 编译目标 | Java 21 字节码；Paper 26.1.2 / 26.2 运行端推荐 Java 25 |
| 服务端基准 | Paper/Folia 1.21.11、26.1.2、Paper 26.2 |
| Bukkit API | 只使用标准兼容接口 |
| 权威存储 | MySQL |
| 群组同步 | Redis |
| 并发控制 | Redis 租约 + MySQL revision |
| 文本格式 | MiniMessage |
| 默认测试存储 | 内存 Repository |
| 第三方依赖 | 运行时下载，不打入插件 Jar |

## 22. 当前结论

LiPet 的核心不是先实现宠物实体，而是先保证：

1. 数据模型不依赖具体服务器。
2. 同一宠物不会跨服重复激活。
3. 旧服务器数据不会覆盖新服务器数据。
4. 数据库和 Redis 故障不会阻塞 Bukkit 主线程。
5. 后续技能、背包、经济和 GUI 可以通过独立模块扩展。

在 MySQL Repository、Redis 租约和玩家切服状态机完成前，不应开始大规模开发宠物玩法。
