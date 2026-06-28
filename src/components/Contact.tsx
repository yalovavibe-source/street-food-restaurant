import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-brand-cream/10 bg-brand-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-4xl tracking-wider text-brand-orange">
              ULITSA
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-cream/60">
              Яркий стрит-фуд с душой. Приходи голодным — уходи довольным.
              Без записи, всегда рады.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-cream">
              Как нас найти
            </h3>
            <address className="mt-4 space-y-2 not-italic text-brand-cream/60">
              <p>ул. Арбат, 42</p>
              <p>Москва, 119019</p>
              <p className="pt-2">
                <a
                  href="tel:+74951234567"
                  className="transition-colors hover:text-brand-orange"
                >
                  +7 (495) 123-45-67
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@ulitsa.street"
                  className="transition-colors hover:text-brand-orange"
                >
                  hello@ulitsa.street
                </a>
              </p>
            </address>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-cream">
              Часы работы
            </h3>
            <ul className="mt-4 space-y-2 text-brand-cream/60">
              <li className="flex justify-between gap-4">
                <span>Пн – Чт</span>
                <span>12:00 – 22:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Пт – Сб</span>
                <span>12:00 – 23:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Воскресенье</span>
                <span>12:00 – 21:00</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-brand-cream/40">
            © {new Date().getFullYear()} ULITSA Стрит-фуд. Все права защищены.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Telegram', 'VK'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-medium uppercase tracking-widest text-brand-cream/40 transition-colors hover:text-brand-orange"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
