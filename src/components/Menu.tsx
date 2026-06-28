import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, menuItems } from '../data/menuItems'
import type { MenuCategory } from '../types/menu'
import MenuCard from './MenuCard'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all')

  const filteredItems =
    activeCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="bg-brand-charcoal py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
            Меню
          </p>
          <h2 className="mt-3 font-display text-5xl tracking-wide text-brand-cream sm:text-6xl">
            ВЫБЕРИ СВОЁ
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-cream/60">
            Отфильтруй по категории и найди своё любимое блюдо. Всё готовится
            на месте, подаётся горячим, ешь руками.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className="relative rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {activeCategory === category.id && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeCategory === category.id
                    ? 'text-brand-dark'
                    : 'text-brand-cream/60 hover:text-brand-cream'
                }`}
              >
                {category.label}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <p className="mt-12 text-center text-brand-cream/50">
            В этой категории пока пусто.
          </p>
        )}
      </div>
    </section>
  )
}
