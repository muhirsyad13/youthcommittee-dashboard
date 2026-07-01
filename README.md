# YouthCommittee Dashboard

## Deskripsi Project

YouthCommittee Dashboard adalah website **Sistem Informasi Karang Taruna Digital** yang dirancang untuk membantu pengelolaan data organisasi dan data warga secara modern, interaktif, dan aman.

Website ini menyediakan fitur dashboard statistik, manajemen data warga, profil organisasi, struktur organisasi, program kerja, serta sistem keamanan berlapis untuk melindungi data sensitif.

---

## Fitur Utama

### Dashboard Interaktif

* Statistik jumlah warga secara real-time
* Chart jenis kelamin
* Chart status keluarga
* Persebaran alamat warga
* Activity system log
* Security score monitoring

### Profil Karang Taruna

Menampilkan:

* Tentang organisasi
* Visi & Misi
* Tujuan organisasi
* Nilai organisasi (Innovation, Collaboration, Integrity)

### Struktur Organisasi Visual

Menampilkan struktur organisasi YouthCommittee dalam bentuk visual card modern, termasuk:

* Dewan Mentor & Pembina
* Strategic Management & Partnership
* Operations & Industrial System
* Creative & Industrial Design
* Legal & Compliance

### Program Kerja

Program kerja yang sudah dan akan dilaksanakan:

* Halal Bihalal “Syawal Ceria The Golden Route”
* Program HUT RI

### Data Warga (Admin Only)

Fitur khusus admin:

* Tambah data manual
* Edit data
* Hapus data
* Import Excel
* Export PDF
* Statistik otomatis terhubung ke dashboard

---

## Teknologi yang Digunakan

### Frontend

* HTML5
* CSS3
* JavaScript Vanilla

### Library / Plugin

* Chart.js
* SweetAlert2
* Font Awesome
* SheetJS (XLSX)

### Storage

* LocalStorage
* SessionStorage

---

## Sistem Keamanan

Project ini menerapkan beberapa lapisan keamanan:

### 1. Login Attempt Limit

Mencegah brute force attack dengan membatasi jumlah percobaan login.

### 2. Session Timeout

User otomatis logout jika tidak ada aktivitas selama periode tertentu.

Contoh implementasi:

* Mouse move
* Scroll
* Click
* Keyboard input

### 3. Admin Double Verification

Untuk mengakses Data Warga, admin wajib melewati:

* Security PIN
* Captcha Verification

### 4. DevTools Detection

Sistem dapat mendeteksi ketika browser developer tools dibuka dan mencatat audit log.

### 5. Audit Logging

Setiap aktivitas sensitif dicatat, seperti:

* Login
* Logout
* Akses admin
* Security alert
* Session timeout

### 6. Security Score

Dashboard menampilkan skor keamanan sistem secara real-time dengan status:

* Secure
* Warning
* Critical

---

## Struktur Folder

```bash
project/
│
├── assets/
│   └── Logo.png
│
├── css/
│   ├── dashboard.css
│   ├── login.css
│   └── warga.css
│
├── js/
│   ├── dashboard.js
│   ├── warga.js
│   ├── auth.js
│   ├── audit.js
│   ├── notification.js
│   └── advanced-security.js
│
├── dashboard.html
├── login.html
├── warga.html
└── README.md
```

---

## Cara Menjalankan Project

### Clone Repository

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

### Masuk Folder Project

```bash
cd REPOSITORY
```

### Jalankan

Buka file:

```bash
login.html
```

atau gunakan extension Live Server di VS Code.

---

## Role User

### Admin

Memiliki akses ke:

* Dashboard penuh
* Data Warga
* Import/export data
* Security management

### User

Hanya dapat mengakses:

* Dashboard umum
* Profil organisasi
* Program kerja
* Pengumuman

---

## Studi Kasus

Website ini dikembangkan sebagai implementasi digitalisasi organisasi Karang Taruna untuk:

* meningkatkan efisiensi administrasi
* mempercepat pengelolaan data warga
* meningkatkan keamanan data
* mendukung transformasi digital lingkungan masyarakat

---

## Author

Developed by:

**Muhammad Irsyad**
Teknik Informatika
YouthCommittee Digital System
