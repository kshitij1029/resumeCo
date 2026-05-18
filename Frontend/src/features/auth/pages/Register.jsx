import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import Loading from '../../others/components/Loading'
import AnimatedBackground from '../../others/components/AnimatedBackground.jsx' 

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !username.trim() || !password.trim()) {
      return toast.error("All fields are required.")
    }
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div 
      className="auth-wrapper" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        minHeight: '100vh', /* Forces full viewport height */
        width: '100%' 
      }}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content Layer - Turned into a Flex container to center children */}
      <div 
        className="auth-content-layer" 
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          width: '100%', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', /* Centers the form vertically */
          alignItems: 'center'       /* Centers the form horizontally */
        }}
      >
        
        {/* Home Navigation Button - Kept absolutely positioned so it stays at the top */}
        <button 
          onClick={() => navigate("/")} 
          className="home2-nav-btn"
          aria-label="Go to Home"
          style={{ 
            position: 'absolute', 
            top: '5px', 
            left: '15px', 
            zIndex: 2,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <div className="logo" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            resume<span className="dot" style={{ display: 'inline' }}>CO.</span>
          </div>
        </button>

        {/* The Auth form wrapper - Will now sit perfectly in the dead center */}
        <main className="auth-main" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="form-container" style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor='username'>Username</label>
                <input 
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="Enter username" 
                />
              </div>
              <div className="input-group">
                <label htmlFor='email'>Email</label>
                <input 
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter email address" 
                />
              </div>
              <div className="input-group">
                <label htmlFor='password'>Password</label>
                <input 
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Enter password" 
                />
              </div>
              <button type="submit" className='button primary-button'>Register</button>
            </form>
            
            <p className="auth-footer">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Register