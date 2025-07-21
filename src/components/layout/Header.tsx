import { useShallow } from 'zustand/shallow'
import { CONFIG } from '../../lib/constants'
import { useAuthStore } from '../../store/authStore'

const Header = () => {
  const [user, logout] = useAuthStore(useShallow((s) => [s.user, s.logout]))

  if (!user) return null

  return (
    <header
      style={{ height: CONFIG.headerHeight }}
      className="sticky top-0 z-10 flex flex-shrink-0 items-center justify-between border-b border-slate-300 p-4 backdrop-blur-lg"
    >
      <div className="flex-1"></div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
          <div className="bg-primary text-neutral-content w-12 rounded-full">
            <span>{user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-1 w-52 border border-neutral-200 p-2 shadow-xl"
        >
          <li className="pointer-events-none">
            <span className="text-primary font-mono text-sm font-bold">{user.email}</span>
          </li>
          <li>
            <a className="text-sm">Settings</a>
          </li>
          <li>
            <span className="text-sm" onClick={logout}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
