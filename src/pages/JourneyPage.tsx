import { Experience } from '@/three/Experience'
import { LoadingScreen } from '@/components/LoadingScreen'
import { Journey } from '@/components/Journey'
import { JourneyRail } from '@/components/JourneyRail'
import { ExperienceBoundary } from '@/components/ExperienceBoundary'

export function JourneyPage() {
  return (
    <>
      <LoadingScreen />
      <ExperienceBoundary>
        <Experience />
      </ExperienceBoundary>
      <Journey />
      <JourneyRail />
    </>
  )
}
