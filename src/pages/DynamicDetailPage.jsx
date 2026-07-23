import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Loader,
  AlertCircle,
  Calendar,
  Download,
  ArrowLeft,
} from "lucide-react";
import SecondaryPageTemplate from "../ui/PageLayout";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

const DynamicDetailPage = () => {
  const { contentId } = useParams();

  // ✅ Fetch pakai React Query
  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contentDetail", contentId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/pages/${contentId}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  // ✅ Error State dari React Query
  if (isError) {
    return (
      <SecondaryPageTemplate
        title="Terjadi Kesalahan"
        breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Error" }]}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="text-red-400" size={48} />
          <p className="mt-4 text-lg text-gray-600">
            Tidak dapat memuat konten dari server.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 mt-6 text-sm font-medium border border-transparent rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </SecondaryPageTemplate>
    );
  }

  // ✅ Jika konten kosong/null
  if (!content) {
    return (
      <SecondaryPageTemplate
        title="Konten Tidak Ditemukan"
        breadcrumb={[{ label: "Beranda", link: "/" }, { label: "404" }]}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="text-yellow-500" size={48} />
          <p className="mt-4 text-lg text-gray-600">
            Maaf, konten yang Anda cari tidak dapat ditemukan.
          </p>
        </div>
      </SecondaryPageTemplate>
    );
  }

  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: content.menu?.nama, link: `/page/${content.menu?.id}` },
    { label: content.judul },
  ];

  return (
    <SecondaryPageTemplate title={content.judul} breadcrumb={breadcrumb}>
      <div className="max-w-4xl p-4 mx-auto md:p-0">
        <Link
          to={content.menu ? `/page/${content.menu.id}` : "/"}
          className="inline-flex items-center gap-2 mb-6 transition-colors text-cyan-600 hover:text-cyan-800"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke {content.menu?.nama || "Daftar"}</span>
        </Link>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-800 lg:text-4xl">
          {content.judul}
        </h1>

        <div className="flex items-center mb-6 text-sm text-gray-500">
          <Calendar size={16} className="mr-2 text-cyan-600" />
          <span>Diterbitkan pada {formatDate(content.created_at)}</span>
        </div>

        {content.gambar_url && (
          <img
            src={content.gambar_url}
            alt={content.judul}
            className="w-full max-w-3xl h-auto max-h-[400px] object-cover rounded-2xl shadow-lg mb-8 mx-auto"
          />
        )}

        <div
          className="ql-editor-content"
          dangerouslySetInnerHTML={{ __html: content.isi_konten }}
        />

        {content.dokumen_url && (
          <div className="pt-8 mt-12 border-t-2 border-gray-200 border-dashed">
            <h3 className="mb-4 text-lg font-bold text-gray-800">Lampiran</h3>
            <a
              href={content.dokumen_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 text-base font-medium text-white transition-all duration-300 transform rounded-lg shadow-md bg-cyan-600 hover:bg-cyan-700 hover:scale-105"
            >
              <Download size={20} />
              Unduh Dokumen Lampiran
            </a>
          </div>
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default DynamicDetailPage;
