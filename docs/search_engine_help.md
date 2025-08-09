# 搜索引擎帮助文档

了解如何添加和使用自定义搜片引擎

## 什么是苹果CMS搜索引擎

苹果CMS（MacCMS）是一款广泛使用的内容管理系统，专为视频网站设计。我们的App支持添加基于苹果CMS API格式的搜索引擎，这使您能够访问更多的视频资源。

!!! info "技术说明"
    苹果CMS API通常以JSON或XML格式返回数据，包含视频的标题、分类、播放地址等信息。我们的App支持标准的苹果CMS API接口，格式为：
    
    `https://example.com/api.php/provide/vod/at/json`

## 如何添加搜索引擎

您可以通过以下步骤添加自定义搜索引擎：

1. 在App中进入"搜索"页面
2. 点击右上角的"+"图标
3. 输入搜索引擎的名称和API地址
4. 点击"保存"完成添加

## 推荐的搜索引擎

以下是一些可以使用的搜索引擎API地址：

| 引擎名称 | API地址 | 状态 |
|---------|---------|------|
| 酷云77 | `https://api.kunyu77.com/api.php/provide/vod/at/json` | 可用 |
| 快看资源 | `https://kuaikan-api.com/api.php/provide/vod/at/json` | 可用 |
| 红牛资源 | `https://www.hongniuzy2.com/api.php/provide/vod/at/json` | 可用 |
| OK资源 | `https://www.okzy.co/api.php/provide/vod/at/json` | 可用 |
| 量子资源 | `https://cj.lziapi.com/api.php/provide/vod/at/json` | 可用 |

!!! warning "免责声明"
    以上列出的API仅作参考，其可用性可能随时变化。我们不对这些第三方API的内容负责，使用时请遵守相关法律法规。

## 搜索引擎API格式说明

如果您想自己寻找或者搭建搜索引擎API，需要了解苹果CMS API的基本格式：

### 基本请求格式

```
https://example.com/api.php/provide/vod/at/json?ac=list&wd={关键词}
```

其中：
- `ac=list` 表示获取列表
- `wd={关键词}` 表示搜索关键词

### 响应格式示例

```json
{
  "code": 1,
  "msg": "数据列表",
  "page": 1,
  "pagecount": 10,
  "limit": "20",
  "total": 200,
  "list": [
    {
      "vod_id": 123,
      "vod_name": "影片名称",
      "vod_pic": "封面图URL",
      "vod_remarks": "更新状态",
      "vod_year": "年份",
      "vod_area": "地区",
      "vod_actor": "演员",
      "vod_director": "导演",
      "vod_content": "简介"
    }
  ]
}
```

## 高级配置选项

除了基本的API地址外，高级用户还可以对搜索引擎进行一些定制化配置：

1. **超时设置**：可以设置API请求的超时时间，默认为10秒
2. **请求头定制**：可以添加自定义请求头，如Referer和User-Agent
3. **响应格式转换**：支持对非标准格式的API响应进行转换

!!! tip "技巧"
    如果您的搜索引擎需要特殊的请求头或认证信息，可以通过在App的高级设置中配置。 