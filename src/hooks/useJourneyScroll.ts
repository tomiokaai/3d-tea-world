import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from '@/state/scrollState'

gsap.registerPlugin(ScrollTrigger)

// Maps the scroll position of the journey container to scrollState.target (0..1).
export function useJourneyScroll(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollState.target = self.progress
      },
      onRefresh: (self) => {
        scrollState.target = self.progress
      },
    })

    return () => trigger.kill()
  }, [ref])
}
