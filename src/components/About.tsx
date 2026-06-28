import { motion } from 'framer-motion'

const highlights = [
  {
    title: 'Открытый огонь',
    description:
      'Каждый тако и бургер проходит через планчу или гриль — без компромиссов.',
  },
  {
    title: 'Локальные продукты',
    description:
      'Овощи с соседних рынков, мясо от проверенных мясников.',
  },
  {
    title: 'До поздна',
    description:
      'Кухня работает до 23:00. Послебарные перекусы — всегда добро пожаловать.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-orange/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=600&fit=crop"
                    alt="Повар готовит стрит-фуд"
                    className="h-48 w-full object-cover sm:h-64"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=400&fit=crop"
                    alt="Интерьер ресторана"
                    className="h-36 w-full object-cover sm:h-44"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=700&fit=crop"
                    alt="Атмосфера зала"
                    className="h-56 w-full object-cover sm:h-72"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-brand-orange/30 bg-brand-charcoal p-6 shadow-xl sm:block">
              <p className="font-display text-4xl text-brand-orange">5</p>
              <p className="text-sm text-brand-cream/60">Лет на улице</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
              О нас
            </p>
            <h2 className="mt-3 font-display text-5xl tracking-wide text-brand-cream sm:text-6xl">
              СТРИТ-ФУД,
              <br />
              <span className="text-brand-orange">КАК НАДО</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/70">
              ULITSA начиналась как один фуд-трак на московском переулке — место,
              где соседи собирались за честной едой, громкой музыкой и без
              понтов. Сегодня та же энергия живёт в кирпичном зале, но правила
              те же: яркие вкусы, честные цены, ешь руками.
            </p>
            <p className="mt-4 leading-relaxed text-brand-cream/60">
              Меню — микс мексиканских уличных традиций и американской
              бургер-культуры, отфильтрованный через то, что мы сами хотим есть
              в 22:00 в пятницу. Вся философия — в этом.
            </p>

            <div className="mt-10 space-y-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 border-l-2 border-brand-orange pl-5"
                >
                  <div>
                    <h3 className="font-display text-xl tracking-wide text-brand-cream">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-cream/60">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
