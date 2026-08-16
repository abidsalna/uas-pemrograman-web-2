import { useEffect, useState } from 'react'
import './loans.css'

function Loans() {

  const [loans, setLoans] = useState([])
  const [books, setBooks] = useState([])
  const [members, setMembers] = useState([])

  const [book, setBook] = useState('')
  const [member, setMember] = useState('')

  const token = localStorage.getItem('token')

  // =========================
  // AMBIL DATA PEMINJAMAN
  // =========================

  const getLoans = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/loans',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Gagal mengambil data peminjaman')
        return
      }

      setLoans(data)

    } catch (error) {

      console.error(error)
      alert('Tidak dapat terhubung ke server')

    }

  }


  // =========================
  // AMBIL DATA BUKU
  // =========================

  const getBooks = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/books',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Gagal mengambil data buku')
        return
      }

      setBooks(data)

    } catch (error) {

      console.error(error)

    }

  }


  // =========================
  // AMBIL DATA MEMBER
  // =========================

  const getMembers = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/members',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Gagal mengambil data anggota')
        return
      }

      setMembers(data)

    } catch (error) {

      console.error(error)

    }

  }


  useEffect(() => {

    getLoans()
    getBooks()
    getMembers()

  }, [])


  // =========================
  // TAMBAH PEMINJAMAN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!book || !member) {
      alert('Silakan pilih buku dan anggota')
      return
    }

    try {

      const response = await fetch(
        'http://localhost:5000/api/loans',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            book,
            member
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {

        alert(data.message || 'Gagal membuat peminjaman')
        return

      }

      alert('Buku berhasil dipinjam')

      setBook('')
      setMember('')

      getLoans()
      getBooks()

    } catch (error) {

      console.error(error)
      alert('Tidak dapat terhubung ke server')

    }

  }


  // =========================
  // PENGEMBALIAN BUKU
  // =========================

  const handleReturn = async (id) => {

    const yakin = window.confirm(
      'Apakah buku ini sudah dikembalikan?'
    )

    if (!yakin) {
      return
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/loans/${id}/return`,
        {
          method: 'PUT',

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {

        alert(data.message || 'Gagal mengembalikan buku')
        return

      }

      alert('Buku berhasil dikembalikan')

      getLoans()
      getBooks()

    } catch (error) {

      console.error(error)
      alert('Tidak dapat terhubung ke server')

    }

  }


  return (

    <div className="loan-page">

      {/* HEADER */}

      <div className="loan-header">

        <div>

          <h1>Peminjaman</h1>

          <p>
            Kelola data peminjaman buku UNSIA Digital Library
          </p>

        </div>

        <a href="/dashboard">
          ← Dashboard
        </a>

      </div>


      {/* FORM PEMINJAMAN */}

      <div className="loan-box">

        <h2>Tambah Peminjaman</h2>

        <form
          onSubmit={handleSubmit}
          className="loan-form"
        >

          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            required
          >

            <option value="">
              Pilih Buku
            </option>

            {books
              .filter((item) => item.stock > 0)
              .map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.title} — Stok: {item.stock}
                </option>

              ))}

          </select>


          <select
            value={member}
            onChange={(e) => setMember(e.target.value)}
            required
          >

            <option value="">
              Pilih Anggota
            </option>

            {members.map((item) => (

              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>

            ))}

          </select>


          <button
            type="submit"
            className="loan-button"
          >
            Pinjam Buku
          </button>

        </form>

      </div>


      {/* TABEL PEMINJAMAN */}

      <div className="loan-box">

        <h2>Daftar Peminjaman</h2>

        <table>

          <thead>

            <tr>

              <th>No</th>
              <th>Buku</th>
              <th>Anggota</th>
              <th>Tanggal Pinjam</th>
              <th>Status</th>
              <th>Aksi</th>

            </tr>

          </thead>


          <tbody>

            {loans.map((item, index) => (

              <tr key={item._id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.book?.title || '-'}
                </td>

                <td>
                  {item.member?.name || '-'}
                </td>

                <td>
                  {new Date(
                    item.borrowDate
                  ).toLocaleDateString('id-ID')}
                </td>

                <td>
                  {item.status}
                </td>

                <td>

                  {item.status === 'Dipinjam' && (

                    <button
                      onClick={() =>
                        handleReturn(item._id)
                      }
                      className="return-button"
                    >
                      Kembalikan
                    </button>

                  )}

                  {item.status === 'Dikembalikan' && (
                    <span>
                      Selesai
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Loans