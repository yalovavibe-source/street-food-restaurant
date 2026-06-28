import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TrainingClass, BookingStep } from '../types'

export const useBookingStore = defineStore('booking', () => {
  const isOpen = ref(false)
  const step = ref<BookingStep>('class')

  const selectedClass = ref<TrainingClass | null>(null)
  const selectedDate = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const phone = ref('')
  const email = ref('')
  const bookingRef = ref('')

  function openBooking(trainingClass?: TrainingClass) {
    if (trainingClass) {
      selectedClass.value = trainingClass
      step.value = 'info'
    } else {
      step.value = 'class'
    }
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeBooking() {
    isOpen.value = false
    document.body.style.overflow = ''
  }

  function resetBooking() {
    selectedClass.value = null
    selectedDate.value = ''
    firstName.value = ''
    lastName.value = ''
    phone.value = ''
    email.value = ''
    bookingRef.value = ''
    step.value = 'class'
  }

  function goToStep(s: BookingStep) {
    step.value = s
  }

  function setSuccess() {
    bookingRef.value = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    step.value = 'success'
  }

  return {
    isOpen,
    step,
    selectedClass,
    selectedDate,
    firstName,
    lastName,
    phone,
    email,
    bookingRef,
    openBooking,
    closeBooking,
    resetBooking,
    goToStep,
    setSuccess,
  }
})
