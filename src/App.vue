<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SchedulePanel from './components/SchedulePanel.vue'
import CoachesSection from './components/CoachesSection.vue'
import FooterSection from './components/FooterSection.vue'
import BookingModal from './components/BookingModal.vue'
import { useBookingStore } from './stores/booking'

const booking = useBookingStore()
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <SchedulePanel />
    <CoachesSection />
  </main>
  <FooterSection />
  <BookingModal v-if="booking.isOpen" />
</template>
