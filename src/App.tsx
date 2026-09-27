import { Experience } from '@/three/Experience'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Hero } from '@/components/Hero'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Experience />
      <Hero />
    </>
  )
}
