import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


import Login from './pages/Login'
import Register from './pages/Register'
import Books from './pages/Books'
import Members from './pages/Members'
import Loans from './pages/Loans'
import NotFound from './pages/NotFound'
import './App.css'

import { Bar } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
function ProtectedRoute({ children }) {

  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalBooks: 0,
    totalMembers: 0,
    totalLoans: 0,
    borrowedBooks: 0,
    returnedBooks: 0
  })


  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch('http://localhost:5000/api/dashboard/summary', {
      method: 'GET',

      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

      .then(response => {

        if (!response.ok) {
          throw new Error('Gagal mengambil data dashboard')
        }

        return response.json()
      })

      .then(data => {

        console.log("Data dashboard:", data)

        setDashboard(data)

      })

      .catch(error => {

        console.error(
          "Gagal mengambil data dashboard:",
          error
        )

      })

  }, [])


  // Data untuk grafik
  const chartData = {

    labels: [
      'Dipinjam',
      'Dikembalikan'
    ],

    datasets: [
      {
        label: 'Jumlah Buku',

        data: [
          dashboard.borrowedBooks,
          dashboard.returnedBooks
        ],

        borderWidth: 1
      }
    ]

  }


  // Pengaturan grafik
  const chartOptions = {

    responsive: true,

    scales: {

      y: {

        beginAtZero: true,

        ticks: {
          stepSize: 1,
          precision: 0
        }

      }

    },

    plugins: {

      legend: {
        display: true
      },

      title: {

        display: true,

        text: 'Statistik Peminjaman Buku'

      }

    }

  }


  return (

    <div className="dashboard-container">


      {/* SIDEBAR */}

      <aside className="sidebar">

        <h2>
          📚 UNSIA Library
        </h2>


        <nav>

          <a href="/dashboard">
            🏠 Dashboard
          </a>

          <a href="/books">
            📖 Data Buku
          </a>

          <a href="/members">
            👥 Data Anggota
          </a>

          <a href="/loans">
            📋 Peminjaman
          </a>

        </nav>


        <button
          className="logout"
          onClick={() => {

            localStorage.removeItem("token")

            window.location.href = "/login"

          }}
        >
          Logout
        </button>

      </aside>


      {/* KONTEN UTAMA */}

      <main className="main">


        {/* HEADER */}

        <header className="header">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Selamat datang di UNSIA Digital Library
            </p>

          </div>


          <div className="user">
            👤 Admin
          </div>

        </header>


        {/* KARTU STATISTIK */}

        <section className="cards">


          <div className="card">

            <div className="icon">
              📚
            </div>

            <div>

              <h3>
                Total Buku
              </h3>

              <p>
                {dashboard.totalBooks}
              </p>

            </div>

          </div>


          <div className="card">

            <div className="icon">
              👥
            </div>

            <div>

              <h3>
                Total Anggota
              </h3>

              <p>
                {dashboard.totalMembers}
              </p>

            </div>

          </div>


          <div className="card">

            <div className="icon">
              📋
            </div>

            <div>

              <h3>
                Peminjaman
              </h3>

              <p>
                {dashboard.totalLoans}
              </p>

            </div>

          </div>


        </section>


        {/* GRAFIK */}

        <section className="content-box">

          <h2>
            Statistik Peminjaman
          </h2>


          <div style={{ height: '400px' }}>

            <Bar
              data={chartData}
              options={chartOptions}
            />

          </div>

        </section>


      </main>

    </div>

  )

}


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD */}
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/loans"
  element={
    <ProtectedRoute>
      <Loans />
    </ProtectedRoute>
  }
/>

<Route
  path="/members"
  element={
    <ProtectedRoute>
      <Members />
    </ProtectedRoute>
  }
/>

<Route
  path="/books"
  element={
    <ProtectedRoute>
      <Books />
    </ProtectedRoute>
  }
/>


        {/* HALAMAN AWAL */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
        

    <Route
  path="*"
  element={<NotFound />}
/>


      </Routes>

    </BrowserRouter>

  )

}


export default App