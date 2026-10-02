import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackClassName?: string
}

interface State {
  hasError: boolean
}

// Class component on purpose — React only supports error boundaries this way.
// Keeps a WebGL/driver failure from blanking the whole page or a single card.
export class ExperienceBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('3D scene failed to render:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.fallbackClassName ?? 'experience-fallback'}>
          <p>The 3D scene couldn't load on this device.</p>
        </div>
      )
    }
    return this.props.children
  }
}
