import type { MenuItem } from '../types/menu'

export const categories = [
  { id: 'all' as const, label: 'Все' },
  { id: 'tacos' as const, label: 'Тако' },
  { id: 'burgers' as const, label: 'Бургеры' },
  { id: 'sides' as const, label: 'Гарниры' },
  { id: 'drinks' as const, label: 'Напитки' },
]

export const menuItems: MenuItem[] = [
  {
    id: 'al-pastor',
    name: 'Аль Пастор',
    description: 'Маринованная свинина, ананас, кинза, лук, зелёная сальса',
    price: 450,
    category: 'tacos',
    image:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=450&fit=crop',
    popular: true,
    spicy: true,
  },
  {
    id: 'carne-asada',
    name: 'Карне Асада',
    description: 'Говядина на гриле, гуакамоле, маринованный лук, лаймовый крем',
    price: 490,
    category: 'tacos',
    image:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=450&fit=crop',
  },
  {
    id: 'fish-taco',
    name: 'Бaja Фиш',
    description: 'Хрустящая треска, капустный салат, чипotle-майо, пico de gallo',
    price: 520,
    category: 'tacos',
    image:
      'https://images.unsplash.com/photo-1512838243191-e81e8f66d192?w=600&h=450&fit=crop',
  },
  {
    id: 'smash-burger',
    name: 'Smash-бургер',
    description: 'Двойная котлета smash, американский сыр, огурчики, фирменный соус',
    price: 690,
    category: 'burgers',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop',
    popular: true,
  },
  {
    id: 'double-smash',
    name: 'Дабл Smash',
    description: 'Две котлеты, бекон-джем, чеддер, карамелизированный лук',
    price: 890,
    category: 'burgers',
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=450&fit=crop',
  },
  {
    id: 'veggie-burger',
    name: 'Уличный вегги',
    description: 'Котлета из чёрной фасоли, авокадо, запечённые перцы, чипotle-айоли',
    price: 590,
    category: 'burgers',
    image:
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&h=450&fit=crop',
  },
  {
    id: 'loaded-fries',
    name: 'Фри с начинкой',
    description: 'Хрустящий картофель, queso, халапеньо, pico, сметана',
    price: 390,
    category: 'sides',
    image:
      'https://images.unsplash.com/photo-1573080496219-bf080d1e5294?w=600&h=450&fit=crop',
    spicy: true,
  },
  {
    id: 'elote',
    name: 'Элоте в стакане',
    description: 'Уличная кукуруза, cotija, масло чили-лайм, tajín',
    price: 320,
    category: 'sides',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=450&fit=crop',
    popular: true,
  },
  {
    id: 'churros',
    name: 'Чуррос',
    description: 'Корица и сахар, соус dulce de leche для макания',
    price: 290,
    category: 'sides',
    image:
      'https://images.unsplash.com/photo-1626087927383-3645153000db?w=600&h=450&fit=crop',
  },
  {
    id: 'horchata',
    name: 'Орчата',
    description: 'Домашнее рисовое молоко с корицей и ванилью',
    price: 250,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&h=450&fit=crop',
  },
  {
    id: 'jarritos',
    name: 'Jarritos',
    description: 'Мексиканская газировка — тамаринд, мандарин или грейпфрут',
    price: 220,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&h=450&fit=crop',
  },
  {
    id: 'agua-fresca',
    name: 'Agua Fresca',
    description: 'Фруктовая вода дня — спроси у официанта',
    price: 250,
    category: 'drinks',
    image:
      'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=450&fit=crop',
  },
]
