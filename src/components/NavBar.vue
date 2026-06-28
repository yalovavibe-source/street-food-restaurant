<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useBookingStore } from '../stores/booking'

const booking = useBookingStore()
const isScrolled = ref(false)
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function scrollTo(id: string) {
  closeMenu()
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar__inner">
      <a class="navbar__logo" @click="scrollTo('hero')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#e63946"/>
          <path d="M8 10h4v12H8zM20 10h4v12h-4zM12 10h8v4h-4v4h4v4h-8v-4h4v-4h-4z" fill="white"/>
        </svg>
        <span>Боевой клуб <strong>ИВАН</strong></span>
      </a>

      <nav class="navbar__links">
        <button @click="scrollTo('schedule')">Расписание</button>
        <button @click="scrollTo('coaches')">Тренеры</button>
        <button @click="scrollTo('pricing')">Цены</button>
        <button @click="scrollTo('contacts')">Контакты</button>
      </nav>

      <button class="btn-primary navbar__cta" @click="booking.openBooking()">
        Записаться
      </button>

      <button class="navbar__burger" :class="{ active: menuOpen }" @click="toggleMenu" aria-label="Меню">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <Transition name="slide-down">
      <div v-if="menuOpen" class="navbar__mobile">
        <button @click="scrollTo('schedule')">Расписание</button>
        <button @click="scrollTo('coaches')">Тренеры</button>
        <button @click="scrollTo('pricing')">Цены</button>
        <button @click="scrollTo('contacts')">Контакты</button>
        <button class="btn-primary" @click="() => { booking.openBooking(); closeMenu() }">
          Записаться
        </button>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  transition: background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--border);
}
.navbar__inner {
  display: flex;
  align-items: center;
  height: 64px;
  gap: 32px;
}
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: var(--text-2);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}
.navbar__logo strong {
  color: var(--text);
}
.navbar__links {
  display: flex;
  gap: 8px;
  flex: 1;
}
.navbar__links button {
  background: none;
  color: var(--text-2);
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}
.navbar__links button:hover {
  color: var(--text);
  background: rgba(255,255,255,0.06);
}
.navbar__cta {
  flex-shrink: 0;
  font-size: 14px;
  padding: 8px 20px;
}
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  padding: 4px;
  margin-left: auto;
  width: 36px;
  height: 36px;
}
.navbar__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.navbar__burger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__burger.active span:nth-child(2) {
  opacity: 0;
}
.navbar__burger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
.navbar__mobile {
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--border);
  padding: 12px 20px 20px;
  gap: 4px;
}
.navbar__mobile button {
  background: none;
  color: var(--text-2);
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  text-align: left;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}
.navbar__mobile button:hover {
  color: var(--text);
  background: rgba(255,255,255,0.06);
}
.navbar__mobile .btn-primary {
  margin-top: 8px;
  width: 100%;
  text-align: center;
  justify-content: center;
}

/* Global button styles */
:global(.btn-primary) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--red);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
}
:global(.btn-primary:hover) {
  background: var(--red-light);
  box-shadow: var(--shadow-red);
}
:global(.btn-primary:active) {
  transform: scale(0.98);
}
:global(.btn-secondary) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.08);
  color: var(--text);
  font-weight: 600;
  font-size: 15px;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-2);
  cursor: pointer;
  transition: background 0.2s;
}
:global(.btn-secondary:hover) {
  background: rgba(255,255,255,0.12);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .navbar__links, .navbar__cta {
    display: none;
  }
  .navbar__burger {
    display: flex;
  }
}
</style>
