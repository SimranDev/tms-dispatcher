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

export const Status = {
  Active: 'Active',
  Inactive: 'Inactive',
  OnLeave: 'On Leave',
} as const

export type Status = (typeof Status)[keyof typeof Status]

export interface Person {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  status: Status
}
