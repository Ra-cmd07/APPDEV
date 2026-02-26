import { useState } from 'react'
import './App.css'
import Login from './Login'
import SignUp from './SignUp'
import Dashboard from './Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)

  const handleLogin = (username) => {
    setUser(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser('')
  }

  const handleSignUp = (username) => {
    setShowSignUp(false)
    setUser(username)
    setIsLoggedIn(true)
  }

  const handleSwitchToSignUp = () => {
    setShowSignUp(true)
  }

  const handleSwitchToLogin = () => {
    setShowSignUp(false)
  }

  return (
    <>
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : showSignUp ? (
        <SignUp onSignUp={handleSignUp} onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToSignUp={handleSwitchToSignUp} />
      )}
    </>
  )
}

export default App
