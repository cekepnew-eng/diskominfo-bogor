import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopupModal from '../components/PopupModal';
import { Search, Upload, FileText, CheckCircle, AlertCircle, BookOpen, FileCheck } from 'lucide-react';

export default function SubmitPenelitian() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('pengajuan');
  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const closePopup = () => setPopupConfig({ ...popupConfig, isOpen: false });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-hidden bg-slate-50 min-h-screen pt-28 pb-20">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sky-100/60 to-slate-50/0 -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Portal <span className="text-sky-500">Pengajuan Penelitian</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Silakan lengkapi formulir di bawah ini untuk mengajukan permohonan, mengecek status, atau mengunggah laporan hasil akhir penelitian Anda.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-10">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-slate-100 pb-6">
              <button 
                onClick={() => handleTabChange('pengajuan')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'pengajuan' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <FileText size={18} />
                Pengajuan Permohonan
              </button>
              <button 
                onClick={() => handleTabChange('cek-status')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'cek-status' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <Search size={18} />
                Cek Status
              </button>
              <button 
                onClick={() => handleTabChange('unggah')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'unggah' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <Upload size={18} />
                Unggah Jurnal
              </button>
              <button 
                onClick={() => handleTabChange('status-jurnal')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'status-jurnal' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <CheckCircle size={18} />
                Status Jurnal
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              
              {/* TAB: PENGAJUAN PERMOHONAN */}
              {activeTab === 'pengajuan' && (
                <div className="animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-10">
                    {/* Form Column */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-6">Formulir Pengajuan Permohonan Penelitian</h4>
                      <form className="space-y-5" onSubmit={(e) => { 
                        e.preventDefault(); 
                        setPopupConfig({
                          isOpen: true,
                          type: 'success',
                          title: 'Berhasil Dikirim!',
                          message: 'Pengajuan Permohonan Penelitian Berhasil Dikirim!\n\nNomor Tiket Anda: TKT-RST-YYYYMM-XXXX\n\nSilakan simpan nomor tiket ini dan periksa email Anda secara berkala.'
                        });
                      }}>
                        
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                          <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Masukkan nama lengkap Anda" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">No Telepon / WhatsApp</label>
                            <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="08xx xxxx xxxx" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
                            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="email@contoh.com" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Instansi / Universitas</label>
                          <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Contoh: Universitas Indonesia" />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Judul Penelitian</label>
                          <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Masukkan judul penelitian" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lokasi Penelitian</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required defaultValue="">
                              <option value="" disabled>-- Pilih Lokasi --</option>
                              <option value="Diskominfo">Diskominfo Kota Bogor</option>
                              <option value="Kecamatan">Kecamatan/Kelurahan</option>
                              <option value="Publik">Ruang Publik / Masyarakat</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Bidang Tujuan</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required defaultValue="">
                              <option value="" disabled>-- Pilih Bidang --</option>
                              <option value="Aplikasi">Aplikasi / e-Government</option>
                              <option value="IKP">Informasi & Komunikasi Publik</option>
                              <option value="Infrastruktur">Infrastruktur & Jaringan</option>
                              <option value="Statistik">Statistik Sektoral</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Surat Penelitian (PDF)</label>
                            <input type="file" accept=".pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all" required />
                            <p className="text-xs text-slate-500 mt-2">Maks 2MB, format .pdf</p>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Surat Kesbangpol (PDF)</label>
                            <input type="file" accept=".pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all" />
                            <p className="text-xs text-slate-500 mt-2">Maks 2MB, format .pdf</p>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button type="submit" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                            Submit Pengajuan
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Info Column */}
                    <div className="lg:w-1/3">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 lg:sticky lg:top-32">
                        <h5 className="flex items-center gap-2 text-amber-600 font-extrabold text-lg mb-4">
                          <AlertCircle size={24} />
                          Informasi Penting!
                        </h5>
                        <ol className="list-decimal list-outside ml-4 space-y-3 text-slate-600 text-sm leading-relaxed">
                          <li>Pastikan data yang Anda kirimkan <strong className="text-slate-800">Valid</strong>.</li>
                          <li><strong className="text-slate-800">Nomor Tiket</strong> pengajuan akan dikirimkan melalui <strong className="text-slate-800">email Anda</strong>.</li>
                          <li>Nomor Tiket dapat digunakan untuk <strong className="text-slate-800">memantau status permohonan</strong>.</li>
                          <li>Jika disetujui, <strong className="text-slate-800">surat jawaban</strong> akan dikirim via email.</li>
                        </ol>
                        <div className="mt-8 text-center hidden lg:flex lg:justify-center">
                          <img src="/submit.png" alt="Icon Submit Penelitian" className="max-w-full h-auto object-contain rounded-xl" />
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
                      <h4 className="text-2xl font-bold text-slate-800 mb-4">Lacak Pengajuan Penelitian</h4>
                      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                        Silakan masukkan Nomor Tiket atau Email yang Anda daftarkan untuk melihat status permohonan terkini.
                      </p>
                      
                      <form className="max-w-md mx-auto" onSubmit={(e) => { 
                        e.preventDefault(); 
                        const rand = Math.random();
                        if (rand < 0.33) {
                          setPopupConfig({
                            isOpen: true,
                            type: 'success',
                            title: 'Permohonan Diterima',
                            message: 'Status Pengajuan: Telah Disetujui!\n\nSurat balasan (izin penelitian) sudah dikirimkan melalui alamat email yang Anda daftarkan.'
                          });
                        } else if (rand < 0.66) {
                          setPopupConfig({
                            isOpen: true,
                            type: 'process',
                            title: 'Sedang Diproses',
                            message: 'Status Pengajuan: Sedang dalam proses review oleh Tim Diskominfo Kota Bogor.\n\nMohon menunggu 1-3 hari kerja.'
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

              {/* TAB: UNGGAH JURNAL */}
              {activeTab === 'unggah' && (
                <div className="animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 py-4">
                      <h4 className="text-2xl font-bold text-slate-800 mb-3">Unggah Laporan Akhir / Jurnal</h4>
                      <p className="text-slate-500 mb-8">Sesuai peraturan, Anda wajib menyerahkan laporan hasil akhir penelitian setelah riset selesai dilakukan.</p>
                      
                      <form className="space-y-6" onSubmit={(e) => { 
                        e.preventDefault(); 
                        setPopupConfig({
                          isOpen: true,
                          type: 'success',
                          title: 'Jurnal Berhasil Diunggah!',
                          message: 'Terima kasih telah melaporkan hasil akhir penelitian Anda. Data akan segera ditinjau oleh tim kami.'
                        });
                      }}>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Tiket Pengajuan</label>
                          <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" required placeholder="Masukkan nomor tiket Anda" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Link Publikasi Jurnal (Opsional)</label>
                          <input type="url" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" placeholder="https://jurnal.universitas.ac.id/..." />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">File Dokumen Final / Jurnal (PDF)</label>
                          <input type="file" accept=".pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all" required />
                          <p className="text-xs text-slate-500 mt-2">Maks 10MB, format .pdf</p>
                        </div>
                        
                        <div className="pt-2">
                          <button type="submit" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                            Unggah Dokumen
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="lg:w-1/3 hidden lg:block">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 lg:sticky lg:top-32">
                        <h5 className="flex items-center gap-2 font-extrabold text-lg mb-3 text-emerald-700">
                          <BookOpen size={24} className="text-emerald-600" /> 
                          Kontribusi Riset
                        </h5>
                        <p className="text-emerald-700/80 text-sm leading-relaxed">
                          Kami sangat menghargai kontribusi penelitian Anda. Laporan akhir atau Jurnal yang Anda unggah akan menjadi salah satu referensi berharga bagi pembangunan ekosistem digital cerdas di Kota Bogor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: STATUS JURNAL */}
              {activeTab === 'status-jurnal' && (
                <div className="animate-fade-in-up">
                  <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 text-center py-10">
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={36} />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-800 mb-4">Status Verifikasi Laporan</h4>
                      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                        Pastikan dokumen akhir Anda telah diverifikasi dan diterima dengan baik oleh tim Diskominfo Kota Bogor.
                      </p>
                      
                      <form className="max-w-md mx-auto" onSubmit={(e) => { 
                        e.preventDefault(); 
                        const rand = Math.random();
                        if (rand < 0.33) {
                          setPopupConfig({
                            isOpen: true,
                            type: 'success',
                            title: 'Sudah Terverifikasi',
                            message: 'Laporan/Jurnal akhir Anda telah diverifikasi and diterima dengan baik oleh tim Diskominfo Kota Bogor.'
                          });
                        } else if (rand < 0.66) {
                          setPopupConfig({
                            isOpen: true,
                            type: 'process',
                            title: 'Sedang Proses',
                            message: 'Laporan/Jurnal Anda sedang dalam tahap peninjauan oleh admin kami.'
                          });
                        } else {
                          setPopupConfig({
                            isOpen: true,
                            type: 'warning',
                            title: 'Belum Diverifikasi',
                            message: 'Laporan/Jurnal Anda belum diverifikasi atau terdapat kekurangan data.\n\nSilakan periksa email Anda secara berkala untuk revisi (jika ada).'
                          });
                        }
                      }}>
                        <div className="mb-6">
                          <input type="text" className="w-full text-center text-xl font-bold tracking-widest bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all uppercase" placeholder="TKT-XXXXX" required />
                        </div>
                        <button type="submit" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                          Lihat Status
                        </button>
                      </form>
                    </div>
                    <div className="lg:w-1/3 hidden lg:block">
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 lg:sticky lg:top-32">
                        <h5 className="flex items-center gap-2 font-extrabold text-lg mb-3 text-slate-800">
                          <FileCheck size={24} className="text-sky-500" />
                          Validasi Berkas
                        </h5>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Proses verifikasi dokumen akhir biasanya memakan waktu beberapa hari kerja setelah diunggah. Pastikan nomor tiket yang Anda masukkan sesuai dengan tiket permohonan awal.
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
