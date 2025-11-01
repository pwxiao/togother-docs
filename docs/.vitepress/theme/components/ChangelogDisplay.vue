<template>
  <div class="changelog-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载更新历史中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>❌ 加载失败: {{ error }}</p>
      <p class="error-hint">请稍后重试或联系管理员</p>
    </div>
    
    <div v-else class="changelog-list">
      <div v-if="versions.length === 0" class="empty">
        <p>暂无更新历史</p>
      </div>
      
      <div v-for="version in versions" :key="version.version" class="version-item">
        <div class="version-header">
          <h2 class="version-number">{{ version.version }}</h2>
          <span class="version-date">{{ formatDate(version.date) }}</span>
        </div>
        
        <div class="version-content" v-html="renderMarkdown(version.description)"></div>
      </div>
      
      <div v-if="lastUpdated" class="last-updated">
        最后更新时间: {{ formatDate(lastUpdated) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const loading = ref(true);
const error = ref(null);
const versions = ref([]);
const lastUpdated = ref(null);

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true
});

onMounted(async () => {
  try {
    const response = await fetch('/changelog.json');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    versions.value = data.versions || []; 
    lastUpdated.value = data.lastUpdated;
  } catch (err) {
    console.error('加载 changelog 失败:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

// 渲染 Markdown
const renderMarkdown = (markdown) => {
  if (!markdown) return '';
  return marked(markdown);
};
</script>

<style scoped>
.changelog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: var(--vp-c-danger-1);
}

.error-hint {
  font-size: 0.9em;
  margin-top: 0.5rem;
  color: var(--vp-c-text-3);
}

.changelog-list {
  position: relative;
}

.version-item {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.version-item:last-child {
  border-bottom: none;
}

.version-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

.version-number {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0;
}

.version-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.version-content {
  color: var(--vp-c-text-1);
  line-height: 1.7;
}

.version-content :deep(h2) {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.version-content :deep(h3) {
  font-size: 1.1rem;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}

.version-content :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0.5rem 0;
}

.version-content :deep(li) {
  padding: 0.3rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.version-content :deep(li::before) {
  content: '•';
  position: absolute;
  left: 0.5rem;
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

.version-content :deep(p) {
  margin: 0.5rem 0;
}

.version-content :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.version-content :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.last-updated {
  text-align: center;
  padding: 2rem 0;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .changelog-container {
    padding: 1rem 0.5rem;
  }
  
  .version-header {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .version-number {
    font-size: 1.5rem;
  }
  
  .version-date {
    font-size: 0.85rem;
  }
}
</style>

