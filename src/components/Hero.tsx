import { motion } from 'framer-motion'
import { scrollToSection } from '../utils/scrollTo'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/70 to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.15),transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange"
          >
            Улица · Стрит-фуд · с 2019
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.5rem,11vw,7.5rem)] leading-[0.95] tracking-wide text-brand-cream"
          >
            ЯРКИЕ
            <br />
            <span className="text-brand-orange">ВКУСЫ</span>
            <br />
            ПРЯМО С УЛИЦЫ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-brand-cream/70"
          >
            Тако до поздней ночи, smash-бургеры и уличная классика на открытом
            огне. Без брони — просто приходи голодным.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToSection('menu')}
              className="rounded-full bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-dark transition-all hover:bg-brand-amber hover:shadow-xl hover:shadow-brand-orange/25"
            >
              Смотреть меню
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="rounded-full border-2 border-brand-cream/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-cream transition-all hover:border-brand-orange hover:text-brand-orange"
            >
              Наша история
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 flex gap-8 border-t border-brand-cream/10 pt-8"
          >
            {[
              { value: '12+', label: 'Блюд в меню' },
              { value: '4.9', label: 'Рейтинг' },
              { value: '23:00', label: 'До поздна' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-brand-orange">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-brand-cream/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-cream/10 shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop"
              alt="Стрит-фуд: тако и бургеры"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 rounded-xl border border-brand-orange/30 bg-brand-charcoal px-6 py-4 shadow-xl"
          >
            <p className="font-display text-2xl text-brand-orange">ОТКРЫТО</p>
            <p className="text-sm text-brand-cream/60">Ежедневно 12:00 – 23:00</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
