# Struktur Database Layanan Publik (Versi Lengkap dengan Tipe Data)

Berikut adalah struktur database yang disederhanakan (masing-masing layanan hanya butuh 1 tabel tersendiri) lengkap dengan rincian **Tipe Data** (VARCHAR, INT, TEXT, dll) untuk memudahkan pembuatan kolom di database sesungguhnya.

---

## 1. Tabel `pengajuan_magang`
Menampung seluruh inputan dari formulir Pendaftaran Magang (PKL).

| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | INT (Auto Increment) | Primary Key / ID unik baris data |
| `nomor_tiket` | VARCHAR(20) | Nomor pelacakan status (Contoh: MGG-001) |
| `nama_lengkap` | VARCHAR(150) | Nama pendaftar sesuai form |
| `email` | VARCHAR(100) | Email aktif pendaftar |
| `no_whatsapp` | VARCHAR(20) | Nomor HP / WhatsApp |
| `asal_kampus_sekolah` | VARCHAR(150) | Nama Universitas / Sekolah |
| `posisi_diminati` | VARCHAR(100) | Pilihan posisi (Web Dev, UI/UX, dll) |
| `lokasi_magang` | VARCHAR(100) | Pilihan lokasi (Diskominfo / Kecamatan) |
| `bidang_tujuan` | VARCHAR(100) | Pilihan bidang (Aplikasi, IKP, Infrastruktur) |
| `lama_minggu` | INT | Lama waktu magang dalam angka (Contoh: 12) |
| `file_surat_cv` | VARCHAR(255) | Lokasi / Path nama file PDF yang di-upload |
| `status_pengajuan` | ENUM | 'Menunggu', 'Review', 'Diterima', 'Ditolak' |
| `tanggal_masuk` | TIMESTAMP | Waktu sistem saat form dikirim |

---

## 2. Tabel `pengajuan_penelitian`
Menampung seluruh inputan dari formulir Pengajuan Izin Riset & Data.

| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | INT (Auto Increment) | Primary Key / ID unik baris data |
| `nomor_tiket` | VARCHAR(20) | Nomor pelacakan status (Contoh: PNL-001) |
| `nama_peneliti` | VARCHAR(150) | Nama pemohon atau ketua peneliti |
| `email` | VARCHAR(100) | Email aktif peneliti |
| `no_whatsapp` | VARCHAR(20) | Nomor HP / WhatsApp |
| `asal_kampus` | VARCHAR(150) | Nama Universitas / Instansi asal pemohon |
| `judul_penelitian` | VARCHAR(255) | Judul riset/skripsi yang diajukan |
| `tujuan_penelitian` | TEXT | Keterangan tambahan / tujuan riset dilakukan |
| `file_surat_pengantar` | VARCHAR(255) | Lokasi / Path file Surat Pengantar dari Kampus |
| `file_proposal` | VARCHAR(255) | Lokasi / Path file Proposal Penelitian (PDF) |
| `status_pengajuan` | ENUM | 'Menunggu', 'Review', 'Diterima', 'Ditolak' |
| `tanggal_masuk` | TIMESTAMP | Waktu sistem saat form dikirim |

---

## 3. Tabel `publikasi_jurnal`
Menampung seluruh data dari formulir penyerahan/publikasi Jurnal.

| Nama Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | INT (Auto Increment) | Primary Key / ID unik baris data |
| `nomor_tiket` | VARCHAR(20) | Nomor pelacakan status (Contoh: JRN-001) |
| `nama_penulis` | VARCHAR(150) | Nama penulis jurnal / karya akhir |
| `email` | VARCHAR(100) | Email aktif penulis |
| `no_whatsapp` | VARCHAR(20) | Nomor HP / WhatsApp |
| `asal_kampus_instansi`| VARCHAR(150) | Asal Instansi / Universitas |
| `judul_jurnal` | VARCHAR(255) | Judul jurnal atau karya tulis ilmiah |
| `file_jurnal_pdf` | VARCHAR(255) | Lokasi / Path file Jurnal (PDF) |
| `status_publikasi` | ENUM | 'Menunggu', 'Review', 'Dipublikasi', 'Ditolak' |
| `tanggal_masuk` | TIMESTAMP | Waktu sistem saat form dikirim |
