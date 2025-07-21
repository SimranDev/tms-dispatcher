export const VehicleType = {
  Tractor: 'Tractor',
  Trailer: 'Trailer',
  Van: 'Van',
  Flatbed: 'Flatbed',
} as const
export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType]

export const ContainerType = {
  Dry: 'Dry',
  Reefer: 'Reefer',
  OpenTop: 'OpenTop',
} as const
export type ContainerType = (typeof ContainerType)[keyof typeof ContainerType]

export const ContainerSize = {
  S20ft: 'S20ft',
  S40ft: 'S40ft',
  S45ft: 'S45ft',
} as const
export type ContainerSize = (typeof ContainerSize)[keyof typeof ContainerSize]

export const ContainerStatus = {
  InYard: 'InYard',
  InTransit: 'InTransit',
  WithCustomer: 'WithCustomer',
} as const
export type ContainerStatus = (typeof ContainerStatus)[keyof typeof ContainerStatus]

export const JobStatus = {
  Booked: 'Booked',
  Assigned: 'Assigned',
  InProgress: 'InProgress',
  Completed: 'Completed',
} as const
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]
