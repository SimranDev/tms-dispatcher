import type { Job } from '../types/components'
import { api } from './axios'

export const jobsAPI = {
  getJobs: () => api.get('/jobs'),
  createJob: (job: Job): Promise<Job> => api.post('/jobs', job),
}
