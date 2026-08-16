import { useEffect, useState } from 'react'
import './members.css'

function Members() {

  const [members, setMembers] = useState([])

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const [editId, setEditId] = useState(null)

  const token = localStorage.getItem('token')


  // =========================
  // MENGAMBIL DATA MEMBER
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

        alert(
          data.message ||
          'Gagal mengambil data anggota'
        )

        return

      }

      setMembers(data)

    } catch (error) {

      console.error(error)

      alert(
        'Tidak dapat terhubung ke server'
      )

    }

  }


  useEffect(() => {

    getMembers()

  }, [])


  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setName('')
    setPhone('')
    setAddress('')
    setEditId(null)

  }


  // =========================
  // TAMBAH / UPDATE MEMBER
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()


    const memberData = {
      name,
      phone,
      address
    }


    try {

      let response


      // UPDATE

      if (editId) {

        response = await fetch(
          `http://localhost:5000/api/members/${editId}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(memberData)
          }
        )

      }

      // TAMBAH

      else {

        response = await fetch(
          'http://localhost:5000/api/members',
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(memberData)
          }
        )

      }


      const data = await response.json()


      if (!response.ok) {

        alert(
          data.message ||
          'Gagal menyimpan anggota'
        )

        return

      }


      alert(
        editId
          ? 'Anggota berhasil diperbarui'
          : 'Anggota berhasil ditambahkan'
      )


      resetForm()

      getMembers()


    } catch (error) {

      console.error(error)

      alert(
        'Tidak dapat terhubung ke server'
      )

    }

  }


  // =========================
  // EDIT MEMBER
  // =========================

  const handleEdit = (member) => {

    setEditId(member._id)

    setName(member.name)

    setPhone(member.phone)

    setAddress(member.address)


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }


  // =========================
  // HAPUS MEMBER
  // =========================

  const handleDelete = async (id) => {

    const yakin = window.confirm(
      'Apakah Anda yakin ingin menghapus anggota ini?'
    )


    if (!yakin) {

      return

    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/members/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )


      const data = await response.json()


      if (!response.ok) {

        alert(
          data.message ||
          'Gagal menghapus anggota'
        )

        return

      }


      alert(
        'Anggota berhasil dihapus'
      )


      getMembers()


    } catch (error) {

      console.error(error)

      alert(
        'Tidak dapat terhubung ke server'
      )

    }

  }


  return (

    <div className="page">


      {/* HEADER */}

      <div className="page-header">

        <div>

          <h1>
            Data Anggota
          </h1>

          <p>
            Kelola data anggota UNSIA Digital Library
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
            ? 'Edit Anggota'
            : 'Tambah Anggota'
          }

        </h2>


        <form
          onSubmit={handleSubmit}
          className="member-form"
        >


          <input
            type="text"
            placeholder="Nama anggota"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />


          <input
            type="text"
            placeholder="Nomor telepon"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />


          <input
            type="text"
            placeholder="Alamat"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />


          <button
            type="submit"
            className="save-button"
          >

            {editId
              ? 'Update Anggota'
              : 'Tambah Anggota'
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

        <h2>
          Daftar Anggota
        </h2>


        <table>

          <thead>

            <tr>

              <th>No</th>

              <th>Nama</th>

              <th>Telepon</th>

              <th>Alamat</th>

              <th>Aksi</th>

            </tr>

          </thead>


          <tbody>

            {members.map((member, index) => (

              <tr key={member._id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {member.name}
                </td>

                <td>
                  {member.phone}
                </td>

                <td>
                  {member.address}
                </td>

                <td>

                  <button
                    onClick={() =>
                      handleEdit(member)
                    }
                    className="edit-button"
                  >
                    Edit
                  </button>


                  <button
                    onClick={() =>
                      handleDelete(member._id)
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


export default Members