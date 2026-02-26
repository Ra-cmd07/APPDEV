import { useState } from 'react'
import './App.css'

export default function SignUp({ onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    setError('')
    setMessage('')

    // Validation
    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Save to localStorage (simulating account creation)
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password
    }

    localStorage.setItem(`stocktrack_user_${formData.username}`, JSON.stringify(newUser))

    setLoading(true)
    setTimeout(() => {
      setMessage('Account created successfully! Redirecting to login...')
      setTimeout(() => {
        onSignUp(formData.username)
      }, 1500)
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

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="form-title">Create Account</h2>

            {/* Full Name Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="form-input"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="form-input"
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="form-input"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="form-input"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Error and Success Messages */}
          {error && <div className="alert error-alert">{error}</div>}
          {message && <div className="alert success-alert">{message}</div>}

          {/* Switch to Login */}
          <div className="auth-switch">
            <p>Already have an account? <button onClick={onSwitchToLogin} className="switch-link">Login here</button></p>
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
