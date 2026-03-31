import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)
  const activeSectionRef = useRef(0)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const goTo = useCallback((index: number) => {
    const el = containerRef.current
    if (!el || isScrolling.current) return
    const clamped = Math.max(0, Math.min(sections.length - 1, index))
    if (clamped === activeSectionRef.current) return

    isScrolling.current = true
    activeSectionRef.current = clamped
    setActiveSection(clamped)
    el.scrollTo({ top: clamped * window.innerHeight, behavior: 'smooth' })

    setTimeout(() => { isScrolling.current = false }, 900)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrolling.current) return
      goTo(activeSectionRef.current + (e.deltaY > 0 ? 1 : -1))
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) goTo(activeSectionRef.current + (delta > 0 ? 1 : -1))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo])

  return (
    <Layout>
      <nav className="hidden md:flex fixed top-0 right-0 h-screen flex-col justify-center z-30 p-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`w-3 h-3 rounded-full my-2 transition-all ${
              index === activeSection ? 'bg-white scale-150' : 'bg-gray-600'
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </nav>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-30"
        style={{ scaleX }}
      />
      <div
        ref={containerRef}
        className="h-full overflow-hidden"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}
