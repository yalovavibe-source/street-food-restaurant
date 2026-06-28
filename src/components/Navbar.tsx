import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollToSection } from '../utils/scrollTo'

const navLinks = [
  { id: 'home', label: 'Главная' },
  { id: 'menu', label: 'Меню' },
  { id: 'about', label: 'О нас' },
  { id: 'contact', label: 'Контакты' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id: string) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2"
          aria-label="На главную"
        >
          <span className="font-display text-3xl tracking-wider text-brand-orange transition-colors group-hover:text-brand-amber sm:text-4xl">
            ULITSA
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-brand-cream/50 sm:inline">
            Стрит-фуд
          </span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="relative text-sm font-medium uppercase tracking-widest text-brand-cream/70 transition-colors hover:text-brand-orange"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => handleNavClick('menu')}
          className="hidden rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand-dark transition-all hover:bg-brand-amber hover:shadow-lg hover:shadow-brand-orange/30 md:block"
        >
          Заказать
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-cream/20 md:hidden"
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={mobileOpen}
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-brand-cream transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 bg-brand-cream transition-all ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-brand-cream transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-brand-cream/10 bg-brand-charcoal md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium uppercase tracking-widest text-brand-cream/80 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('menu')}
                  className="w-full rounded-full bg-brand-orange py-3 text-sm font-semibold uppercase tracking-wider text-brand-dark"
                >
                  Заказать
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
