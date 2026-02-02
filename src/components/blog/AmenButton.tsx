'use client'

import { useEffect, useState } from 'react'
import { PiHandsPraying } from 'react-icons/pi'

const STORAGE_KEY_PREFIX = 'blog-amen-'

function getAlreadyPressed(slug: string): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY_PREFIX + slug) === '1'
  } catch {
    return false
  }
}

function setAlreadyPressed(slug: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + slug, '1')
  } catch {
    // ignore
  }
}

export function AmenButton({ slug }: { slug: string }) {
  const [pressed, setPressed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    let mounted = true
    setPressed(getAlreadyPressed(slug))

    // Fetch initial count
    fetch(`/api/blog-amens/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted && typeof data.count === 'number') {
          setCount(data.count)
        }
      })
      .catch((err) => console.error('Failed to fetch amen count', err))

    return () => {
      mounted = false
    }
  }, [slug])

  async function handleClick() {
    if (pressed || loading) return
    setLoading(true)

    // Optimistic update
    setCount((prev) => prev + 1)
    setPressed(true)
    setAlreadyPressed(slug)

    try {
      const res = await fetch(`/api/blog-amens/${encodeURIComponent(slug)}`, {
        method: 'POST',
      })
      if (!res.ok) {
        throw new Error('Failed to record Amen')
      }
      const data = await res.json()
      if (typeof data.count === 'number') {
        setCount(data.count)
      }
    } catch (err) {
      console.error(err)
      // Revert if failed
      setCount((prev) => prev - 1)
      setPressed(false)
      // Remove from storage? Maybe, but usually better to leave it to avoid spam if it was a network glitch
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center my-12">
      <button
        type="button"
        onClick={handleClick}
        disabled={pressed || loading}
        aria-label={pressed ? 'You have said Amen' : 'Say Amen'}
        className={`
          group relative flex items-center gap-3 px-6 py-3 rounded-full
          border transition-all duration-300 ease-out
          text-sm font-medium tracking-wide
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2
          ${pressed
            ? 'bg-emerald-700 border-emerald-700 text-white shadow-lg shadow-emerald-200'
            : 'bg-transparent border-gray-300 text-gray-500 hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
          }
        `}
      >
        <PiHandsPraying className={`w-5 h-5 transition-transform duration-300 ${pressed ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span>{count > 0 ? count : 'Amen'}</span>
      </button>
    </div>
  )
}
