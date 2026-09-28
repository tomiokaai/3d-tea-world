import { useEffect, useState } from 'react'
import { journeyStops } from '@/config/journey'

// Chapter navigation: one dot per stop, jumps to that section.
export function JourneyRail() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      setActive(Math.round(progress * (journeyStops.length - 1)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="rail" aria-label="Journey chapters">
      {journeyStops.map((stop, i) => (
        <button
          key={stop.id}
          type="button"
          className="rail__dot"
          title={stop.label}
          aria-label={stop.label}
          aria-current={i === active ? 'step' : undefined}
          onClick={() =>
            document.getElementById(`stop-${stop.id}`)?.scrollIntoView({ behavior: 'smooth' })
          }
        />
      ))}
    </nav>
  )
}
