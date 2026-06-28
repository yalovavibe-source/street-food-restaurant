<script setup lang="ts">
import { ref, computed } from 'vue'
import { weekSchedule } from '../data/schedule'
import { CLASS_TYPE_NAMES, LEVEL_NAMES, CLASS_COLORS } from '../types'
import type { ClassType, TrainingClass } from '../types'
import { useBookingStore } from '../stores/booking'
import dayjs from 'dayjs'

const booking = useBookingStore()

const todayIndex = computed(() => {
  const d = dayjs().day()
  return d === 0 ? 6 : d - 1
})

const activeDayIndex = ref(todayIndex.value)
const activeFilter = ref<ClassType | 'all'>('all')

const activeDay = computed(() => weekSchedule[activeDayIndex.value])

const filteredClasses = computed(() => {
  if (activeFilter.value === 'all') return activeDay.value.classes
  return activeDay.value.classes.filter(c => c.type === activeFilter.value)
})

const allTypes = computed<ClassType[]>(() => {
  const types = new Set<ClassType>()
  weekSchedule.forEach(day => day.classes.forEach(c => types.add(c.type)))
  return Array.from(types)
})

function spotsLeft(cls: TrainingClass) {
  return cls.maxCapacity - cls.bookedCount
}

function capacityPercent(cls: TrainingClass) {
  return Math.round((cls.bookedCount / cls.maxCapacity) * 100)
}

function capacityColor(cls: TrainingClass) {
  const pct = capacityPercent(cls)
  if (pct >= 90) return '#e63946'
  if (pct >= 70) return '#e9c46a'
  return '#2a9d8f'
}

function bookClass(cls: TrainingClass) {
  booking.openBooking(cls)
}
</script>

<template>
  <section id="schedule" class="schedule section">
    <div class="container">
      <div class="section-header">
        <p class="section-tag">Расписание</p>
        <h2 class="section-title">Тренировки на неделю</h2>
        <p class="section-desc">Выберите день и удобное время занятия</p>
      </div>

      <!-- Day tabs -->
      <div class="schedule__days">
        <button
          v-for="day in weekSchedule"
          :key="day.dayKey"
          class="schedule__day-btn"
          :class="{ active: activeDayIndex === day.dayIndex, today: todayIndex === day.dayIndex }"
          @click="activeDayIndex = day.dayIndex"
        >
          <span class="day-short">{{ day.shortName }}</span>
          <span class="day-full">{{ day.dayName }}</span>
          <span v-if="todayIndex === day.dayIndex" class="today-badge">сегодня</span>
        </button>
      </div>

      <!-- Type filters -->
      <div class="schedule__filters">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          Все
        </button>
        <button
          v-for="type in allTypes"
          :key="type"
          class="filter-btn"
          :class="{ active: activeFilter === type }"
          :style="activeFilter === type ? `border-color: ${CLASS_COLORS[type]}; color: ${CLASS_COLORS[type]}; background: ${CLASS_COLORS[type]}18` : ''"
          @click="activeFilter = type"
        >
          {{ CLASS_TYPE_NAMES[type] }}
        </button>
      </div>

      <!-- Class cards -->
      <Transition name="fade" mode="out-in">
        <div :key="activeDayIndex + activeFilter" class="schedule__cards">
          <div v-if="filteredClasses.length === 0" class="schedule__empty">
            <p>Нет тренировок по выбранному фильтру</p>
          </div>

          <div
            v-for="cls in filteredClasses"
            :key="cls.id"
            class="class-card"
            :class="{ full: spotsLeft(cls) === 0 }"
          >
            <div class="class-card__accent" :style="{ background: cls.color }"></div>

            <div class="class-card__head">
              <div>
                <span class="class-card__type" :style="{ color: cls.color }">
                  {{ CLASS_TYPE_NAMES[cls.type] }}
                </span>
                <h3 class="class-card__name">{{ cls.name }}</h3>
              </div>
              <div class="class-card__price">
                <span>{{ cls.price.toLocaleString('ru') }} ₽</span>
              </div>
            </div>

            <p class="class-card__desc">{{ cls.description }}</p>

            <div class="class-card__meta">
              <div class="class-card__meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {{ cls.time }} – {{ cls.endTime }}
                <span class="meta-sep">·</span>
                {{ cls.duration }} мин
              </div>
              <div class="class-card__meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {{ cls.instructor }}
              </div>
              <div class="class-card__meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {{ LEVEL_NAMES[cls.level] }}
              </div>
            </div>

            <!-- Capacity bar -->
            <div class="class-card__capacity">
              <div class="capacity-bar">
                <div
                  class="capacity-bar__fill"
                  :style="{ width: capacityPercent(cls) + '%', background: capacityColor(cls) }"
                ></div>
              </div>
              <span class="capacity-text" :style="{ color: spotsLeft(cls) === 0 ? '#e63946' : 'var(--text-3)' }">
                {{ spotsLeft(cls) === 0 ? 'Мест нет' : `Свободно: ${spotsLeft(cls)} из ${cls.maxCapacity}` }}
              </span>
            </div>

            <button
              class="class-card__btn"
              :disabled="spotsLeft(cls) === 0"
              :class="{ 'btn-primary': spotsLeft(cls) > 0, 'btn-full': spotsLeft(cls) === 0 }"
              @click="bookClass(cls)"
            >
              {{ spotsLeft(cls) === 0 ? 'Мест нет' : 'Записаться' }}
            </button>
          </div>
        </div>
      </Transition>
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

/* Day tabs */
.schedule__days {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 20px;
  scrollbar-width: none;
}
.schedule__days::-webkit-scrollbar {
  display: none;
}
.schedule__day-btn {
  flex-shrink: 0;
  position: relative;
  background: var(--bg-card);
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.schedule__day-btn:hover {
  border-color: var(--border-2);
  color: var(--text);
}
.schedule__day-btn.active {
  background: var(--red);
  border-color: var(--red);
  color: white;
}
.day-short { display: block; }
.day-full { display: none; }
.today-badge {
  font-size: 10px;
  background: rgba(255,255,255,0.25);
  border-radius: 4px;
  padding: 1px 5px;
  margin-top: 2px;
}
.schedule__day-btn.today:not(.active) {
  border-color: var(--red);
  color: var(--red);
}

/* Filters */
.schedule__filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.filter-btn {
  background: var(--bg-card);
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover {
  border-color: var(--border-2);
  color: var(--text);
}
.filter-btn.active {
  background: rgba(230, 57, 70, 0.1);
  border-color: var(--red);
  color: var(--red);
}

/* Cards */
.schedule__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.schedule__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
  color: var(--text-3);
}
.class-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
}
.class-card:hover {
  border-color: var(--border-2);
  transform: translateY(-2px);
}
.class-card.full {
  opacity: 0.6;
}
.class-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}
.class-card__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
  padding-left: 12px;
}
.class-card__type {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 4px;
  display: block;
}
.class-card__name {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
}
.class-card__price {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
}
.class-card__desc {
  font-size: 13px;
  color: var(--text-2);
  padding-left: 12px;
  margin-bottom: 16px;
  line-height: 1.5;
}
.class-card__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 12px;
  margin-bottom: 16px;
}
.class-card__meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-2);
}
.class-card__meta-item svg {
  flex-shrink: 0;
  color: var(--text-3);
}
.meta-sep {
  color: var(--text-3);
}
.class-card__capacity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-left: 12px;
}
.capacity-bar {
  flex: 1;
  height: 4px;
  background: var(--border-2);
  border-radius: 2px;
  overflow: hidden;
}
.capacity-bar__fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}
.capacity-text {
  font-size: 12px;
  white-space: nowrap;
  color: var(--text-3);
}
.class-card__btn {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
}
.class-card__btn.btn-primary {
  background: var(--red);
  color: white;
  border: none;
}
.class-card__btn.btn-primary:hover {
  background: var(--red-light);
}
.class-card__btn.btn-full {
  background: var(--bg-3);
  color: var(--text-3);
  border: 1px solid var(--border);
  cursor: not-allowed;
}

@media (min-width: 600px) {
  .day-short { display: none; }
  .day-full { display: block; }
  .schedule__day-btn {
    padding: 10px 20px;
  }
}
@media (max-width: 480px) {
  .schedule__cards {
    grid-template-columns: 1fr;
  }
}
</style>
