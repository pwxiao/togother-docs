---
layout: home

hero:
  name: Togother
  text: 与朋友和家人同步观影
  tagline: 共享每一帧的惊喜，让距离不再是问题
  image:
    src: /assets/logo.png
    alt: Togother
  actions:
    - theme: brand
      text: 快速开始
      link: /desc
    - theme: alt
      text: 下载应用
      link: /download

---

<div class="app-showcase">
  <div class="showcase-background">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
  </div>
  <div class="showcase-container">
    <div class="showcase-content">
      <h3>简洁直观的用户界面</h3>
      <p>精心设计的界面，让每一次观影都成为享受。清晰的布局，流畅的动画，带来极致的用户体验。</p>
      <div class="feature-highlights">
        <div class="highlight-item">
          <span class="highlight-icon">✨</span>
          <span>现代化设计语言</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-icon">🎯</span>
          <span>用户友好的交互</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-icon">🌟</span>
          <span>精致的视觉细节</span>
        </div>
      </div>
    </div>
    <div class="showcase-images">
      <div class="phone-mockup primary">
        <img src="/assets/screenshots/home.jpg" alt="Togother 主界面" />
      </div>
      <div class="phone-mockup secondary">
        <img src="/assets/screenshots/home1.jpg" alt="Togother 观影界面" />
      </div>
    </div>
  </div>
</div>

<style>
.app-showcase {
  margin: 6rem 0;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.showcase-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 60%;
  right: 20%;
  animation-delay: 3s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: 20%;
  left: 60%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

.showcase-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.showcase-content h3 {
  font-size: 2.0rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase-content p {
  font-size: 1.20rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.feature-highlights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.highlight-icon {
  font-size: 1.2rem;
}

.highlight-item span:last-child {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.showcase-images {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-mockup {
  position: absolute;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.phone-mockup.primary {
  width: 300px;
  height: 650px;
  z-index: 2;
  transform: rotate(-8deg) translateY(0px);
  left: 0;
}

.phone-mockup.secondary {
  width: 270px;
  height: 585px;
  z-index: 1;
  transform: rotate(10deg) translateY(20px);
  right: 0;
  top: 40px;
}

.phone-mockup:hover {
  transform: rotate(0deg) scale(1.05) translateY(-10px);
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.2);
}

.phone-mockup.primary:hover {
  transform: rotate(0deg) scale(1.05) translateY(-15px);
}

.phone-mockup.secondary:hover {
  transform: rotate(0deg) scale(1.05) translateY(5px);
}

.phone-mockup img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
}

@media (max-width: 768px) {
  .app-showcase {
    margin: 4rem 0;
    padding: 2rem 0;
  }
  
  .showcase-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .showcase-content h3 {
    font-size: 2rem;
  }
  
  .showcase-images {
    height: 400px;
    order: -1;
  }
  
  .phone-mockup.primary {
    width: 220px;
    height: 475px;
  }
  
  .phone-mockup.secondary {
    width: 200px;
    height: 430px;
    top: 50px;
  }
  
  .feature-highlights {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .phone-mockup.primary {
    width: 200px;
    height: 428px;
  }
  
  .phone-mockup.secondary {
    width: 180px;
    height: 385px;
  }
  
  .showcase-content h3 {
    font-size: 1.75rem;
  }
  
  .showcase-content p {
    font-size: 1.125rem;
  }
}
</style>
