import type { ContainerSize, ContainerStatus, ContainerType, JobStatus, VehicleType } from './enums'

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  createdAt: string
}

export interface Customer {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phoneNumber: string
  address: string
  createdAt: string
}

export interface Driver {
  id: string
  firstname: string
  lastname: string
  email: string
  phoneNumber: string
  password: string
  licenseNumber: string
  licenseExpiryDate: string
  isActive: boolean
  createdAt: string
}

export interface Vehicle {
  id: string
  name: string
  rego: string
  vinNumber: string
  type: VehicleType
  capacityKg: number
  registrationExpiry: string
  insuranceExpiry: string
  isActive: boolean
}

export interface Container {
  id: string
  containerNumber: string
  type: ContainerType
  size: ContainerSize
  status: ContainerStatus
  notes?: string
}

export interface Job {
  id: number
  customerId: string
  containerId: string
  driverId: string
  vehicleId: string
  status: JobStatus
  pickupAddress: string
  deliveryAddress: string
  scheduledPickup: string
  scheduledDelivery: string
  actualPickup?: string
  actualDelivery?: string
  freightDescription: string
  notes?: string
  createdByUserId: string
  createdAt: string

  customer?: Customer // Optional relation, can be populated in queries
  container?: Container // Optional relation, can be populated in queries
  driver?: Driver // Optional relation, can be populated in queries
  vehicle?: Vehicle // Optional relation, can be populated in queries
}

export type CreateJob = Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'createdByUserId'>
