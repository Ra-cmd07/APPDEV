import { useState } from 'react'
import Button from './components/Button'

export default function SignUp({ onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '', email: '', username: '', password: '', confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    setError('')
    setMessage('')
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
    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username,
      password: formData.password
    }
    localStorage.setItem(`stocktrack_user_${formData.username}`, JSON.stringify(newUser))
    setLoading(true)
    setTimeout(() => {
      setMessage('Account created successfully! Redirecting...')
      setTimeout(() => { onSignUp(formData.username) }, 1500)
      setLoading(false)
    }, 800)
  }

  const fields = [
    { name: 'fullName', type: 'text', placeholder: 'Full Name' },
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    { name: 'username', type: 'text', placeholder: 'Username' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center text-white mb-8">
          <div className="text-6xl mb-3">📦</div>
          <h1 className="text-4xl font-bold tracking-tight">StockTrack</h1>
          <p className="text-blue-200 mt-1 text-sm">Smart Inventory. Smarter Business.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-blue-900 text-2xl font-bold mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            ))}

            <Button
              label={loading ? 'Creating Account...' : 'Sign Up'}
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
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-700 font-semibold hover:text-blue-900 underline bg-transparent border-0 cursor-pointer"
            >
              Login here
            </button>
          </p>
          <p className="mt-4 text-center text-xs text-gray-400">© 2025 StockTrack. All rights reserved.</p>
        </div>

      </div>
    </div>
  )
}
