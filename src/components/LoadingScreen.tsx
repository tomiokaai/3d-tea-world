import { useProgress } from '@react-three/drei'

export function LoadingScreen() {
  const { progress, active } = useProgress()

  if (!active && progress === 100) return null

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <span className="loading-screen__mark">3D Tea World</span>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__fill"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <span className="sr-only">Loading {Math.round(progress)}%</span>
    </div>
  )
}
