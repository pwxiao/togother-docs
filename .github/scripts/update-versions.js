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
  padding: 1.8rem 2.2rem;
  margin-bottom: 1.2rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.download-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.download-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.download-item:hover::before {
  opacity: 1;
}

.download-info {
  flex: 1;
}

.platform-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.platform-icon {
  font-size: 1.4rem;
}

.version {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  background: var(--vp-c-bg-alt);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  display: inline-block;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 2rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.download-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.download-btn::after {
  content: '↓';
  font-size: 1.1rem;
}

.tutorial-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1) !important;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: pointer;
  border: 2px solid var(--vp-c-divider);
}

.tutorial-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  transform: translateX(2px);
}

.tutorial-btn::before {
  content: '📖';
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.ios-item {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%);
}

.ios-note {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-top: 0.3rem;
}

@media (max-width: 768px) {
  .download-list {
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .download-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem 1.5rem;
    margin-bottom: 1rem;
  }

  .download-info {
    width: 100%;
    margin-bottom: 1rem;
  }

  .platform-name {
    font-size: 1.1rem;
  }

  .platform-icon {
    font-size: 1.2rem;
  }

  .version {
    font-size: 0.85rem;
    padding: 0.15rem 0.5rem;
  }

  .ios-note {
    font-size: 0.8rem;
  }

  .button-group {
    width: 100%;
    flex-direction: column;
    gap: 0.6rem;
  }

  .download-btn,
  .tutorial-btn {
    width: 100%;
    justify-content: center;
    padding: 0.65rem 1.2rem;
    font-size: 0.95rem;
  }

  .download-btn::after {
    font-size: 1rem;
  }

  .tutorial-btn::before {
    font-size: 1rem;
  }
}
</style>

<div class="download-list">

`;

  // 安卓版本
  if (versions.android) {
    content += `  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">🤖</span>
        安卓版本
      </div>
      <div class="version">v${versions.android.version}</div>
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
      <div class="platform-name">
        <span class="platform-icon">🪟</span>
        Windows 版本
      </div>
      <div class="version">v${versions.windows.version}</div>
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
      <div class="platform-name">
        <span class="platform-icon">🍎</span>
        macOS 版本
      </div>
      <div class="version">v${versions.mac.version}</div>
    </div>
    <a href="${versions.mac.download_url}" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

`;
  }

  // iOS App Store 部分（固定内容）
  const iosVersion = versions.ios?.version || '2.7.0';
  content += `  <div class="download-item ios-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">📱</span>
        iOS App Store
      </div>
      <div class="version">v${iosVersion}</div>
      <div class="ios-note">正式版，推荐使用</div>
    </div>
    <div class="button-group">
      <a href="https://apps.apple.com/us/app/一起看-异地同步观影神器/id6742242273" 
         class="download-btn" 
         target="_blank">前往下载</a>
      <a href="/ios_store_tuturial.html" 
         class="tutorial-btn">查看教程</a>
    </div>
  </div>

  <div class="download-item ios-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">✈️</span>
        iOS TestFlight
      </div>
      <div class="version">v${iosVersion}</div>
      <div class="ios-note">测试版，体验最新功能</div>
    </div>
    <div class="button-group">
      <a href="https://testflight.apple.com/join/xk6vZNpD" 
         class="download-btn" 
         target="_blank">立即下载</a>
      <a href="/ios_tf_tuturial.html" 
         class="tutorial-btn">查看教程</a>
    </div>
  </div>

</div>

<div style="text-align: center; margin-top: 4rem; padding: 2rem 0; border-top: 1px solid var(--vp-c-divider);">
  <p style="color: var(--vp-c-text-2); font-size: 0.9rem;">
    遇到问题？查看 <a href="/ios_tf_tuturial.html" style="color: var(--vp-c-brand-1);">iOS 安装教程</a> 或 <a href="/changelog.html" style="color: var(--vp-c-brand-1);">更新日志</a>
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
