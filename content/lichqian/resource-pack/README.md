# LichQian 抽签像素签资源

这套资源按参考图重做为竖向像素签贴图：红漆尖头、竹纹、墨色符号、吉凶签带、流苏、玉珠、梅枝和破损边。

资源通过 `PAPER` 的 CustomModelData 调用：

| 文件 | 用途 | CustomModelData |
| --- | --- | --- |
| `qian_yinyang.png` | 阴阳签 | `260101` |
| `qian_good_cloud.png` | 吉字云纹签 | `260102` |
| `qian_bad_temple.png` | 凶字庙纹签 | `260103` |
| `qian_lotus_bamboo.png` | 莲竹签 | `260104` |
| `qian_tassel_left.png` | 左流苏签 | `260105` |
| `qian_tassel_jade.png` | 玉珠流苏签 | `260106` |
| `qian_red_good.png` | 红带吉签 | `260107` |
| `qian_black_bad.png` | 黑带凶签 | `260108` |
| `qian_plum.png` | 梅枝破损签 | `260109` |
| `qian_simple_line.png` | 竖纹素签 | `260110` |
| `qian_tassel_symbol.png` | 符纹流苏签 | `260111` |
| `qian_eye_chipped.png` | 眼纹破损签 | `260112` |

贴图路径：

```text
assets/lichqian/textures/item/
```

模型路径：

```text
assets/lichqian/models/item/
assets/minecraft/models/item/paper.json
```

Blockbench 源文件在仓库根目录：

```text
blockbench/
```

当前插件代码只读取 `material`，还没有读取 `custom-model-data` 配置项。要让 GUI 中的 `PAPER` 显示这些签，需要后续给 GUI 物品加 CustomModelData 配置支持。

另外新增了一个单纯 3D 签模型：

| 文件 | 用途 | CustomModelData |
| --- | --- | --- |
| `qian_single_3d` | 单根 3D 抽签签 | `260120` |

这个模型不是平面 PNG 贴图，而是由多个方块元素组成的细长竹签实体，包含红漆尖头、竹节、边缘阴影和少量刻痕。
