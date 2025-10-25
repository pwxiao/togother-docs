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
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  background: var(--vp-c-bg);
  z-index: 1;
  text-align: center;
}

.modal-title {
  font-size: 1.3rem;
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
  margin-bottom: 0;
}

.modal-video video {
  width: 100%;
  border-radius: 8px;
  background: #000;
}

/* details 元素样式 */
details summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  margin-bottom: 1rem;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

<script setup>
import { ref, onMounted } from 'vue';

const downloads = ref([]);
const showModal = ref(false);
const currentModal = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/downloads.json');
    const data = await response.json();
    downloads.value = data.platforms;
  } catch (error) {
    console.error('Failed to load downloads:', error);
  }

  // 定义全局函数
  window.openIOSModal = function() {
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  };

  window.closeIOSModal = function(event) {
    if (!event || event.target.classList.contains('ios-modal') || event.type === 'click') {
      showModal.value = false;
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

const handleDownload = (platform) => {
  if (platform.type === 'modal') {
    currentModal.value = platform;
    window.openIOSModal();
  } else {
    window.open(platform.downloadUrl, '_blank');
  }
};
</script>

<div class="download-list">
  <div 
    v-for="platform in downloads" 
    :key="platform.id"
    class="download-item"
    :class="{ 'ios-item': platform.id === 'ios' }"
  >
    <div class="download-info">
      <div class="platform-name">{{ platform.name }}</div>
      <div class="version">{{ platform.version }}</div>
    </div>
    <a 
      v-if="platform.type === 'direct'"
      :href="platform.downloadUrl" 
      class="download-btn" 
      target="_blank"
    >
      立即下载
    </a>
    <button 
      v-else
      class="download-btn" 
      @click="handleDownload(platform)"
    >
      立即下载
    </button>
  </div>
</div>

<!-- iOS 下载对话框 -->
<div 
  v-if="showModal && currentModal" 
  class="ios-modal active" 
  @click="closeIOSModal"
>
  <div class="modal-content" @click.stop>
    <div class="modal-header">
      <h2 class="modal-title">{{ currentModal.modalConfig.title }}</h2>
      <button class="modal-close" @click="closeIOSModal">&times;</button>
    </div>
    <div class="modal-body">
      <!-- 主要下载按钮 -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <a 
          :href="currentModal.downloadUrl" 
          class="modal-btn modal-btn-primary" 
          target="_blank"
          style="font-size: 1.1rem; padding: 1rem 3rem;"
        >
          立即下载
        </a>
      </div>
      
      <!-- 简约提示 -->
      <div class="modal-notice" style="background: transparent; border: none; padding: 0; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span 
            v-for="(feature, index) in currentModal.modalConfig.features" 
            :key="index"
            style="color: var(--vp-c-text-2); font-size: 0.9rem;"
          >
            {{ feature }}
          </span>
        </div>
        <details style="margin-top: 1.5rem;">
          <summary style="cursor: pointer; color: var(--vp-c-text-2); font-size: 0.9rem; text-align: center; list-style: none; padding: 0.5rem;">
            <span style="color: var(--vp-c-brand-1);">{{ currentModal.modalConfig.videoTitle }}</span>
          </summary>
          <div class="modal-video" style="margin-top: 1rem;">
            <video width="100%" controls controlsList="nodownload">
              <source :src="currentModal.modalConfig.videoUrl" type="video/mp4" />
              您的浏览器不支持视频播放。
            </video>
          </div>
        </details>
      </div>
    </div>
  </div>
</div>

<div style="text-align: center; margin-top: 4rem; padding: 2rem 0; border-top: 1px solid var(--vp-c-divider);">
  <p style="color: var(--vp-c-text-2); font-size: 0.9rem;">
    遇到问题？查看 <a href="/changelog.html" style="color: var(--vp-c-brand-1);">更新日志</a> 或联系客服
  </p>
</div>
