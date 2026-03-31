import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
