import type { Driver, Job } from '../types/components'
import { api } from './axios'

export const jobsAPI = {
  getJobs: () => api.get('/jobs'),
  createJob: (job: Job): Promise<Job> => api.post('/jobs', job),
}

export const driversAPI = {
  getDrivers: (): Promise<Driver[]> => api.get('/drivers'),
}
