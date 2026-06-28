<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useBookingStore } from '../stores/booking'
import { weekSchedule } from '../data/schedule'
import { CLASS_TYPE_NAMES, LEVEL_NAMES } from '../types'
import type { TrainingClass } from '../types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

// ── Stripe ──────────────────────────────────────────────────────────────
// Replace with your own Stripe test publishable key from https://dashboard.stripe.com/test/apikeys
// Test cards: 4242 4242 4242 4242 | Exp: any future date | CVC: any 3 digits
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RKF0X08c0yXC1xSC5xlQYRoGgm60rIqMIiUrNxgCeJN8AqDu6yQqlRHBnmkm8KGDE2L0XbVLbRyGN4yXxIh7gM006tHF0S3S'
// ────────────────────────────────────────────────────────────────────────

const store = useBookingStore()

// ── Date picker ──────────────────────────────────────────────────────────
const today = dayjs()
const calendarMonth = ref(today)
const selectedDate = ref<dayjs.Dayjs | null>(null)

const calendarDays = computed(() => {
  const start = calendarMonth.value.startOf('month')
  const end = calendarMonth.value.endOf('month')
  const days: (dayjs.Dayjs | null)[] = []

  // pad start
  const firstDow = (start.day() + 6) % 7
  for (let i = 0; i < firstDow; i++) days.push(null)
  for (let d = start; !d.isAfter(end); d = d.add(1, 'day')) days.push(d)

  return days
})

function prevMonth() { calendarMonth.value = calendarMonth.value.subtract(1, 'month') }
function nextMonth() { calendarMonth.value = calendarMonth.value.add(1, 'month') }
function selectDate(d: dayjs.Dayjs | null) {
  if (!d) return
  if (d.isBefore(today.startOf('day'))) return
  selectedDate.value = d
  store.selectedDate = d.format('YYYY-MM-DD')
}

// ── Step 1: Class picker (when opened without pre-selected) ──────────────
const allClasses = computed<TrainingClass[]>(() => {
  const list: TrainingClass[] = []
  weekSchedule.forEach(day => day.classes.forEach(c => list.push(c)))
  return list
})

// ── Form ─────────────────────────────────────────────────────────────────
const errors = ref<Record<string, string>>({})

function validateInfo() {
  errors.value = {}
  if (!store.firstName.trim()) errors.value.firstName = 'Введите имя'
  if (!store.lastName.trim()) errors.value.lastName = 'Введите фамилию'
  if (!store.phone.trim()) errors.value.phone = 'Введите телефон'
  else if (!/^\+?[\d\s\-()]{10,}$/.test(store.phone)) errors.value.phone = 'Неверный формат телефона'
  if (!store.email.trim()) errors.value.email = 'Введите email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email)) errors.value.email = 'Неверный email'
  if (!selectedDate.value) errors.value.date = 'Выберите дату'
  return Object.keys(errors.value).length === 0
}

function goToPayment() {
  if (validateInfo()) store.goToStep('payment')
}

// ── Stripe ────────────────────────────────────────────────────────────────
type StripeType = Awaited<ReturnType<typeof import('@stripe/stripe-js').loadStripe>>
type StripeElementsType = ReturnType<NonNullable<StripeType>['elements']>
type CardElementType = ReturnType<StripeElementsType['create']>

let stripe: StripeType = null
let elements: StripeElementsType | null = null
let cardElement: CardElementType | null = null

const cardMounted = ref(false)
const cardError = ref('')
const cardComplete = ref(false)
const paymentProcessing = ref(false)
const paymentError = ref('')
const showTestCards = ref(false)

async function mountStripe() {
  if (cardMounted.value) return
  await nextTick()
  const el = document.getElementById('stripe-card-element')
  if (!el) return

  try {
    const { loadStripe } = await import('@stripe/stripe-js')
    stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)
    if (!stripe) return

    elements = stripe.elements({
      appearance: {
        theme: 'night',
        variables: {
          colorPrimary: '#e63946',
          colorBackground: '#1e1e1e',
          colorText: '#ffffff',
          colorDanger: '#ff4d5a',
          fontFamily: 'Inter, system-ui, sans-serif',
          borderRadius: '8px',
        },
      },
    })

    cardElement = elements.create('card', {
      style: {
        base: {
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '16px',
          '::placeholder': { color: '#666666' },
        },
        invalid: { color: '#ff4d5a' },
      },
    })

    cardElement.mount('#stripe-card-element')
    cardMounted.value = true

    cardElement.on('change', (event: { error?: { message: string }; complete?: boolean }) => {
      cardError.value = event.error ? event.error.message : ''
      cardComplete.value = !!event.complete
    })
  } catch (e) {
    console.error('Stripe failed to load:', e)
  }
}

watch(() => store.step, async (step) => {
  if (step === 'payment') {
    setTimeout(mountStripe, 100)
  }
})

async function handlePayment() {
  if (!cardComplete.value) {
    cardError.value = 'Пожалуйста, заполните данные карты'
    return
  }
  paymentProcessing.value = true
  paymentError.value = ''

  try {
    // In production: call your backend to create a PaymentIntent,
    // then use stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })
    // For this demo we simulate a successful payment after a short delay.
    await new Promise(resolve => setTimeout(resolve, 2200))

    // Simulate: in real mode, use stripe.confirmCardPayment(clientSecret, ...)
    // const { error } = await stripe!.confirmCardPayment(clientSecret, {
    //   payment_method: { card: cardElement! }
    // })
    // if (error) throw new Error(error.message)

    store.setSuccess()
  } catch (e: unknown) {
    paymentError.value = e instanceof Error ? e.message : 'Ошибка оплаты. Попробуйте снова.'
  } finally {
    paymentProcessing.value = false
  }
}

// ── Close on Escape ───────────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') store.closeBooking()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  if (cardElement) {
    cardElement.unmount()
    cardElement = null
    cardMounted.value = false
  }
})

function onClose() {
  store.closeBooking()
  setTimeout(() => store.resetBooking(), 300)
}

function onSuccessClose() {
  store.closeBooking()
  setTimeout(() => store.resetBooking(), 300)
}

// ── Helpers ───────────────────────────────────────────────────────────────
const DOW = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function formatDate(d: dayjs.Dayjs) {
  return d.format('D MMMM, dddd')
}

function spotsLeft(cls: TrainingClass) {
  return cls.maxCapacity - cls.bookedCount
}
</script>

<template>
  <Transition name="fade">
    <div v-if="store.isOpen" class="modal-overlay" @click.self="onClose">
      <Transition name="slide-up">
        <div class="modal" role="dialog" aria-modal="true">

          <!-- Header -->
          <div class="modal__header">
            <div class="modal__progress" v-if="store.step !== 'success'">
              <div
                class="modal__progress-step"
                v-for="(s, i) in ['class', 'info', 'payment']"
                :key="s"
                :class="{
                  done: ['info','payment','success'].indexOf(store.step) > i - 1,
                  active: store.step === s
                }"
              >
                <span class="step-num">{{ i + 1 }}</span>
                <span class="step-label">{{ ['Тренировка', 'О себе', 'Оплата'][i] }}</span>
              </div>
              <div class="progress-line">
                <div
                  class="progress-line__fill"
                  :style="{ width: { class: '0%', info: '50%', payment: '100%', success: '100%' }[store.step] }"
                ></div>
              </div>
            </div>
            <button class="modal__close" @click="onClose" aria-label="Закрыть">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- ── STEP: CLASS ───────────────────────────────────────────── -->
          <div v-if="store.step === 'class'" class="modal__body">
            <h2 class="modal__title">Выберите тренировку</h2>
            <p class="modal__subtitle">Нажмите на занятие для записи</p>

            <div class="class-picker">
              <div
                v-for="cls in allClasses"
                :key="cls.id"
                class="class-pick-item"
                :class="{ selected: store.selectedClass?.id === cls.id, full: spotsLeft(cls) === 0 }"
                @click="spotsLeft(cls) > 0 && (store.selectedClass = cls)"
              >
                <div class="class-pick-accent" :style="{ background: cls.color }"></div>
                <div class="class-pick-body">
                  <div class="class-pick-head">
                    <div>
                      <span class="class-pick-type" :style="{ color: cls.color }">
                        {{ CLASS_TYPE_NAMES[cls.type] }}
                      </span>
                      <div class="class-pick-name">{{ cls.name }}</div>
                      <div class="class-pick-meta">
                        {{ cls.time }} · {{ cls.instructor }} · {{ LEVEL_NAMES[cls.level] }}
                      </div>
                    </div>
                    <div class="class-pick-price">{{ cls.price.toLocaleString('ru') }} ₽</div>
                  </div>
                </div>
                <div v-if="spotsLeft(cls) === 0" class="class-pick-full">Мест нет</div>
                <div v-if="store.selectedClass?.id === cls.id" class="class-pick-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="modal__footer">
              <button
                class="btn-primary modal__btn-full"
                :disabled="!store.selectedClass"
                @click="store.selectedClass && store.goToStep('info')"
              >
                Далее: Заполнить данные
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- ── STEP: INFO ────────────────────────────────────────────── -->
          <div v-if="store.step === 'info'" class="modal__body">
            <h2 class="modal__title">Ваши данные</h2>

            <!-- Selected class summary -->
            <div v-if="store.selectedClass" class="booking-summary">
              <div class="summary-accent" :style="{ background: store.selectedClass.color }"></div>
              <div class="summary-body">
                <div class="summary-name">{{ store.selectedClass.name }}</div>
                <div class="summary-meta">
                  {{ store.selectedClass.time }} · {{ store.selectedClass.instructor }}
                </div>
              </div>
              <div class="summary-price">{{ store.selectedClass.price.toLocaleString('ru') }} ₽</div>
            </div>

            <!-- Date picker -->
            <div class="form-field" :class="{ error: errors.date }">
              <label>Дата тренировки</label>
              <div class="calendar">
                <div class="calendar__head">
                  <button class="cal-nav" @click="prevMonth">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <span class="cal-month">{{ calendarMonth.format('MMMM YYYY') }}</span>
                  <button class="cal-nav" @click="nextMonth">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
                <div class="calendar__dow">
                  <span v-for="d in DOW" :key="d">{{ d }}</span>
                </div>
                <div class="calendar__grid">
                  <button
                    v-for="(d, i) in calendarDays"
                    :key="i"
                    class="cal-day"
                    :class="{
                      empty: !d,
                      today: d && d.isSame(today, 'day'),
                      selected: d && selectedDate && d.isSame(selectedDate, 'day'),
                      past: d && d.isBefore(today.startOf('day')),
                    }"
                    :disabled="!d || d.isBefore(today.startOf('day'))"
                    @click="selectDate(d)"
                  >
                    {{ d ? d.date() : '' }}
                  </button>
                </div>
                <div v-if="selectedDate" class="cal-selected-label">
                  Выбрано: {{ formatDate(selectedDate) }}
                </div>
              </div>
              <span v-if="errors.date" class="error-msg">{{ errors.date }}</span>
            </div>

            <!-- Personal info -->
            <div class="form-row">
              <div class="form-field" :class="{ error: errors.firstName }">
                <label>Имя</label>
                <input v-model="store.firstName" type="text" placeholder="Александр" />
                <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
              </div>
              <div class="form-field" :class="{ error: errors.lastName }">
                <label>Фамилия</label>
                <input v-model="store.lastName" type="text" placeholder="Иванов" />
                <span v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</span>
              </div>
            </div>

            <div class="form-field" :class="{ error: errors.phone }">
              <label>Телефон</label>
              <input v-model="store.phone" type="tel" placeholder="+7 (999) 123-45-67" />
              <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
            </div>

            <div class="form-field" :class="{ error: errors.email }">
              <label>Email</label>
              <input v-model="store.email" type="email" placeholder="alex@example.com" />
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>

            <div class="modal__footer">
              <button class="btn-secondary" @click="store.goToStep('class')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Назад
              </button>
              <button class="btn-primary" @click="goToPayment">
                К оплате
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- ── STEP: PAYMENT ─────────────────────────────────────────── -->
          <div v-if="store.step === 'payment'" class="modal__body">
            <h2 class="modal__title">Оплата</h2>

            <!-- Order summary -->
            <div class="order-summary" v-if="store.selectedClass">
              <div class="order-row">
                <span>{{ store.selectedClass.name }}</span>
                <span>{{ store.selectedClass.price.toLocaleString('ru') }} ₽</span>
              </div>
              <div class="order-row" v-if="selectedDate">
                <span class="order-row-label">Дата</span>
                <span>{{ formatDate(selectedDate) }}</span>
              </div>
              <div class="order-row">
                <span class="order-row-label">Участник</span>
                <span>{{ store.firstName }} {{ store.lastName }}</span>
              </div>
              <div class="order-divider"></div>
              <div class="order-total">
                <span>Итого</span>
                <span>{{ store.selectedClass.price.toLocaleString('ru') }} ₽</span>
              </div>
            </div>

            <!-- Stripe Card Element -->
            <div class="stripe-section">
              <div class="stripe-header">
                <label class="stripe-label">Данные карты</label>
                <button class="test-cards-toggle" @click="showTestCards = !showTestCards">
                  {{ showTestCards ? 'Скрыть' : 'Тестовые карты' }}
                </button>
              </div>

              <Transition name="fade">
                <div v-if="showTestCards" class="test-cards">
                  <p class="test-cards-title">Тестовый режим — используйте эти данные:</p>
                  <div class="test-card-item">
                    <span class="tc-label">Успешная оплата:</span>
                    <code>4242 4242 4242 4242</code>
                  </div>
                  <div class="test-card-item">
                    <span class="tc-label">3D-Secure:</span>
                    <code>4000 0025 0000 3155</code>
                  </div>
                  <div class="test-card-item">
                    <span class="tc-label">Отклонена:</span>
                    <code>4000 0000 0000 0002</code>
                  </div>
                  <p class="test-card-note">Срок: любая будущая дата · CVC: любые 3 цифры</p>
                </div>
              </Transition>

              <div id="stripe-card-element" class="stripe-card-element"></div>
              <div v-if="!cardMounted" class="stripe-loading">
                <div class="stripe-spinner"></div>
                <span>Загрузка формы оплаты...</span>
              </div>
              <div v-if="cardError" class="stripe-error">{{ cardError }}</div>
            </div>

            <div v-if="paymentError" class="payment-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ paymentError }}
            </div>

            <div class="stripe-trust">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Платёж защищён SSL-шифрованием через Stripe
            </div>

            <div class="modal__footer">
              <button class="btn-secondary" @click="store.goToStep('info')" :disabled="paymentProcessing">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                </svg>
                Назад
              </button>
              <button
                class="btn-primary pay-btn"
                @click="handlePayment"
                :disabled="paymentProcessing || !cardComplete"
              >
                <template v-if="paymentProcessing">
                  <span class="spinner"></span>
                  Обработка...
                </template>
                <template v-else>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Оплатить {{ store.selectedClass?.price.toLocaleString('ru') }} ₽
                </template>
              </button>
            </div>
          </div>

          <!-- ── STEP: SUCCESS ─────────────────────────────────────────── -->
          <div v-if="store.step === 'success'" class="modal__body success-body">
            <div class="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 class="success-title">Запись подтверждена!</h2>
            <p class="success-subtitle">
              Мы отправим детали на {{ store.email }}
            </p>

            <div class="success-details">
              <div class="success-detail-row">
                <span>Тренировка</span>
                <span>{{ store.selectedClass?.name }}</span>
              </div>
              <div class="success-detail-row">
                <span>Дата</span>
                <span>{{ selectedDate ? formatDate(selectedDate) : '' }}</span>
              </div>
              <div class="success-detail-row">
                <span>Время</span>
                <span>{{ store.selectedClass?.time }}</span>
              </div>
              <div class="success-detail-row">
                <span>Тренер</span>
                <span>{{ store.selectedClass?.instructor }}</span>
              </div>
              <div class="success-detail-row">
                <span>Участник</span>
                <span>{{ store.firstName }} {{ store.lastName }}</span>
              </div>
            </div>

            <div class="success-ref">
              Номер бронирования: <strong>{{ store.bookingRef }}</strong>
            </div>

            <div class="success-note">
              Возьмите с собой спортивную форму, полотенце и воду.<br>
              Приходите за 10 минут до начала занятия.
            </div>

            <button class="btn-primary success-close-btn" @click="onSuccessClose">
              Отлично, закрыть
            </button>
          </div>

        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
/* Modal box */
.modal {
  background: var(--bg-3);
  border: 1px solid var(--border-2);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
}
/* Header */
.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
  position: sticky;
  top: 0;
  background: var(--bg-3);
  z-index: 1;
  border-bottom: 1px solid transparent;
}
.modal__progress {
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;
  flex: 1;
}
.modal__progress-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  flex: 1;
  position: relative;
  z-index: 1;
}
.step-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-3);
  flex-shrink: 0;
  transition: all 0.3s;
}
.modal__progress-step.active .step-num {
  background: var(--red);
  border-color: var(--red);
  color: white;
}
.modal__progress-step.done .step-num {
  background: #2a9d8f;
  border-color: #2a9d8f;
  color: white;
}
.step-label {
  font-size: 12px;
  color: var(--text-3);
  font-weight: 500;
}
.modal__progress-step.active .step-label { color: var(--text); }
.modal__progress-step.done .step-label { color: var(--text-2); }
.progress-line {
  position: absolute;
  left: 26px;
  right: 26px;
  top: 50%;
  height: 2px;
  background: var(--border);
  z-index: 0;
}
.progress-line__fill {
  height: 100%;
  background: var(--red);
  transition: width 0.4s ease;
}
.modal__close {
  background: none;
  color: var(--text-3);
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
  flex-shrink: 0;
  margin-left: 12px;
}
.modal__close:hover {
  color: var(--text);
  background: rgba(255,255,255,0.06);
}
/* Body */
.modal__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal__title {
  font-size: 22px;
  font-weight: 700;
}
.modal__subtitle {
  font-size: 14px;
  color: var(--text-2);
  margin-top: -12px;
}
/* Footer */
.modal__footer {
  display: flex;
  gap: 12px;
  padding-top: 8px;
}
.modal__btn-full {
  width: 100%;
  justify-content: center;
  font-size: 15px;
  padding: 14px;
}
.modal__footer .btn-primary, .modal__footer .btn-secondary {
  flex: 1;
  justify-content: center;
}
.modal__footer .btn-secondary {
  flex: 0 0 auto;
  padding: 12px 20px;
}

/* Class picker */
.class-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 360px;
  overflow-y: auto;
  padding-right: 4px;
}
.class-pick-item {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 12px 12px 8px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}
.class-pick-item:hover:not(.full) {
  border-color: var(--border-2);
  background: var(--bg-3);
}
.class-pick-item.selected {
  border-color: var(--red);
  background: rgba(230, 57, 70, 0.05);
}
.class-pick-item.full {
  opacity: 0.5;
  cursor: not-allowed;
}
.class-pick-accent {
  width: 3px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-right: 12px;
  align-self: stretch;
}
.class-pick-body { flex: 1; }
.class-pick-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.class-pick-type {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}
.class-pick-name {
  font-size: 14px;
  font-weight: 600;
  margin: 2px 0;
}
.class-pick-meta {
  font-size: 12px;
  color: var(--text-3);
}
.class-pick-price {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}
.class-pick-full {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;
  font-weight: 600;
  background: rgba(230, 57, 70, 0.15);
  color: var(--red);
  padding: 2px 8px;
  border-radius: 4px;
}
.class-pick-check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Booking summary */
.booking-summary {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  position: relative;
}
.summary-accent {
  width: 3px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.summary-body { flex: 1; padding-left: 6px; }
.summary-name { font-size: 14px; font-weight: 600; }
.summary-meta { font-size: 12px; color: var(--text-3); }
.summary-price { font-size: 18px; font-weight: 700; }

/* Calendar */
.calendar {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
}
.calendar__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.cal-nav {
  background: none;
  color: var(--text-2);
  padding: 6px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.cal-nav:hover { color: var(--text); background: rgba(255,255,255,0.06); }
.cal-month {
  font-size: 14px;
  font-weight: 600;
  text-transform: capitalize;
}
.calendar__dow {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}
.calendar__dow span {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
  padding: 4px 0;
}
.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.cal-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  background: none;
  color: var(--text-2);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
}
.cal-day:hover:not(:disabled):not(.selected) {
  background: rgba(255,255,255,0.06);
  color: var(--text);
}
.cal-day.today:not(.selected) {
  border-color: var(--red);
  color: var(--red);
}
.cal-day.selected {
  background: var(--red);
  color: white;
  border-color: var(--red);
}
.cal-day.past, .cal-day:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
.cal-day.empty {
  cursor: default;
}
.cal-selected-label {
  margin-top: 12px;
  font-size: 13px;
  color: var(--text-2);
  text-align: center;
  text-transform: capitalize;
}

/* Form fields */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}
.form-field input {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 15px;
  padding: 11px 14px;
  transition: border-color 0.2s;
  width: 100%;
}
.form-field input:focus {
  border-color: var(--red);
  outline: none;
}
.form-field.error input {
  border-color: #ff4d5a;
}
.error-msg {
  font-size: 12px;
  color: #ff4d5a;
}

/* Order summary */
.order-summary {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.order-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-2);
}
.order-row-label { color: var(--text-3); }
.order-divider { height: 1px; background: var(--border); }
.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}

/* Stripe section */
.stripe-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.stripe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stripe-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
}
.test-cards-toggle {
  font-size: 12px;
  color: var(--red);
  background: none;
  text-decoration: underline;
  cursor: pointer;
}
.test-cards {
  background: rgba(42, 157, 143, 0.08);
  border: 1px solid rgba(42, 157, 143, 0.25);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-size: 13px;
}
.test-cards-title {
  font-weight: 600;
  color: #4ecdc4;
  margin-bottom: 8px;
}
.test-card-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.tc-label { color: var(--text-2); min-width: 120px; }
.test-card-item code {
  background: rgba(255,255,255,0.08);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  letter-spacing: 1px;
  font-size: 13px;
}
.test-card-note {
  font-size: 12px;
  color: var(--text-3);
  margin-top: 4px;
}
.stripe-card-element {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  min-height: 50px;
  transition: border-color 0.2s;
}
.stripe-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  font-size: 13px;
  color: var(--text-3);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
.stripe-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-2);
  border-top-color: var(--red);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.stripe-error {
  font-size: 13px;
  color: #ff4d5a;
}
.stripe-trust {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-3);
  justify-content: center;
}
.payment-error {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.3);
  color: #ff6b75;
  font-size: 13px;
  padding: 12px;
  border-radius: var(--radius-sm);
}
.pay-btn {
  flex: 1;
  justify-content: center;
}
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success */
.success-body {
  align-items: center;
  text-align: center;
  padding: 40px 24px;
  gap: 16px;
}
.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2a9d8f, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 12px rgba(42, 157, 143, 0.1);
}
.success-title {
  font-size: 26px;
  font-weight: 800;
}
.success-subtitle {
  font-size: 15px;
  color: var(--text-2);
}
.success-details {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.success-detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--border);
}
.success-detail-row:last-child { border-bottom: none; }
.success-detail-row span:first-child { color: var(--text-2); }
.success-detail-row span:last-child { font-weight: 600; }
.success-ref {
  font-size: 13px;
  color: var(--text-2);
  background: var(--bg-card);
  border: 1px dashed var(--border-2);
  border-radius: var(--radius-sm);
  padding: 10px 20px;
}
.success-ref strong {
  color: var(--text);
  font-family: monospace;
  letter-spacing: 1px;
}
.success-note {
  font-size: 13px;
  color: var(--text-3);
  line-height: 1.6;
}
.success-close-btn {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 15px;
}

@media (max-width: 480px) {
  .modal-overlay { padding: 0; align-items: flex-end; }
  .modal {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    max-height: 92vh;
  }
  .form-row { grid-template-columns: 1fr; }
  .modal__footer .btn-secondary { flex: 0 0 auto; }
}
</style>
