export const PageRoute = {
  Dashboard: 'dashboard',
  Jobs: 'jobs',
  Vehicles: 'vehicles',
  Drivers: 'drivers',
} as const

export type PageRoute = (typeof PageRoute)[keyof typeof PageRoute]

export interface NavItem {
  path: PageRoute
  label: string
  icon: React.ReactElement
}

export const JobStatus = {
  Booked: 'BOOKED',
  InProgress: 'IN_PROGRESS',
  Completed: 'COMPLETED',
  Cancelled: 'CANCELLED',
  Pending: 'PENDING',
} as const

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

export interface Job {
  id?: string
  name: string
  origin: string
  destination: string
  status: JobStatus
  notes?: string
}
