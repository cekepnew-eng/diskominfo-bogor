import { Routes, Route } from "react-router-dom";
import AccessibilityWidget from "./ui/AccessibilityWidget";
import FloatingIconBar from "./components/FloatinIcons";
import HomePage from "./pages/home";
import LandingPage from "./pages/LandingPage";
import VisiMisi from "./pages/VisiMisi";
import Sejarah from "./pages/Sejarah";
import Struktur from "./pages/Struktur";
import NewsList from "./pages/BeritaPage";
import NewsDetail from "./pages/BeritaDetailPage";
import GaleriPage from "./pages/GaleriPage";
import FotoPage from "./pages/FotoPage";
import VideoPage from "./pages/VideoPage";
import DetailGaleriPage from "./pages/DetailGaleriPage"; // Ini Daftar Semua Album
import DetailAlbumPage from "./pages/DetailAlbumPage";   // Ini Isi Foto di dalam Album
import CalendarPage from "./pages/AgendaPage";
import SambutanFull from "./pages/SambutanFull";
import Kontak from "./pages/Kontak";
import DokumenPage from "./pages/DokumenPage";
import NotFound from "./pages/NotFound";
import ProfilePage from './pages/Profil';
import Komitmen from "./pages/Komitmen";
import DaftarKomitmen from "./pages/DaftarKomitmen";
import DaftarKomitmenPublik from "./pages/DaftarKomitmenPublik";
import Penelitian from "./pages/penelitian";
import SubmitPenelitian from "./pages/Submit-Penelitian";
import Magang from "./pages/Magang";
import DaftarJurnal from "./pages/Daftar-Jurnal";
import PengajuanTte from "./pages/PengajuanTte";
import TandaTanganPage from "./pages/Tanda-TanganPage";
import ScrollToTop from "./components/ScrollToTop";

// =================================================================
// HALAMAN DINAMIS
// =================================================================
import DynamicPage from "./pages/DynamicPage";
import DynamicDetailPage from "./pages/DynamicDetailPage";

function App() {
  return (
    <>
      <AccessibilityWidget />
      <FloatingIconBar />
      <ScrollToTop />
      <Routes>
        {/* Beranda */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Profil */}
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/struktur" element={<Struktur />} />

        {/* Publikasi */}
        <Route path="/berita" element={<NewsList />} />
        <Route path="/berita/:id" element={<NewsDetail />} />

        {/* ================================================================= */}
        {/* AREA GALERI (SUDAH DISINKRONKAN)                                  */}
        {/* ================================================================= */}
        {/* 1. Hub Galeri (Ringkasan Foto, Video, Album) */}
        <Route path="/galeri" element={<GaleriPage />} />
        
        {/* 2. Daftar Semua Foto */}
        <Route path="/galeri/foto" element={<FotoPage />} /> 
        
        {/* 3. Daftar Semua Video */}
        <Route path="/galeri/video" element={<VideoPage />} />
        
        {/* 4. Daftar Semua Folder Album */}
        <Route path="/galeri/semua-album" element={<DetailGaleriPage />} />
        
        {/* 5. Isi Foto/Video di Dalam Satu Album Tertentu */}
        <Route path="/galeri/album/:id" element={<DetailAlbumPage />} />

        {/* Halaman Lainnya */}
        <Route path="/agenda" element={<CalendarPage />} />
        <Route path="/sambutan-full" element={<SambutanFull />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/dokumen" element={<DokumenPage />} />
        
        {/* KOMITMEN AREA */}
        <Route path="/komitmen" element={<Komitmen />} />
        <Route path="/daftar-komitmen" element={<DaftarKomitmen />} />
        <Route path="/daftar-publik" element={<DaftarKomitmenPublik />} />

        {/* LAYANAN PUBLIK */}
        <Route path="/penelitian" element={<Penelitian />} />
        <Route path="/submit-penelitian" element={<SubmitPenelitian />} />
        <Route path="/magang" element={<Magang />} />
        <Route path="/daftar-jurnal" element={<DaftarJurnal />} />
        <Route path="/pengajuan-tte" element={<PengajuanTte />} />
        <Route path="/tanda-tangan" element={<TandaTanganPage />} />
        <Route path="/verifikasi-pdf" element={<TandaTanganPage />} />

        {/* HALAMAN DINAMIS */}
        <Route path="/page/:menuId" element={<DynamicPage />} />
        <Route path="/page/detail/:contentId" element={<DynamicDetailPage />} />
        
        {/* Halaman 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;