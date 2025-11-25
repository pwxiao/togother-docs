import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import ChangelogDisplay from './components/ChangelogDisplay.vue'
import DownloadPage from './components/DownloadPage.vue'
import CustomHero from './components/CustomHero.vue'



const theme: Theme = {
  extends: DefaultTheme,
  
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
    })
  },
  
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('ChangelogDisplay', ChangelogDisplay)
    app.component('DownloadPage', DownloadPage)
    app.component('CustomHero', CustomHero)
  }
}

export default theme

