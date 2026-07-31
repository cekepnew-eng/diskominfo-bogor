import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, ArrowRight, FileText } from 'lucide-react';

const MOCK_JURNAL = [
  { id: 1, judul: "Pengalaman Penderita HIV Pada Lelaki Suka Lelaki (LSL): Analisis Kualitatif Tentang Persepsi Diri...", penulis: "Dewi Purnamawati" },
  { id: 2, judul: "SELF-EFFICACY AMONG PEOPLE LIVING WITH HIV/AIDS AFTER COVID-19 PANDEMIC", penulis: "Dewi Purnamawati" },
  { id: 3, judul: "FAMILY SUPPORT FOR PEOPLE WITH HIV AND AIDS (PLWHA)", penulis: "Dewi Purnamawati" },
  { id: 4, judul: "Religiusitas Homoseksual dengan HIV", penulis: "Dewi Purnamawati" },
  { id: 5, judul: "Faktor-Faktor Yang Berhubungan Dengan Kepatuhan Minum Obat Pada Pasien Diabetes Melitus Tipe 2...", penulis: "Erina Dewy Pramesti" },
  { id: 6, judul: "Hubungan Pengetahuan dan Dukungan Keluarga Terhadap Manajemen Diri Pada Pasien Diabetes...", penulis: "Mashiroh Irchanna Hartanti" },
  { id: 7, judul: "ANALISIS KOMUNIKASI INTERPERSONAL KADER DALAM PROGRAM AKSELERASI GERAKAN ELIMINASI...", penulis: "Hanna Attaya Putri" },
  { id: 8, judul: "Gambaran Epidemiologi Kasus Campak di Wilayah Kota Bogor Tahun 2022-2024", penulis: "Siti Setia Hidiyah Wati" },
  { id: 9, judul: "ANALISIS DETERMINAN STUNTING DI KABUPATEN BOGOR DAN KOTA BOGOR: PENDEKATAN SPASIAL...", penulis: "LUKMAN PERDANA SOFYAN" },
  { id: 10, judul: "Efektifitas Buku Audio dalam Meningkatkan Pengetahuan Kesehatan Reproduksi bagi Perempuan...", penulis: "Novita Dewi Pramanik" }
];

export default function DaftarJurnal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredJurnal = MOCK_JURNAL.filter((item) => {
    return item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.penulis.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <div className="bg-slate-50 min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-sky-600 mb-2 tracking-tight">
                Daftar Hasil Penelitian & Jurnal
              </h1>
              <p className="text-slate-500 text-[0.95rem]">
                Berikut adalah daftar penelitian, tugas akhir, dan jurnal yang telah diselesaikan dan dilaporkan.
              </p>
            </div>
            
            {/* Search Bar */}
            <form 
              className="flex items-center bg-white border border-slate-200 rounded-full p-1 w-full md:max-w-md shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="pl-4 text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Cari judul / penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-2.5 px-3 text-[0.95rem] text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead className="bg-[#1e293b] text-white">
                  <tr>
                    <th className="px-6 py-5 text-[0.85rem] font-bold tracking-wider text-center w-[5%] uppercase">NO</th>
                    <th className="px-6 py-5 text-[0.85rem] font-bold tracking-wider text-left w-[55%] uppercase">JUDUL</th>
                    <th className="px-6 py-5 text-[0.85rem] font-bold tracking-wider text-left w-[25%] uppercase">PENULIS</th>
                    <th className="px-6 py-5 text-[0.85rem] font-bold tracking-wider text-center w-[15%] uppercase">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJurnal.length > 0 ? (
                    filteredJurnal.map((item, index) => (
                      <tr key={item.id} className="hover:bg-slate-50 group border-b border-slate-100 last:border-none transition-colors">
                        <td className="px-6 py-5 text-center text-slate-500 font-semibold align-middle">
                          {index + 1}
                        </td>
                        <td className="px-6 py-5 align-middle">
                          <h6 className="font-bold text-slate-800 text-[0.95rem] leading-relaxed m-0">
                            {item.judul}
                          </h6>
                        </td>
                        <td className="px-6 py-5 text-slate-500 text-[0.9rem] align-middle">
                          {item.penulis}
                        </td>
                        <td className="px-6 py-5 text-center align-middle">
                          <button 
                            onClick={() => alert('Abstrak belum tersedia secara publik.')}
                            className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-[0.85rem] font-semibold transition-colors w-full sm:w-auto"
                          >
                            <FileText size={16} />
                            Lihat
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                        Tidak ada jurnal yang sesuai dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile & Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {filteredJurnal.length > 0 ? (
              filteredJurnal.map((item, index) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-slate-200/60 flex flex-col gap-3.5 hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(59,130,246,0.05)] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full">
                      Jurnal #{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-[0.95rem] leading-relaxed">
                    {item.judul}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-500 text-xs mt-1 pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-400">Penulis:</span>
                    <span className="text-slate-600">{item.penulis}</span>
                  </div>
                  
                  <div className="flex justify-end pt-1">
                    <button 
                      onClick={() => alert('Abstrak belum tersedia secara publik.')}
                      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-full"
                    >
                      <FileText size={16} />
                      Lihat Jurnal
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200/60">
                Tidak ada jurnal yang sesuai dengan pencarian Anda.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed shadow-[0_2px_5px_rgba(0,0,0,0.05)] border border-transparent">
              <ArrowRight size={18} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold shadow-[0_4px_10px_rgba(59,130,246,0.3)]">1</button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200 shadow-[0_2px_5px_rgba(0,0,0,0.05)] border border-transparent transition-all">2</button>
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200 shadow-[0_2px_5px_rgba(0,0,0,0.05)] border border-transparent transition-all">
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
