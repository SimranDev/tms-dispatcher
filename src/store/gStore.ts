import { create } from 'zustand'
import type { Container, Customer, Driver, Job, Vehicle } from '../types/dto'

interface GState {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  drivers: Driver[]
  setDrivers: (drivers: Driver[]) => void
  jobs: Job[]
  setJobs: (jobs: Job[]) => void
  vehicles: Vehicle[]
  setVehicles: (vehicles: Vehicle[]) => void
  containers: Container[]
  setContainers: (containers: Container[]) => void
}

export const useGStore = create<GState>((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
  drivers: [],
  setDrivers: (drivers) => set({ drivers }),
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),
  containers: [],
  setContainers: (containers) => set({ containers }),
}))
