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

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">安卓版本</div>
      <div class="version">2.6.5</div>
    </div>
    <a href="https://oss.autooj.cn/apps/2.6.5-app-arm64-v8a-release.apk" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">Windows 版本</div>
      <div class="version">2.6.5</div>
    </div>
    <a href="https://ghfast.top/https://github.com/pwxiao/togother-docs/releases/download/v2.6.5/togother_windows_x64_2.6.5.exe" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item">
    <div class="download-info">
      <div class="platform-name">macOS 版本</div>
      <div class="version">2.6.5</div>
    </div>
    <a href="https://ghfast.top/https://github.com/pwxiao/togother-docs/releases/download/v2.6.4/togother_macos_2.6.4.dmg" 
       class="download-btn" 
       target="_blank">立即下载</a>
  </div>

  <div class="download-item ios-item">
    <div class="download-info">
      <div class="platform-name">iOS TestFlight</div>
      <div class="version">2.6.2</div>
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



