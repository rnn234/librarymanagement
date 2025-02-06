# Library Management System
Library Management System
📌 Introduction
Library Management System adalah aplikasi berbasis Node.js dan PostgreSQL untuk mengelola peminjaman dan pengembalian buku di perpustakaan.

🛠 Tech Stack
Backend: Node.js, Express.js
Database: PostgreSQL
ORM: Sequelize
🚀 Features
Manajemen Buku (Tambah, lihat, edit, hapus)
Manajemen Anggota (Registrasi, lihat daftar anggota)
Proses Peminjaman & Pengembalian
Validasi Data
📂 Project Structure
graphql
Copy
Edit
library-management-system/
│-- src/
│   ├── config/          # Konfigurasi database
│   ├── controllers/     # Business logic (Controllers)
│   ├── models/          # ORM Models
│   ├── routes/          # API Routes
│   ├── services/        # Business Logic (Services)
│   ├── app.js           # Main Express App
│   ├── server.js        # Server Setup
│-- sql/
│   ├── schema.sql       # Struktur database
│   ├── seed.sql         # Sample data
│-- README.md            # Dokumentasi
│-- package.json         # Dependencies & Scripts
⚙️ Setup Instructions
1️⃣ Clone Repository

sh
Copy
Edit
git clone https://github.com/username/library-management-system.git
cd library-management-system
2️⃣ Install Dependencies

sh
Copy
Edit
npm install
3️⃣ Konfigurasi Environment Variables
Buat file .env dan isi dengan konfigurasi database PostgreSQL:

ini
Copy
Edit
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=library_db
DB_PORT=5432
4️⃣ Setup Database
Buat database dan jalankan schema SQL:

sh
Copy
Edit
psql -U your_username -d library_db -f sql/schema.sql
psql -U your_username -d library_db -f sql/seed.sql
5️⃣ Jalankan Server

sh
Copy
Edit
npm start
Server akan berjalan di http://localhost:3000.

📌 API Documentation
📚 Books
📌 Get All Books

http
Copy
Edit
GET /api/books
Response Example

json
Copy
Edit
{
  "data": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "stock": 5
    }
  ]
}
📌 Add New Book

http
Copy
Edit
POST /api/books
Content-Type: application/json
Request Body

json
Copy
Edit
{
  "title": "New Book",
  "author": "Author Name",
  "stock": 10
}
Response

json
Copy
Edit
{
  "message": "Book added successfully"
}
🧑 Members
📌 Get All Members

http
Copy
Edit
GET /api/members
📌 Register New Member

http
Copy
Edit
POST /api/members
Content-Type: application/json
Request Body

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "phone": "081234567890",
  "address": "123 Main St"
}
Response

json
Copy
Edit
{
  "message": "Member registered successfully"
}
📖 Borrowing & Returning
📌 Borrow a Book

http
Copy
Edit
POST /api/borrow
Content-Type: application/json
Request Body

json
Copy
Edit
{
  "member_id": "1",
  "book_id": "2"
}
📌 Return a Book

http
Copy
Edit
POST /api/return
Content-Type: application/json
Request Body

json
Copy
Edit
{
  "member_id": "1",
  "book_id": "2"
}
🛠 Contribution
Fork repository
Buat branch baru (git checkout -b feature-branch)
Commit perubahan (git commit -m "Add new feature")
Push ke branch (git push origin feature-branch)
Buat Pull Request