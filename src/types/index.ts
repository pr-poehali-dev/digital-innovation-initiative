import type { ReactNode } from "react"

export type SectionVariant =
  | 'hero'
  | 'problem'
  | 'solution'
  | 'results'
  | 'portfolio'
  | 'testimonials'
  | 'process'
  | 'cta'

export interface Section {
  id: string
  variant: SectionVariant
  title: ReactNode
  subtitle?: ReactNode
  content?: ReactNode
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
}

export interface SectionProps extends Section {
  isActive: boolean
}
