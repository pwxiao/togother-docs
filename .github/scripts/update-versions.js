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

/* Modal 样式 */
.ios-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s ease;
}

.ios-modal.active {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  background: var(--vp-c-bg);
  z-index: 1;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.modal-body {
  padding: 2rem;
}

.modal-notice {
  background: var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
}

.modal-notice p {
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.modal-notice strong {
  color: var(--vp-c-brand-1);
}

.modal-video {
  margin-bottom: 1.5rem;
}

.modal-video video {
  width: 100%;
  border-radius: 8px;
  background: #000;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: center;
  gap: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0 0 12px 12px;
}

.modal-btn {
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  border: none;
  font-size: 1rem;
}

.modal-btn-primary {
  background: var(--vp-c-brand-1);
  color: white !important;
}

.modal-btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }
  
  .modal-footer {
    padding: 1rem 1.5rem;
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
    <button class="download-btn" onclick="openIOSModal()">下载TestFlight</button>
  </div>

</div>

<!-- iOS 下载对话框 -->
<div id="iosModal" class="ios-modal" onclick="closeIOSModal(event)">
  <div class="modal-content" onclick="event.stopPropagation()">
    <div class="modal-header">
      <h2 class="modal-title">iOS TestFlight 安装教程</h2>
      <button class="modal-close" onclick="closeIOSModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-footer" style="padding: 1rem 0; margin-bottom: 1.5rem; border: none; background: transparent;">
        <a href="https://testflight.apple.com/join/xk6vZNpD" 
           class="modal-btn modal-btn-primary" 
           target="_blank">前往 TestFlight 下载</a>
      </div>
      <div class="modal-notice">
        <p><strong>✓ 无需邀请码</strong></p>
        <p><strong>✓ 无需美区账号</strong></p>
        <p style="margin-top: 1rem; font-weight: 500;">⚠️ 如果不会下载，请完整看完下方视频教程</p>
      </div>
      <div class="modal-video">
        <video width="100%" controls controlsList="nodownload">
          <source src="/assets/video/ios.mp4" type="video/mp4">
          您的浏览器不支持视频播放。
        </video>
      </div>
    </div>
  </div>
</div>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 定义全局函数
  window.openIOSModal = function() {
    const modal = document.getElementById('iosModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeIOSModal = function(event) {
    const modal = document.getElementById('iosModal');
    if (modal && (!event || event.target === modal || event.type === 'click')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // ESC 键关闭对话框
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      window.closeIOSModal();
    }
  });
});
</script>

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
