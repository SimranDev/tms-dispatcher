import { createBrowserRouter, Navigate } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import Layout from './components/layout/Layout'
import { PageRoute } from './types/components'
import JobsPage from './pages/JobsPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DriversPage from './pages/DriversPage'
import VehiclesPage from './pages/VehiclesPage'
import CustomersPage from './pages/CustomersPage'
import ContainersPage from './pages/ContainersPage'
import LiveTrackingPage from './pages/LiverTrackingPage'
import Playground from './pages/Playground'

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/',
        element: <Navigate to={PageRoute.Dashboard} replace />
      },
      {
        Component: Layout,
        children: [
          {
            index: true,
            path: PageRoute.Dashboard,
            Component: DashboardPage
          },
          {
            path: PageRoute.LiveTracking,
            Component: LiveTrackingPage
          },
          {
            path: PageRoute.Jobs,
            Component: JobsPage
          },
          {
            path: PageRoute.Vehicles,
            Component: VehiclesPage
          },
          {
            path: PageRoute.Drivers,
            Component: DriversPage
          },
          {
            path: PageRoute.Customers,
            Component: CustomersPage
          },
          {
            path: PageRoute.Containers,
            Component: ContainersPage
          },
          {
            path: 'playground',
            Component: Playground
          }
        ]
      }
    ]
  }
])
