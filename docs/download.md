# 下载应用



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

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">🤖</span>
        安卓版本
      </div>
      <div class="version">v2.7.2</div>
    </div>
    <a href="https://sfmodels.qnaigc.com/test/togother_android_arm64-v8a_2.7.2.apk" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">🪟</span>
        Windows 版本
      </div>
      <div class="version">v2.7.2</div>
    </div>
    <a href="https://oss.togother.app/releases/2.7.2/togother_windows_x64_2.7.2.exe" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">🍎</span>
        macOS 版本
      </div>
      <div class="version">v2.7.2</div>
    </div>
    <a href="https://oss.togother.app/releases/2.7.2/togother_macos_2.7.2.dmg" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item ios-item">
    <div class="download-info">
      <div class="platform-name">
        <span class="platform-icon">📱</span>
        iOS App Store
      </div>
      <div class="version">v2.7.2</div>
      <div class="ios-note">正式版，查看教程手动激活全部功能</div>
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
      <div class="version">v2.7.2</div>
      <div class="ios-note">Testflight版</div>
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



