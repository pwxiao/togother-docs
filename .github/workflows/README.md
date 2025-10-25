# GitHub Actions 工作流

## Update App Versions（自动更新应用版本）

### 功能
每 6 小时自动从数据库获取最新的应用版本信息，并更新 `docs/download.md` 和 `docs/changelog.md` 文件。

### 执行时间
- 代码提交时：每次推送到 main 分支时自动执行
- 定时执行：每天 UTC 时间 0:00, 6:00, 12:00, 18:00
- 手动触发：可在 GitHub Actions 页面手动运行

### 工作原理
1. 连接到 MySQL 数据库
2. 查询 `app_versions` 表中 `is_active=1` 的最新版本
3. 按系统类型（android, windows, mac, ios）分组
4. 更新 `docs/download.md` 文件中的下载链接和版本号
5. 更新 `docs/changelog.md` 文件，自动添加新版本的更新日志
6. 如果有变化，自动提交并推送到仓库



⚠️ **安全提示**：建议将数据库密码移至 GitHub Secrets 中

### 文件说明
- `update-versions.yml` - GitHub Actions 配置文件
- `../scripts/update-versions.js` - 版本更新脚本
- `../scripts/README.md` - 脚本详细说明

