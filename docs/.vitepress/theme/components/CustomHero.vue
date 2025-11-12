<template>
  <div class="custom-hero">
    <!-- 装饰性背景元素 -->
    <div class="hero-decoration">
      <div class="decoration-circle decoration-circle--1"></div>
      <div class="decoration-circle decoration-circle--2"></div>
      <div class="decoration-circle decoration-circle--3"></div>
      <div class="decoration-dots"></div>
    </div>
    
    <div class="hero-content">
      <div class="text-content">
        <div class="hero-subtitle">
          <span class="hero-subtitle-text">TOGOTHER</span>
        </div>
        <h1 class="hero-title">
          与朋友和家人同步观影<br>共享每一帧的惊喜
        </h1>
        <p class="hero-tagline">支持多平台与多种视频源，几秒内创建房间并邀请好友加入实时互动，一起看就是这么简单。</p>
        <div class="hero-actions">
          <a href="/desc" class="hero-button hero-button--primary">快速开始</a>
          <a href="/download" class="hero-button hero-button--secondary">下载应用</a>
        </div>
      </div>
      <div class="hero-images">
        <div class="phone-mockup phone-mockup--primary">
          <img 
            src="/assets/screenshots/home.jpg" 
            alt="一起看应用截图1"
            class="phone-image"
          />
        </div>
        <div class="phone-mockup phone-mockup--secondary">
          <img 
            src="/assets/screenshots/home1.jpg" 
            alt="一起看应用截图2"
            class="phone-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-hero {
  padding: 6rem 2rem 4rem;
  background: white;
  min-height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 装饰性背景元素 */
.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.decoration-circle--1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.decoration-circle--2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  animation-delay: 2s;
}

.decoration-circle--3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  animation-delay: 4s;
}

.decoration-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, #667eea 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.05;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.text-content {
  text-align: left;
  max-width: 600px;
}

.hero-subtitle {
  margin-bottom: 1rem;
}

.hero-subtitle-text {
  color: #667eea;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  color: #2c3e50;
}

.hero-tagline {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-button {
  padding: 0.875rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  font-size: 1rem;
}

.hero-button--primary {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.hero-button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.hero-button--secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  position: relative;
  overflow: hidden;
}



.hero-button--secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.hero-images {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.phone-mockup {
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.phone-mockup--primary {
  width: 280px;
  height: 600px;
  z-index: 2;
  transform: rotate(-5deg);
  right: 80px;
}

.phone-mockup--secondary {
  width: 250px;
  height: 535px;
  z-index: 1;
  transform: rotate(8deg);
  right: 0;
  top: 30px;
}

.phone-mockup:hover {
  transform: rotate(0deg) scale(1.05);
}

.phone-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-name {
    font-size: 2rem;
  }
  
  .hero-text {
    font-size: 2.2rem;
  }
  
  .hero-images {
    height: 400px;
    order: -1;
  }
  
  .phone-mockup--primary {
    width: 200px;
    height: 428px;
  }
  
  .phone-mockup--secondary {
    width: 180px;
    height: 385px;
    top: 50px;
  }
}
</style>