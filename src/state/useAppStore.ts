import { create } from 'zustand'

interface AppState {
  assetsReady: boolean
  setAssetsReady: (ready: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  assetsReady: false,
  setAssetsReady: (ready) => set({ assetsReady: ready }),
}))
