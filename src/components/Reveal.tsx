"use client"

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    try {
      if (typeof window === 'undefined') return
      const mq = window.matchMedia('(max-width: 767px)')
      if (mq.matches) {
        setInView(true)
        return
      }
    } catch {
      setInView(true)
      return
    }
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) timeoutId = setTimeout(() => setInView(true), delay)
          else setInView(true)
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    )
    observer.observe(el)
    return () => {
      try {
        observer.disconnect()
      } catch {
        // ignore if already disconnected or observer invalid (e.g. during fast navigation)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
