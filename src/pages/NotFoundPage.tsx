import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>This leaf hasn't grown yet.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="hero__cta">
        Back to the journey
      </Link>
    </div>
  )
}
