import { useState } from 'react'
import Button from '../components/Button'

export default function SettingsPage({ user }) {
  const [profile, setProfile] = useState({
    fullName: user || '',
    email: '',
    role: 'Inventory Manager',
  })

  const [preferences, setPreferences] = useState({
    lowStockThreshold: 20,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    emailAlerts: true,
    darkMode: false,
  })

  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"

  return (
    <div className="flex flex-col gap-6 max-w-3xl">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your account and system preferences</p>
      </div>

      {saved && (
        <div className="px-4 py-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded-lg font-medium">
          ✅ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-5">

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">👤</span>
            <h3 className="text-blue-900 font-bold text-base">Profile Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={profile.email}
                placeholder="your@email.com"
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</label>
              <select value={profile.role} onChange={e => setProfile({ ...profile, role: e.target.value })} className={inputClass}>
                <option>Inventory Manager</option>
                <option>Administrator</option>
                <option>Warehouse Staff</option>
                <option>Viewer</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</label>
              <input type="text" value={user} disabled className={`${inputClass} bg-gray-50 cursor-not-allowed text-gray-400`} />
            </div>
          </div>
        </div>

        {/* Inventory Preferences */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-blue-900 font-bold text-base">Inventory Preferences</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Low Stock Threshold</label>
              <input
                type="number"
                value={preferences.lowStockThreshold}
                onChange={e => setPreferences({ ...preferences, lowStockThreshold: parseInt(e.target.value) })}
                className={inputClass}
              />
              <p className="text-xs text-gray-400">Items below this quantity are marked as "Low Stock"</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Currency</label>
              <select value={preferences.currency} onChange={e => setPreferences({ ...preferences, currency: e.target.value })} className={inputClass}>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="EUR">EUR — Euro (€)</option>
                <option value="GBP">GBP — British Pound (£)</option>
                <option value="PHP">PHP — Philippine Peso (₱)</option>
                <option value="JPY">JPY — Japanese Yen (¥)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Format</label>
              <select value={preferences.dateFormat} onChange={e => setPreferences({ ...preferences, dateFormat: e.target.value })} className={inputClass}>
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🔔</span>
            <h3 className="text-blue-900 font-bold text-base">Notifications & Display</h3>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications for low stock and out of stock items' },
              { key: 'darkMode', label: 'Dark Mode', desc: 'Switch to a dark color theme (coming soon)' },
            ].map(toggle => (
              <label key={toggle.key} className="flex items-center justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{toggle.label}</p>
                  <p className="text-xs text-gray-400">{toggle.desc}</p>
                </div>
                <div
                  onClick={() => setPreferences({ ...preferences, [toggle.key]: !preferences[toggle.key] })}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0
                    ${preferences[toggle.key] ? 'bg-blue-700' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300
                    ${preferences[toggle.key] ? 'left-7' : 'left-1'}`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚠️</span>
            <h3 className="text-red-700 font-bold text-base">Danger Zone</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">These actions are irreversible. Please proceed with caution.</p>
          <div className="flex gap-3 flex-wrap">
            <Button label="🗑️ Clear All Products" onClick={() => {}} variant="danger" />
            <Button label="🔄 Reset to Default" onClick={() => {}} variant="danger" />
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <Button label="Cancel" onClick={() => {}} variant="secondary" />
          <Button label="💾 Save Settings" type="submit" variant="primary" />
        </div>

      </form>
    </div>
  )
}
