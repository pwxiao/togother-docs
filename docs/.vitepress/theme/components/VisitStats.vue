<template>
  <div class="visit-stats">
    <span class="stat-item">
      <span class="stat-icon">👀</span>
      <span class="stat-label">本页阅读</span>
      <span id="vercount_value_page_pv" class="stat-value">Loading...</span>
      <span class="stat-unit">次</span>
    </span>
    
    <span class="stat-item">
      <span class="stat-icon">🌐</span>
      <span class="stat-label">总访问量</span>
      <span id="vercount_value_site_pv" class="stat-value">Loading...</span>
      <span class="stat-unit">次</span>
    </span>
    
    <span class="stat-item">
      <span class="stat-icon">👥</span>
      <span class="stat-label">总访客数</span>
      <span id="vercount_value_site_uv" class="stat-value">Loading...</span>
      <span class="stat-unit">人</span>
    </span>
  </div>
</template>

<style scoped>
.visit-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stat-icon {
  font-size: 1.2em;
}

.stat-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stat-value {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  min-width: 3em;
  text-align: right;
}

.stat-unit {
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .visit-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .stat-item {
    width: 100%;
  }
}
</style>

