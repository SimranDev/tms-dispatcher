import { Status, type NavItem, type Person } from '../types/components'
import { Icon } from '@iconify/react'

export const NAV_ITEMS: NavItem[] = [
  { path: 'dashboard', label: 'Dashboard', icon: <Icon icon="material-symbols:dashboard-outline" width={20} /> },
  { path: 'jobs', label: 'Jobs', icon: <Icon icon="tdesign:task" width={20} /> },
  { path: 'vehicles', label: 'Vehicles', icon: <Icon icon="mdi:truck-outline" width={20} /> },
  { path: 'drivers', label: 'Drivers', icon: <Icon icon="mdi:user-outline" width={20} /> },
]

export const CONFIG = {
  headerHeight: 64,
}

export const MOCK_DATA: Person[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 32, status: Status.Active },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: 28, status: Status.Active },
  { id: 3, firstName: 'Peter', lastName: 'Jones', email: 'peter.jones@example.com', age: 45, status: Status.Inactive },
  { id: 4, firstName: 'Susan', lastName: 'Williams', email: 'susan.w@example.com', age: 39, status: Status.OnLeave },
  { id: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael.b@example.com', age: 25, status: Status.Active },
  { id: 6, firstName: 'Linda', lastName: 'Davis', email: 'linda.davis@example.com', age: 51, status: Status.Active },
  { id: 7, firstName: 'James', lastName: 'Wilson', email: 'james.w@example.com', age: 33, status: Status.Inactive },
  { id: 8, firstName: 'Patricia', lastName: 'Miller', email: 'pat.miller@example.com', age: 41, status: Status.Active },
  { id: 9, firstName: 'Robert', lastName: 'Taylor', email: 'rob.taylor@example.com', age: 29, status: Status.OnLeave },
  { id: 10, firstName: 'Jennifer', lastName: 'Anderson', email: 'jen.a@example.com', age: 36, status: Status.Active },
  { id: 11, firstName: 'William', lastName: 'Thomas', email: 'will.t@example.com', age: 48, status: Status.Active },
  { id: 12, firstName: 'Mary', lastName: 'Jackson', email: 'mary.j@example.com', age: 22, status: Status.Active },
  { id: 13, firstName: 'David', lastName: 'White', email: 'david.white@example.com', age: 30, status: Status.Inactive },
  { id: 14, firstName: 'Barbara', lastName: 'Harris', email: 'barb.h@example.com', age: 55, status: Status.Active },
  { id: 15, firstName: 'Richard', lastName: 'Martin', email: 'rich.m@example.com', age: 37, status: Status.OnLeave },
  { id: 16, firstName: 'Sarah', lastName: 'Garcia', email: 'sarah.g@example.com', age: 26, status: Status.Active },
  { id: 17, firstName: 'Joseph', lastName: 'Martinez', email: 'joseph.m@example.com', age: 43, status: Status.Active },
  { id: 18, firstName: 'Jessica', lastName: 'Robinson', email: 'jess.r@example.com', age: 31, status: Status.Inactive },
  { id: 19, firstName: 'Thomas', lastName: 'Clark', email: 'tom.c@example.com', age: 34, status: Status.Active },
  { id: 20, firstName: 'Karen', lastName: 'Rodriguez', email: 'karen.r@example.com', age: 49, status: Status.Active },
  { id: 21, firstName: 'Chris', lastName: 'Lewis', email: 'chris.l@example.com', age: 27, status: Status.OnLeave },
  { id: 22, firstName: 'Nancy', lastName: 'Lee', email: 'nancy.lee@example.com', age: 38, status: Status.Active },
  { id: 23, firstName: 'Mark', lastName: 'Walker', email: 'mark.w@example.com', age: 42, status: Status.Active },
  { id: 24, firstName: 'Lisa', lastName: 'Hall', email: 'lisa.h@example.com', age: 52, status: Status.Inactive },
  { id: 25, firstName: 'Paul', lastName: 'Allen', email: 'paul.a@example.com', age: 35, status: Status.Active },
]
