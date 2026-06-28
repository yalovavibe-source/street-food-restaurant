import { motion } from 'framer-motion'
import type { MenuItem } from '../types/menu'

interface MenuCardProps {
  item: MenuItem
  index: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function MenuCard({ item, index }: MenuCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-brand-cream/10 bg-brand-charcoal"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />

        <div className="absolute left-3 top-3 flex gap-2">
          {item.popular && (
            <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
              Хит
            </span>
          )}
          {item.spicy && (
            <span className="rounded-full bg-brand-dark/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange backdrop-blur-sm">
              Острое
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-brand-orange px-4 py-1.5 font-display text-xl text-brand-dark">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-2xl tracking-wide text-brand-cream transition-colors group-hover:text-brand-orange">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-cream/60">
          {item.description}
        </p>
      </div>
    </motion.article>
  )
}
