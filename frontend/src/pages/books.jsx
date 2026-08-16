import { useEffect, useState } from 'react'
import './books.css'

function Books() {

  const [books, setBooks] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')

  const [editId, setEditId] = useState(null)

  const token = localStorage.getItem('token')

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
      alert('Tidak dapat terhubung ke server')

    }

  }


  useEffect(() => {

    getBooks()

  }, [])


  const resetForm = () => {

    setTitle('')
    setAuthor('')
    setCategory('')
    setStock('')
    setEditId(null)

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    const bookData = {
      title,
      author,
      category,
      stock: Number(stock)
    }

    try {

      let response

      if (editId) {

        response = await fetch(
          `http://localhost:5000/api/books/${editId}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(bookData)
          }
        )

      } else {

        response = await fetch(
          'http://localhost:5000/api/books',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(bookData)
          }
        )

      }

      const data = await response.json()

      if (!response.ok) {

        alert(data.message || 'Gagal menyimpan buku')
        return

      }

      alert(
        editId
          ? 'Buku berhasil diperbarui'
          : 'Buku berhasil ditambahkan'
      )

      resetForm()
      getBooks()

    } catch (error) {

      console.error(error)
      alert('Tidak dapat terhubung ke server')

    }

  }


  const handleEdit = (book) => {

    setEditId(book._id)
    setTitle(book.title)
    setAuthor(book.author)
    setCategory(book.category)
    setStock(book.stock)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }


  const handleDelete = async (id) => {

    const yakin = window.confirm(
      'Apakah Anda yakin ingin menghapus buku ini?'
    )

    if (!yakin) {
      return
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/books/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {

        alert(data.message || 'Gagal menghapus buku')
        return

      }

      alert('Buku berhasil dihapus')

      getBooks()

    } catch (error) {

      console.error(error)
      alert('Tidak dapat terhubung ke server')

    }

  }


  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h1>Data Buku</h1>

          <p>
            Kelola data buku UNSIA Digital Library
          </p>

        </div>

        <a href="/dashboard">
          ← Dashboard
        </a>

      </div>


      {/* FORM */}

      <div className="content-box">

        <h2>
          {editId
            ? 'Edit Buku'
            : 'Tambah Buku'
          }
        </h2>

        <form
          onSubmit={handleSubmit}
          className="book-form"
        >

          <input
            type="text"
            placeholder="Judul buku"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Penulis"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Kategori"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
          />

          <input
            type="number"
            placeholder="Stok"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            min="0"
            required
          />

          <button
            type="submit"
            className="save-button"
          >
            {editId
              ? 'Update Buku'
              : 'Tambah Buku'
            }
          </button>

          {editId && (

            <button
              type="button"
              onClick={resetForm}
              className="cancel-button"
            >
              Batal
            </button>

          )}

        </form>

      </div>


      {/* TABEL */}

      <div className="content-box">

        <h2>Daftar Buku</h2>

        <table>

          <thead>

            <tr>

              <th>No</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Stok</th>
              <th>Aksi</th>

            </tr>

          </thead>

          <tbody>

            {books.map((book, index) => (

              <tr key={book._id}>

                <td>{index + 1}</td>

                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.category}</td>

                <td>{book.stock}</td>

                <td>

                  <button
                    onClick={() =>
                      handleEdit(book)
                    }
                    className="edit-button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(book._id)
                    }
                    className="delete-button"
                  >
                    Hapus
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Books