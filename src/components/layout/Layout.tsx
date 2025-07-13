import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className="flex h-screen text-slate-800">
      <Sidebar />
      <div className="flex max-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{<Outlet />}</div>
        </main>
      </div>
    </div>
  )
}

export default Layout
