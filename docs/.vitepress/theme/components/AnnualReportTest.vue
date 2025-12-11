<template>
    <div class="report-wrapper" :style="wrapperStyle">
      <!-- 背景元素 -->
      <div class="stars"></div>
      <div class="twinkling"></div>
  
      <!-- 音乐控制 -->
      <div class="music-control" @click="toggleMusic" :class="{ 'playing': isMusicPlaying }">
        <span class="music-icon">🎵</span>
        <audio ref="bgmAudio" loop>
          <source src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_55a2979204.mp3" type="audio/mpeg">
        </audio>
      </div>
  
      <!-- 加载状态 -->
      <transition name="fade">
        <div v-if="isLoading" class="loading-container" key="loading">
          <div class="planet-spinner">
            <div class="planet"></div>
            <div class="orbit"></div>
          </div>
          <p class="loading-text">正在从星海中收集您的记忆碎片...</p>
        </div>
  
        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container" key="error">
          <div class="glass-card error-card">
            <h3>💔 信号中断</h3>
            <p>{{ error }}</p>
            <button @click="fetchReportData" class="action-btn">重新连接</button>
          </div>
        </div>
  
        <!-- 主要内容 (幻灯片) -->
        <div v-else-if="reportData" class="slides-container" key="content">
          
          <!-- 页面指示器 -->
          <div class="progress-bar-container">
            <div 
              v-for="(page, index) in totalPages" 
              :key="index" 
              class="progress-pill"
              :class="{ 'active': index <= currentPage, 'current': index === currentPage }"
              @click="jumpToPage(index)"
            ></div>
          </div>
  
          <!-- 幻灯片内容区域 -->
          <transition :name="slideDirection">
            
            <!-- Page 1: 封面 -->
            <div v-if="currentPage === 0" class="slide slide-cover" key="0">
              <div class="avatar-glow">
                <img :src="reportData.user.avatar_url || defaultAvatar" alt="Avatar" class="avatar">
                <div v-if="reportData.user.is_vip" class="vip-tag">VIP</div>
              </div>
              <h1 class="title">Hi, {{ reportData.user.username }}</h1>
              <p class="subtitle">欢迎来到您的 {{ reportData.year }} 年度星际报告</p>
              <div class="date-badge">
                <span>📅 {{ formatDate(reportData.user.registered_at) }} 登陆本站</span>
              </div>
              <div class="start-hint" @click="nextPage">
                开启旅程 <span class="arrow-down">⬇</span>
              </div>
            </div>
  
            <!-- Page 2: 年度概览 -->
            <div v-else-if="currentPage === 1" class="slide slide-overview" key="1">
              <h2 class="slide-title">这一年，你的足迹</h2>
              <div class="grid-2x2">
                <div class="glass-stat">
                  <span class="emoji">🗓️</span>
                  <span class="num">{{ reportData.overview.active_days }}</span>
                  <span class="label">活跃天数</span>
                </div>
                <div class="glass-stat">
                  <span class="emoji">🚀</span>
                  <span class="num">{{ reportData.overview.total_access }}</span>
                  <span class="label">访问次数</span>
                </div>
                <div class="glass-stat">
                  <span class="emoji">🔥</span>
                  <span class="num">{{ reportData.overview.most_active_month }}月</span>
                  <span class="label">最忙碌的月份</span>
                </div>
                <div class="glass-stat">
                  <span class="emoji">📝</span>
                  <span class="num">{{ reportData.activity.check_ins.total }}</span>
                  <span class="label">打卡次数</span>
                </div>
              </div>
              <p class="footer-text">每一个数字，都是你存在过的证明。</p>
            </div>
  
            <!-- Page 3: 活跃趋势 (图表) -->
            <div v-else-if="currentPage === 2" class="slide slide-chart" key="2">
              <h2 class="slide-title">能量波动记录</h2>
              <div class="chart-box glass-card">
                <div class="bars-container">
                  <div v-for="(item, index) in reportData.activity.monthly_trend" :key="index" class="bar-wrapper">
                    <div class="bar-fill" :style="{ height: calculateBarHeight(item.total_access) + '%' }"></div>
                    <span class="bar-month">{{ formatMonthShort(item.month) }}</span>
                  </div>
                </div>
              </div>
              <div class="insight-box" v-if="reportData.activity.check_ins.max_consecutive_days > 0">
                <span class="highlight-text">{{ reportData.activity.check_ins.max_consecutive_days }}</span> 天连续打卡
                <br>你的坚持像恒星一样闪耀
              </div>
            </div>
  
            <!-- Page 4: 社交与内容 -->
            <div v-else-if="currentPage === 3" class="slide slide-social" key="3">
              <h2 class="slide-title">星际引力场</h2>
              <div class="social-circle-container">
                <div class="planet-stat main-planet">
                  <div class="content">
                    <span class="val">{{ reportData.social.followers_count }}</span>
                    <span class="lbl">粉丝</span>
                  </div>
                </div>
                <div class="planet-stat satellite sat-1">
                  <span class="val">{{ reportData.social.following_count }}</span>
                  <span class="lbl">关注</span>
                </div>
                <div class="planet-stat satellite sat-2">
                  <span class="val">{{ reportData.social.messages_count }}</span>
                  <span class="lbl">消息</span>
                </div>
              </div>
              <div class="creation-list glass-card">
                <div class="list-item">
                  <span class="icon">🎙️</span> 创建房间 <strong>{{ reportData.content.rooms_created }}</strong> 个
                </div>
                <div class="list-item">
                  <span class="icon">✍️</span> 发布影评 <strong>{{ reportData.content.reviews_count }}</strong> 篇
                </div>
              </div>
            </div>
  
            <!-- Page 5: 收藏与观看 -->
            <div v-else-if="currentPage === 4" class="slide slide-watch" key="4">
              <h2 class="slide-title">视觉探索日志</h2>
              <div class="big-stat-card glass-card">
                <div class="row">
                  <div class="left">
                    <span class="big-num">{{ reportData.watching.favorites_count }}</span>
                    <span class="unit">个</span>
                  </div>
                  <div class="right">收藏视频</div>
                </div>
                <div class="divider"></div>
                <div class="row">
                  <div class="left">
                    <span class="big-num">{{ reportData.watching.rooms_joined }}</span>
                    <span class="unit">次</span>
                  </div>
                  <div class="right">加入房间</div>
                </div>
              </div>
              <p class="quote">"我们在光影中寻找共鸣。"</p>
            </div>
  
            <!-- Page 6: 财富与关键词 -->
            <div v-else-if="currentPage === 5" class="slide slide-wealth" key="5">
              <h2 class="slide-title">星系宝藏</h2>
              
              <div class="wealth-card glass-card">
                <div class="coin-icon">🪙</div>
                <div class="points-val">{{ reportData.points.available_points }}</div>
                <div class="points-lbl">当前积分</div>
                <div class="points-flow">
                  <span>入账 +{{ reportData.points.year_earned }}</span>
                  <span>消耗 -{{ reportData.points.year_used }}</span>
                </div>
              </div>
  
              <div class="keywords-area" v-if="reportData.search.top_keywords.length > 0">
                <h3>年度搜索信标</h3>
                <div class="tags-cloud">
                  <span 
                    v-for="(tag, index) in reportData.search.top_keywords.slice(0, 8)" 
                    :key="index"
                    class="neon-tag"
                    :style="{ animationDelay: index * 0.1 + 's' }"
                  >
                    #{{ tag.keyword }}
                  </span>
                </div>
              </div>
            </div>
  
            <!-- Page 7: 情侣页 (条件渲染) -->
            <div v-else-if="currentPage === 6 && hasCouple" class="slide slide-couple" key="6">
              <div class="heart-bg">❤️</div>
              <h2 class="slide-title">双星伴生</h2>
              <div class="couple-avatars">
                <img :src="reportData.user.avatar_url || defaultAvatar" class="c-avatar me">
                <div class="connect-line"></div>
                <div class="c-avatar partner-placeholder">{{ reportData.couple.partner?.username?.[0] || '?' }}</div>
              </div>
              <div class="couple-info glass-card">
                <p>与 <strong>{{ reportData.couple.partner?.username }}</strong></p>
                <p>共同飞行了</p>
                <div class="days-counter">{{ reportData.couple.days_together }} <span class="days-label">天</span></div>
                <p class="anniv" v-if="reportData.couple.anniversary_date">纪念日: {{ reportData.couple.anniversary_date }}</p>
              </div>
            </div>
  
            <!-- Page 8: 结尾 -->
            <div v-else class="slide slide-end" key="end">
              <h1 class="end-title">2024<br>旅途继续</h1>
              <p class="end-text">感谢您与我们一同漫游星河</p>
              <div class="qr-placeholder glass-card">
                <span>长按保存/分享</span>
              </div>
              <button @click="restart" class="action-btn restart-btn">再次回味</button>
              <div class="debug-info" v-if="tokenSource">Src: {{ tokenSource }}</div>
            </div>
  
          </transition>
  
          <!-- 导航控制 -->
          <div class="nav-controls">
            <button class="nav-btn prev" @click="prevPage" v-if="currentPage > 0">↑</button>
            <button class="nav-btn next" @click="nextPage" v-if="currentPage < totalPages - 1">↓</button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed, nextTick } from 'vue'
  import axios from 'axios'
  
  const token = ref(null)
  const tokenSource = ref('')
  const isLoading = ref(true)
  const reportData = ref(null)
  const error = ref(null)
  const isMusicPlaying = ref(false)
  const bgmAudio = ref(null)
  const currentPage = ref(0)
  const slideDirection = ref('slide-up')
  
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  
  // ------------------- 计算属性 -------------------
  const hasCouple = computed(() => {
    return reportData.value?.couple?.has_couple
  })
  
  const totalPages = computed(() => {
    if (!reportData.value) return 0
    // 基础页面: 封面, 概览, 趋势, 社交, 观看, 财富, 结尾 = 7页
    // 如果有情侣数据, +1页
    return hasCouple.value ? 8 : 7
  })
  
  // ------------------- 页面控制 -------------------
  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      slideDirection.value = 'slide-up'
      currentPage.value++
    }
  }
  
  const prevPage = () => {
    if (currentPage.value > 0) {
      slideDirection.value = 'slide-down'
      currentPage.value--
    }
  }
  
  const jumpToPage = (index) => {
    slideDirection.value = index > currentPage.value ? 'slide-up' : 'slide-down'
    currentPage.value = index
  }
  
  const restart = () => {
    slideDirection.value = 'slide-down'
    currentPage.value = 0
  }
  
  // ------------------- 音乐控制 -------------------
  const toggleMusic = () => {
    if (!bgmAudio.value) return
    if (isMusicPlaying.value) {
      bgmAudio.value.pause()
    } else {
      bgmAudio.value.play().catch(e => console.log('Autoplay prevented', e))
    }
    isMusicPlaying.value = !isMusicPlaying.value
  }
  
  // ------------------- 辅助函数 -------------------
  const formatDate = (isoString) => {
    if (!isoString) return '-'
    return new Date(isoString).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const formatMonthShort = (monthStr) => {
    if (!monthStr) return ''
    return parseInt(monthStr.split('-')[1])
  }
  
  const calculateBarHeight = (val) => {
    if (!reportData.value?.activity?.monthly_trend) return 0
    const max = Math.max(...reportData.value.activity.monthly_trend.map(i => i.total_access))
    if (max === 0) return 0
    return (val / max) * 100
  }
  
  // ------------------- API & Init -------------------
  async function fetchReportData() {
    if (!token.value) {
      error.value = "未检测到登录信息"
      isLoading.value = false
      return
    }
  
    isLoading.value = true
    error.value = null
  
    try {
      // 实际请求逻辑
      const response = await axios.get('http://127.0.0.1:8000/api/social/annual-report', {
        params: { year: new Date().getFullYear() },
        headers: { 'Authorization': `Bearer ${token.value}` }
      })
      reportData.value = response.data
      nextTick(() => {
         // 尝试自动播放音乐
      })
    } catch (e) {
      console.error('API Error', e)
      // Dev Mock
      if (process.env.NODE_ENV === 'development' || true) {
         reportData.value = getMockData()
      } else {
         error.value = e.response?.data?.detail || "无法连接到服务器"
      }
    } finally {
      isLoading.value = false
    }
  }
  
  function checkToken() {
    if (typeof window === 'undefined') return false
    if (window.appToken) {
      token.value = window.appToken
      tokenSource.value = 'window.appToken'
      return true
    }
    if (typeof window.getAppToken === 'function') {
      try {
        const t = window.getAppToken()
        if (t) {
          token.value = t
          tokenSource.value = 'window.getAppToken()'
          return true
        }
      } catch(e){}
    }
    return false
  }
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('appTokenReady', (e) => {
        if (e.detail?.token) {
          token.value = e.detail.token
          tokenSource.value = 'Event'
          fetchReportData()
        }
      })
      if (!window.onAppTokenReceived) {
        window.onAppTokenReceived = (t) => {
          token.value = t
          tokenSource.value = 'Callback'
          fetchReportData()
        }
      }
    }
  
    if (checkToken()) {
      fetchReportData()
    } else {
      // 轮询一小段时间
      let retries = 0
      const interval = setInterval(() => {
        if (checkToken()) {
          clearInterval(interval)
          fetchReportData()
        } else if (++retries > 10) {
          clearInterval(interval)
          isLoading.value = false
          error.value = "请在 App 内打开"
          // Force mock for demo
          // reportData.value = getMockData(); isLoading.value = false; error.value = null;
        }
      }, 500)
    }
  })
  
  function getMockData() {
    return {
      year: 2024,
      user: { username: "星际漫游者", is_vip: true, registered_at: "2023-01-15" },
      overview: { active_days: 280, total_access: 1560, most_active_month: 7 },
      activity: {
        check_ins: { total: 200, max_consecutive_days: 66 },
        monthly_trend: [
          { month: "2024-01", total_access: 40 }, { month: "2024-02", total_access: 80 },
          { month: "2024-03", total_access: 60 }, { month: "2024-04", total_access: 120 },
          { month: "2024-05", total_access: 90 }, { month: "2024-06", total_access: 150 },
          { month: "2024-07", total_access: 220 }, { month: "2024-08", total_access: 180 },
          { month: "2024-09", total_access: 100 }, { month: "2024-10", total_access: 110 },
          { month: "2024-11", total_access: 140 }, { month: "2024-12", total_access: 160 },
        ]
      },
      social: { following_count: 42, followers_count: 108, messages_count: 3200 },
      content: { rooms_created: 8, reviews_count: 24 },
      watching: { favorites_count: 56, rooms_joined: 102 },
      points: { available_points: 6800, year_earned: 9500, year_used: 2700 },
      consumption: { total_spent: 258.0 },
      search: { top_keywords: [{keyword: "三体"}, {keyword: "赛博朋克"}, {keyword: "人工智能"}, {keyword: "Vue3"}, {keyword: "SpaceX"}] },
      couple: { has_couple: true, partner: { username: "月球兔子" }, days_together: 365, anniversary_date: "2023-05-20" }
    }
  }
  </script>
  
  <style scoped>
  /* ================= 主题变量 ================= */
  :root {
    --bg-gradient: linear-gradient(to bottom, #0f2027, #203a43, #2c5364); /* 深邃星空 */
    --text-main: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --accent-color: #ffd700; /* 金色 */
    --accent-secondary: #00d2ff; /* 霓虹蓝 */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
  }
  
  /* ================= 容器与背景 ================= */
  .report-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-gradient);
    color: var(--text-main);
    font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* 星星背景动画 */
  .stars, .twinkling {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .stars {
    background: #000 url('http://www.script-tutorials.com/demos/360/images/stars.png') repeat top center;
    z-index: 0;
  }
  .twinkling {
    background: transparent url('http://www.script-tutorials.com/demos/360/images/twinkling.png') repeat top center;
    z-index: 1;
    animation: move-twink-back 200s linear infinite;
    opacity: 0.5;
  }
  @keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
  }
  
  /* ================= 通用组件 ================= */
  .slides-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
  }
  
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  
  .slide-title {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(to right, #fff, #a1c4fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeInDown 0.8s ease;
  }
  
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 360px;
  }
  
  /* 音乐控制 */
  .music-control {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.3);
  }
  .music-control.playing {
    animation: spin 4s linear infinite;
    background: var(--accent-color);
    color: #000;
    border: none;
  }
  
  /* 进度条 */
  .progress-bar-container {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    padding: 0 10px;
    display: flex;
    gap: 4px;
    z-index: 50;
  }
  .progress-pill {
    flex: 1;
    height: 3px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    transition: all 0.3s;
  }
  .progress-pill.active { background: rgba(255,255,255,0.6); }
  .progress-pill.current { background: var(--accent-color); box-shadow: 0 0 5px var(--accent-color); }
  
  /* 导航按钮 */
  .nav-controls {
    position: absolute;
    bottom: 30px;
    right: 20px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    font-size: 18px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .nav-btn:active { transform: scale(0.9); background: rgba(255,255,255,0.3); }
  
  /* ================= 页面特定样式 ================= */
  
  /* Page 1: 封面 */
  .slide-cover .avatar-glow {
    position: relative;
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }
  .slide-cover .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    box-shadow: 0 0 30px rgba(0, 210, 255, 0.5);
  }
  .slide-cover .vip-tag {
    position: absolute;
    bottom: 0;
    right: -10px;
    background: var(--accent-color);
    color: #000;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
  }
  .slide-cover .title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }
  .slide-cover .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }
  .slide-cover .start-hint {
    position: absolute;
    bottom: 50px;
    animation: bounce 2s infinite;
    opacity: 0.8;
    cursor: pointer;
  }
  
  /* Page 2: 概览 (Grid) */
  .grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    width: 100%;
    max-width: 360px;
  }
  .glass-stat {
    background: rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 20px 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    animation: zoomIn 0.5s ease;
  }
  .glass-stat .emoji { font-size: 2rem; margin-bottom: 5px; }
  .glass-stat .num { font-size: 1.4rem; font-weight: bold; color: var(--accent-secondary); }
  .glass-stat .label { font-size: 0.8rem; color: var(--text-secondary); margin-top: 5px; }
  
  /* Page 3: 图表 */
  .chart-box {
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bars-container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
  }
  .bar-wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 0 2px;
  }
  .bar-fill {
    width: 8px;
    background: linear-gradient(to top, #30cfd0, #330867);
    border-radius: 4px;
    opacity: 0.8;
    transition: height 1s ease;
    min-height: 4px;
  }
  .bar-month {
    font-size: 10px;
    color: var(--text-secondary);
    margin-top: 5px;
  }
  .insight-box {
    margin-top: 30px;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .highlight-text {
    font-size: 2rem;
    color: var(--accent-color);
    font-weight: bold;
  }
  
  /* Page 4: 社交 */
  .social-circle-container {
    position: relative;
    width: 250px;
    height: 250px;
    margin-bottom: 30px;
  }
  .planet-stat {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
  }
  .main-planet {
    width: 140px;
    height: 140px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  .main-planet .val { font-size: 2rem; font-weight: bold; }
  .satellite {
    width: 80px;
    height: 80px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    position: absolute;
  }
  .sat-1 { top: 0; left: 10%; animation: float 4s ease-in-out infinite; }
  .sat-2 { bottom: 0; right: 10%; animation: float 5s ease-in-out infinite reverse; }
  
  .creation-list { padding: 15px; margin-top: 10px; }
  .list-item { margin: 10px 0; font-size: 1rem; display: flex; align-items: center; gap: 10px; }
  
  /* Page 5: 观看 */
  .big-stat-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .big-stat-card .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .big-stat-card .left { display: flex; align-items: baseline; gap: 5px; }
  .big-stat-card .big-num { font-size: 2.5rem; font-weight: bold; color: var(--accent-secondary); text-shadow: 0 0 10px rgba(0,210,255,0.3); }
  .big-stat-card .right { font-size: 1.2rem; color: var(--text-secondary); }
  .big-stat-card .divider { height: 1px; background: rgba(255,255,255,0.1); width: 100%; }
  .quote { margin-top: 40px; font-style: italic; color: rgba(255,255,255,0.5); }
  
  /* Page 6: 财富 */
  .wealth-card {
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .coin-icon { font-size: 3rem; margin-bottom: 10px; animation: spin 3s ease-in-out infinite; display: inline-block; }
  .points-val { font-size: 3rem; font-weight: bold; color: var(--accent-color); }
  .points-flow { display: flex; justify-content: space-around; margin-top: 20px; font-size: 0.9rem; color: var(--text-secondary); }
  .keywords-area { width: 100%; max-width: 360px; margin-top: 20px; text-align: center; }
  .tags-cloud { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 15px; }
  .neon-tag {
    padding: 6px 12px;
    border: 1px solid var(--accent-secondary);
    border-radius: 20px;
    color: var(--accent-secondary);
    font-size: 0.9rem;
    box-shadow: 0 0 5px var(--accent-secondary);
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  
  /* Page 7: 情侣 */
  .slide-couple .heart-bg {
    position: absolute;
    font-size: 15rem;
    opacity: 0.05;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    animation: pulse 2s infinite;
  }
  .couple-avatars { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; position: relative; }
  .c-avatar { width: 80px; height: 80px; border-radius: 50%; border: 2px solid white; object-fit: cover; }
  .partner-placeholder { background: var(--accent-color); display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 1.5rem; }
  .connect-line { height: 2px; width: 40px; background: white; }
  .couple-info { text-align: center; }
  .days-counter { font-size: 3rem; font-weight: bold; color: #ff6b81; margin: 10px 0; }
  .days-label { font-size: 1rem; color: white; }
  
  /* Page 8: 结尾 */
  .end-title { font-size: 3rem; line-height: 1.2; text-align: center; margin-bottom: 20px; font-weight: 700; letter-spacing: 5px; }
  .end-text { color: var(--text-secondary); margin-bottom: 40px; }
  .qr-placeholder { width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 30px; border: 1px dashed rgba(255,255,255,0.3); }
  .action-btn {
    background: white;
    color: #000;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .action-btn:active { transform: scale(0.95); }
  
  /* ================= 动画 ================= */
  @keyframes spin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
  @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
  @keyframes pulse { 0% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.1); } 100% { transform: translateX(-50%) scale(1); } }
  @keyframes fadeIn { to { opacity: 1; } }
  @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes zoomIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  
  /* 页面切换动画 (Vue Transition) */
  .slide-up-enter-active, .slide-up-leave-active,
  .slide-down-enter-active, .slide-down-leave-active {
    transition: all 0.5s ease-out;
  }
  /* 向上滑 (Next) */
  .slide-up-enter-from { transform: translateY(100%); opacity: 0; }
  .slide-up-leave-to { transform: translateY(-100%); opacity: 0; }
  /* 向下滑 (Prev) */
  .slide-down-enter-from { transform: translateY(-100%); opacity: 0; }
  .slide-down-leave-to { transform: translateY(100%); opacity: 0; }
  
  /* Loading 动画 */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .planet-spinner {
    width: 60px;
    height: 60px;
    position: relative;
    margin-bottom: 20px;
  }
  .planet-spinner .planet {
    width: 100%;
    height: 100%;
    background: var(--accent-secondary);
    border-radius: 50%;
    box-shadow: 0 0 20px var(--accent-secondary);
  }
  .planet-spinner .orbit {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s linear infinite;
  }
  </style>