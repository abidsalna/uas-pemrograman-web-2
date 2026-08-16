import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found">

      <div className="not-found-box">

        <div className="not-found-icon">
          📚
        </div>

        <h1>404</h1>

        <h2>Halaman Tidak Ditemukan</h2>

        <p>
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>

        <Link
          to="/dashboard"
          className="back-button"
        >
          ← Kembali ke Dashboard
        </Link>

      </div>

    </div>
  )
}

export default NotFound