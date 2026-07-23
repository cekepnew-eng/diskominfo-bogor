import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Briefcase, BookOpen, 
  ClipboardList, UserCheck, Users, CheckSquare,
  ChevronDown, MonitorSmartphone, Server, Clapperboard, Search,
  ShieldCheck, Database, Megaphone, Palette, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopupModal from '../components/PopupModal';

export default function Penelitian() {
  const [selectedService, setSelectedService] = useState('penelitian');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const closePopup = () => setPopupConfig({ ...popupConfig, isOpen: false });

  const handleCekStatus = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jenisLayanan = formData.get('jenisLayanan');
    
    if (jenisLayanan === 'penelitian') {
      const rand = Math.random();
      if (rand < 0.33) {
        setPopupConfig({
          isOpen: true,
          type: 'success',
          title: 'Permohonan Diterima',
          message: 'Status Pengajuan Penelitian: Telah Disetujui!\n\nSurat balasan (izin penelitian) sudah dikirimkan melalui alamat email yang Anda daftarkan.'
        });
      } else if (rand < 0.66) {
        setPopupConfig({
          isOpen: true,
          type: 'process',
          title: 'Sedang Diproses',
          message: 'Status Pengajuan Penelitian: Sedang dalam proses review oleh Tim Diskominfo Kota Bogor.\n\nMohon menunggu 1-3 hari kerja.'
        });
      } else {
        setPopupConfig({
          isOpen: true,
          type: 'not-found',
          title: 'Tiket Tidak Ditemukan',
          message: 'Maaf, nomor tiket yang Anda masukkan tidak valid atau tidak ditemukan dalam sistem kami.'
        });
      }
    } else if (jenisLayanan === 'magang') {
      const rand = Math.random();
      if (rand < 0.25) {
        setPopupConfig({
          isOpen: true,
          type: 'process',
          title: 'Sedang Diproses',
          message: 'Status Pengajuan Magang: Sedang dalam proses review oleh Tim SDM Diskominfo Kota Bogor.\n\nMohon menunggu informasi selanjutnya.'
        });
      } else if (rand < 0.5) {
        setPopupConfig({
          isOpen: true,
          type: 'success',
          title: 'Permohonan Diterima',
          message: 'Selamat, permohonan magang Anda telah Disetujui!\n\nSurat balasan (penerimaan magang) sudah dikirimkan melalui alamat email Anda.'
        });
      } else if (rand < 0.75) {
        setPopupConfig({
          isOpen: true,
          type: 'error',
          title: 'Permohonan Ditolak',
          message: 'Maaf, permohonan magang Anda saat ini belum dapat kami terima.\n\nAlasan penolakan telah dikirimkan secara detail melalui alamat email Anda.'
        });
      } else {
        setPopupConfig({
          isOpen: true,
          type: 'not-found',
          title: 'Tiket Tidak Ditemukan',
          message: 'Maaf, nomor tiket yang Anda masukkan tidak valid atau tidak ditemukan dalam sistem kami.'
        });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-hidden bg-slate-50 min-h-screen pt-24 pb-12">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-sky-100/40 to-slate-50/0 -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="section pt-4 pb-12 md:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Bagian Kiri: Typografi & Bento Grid */}
            <div className="w-full lg:w-1/2 lg:pr-10" data-aos="fade-up" data-aos-duration="1000">
              <div className="mb-8">
                <span className="inline-block bg-sky-100 text-sky-600 px-4 py-1.5 rounded-full font-bold text-sm mb-6">
                  Layanan KOMINFO
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.2] tracking-tight text-slate-900 mb-6">
                  Pusat <span className="text-sky-500">Penelitian, Magang</span><br/>
                  <span className="text-sky-500">& Publikasi Jurnal</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-500 font-normal max-w-[90%]">
                  Diskominfo Kota Bogor memfasilitasi para mahasiswa, peneliti, dan akademisi untuk melaksanakan berbagai kegiatan akademik. Mulai dari pengajuan izin penelitian, program magang profesional (PKL), hingga pengumpulan berkas jurnal atau karya tulis ilmiah Anda secara terintegrasi.<br/><br/>
                  Silakan pilih layanan yang Anda butuhkan di bawah ini.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link to="/submit-penelitian" className="group flex-1 bg-white border border-slate-100 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_15px_30px_rgba(14,165,233,0.08)] shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-sky-100 text-sky-600 group-hover:bg-sky-500 group-hover:text-white">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-slate-900 font-extrabold text-base mb-1">Penelitian</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-0">Pengajuan Izin Riset & Data</p>
                </Link>
                
                <Link to="/magang" className="group flex-1 bg-white border border-slate-100 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_15px_30px_rgba(22,163,74,0.08)] shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-slate-900 font-extrabold text-base mb-1">Magang</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-0">Pendaftaran Program PKL</p>
                </Link>

                <Link to="/daftar-jurnal" className="group flex-1 bg-white border border-slate-100 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_15px_30px_rgba(217,119,6,0.08)] shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-slate-900 font-extrabold text-base mb-1">Jurnal</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-0">Publikasi Karya Hasil Akhir</p>
                </Link>
              </div>
            </div>

            {/* Bagian Kanan: Image / Illustration */}
            <div className="w-full lg:w-5/12 lg:ml-auto mt-12 lg:mt-0 relative" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
              {/* Decorative Background Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square bg-gradient-to-tr from-sky-200/40 via-blue-100/20 to-sky-100/50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-sky-300/30 rounded-full blur-2xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Image Container */}
              <div className="relative w-full flex justify-center items-center p-4">
                <img 
                  src="/Penelitian.png" 
                  className="w-full max-w-[500px] h-auto object-contain filter drop-shadow-[0_20px_30px_rgba(14,165,233,0.15)] hover:-translate-y-3 transition-transform duration-700 ease-out" 
                  alt="Ilustrasi Penelitian" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Posisi Tersedia Section */}
      <section className="section py-24 md:py-28 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block bg-sky-100 text-sky-600 px-3.5 py-1 rounded-full font-bold text-xs mb-3 uppercase tracking-wider">
              Peluang Karir & Akademik
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Posisi Magang Tersedia</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Pilih peran yang paling sesuai dengan minat dan bidang keahlian Anda untuk pengalaman riset dan magang di Diskominfo Kota Bogor.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
            {/* Position 1 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-sky-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <MonitorSmartphone size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-sky-600 transition-colors">
                  Web & App Developer
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Pengembangan aplikasi Smart City, e-Gov, portal publik, dan API terintegrasi.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Bidang Aplikasi</span>
                <Link to="/magang" className="text-sky-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 2 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-pink-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Server size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-pink-600 transition-colors">
                  Network & SysAdmin
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Pengelolaan jaringan fiber optik kota, manajemen server, dan infrastruktur IT.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Infrastruktur</span>
                <Link to="/magang" className="text-pink-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 3 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Clapperboard size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-emerald-600 transition-colors">
                  Multimedia & Sosmed
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Desain grafis, produksi video kreatif, copywriting, dan pengelolaan medsos dinas.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>IKP & Komunikasi</span>
                <Link to="/magang" className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 4 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-purple-600 transition-colors">
                  Cyber Security & Sandi
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Monitoring keamanan siber, analisis kerentanan sistem, dan pengamanan informasi.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Sandi & Keamanan</span>
                <Link to="/magang" className="text-purple-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 5 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Database size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-amber-600 transition-colors">
                  Data Analyst & GIS
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Pengolahan data statistik sektoral, visualisasi dashboard, dan pemetaan geografis.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Statistik & Data</span>
                <Link to="/magang" className="text-amber-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 6 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-indigo-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Palette size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  UI/UX & Product Design
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Riset pengguna, pembuatan wireframe, prototyping, dan desain antarmuka aplikasi.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Desain & Produk</span>
                <Link to="/magang" className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 7 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-cyan-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Megaphone size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-cyan-600 transition-colors">
                  Humas & Public Relations
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Liputan kegiatan dinas, penyusunan siaran pers, dan hubungan komunikasi publik.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Humas & DokPim</span>
                <Link to="/magang" className="text-cyan-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Position 8 */}
            <div className="group relative bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-teal-300 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <FileText size={22} />
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Buka
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1.5 group-hover:text-teal-600 transition-colors">
                  IT Admin & Digital Service
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  Pengelolaan sistem persuratan digital, dokumentasi teknis, dan dukungan administrasi.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Administrasi IT</span>
                <Link to="/magang" className="text-teal-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Daftar <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Alur Kerja Section */}
      <section className="section py-24 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-4">Alur Proses Pelaksanaan</h2>
            <p className="text-slate-500">Langkah mudah untuk memulai magang atau riset Anda di Diskominfo Kota Bogor</p>
          </div>
          
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-4" data-aos="fade-up" data-aos-delay="100">
            {/* Dashed Line for Desktop */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-[2px] border-t-2 border-dashed border-slate-300 z-0"></div>

            <div className="flex-1 text-center relative z-10 p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] text-sky-600">
                <ClipboardList size={32} />
              </div>
              <h5 className="font-bold text-lg mb-2">1. Registrasi</h5>
              <p className="text-sm text-slate-500">Isi form pengajuan secara online dengan melampirkan berkas dari Universitas/Sekolah.</p>
            </div>

            <div className="flex-1 text-center relative z-10 p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] text-sky-600">
                <UserCheck size={32} />
              </div>
              <h5 className="font-bold text-lg mb-2">2. Verifikasi</h5>
              <p className="text-sm text-slate-500">Tim SDM akan meninjau ketersediaan kuota dan kesesuaian jurusan Anda.</p>
            </div>

            <div className="flex-1 text-center relative z-10 p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] text-sky-600">
                <Users size={32} />
              </div>
              <h5 className="font-bold text-lg mb-2">3. Pelaksanaan</h5>
              <p className="text-sm text-slate-500">Melaksanakan magang/penelitian sesuai durasi dan arahan mentor pembimbing.</p>
            </div>

            <div className="flex-1 text-center relative z-10 p-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_15px_35px_rgba(0,0,0,0.08)] text-sky-600">
                <CheckSquare size={32} />
              </div>
              <h5 className="font-bold text-lg mb-2">4. Laporan Akhir</h5>
              <p className="text-sm text-slate-500">Mengumpulkan jurnal/laporan akhir ke sistem untuk diarsipkan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lacak Status Section */}
      <section className="section py-20 md:py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center" data-aos="fade-up">
            <div className="w-16 h-16 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Search size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 transition-all duration-300">
              Lacak Status Pengajuan {selectedService === 'penelitian' ? 'Penelitian' : 'Magang'}
            </h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Pilih layanan yang Anda gunakan, lalu masukkan Nomor Tiket atau Email yang didaftarkan untuk mengetahui status terkini.
            </p>
            
            <form className="max-w-3xl mx-auto" onSubmit={handleCekStatus}>
              {/* Pilihan Layanan */}
              <div className="flex justify-center gap-4 mb-6">
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    name="jenisLayanan" 
                    value="penelitian" 
                    className="peer sr-only" 
                    checked={selectedService === 'penelitian'}
                    onChange={() => setSelectedService('penelitian')}
                  />
                  <div className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-semibold peer-checked:bg-sky-50 peer-checked:text-sky-600 peer-checked:border-sky-300 transition-all hover:bg-slate-50">
                    Penelitian
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input 
                    type="radio" 
                    name="jenisLayanan" 
                    value="magang" 
                    className="peer sr-only" 
                    checked={selectedService === 'magang'}
                    onChange={() => setSelectedService('magang')}
                  />
                  <div className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-semibold peer-checked:bg-sky-50 peer-checked:text-sky-600 peer-checked:border-sky-300 transition-all hover:bg-slate-50">
                    Magang (PKL)
                  </div>
                </label>
              </div>
              
              {/* Input & Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  name="ticket"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-bold tracking-wider focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all uppercase placeholder:font-normal placeholder:tracking-normal text-center sm:text-left" 
                  placeholder="Cth: TKT-12345 / EMAIL" 
                  required 
                />
                <button 
                  type="submit" 
                  className="bg-sky-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_10px_20px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:-translate-y-1 hover:shadow-[0_15px_25px_rgba(14,165,233,0.4)] transition-all whitespace-nowrap"
                >
                  Cek Status
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section py-24 md:py-28 relative z-20">
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-slate-900">
              Pertanyaan Umum Terkait <span className="text-sky-500">Layanan Publik & Magang</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base">Informasi lengkap dan jawaban atas pertanyaan yang sering diajukan seputar magang dan riset</p>
          </div>

          <div className="space-y-5" data-aos="fade-up">
            {/* Accordion Item 1 */}
            <details className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden open:border-sky-300 open:ring-1 open:ring-sky-300 open:shadow-md" open>
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-[1.1rem] font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-600 group-open:text-sky-700 group-open:bg-sky-50/50">
                Berapa lama durasi magang yang diperbolehkan?
                <span className="relative size-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center group-open:bg-sky-100 transition-colors duration-300">
                  <ChevronDown className="size-5 text-slate-500 transition-transform duration-300 group-open:-rotate-180 group-open:text-sky-600" />
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2 text-slate-600 text-[1.05rem] leading-relaxed bg-sky-50/50 border-t border-sky-100/50">
                Durasi magang minimal yang disarankan adalah 1 bulan dan maksimal 6 bulan. Hal ini disesuaikan dengan kebutuhan instansi asal (Sekolah/Universitas) serta ketersediaan kuota pada divisi yang dituju di Diskominfo Kota Bogor.
              </div>
            </details>

            {/* Accordion Item 2 */}
            <details className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden open:border-sky-300 open:ring-1 open:ring-sky-300 open:shadow-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-[1.1rem] font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-600 group-open:text-sky-700 group-open:bg-sky-50/50">
                Apakah ada kompensasi finansial (gaji) selama magang?
                <span className="relative size-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center group-open:bg-sky-100 transition-colors duration-300">
                  <ChevronDown className="size-5 text-slate-500 transition-transform duration-300 group-open:-rotate-180 group-open:text-sky-600" />
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2 text-slate-600 text-[1.05rem] leading-relaxed bg-sky-50/50 border-t border-sky-100/50">
                Sesuai dengan regulasi pemerintah daerah, program PKL/Magang ini bersifat sukarela dan akademik. Oleh karena itu, tidak ada kompensasi berupa gaji bulanan. Namun, peserta akan mendapatkan pengalaman, bimbingan, dan sertifikat resmi.
              </div>
            </details>

            {/* Accordion Item 3 */}
            <details className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden open:border-sky-300 open:ring-1 open:ring-sky-300 open:shadow-md">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-[1.1rem] font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-600 group-open:text-sky-700 group-open:bg-sky-50/50">
                Bagaimana cara mengetahui pengajuan saya diterima?
                <span className="relative size-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center group-open:bg-sky-100 transition-colors duration-300">
                  <ChevronDown className="size-5 text-slate-500 transition-transform duration-300 group-open:-rotate-180 group-open:text-sky-600" />
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2 text-slate-600 text-[1.05rem] leading-relaxed bg-sky-50/50 border-t border-sky-100/50">
                Anda dapat mengecek status pengajuan pada tab "Cek Status" di halaman Magang menggunakan Nomor Tiket yang dikirim ke email Anda. Jika statusnya "Diterima", akan ada instruksi lebih lanjut mengenai tanggal kehadiran pertama.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-12 pb-36">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden bg-gradient-to-br from-sky-400 to-sky-600" data-aos="zoom-in">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Siap Memulai Kolaborasi?</h3>
              <p className="mb-8 text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
                Pilih layanan magang atau penelitian yang sesuai dengan kebutuhan akademik Anda dan jadilah bagian dari transformasi digital Kota Bogor.
              </p>
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                className="bg-white text-sky-600 font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                Pilih Layanan Sekarang
              </button>
            </div>
            {/* Decorative Background Elements */}
            <div className="absolute rounded-full bg-white/10 w-[250px] h-[250px] -top-[100px] -left-[50px]"></div>
            <div className="absolute rounded-full bg-white/10 w-[350px] h-[350px] -bottom-[150px] -right-[50px]"></div>
          </div>
        </div>
      </section>
    </div>
      <PopupModal 
        isOpen={popupConfig.isOpen}
        onClose={closePopup}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
      />
      <Footer />
    </>
  );
}
