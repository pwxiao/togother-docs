<template>
  <div class="page-visit-count">
    <span class="icon">👀</span>
    <span class="label">阅读量</span>
    <span id="vercount_value_page_pv" class="value">Loading...</span>
    <span class="unit">次</span>
  </div>
</template>

<style scoped>
.page-visit-count {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.icon {
  font-size: 1.1em;
}

.label {
  font-weight: 500;
}

.value {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  min-width: 2em;
  text-align: right;
}

.unit {
  color: var(--vp-c-text-3);
}
</style>

