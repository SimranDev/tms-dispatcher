import { createBrowserRouter, Navigate } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import Layout from './components/layout/Layout'
import { PageRoute } from './types/components'
import JobsPage from './pages/JobsPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/',
        element: <Navigate to={PageRoute.Dashboard} replace />,
      },
      {
        Component: Layout,
        children: [
          {
            index: true,
            path: PageRoute.Dashboard,
            Component: DashboardPage,
          },
          {
            path: PageRoute.Jobs,
            Component: JobsPage,
          },
          {
            path: PageRoute.Vehicles,
            element: <h1>VEHICLES</h1>,
          },
          {
            path: PageRoute.Drivers,
            element: <h1>DRIVERS</h1>,
          },
        ],
      },
    ],
  },
])
