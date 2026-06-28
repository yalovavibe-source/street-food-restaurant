export type ClassType = 'boxing' | 'mma' | 'wrestling' | 'kickboxing' | 'bjj' | 'muaythai' | 'open'
export type Level = 'beginner' | 'intermediate' | 'advanced' | 'all'
export type BookingStep = 'class' | 'info' | 'payment' | 'success'

export interface TrainingClass {
  id: string
  name: string
  type: ClassType
  instructor: string
  time: string
  endTime: string
  duration: number
  maxCapacity: number
  bookedCount: number
  level: Level
  price: number
  description: string
  color: string
}

export interface DaySchedule {
  dayIndex: number
  dayKey: string
  dayName: string
  shortName: string
  classes: TrainingClass[]
}

export interface BookingFormData {
  selectedClass: TrainingClass | null
  selectedDate: string
  firstName: string
  lastName: string
  phone: string
  email: string
}

export interface Coach {
  id: string
  name: string
  title: string
  bio: string
  specializations: string[]
  experience: number
  achievements: string[]
}

export const CLASS_TYPE_NAMES: Record<ClassType, string> = {
  boxing: 'Бокс',
  mma: 'ММА',
  wrestling: 'Борьба',
  kickboxing: 'Кикбоксинг',
  bjj: 'Джиу-джитсу',
  muaythai: 'Муай Тай',
  open: 'Открытая',
}

export const LEVEL_NAMES: Record<Level, string> = {
  beginner: 'Новичок',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
  all: 'Все уровни',
}

export const CLASS_COLORS: Record<ClassType, string> = {
  boxing: '#e63946',
  mma: '#ff6b35',
  wrestling: '#2a9d8f',
  kickboxing: '#e9c46a',
  bjj: '#457b9d',
  muaythai: '#9d4edd',
  open: '#4ecdc4',
}
