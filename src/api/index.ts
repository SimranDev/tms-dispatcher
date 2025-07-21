import type { Container, CreateJob, Customer, Driver, Job, Vehicle } from '../types/dto'
import { api } from './axios'

export const jobsAPI = {
  getJobs: (): Promise<Job[]> => api.get('/jobs'),
  createJob: (job: CreateJob): Promise<Job> => api.post('/jobs', job),
}

export const driversAPI = {
  getDrivers: (): Promise<Driver[]> => api.get('/drivers'),
}

export const customersAPI = {
  getCustomers: (): Promise<Customer[]> => api.get('/customers'),
}

export const vehiclesAPI = {
  getVehicles: (): Promise<Vehicle[]> => api.get('/vehicles'),
}

export const containersAPI = {
  getContainers: (): Promise<Container[]> => api.get('/containers'),
}
