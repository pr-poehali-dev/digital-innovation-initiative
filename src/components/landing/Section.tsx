import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"
import func2url from "@/func2url.json"

const ACCENT = "#FF4D00"

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
})

const animX = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, delay },
})

const animScale = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, delay },
})

const GLOW = '0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.1)'
const GLOW_STRONG = '0 0 40px rgba(255,255,255,0.35), 0 0 80px rgba(255,255,255,0.15)'

const SOCIAL_ICONS = [
  <svg key="ig" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  <svg key="yt" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  <svg key="tt" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>,
]

const ICON_SIZE = 80
const ROWS = 3

function HeroIconRow({ offset, rowIndex }: { offset: number; rowIndex: number }) {
  const gap = 50
  const count = SOCIAL_ICONS.length * 6
  const trackW = (ICON_SIZE + gap) * SOCIAL_ICONS.length
  const dir = rowIndex % 2 === 0 ? -1 : 1
  const norm = ((offset * dir) % trackW + trackW) % trackW

  return (
    <div className="overflow-hidden w-full flex-shrink-0">
      <div
        className="flex items-center"
        style={{ gap, transform: `translateX(${-norm}px)`, width: (ICON_SIZE + gap) * count }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-shrink-0 opacity-[0.05]" style={{ width: ICON_SIZE, height: ICON_SIZE }}>
            {SOCIAL_ICONS[i % SOCIAL_ICONS.length]}
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroSection({ isActive }: { isActive: boolean }) {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setOffset(p => p + 0.5), 16)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 pointer-events-none select-none overflow-hidden">
        {Array.from({ length: ROWS }).map((_, i) => (
          <HeroIconRow key={i} offset={offset} rowIndex={i} />
        ))}
      </div>
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full">
        <motion.div {...anim(0)} className="mb-4">
          <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase mb-1" style={{ color: ACCENT }}>
            Монтаж для экспертов и бизнеса:
          </p>
          <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase" style={{ color: ACCENT }}>
            Быстрее и качественнее, чем у фрилансеров
          </p>
        </motion.div>
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-none"
          style={{ color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3), 0 0 120px rgba(255,255,255,0.15)' }}
          {...anim(0.1)}
        >
          VILMORT
        </motion.h1>
        <motion.div className="mt-6" {...anim(0.3)}>
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
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Узнаёшь себя?
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 md:mb-10"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        Твои видео выглядят дёшево?
      </motion.h2>
      <div className="flex flex-col gap-3">
        {problems.map((p, i) => (
          <motion.div key={p.icon} className="flex items-center gap-3" {...animX(0.2 + i * 0.1)}>
            <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center flex-shrink-0" style={{ borderColor: ACCENT }}>
              <Icon name={p.icon} size={14} style={{ color: ACCENT }} />
            </span>
            <span className="text-sm md:text-xl text-neutral-300">{p.text}</span>
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
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Наше решение
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl font-bold leading-tight text-white mb-5 md:mb-10"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        Монтаж, который работает на тебя.
      </motion.h2>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.icon}
            className="border border-neutral-800 rounded-xl p-3 md:p-6 bg-neutral-900/50 flex items-center gap-3 md:flex-col md:items-start md:gap-0"
            {...anim(0.15 + i * 0.1)}
          >
            <Icon name={p.icon} size={20} style={{ color: ACCENT }} className="flex-shrink-0 md:mb-3" />
            <div>
              <p className="text-white font-semibold text-sm md:text-lg">{p.label}</p>
              <p className="text-neutral-400 text-xs leading-relaxed hidden md:block mt-1">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ResultsSection({ isActive }: { isActive: boolean }) {
  const stats = [
    { value: "500+", label: "Проектов сдано" },
    { value: "×100", label: "Рост просмотров" },
    { value: "40+", label: "Постоянных клиентов" },
    { value: "1–2 дня", label: "Срок сдачи" },
  ]
  const brands = ["ЖЕЛЕЗНО", "Арсен Маркарян", "Михаил Гребенюк", "Samarth Sammasati"]
  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Цифры говорят сами
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-5 md:mb-8"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        Наши результаты.
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...anim(0.1 + i * 0.08)}>
            <p className="text-2xl md:text-5xl font-black" style={{ color: ACCENT }}>{s.value}</p>
            <p className="text-neutral-400 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div {...anim(0.5)}>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">Работали с</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <span key={b} className="border border-neutral-700 rounded-full px-3 py-1 text-neutral-400 text-xs">{b}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function BeforeAfterSection({ isActive }: { isActive: boolean }) {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Разница очевидна
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-5 md:mb-8"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        БЫЛО — СТАЛО
      </motion.h2>
      <div className="flex flex-row gap-3 md:gap-8 items-start">
        <motion.div className="flex flex-col items-center" {...anim(0.2)}>
          <div className="relative rounded-2xl overflow-hidden border-2 border-neutral-700" style={{ aspectRatio: '9/16', width: 'clamp(90px, 26vw, 220px)' }}>
            <img src="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/679ae59d-91fb-44e7-8f6e-66e8af8fbcbb.jpg" alt="До" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5">
              <Icon name="Eye" size={9} className="text-white" />
              <span className="text-white font-bold text-[10px]">5 789</span>
            </div>
          </div>
          <p className="mt-2 text-neutral-500 text-xs tracking-widest uppercase font-semibold">До</p>
        </motion.div>
        <motion.div className="flex items-center self-center" {...anim(0.3)}>
          <Icon name="ArrowRight" size={18} style={{ color: ACCENT }} />
        </motion.div>
        <motion.div className="flex flex-col items-center" {...anim(0.4)}>
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16', width: 'clamp(90px, 26vw, 220px)', border: `2px solid ${ACCENT}` }}>
            <img src="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/6e6e3bea-44c5-4a87-a9f5-2adb7dccf18f.jpg" alt="После" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5">
              <Icon name="Eye" size={9} className="text-white" />
              <span className="font-black text-[10px]" style={{ color: ACCENT }}>600 тыс.</span>
            </div>
          </div>
          <p className="mt-2 text-xs tracking-widest uppercase font-semibold" style={{ color: ACCENT }}>После</p>
        </motion.div>
      </div>
      <motion.p className="mt-4 text-neutral-500 text-xs leading-relaxed" {...anim(0.5)}>
        Тот же контент — другой монтаж.{' '}
        <span className="whitespace-nowrap">
          Просмотры выросли с{' '}
          <span className="text-white font-semibold">5 789</span>{' '}
          до{' '}
          <span className="font-bold" style={{ color: ACCENT }}>600 000</span>
        </span>
      </motion.p>
    </section>
  )
}

interface Reel { id: number; title: string; video_url: string; cover_url: string | null }

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) } else { v.play(); setPlaying(true) }
  }
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-[#FF4D00] transition-colors flex-shrink-0"
      style={{ aspectRatio: '9/16' }}
      {...animScale(0.05 + index * 0.06)}
      onClick={toggle}
    >
      <video ref={videoRef} src={reel.video_url} poster={reel.cover_url || undefined} className="absolute inset-0 w-full h-full object-cover" loop playsInline preload="metadata" />
      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Icon name={playing ? "Pause" : "Play"} size={18} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}

function PortfolioSection({ isActive }: { isActive: boolean }) {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const url = (func2url as Record<string, string>)['reels-get']
    if (!url) { setLoading(false); return }
    fetch(url).then(r => r.json()).then(d => { setReels(d.reels || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const visible = isMobile ? reels.length : 4
  const canPrev = current > 0
  const canNext = reels.length > 0 && current < reels.length - visible

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(reels.length - visible, c + 1))

  const empty = Array.from({ length: 4 })

  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mb-4 md:mb-6">
        <motion.p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: ACCENT }} {...anim(0)}>
          Портфолио
        </motion.p>
        <motion.h2
          className="text-2xl sm:text-3xl md:text-6xl font-bold text-white"
          style={{ textShadow: GLOW }}
          {...anim(0.1)}
        >
          Уровень нашего монтажа.
        </motion.h2>
      </div>

      {loading && (
        <div className="flex gap-2 px-6 md:px-16 lg:px-24">
          {empty.map((_, i) => (
            <div key={i} className="rounded-2xl bg-neutral-900 animate-pulse flex-shrink-0" style={{ aspectRatio: '9/16', width: 'clamp(70px, 22vw, 160px)' }} />
          ))}
        </div>
      )}

      {!loading && reels.length === 0 && (
        <div className="flex gap-2 px-6 md:px-16 lg:px-24">
          {empty.map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 border-dashed flex-shrink-0 flex flex-col items-center justify-center text-neutral-600" style={{ aspectRatio: '9/16', width: 'clamp(70px, 22vw, 160px)' }}>
              <Icon name="Video" size={16} />
            </div>
          ))}
        </div>
      )}

      {!loading && reels.length > 0 && (
        <div className="relative flex items-center">
          {/* Стрелка влево — только на десктопе */}
          <button
            onClick={prev}
            disabled={!canPrev}
            className="hidden md:flex absolute left-4 z-10 w-10 h-10 rounded-full border border-neutral-700 items-center justify-center text-neutral-400 hover:border-white hover:text-white transition-all disabled:opacity-20 bg-black/50 backdrop-blur-sm"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          {/* Карточки */}
          <div className="flex gap-2 md:gap-3 px-4 md:px-20 overflow-x-auto md:overflow-hidden w-full" style={{ scrollbarWidth: 'none' }}>
            {(typeof window !== 'undefined' && window.innerWidth < 768
              ? reels
              : reels.slice(current, current + visible + 1)
            ).map((r, i) => (
              <div key={r.id} className="flex-shrink-0" style={{ width: 'clamp(70px, 22vw, 160px)' }}>
                <ReelCard reel={r} index={i} />
              </div>
            ))}
          </div>

          {/* Стрелка вправо — только на десктопе */}
          <button
            onClick={next}
            disabled={!canNext}
            className="hidden md:flex absolute right-4 z-10 w-10 h-10 rounded-full border border-neutral-700 items-center justify-center text-neutral-400 hover:border-white hover:text-white transition-all disabled:opacity-20 bg-black/50 backdrop-blur-sm"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      )}
    </section>
  )
}

function TestimonialsSection({ isActive }: { isActive: boolean }) {
  const reviews = [
    { name: "Алексей К.", role: "Маркетолог · Сотрудничаем более 3 месяцев", text: "После перехода на монтаж от Vilmort просмотры выросли втрое. Контент стал выглядеть как у топ-блогеров." },
    { name: "Марина Д.", role: "SMM-директор · Сотрудничаем более 6 месяцев", text: "Быстро, чётко, с душой. Сдают в срок и сразу понимают задачу. Работаем уже год." },
    { name: "Игорь В.", role: "YouTube-блогер, 400K · Сотрудничаем более 1 года", text: "Vilmort вытащили мой канал из застоя. Новый стиль монтажа — и подписчики сами пишут, что стало иначе." },
  ]
  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Отзывы
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-4 md:mb-8"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        Что говорят клиенты.
      </motion.h2>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            className="border border-neutral-800 rounded-xl p-3 md:p-6 bg-neutral-900/50"
            {...anim(0.1 + i * 0.1)}
          >
            <Icon name="Quote" size={14} style={{ color: ACCENT }} className="mb-2 opacity-60" />
            <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-3">"{r.text}"</p>
            <p className="text-white font-semibold text-xs md:text-sm mb-1">{r.name}</p>
            <p className="text-neutral-500 text-xs">{r.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProcessSection({ isActive }: { isActive: boolean }) {
  const steps = [
    { num: "01", title: "Согласование", desc: "Разбираем задачу, стиль и сроки" },
    { num: "02", title: "Исходники", desc: "Загружаешь материалы удобным способом" },
    { num: "03", title: "Монтаж", desc: "Первая версия готова за 1–2 дня" },
    { num: "04", title: "Правки", desc: "До 3 итераций. Сдаём в любом формате" },
  ]
  return (
    <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }} {...anim(0)}>
        Процесс
      </motion.p>
      <motion.h2
        className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-5 md:mb-8"
        style={{ textShadow: GLOW }}
        {...anim(0.1)}
      >
        Как мы работаем.
      </motion.h2>
      <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6">
        {steps.map((s, i) => (
          <motion.div key={s.num} className="md:flex-1" {...anim(0.1 + i * 0.1)}>
            <p className="text-xl md:text-3xl font-black mb-1" style={{ color: ACCENT }}>{s.num}</p>
            <p className="text-white font-semibold text-sm md:text-lg mb-1">{s.title}</p>
            <p className="text-neutral-400 text-xs leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CTASection({ isActive, buttonText, buttonHref }: { isActive: boolean; buttonText?: string; buttonHref?: string }) {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <motion.p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }} {...anim(0)}>
        Старт за 1 день
      </motion.p>
      <motion.h2
        className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-4 md:mb-6"
        style={{ textShadow: GLOW_STRONG }}
        {...anim(0.1)}
      >
        Готов к контенту?
      </motion.h2>
      <motion.p className="text-sm md:text-lg text-neutral-400 max-w-xs md:max-w-xl mb-8" {...anim(0.2)}>
        Напиши в Telegram — сделаем тебе бесплатный разбор и подберём монтаж
      </motion.p>
      <motion.div {...anim(0.3)}>
        <Button
          asChild
          size="lg"
          className="text-white font-bold text-sm md:text-base px-8 md:px-10 py-5 md:py-6 tracking-widest uppercase hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#0088cc', border: 'none' }}
        >
          <a href="https://t.me/ViIlmort" target="_blank" rel="noopener noreferrer">
            {buttonText || 'ОСТАВИТЬ ЗАЯВКУ'}
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
  if (variant === 'before-after') return <BeforeAfterSection isActive={isActive} />
  if (variant === 'portfolio') return <PortfolioSection isActive={isActive} />
  if (variant === 'testimonials') return <TestimonialsSection isActive={isActive} />
  if (variant === 'process') return <ProcessSection isActive={isActive} />
  if (variant === 'cta') return <CTASection isActive={isActive} buttonText={buttonText} buttonHref={buttonHref} />
  return (
    <section id={id} className="relative h-screen w-full flex flex-col justify-center p-6 md:p-16 lg:p-24">
      <motion.h2 className="text-2xl md:text-6xl font-bold text-white" {...anim(0)}>{title}</motion.h2>
      {content && <motion.p className="text-sm md:text-xl mt-4 text-neutral-400 max-w-2xl" {...anim(0.2)}>{content}</motion.p>}
    </section>
  )
}