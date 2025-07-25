import { Outlet, useLocation } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'
import { PageRoute } from '../../types/components'

const Layout = () => {
  const location = useLocation()

  const noPaddingRoutes = [PageRoute.LiveTracking]
  const shouldApplyPadding = !noPaddingRoutes.some((route) => location.pathname.includes(route))

  return (
    <div className="flex h-screen text-slate-800">
      <Sidebar />
      <div className="flex max-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className={shouldApplyPadding ? 'p-4 sm:p-6 lg:p-8' : ''}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
