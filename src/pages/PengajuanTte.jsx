import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PopupModal from '../components/PopupModal';
import { Send, Search, CheckCircle, Info, AlertCircle, FileText, Upload, Calendar, User, Phone, Briefcase, Mail } from 'lucide-react';

export default function PengajuanTte() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('pengajuan');
  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  // Form State
  const [isSelf, setIsSelf] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [proxyInfo, setProxyInfo] = useState('');
  const [hasLoggedInEmail, setHasLoggedInEmail] = useState(false);
  const [serviceType, setServiceType] = useState('');
  const [registrationPurpose, setRegistrationPurpose] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerWhatsapp, setOwnerWhatsapp] = useState('');
  const [ownerNip, setOwnerNip] = useState('');
  const [ownerPosition, setOwnerPosition] = useState('');
  const [ownerOrgUnit, setOwnerOrgUnit] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const closePopup = () => setPopupConfig({ ...popupConfig, isOpen: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (isSelf === 'tidak' && !isApproved) {
      setPopupConfig({
        isOpen: true,
        type: 'warning',
        title: 'Persetujuan Diperlukan',
        message: 'Anda harus menyetujui pernyataan persetujuan dari Pemilik Sertifikat Elektronik jika mengisi data untuk orang lain.'
      });
      return;
    }

    if (!hasLoggedInEmail) {
      setPopupConfig({
        isOpen: true,
        type: 'warning',
        title: 'Login Email Diperlukan',
        message: 'Pastikan Anda mencentang konfirmasi bahwa pemilik akun sudah berhasil login ke email @kotabogor.go.id.'
      });
      return;
    }

    if (!agreedTerms) {
      setPopupConfig({
        isOpen: true,
        type: 'warning',
        title: 'Pernyataan Kebenaran Data',
        message: 'Anda harus menyetujui pernyataan bahwa data yang diinputkan adalah benar dan sesuai.'
      });
      return;
    }

    // Generate dynamic ticket number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateObj = new Date();
    const ticketYearMonth = `${dateObj.getFullYear()}${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    const ticketNo = `TKT-TTE-${ticketYearMonth}-${randomNum}`;

    setPopupConfig({
      isOpen: true,
      type: 'success',
      title: 'Berhasil Dikirim!',
      message: `Pengajuan Layanan Sertifikat Elektronik (TTE) Berhasil Dikirim!\n\nNomor Tiket Anda: ${ticketNo}\n\nSilakan simpan nomor tiket ini untuk memantau status pengajuan. Informasi tindak lanjut akan dikirimkan ke email @kotabogor.go.id.`
    });

    // Reset Form (except date and default values)
    setIsSelf('');
    setIsApproved(false);
    setProxyInfo('');
    setHasLoggedInEmail(false);
    setServiceType('');
    setRegistrationPurpose('');
    setOwnerName('');
    setOwnerWhatsapp('');
    setOwnerNip('');
    setOwnerPosition('');
    setOwnerOrgUnit('');
    setOwnerEmail('');
    setAgreedTerms(false);
  };

  const handleTrackStatus = (e) => {
    e.preventDefault();
    const rand = Math.random();
    
    if (rand < 0.25) {
      setPopupConfig({
        isOpen: true,
        type: 'success',
        title: 'Permohonan Disetujui',
        message: 'Status Pengajuan: Telah Disetujui oleh BSrE!\n\nSertifikat Elektronik (TTE) Anda telah diterbitkan. Silakan cek email @kotabogor.go.id pribadi Anda untuk melakukan aktivasi/setting passphrase.'
      });
    } else if (rand < 0.5) {
      setPopupConfig({
        isOpen: true,
        type: 'process',
        title: 'Sedang Diproses',
        message: 'Status Pengajuan: Sedang dalam tahap verifikasi administrasi oleh Tim Keamanan Informasi Diskominfo Kota Bogor.\n\nEstimasi proses 1-3 hari kerja. Mohon pantau kotak masuk email Anda.'
      });
    } else if (rand < 0.75) {
      setPopupConfig({
        isOpen: true,
        type: 'warning',
        title: 'Perlu Revisi',
        message: 'Status Pengajuan: Perlu Perbaikan Berkas.\n\nAlasan: Dokumen Surat Permohonan yang dilampirkan tidak ditandatangani oleh Kepala SKPD/Unit Kerja. Silakan ajukan kembali dengan berkas yang sesuai.'
      });
    } else {
      setPopupConfig({
        isOpen: true,
        type: 'not-found',
        title: 'Tiket Tidak Ditemukan',
        message: 'Maaf, nomor tiket yang Anda masukkan tidak valid atau tidak terdaftar di database kami. Pastikan format penulisan benar.'
      });
    }
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
              Layanan Sertifikat <span className="text-sky-500">Elektronik (TTE)</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Portal pengajuan penerbitan baru, perpanjangan masa berlaku, dan reset passphrase Tanda Tangan Elektronik Pemerintah Kota Bogor.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-10">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-slate-100 pb-6">
              <button 
                onClick={() => setActiveTab('pengajuan')}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'pengajuan' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
              >
                <FileText size={18} />
                Pengajuan TTE
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
                <div className="animate-fade-in-up max-w-4xl mx-auto">
                  
                  {/* Alert & Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* PERHATIAN BOX */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-slate-700 flex flex-col justify-between">
                      <div>
                        <h4 className="flex items-center gap-2 text-amber-700 font-extrabold text-base mb-2">
                          <AlertCircle size={20} />
                          PERHATIAN!
                        </h4>
                        <p className="text-sm leading-relaxed mb-2">
                          Sebelum melakukan pengisian form permohonan, pastikan anda sudah memiliki <strong>email @kotabogor.go.id pribadi</strong> dan sudah berhasil untuk login ke email tersebut.
                        </p>
                        <p className="text-sm leading-relaxed">
                          Jika belum memiliki email @kotabogor.go.id pribadi, silahkan hubungi Diskominfo Kota Bogor melalui WhatsApp ke <strong className="text-sky-600 font-semibold">+62 811-2288-2233</strong> atau <strong className="text-sky-600 font-semibold">+62 877-8981-9311</strong>.
                        </p>
                      </div>
                    </div>

                    {/* INFORMASI PENTING BOX */}
                    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-slate-700 flex flex-col justify-between">
                      <div>
                        <h5 className="flex items-center gap-2 text-sky-700 font-extrabold text-base mb-3">
                          <Info size={20} />
                          Informasi Penting!
                        </h5>
                        <ol className="list-decimal list-outside ml-4 space-y-1.5 text-slate-600 text-xs leading-relaxed">
                          <li>Layanan TTE ditujukan khusus bagi ASN di lingkungan Pemkot Bogor.</li>
                          <li>Pastikan email <strong className="text-slate-800">@kotabogor.go.id</strong> pribadi Anda aktif dan dapat diakses.</li>
                          <li><strong className="text-slate-800">Surat Permohonan</strong> wajib untuk pengajuan baru & perpanjangan.</li>
                          <li>Proses verifikasi & penerbitan TTE memakan waktu <strong className="text-slate-800">1 - 3 hari kerja</strong>.</li>
                        </ol>
                      </div>
                      <div className="pt-3 border-t border-sky-100/50 mt-3 text-xs text-slate-500">
                        <strong>Butuh Bantuan?</strong> WhatsApp Helpdesk di nomor <strong>+62 811-2288-2233</strong>.
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-6">Formulir Permohonan Sertifikat Elektronik</h3>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    {/* Q1: Data Sendiri / Orang Lain */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Apakah anda mengisi Data di Form untuk anda sendiri? <span className="text-rose-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/50 transition-all">
                          <input 
                            type="radio" 
                            name="isSelf" 
                            value="ya" 
                            checked={isSelf === 'ya'} 
                            onChange={(e) => setIsSelf(e.target.value)} 
                            className="w-4 h-4 text-sky-500 focus:ring-sky-500" 
                            required
                          />
                          <span className="text-slate-700 font-medium">Ya, Data Saya Sendiri</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/50 transition-all">
                          <input 
                            type="radio" 
                            name="isSelf" 
                            value="tidak" 
                            checked={isSelf === 'tidak'} 
                            onChange={(e) => setIsSelf(e.target.value)} 
                            className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                          />
                          <span className="text-slate-700 font-medium">Tidak, Data Orang Lain</span>
                        </label>
                      </div>
                    </div>

                    {/* CONDITIONAL FOR OTHERS: Q2 & Q3 */}
                    {isSelf === 'tidak' && (
                      <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 space-y-5 animate-fade-in">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Apakah sudah mendapatkan persetujuan dari Pemilik Sertifikat Elektronik (Tanda Tangan Elektronik)? <span className="text-rose-500">*</span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={isApproved} 
                              onChange={(e) => setIsApproved(e.target.checked)} 
                              className="mt-1 w-4 h-4 rounded text-sky-500 focus:ring-sky-500" 
                              required
                            />
                            <span className="text-sm text-slate-600 font-medium">
                              Ya, sudah disetujui oleh Pemohon Layanan
                            </span>
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Masukan Nama Anda selaku Pengisi Form dan Jabatan anda selaku Pengisi Form <span className="text-rose-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            value={proxyInfo} 
                            onChange={(e) => setProxyInfo(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                            placeholder="Contoh: Denada - Pengelola Keamanan Sistem Informasi"
                          />
                        </div>
                      </div>
                    )}

                    {/* Q4: Login Email Confirmation */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Konfirmasi Login Webmail @kotabogor.go.id <span className="text-rose-500">*</span>
                      </label>
                      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        Pastikan anda sudah berhasil login ke email kotabogor milik anda (bukan email dinas/perangkat daerah/kelurahan). Jika belum berhasil login, hubungi Helpdesk Diskominfo terlebih dahulu.
                      </p>
                      
                      {/* Simulated Webmail View Mockup */}
                      <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-950 text-slate-200 font-mono text-[10px] mb-4 shadow-inner">
                        <div className="bg-slate-900 px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
                          <span className="text-[11px] font-sans text-slate-400">Zimbra Web Client - @kotabogor.go.id</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                        <div className="p-3 space-y-1">
                          <div><strong>Server:</strong> mail.kotabogor.go.id</div>
                          <div><strong>User Email:</strong> pemilik.tte@kotabogor.go.id</div>
                          <div className="text-emerald-400">✓ Connected. Inbox Loaded.</div>
                        </div>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={hasLoggedInEmail} 
                          onChange={(e) => setHasLoggedInEmail(e.target.checked)} 
                          className="mt-1 w-4 h-4 rounded text-sky-500 focus:ring-sky-500" 
                          required
                        />
                        <span className="text-sm text-slate-700 font-semibold">
                          Saya sudah berhasil login ke email kotabogor saya
                        </span>
                      </label>
                    </div>

                    {/* Q5: Jenis Layanan */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Jenis Layanan Tanda Tangan Elektronik <span className="text-rose-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {[
                          { id: 'baru', label: 'Pendaftaran Baru' },
                          { id: 'perpanjangan', label: 'Perpanjangan Masa Berlaku' },
                          { id: 'reset', label: 'Reset Passphrase TTe' }
                        ].map((option) => (
                          <label key={option.id} className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/50 transition-all">
                            <input 
                              type="radio" 
                              name="serviceType" 
                              value={option.id} 
                              checked={serviceType === option.id} 
                              onChange={(e) => setServiceType(e.target.value)} 
                              className="w-4 h-4 text-sky-500 focus:ring-sky-500"
                              required
                            />
                            <span className="text-slate-700 font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* CONDITIONAL: Q6 (Tujuan Pendaftaran) */}
                    {serviceType === 'baru' && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Sebutkan tujuan dari Pendaftaran TTe? <span className="text-rose-500">*</span>
                        </label>
                        <textarea 
                          value={registrationPurpose} 
                          onChange={(e) => setRegistrationPurpose(e.target.value)} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                          rows="3" 
                          required 
                          placeholder="Contoh: Digunakan untuk penandatanganan dokumen dinas elektronik di lingkungan SKPD/SIMPEG"
                        ></textarea>
                      </div>
                    )}

                    {/* 2-Column Grid for Owner Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 md:p-8">
                      <div className="md:col-span-2">
                        <h4 className="text-lg font-bold text-slate-800">Data Pemilik Sertifikat Elektronik (TTE)</h4>
                        <p className="text-xs text-slate-400 mt-1">Lengkapi data pemilik sertifikat di bawah ini sesuai database SIMPEG.</p>
                      </div>

                      {/* Q7: Nama Lengkap */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Nama Lengkap (beserta gelar) Pemilik TTE <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <User size={18} />
                          </span>
                          <input 
                            type="text" 
                            value={ownerName} 
                            onChange={(e) => setOwnerName(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                            placeholder="Masukkan nama lengkap beserta gelar akademik" 
                          />
                        </div>
                      </div>

                      {/* Q8: No Whatsapp */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          No Whatsapp Aktif Pemilik TTE <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <Phone size={18} />
                          </span>
                          <input 
                            type="tel" 
                            value={ownerWhatsapp} 
                            onChange={(e) => setOwnerWhatsapp(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                            placeholder="Contoh: 081234567890" 
                          />
                        </div>
                      </div>

                      {/* Q9: NIP */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          NIP <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={ownerNip} 
                          onChange={(e) => setOwnerNip(e.target.value)} 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                          required 
                          placeholder="Masukkan NIP (18 digit angka tanpa spasi)" 
                        />
                      </div>

                      {/* Q10: Jabatan */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Jabatan (Sesuai Simpeg) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <Briefcase size={18} />
                          </span>
                          <input 
                            type="text" 
                            value={ownerPosition} 
                            onChange={(e) => setOwnerPosition(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                            placeholder="Contoh: Kepala Subbagian Umum dan Kepegawaian" 
                          />
                        </div>
                      </div>

                      {/* Q11: Unit Organisasi */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Unit Organisasi (Ditulis Lengkap) <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={ownerOrgUnit} 
                          onChange={(e) => setOwnerOrgUnit(e.target.value)} 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                          required 
                          placeholder="Contoh: Dinas Komunikasi dan Informatika Kota Bogor" 
                        />
                      </div>

                      {/* Q12: Email */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Email @kotabogor.go.id pribadi <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <Mail size={18} />
                          </span>
                          <input 
                            type="email" 
                            value={ownerEmail} 
                            onChange={(e) => setOwnerEmail(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                            placeholder="contoh: nama.lengkap@kotabogor.go.id" 
                          />
                        </div>
                      </div>

                      {/* Q13: Tanggal Permohonan */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Tanggal permohonan (tanggal saat ini) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                            <Calendar size={18} />
                          </span>
                          <input 
                            type="date" 
                            value={applicationDate} 
                            onChange={(e) => setApplicationDate(e.target.value)} 
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all" 
                            required 
                          />
                        </div>
                      </div>

                      {/* PDF UPLOAD: Surat Permohonan (WAJIB untuk Baru & Perpanjangan) */}
                      {(serviceType === 'baru' || serviceType === 'perpanjangan') && (
                        <div className="animate-fade-in">
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Surat Permohonan TTE (PDF) <span className="text-rose-500">*</span>
                          </label>
                          <input 
                            type="file" 
                            accept=".pdf" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 transition-all" 
                            required 
                          />
                        </div>
                      )}
                    </div>

                    {/* Q14: Terms Agreement */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={agreedTerms} 
                          onChange={(e) => setAgreedTerms(e.target.checked)} 
                          className="mt-1 w-4 h-4 rounded text-sky-500 focus:ring-sky-500" 
                          required
                        />
                        <span className="text-sm text-slate-600 leading-relaxed font-medium">
                          Saya menyatakan bahwa data yang saya inputkan adalah benar dan sesuai. Saya juga menyetujui bahwa data yang saya masukkan dapat digunakan sesuai dengan kebijakan privasi yang berlaku. <span className="text-rose-500">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <button 
                        type="submit" 
                        className="bg-sky-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        Kirim Formulir
                        <Send size={18} />
                      </button>
                      
                      <button 
                        type="button"
                        onClick={() => {
                          if (window.confirm('Apakah Anda yakin ingin mengosongkan formulir?')) {
                            setIsSelf('');
                            setIsApproved(false);
                            setProxyInfo('');
                            setHasLoggedInEmail(false);
                            setServiceType('');
                            setRegistrationPurpose('');
                            setOwnerName('');
                            setOwnerWhatsapp('');
                            setOwnerNip('');
                            setOwnerPosition('');
                            setOwnerOrgUnit('');
                            setOwnerEmail('');
                            setAgreedTerms(false);
                          }
                        }}
                        className="text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 font-semibold py-3.5 px-6 rounded-xl transition-all text-center"
                      >
                        Kosongkan formulir
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB: CEK STATUS */}
              {activeTab === 'cek-status' && (
                <div className="animate-fade-in-up max-w-2xl mx-auto text-center py-10">
                  <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={36} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800 mb-4">Lacak Pengajuan TTE</h4>
                  <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                    Silakan masukkan Nomor Tiket Pengajuan atau Alamat Email @kotabogor.go.id untuk melihat status permohonan terkini.
                  </p>
                  
                  <form className="max-w-md mx-auto mb-8" onSubmit={handleTrackStatus}>
                    <div className="mb-6">
                      <input 
                        type="text" 
                        className="w-full text-center text-xl font-bold tracking-widest bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all uppercase placeholder:normal-case placeholder:tracking-normal placeholder:text-base" 
                        placeholder="TKT-TTE-YYYYMM-XXXX / EMAIL" 
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="bg-sky-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-sky-500/30 hover:bg-sky-600 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                    >
                      Lacak Sekarang
                    </button>
                  </form>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left">
                    <h5 className="flex items-center gap-2 font-extrabold text-sm mb-2 text-slate-800">
                      <Search size={18} className="text-sky-500" />
                      Panduan Pelacakan
                    </h5>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Gunakan nomor tiket yang Anda dapatkan setelah submit form (format: TKT-TTE-YYYYMM-XXXX) untuk melacak kemajuan dokumen Anda di Balai Sertifikasi Elektronik (BSrE) BSSN.
                    </p>
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
