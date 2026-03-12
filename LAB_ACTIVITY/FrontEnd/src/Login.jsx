import { useState, useEffect } from 'react'
import Button from './components/Button'

export default function Login({ onLogin, onSwitchToSignUp }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedUsername = localStorage.getItem('stocktrack_username')
    const savedRememberMe = localStorage.getItem('stocktrack_rememberMe') === 'true'
    if (savedUsername) {
      setUsername(savedUsername)
      setRememberMe(savedRememberMe)
    }
  }, [])

  function handleSubmit(ev) {
    ev.preventDefault()
    setError('')
    setMessage('')
    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }
    const savedUserData = localStorage.getItem(`stocktrack_user_${username}`)
    if (!savedUserData) {
      setError('Username not found. Please sign up first.')
      return
    }
    const user = JSON.parse(savedUserData)
    if (user.password !== password) {
      setError('Invalid password. Please try again.')
      return
    }
    if (rememberMe) {
      localStorage.setItem('stocktrack_username', username)
      localStorage.setItem('stocktrack_rememberMe', 'true')
    } else {
      localStorage.removeItem('stocktrack_username')
      localStorage.removeItem('stocktrack_rememberMe')
    }
    setLoading(true)
    setTimeout(() => {
      setMessage('Login successful — Welcome to StockTrack!')
      onLogin(username)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center text-white mb-8">
          <div className="text-6xl mb-3 animate-bounce">📦</div>
          <h1 className="text-4xl font-bold tracking-tight">StockTrack</h1>
          <p className="text-blue-200 mt-1 text-sm">Smart Inventory. Smarter Business.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-blue-900 text-2xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded"
              />
              Remember me
            </label>

            <Button
              label={loading ? 'Signing in...' : 'Login'}
              type="submit"
              variant="primary"
              disabled={loading}
            />
          </form>

          {error && (
            <div className="mt-4 px-4 py-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-4 px-4 py-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded-lg">
              {message}
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="text-blue-700 font-semibold hover:text-blue-900 underline bg-transparent border-0 cursor-pointer"
            >
              Sign up here
            </button>
          </p>

          <p className="mt-4 text-center text-xs text-gray-400">© 2025 StockTrack. All rights reserved.</p>
        </div>

      </div>
    </div>
  )
}
