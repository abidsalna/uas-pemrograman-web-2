UNSIA Digital Library

Aplikasi web perpustakaan digital yang digunakan untuk mengelola data buku, anggota, dan peminjaman buku.

Teknologi yang Digunakan

- Frontend: React.js
- Backend: Node.js dan Express.js
- Database: MongoDB
- Authentication: JWT
- Password Hashing: bcryptjs
- Grafik Dashboard: Chart.js

 Struktur Aplikasi

- frontend digunakan sebagai tampilan aplikasi.
- backend digunakan untuk API dan proses pengolahan data.
- MongoDB digunakan sebagai database.

 Cara Menjalankan Backend





1.Menjalankan Backend

Buka Terminal atau Command Prompt, Masuk ke folder project kemudian masuk ke folder backend:

bash
cd backend

2. npm install , npm run dev

3. buat file env di dalam folder backend
				
				 PORT=5000
				MONGO_URI=isi_connection_string_mongodb
				JWT_SECRET=isi_secret_jwt

4.  node server.js , http://localhost:5000 , 


{ "message": "Server berjalan dengan baik" }

5.  Buka Terminal atau Command Prompt, Masuk ke folder project kemudian masuk ke folder frontend:

bash
cd frontend

6.  npm install , npm run dev , server berjalan pada alamat http://localhost:5173

7.  http://localhost:5173/login






8.  Halaman Website

Dashboard
Menampilkan:

Total Buku
Total Anggota
Total Peminjaman
Statistik peminjaman
Data Buku

Data Buku
Digunakan untuk:

Melihat data buku
Menambahkan buku
Mengubah data buku
Menghapus buku
Data Anggota

Data Anggota
Digunakan untuk:

Melihat data anggota
Menambahkan anggota
Mengubah data anggota
Menghapus anggota
Peminjaman

Peminjaman
Digunakan untuk:

Melihat data peminjaman
Melakukan peminjaman buku
Mengembalikan buku
Memperbarui stok buku
Authentication

Authentication
Digunakan untuk:

Register
Login
Melihat profile pengguna
Mengubah password
Logout