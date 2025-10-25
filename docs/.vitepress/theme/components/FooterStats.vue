<template>
  <div class="footer-stats">
    <div class="footer-stats-content">
      <span class="stat-item">
        <span class="stat-icon">👀</span>
        <span class="stat-label">本页阅读</span>
        <span id="vercount_value_page_pv" class="stat-value">-</span>
      </span>
      
      <span class="stat-divider">|</span>
      
      <span class="stat-item">
        <span class="stat-icon">🌐</span>
        <span class="stat-label">总访问</span>
        <span id="vercount_value_site_pv" class="stat-value">-</span>
      </span>
      
      <span class="stat-divider">|</span>
      
      <span class="stat-item">
        <span class="stat-icon">👥</span>
        <span class="stat-label">访客数</span>
        <span id="vercount_value_site_uv" class="stat-value">-</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.footer-stats {
  margin-top: 3rem;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

.footer-stats-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stat-icon {
  font-size: 1.1em;
}

.stat-label {
  font-weight: 500;
}

.stat-value {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  min-width: 2em;
  text-align: right;
}

.stat-divider {
  color: var(--vp-c-divider);
  font-weight: 300;
}

@media (max-width: 640px) {
  .footer-stats-content {
    gap: 1rem;
    font-size: 12px;
  }
  
  .stat-divider {
    display: none;
  }
}
</style>

