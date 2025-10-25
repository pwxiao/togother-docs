import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import VisitStats from './components/VisitStats.vue'
import PageVisitCount from './components/PageVisitCount.vue'
import FooterStats from './components/FooterStats.vue'
import ChangelogDisplay from './components/ChangelogDisplay.vue'
import DownloadPage from './components/DownloadPage.vue'

// 加载 Vercount 脚本
function loadVercount() {
  if (!inBrowser) return
  
  // 检查脚本是否已加载
  const existingScript = document.querySelector('script[src*="vercount.one"]')
  if (existingScript) return
  
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  // 使用中国加速版本
  script.src = 'https://cn.vercount.one/js'
  document.head.appendChild(script)
}

const theme: Theme = {
  extends: DefaultTheme,
  
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 在文档内容底部添加统计信息
      'doc-after': () => h(FooterStats)
    })
  },
  
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('VisitStats', VisitStats)
    app.component('PageVisitCount', PageVisitCount)
    app.component('ChangelogDisplay', ChangelogDisplay)
    app.component('DownloadPage', DownloadPage)
    
    // 页面加载时初始化 Vercount
    if (inBrowser) {
      loadVercount()
      
      // 监听路由变化，重新触发统计
      router.onAfterRouteChanged = () => {
        // Vercount 会自动检测页面变化
        if ((window as any).vercount) {
          (window as any).vercount.track()
        }
      }
    }
  }
}

export default theme

