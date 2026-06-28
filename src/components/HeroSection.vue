<script setup lang="ts">
import { useBookingStore } from '../stores/booking'

const booking = useBookingStore()

function scrollToSchedule() {
  const el = document.getElementById('schedule')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__bg">
      <div class="hero__grid"></div>
      <div class="hero__glow"></div>
    </div>
    <div class="container hero__content">
      <div class="hero__badge">
        <span class="hero__dot"></span>
        Профессиональный зал · Москва
      </div>

      <h1 class="hero__title">
        БОЕВОЙ<br>
        КЛУБ <span class="hero__accent">ИВАН</span>
      </h1>

      <p class="hero__subtitle">
        Бокс, ММА, кикбоксинг, муай тай, BJJ и борьба.<br class="desktop-br">
        Тренируйся у чемпионов. Стань лучшей версией себя.
      </p>

      <div class="hero__actions">
        <button class="btn-primary hero__btn-main" @click="booking.openBooking()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Записаться на тренировку
        </button>
        <button class="btn-secondary" @click="scrollToSchedule">
          Смотреть расписание
        </button>
      </div>

      <div class="hero__stats">
        <div class="hero__stat">
          <span class="hero__stat-num">10+</span>
          <span class="hero__stat-label">лет работы</span>
        </div>
        <div class="hero__divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-num">4</span>
          <span class="hero__stat-label">тренера-чемпиона</span>
        </div>
        <div class="hero__divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-num">500+</span>
          <span class="hero__stat-label">спортсменов</span>
        </div>
        <div class="hero__divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-num">7</span>
          <span class="hero__stat-label">дней в неделю</span>
        </div>
      </div>
    </div>

    <div class="hero__scroll" @click="scrollToSchedule">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: var(--nav-height);
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(230, 57, 70, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 57, 70, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
.hero__glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(230, 57, 70, 0.12) 0%, transparent 70%);
  pointer-events: none;
}
.hero__content {
  position: relative;
  z-index: 1;
  padding-top: 80px;
  padding-bottom: 120px;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.3);
  color: #ff6b75;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 100px;
  margin-bottom: 28px;
}
.hero__dot {
  width: 6px;
  height: 6px;
  background: var(--red);
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(72px, 12vw, 140px);
  line-height: 0.92;
  letter-spacing: 2px;
  margin-bottom: 28px;
  color: var(--text);
}
.hero__accent {
  color: var(--red);
  -webkit-text-stroke: 2px var(--red);
}
.hero__subtitle {
  font-size: clamp(16px, 2.5vw, 20px);
  color: var(--text-2);
  margin-bottom: 40px;
  max-width: 520px;
  line-height: 1.6;
}
.desktop-br {
  display: none;
}
@media (min-width: 768px) {
  .desktop-br { display: block; }
}
.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 64px;
}
.hero__btn-main {
  font-size: 16px;
  padding: 14px 32px;
}
.hero__stats {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.hero__stat {
  display: flex;
  flex-direction: column;
}
.hero__stat-num {
  font-family: var(--font-heading);
  font-size: 40px;
  line-height: 1;
  color: var(--text);
}
.hero__stat-label {
  font-size: 13px;
  color: var(--text-3);
  margin-top: 4px;
}
.hero__divider {
  width: 1px;
  height: 40px;
  background: var(--border-2);
}
.hero__scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-3);
  cursor: pointer;
  animation: bounce 2s infinite;
  transition: color 0.2s;
}
.hero__scroll:hover {
  color: var(--red);
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
@media (max-width: 768px) {
  .hero__content {
    padding-top: 40px;
    padding-bottom: 80px;
  }
  .hero__stats {
    gap: 20px;
  }
  .hero__divider {
    height: 30px;
  }
  .hero__actions {
    flex-direction: column;
  }
  .hero__actions button {
    width: 100%;
    justify-content: center;
  }
}
</style>
