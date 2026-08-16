import { useState } from 'react'
import './Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {

    e.preventDefault()

    setMessage('')
    setError('')

    try {

      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login gagal')
        return
      }

      // Menyimpan token JWT
      localStorage.setItem('token', data.token)

      setMessage('Login berhasil!')

      // Masuk ke Dashboard
      window.location.href = '/dashboard'

    } catch (error) {

      setError(
        'Tidak dapat terhubung ke server'
      )

    }
  }

  return (
    <div className="login-page">

      <div className="login-box">

        <div className="login-logo">
          📚
        </div>

        <h1>UNSIA Library</h1>

        <p className="login-subtitle">
          Digital Library Dashboard
        </p>


        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>


        {message && (
          <p className="success-message">
            {message}
          </p>
        )}


        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        <p className="register-text">

          Belum punya akun?

          <a href="/register">
            {' '}Register
          </a>

        </p>

      </div>

    </div>
  )
}

export default Login