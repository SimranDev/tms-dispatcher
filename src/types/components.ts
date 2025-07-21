export const PageRoute = {
  Dashboard: 'dashboard',
  Jobs: 'jobs',
  Vehicles: 'vehicles',
  Drivers: 'drivers',
  Customers: 'customers',
  Containers: 'containers',
} as const

export type PageRoute = (typeof PageRoute)[keyof typeof PageRoute]

export interface NavItem {
  path: PageRoute
  label: string
  icon: React.ReactElement
}
