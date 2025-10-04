# 直播解析功能

直播解析功能允许用户获取抖音和哔哩哔哩平台的直播流地址，方便在一起看应用中创建房间一起观看直播。

<div style="text-align: center; padding: 10px; margin: 10px 0; background-color: #f5f5f5; border-radius: 5px;">
  <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
  <span id="busuanzi_container_page_pv" style="font-size: 14px; color: #666;">
    本页面访问量 <span id="busuanzi_value_page_pv" style="font-weight: bold; color: #1976D2;"></span> 次
  </span>
</div>


## 支持的平台

目前支持以下直播平台：

- 抖音直播
- 哔哩哔哩直播

## 使用步骤

### 1. 选择平台

首先需要选择要解析的直播平台，目前支持抖音和哔哩哔哩两个直播平台。

### 2. 输入直播房间ID

在输入框中直接输入直播间房间号数字，例如：`12345`。

### 3. 解析直播

点击"解析"按钮，系统会自动获取直播流地址。请确保该直播间正在进行直播，否则可能无法获取到有效的直播流地址。

### 4. 使用解析结果

解析成功后，您可以：

- 点击复制按钮复制直播地址

- 点击测试播放按钮直接播放

- 创建房间邀请好友一起观看直播

## 什么是**直播间ID**？

直播间ID是指直播平台为每个直播间分配的唯一标识号码。不同平台的直播间ID获取方式略有不同：

!!! note "注意事项"
    直播间ID为纯数字，如果你找到的ID不是数字，那么说明你的ID是错误的，无法解析


### 抖音直播间ID

抖音直播间ID通常是直播间网址中的数字部分。获取方法：

1. 打开抖音App或网页版，进入想要观看的直播间
2. 分享直播间链接
3. 从分享的链接中提取数字ID

例如，抖音直播链接：`https://live.douyin.com/12345678`，其中的`12345678`就是直播间ID。

![](../assets/imgs/live_parser_1.png)

### 哔哩哔哩直播间ID

B站直播间ID可以从直播间网址获取。获取方法：

1. 打开哔哩哔哩App或网页版，进入想要观看的直播间
2. 在浏览器地址栏查看URL

例如，B站直播链接：`https://live.bilibili.com/21584153`，其中的`21584153`就是直播间ID。

![](../assets/imgs/live_parser_2.png)



