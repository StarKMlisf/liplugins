# LIEMC build.106 更新说明

适用版本：`0.1.0+build.106`

本次更新修复 build.105 在部分 MySQL 8.0 数据库上的启动失败，并让全局商品 Lore 正确保留空白分隔行及单项内的多行内容。

## MySQL 8.0 数据库迁移兼容

build.105 为 `liemc_shop_items.description_lore` 创建 `TEXT NOT NULL DEFAULT ''` 字段。部分 MySQL 8.0 环境会拒绝这种普通字符串默认值，随后 LIEMC 因数据库初始化失败而停用，控制台可见：

```text
BLOB, TEXT, GEOMETRY or JSON column 'description_lore' can't have a default value
```

build.106 的修复：

- 新建 MySQL 商品表时，`description_lore` 不再声明默认值。
- 旧表升级时先新增可空字段，再把已有记录回填为空字符串，最后改为 `NOT NULL`。
- 每次启动都会读取字段当前状态，可从 build.105 留下的半迁移状态继续执行。
- 多台子服几乎同时启动时，重复新增字段不会再导致其余迁移步骤中断。
- SQLite 仍使用适合 SQLite 的字段定义，不受 MySQL 分支影响。

不需要删除商品表，也不需要丢弃已有 EMC、解锁、收藏或商品数据。

## 全局商品 Lore 多行与空白分隔

`config.yml` 的 `item-display.default-lore` 现在支持两种多行写法：

```yml
item-display:
  default-lore:
    # 空字符串或只含空格的列表项会保留为空白分隔行。
    - ""
    - "&7价格：&e{emc} 点 EMC"
    - "&7状态：&f{favorite}"
    - " "
    # 一个列表项中的 \n 会拆成两行。
    - '&a左键获取：&f{left_amount} 个\n&6右键获取：&f{right_amount} 个'
    - "&dShift+点击：&f{favorite_action}"
```

规则：

- `- ""` 与 `- " "` 都会在客户端 Lore 中占用一行，适合分隔价格、状态和操作提示。
- 单项内的 `\n` 会依次展开为多行，并逐行解析 `&` 颜色、RGB、MiniMessage 和变量。
- `description-lore` 仍作为单商品专属前缀，后面继续拼接全局模板。
- 任意非空的单商品 `lore` 仍表示完整覆盖；省略或填写 `lore: []` 才会继承全局模板。

修改后执行 `/emc reload`，关闭旧菜单并重新打开即可查看新 Lore。

## 从 build.105 升级

1. 停服并备份数据库与 `plugins/LIEMC/`。
2. 替换为 `LIEMC-0.1.0+build.106.jar`，保留原来的 `config.yml`、`gui.yml`、`lang.yml` 和数据库表。
3. 多子服环境先启动一台，确认 LIEMC 正常启用且迁移日志无异常，再启动其余子服。
4. 执行 `/emc reload`，重新打开获取、搜索和收藏菜单检查 Lore。
5. 验证原有 EMC 余额、解锁、收藏与跨服商品均未变化。

如果 build.105 已启动失败，不要删除 `description_lore` 或整张 `liemc_shop_items` 表；直接使用 build.106 重启即可让迁移按当前状态继续。
