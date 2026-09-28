import { useRef } from 'react'
import { journeyStops } from '@/config/journey'
import { useJourneyScroll } from '@/hooks/useJourneyScroll'
import { Hero } from './Hero'

// Scroll container: one full-height section per journey stop.
// Stop i sits at i * 100vh, which matches its position on the camera curve.
export function Journey() {
  const ref = useRef<HTMLElement>(null)
  useJourneyScroll(ref)

  return (
    <main ref={ref} className="journey">
      <Hero />
      {journeyStops.slice(1).map((stop) => (
        <section key={stop.id} id={`stop-${stop.id}`} className="stop" data-side={stop.side}>
          <div className="stop__copy">
            <h2 className="stop__title">{stop.title}</h2>
            <p className="stop__body">{stop.body}</p>
          </div>
        </section>
      ))}
    </main>
  )
}
