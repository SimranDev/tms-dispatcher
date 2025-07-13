import { createBrowserRouter } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import Layout from './components/layout/Layout'
import { PageRoute } from './types/components'
import JobsPage from './pages/JobsPage'

export const router = createBrowserRouter([
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
])
