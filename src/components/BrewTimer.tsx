import { useEffect, useRef, useState } from 'react'
import { products } from '@/data/products'
import { formatBrewingTime } from '@/utils/format'

// Starts counting down from the featured product's brewing time once this
// caption scrolls into view, and resets if the user scrolls back past it.
export function BrewTimer() {
  const product = products[0]
  const [seconds, setSeconds] = useState(product.brewingTime)
  const [running, setRunning] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeconds(product.brewingTime)
          setRunning(true)
        } else {
          setRunning(false)
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product.brewingTime])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div ref={ref} className="brew-timer">
      <span className="brew-timer__label">{product.name} · steeping</span>
      <span className="brew-timer__time">{formatBrewingTime(seconds)}</span>
    </div>
  )
}
