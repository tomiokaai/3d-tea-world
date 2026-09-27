export function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">Steeped in origin.</h1>
      <p className="hero__body">
        From volcanic highland soil to the cup in your hands — follow one leaf
        through the world that shapes its character.
      </p>
      <button className="hero__cta" type="button">
        Begin the journey
      </button>
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue__line" />
      </div>
      <span className="sr-only">Scroll to begin the journey through the tea world.</span>
    </section>
  )
}
