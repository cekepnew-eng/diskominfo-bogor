import axios from 'axios';

// Konfigurasi instance axios dengan URL dasar dari API Laravel Anda.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://adm-diskominfo.kotabogor.go.id/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- GALERI ---
// Fungsi untuk mengambil semua album
export const getAlbums = () => apiClient.get('/albums');

// Fungsi untuk mengambil semua foto
export const getPhotos = () => apiClient.get('/galeri');

// Fungsi untuk mengambil semua video
export const getVideos = () => apiClient.get('/video');

// Fungsi untuk mengambil konten (foto & video) dari sebuah album spesifik
export const getAlbumContent = (albumId) => apiClient.get(`/album-content/${albumId}`);


// --- BERITA (NEWS) ---
// Fungsi untuk mengambil semua daftar berita (biasanya buat list di hal. depan/berita)
export const getNews = () => apiClient.get('/berita');

// Fungsi untuk mengambil detail satu berita spesifik berdasarkan ID
// Ini yang bakal dipake di BeritaDetailPage lo tadi
export const getNewsDetail = (id) => apiClient.get(`/berita/${id}`);


// --- KOMITMEN (PENANDATANGANAN) ---
// Jika nanti lo butuh fetch data komitmen di file ini, bisa pakai ini:
export const getDaftarKomitmen = () => apiClient.get('/komitmen/daftar');

// Verifikasi kode renlap petugas
export const verifyRenlapCode = (passcode) => apiClient.post('/komitmen/verify-renlap', { passcode });

export default apiClient;