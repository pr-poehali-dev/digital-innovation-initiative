import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"
import func2url from "@/func2url.json"

const ACCENT = "#FF4D00"
const BLUE_GLOW = "#00BFFF"

const SOCIAL_ICONS = [
  <svg key="ig" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  <svg key="yt" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  <svg key="tt" viewBox="0 0 24 24" className="fill-white w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>,
]

const ICON_SIZE = 140
const ROWS = 4

function HeroIconRow({ offset, rowIndex }: { offset: number; rowIndex: number }) {
  const gap = 60
  const count = SOCIAL_ICONS.length * 10
  const trackW = (ICON_SIZE + gap) * SOCIAL_ICONS.length

  const norm = ((offset) % trackW + trackW) % trackW

  return (
    <div className="overflow-hidden w-full flex-shrink-0">
      <div
        className="flex items-center"
        style={{ gap, transform: `translateX(${-norm}px)`, width: (ICON_SIZE + gap) * count }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex-shrink-0 opacity-[0.04]" style={{ width: ICON_SIZE, height: ICON_SIZE }}>
            {SOCIAL_ICONS[i % SOCIAL_ICONS.length]}
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setOffset(p => p + 0.3), 16)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 pointer-events-none select-none overflow-hidden">
        {Array.from({ length: ROWS }).map((_, i) => (
          <HeroIconRow key={i} offset={offset} rowIndex={i} />
        ))}
      </div>
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full">
        <div className="mb-10 md:mb-20">
          <p className="text-[11px] md:text-base font-light tracking-[0.2em] md:tracking-[0.3em] uppercase leading-relaxed" style={{ color: ACCENT }}>
            Видео, которые удерживают внимание<br />и приводят клиентов
          </p>
        </div>
        <h1
          className="text-[2.8rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-none"
          style={{ color: '#fff', textShadow: '0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3), 0 0 120px rgba(255,255,255,0.15)' }}
        >
          VILMORT
        </h1>
        <p className="mt-8 text-neutral-300 text-sm md:text-base font-light tracking-wide">
          Хочешь пробный монтаж?
        </p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1 text-neutral-400 text-xs animate-bounce">
            <Icon name="ChevronDown" size={20} />
            <span className="tracking-widest uppercase text-[10px]">Пиши нам</span>
          </div>
          <a
            href="https://t.me/m/-GL9C5AQOWQy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white font-bold text-sm md:text-base px-8 py-4 tracking-widest uppercase rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`,
              boxShadow: `0 0 10px ${ACCENT}99, 0 0 30px ${ACCENT}66, 0 0 60px ${ACCENT}40`,
            }}
          >
            <Icon name="Send" size={18} />
            Написать в телеграм
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 opacity-30 animate-bounce pointer-events-none">
        <Icon name="ChevronDown" size={28} className="text-white" />
        <Icon name="ChevronDown" size={20} className="text-white opacity-60" />
      </div>
    </section>
  )
}

function ProblemSection() {
  const problems = [
    { icon: "TrendingDown", text: "Видео не набирают просмотры", color: "#FF4D00" },
    { icon: "ShoppingCart", text: "Нет заявок с контента", color: "#FF6B35" },
    { icon: "Eye", text: "Выглядит дёшево и непрофессионально", color: "#FF8C5A" },
  ]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Узнаёшь себя?
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.1)' }}
      >
        Твои видео выглядят дёшево?
      </h2>
      <div className="flex flex-col gap-4">
        {problems.map((p, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style={{ borderColor: p.color, boxShadow: `0 0 20px ${p.color}30` }}>
              <Icon name={p.icon} size={16} style={{ color: p.color }} />
            </span>
            <span className="text-sm md:text-xl text-neutral-300">{p.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SolutionSection() {
  const points = [
    { icon: "Scissors", label: "Умный монтаж", desc: "Структура и ритм удерживают зрителя до конца", gradient: "from-orange-500/20 to-transparent" },
    { icon: "Palette", label: "Визуальный стиль", desc: "Цвета, шрифты, переходы — всё в едином языке бренда", gradient: "from-purple-500/20 to-transparent" },
    { icon: "BarChart2", label: "Конверсия", desc: "Контент, который превращает просмотры в клиентов", gradient: "from-cyan-500/20 to-transparent" },
  ]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Наше решение
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
      >
        Монтаж, который работает на тебя.
      </h2>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
        {points.map((p, i) => (
          <div
            key={i}
            className={`border border-neutral-800 rounded-xl p-4 md:p-6 bg-gradient-to-br ${p.gradient} backdrop-blur-sm hover:border-neutral-600 transition-all hover:scale-[1.02]`}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${ACCENT}20` }}>
              <Icon name={p.icon} size={20} style={{ color: ACCENT }} />
            </div>
            <p className="text-white font-semibold text-base md:text-lg mb-1">{p.label}</p>
            <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ResultsSection() {
  const stats = [
    { value: "500+", label: "Проектов сдано", color: "#FF4D00" },
    { value: "×100", label: "Рост просмотров", color: "#00BFFF" },
    { value: "40+", label: "Постоянных клиентов", color: "#A855F7" },
    { value: "1–2 дня", label: "Срок сдачи", color: "#22C55E" },
  ]
  const brands = ["ЖЕЛЕЗНО", "Арсен Маркарян", "Михаил Гребенюк", "Samarth Sammasati"]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Цифры говорят сами
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
      >
        Наши результаты.
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        {stats.map((s, i) => (
          <div key={i} className="border border-neutral-800 rounded-xl p-4 md:p-6 bg-neutral-900/30 hover:border-neutral-600 transition-all">
            <p className="text-3xl md:text-5xl font-black" style={{ color: s.color, textShadow: `0 0 20px ${s.color}40` }}>{s.value}</p>
            <p className="text-neutral-400 text-xs mt-2">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Работали с</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <span key={b} className="border border-neutral-700 rounded-full px-4 py-1.5 text-neutral-400 text-xs hover:border-neutral-500 transition-colors">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterPair({
  beforeSrc, afterSrc,
  beforeLabel, afterLabel,
  beforeStat, afterStat,
  description,
}: {
  beforeSrc: string; afterSrc: string;
  beforeLabel: string; afterLabel: string;
  beforeStat: string; afterStat: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 md:gap-6 items-start">
        <div className="flex flex-col items-center flex-1">
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-neutral-700 w-full"
            style={{ aspectRatio: '9/16' }}
          >
            <img src={beforeSrc} alt="До" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-0.5">
              <Icon name="Eye" size={9} className="text-white" />
              <span className="text-white font-bold text-[10px]">{beforeStat}</span>
            </div>
          </div>
          <p className="mt-2 text-neutral-500 text-[10px] tracking-widest uppercase font-semibold">{beforeLabel}</p>
        </div>
        <div className="flex items-center self-center flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${ACCENT}20` }}>
            <Icon name="ArrowRight" size={16} style={{ color: ACCENT }} />
          </div>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div
            className="relative rounded-2xl overflow-hidden w-full"
            style={{ aspectRatio: '9/16', border: `2px solid ${ACCENT}`, boxShadow: `0 0 24px ${ACCENT}50, 0 0 60px ${ACCENT}25` }}
          >
            <img src={afterSrc} alt="После" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-0.5">
              <Icon name="Eye" size={9} className="text-white" />
              <span className="font-black text-[10px]" style={{ color: ACCENT }}>{afterStat}</span>
            </div>
          </div>
          <p className="mt-2 text-[10px] tracking-widest uppercase font-semibold" style={{ color: ACCENT }}>{afterLabel}</p>
        </div>
      </div>
      <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function BeforeAfterSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Разница очевидна
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
      >
        БЫЛО — СТАЛО
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <BeforeAfterPair
          beforeSrc="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/679ae59d-91fb-44e7-8f6e-66e8af8fbcbb.jpg"
          afterSrc="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/6e6e3bea-44c5-4a87-a9f5-2adb7dccf18f.jpg"
          beforeLabel="До"
          afterLabel="После"
          beforeStat="5 789"
          afterStat="600 тыс."
          description={<>Тот же контент — другой монтаж. Просмотры выросли с <span className="text-white font-semibold">5 789</span> до <span className="font-bold" style={{ color: ACCENT }}>600 000</span></>}
        />
        <BeforeAfterPair
          beforeSrc="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/87d24af0-814d-45d7-94d3-566edc02346c.jpg"
          afterSrc="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/4a9b7135-f3d7-4a57-9b1e-68a95f4ff3a0.jpg"
          beforeLabel="До"
          afterLabel="После"
          beforeStat="168"
          afterStat="68,3 тыс."
          description={<>Одна и та же съёмка. После перемонтажа охваты выросли с <span className="text-white font-semibold">168</span> до <span className="font-bold" style={{ color: ACCENT }}>68 300</span></>}
        />
      </div>
    </section>
  )
}

interface Reel { id: number; title: string; video_url: string; cover_url: string | null }

function ReelCard({ reel, onExpand }: { reel: Reel; onExpand: (reel: Reel) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) } else { v.play(); setPlaying(true) }
  }
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-[#FF4D00] transition-all"
      style={{ aspectRatio: '9/16' }}
    >
      <video ref={videoRef} src={reel.video_url} poster={reel.cover_url || undefined} className="absolute inset-0 w-full h-full object-cover" loop playsInline preload="metadata" />
      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`} onClick={toggle}>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Icon name={playing ? "Pause" : "Play"} size={16} className="text-white" />
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onExpand(reel) }}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 z-10"
      >
        <Icon name="Maximize2" size={14} className="text-white" />
      </button>
    </div>
  )
}

function VideoModal({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (v) v.play()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-h-[90vh] max-w-[90vw] md:max-w-[400px]" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={reel.video_url}
          poster={reel.cover_url || undefined}
          className="w-full h-full rounded-2xl object-contain"
          style={{ maxHeight: '85vh', aspectRatio: '9/16' }}
          controls
          loop
          playsInline
          autoPlay
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center hover:bg-neutral-700 transition-colors"
        >
          <Icon name="X" size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}

function PortfolioSection() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedReel, setExpandedReel] = useState<Reel | null>(null)

  useEffect(() => {
    const url = (func2url as Record<string, string>)['reels-get']
    if (!url) { setLoading(false); return }
    fetch(url).then(r => r.json()).then(d => { setReels(d.reels || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const empty = Array.from({ length: 6 })

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mb-6 md:mb-10">
        <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: ACCENT }}>
          Портфолио
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white"
          style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
        >
          Уровень нашего монтажа.
        </h2>
      </div>

      {loading && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 px-6 md:px-16 lg:px-24">
          {empty.map((_, i) => (
            <div key={i} className="rounded-2xl bg-neutral-900 animate-pulse" style={{ aspectRatio: '9/16' }} />
          ))}
        </div>
      )}

      {!loading && reels.length === 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 px-6 md:px-16 lg:px-24">
          {empty.map((_, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 border-dashed flex flex-col items-center justify-center text-neutral-600" style={{ aspectRatio: '9/16' }}>
              <Icon name="Video" size={16} />
            </div>
          ))}
        </div>
      )}

      {!loading && reels.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 px-6 md:px-16 lg:px-24">
          {reels.map((r) => (
            <ReelCard key={r.id} reel={r} onExpand={setExpandedReel} />
          ))}
        </div>
      )}

      {expandedReel && (
        <VideoModal reel={expandedReel} onClose={() => setExpandedReel(null)} />
      )}
    </section>
  )
}

interface ChatMessage {
  text: string
  isClient: boolean
  time: string
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className={`flex ${msg.isClient ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs md:text-sm leading-relaxed ${
          msg.isClient
            ? 'bg-[#2b5278] text-white rounded-br-md'
            : 'bg-neutral-800 text-neutral-200 rounded-bl-md'
        }`}
      >
        <p>{msg.text}</p>
        <p className={`text-[10px] mt-1 ${msg.isClient ? 'text-blue-300/60' : 'text-neutral-500'} text-right`}>{msg.time}</p>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const oldReviews = [
    { name: "Алексей К.", role: "Маркетолог · 3+ месяца", text: "После перехода на монтаж от Vilmort просмотры выросли втрое. Контент стал выглядеть как у топ-блогеров." },
    { name: "Марина Д.", role: "SMM-директор · 6+ месяцев", text: "Быстро, чётко, с душой. Сдают в срок и сразу понимают задачу. Работаем уже год." },
    { name: "Игорь В.", role: "YouTube-блогер, 400K · 1+ год", text: "Vilmort вытащили мой канал из застоя. Новый стиль монтажа — и подписчики сами пишут, что стало иначе." },
  ]

  const chatReviews = [
    {
      name: "Дмитрий Р.",
      role: "Основатель EdTech-стартапа",
      avatar: "🚀",
      messages: [
        { text: "Ребят, мне нужен ролик для запуска курса. Бюджет ограничен, но хочу огонь 🔥", isClient: true, time: "14:32" },
        { text: "Сделаем! Скинь исходники, завтра покажем первую версию", isClient: false, time: "14:35" },
        { text: "Уже скинул. Вы реально за день?", isClient: true, time: "14:36" },
        { text: "Готово ✅ Ссылка на превью в чате", isClient: false, time: "15:41" },
        { text: "Это лучше чем я ожидал. Запускаем! Набрали 200 заявок за 3 дня 🤯", isClient: true, time: "18:20" },
      ]
    },
    {
      name: "Анна С.",
      role: "Бьюти-блогер, 150K",
      avatar: "💅",
      messages: [
        { text: "Привет! Мои рилсы набирают 2-3к просмотров максимум. Помогите!", isClient: true, time: "10:15" },
        { text: "Привет, Анна! Посмотрели контент — проблема в первых 3 секундах. Исправим", isClient: false, time: "10:22" },
        { text: "Ваууу, первый рилс после вашего монтажа — 340К просмотров!!!! 😱", isClient: true, time: "11:45" },
        { text: "Это только начало 😉 Готовим следующие 5 роликов", isClient: false, time: "11:50" },
      ]
    },
    {
      name: "Артём Б.",
      role: "Фитнес-тренер, предприниматель",
      avatar: "💪",
      messages: [
        { text: "У меня 3 зала. Нужен контент, который приведёт клиентов. Пока сам снимаю на телефон...", isClient: true, time: "09:00" },
        { text: "Артём, из тех же съёмок на телефон мы сделаем конфетку. Присылай материал!", isClient: false, time: "09:12" },
        { text: "Брат, за месяц 47 новых клиентов пришло с рилсов. Я в шоке 💰", isClient: true, time: "09:30" },
        { text: "Рады! Кстати, по аналитике видео про трансформации заходят лучше всего", isClient: false, time: "09:35" },
        { text: "Делайте больше таких! Бюджет удваиваю 🔥", isClient: true, time: "09:37" },
      ]
    },
  ]

  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Отзывы
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
      >
        Что говорят клиенты.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
        {oldReviews.map((r, i) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-xl p-4 md:p-6 bg-neutral-900/50 hover:border-neutral-600 transition-all"
          >
            <Icon name="Quote" size={14} style={{ color: ACCENT }} className="mb-3 opacity-60" />
            <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mb-4">"{r.text}"</p>
            <p className="text-white font-semibold text-xs md:text-sm mb-1">{r.name}</p>
            <p className="text-neutral-500 text-xs">{r.role}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {chatReviews.map((chat, i) => (
          <div
            key={i}
            className="border border-neutral-800 rounded-xl bg-neutral-900/50 overflow-hidden hover:border-neutral-600 transition-all"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-neutral-900/80">
              <span className="text-xl">{chat.avatar}</span>
              <div>
                <p className="text-white font-semibold text-xs md:text-sm">{chat.name}</p>
                <p className="text-neutral-500 text-[10px]">{chat.role}</p>
              </div>
              <div className="ml-auto flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-3 flex flex-col gap-2 max-h-[280px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {chat.messages.map((msg, j) => (
                <ChatBubble key={j} msg={msg} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Согласование",
      desc: "Разбираем задачу, стиль и сроки",
      badges: [
        { text: "Бесплатный разбор", color: "#22C55E" },
        { text: "15 минут", color: "#00BFFF" },
      ],
      icon: "MessageSquare"
    },
    {
      num: "02",
      title: "Исходники",
      desc: "Загружаешь материалы удобным способом",
      badges: [
        { text: "Telegram / Google Drive", color: "#A855F7" },
        { text: "Любой формат", color: "#FF4D00" },
      ],
      icon: "Upload"
    },
    {
      num: "03",
      title: "Монтаж",
      desc: "Первая версия готова за 1–2 дня",
      badges: [
        { text: "1–2 дня", color: "#FF4D00" },
        { text: "Premiere Pro", color: "#00BFFF" },
        { text: "After Effects", color: "#A855F7" },
      ],
      icon: "Film"
    },
    {
      num: "04",
      title: "Правки",
      desc: "До 3 итераций. Сдаём в любом формате",
      badges: [
        { text: "3 правки бесплатно", color: "#22C55E" },
        { text: "4K готово", color: "#FF4D00" },
      ],
      icon: "CheckCircle"
    },
  ]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>
        Процесс
      </p>
      <h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12"
        style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
      >
        Как мы работаем.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {steps.map((s, i) => (
          <div key={i} className="border border-neutral-800 rounded-xl p-4 md:p-6 bg-neutral-900/30 hover:border-neutral-600 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ACCENT}15` }}>
                <Icon name={s.icon} size={18} style={{ color: ACCENT }} />
              </div>
              <p className="text-2xl md:text-3xl font-black" style={{ color: ACCENT }}>{s.num}</p>
            </div>
            <p className="text-white font-semibold text-sm md:text-lg mb-2">{s.title}</p>
            <p className="text-neutral-400 text-xs leading-relaxed mb-3">{s.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.badges.map((b, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border"
                  style={{
                    color: b.color,
                    borderColor: `${b.color}40`,
                    backgroundColor: `${b.color}10`,
                  }}
                >
                  {b.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection({ buttonText, buttonHref }: { buttonText?: string; buttonHref?: string }) {
  return (
    <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }}>
        Старт за 1 день
      </p>
      <h2
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 md:mb-6"
        style={{ textShadow: '0 0 40px rgba(255,255,255,0.35), 0 0 80px rgba(255,255,255,0.15)' }}
      >
        Хочешь сотрудничать<br />с нами?
      </h2>
      <p className="text-sm md:text-lg text-neutral-400 max-w-xs md:max-w-xl mb-10">
        Напиши нам в Telegram — разберем твой продукт и сделаем монтаж
      </p>
      <a
        href={buttonHref || "https://t.me/m/-GL9C5AQOWQy"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 text-white font-bold text-sm md:text-base px-8 md:px-10 py-4 md:py-5 tracking-widest uppercase rounded-lg transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: BLUE_GLOW,
          boxShadow: `0 0 30px ${BLUE_GLOW}60, 0 0 60px ${BLUE_GLOW}30, 0 0 100px ${BLUE_GLOW}15`,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
        {buttonText || 'ЗАКАЗАТЬ МОНТАЖ'}
      </a>
    </section>
  )
}

export default function Section({ id, variant, title, subtitle, content, isActive, showButton, buttonText, buttonHref }: SectionProps & { variant: string }) {
  if (variant === 'hero') return <HeroSection />
  if (variant === 'problem') return <ProblemSection />
  if (variant === 'solution') return <SolutionSection />
  if (variant === 'results') return <ResultsSection />
  if (variant === 'before-after') return <BeforeAfterSection />
  if (variant === 'portfolio') return <PortfolioSection />
  if (variant === 'testimonials') return <TestimonialsSection />
  if (variant === 'process') return <ProcessSection />
  if (variant === 'cta') return <CTASection buttonText={buttonText} buttonHref={buttonHref} />
  return (
    <section id={id} className="relative w-full py-20 px-6 md:px-16 lg:px-24">
      <h2 className="text-2xl md:text-5xl font-bold text-white">{title}</h2>
      {content && <p className="text-sm md:text-xl mt-4 text-neutral-400 max-w-2xl">{content}</p>}
    </section>
  )
}