import { type NavItem } from '../types/components'
import { Icon } from '@iconify/react'

export const NAV_ITEMS: NavItem[] = [
  { path: 'dashboard', label: 'Dashboard', icon: <Icon icon="material-symbols:dashboard-outline" width={20} /> },
  { path: 'jobs', label: 'Jobs', icon: <Icon icon="tdesign:task" width={20} /> },
  { path: 'vehicles', label: 'Vehicles', icon: <Icon icon="mdi:truck-outline" width={20} /> },
  { path: 'drivers', label: 'Drivers', icon: <Icon icon="mdi:user-outline" width={20} /> },
  { path: 'customers', label: 'Customers', icon: <Icon icon="ri:suitcase-line" width={20} /> },
  { path: 'containers', label: 'Containers', icon: <Icon icon="lucide:container" width={20} /> },
]

export const CONFIG = {
  headerHeight: 64,
}

export const DRAWER_IDS = {
  CREATE_JOB: 'create-job-drawer',
}
