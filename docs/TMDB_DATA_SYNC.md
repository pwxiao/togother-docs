# TMDB 数据同步工作流

这个工作流会自动从 TMDB API 获取电影和电视剧数据，并保存为 JSON 文件供 Flutter 应用使用。

## 功能特性

- 🎬 **热门电影数据**: 今日热门、流行电影、高评分电影
- 📺 **电视剧数据**: 热门电视剧、高评分电视剧  
- 🇨🇳 **中国电影**: 专门获取华语电影数据
- ⏰ **自动更新**: 每天自动更新数据
- 🔄 **手动触发**: 支持手动刷新数据
- 📊 **数据统计**: 提供数据量统计信息

## 数据结构

工作流会生成以下 JSON 文件：

```
data/tmdb/
├── tmdb_data.json          # 完整数据集
├── trending_movies.json    # 今日热门电影
├── popular_movies.json     # 热门电影
├── popular_tv_shows.json   # 热门电视剧
├── upcoming_movies.json    # 即将上映
├── chinese_movies.json     # 中国电影
├── top_rated_movies.json   # 高评分电影
├── top_rated_tv_shows.json # 高评分电视剧
└── metadata.json          # 元数据和统计信息
```

## 配置步骤

### 1. 获取 TMDB API 密钥

1. 访问 [TMDB 官网](https://www.themoviedb.org/)
2. 注册账号并登录
3. 前往 [API 设置页面](https://www.themoviedb.org/settings/api)
4. 申请 API 密钥（选择开发者选项）
5. 获取以下信息：
   - **API Key** (v3 auth)
   - **Access Token** (v4 auth)

### 2. 配置 GitHub Secrets

在你的 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 Repository secrets：
   - `TMDB_API_KEY`: 你的 TMDB API Key
   - `TMDB_ACCESS_TOKEN`: 你的 TMDB Access Token

### 3. 启用工作流

工作流文件位于 `.github/workflows/tmdb-data-sync.yml`，推送到仓库后会自动启用。

## 使用方式

### 自动执行
- 工作流每天北京时间早上 8 点（UTC 0 点）自动执行
- 自动提交更新的数据文件到仓库

### 手动执行
1. 进入 GitHub 仓库的 Actions 页面
2. 选择 "TMDB Data Sync" 工作流
3. 点击 "Run workflow"
4. 可选择是否强制更新所有数据

## Flutter 应用集成

### 1. 访问数据文件

你可以通过以下方式在 Flutter 应用中访问数据：

```dart
// 方式1: 从 GitHub Raw 链接访问
const String baseUrl = 'https://raw.githubusercontent.com/你的用户名/你的仓库名/main/data/tmdb/';

// 方式2: 如果部署了静态网站
const String baseUrl = 'https://你的域名/data/tmdb/';
```

### 2. 数据加载示例

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class TMDBDataService {
  static const String baseUrl = 'https://raw.githubusercontent.com/你的用户名/你的仓库名/main/data/tmdb/';
  
  // 获取热门电影
  static Future<List<dynamic>> getTrendingMovies() async {
    final response = await http.get(Uri.parse('${baseUrl}trending_movies.json'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('Failed to load trending movies');
  }
  
  // 获取热门电视剧
  static Future<List<dynamic>> getPopularTvShows() async {
    final response = await http.get(Uri.parse('${baseUrl}popular_tv_shows.json'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('Failed to load popular TV shows');
  }
  
  // 获取元数据
  static Future<Map<String, dynamic>> getMetadata() async {
    final response = await http.get(Uri.parse('${baseUrl}metadata.json'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    }
    throw Exception('Failed to load metadata');
  }
}
```

### 3. 替换现有代码

在你的 `ResourceHallTmdbPage` 中，可以将 TMDB API 调用替换为从 JSON 文件加载：

```dart
// 原来的代码
Future<void> _loadTrendingMovies() async {
  try {
    final result = await tmdb.v3.trending.getTrending(
      mediaType: MediaType.movie,
      timeWindow: TimeWindow.day,
      language: 'zh-CN',
    );
    if (mounted && result['results'] != null) {
      setState(() {
        _trendingMovies = result['results'];
      });
    }
  } catch (e) {
    debugPrint('加载热门电影失败: $e');
  }
}

// 替换为
Future<void> _loadTrendingMovies() async {
  try {
    final movies = await TMDBDataService.getTrendingMovies();
    if (mounted) {
      setState(() {
        _trendingMovies = movies;
      });
    }
  } catch (e) {
    debugPrint('加载热门电影失败: $e');
  }
}
```

## 数据格式说明

每个电影/电视剧对象包含以下字段：

```json
{
  "id": 123456,
  "title": "电影标题",           // 电影用 title，电视剧用 name
  "name": "电视剧名称",
  "overview": "剧情简介",
  "poster_path": "/poster.jpg",   // 海报图片路径
  "backdrop_path": "/backdrop.jpg", // 背景图片路径
  "release_date": "2024-01-01",   // 电影用 release_date，电视剧用 first_air_date
  "first_air_date": "2024-01-01",
  "vote_average": 8.5,           // 评分
  "vote_count": 1000,            // 评分人数
  "popularity": 123.456,         // 热度
  "genre_ids": [28, 12, 16],     // 类型ID数组
  "adult": false,                // 是否成人内容
  "video": false,                // 是否有视频
  "original_language": "en",     // 原始语言
  "original_title": "Original Title" // 原始标题
}
```

## 图片 URL 构建

TMDB 图片需要拼接完整 URL：

```dart
// 海报图片 (推荐尺寸: w500)
String posterUrl = 'https://image.tmdb.org/t/p/w500${movie['poster_path']}';

// 背景图片 (推荐尺寸: w1280)  
String backdropUrl = 'https://image.tmdb.org/t/p/w1280${movie['backdrop_path']}';
```

可用尺寸：
- **海报**: w92, w154, w185, w342, w500, w780, original
- **背景**: w300, w780, w1280, original

## 故障排除

### 工作流执行失败
1. 检查 GitHub Secrets 是否正确设置
2. 确认 TMDB API 密钥是否有效
3. 查看 Actions 日志获取详细错误信息

### 数据加载失败
1. 确认 JSON 文件路径是否正确
2. 检查网络连接
3. 验证 JSON 文件格式是否正确

### API 限制
- TMDB API 每秒最多 40 个请求
- 脚本已内置请求间隔控制
- 如遇到限制，工作流会自动重试

## 许可证

请遵守 TMDB API 的使用条款和数据归属要求。
