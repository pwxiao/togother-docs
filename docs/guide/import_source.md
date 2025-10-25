# 导入视频源

"一起看"应用支持添加CMS视频源，本文档提供了一些推荐的视频源配置，您可以直接复制添加到应用中。

## 方式一：URL导入
1. 打开应用中的「订阅源管理」界面



![](/assets/imgs/1.jpg){width=200}





2. **复制粘贴**以下订阅源地址：[https://docs.autooj.cn/assets/source.json](https://docs.autooj.cn/assets/source.json)
3. 点击「导入」按钮完成操作

---

## 方式二：手动粘贴JSON
1. 点击「粘贴JSON」选项

![](/assets/imgs/4.jpg){width=200}

2. 复制以下完整JSON配置：

```json
[
    {
    "name": "电影天堂",
    "url": "https://caiji.dyttzyapi.com/api.php/provide/vod/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "量子",
    "url": "https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/",
    "enabled": true,
    "use_proxy": true
  }
  {
    "name": "如意",
    "url": "https://cj.rycjapi.com/api.php/provide/vod/from/rym3u8/at/json/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "B",
    "url": "https://json02.heimuer.xyz/api.php/provide/vod/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "极速",
    "url": "https://jszyapi.com/api.php/provide/vod/from/jsm3u8/at/json",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "暴风",
    "url": "https://bfzyapi.com/api.php/provide/vod/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "最大",
    "url": "https://api.zuidapi.com/api.php/provide/vod/from/zuidam3u8/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "非凡",
    "url": "http://cj.ffzyapi.com/api.php/provide/vod/at/json/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "360",
    "url": "https://360zy.com/api.php/provide/vod",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "四圈",
    "url": "https://pg.fenwe078.cf/api.php/provide/vod/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "ikun",
    "url": "https://ikunzyapi.com/api.php/provide/vod/",
    "enabled": true,
    "use_proxy": false
  },
  {
    "name": "卧龙",
    "url": "https://collect.wolongzyw.com/api.php/provide/vod/at/json",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "天空",
    "url": "http://api.tiankongapi.com/api.php/provide/vod/at/json",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "无尽",
    "url": "https://api.wujinapi.me/api.php/provide/vod/from/wjm3u8/at/json/",
    "enabled": true,
    "use_proxy": true
  },
  {
    "name": "速播",
    "url": "https://subocaiji.com/api.php/provide/vod/at/json",
    "enabled": true,
    "use_proxy": true
  }
]
```

3. 点击「导入」按钮完成操作

