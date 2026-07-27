# Struktur Database Layanan Publik (Versi Normalisasi / 3NF)

Tipe data yang saya berikan sebelumnya sudah sangat standar dan umum digunakan dalam *Database Management System* (seperti MySQL atau PostgreSQL), jadi tidak ngaco. 😊

Berikut adalah bentuk database yang sudah **Dinormalisasi (3NF)**. Kita memecah tabel agar **tidak ada duplikasi data** (misalnya: jika satu orang mendaftar magang lalu mendaftar penelitian, data namanya tidak perlu diketik ulang di tabel yang berbeda).

---

## A. Tabel Pengguna (Data Diri)
Tabel ini khusus menyimpan biodata pendaftar. 

### 1. Tabel `users` (Pemohon)
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_user` | INT (Auto Increment) | **Primary Key** |
| `nama_lengkap` | VARCHAR(150) | Nama lengkap pendaftar |
| `email` | VARCHAR(100) | Email aktif (sebaiknya diatur *Unique*) |
| `no_whatsapp` | VARCHAR(20) | Nomor HP / WhatsApp |
| `asal_instansi` | VARCHAR(150) | Nama Kampus / Sekolah / Instansi |

---

## B. Tabel Master (Data Pilihan / Dropdown)
Tabel ini digunakan untuk isi dropdown di formulir, agar pilihan pendaftar selalu konsisten dan tidak salah ketik (typo).

### 2. Tabel `master_posisi`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_posisi` | INT (Auto Increment) | **Primary Key** |
| `nama_posisi` | VARCHAR(100) | Contoh: Web/App Developer, UI/UX, dll |

### 3. Tabel `master_bidang`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_bidang` | INT (Auto Increment) | **Primary Key** |
| `nama_bidang` | VARCHAR(100) | Contoh: Aplikasi, IKP, Infrastruktur |

### 4. Tabel `master_lokasi`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_lokasi` | INT (Auto Increment) | **Primary Key** |
| `nama_lokasi` | VARCHAR(100) | Contoh: Diskominfo, Kecamatan / Kelurahan |

---

## C. Tabel Transaksi (Layanan Publik)
Tabel ini adalah inti pengajuan. Tabel ini akan mengambil ID dari tabel `users` dan tabel `master` di atas (disebut *Foreign Key* / FK).

### 5. Tabel `pengajuan_magang`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_magang` | INT (Auto Increment) | **Primary Key** |
| `nomor_tiket` | VARCHAR(20) | Nomor Lacak (Contoh: MGG-001) (*Unique*) |
| `id_user` | INT | **Foreign Key** dari tabel `users` |
| `id_posisi` | INT | **Foreign Key** dari tabel `master_posisi` |
| `id_bidang` | INT | **Foreign Key** dari tabel `master_bidang` |
| `id_lokasi` | INT | **Foreign Key** dari tabel `master_lokasi` |
| `lama_minggu` | INT | Lama magang dalam satuan minggu |
| `file_cv_surat` | VARCHAR(255) | Lokasi/Path file PDF |
| `status_pengajuan` | ENUM | 'Menunggu', 'Review', 'Diterima', 'Ditolak' |
| `created_at` | TIMESTAMP | Waktu saat form di-submit |

### 6. Tabel `pengajuan_penelitian`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_penelitian`| INT (Auto Increment) | **Primary Key** |
| `nomor_tiket` | VARCHAR(20) | Nomor Lacak (Contoh: PNL-001) (*Unique*) |
| `id_user` | INT | **Foreign Key** dari tabel `users` |
| `judul_penelitian`| VARCHAR(255) | Judul Riset / Skripsi |
| `tujuan_penelitian`| TEXT | Keterangan tambahan penelitian |
| `file_surat_pengantar`| VARCHAR(255) | Lokasi/Path file Surat Pengantar |
| `file_proposal` | VARCHAR(255) | Lokasi/Path file Proposal Riset |
| `status_pengajuan`| ENUM | 'Menunggu', 'Review', 'Diterima', 'Ditolak' |
| `created_at` | TIMESTAMP | Waktu saat form di-submit |

### 7. Tabel `publikasi_jurnal`
| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id_jurnal` | INT (Auto Increment) | **Primary Key** |
| `nomor_tiket` | VARCHAR(20) | Nomor Lacak (Contoh: JRN-001) (*Unique*) |
| `id_user` | INT | **Foreign Key** dari tabel `users` |
| `judul_jurnal` | VARCHAR(255) | Judul karya ilmiah / jurnal |
| `file_jurnal_pdf`| VARCHAR(255) | Lokasi/Path file Jurnal (PDF) |
| `status_publikasi`| ENUM | 'Menunggu', 'Review', 'Dipublikasi', 'Ditolak' |
| `created_at` | TIMESTAMP | Waktu saat form di-submit |

---
**Tips:** 
Dengan konsep relasional (Normalisasi) di atas, database kamu menjadi lebih ringan, bersih dari inkonsistensi (typo), dan lebih profesional.
