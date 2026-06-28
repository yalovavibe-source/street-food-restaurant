<script setup lang="ts">
import { useBookingStore } from '../stores/booking'

const booking = useBookingStore()
</script>

<template>
  <footer id="contacts" class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <div class="footer__logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#e63946"/>
            <path d="M8 10h4v12H8zM20 10h4v12h-4zM12 10h8v4h-4v4h4v4h-8v-4h4v-4h-4z" fill="white"/>
          </svg>
          <span>Боевой клуб <strong>ИВАН</strong></span>
        </div>
        <p class="footer__tagline">Тренируйся как профи. Живи без границ.</p>
        <button class="btn-primary footer__cta" @click="booking.openBooking()">
          Записаться на тренировку
        </button>
      </div>

      <div class="footer__links">
        <div class="footer__col">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#schedule">Расписание</a></li>
            <li><a href="#coaches">Тренеры</a></li>
            <li><a href="#pricing">Цены</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>Дисциплины</h4>
          <ul>
            <li>Бокс</li>
            <li>ММА</li>
            <li>Муай Тай</li>
            <li>Кикбоксинг</li>
            <li>BJJ</li>
            <li>Борьба</li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>Контакты</h4>
          <ul>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              ул. Боксёрская, 1, Москва
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 9.59 19.79 19.79 0 0 1 1 1.18 2 2 0 0 1 2.96 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 14h1a2 2 0 0 1 1 2.92z"/>
              </svg>
              +7 (495) 123-45-67
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              info@ivan-gym.ru
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Пн–Пт: 8:00–22:00
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Сб–Вс: 10:00–19:00
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; {{ new Date().getFullYear() }} Боевой клуб ИВАН. Все права защищены.</p>
        <p class="footer__stripe-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Оплата защищена Stripe
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-2);
  border-top: 1px solid var(--border);
}
.footer__inner {
  display: grid;
  grid-template-columns: 1.4fr 2fr;
  gap: 60px;
  padding: 64px 20px;
}
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: var(--text-2);
}
.footer__logo strong {
  color: var(--text);
}
.footer__tagline {
  font-size: 15px;
  color: var(--text-3);
  line-height: 1.5;
}
.footer__cta {
  align-self: flex-start;
  font-size: 14px;
  padding: 10px 22px;
}
.footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
.footer__col h4 {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-3);
  margin-bottom: 16px;
}
.footer__col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer__col li, .footer__col a {
  font-size: 14px;
  color: var(--text-2);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.footer__col a:hover {
  color: var(--text);
}
.footer__col li svg {
  flex-shrink: 0;
  color: var(--text-3);
}
.footer__bottom {
  border-top: 1px solid var(--border);
}
.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 13px;
  color: var(--text-3);
}
.footer__stripe-note {
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 900px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .footer__links {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
@media (max-width: 600px) {
  .footer__links {
    grid-template-columns: 1fr 1fr;
  }
  .footer__bottom-inner {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
@media (max-width: 400px) {
  .footer__links {
    grid-template-columns: 1fr;
  }
}
</style>
