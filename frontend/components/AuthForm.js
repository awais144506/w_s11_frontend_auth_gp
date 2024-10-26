import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function AuthForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError] = useState("")
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    try{
      const {data} = await axios.post(
        "/api/auth/login",{username,password}
      )
      localStorage.setItem("token",data.token)
      navigate("/cereals")
    }
    catch(error){
      error?.response?.data?.messsage || setError("There is an error! Try Again.")
    }
  }

  return (
    <div className="container">
      <div aria-live="polite"></div>
      <div aria-live="assertive" style={{ color: 'red' }}>{error}</div>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
