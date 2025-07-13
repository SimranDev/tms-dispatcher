import { NavLink } from 'react-router'
import { CONFIG, NAV_ITEMS } from '../../lib/constants'

const Sidebar = () => {
  return (
    <aside className="relative flex w-64 flex-shrink-0 flex-col bg-slate-50">
      <div className="absolute right-0 h-full w-[1px] py-3">
        <div className="h-full bg-slate-300" />
      </div>
      <div className="flex items-center justify-center border-b border-slate-300" style={{ height: CONFIG.headerHeight }}>
        <div className="flex h-8 w-8 items-center justify-center bg-red-500 font-mono text-2xl text-white">
          <span>D</span>
        </div>
        <label className="ml-2 text-lg font-black text-slate-700">DispatchGo</label>
      </div>
      <nav className="flex-1 py-4 pr-3">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.path} className="mb-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-r-full px-4 py-3 transition-colors duration-200 ease-in-out ${
                    isActive ? 'bg-slate-600 text-white' : 'hover:bg-slate-200'
                  }`
                }
              >
                {item.icon}
                <span className="ml-4 font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-slate-300 p-4">
        <p className="text-center text-xs text-slate-400">© 2025 DispatchGo Inc.</p>
      </div>
    </aside>
  )
}

export default Sidebar
