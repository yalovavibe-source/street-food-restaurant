export type MenuCategory = 'all' | 'tacos' | 'burgers' | 'sides' | 'drinks'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Exclude<MenuCategory, 'all'>
  image: string
  spicy?: boolean
  popular?: boolean
}
