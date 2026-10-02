const TIMELINE = [
  {
    year: '1998',
    title: 'A nursery in the highlands',
    body: 'Three hectares of volcanic soil, planted by hand over one dry season.',
  },
  {
    year: '2006',
    title: 'The first harvest house',
    body: 'A single drying rack, built so no leaf traveled more than a day before processing.',
  },
  {
    year: '2014',
    title: 'Whole-leaf, no exceptions',
    body: 'We stopped selling anything made from dust or fannings. Every box, whole leaf.',
  },
  {
    year: '2023',
    title: '3D Tea World',
    body: 'Built so you can walk the same ground the leaf does, before it reaches your cup.',
  },
]

export function StoryPage() {
  return (
    <div className="story">
      <header className="story__head">
        <h1>Our story.</h1>
        <p>
          3D Tea World started as a single plot of highland soil and a belief that tea
          loses nothing when you can see where it came from.
        </p>
      </header>

      <ol className="story__timeline">
        {TIMELINE.map((entry) => (
          <li key={entry.year} className="story__entry">
            <span className="story__year">{entry.year}</span>
            <div>
              <h2>{entry.title}</h2>
              <p>{entry.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
