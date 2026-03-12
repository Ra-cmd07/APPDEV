export default function Header({ user, onLogout, activeTab, onTabChange }) {
  const navItems = [
    { label: 'Dashboard', key: 'dashboard' },
    { label: 'Products', key: 'products' },
    { label: 'Reports', key: 'reports' },
    { label: 'Settings', key: 'settings' },
  ]

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📦</span>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              StockTrack
            </h1>
            <p className="text-blue-200 text-xs font-medium">
              Inventory Management System
            </p>
          </div>
        </div>

        {/* Nav Menu */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => onTabChange && onTabChange(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border-0
                  ${activeTab === item.key
                    ? 'bg-white/20 text-white'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xl">
            👤
          </div>
          <span className="text-sm font-medium hidden sm:block">{user}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 bg-white/20 border border-white/30 rounded-md text-white text-sm font-semibold hover:bg-white/30 transition-all duration-200 cursor-pointer"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}
