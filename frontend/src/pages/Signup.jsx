import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const handleSignup = async () => {
    if (password.trim() !== confirmPassword.trim()) {
      alert('Passwords must match!')
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/api/user/signup', {
        email,
        password,
        name
      }, {
        withCredentials: true
      })

      if (res.data.success) {
        setIsLoggedIn(true)
        navigate("/")
        alert('Signup successful!')
      } else {
        alert(res.data.msg || "Signup failed.")
        console.error('Server error:', res.data)
      }
    } catch (error) {
      console.error("Signup error:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '300px' }}>
        <h2>Signup</h2>

        <div>
          <label>Email:</label><br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
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

        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
