import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopupModal from '../components/PopupModal';
import { Send, Search, CheckCircle, Info, AlertCircle } from 'lucide-react';

export default function Magang() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('pengajuan');
  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const closePopup = () => setPopupConfig({ ...popupConfig, isOpen: false });

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-hidden bg-slate-50 min-h-screen pt-28 pb-20">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sky-100/60 to-slate-50/0 -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Pendaftaran <span className="text-sky-500">Magang (PKL)</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Lengkapi formulir pendaftaran magang di bawah ini dengan data yang valid dan sesuai dokumen fisik.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-10">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-slate-100 pb-6">
              <button 
                onClick={() => setActiveTab('pengajuan')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'pengajuan' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <Send size={18} />
                Pengajuan Magang
              </button>
              <button 
                onClick={() => setActiveTab('cek-status')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'cek-status' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <Search size={18} />
                Cek Status
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* TAB: PENGAJUAN */}
              {activeTab === 'pengajuan' && (
                <div className="animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1">
                      <div className="mb-8 pb-4 border-b border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Formulir Pendaftaran</h3>
                        <p className="text-slate-500">Lengkapi data diri Anda dengan informasi yang valid dan sesuai dokumen.</p>
                      </div>
                      
                      <form className="space-y-6" onSubmit={(e) => { 
                        e.preventDefault(); 
                        setPopupConfig({
                          isOpen: true,
                          type: 'success',
                          title: 'Berhasil Dikirim!',
                          message: 'Pengajuan Permohonan Magang Berhasil Dikirim!\n\nNomor Tiket Anda: TKT-MGG-YYYYMM-XXXX\n\nSilakan periksa email Anda secara berkala untuk memantau status persetujuan.'
                        });
                      }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Sesuai Identitas" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Aktif</label>
                            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="email@domain.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">No. WhatsApp</label>
                            <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="08xxxxxxxxxx" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Posisi Diminati</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required defaultValue="">
                              <option value="" disabled>-- Pilih Posisi --</option>
                              <option value="developer">Web & App Developer</option>
                              <option value="network">Network & SysAdmin</option>
                              <option value="multimedia">Multimedia & Sosmed</option>
                              <option value="security">Cyber Security & Sandi</option>
                              <option value="analyst">Data Analyst & GIS</option>
                              <option value="uiux">UI/UX & Product Design</option>
                              <option value="pr">Humas & Public Relations</option>
                              <option value="admin">IT Admin & Digital Service</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Asal Kampus / Sekolah</label>
                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Nama Universitas atau Sekolah Tinggi" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi Magang</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required defaultValue="">
                              <option value="" disabled>-- Penempatan --</option>
                              <option value="Diskominfo">Diskominfo Kota Bogor</option>
                              <option value="Kecamatan">Kecamatan/Kelurahan</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bidang Tujuan</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required defaultValue="">
                              <option value="" disabled>-- Pilih Bidang --</option>
                              <option value="Aplikasi">Aplikasi / e-Government</option>
                              <option value="IKP">Informasi & Komunikasi Publik</option>
                              <option value="Infrastruktur">Infrastruktur & Jaringan</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lama Magang (Minggu)</label>
                            <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" min="4" max="24" required placeholder="Cth: 12" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Surat Pengantar & CV (PDF)</label>
                            <input type="file" accept=".pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all" required />
                          </div>
                        </div>

                        <div className="pt-6">
                          <button type="submit" className="w-full sm:w-auto bg-sky-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mx-auto sm:mx-0">
                            Kirim Permohonan Magang
                            <Send size={18} />
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="lg:w-1/3">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 lg:sticky lg:top-32">
                        <h5 className="flex items-center gap-2 text-amber-600 font-extrabold text-lg mb-4">
                          <AlertCircle size={24} />
                          Informasi Penting!
                        </h5>
                        <ol className="list-decimal list-outside ml-4 space-y-3 text-slate-600 text-sm leading-relaxed">
                          <li>Pastikan data yang Anda kirimkan <strong className="text-slate-800">Valid dan Sesuai Dokumen Fisik</strong>.</li>
                          <li><strong className="text-slate-800">Nomor Tiket</strong> pengajuan akan dikirimkan melalui <strong className="text-slate-800">email Anda</strong>.</li>
                          <li>Nomor Tiket dapat digunakan untuk <strong className="text-slate-800">memantau status permohonan</strong>.</li>
                          <li>Jika disetujui, <strong className="text-slate-800">surat jawaban</strong> akan dikirim via email.</li>
                        </ol>
                        
                        <div className="text-center mt-6 hidden lg:flex lg:justify-center">
                          <img src="/magang.png" alt="Ilustrasi Magang" className="max-w-full h-auto object-contain rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CEK STATUS */}
              {activeTab === 'cek-status' && (
                <div className="animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 text-center py-10">
                      <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={36} />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-800 mb-4">Lacak Pengajuan Magang</h4>
                      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                        Silakan masukkan Nomor Tiket atau Email yang Anda daftarkan untuk melihat status permohonan terkini.
                      </p>
                      
                      <form className="max-w-md mx-auto" onSubmit={(e) => { 
                        e.preventDefault(); 
                        const rand = Math.random();
                        if (rand < 0.25) {
                          setPopupConfig({
                            isOpen: true,
                            type: 'process',
                            title: 'Sedang Diproses',
                            message: 'Status Pengajuan: Sedang dalam proses review oleh Tim SDM Diskominfo Kota Bogor.\n\nMohon menunggu informasi selanjutnya.'
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
                      }}>
                        <div className="mb-6">
                          <input type="text" className="w-full text-center text-xl font-bold tracking-widest bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all uppercase" placeholder="TKT-XXXXX / EMAIL" required />
                        </div>
                        <button type="submit" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                          Lacak Sekarang
                        </button>
                      </form>
                    </div>
                    <div className="lg:w-1/3 hidden lg:block">
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 lg:sticky lg:top-32">
                        <h5 className="flex items-center gap-2 font-extrabold text-lg mb-3 text-slate-800">
                          <Search size={24} className="text-sky-500" />
                          Lacak Cepat
                        </h5>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Gunakan nomor tiket yang Anda terima di email untuk melihat apakah surat balasan atau izin dari dinas sudah diterbitkan. Proses review biasanya membutuhkan waktu 1-3 hari kerja.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
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
