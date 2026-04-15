import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"
import type { SectionProps } from "@/types"
import func2url from "@/func2url.json"

const ACCENT = "#FF4D00"
const TG_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

// ── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* BG image — black & white */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/d46a4a41-9bd9-4861-b8f2-0f557aab094b.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) brightness(0.35)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full">
        <h1 className="text-[2.8rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-none text-white">
          VILMORT
        </h1>
        <h1 className="text-[2.8rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-none text-white -mt-2 md:-mt-4">
          MEDIA
        </h1>
        <p className="mt-6 text-neutral-300 text-sm md:text-base font-light tracking-widest uppercase">
          · Монтаж · Сценарии · Аналитика · Продвижение
        </p>
      </div>

      {/* TG button bottom-left */}
      <a
        href="https://t.me/m/-GL9C5AQOWQy"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 left-8 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}99, 0 0 30px ${ACCENT}66` }}
      >
        {TG_ICON}
      </a>

      {/* Scroll arrow bottom-right */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 opacity-30 animate-bounce pointer-events-none">
        <Icon name="ChevronDown" size={28} className="text-white" />
        <Icon name="ChevronDown" size={20} className="text-white opacity-60" />
      </div>
    </section>
  )
}

// ── PROBLEM ───────────────────────────────────────────────────────────────────

function ProblemSection() {
  const questions = [
    "Видео не набирают просмотры?",
    "Плохая конверсия?",
    "Выглядит дешево?",
    "Сценарий хромает?",
  ]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        {questions.map((q, i) => (
          <div key={i} className="border border-neutral-700 rounded-2xl p-5 md:p-8 bg-white/5 hover:border-neutral-500 transition-all">
            <p className="text-white font-bold text-lg md:text-3xl leading-tight">{q}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── SOLUTION (с видео из портфолио) ──────────────────────────────────────────

interface Reel { id: number; title: string; video_url: string; cover_url: string | null }

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) } else { v.play(); setPlaying(true) }
  }
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-[#FF4D00] transition-all"
      style={{ aspectRatio: '9/16' }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={reel.video_url}
        poster={reel.cover_url || undefined}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        style={{ filter: 'grayscale(100%)' }}
      />
      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Icon name={playing ? "Pause" : "Play"} size={16} className="text-white" />
        </div>
      </div>
    </div>
  )
}

function SolutionSection() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = (func2url as Record<string, string>)['reels-get']
    if (!url) { setLoading(false); return }
    fetch(url).then(r => r.json()).then(d => { setReels(d.reels || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const empty = Array.from({ length: 6 })

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mb-6 md:mb-10">
        <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: ACCENT }}>Наше решение</p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
          Монтаж, который работает на тебя.
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
            <ReelCard key={r.id} reel={r} />
          ))}
        </div>
      )}
    </section>
  )
}

// ── RESULTS ───────────────────────────────────────────────────────────────────

const CLIENT_LOGOS: string[] = [
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/bf75aa40-b95b-4ff3-9fdb-80cfdbef27e8.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/5c6bb1d3-386c-4aca-8e8e-435d04a6c963.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/fe00283c-0ab3-4851-8b5e-b53aa04a36e0.jpg",
]

function ResultsSection() {
  const stats = [
    { value: "500+", label: "Проектов сдано" },
    { value: "×100", label: "Рост просмотров" },
    { value: "40+", label: "Постоянных клиентов" },
    { value: "1–2 дня", label: "Срок сдачи" },
  ]
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Цифры говорят сами</p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-8 md:mb-12">
        Наши результаты.
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
        {stats.map((s, i) => (
          <div key={i} className="border border-neutral-700 rounded-xl p-4 md:p-6 bg-white/5 hover:border-neutral-500 transition-all">
            <p className="text-3xl md:text-5xl font-black text-white">{s.value}</p>
            <p className="text-neutral-400 text-xs mt-2">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Работали с</p>
        <div className="flex flex-wrap items-center gap-4">
          {CLIENT_LOGOS.map((src, i) => (
            <div key={i} className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-neutral-600 flex-shrink-0 bg-neutral-800">
              <img src={src} alt="клиент" className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
            </div>
          ))}
          <span className="text-neutral-400 text-sm font-medium">и др.</span>
        </div>
      </div>
    </section>
  )
}

// ── BEFORE / AFTER ────────────────────────────────────────────────────────────

const RESULT_IMAGES: string[] = [
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/7fea44d3-4d41-4212-8102-187eeb5f5a6a.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/633ddefd-bfac-411a-ac9c-f5839106736b.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/fcb5273e-2c9d-4ec0-a057-a414609858ca.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/f682677e-c17c-4005-b199-86f6648197b6.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/8ade047e-1be3-4ae2-b2b2-b71b5e2036c6.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/c7e3f787-794a-4f2d-9ffc-067c81d6f4c2.jpg",
]

function BeforeAfterSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Разница очевидна</p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-8 md:mb-12">
        РЕЗУЛЬТАТЫ НАШИХ КЛИЕНТОВ
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {RESULT_IMAGES.map((src, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-neutral-900"
            style={{
              border: `2px solid ${ACCENT}80`,
              boxShadow: `0 0 20px ${ACCENT}30, inset 0 0 20px rgba(0,0,0,0.5)`,
              padding: '6px',
            }}
          >
            <img
              src={src}
              alt={`результат ${i + 1}`}
              className="w-full rounded-xl object-cover"
              style={{ filter: 'grayscale(100%)' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────

const REVIEW_IMAGES: string[] = [
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/eba0f5c8-1929-46a8-baf4-57d5f240626c.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/4d51e2d8-e3c1-4e62-becb-6d000d200947.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/0cbdb9df-18d9-4a85-b549-baa624ef2342.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/d9248ddc-f300-4f7d-bfc0-284fbc48e538.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/415330f9-e1b1-4580-a8f6-5c48c7000c1a.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/fa83473f-12bc-45fc-98ba-44eb8e5b1fae.jpg",
  "https://cdn.poehali.dev/projects/b555b565-4c41-4052-8512-2203b8144dac/bucket/d8db0f19-c26b-42fd-b5d7-0a2a8bb65d89.jpg",
]

function TestimonialsSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Отзывы</p>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-10 md:mb-14">
        Что говорят клиенты.
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-8 md:gap-10 space-y-10">
        {REVIEW_IMAGES.map((src, i) => (
          <div
            key={i}
            className="relative bg-white rounded-sm shadow-2xl break-inside-avoid mb-10 inline-block w-full"
            style={{
              transform: `rotate(${[-1.5, 1, -0.8, 1.5, -1, 0.7, -1.2][i % 7]}deg)`,
              transformOrigin: 'top center',
            }}
          >
            {/* Скрепка */}
            <div className="flex justify-center pt-2">
              <div
                className="w-4 h-8 border-[3px] rounded-full -mt-4"
                style={{ borderColor: '#999', background: 'transparent' }}
              />
            </div>
            {/* Дыра */}
            <div className="flex justify-center mt-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            </div>
            <div className="px-3 pb-4">
              <img src={src} alt={`отзыв ${i + 1}`} className="w-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  const services = [
    "Монтаж",
    "Сценарии",
    "Дизайн каруселей",
    "Разбор вашего аккаунта",
    "Подбор контента под вашу нишу",
  ]
  return (
    <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: ACCENT }}>Старт за 1 день</p>
      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
        НАШИ УСЛУГИ
      </h2>
      <div className="flex flex-col items-center gap-2 mb-10">
        {services.map((s, i) => (
          <p key={i} className="text-neutral-300 text-base md:text-xl font-light tracking-wide">
            · {s}
          </p>
        ))}
      </div>
      <a
        href="https://t.me/m/-GL9C5AQOWQy"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 text-white font-bold text-sm md:text-base px-8 md:px-10 py-4 md:py-5 tracking-widest uppercase rounded-lg transition-all hover:scale-105 active:scale-95"
        style={{
          background: ACCENT,
          boxShadow: `0 0 20px ${ACCENT}60, 0 0 50px ${ACCENT}30`,
        }}
      >
        {TG_ICON}
        ОСТАВИТЬ ЗАЯВКУ
      </a>
    </section>
  )
}

// ── EXPORT ────────────────────────────────────────────────────────────────────

export default function Section({ id, variant, buttonText, buttonHref }: SectionProps & { variant: string }) {
  if (variant === 'hero') return <HeroSection />
  if (variant === 'problem') return <ProblemSection />
  if (variant === 'solution') return <SolutionSection />
  if (variant === 'results') return <ResultsSection />
  if (variant === 'before-after') return <BeforeAfterSection />
  if (variant === 'portfolio') return null
  if (variant === 'testimonials') return <TestimonialsSection />
  if (variant === 'process') return null
  if (variant === 'cta') return <CTASection />
  return (
    <section id={id} className="relative w-full py-20 px-6 md:px-16 lg:px-24">
    </section>
  )
}