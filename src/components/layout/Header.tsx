import { CONFIG } from '../../lib/constants'

const Header = () => {
  return (
    <header
      style={{ height: CONFIG.headerHeight }}
      className="sticky top-0 z-10 flex flex-shrink-0 items-center justify-between border-b border-slate-300 p-4 backdrop-blur-lg"
    ></header>
  )
}

export default Header
