import { useState } from 'react'
import './Register.css'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {

    e.preventDefault()

    setMessage('')
    setError('')

    try {

      const response = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Register gagal')
        return
      }

      setMessage('Register berhasil! Silakan login.')

      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {

      setError(
        'Tidak dapat terhubung ke server'
      )

    }
  }

  return (
    <div className="register-page">

      <div className="register-box">

        <div className="register-logo">
          📚
        </div>

        <h1>UNSIA Library</h1>

        <p className="register-subtitle">
          Buat akun baru
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">

            <label>Nama</label>

            <input
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>


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
            className="register-button"
          >
            Register
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


        <p className="login-text">

          Sudah punya akun?

          <a href="/login">
            {' '}Login
          </a>

        </p>

      </div>

    </div>
  )
}

export default Register