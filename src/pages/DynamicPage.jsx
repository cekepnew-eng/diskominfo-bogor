import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { createPortal } from "react-dom";
import axios from "axios";
import {
  Download,
  Image as ImageIcon,
  Loader,
  AlertCircle,
  Calendar,
  Search,
  Frown, Eye, X
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";
const STORAGE_DEFAULT_URL = "https://adm-diskominfo.kotabogor.go.id/storage";

const fetchPages = async ({ queryKey }) => {
  const [_key, menuId, page, search] = queryKey;
  const res = await axios.get(`${API_URL}/pages`, {
    params: { menu_id: menuId, page, search },
  });
  return res.data;
};

const stripHtml = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// ===== CARD VIEW =====
const CardView = ({ data }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {data.map((item) => (
      <Link
        key={item.id}
        to={`/page/detail/${item.id}`}
        className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-xl hover:-translate-y-1"
      >
        <div className="relative h-48 overflow-hidden">
          {item.gambar_url ? (
            <img src={item.gambar_url} alt={item.judul} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-50">
              <ImageIcon className="w-10 h-10 text-gray-300" />
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-base font-semibold text-gray-900 group-hover:text-cyan-700 line-clamp-2">{item.judul}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{stripHtml(item.isi_konten)}</p>
        </div>
      </Link>
    ))}
  </div>
);

// ===== LIST VIEW =====
const ListView = ({ data, onPreview }) => (
  <div className="space-y-3">
    {data.map((item) => (
      <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="mb-1 text-base font-semibold text-gray-900 line-clamp-1">{item.judul}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
             <Calendar size={14} />
             <span>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}</span>
          </div>
        </div>

        {item.dokumen_url && (
          <div className="flex items-center flex-shrink-0 gap-2">
            <button
              type="button"
              onClick={() => {
                const storageBase = import.meta.env.VITE_API_STORAGE_URL || STORAGE_DEFAULT_URL; 
                let finalUrl = "";
                if (item.dokumen_url.startsWith('http')) {
                  finalUrl = item.dokumen_url;
                } else {
                  const cleanPath = item.dokumen_url.startsWith('/') ? item.dokumen_url.substring(1) : item.dokumen_url;
                  finalUrl = storageBase.endsWith('/storage') ? `${storageBase}/${cleanPath}` : `${storageBase}/storage/${cleanPath}`;
                }
                onPreview(finalUrl);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-cyan-700 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-colors"
            >
              <Eye size={16} /> Lihat
            </button>
            <a
              href={item.dokumen_url.startsWith('http') ? item.dokumen_url : `${import.meta.env.VITE_API_STORAGE_URL || STORAGE_DEFAULT_URL}/${item.dokumen_url.startsWith('/') ? item.dokumen_url.substring(1) : item.dokumen_url}`}
              download target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 transition-colors"
            >
              <Download size={16} />
            </a>
          </div>
        )}
      </div>
    ))}
  </div>
);

// ===== MAIN PAGE =====
const DynamicPage = () => {
  const { menuId } = useParams();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);
  useEffect(() => {
    document.body.style.overflow = previewUrl ? 'hidden' : 'unset';
  }, [previewUrl]);

  const { data, isLoading, isError, error: queryError } = useQuery({
    queryKey: ["pages", menuId, currentPage, debouncedSearch],
    queryFn: fetchPages,
    keepPreviousData: true,
  });

  const menuInfo = data?.data?.[0]?.menu;

  const renderContent = () => {
    if (isLoading) return <div className="flex justify-center py-20"><Loader className="animate-spin text-cyan-800" /></div>;
    if (isError) return <div className="py-20 text-center text-red-500"><AlertCircle className="mx-auto mb-2" />{queryError?.message}</div>;
    if (!data?.data?.length) return <div className="py-20 text-center"><Frown className="mx-auto mb-2 text-gray-300" /><p>Konten Belum Tersedia</p></div>;

    return menuInfo?.tipe_tampilan === "list" 
      ? <ListView data={data.data} onPreview={setPreviewUrl} /> 
      : <CardView data={data.data} />;
  };

  return (
    <SecondaryPageTemplate title={menuInfo?.nama || "Memuat..."} breadcrumb={[{ label: "Beranda", link: "/" }, { label: menuInfo?.nama || "..." }]}>
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text" placeholder={`Cari dalam ${menuInfo?.nama || "halaman ini"}...`}
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>
        </div>

        {renderContent()}

        {/* PAGINATION (Muncul otomatis untuk berita & dokumen) */}
        {data?.last_page > 1 && (
          <div className="flex flex-col items-center gap-6 mt-12">
            <div className="flex items-center gap-2">
              {/* Tombol Prev */}
              <button 
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(p => p - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Sebelumnya
              </button>
              
              {/* Loop Angka Halaman */}
              <div className="hidden md:flex items-center gap-2">
                {[...Array(data.last_page)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-cyan-700 text-white shadow-lg shadow-cyan-100"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-cyan-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Tombol Next */}
              <button 
                disabled={currentPage === data.last_page}
                onClick={() => {
                  setCurrentPage(p => p + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Selanjutnya
              </button>
            </div>

            {/* Info Text */}
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-bold text-gray-800">{data?.from || 0}</span> - <span className="font-bold text-gray-800">{data?.to || 0}</span> dari <span className="font-bold text-gray-800">{data?.total || 0}</span> data
            </p>
          </div>
        )}
      </div>

      {/* MODAL PREVIEW - VERSI FIX ANTI-BLUR */}
      {previewUrl && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-10">
          {/* Overlay Gelap */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewUrl(null)} />
          
          {/* Box Konten Modal */}
          <div className="relative z-[10000] bg-white w-full max-w-6xl h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-bold text-gray-800">Pratinjau Dokumen</h3>
              <button onClick={() => setPreviewUrl(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={24} /></button>
            </div>
            
            {/* Iframe Area */}
            <div className="flex-grow bg-gray-50">
              <iframe src={previewUrl} className="w-full h-full" title="Preview" />
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={() => setPreviewUrl(null)} className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">Tutup</button>
              <a href={previewUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 font-bold">Buka Tab Baru</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </SecondaryPageTemplate>
  );
};

export default DynamicPage;