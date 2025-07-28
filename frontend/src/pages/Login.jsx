import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password
      }, {
        withCredentials: true
      })

      if (res.data.success) {
        setIsLoggedIn(true)
        navigate("/")
        alert('Login successful')
      } else {
        alert(res.data.msg || 'Login failed')
        console.log("Login failed:", res.data.msg)
      }

    } catch (error) {
      console.log("Login error:", error)
      alert("Something went wrong")
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div>
        <h2>Login</h2>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleLogin}>Login</button>
        </div>

        {isLoggedIn && (
          <p>You are logged in!</p>
        )}
      </div>
    </div>
  )
}

export default Login
