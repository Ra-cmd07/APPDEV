import { useState, useEffect } from 'react'
import './App.css'

export default function Login({ onLogin, onSwitchToSignUp }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Load saved username and remember me preference on component mount
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

    // Check if account exists in localStorage
    const savedUserData = localStorage.getItem(`stocktrack_user_${username}`)
    
    if (!savedUserData) {
      setError('Username not found. Please sign up first.')
      return
    }

    // Parse saved user data and verify password
    const user = JSON.parse(savedUserData)
    if (user.password !== password) {
      setError('Invalid password. Please try again.')
      return
    }

    // Save username and remember me preference if checked
    if (rememberMe) {
      localStorage.setItem('stocktrack_username', username)
      localStorage.setItem('stocktrack_rememberMe', 'true')
    } else {
      // Clear saved credentials if remember me is unchecked
      localStorage.removeItem('stocktrack_username')
      localStorage.removeItem('stocktrack_rememberMe')
    }

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setMessage('Login successful — Welcome to StockTrack!')
      onLogin(username)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="login-background">
      {/* Analytics and Warehouse-themed background elements */}
      <div className="warehouse-bg">
        {/* Stock Analytics Graphs */}
        <div className="analytics-chart chart-1">
          <div className="chart-bar" style={{height: '40%'}}></div>
          <div className="chart-bar" style={{height: '60%'}}></div>
          <div className="chart-bar" style={{height: '45%'}}></div>
          <div className="chart-bar" style={{height: '70%'}}></div>
          <div className="chart-bar" style={{height: '55%'}}></div>
        </div>
        
        <div className="analytics-chart chart-2">
          <div className="chart-bar" style={{height: '50%'}}></div>
          <div className="chart-bar" style={{height: '65%'}}></div>
          <div className="chart-bar" style={{height: '55%'}}></div>
          <div className="chart-bar" style={{height: '75%'}}></div>
        </div>

        {/* Warehouse Silhouettes */}
        <div className="warehouse-silhouette silo-1"></div>
        <div className="warehouse-silhouette silo-2"></div>
        <div className="warehouse-stack stack-1"></div>
        <div className="warehouse-stack stack-2"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          {/* Logo and Branding */}
          <div className="login-header">
            <div className="logo-icon">📦</div>
            <h1 className="brand-title">StockTrack</h1>
            <p className="brand-tagline">Smart Inventory. Smarter Business.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-input"
                />
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          {/* Error and Success Messages */}
          {error && <div className="alert error-alert">{error}</div>}
          {message && <div className="alert success-alert">{message}</div>}

          {/* Switch to Sign Up */}
          <div className="auth-switch">
            <p>Don't have an account? <button onClick={onSwitchToSignUp} className="switch-link">Sign up here</button></p>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <p>© 2025 StockTrack. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
