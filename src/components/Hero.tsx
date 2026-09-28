import { journeyStops } from '@/config/journey'

const [hero] = journeyStops

export function Hero() {
  const begin = () =>
    document.getElementById('stop-africa')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="stop-hero" className="hero">
      <h1 className="hero__title">{hero.title}</h1>
      <p className="hero__body">{hero.body}</p>
      <button className="hero__cta" type="button" onClick={begin}>
        Begin the journey
      </button>
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__line" />
      </div>
      <span className="sr-only">Scroll to begin the journey through the tea world.</span>
    </section>
  )
}
