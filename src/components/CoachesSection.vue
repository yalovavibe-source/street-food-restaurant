<script setup lang="ts">
import { coaches } from '../data/coaches'
</script>

<template>
  <section id="coaches" class="coaches section">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Команда</p>
        <h2 class="section-title">Наши тренеры</h2>
        <p class="section-desc">Чемпионы, которые передают свой опыт</p>
      </div>

      <div class="coaches__grid">
        <article v-for="coach in coaches" :key="coach.id" class="coach-card">
          <div class="coach-card__avatar">
            <div class="avatar-placeholder">
              {{ coach.name.split(' ').map(n => n[0]).join('') }}
            </div>
          </div>
          <div class="coach-card__body">
            <h3 class="coach-card__name">{{ coach.name }}</h3>
            <p class="coach-card__title">{{ coach.title }}</p>
            <p class="coach-card__bio">{{ coach.bio }}</p>

            <div class="coach-card__specs">
              <span v-for="s in coach.specializations" :key="s" class="spec-tag">
                {{ s }}
              </span>
            </div>

            <div class="coach-card__achievements">
              <div
                v-for="ach in coach.achievements"
                :key="ach"
                class="achievement"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ ach }}
              </div>
            </div>

            <div class="coach-card__exp">
              <span class="exp-num">{{ coach.experience }}</span>
              <span class="exp-label">лет опыта</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Pricing section -->
  <section id="pricing" class="pricing section">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Цены</p>
        <h2 class="section-title">Абонементы</h2>
        <p class="section-desc">Гибкие тарифы для любой цели</p>
      </div>

      <div class="pricing__grid">
        <div class="pricing-card">
          <div class="pricing-card__badge">Разовое</div>
          <div class="pricing-card__price">
            <span class="price-from">от</span>
            <span class="price-num">500</span>
            <span class="price-currency">₽</span>
          </div>
          <p class="pricing-card__desc">Одна тренировка на ваш выбор</p>
          <ul class="pricing-card__features">
            <li>Любая дисциплина</li>
            <li>Гибкое расписание</li>
            <li>Раздевалка и душ</li>
          </ul>
        </div>

        <div class="pricing-card popular">
          <div class="pricing-card__badge popular-badge">Популярное</div>
          <div class="pricing-card__price">
            <span class="price-from">от</span>
            <span class="price-num">3 500</span>
            <span class="price-currency">₽/мес</span>
          </div>
          <p class="pricing-card__desc">8 тренировок в месяц</p>
          <ul class="pricing-card__features">
            <li>Экономия 25%</li>
            <li>Любые дисциплины</li>
            <li>Приоритетная запись</li>
            <li>Хранение экипировки</li>
          </ul>
        </div>

        <div class="pricing-card">
          <div class="pricing-card__badge">Безлимит</div>
          <div class="pricing-card__price">
            <span class="price-from">от</span>
            <span class="price-num">6 900</span>
            <span class="price-currency">₽/мес</span>
          </div>
          <p class="pricing-card__desc">Неограниченные тренировки</p>
          <ul class="pricing-card__features">
            <li>Все дисциплины без ограничений</li>
            <li>Персональный план</li>
            <li>Приоритетная запись</li>
            <li>Хранение экипировки</li>
            <li>Видеоразбор техники</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 96px 0;
}
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-tag {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-heading);
  font-size: clamp(36px, 5vw, 56px);
  margin-bottom: 12px;
  letter-spacing: 1px;
}
.section-desc {
  color: var(--text-2);
  font-size: 17px;
}

/* Coaches */
.coaches { background: var(--bg-2); }
.coaches__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.coach-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  transition: border-color 0.2s, transform 0.2s;
}
.coach-card:hover {
  border-color: var(--border-2);
  transform: translateY(-3px);
}
.coach-card__avatar {
  margin-bottom: 20px;
}
.avatar-placeholder {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--red-dark), var(--red));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 24px;
  color: white;
  letter-spacing: 1px;
}
.coach-card__name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}
.coach-card__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--red);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.coach-card__bio {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.6;
  margin-bottom: 16px;
}
.coach-card__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.spec-tag {
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.25);
  color: #ff6b75;
  font-size: 12px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 100px;
}
.coach-card__achievements {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.achievement {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-2);
}
.coach-card__exp {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.exp-num {
  font-family: var(--font-heading);
  font-size: 32px;
  color: var(--text);
  line-height: 1;
}
.exp-label {
  font-size: 13px;
  color: var(--text-3);
}

/* Pricing */
.pricing { background: var(--bg); }
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}
.pricing-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
}
.pricing-card:hover {
  border-color: var(--border-2);
  transform: translateY(-3px);
}
.pricing-card.popular {
  border-color: var(--red);
  box-shadow: 0 0 0 1px rgba(230, 57, 70, 0.3), var(--shadow-red);
}
.pricing-card__badge {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-3);
  margin-bottom: 20px;
}
.popular-badge {
  color: var(--red);
}
.pricing-card__price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}
.price-from {
  font-size: 14px;
  color: var(--text-3);
}
.price-num {
  font-family: var(--font-heading);
  font-size: 52px;
  line-height: 1;
  color: var(--text);
}
.price-currency {
  font-size: 18px;
  color: var(--text-2);
}
.pricing-card__desc {
  font-size: 14px;
  color: var(--text-2);
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.pricing-card__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pricing-card__features li {
  font-size: 14px;
  color: var(--text-2);
  padding-left: 20px;
  position: relative;
}
.pricing-card__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--red);
  opacity: 0.7;
}

@media (max-width: 600px) {
  .coaches__grid {
    grid-template-columns: 1fr;
  }
  .pricing__grid {
    grid-template-columns: 1fr;
  }
}
</style>
