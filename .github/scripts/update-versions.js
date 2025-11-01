import mysql from 'mysql2/promise';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// 系统类型映射
const systemMap = {
  'android': '安卓版本',
  'windows': 'Windows版本',
  'mac': 'mac版本'
};

async function getLatestVersions() {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    // 查询每个系统的最新活跃版本
    const [rows] = await connection.execute(`
      SELECT 
        version,
        download_url,
        description,
        is_force_update,
        min_version,
        \`system\`,
        created_at
      FROM app_versions
      WHERE is_active = 1
      ORDER BY created_at DESC
    `);
    
    // 按系统分组，取每个系统的最新版本
    const versionsBySystem = {};
    for (const row of rows) {
      if (!versionsBySystem[row.system]) {
        versionsBySystem[row.system] = row;
      }
    }
    
    return versionsBySystem;
  } finally {
    await connection.end();
  }
}

async function getAllVersionsForChangelog() {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    // 查询所有版本用于生成 changelog
    const [rows] = await connection.execute(`
      SELECT 
        version,
        description,
        \`system\`,
        created_at
      FROM app_versions
      WHERE is_active = 1
      ORDER BY created_at DESC
    `);
    
    return rows;
  } finally {
    await connection.end();
  }
}

async function updateDownloadMd(versions) {
  const downloadMdPath = join(__dirname, '../../docs/download.md');
  
  // 生成新的 Markdown 内容
  let content = `# 下载应用



<style>
.download-list {
  max-width: 700px;
  margin: 3rem auto;
}

.download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.download-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.download-info {
  flex: 1;
}

.platform-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}

.version {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.download-btn {
  display: inline-block;
  padding: 0.6rem 1.8rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  border: none;
}

.download-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(2px);
}

.ios-item {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
}

.ios-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.3rem;
}

/* iOS 教程区域 */
.ios-tutorial {
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.ios-tutorial-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  text-align: center;
}

.ios-notice {
  background: var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
}

.ios-notice p {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.ios-notice strong {
  color: var(--vp-c-brand-1);
}

.ios-video {
  margin-top: 1.5rem;
}

.ios-video video {
  width: 100%;
  border-radius: 8px;
  background: #000;
}

@media (max-width: 768px) {
  .ios-tutorial {
    padding: 1.5rem;
    margin: 2rem auto;
  }
}
</style>

<div class="download-list">

`;

  // 安卓版本
  if (versions.android) {
    content += `  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">安卓版本</div>
      <div class="version">${versions.android.version}</div>
    </div>
    <a href="${versions.android.download_url}" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

`;
  }

  // Windows版本
  if (versions.windows) {
    content += `  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">Windows 版本</div>
      <div class="version">${versions.windows.version}</div>
    </div>
    <a href="${versions.windows.download_url}" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

`;
  }

  // macOS版本
  if (versions.mac) {
    content += `  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">macOS 版本</div>
      <div class="version">${versions.mac.version}</div>
    </div>
    <a href="${versions.mac.download_url}" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

`;
  }

  // iOS TestFlight 部分（固定内容）
  const iosVersion = versions.ios?.version || 'v2.6.1';
  content += `  <div class="download-item ios-item">
    <div class="download-info">
      <div class="platform-name">iOS TestFlight</div>
      <div class="version">${iosVersion}</div>
    </div>
    <a href="https://testflight.apple.com/join/xk6vZNpD" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

</div>

<!-- iOS 安装教程 -->
<div class="ios-tutorial">
  <h2 class="ios-tutorial-title">📱 iOS TestFlight 安装教程</h2>
  
  <div class="ios-notice">
    <p><strong>✓ 无需邀请码</strong></p>
    <p><strong>✓ 无需美区账号</strong></p>
    <p style="margin-top: 1rem; font-weight: 500;">⚠️ 如果不会下载，请完整看完下方视频教程</p>
  </div>
  
  <div class="ios-video">
    <video width="100%" controls controlsList="nodownload">
      <source src="/assets/video/ios.mp4" type="video/mp4">
      您的浏览器不支持视频播放。
    </video>
  </div>
</div>

<div style="text-align: center; margin-top: 4rem; padding: 2rem 0; border-top: 1px solid var(--vp-c-divider);">
  <p style="color: var(--vp-c-text-2); font-size: 0.9rem;">
    遇到问题？查看 <a href="/changelog.html" style="color: var(--vp-c-brand-1);">更新日志</a> 或联系客服
  </p>
</div>

<!-- ## iOS版本 (App Store) {#ios版本-app-store}

国区暂不可用，请使用美区账号

[App Store下载](https://apps.apple.com/us/app/一起看-异地同步观影神器/id6742242273) -->



`;

  // 写入文件
  await fs.writeFile(downloadMdPath, content, 'utf8');
  console.log('✅ download.md 已更新');
  
  // 输出更新的版本信息
  console.log('\n📦 最新版本信息：');
  for (const [system, info] of Object.entries(versions)) {
    console.log(`  ${systemMap[system] || system}: ${info.version}`);
  }
}

async function generateChangelogJson(allVersions) {
  const changelogJsonPath = join(__dirname, '../../docs/public/changelog.json');
  
  // 按版本号分组（去重）
  const versionMap = new Map();
  for (const row of allVersions) {
    const version = row.version;
    if (!versionMap.has(version)) {
      versionMap.set(version, {
        version,
        created_at: row.created_at,
        systems: {}
      });
    }
    
    // 添加该系统的描述
    const versionData = versionMap.get(version);
    if (row.description && row.description.trim()) {
      versionData.systems[row.system] = row.description;
    }
  }
  
  // 生成版本列表
  const sortedVersions = Array.from(versionMap.values()).sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  
  // 转换为最终的 JSON 格式
  const changelogData = sortedVersions.map(versionData => {
    const { version, created_at, systems } = versionData;
    
    // 合并所有系统的更新说明
    const allDescriptions = Object.values(systems);
    const description = allDescriptions.join('\n\n');
    
    return {
      version,
      date: created_at,
      description: description || '',
      systems: systems
    };
  });
  
  // 写入 JSON 文件
  await fs.writeFile(
    changelogJsonPath, 
    JSON.stringify({
      lastUpdated: new Date().toISOString(),
      versions: changelogData
    }, null, 2), 
    'utf8'
  );
  
  console.log(`✅ changelog.json 已生成（共 ${changelogData.length} 个版本）`);
  console.log(`📁 文件路径: ${changelogJsonPath}`);
}

async function main() {
  try {
    console.log('🔍 正在从数据库获取最新版本信息...');
    const versions = await getLatestVersions();
    
    if (Object.keys(versions).length === 0) {
      console.log('⚠️  数据库中没有找到活跃的版本信息');
      return;
    }
    
    console.log('📝 正在更新 download.md...');
    await updateDownloadMd(versions);
    
    console.log('\n🔍 正在获取所有版本信息用于生成 changelog.json...');
    const allVersions = await getAllVersionsForChangelog();
    
    console.log('📝 正在生成 changelog.json...');
    await generateChangelogJson(allVersions);
    
    console.log('\n✨ 完成！');
  } catch (error) {
    console.error('❌ 错误:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
