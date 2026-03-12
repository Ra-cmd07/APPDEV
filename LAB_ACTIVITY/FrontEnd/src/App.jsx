import { useState } from 'react'
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

  return (
    <>
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : showSignUp ? (
        <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setShowSignUp(false)} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToSignUp={() => setShowSignUp(true)} />
      )}
    </>
  )
}

export default App
