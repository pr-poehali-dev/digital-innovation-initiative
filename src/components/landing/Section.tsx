import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"

const ACCENT = "#FF4D00"

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
})

const animX = (delay = 0) => ({
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
})

const animScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, delay },
})

function HeroSection({ isActive }: { isActive: boolean }) {
  return (
    <section id="hero" className="relative h-screen w-full snap-start flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />
      <div className="relative z-20 flex flex-col items-center text-center px-8">
        <motion.p
          className="text-sm md:text-base tracking-[0.4em] uppercase mb-4"
          style={{ color: ACCENT }}
          {...anim(0)}
        >
          Монтаж, который продаёт
        </motion.p>
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tight text-white leading-none"
          {...anim(0.1)}
        >
          VILMORT
        </motion.h1>
        <motion.div className="mt-10" {...anim(0.3)}>
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <span>Листай вниз</span>
            <Icon name="ChevronDown" size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProblemSection({ isActive }: { isActive: boolean }) {
  const problems = [
    { icon: "TrendingDown", text: "Видео не набирают просмотры" },
    { icon: "ShoppingCartX", text: "Нет заявок с контента" },
    { icon: "Eye", text: "Выглядит дёшево и непрофессионально" },
  ]

  return (
    <section id="problem" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Узнаёшь себя?
      </motion.p>
      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl text-white mb-12"
        {...anim(0.1)}
      >
        Твои видео выглядят дёшево?
      </motion.h2>
      <div className="flex flex-col gap-4">
        {problems.map((p, i) => (
          <motion.div key={p.icon} className="flex items-center gap-4" {...animX(0.2 + i * 0.12)}>
            <span className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: ACCENT }}>
              <Icon name={p.icon} size={18} style={{ color: ACCENT }} />
            </span>
            <span className="text-lg md:text-xl text-neutral-300">{p.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SolutionSection({ isActive }: { isActive: boolean }) {
  const points = [
    { icon: "Scissors", label: "Умный монтаж", desc: "Структура и ритм удерживают зрителя до конца" },
    { icon: "Palette", label: "Визуальный стиль", desc: "Цвета, шрифты, переходы — всё в едином языке бренда" },
    { icon: "BarChart2", label: "Конверсия", desc: "Контент, который превращает просмотры в клиентов" },
  ]

  return (
    <section id="solution" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Наше решение
      </motion.p>
      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl text-white mb-12"
        {...anim(0.1)}
      >
        Монтаж, который работает на тебя.
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {points.map((p, i) => (
          <motion.div
            key={p.icon}
            className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/50 backdrop-blur-sm"
            {...anim(0.2 + i * 0.12)}
          >
            <Icon name={p.icon} size={28} style={{ color: ACCENT }} className="mb-4" />
            <p className="text-white font-semibold text-lg mb-2">{p.label}</p>
            <p className="text-neutral-400 text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ResultsSection({ isActive }: { isActive: boolean }) {
  const stats = [
    { value: "120+", label: "Проектов сдано" },
    { value: "×3.5", label: "Среднее увеличение просмотров" },
    { value: "40+", label: "Постоянных клиентов" },
    { value: "2 дня", label: "Средний срок сдачи" },
  ]
  const brands = ["Nike", "Reels Agency", "ProSport", "TechHub", "MediaOne"]

  return (
    <section id="results" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Цифры говорят сами
      </motion.p>
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-10" {...anim(0.1)}>
        Наши результаты.
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mb-12">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...anim(0.15 + i * 0.1)}>
            <p className="text-4xl md:text-5xl font-black" style={{ color: ACCENT }}>{s.value}</p>
            <p className="text-neutral-400 text-sm mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div {...anim(0.6)}>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Работали с</p>
        <div className="flex flex-wrap gap-4">
          {brands.map((b) => (
            <span key={b} className="border border-neutral-700 rounded-full px-4 py-1 text-neutral-400 text-sm">{b}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function PortfolioSection({ isActive }: { isActive: boolean }) {
  const works = [
    { title: "Рекламный ролик", tag: "Коммерция", dur: "1:20" },
    { title: "YouTube-шоу", tag: "Блог", dur: "12:40" },
    { title: "Stories-серия", tag: "Instagram", dur: "0:30" },
    { title: "Event-видео", tag: "Мероприятие", dur: "3:10" },
    { title: "Продуктовый тизер", tag: "Реклама", dur: "0:45" },
    { title: "Корпоративный фильм", tag: "B2B", dur: "5:00" },
  ]

  return (
    <section id="portfolio" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Портфолио
      </motion.p>
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-8" {...anim(0.1)}>
        Примеры работ.
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
        {works.map((w, i) => (
          <motion.div
            key={w.title}
            className="group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/60 aspect-video flex items-end p-4 cursor-pointer hover:border-[#FF4D00] transition-colors"
            {...animScale(0.1 + i * 0.08)}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
              <Icon name="Play" size={32} className="text-white" />
            </div>
            <div>
              <span className="text-xs px-2 py-0.5 rounded-full border mb-1 inline-block" style={{ borderColor: ACCENT, color: ACCENT }}>{w.tag}</span>
              <p className="text-white text-sm font-medium">{w.title}</p>
              <p className="text-neutral-500 text-xs">{w.dur}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection({ isActive }: { isActive: boolean }) {
  const reviews = [
    { name: "Алексей К.", role: "Основатель ProSport", text: "После перехода на монтаж от Vilmort просмотры выросли втрое. Контент стал выглядеть как у топ-блогеров." },
    { name: "Марина Д.", role: "SMM-директор TechHub", text: "Быстро, чётко, с душой. Сдают в срок и сразу понимают задачу. Работаем уже год." },
    { name: "Игорь В.", role: "YouTube-блогер, 400K", text: "Vilmort вытащили мой канал из застоя. Новый стиль монтажа — и подписчики сами пишут, что стало иначе." },
  ]

  return (
    <section id="testimonials" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Отзывы
      </motion.p>
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-10" {...anim(0.1)}>
        Что говорят клиенты.
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/50"
            {...anim(0.15 + i * 0.12)}
          >
            <Icon name="Quote" size={20} style={{ color: ACCENT }} className="mb-4 opacity-60" />
            <p className="text-neutral-300 text-sm leading-relaxed mb-5">"{r.text}"</p>
            <p className="text-white font-semibold text-sm">{r.name}</p>
            <p className="text-neutral-500 text-xs">{r.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProcessSection({ isActive }: { isActive: boolean }) {
  const steps = [
    { num: "01", title: "Бриф", desc: "Заполняешь форму или созваниваемся — разбираем задачу, стиль и сроки" },
    { num: "02", title: "Исходники", desc: "Загружаешь материалы в удобный для тебя способ" },
    { num: "03", title: "Монтаж", desc: "Команда приступает — первая версия готова за 1–2 дня" },
    { num: "04", title: "Правки", desc: "До 3 итераций правок включены. Сдаём файл в любом формате" },
  ]

  return (
    <section id="process" className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Процесс
      </motion.p>
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white mb-10" {...anim(0.1)}>
        Как мы работаем.
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
        {steps.map((s, i) => (
          <motion.div key={s.num} className="flex-1" {...anim(0.15 + i * 0.12)}>
            <p className="text-3xl font-black mb-3" style={{ color: ACCENT }}>{s.num}</p>
            <p className="text-white font-semibold text-lg mb-2">{s.title}</p>
            <p className="text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CTASection({ isActive, buttonText, buttonHref }: { isActive: boolean; buttonText?: string; buttonHref?: string }) {
  return (
    <section id="cta" className="relative h-screen w-full snap-start flex flex-col items-center justify-center text-center px-8">
      <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }} {...anim(0)}>
        Старт за 2 дня
      </motion.p>
      <motion.h2
        className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight max-w-3xl mb-6"
        {...anim(0.1)}
      >
        Готов к мощному контенту?
      </motion.h2>
      <motion.p className="text-lg text-neutral-400 max-w-xl mb-10" {...anim(0.2)}>
        Оставь заявку — расскажем о задачах, подберём формат и стартуем в течение 2 дней.
      </motion.p>
      <motion.div {...anim(0.35)}>
        <Button
          asChild
          size="lg"
          className="text-black font-bold text-base px-10 py-6 tracking-widest uppercase hover:opacity-90 transition-opacity"
          style={{ backgroundColor: ACCENT, border: 'none' }}
        >
          <a href={buttonHref || '#'} target="_blank" rel="noopener noreferrer">
            {buttonText || 'ЗАКАЗАТЬ МОНТАЖ'}
          </a>
        </Button>
      </motion.div>
    </section>
  )
}

export default function Section({ id, variant, title, subtitle, content, isActive, showButton, buttonText, buttonHref }: SectionProps & { variant: string }) {
  if (variant === 'hero') return <HeroSection isActive={isActive} />
  if (variant === 'problem') return <ProblemSection isActive={isActive} />
  if (variant === 'solution') return <SolutionSection isActive={isActive} />
  if (variant === 'results') return <ResultsSection isActive={isActive} />
  if (variant === 'portfolio') return <PortfolioSection isActive={isActive} />
  if (variant === 'testimonials') return <TestimonialsSection isActive={isActive} />
  if (variant === 'process') return <ProcessSection isActive={isActive} />
  if (variant === 'cta') return <CTASection isActive={isActive} buttonText={buttonText} buttonHref={buttonHref} />

  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24">
      <motion.h2 className="text-4xl md:text-6xl font-bold text-white" {...anim(0)}>
        {title}
      </motion.h2>
      {content && (
        <motion.p className="text-lg md:text-xl mt-6 text-neutral-400 max-w-2xl" {...anim(0.2)}>
          {content}
        </motion.p>
      )}
    </section>
  )
}
