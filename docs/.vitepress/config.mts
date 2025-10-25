import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Togother",
  description: "Togother｜ 使用文档",
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/assets/favicon.png' }],
    ['meta', { name: 'author', content: 'pwxiao' }],
    ['meta', { name: 'keywords', content: 'Togother,异地,情侣,一起看视频,异地恋,app,文档,使用文档,togother' }],
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-VEN5KYD9DP' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-VEN5KYD9DP');
    `],
  ],

  themeConfig: {
    logo: '/assets/logo.png',
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '下载', link: '/download' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '帮助中心', link: '/help' },
      { text: '更新历史', link: '/changelog' },
      { text: '支持', link: '/support' }
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/desc' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '导入视频源', link: '/guide/import_source' },
          {
            text: '进阶功能',
            items: [
              { text: 'Emby服务器', link: '/guide/emby_guide' },
              { text: '夸克网盘', link: '/guide/quark_netdisk' },
              { text: 'WebDAV/Alist', link: '/guide/webdav_alist' },
              { text: '视频嗅探', link: '/guide/video_sniffer' },
              { text: '直播解析', link: '/guide/live_parser' },
              { text: '动漫搜索', link: '/guide/anime_search' }
            ]
          }
        ]
      },
      {
        text: '帮助中心',
        items: [
          { text: '常见问题', link: '/help' },
          { text: '搜索帮助', link: '/search_engine_help' }
        ]
      },
      {
        text: '法律条款',
        items: [
          { text: '用户协议', link: '/terms' },
          { text: '隐私政策', link: '/privacy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pwxiao/togother-docs' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '页面导航'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present pwxiao'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    editLink: {
      pattern: 'https://github.com/pwxiao/togother-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },

  sitemap: {
    hostname: 'https://docs.autooj.cn'
  },

  lastUpdated: true,

  cleanUrls: true
})

