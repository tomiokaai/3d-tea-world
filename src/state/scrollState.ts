// Mutable on purpose: read every frame by the R3F loop, so it must not trigger React renders.
// `target` is written by ScrollTrigger, `current` is the damped value used by camera and scenes.
export const scrollState = { target: 0, current: 0 }
