# 自动更新应用版本脚本

这个脚本会自动从数据库中获取最新的应用版本信息，并更新 `docs/download.md` 和 `docs/changelog.md` 文件。

## 功能

- 每次推送到 main 分支时自动执行
- 每 6 小时定时执行一次（UTC 时间 0:00, 6:00, 12:00, 18:00）
- 从 MySQL 数据库的 `app_versions` 表读取最新版本信息
- 自动更新 `docs/download.md` 文件中的下载链接和版本号
- 自动更新 `docs/changelog.md` 文件，添加新版本的更新日志
- 仅在内容有变化时才提交和推送

## 文件说明

- `.github/workflows/update-versions.yml` - GitHub Actions 工作流配置
- `.github/scripts/update-versions.js` - 更新版本的 Node.js 脚本

## 手动触发

在 GitHub 仓库页面：
1. 进入 **Actions** 标签页
2. 选择 **Update App Versions** 工作流
3. 点击 **Run workflow** 按钮

## 本地测试

```bash
# 设置环境变量并运行脚本
DB_USER=root \
DB_PASSWORD=your_password \
DB_HOST=your_host \
DB_PORT=3306 \
DB_NAME=togother_db \
node .github/scripts/update-versions.js
```

## 数据库结构

脚本需要以下数据库结构：

```sql
CREATE TABLE app_versions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version VARCHAR(20) NOT NULL,
    download_url TEXT NOT NULL,
    description TEXT NOT NULL,
    is_force_update TINYINT(1) DEFAULT 0,
    min_version VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    `system` VARCHAR(20) DEFAULT 'android' NOT NULL COMMENT '系统类型：android, windows, mac, ios'
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX idx_app_versions_system ON app_versions (`system`);
```

## 支持的系统类型

- `android` - 安卓版本
- `windows` - Windows 版本
- `mac` - macOS 版本
- `ios` - iOS 版本（TestFlight 链接需手动维护）

## 环境变量

脚本需要以下环境变量（已在 workflow 中配置）：

- `DB_USER` - 数据库用户名
- `DB_PASSWORD` - 数据库密码
- `DB_HOST` - 数据库主机地址
- `DB_PORT` - 数据库端口
- `DB_NAME` - 数据库名称

