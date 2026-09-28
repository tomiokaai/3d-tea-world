import { Experience } from '@/three/Experience'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Journey } from '@/components/Journey'
import { JourneyRail } from '@/components/JourneyRail'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Experience />
      <Journey />
      <JourneyRail />
    </>
  )
}
