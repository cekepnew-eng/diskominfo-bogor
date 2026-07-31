import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
import { 
  Upload, Shield, ShieldCheck, CheckCircle, XCircle, 
  FileText, User, Calendar, Building2, 
  Zap, RefreshCw, Eye, Info, FileCheck, Award,
  X, Clock, Lock, UserCheck, Link as LinkIcon
} from 'lucide-react';

export default function TandaTanganPage() {
  const [results, setResults] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle tombol Escape & lock body scroll saat modal detail terbuka
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedDetail) {
        setSelectedDetail(null);
      }
    };
    if (selectedDetail) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDetail]);

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // =========================================================================
  // KONFIGURASI INTEGRASI API (BACKEND LARAVEL / BSrE / AXIOS / FETCH)
  // =========================================================================
  // 1. Ubah `USE_REAL_API` menjadi `true` jika server backend API Anda sudah siap terhubung.
  // 2. Sesuaikan `API_ENDPOINT` dengan alamat URL API verifikasi PDF di backend Anda.
  const USE_REAL_API = false;
  const API_ENDPOINT = "https://api.diskominfo.kotabogor.go.id/api/verifikasi-pdf";

  const processFiles = async (files) => {
    if (files.length > 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Maksimal 5 File',
        text: 'Hanya bisa memproses hingga 5 file PDF sekaligus.',
        confirmButtonColor: '#0ea5e9'
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    let valid = true;
    const fileList = Array.from(files);

    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type !== 'application/pdf') {
        valid = false;
        break;
      }
    }

    if (!valid) {
      Swal.fire({
        icon: 'error',
        title: 'Format Tidak Sesuai',
        text: 'Pastikan semua file yang diunggah berformat PDF.',
        confirmButtonColor: '#0ea5e9'
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    Swal.fire({
      title: 'Sedang Memverifikasi...',
      html: 'Memeriksa keaslian tanda tangan digital dan sertifikat BSrE...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // =========================================================================
    // MODAL A: INTEGRASI REAL API (Aktif saat USE_REAL_API = true)
    // =========================================================================
    if (USE_REAL_API) {
      try {
        // Langkah 1: Siapkan FormData untuk mengirim file PDF (multiform/form-data)
        const formData = new FormData();
        fileList.forEach((file) => {
          // Sesuaikan nama parameter key ('files[]' atau 'document') dengan request backend Anda
          formData.append('files[]', file);
        });

        // Langkah 2: Kirim request ke endpoint API menggunakan Fetch / Axios
        // Contoh jika menggunakan Axios: const response = await axios.post(API_ENDPOINT, formData, { headers: { ... } });
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          // Note: Jangan set 'Content-Type' secara manual saat memakai FormData agar boundary otomatis terbentuk
          headers: {
            'Accept': 'application/json',
            // 'Authorization': 'Bearer YOUR_JWT_TOKEN', // Buka komentar jika API membutuhkan Autentikasi token
          },
          body: formData,
        });

        // Langkah 3: Validasi HTTP response dari server
        if (!response.ok) {
          throw new Error(`Server merespons dengan status error: ${response.status}`);
        }

        // Langkah 4: Parse response JSON dari backend
        const resultJson = await response.json();
        Swal.close();

        // Langkah 5: Pemetaan (Mapping) data response backend ke struktur state UI React
        // Sesuaikan key properties di bawah (misal: item.filename, item.is_valid, item.signer) dengan JSON backend Anda
        const mappedResults = (resultJson.data || resultJson.results || []).map((item, index) => ({
          filename: item.filename || fileList[index]?.name || 'dokumen.pdf',
          file_size: item.file_size || fileList[index]?.size || 0,
          is_valid: item.is_valid !== undefined ? item.is_valid : (item.status === 'VALID' || item.status === 'SAH'),
          message: item.message || (item.is_valid ? 'Integritas Terjaga (Belum Dimodifikasi)' : 'Dokumen Tidak Valid'),
          signer: item.signer || item.penandatangan || 'Dedie A Rachim',
          fileUrl: item.file_url || (fileList[index] ? URL.createObjectURL(fileList[index]) : null),
          // Rincian kriptografi sertifikat opsional (bisa disuplai dari API jika ada)
          certDetail: {
            serialNumber: item.cert_serial || '4B:7C:9A:2F:81:D3:E5:60:11:A9:C4:72:B8:05:F1',
            validity: item.cert_validity || '30 Juni 2023 s.d. 30 Juni 2028',
            issuer: item.cert_issuer || 'Balai Sertifikasi Elektronik (BSrE) - BSSN'
          }
        }));

        setResults(mappedResults);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        Swal.close();
        console.error("API Verification Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memverifikasi Dokumen',
          text: `Terjadi kesalahan saat menghubungi server API: ${error.message || 'Koneksi bermasalah'}`,
          confirmButtonColor: '#0ea5e9'
        });
      }
      return;
    }

    // =========================================================================
    // MODAL B: SIMULASI DUMMY API (Aktif saat USE_REAL_API = false)
    // =========================================================================
    setTimeout(() => {
      Swal.close();
      
      const dummyResults = fileList.map((file) => {
        const fileUrl = URL.createObjectURL(file);
        
        return {
          filename: file.name,
          file_size: file.size,
          is_valid: true,
          message: 'Integritas Terjaga (Belum Dimodifikasi)',
          signer: 'Dedie A Rachim', // Nama penandatangan resmi agar persis referensi
          fileUrl: fileUrl,
          certDetail: {
            serialNumber: '4B:7C:9A:2F:81:D3:E5:60:11:A9:C4:72:B8:05:F1',
            validity: '30 Juni 2023 s.d. 30 Juni 2028',
            issuer: 'Balai Sertifikasi Elektronik (BSrE) - BSSN'
          }
        };
      });

      setResults(dummyResults);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1200);
  };

  const handleLihatDokumen = (fileUrl, filename) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      Swal.fire({
        title: 'Pratinjau Dokumen',
        text: `Menampilkan dokumen: ${filename}`,
        icon: 'info',
        confirmButtonColor: '#0ea5e9'
      });
    }
  };

  // Helper untuk memunculkan informasi kriptografi sertifikat
  const handleShowCertDetail = (type, name, certInfo = null) => {
    const serial = certInfo?.serialNumber || '4B:7C:9A:2F:81:D3:E5:60:11:A9:C4:72:B8:05:F1';
    const val = certInfo?.validity || '30 Juni 2023 s.d. 30 Juni 2028';
    const iss = certInfo?.issuer || 'Balai Sertifikasi Elektronik (BSrE) - BSSN';

    Swal.fire({
      title: `Detail Kriptografi: ${type}`,
      html: `
        <div style="text-align: left; font-size: 0.85rem; color: #334155; line-height: 1.6;">
          <div style="padding: 10px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px; border: 1px solid #e2e8f0;">
            <strong style="color: #0f172a;">Subjek (${type}):</strong><br/>
            <span style="color: #0284c7; font-weight: bold;">${name}</span>
          </div>
          <p style="margin-bottom: 6px;"><strong>Penerbit (Issuer):</strong> ${iss}</p>
          <p style="margin-bottom: 6px;"><strong>Nomor Seri:</strong> <br/><span style="font-family: monospace; font-size: 0.8rem;">${serial}</span></p>
          <p style="margin-bottom: 6px;"><strong>Masa Berlaku:</strong> <br/>${val}</p>
          <p style="margin-bottom: 6px;"><strong>Penggunaan Kunci (Key Usage):</strong> <br/>Digital Signature, Non-Repudiation, Content Commitment</p>
          <p style="margin-bottom: 0;"><strong>Algoritma Tanda Tangan:</strong> <br/>sha256WithRSAEncryption (2048 bit)</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#0ea5e9',
      confirmButtonText: 'Tutup'
    });
  };

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-hidden bg-slate-50 min-h-screen pt-28 pb-24 font-sans">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-[550px] bg-gradient-to-b from-sky-100/70 via-sky-50/30 to-slate-50/0 -z-10 pointer-events-none"></div>
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* Hero Header */}
          <div className="mb-10 text-center">
            <span className="inline-block bg-sky-100 text-sky-600 px-4 py-1.5 rounded-full font-bold text-xs mb-4 uppercase tracking-wider shadow-xs">
              Layanan Keamanan Siber & Kriptografi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Verifikasi <span className="text-sky-500">Tanda Tangan Digital</span>
            </h1>
          </div>

          {/* Upload Section - Disembunyikan saat ada hasil */}
          {!results && (
            <div className="mb-16">
              <div 
                className={`max-w-3xl mx-auto bg-white border-2 border-dashed rounded-3xl p-8 md:p-14 text-center transition-all duration-300 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)] ${
                  isDragOver ? 'border-sky-500 bg-sky-50/60 scale-[1.01]' : 'border-slate-200/80 hover:border-sky-400 bg-white'
                }`}
                onClick={handleUploadAreaClick}
                onDragEnter={handleDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-20 h-20 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Upload className="w-10 h-10" />
                </div>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-6">
                  Pilih atau Drag & Drop dokumen PDF Anda
                </h3>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="inline-flex items-center gap-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Pilih File PDF</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  multiple
                  className="hidden"
                />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-8 text-xs md:text-sm font-bold text-slate-600">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full border border-slate-200/80 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>100% Gratis & Tanpa Batas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full border border-slate-200/80 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-sky-500" />
                  <span>Keamanan Terjamin (BSrE)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full border border-slate-200/80 shadow-xs">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Hasil Analisis Instan</span>
                </div>
              </div>
            </div>
          )}

          {/* Result Section */}
          {results && (
            <div className="max-w-4xl mx-auto space-y-12">
              {results.map((item, idx) => {
                const sizeKb = (item.file_size / 1024).toFixed(1);
                return (
                  <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-6 md:p-8">
                    {/* Banner Status */}
                    <div className={`rounded-2xl p-6 border flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 transition-all ${
                      item.is_valid ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'
                    }`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg ${
                        item.is_valid ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'
                      }`}>
                        {item.is_valid ? <ShieldCheck className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-1.5">
                          {item.is_valid ? 'Dokumen ini Memiliki Tanda Tangan Digital yang Sah' : 'Dokumen Tidak Valid / Tidak Bertanda Tangan'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
                          <span className="flex items-center gap-1.5 text-emerald-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            {item.is_valid ? 'Integritas Terjaga (Belum Dimodifikasi)' : item.message}
                          </span>
                          {item.is_valid && (
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <FileCheck className="w-4 h-4 text-sky-500" />
                              1 Tanda Tangan Ditemukan
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider Ringkasan */}
                    <div className="flex items-center my-6">
                      <div className="flex-1 border-t border-slate-100"></div>
                      <span className="px-4 py-1.5 bg-slate-50 border border-slate-200/80 rounded-full text-slate-600 font-extrabold text-xs uppercase tracking-wider mx-4">
                        Ringkasan Dokumen
                      </span>
                      <div className="flex-1 border-t border-slate-100"></div>
                    </div>

                    {/* Grid Ringkasan 3 Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {/* Card 1: Info Tanda Tangan */}
                      <div className="bg-slate-50/60 rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                          <User className="w-4 h-4 text-sky-500" />
                          <span>Informasi Tanda Tangan</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-sm ${item.is_valid ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {item.is_valid ? '1' : '0'}
                          </div>
                          <span className="font-extrabold text-slate-800 text-xs text-right leading-snug">
                            {item.is_valid ? 'Identitas Terverifikasi' : 'Tidak Valid'}
                          </span>
                        </div>
                      </div>

                      {/* Card 2: Info PSrE */}
                      <div className="bg-slate-50/60 rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                          <Shield className="w-4 h-4 text-sky-500" />
                          <span>Otoritas PSrE</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
                          <div className="flex items-center gap-1.5 font-extrabold text-slate-800 text-xs">
                            <CheckCircle className={`w-4 h-4 ${item.is_valid ? 'text-emerald-500' : 'text-rose-500'}`} />
                            <span>{item.is_valid ? 'BSrE (BSSN)' : '-'}</span>
                          </div>
                          <span className="font-extrabold text-slate-900 text-base">{item.is_valid ? '1' : '0'}</span>
                        </div>
                      </div>

                      {/* Card 3: Info Dokumen */}
                      <div className="bg-slate-50/60 rounded-2xl border border-slate-200/60 p-5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                            <FileText className="w-4 h-4 text-sky-500" />
                            <span>File Dokumen</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleLihatDokumen(item.fileUrl, item.filename)}
                            className="inline-flex items-center gap-1 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Lihat</span>
                          </button>
                        </div>
                        <div className="space-y-1 mt-auto text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Nama:</span>
                            <span className="font-extrabold text-slate-800 truncate max-w-[130px]" title={item.filename}>{item.filename}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Ukuran:</span>
                            <span className="font-extrabold text-slate-800">{sizeKb} KB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Signer Detail Card */}
                    {item.is_valid && (
                      <>
                        <div className="flex items-center my-6">
                          <div className="flex-1 border-t border-slate-100"></div>
                          <span className="px-4 py-1.5 bg-slate-50 border border-slate-200/80 rounded-full text-slate-600 font-extrabold text-xs uppercase tracking-wider mx-4">
                            Informasi Penandatangan
                          </span>
                          <div className="flex-1 border-t border-slate-100"></div>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 md:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20 flex-shrink-0">
                                <User className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-slate-900 text-base">{item.signer}</span>
                                  <span className="bg-sky-100 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold">
                                    Tanda Tangan Elektronik
                                  </span>
                                </div>
                                <p className="text-slate-500 text-xs mt-1 flex items-center gap-3 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Saat ini
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> Instansi Pemerintah
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-slate-200/60 w-full sm:w-auto">
                              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                BSrE Terverifikasi
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedDetail(item)}
                                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all whitespace-nowrap hover:scale-105"
                              >
                                <Info className="w-4 h-4 text-sky-400" />
                                <span>Lihat Detil</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setResults(null)}
                  className="inline-flex items-center gap-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Verifikasi Dokumen Lainnya</span>
                </button>
              </div>
            </div>
          )}

          {/* PSrE Section */}
          <div className="mt-20 pt-12 border-t border-slate-200/60 max-w-4xl mx-auto text-center">
            <p className="text-xs font-extrabold text-slate-400 tracking-widest uppercase mb-6">
              Didukung Oleh PSrE Resmi Indonesia & BSSN
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
              <div className="bg-white border border-slate-200/80 hover:border-sky-300 px-5 py-2.5 rounded-xl shadow-2xs text-slate-700 font-extrabold text-sm flex items-center justify-center transition-all">
                <span className="text-red-600 font-black mr-0.5">B</span>SrE
              </div>
              <div className="bg-white border border-slate-200/80 hover:border-sky-300 px-5 py-2.5 rounded-xl shadow-2xs text-slate-700 font-extrabold text-sm flex items-center justify-center transition-all">
                <span className="text-emerald-600 font-black mr-0.5">V</span>IDA
              </div>
              <div className="bg-white border border-slate-200/80 hover:border-sky-300 px-5 py-2.5 rounded-xl shadow-2xs text-slate-700 font-extrabold text-sm flex items-center justify-center transition-all">
                <span className="text-blue-600 font-black mr-0.5">P</span>rivyID
              </div>
              <div className="bg-white border border-slate-200/80 hover:border-sky-300 px-5 py-2.5 rounded-xl shadow-2xs text-slate-700 font-extrabold text-sm flex items-center justify-center transition-all">
                <span className="text-amber-600 font-black mr-0.5">P</span>eruri
              </div>
              <div className="bg-white border border-slate-200/80 hover:border-sky-300 px-5 py-2.5 rounded-xl shadow-2xs text-slate-700 font-extrabold text-sm flex items-center justify-center transition-all">
                <span className="text-sky-600 font-black mr-0.5">D</span>igiSign
              </div>
            </div>
          </div>

          {/* 3 Langkah Section */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 md:p-12">
              <div className="text-center mb-12">
                <span className="inline-block bg-sky-100 text-sky-600 px-3.5 py-1 rounded-full font-bold text-xs mb-3 uppercase tracking-wider">
                  Panduan Cepat
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  Verifikasi Dokumen dalam 3 Langkah Mudah
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {/* Step 1 */}
                <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 group">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-lg group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">1. Upload PDF</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Pilih atau tarik file PDF yang ingin Anda periksa keaslian tanda tangannya dari perangkat Anda.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 group">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-lg group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">2. Verifikasi Otomatis</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Sistem mengecek sertifikat kriptografi, integritas dokumen, dan keabsahan otoritas BSrE secara instan.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-6 text-center transition-all duration-300 hover:bg-white hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 group">
                  <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-5 font-black text-lg group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">3. Hasil & Laporan</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Dapatkan laporan keaslian dokumen serta identitas penandatangan elektronik yang sah dan terverifikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL / SHEET DETAIL LAPORAN VERIFIKASI (MODERN & FLEKSIBEL)              */}
      {/* ========================================================================= */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-slate-50 w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
            
            {/* Modal Header */}
            <div className="bg-white px-6 py-5 border-b border-slate-200/80 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-xl font-extrabold text-slate-900 truncate">
                      Laporan Keabsahan Tanda Tangan Elektronik
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 whitespace-nowrap">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi BSSN
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-2 truncate">
                    <span className="truncate">Dokumen: <strong className="text-slate-800">{selectedDetail.filename}</strong></span>
                    <span>•</span>
                    <span className="whitespace-nowrap">Otoritas: <strong className="text-slate-800">BSrE - BSSN</strong></span>
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all flex-shrink-0"
                title="Tutup Modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* CARD 1: RINGKASAN VERIFIKASI (col-span-6) */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-100 font-extrabold text-slate-700 text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-sky-500" />
                    <span>Ringkasan Verifikasi</span>
                  </div>
                  <div className="p-5 space-y-3.5 flex-1">
                    {/* Row 1 */}
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Keaslian Dokumen</h4>
                          <p className="text-slate-500 text-[11px] truncate">Dokumen belum dimodifikasi</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                        ✓ Asli
                      </span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Identitas Penandatangan</h4>
                          <p className="text-slate-500 text-[11px] truncate">Dokumen dengan identitas penandatangan terpercaya</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                        ✓ Terverifikasi
                      </span>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Waktu Tanda Tangan</h4>
                          <p className="text-slate-500 text-[11px] truncate">Tanda tangan memiliki penanda waktu dari TSA berinduk</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                        ✓ Valid
                      </span>
                    </div>

                    {/* Row 4 */}
                    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Validasi Jangka Panjang (LTV)</h4>
                          <p className="text-slate-500 text-[11px] truncate">Tanda tangan mendukung sistem validasi LTV</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                        ✓ Aktif
                      </span>
                    </div>
                  </div>
                </div>

                {/* CARD 2: INFORMASI PENANDATANGAN (col-span-6) */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-100 font-extrabold text-slate-700 text-xs uppercase tracking-wider">
                    <User className="w-4 h-4 text-sky-500" />
                    <span>Informasi Penandatangan</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                      <div className="flex justify-between py-3.5 first:pt-0">
                        <span className="font-semibold text-slate-500">Penandatangan</span>
                        <span className="font-extrabold text-slate-900">{selectedDetail.signer}</span>
                      </div>
                      <div className="flex justify-between py-3.5">
                        <span className="font-semibold text-slate-500">Alasan</span>
                        <span className="font-extrabold text-slate-900">-</span>
                      </div>
                      <div className="flex justify-between py-3.5">
                        <span className="font-semibold text-slate-500">Lokasi</span>
                        <span className="font-extrabold text-slate-900">Kota Bogor, Jawa Barat</span>
                      </div>
                      <div className="flex justify-between items-center py-3.5">
                        <span className="font-semibold text-slate-500">Waktu Penandatanganan</span>
                        <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                          <span>30 Juni 2026, 09:01:07</span>
                          <Info className="w-3.5 h-3.5 text-sky-500 cursor-pointer" title="Waktu server lokal penandatangan" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-3.5 last:pb-0">
                        <span className="font-semibold text-slate-500">Stempel Waktu</span>
                        <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                          <span>30 Juni 2026, 09:01:08</span>
                          <Info className="w-3.5 h-3.5 text-sky-500 cursor-pointer" title="Timestamp dari TSA resmi" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 3: STATUS SERTIFIKAT PENANDATANGAN (col-span-4) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-100 font-extrabold text-slate-700 text-xs uppercase tracking-wider">
                      <FileCheck className="w-4 h-4 text-sky-500" />
                      <span>Status Sertifikat Penandatangan</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0 shadow-2xs">✓</div>
                        <div>
                          <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">Sertifikat ini terpercaya</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">Sertifikat elektronik ini diterbitkan oleh PSrE Indonesia yang terpercaya. Tanda Tangan Elektronik yang menggunakan sertifikat ini memiliki kekuatan hukum dan akibat hukum yang sah.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0 shadow-2xs">✓</div>
                        <div>
                          <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">Sertifikat ini belum melewati tanggal kedaluwarsa</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">Sertifikat elektronik ini masih berada dalam periode masa berlakunya.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0 shadow-2xs">✓</div>
                        <div>
                          <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">Sertifikat ini tidak dicabut</h5>
                          <p className="text-slate-500 text-[11px] leading-relaxed">Pada saat penandatanganan Sertifikat elektronik ini tidak dalam kondisi dicabut.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleShowCertDetail('Sertifikat Penandatangan', selectedDetail.signer, selectedDetail?.certDetail)}
                      className="bg-white hover:bg-slate-100 text-slate-700 hover:text-sky-600 font-bold text-xs px-3.5 py-1.5 rounded-xl border border-slate-200 transition-all shadow-2xs"
                    >
                      Lihat Sertifikat
                    </button>
                  </div>
                </div>

                {/* CARD 4: RANTAI SERTIFIKAT PENANDATANGAN (col-span-4) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-100 font-extrabold text-slate-700 text-xs uppercase tracking-wider">
                      <LinkIcon className="w-4 h-4 text-sky-500" />
                      <span>Rantai Sertifikat Penandatangan</span>
                    </div>
                    <div className="p-5 relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-[29px] top-9 bottom-14 w-0.5 bg-emerald-200"></div>
                      
                      <div className="space-y-5 relative z-10">
                        {/* Node 1 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">ROOT CA</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Root CA Indonesia DS G1</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('Root CA', 'Root CA Indonesia DS G1', selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>

                        {/* Node 2 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">INTERMEDIATE CA</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">BSrE CA DS G1</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('Intermediate CA', 'BSrE CA DS G1', selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>

                        {/* Node 3 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PENANDA TANGAN</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">{selectedDetail.signer}</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('Penanda Tangan', selectedDetail.signer, selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 5: STEMPEL WAKTU (TSA) (col-span-4) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-100 font-extrabold text-slate-700 text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-sky-500" />
                      <span>Stempel Waktu (TSA)</span>
                    </div>
                    <div className="p-5 relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-[29px] top-9 bottom-14 w-0.5 bg-emerald-200"></div>
                      
                      <div className="space-y-5 relative z-10">
                        {/* Node 1 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">ROOT CA</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Root CA Indonesia DS G1</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('Root CA (TSA)', 'Root CA Indonesia DS G1', selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>

                        {/* Node 2 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">INTERMEDIATE CA</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">BSrE CA DS G1</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('Intermediate CA (TSA)', 'BSrE CA DS G1', selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>

                        {/* Node 3 */}
                        <div className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 border-4 border-emerald-100 flex-shrink-0 mt-0.5 shadow-2xs"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">STEMPEL WAKTU</span>
                              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200/80">Terpercaya</span>
                            </div>
                            <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">Timestamp Authority Badan Siber dan Sandi Negara</h5>
                            <button
                              type="button"
                              onClick={() => handleShowCertDetail('TSA Authority', 'Timestamp Authority BSSN', selectedDetail?.certDetail)}
                              className="mt-1.5 bg-white hover:bg-slate-100 text-slate-600 hover:text-sky-600 font-bold text-[11px] px-3 py-1 rounded-lg border border-slate-200 transition-all shadow-2xs"
                            >
                              Lihat Sertifikat
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Sticky Footer */}
            <div className="bg-white px-6 py-4 border-t border-slate-200/80 flex items-center justify-between gap-4 sticky bottom-0 z-20">
              <div className="text-xs text-slate-500 hidden sm:flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>Hasil verifikasi ini sah dan diakui secara hukum sesuai UU ITE & standar Balai Sertifikasi Elektronik.</span>
              </div>
              <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleLihatDokumen(selectedDetail.fileUrl, selectedDetail.filename)}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 transition-all shadow-2xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Pratinjau Dokumen</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDetail(null)}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-sky-500/20 transition-all"
                >
                  <span>Tutup Laporan</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
