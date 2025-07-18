import { create } from 'zustand'
import type { Job } from '../types/components'

interface GState {
  jobs: Job[]
  addJob: (job: Job) => void
}

export const useGStore = create<GState>((set) => ({
  jobs: [],
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
}))
