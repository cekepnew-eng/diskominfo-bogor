import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SecondaryPageTemplate from "../ui/PageLayout";
import { User } from "lucide-react";

// Components
const PersonCard = ({ foto, nama, jabatan, size = "md", highlight = false }) => {
  const sizeClasses = {
    lg: "w-44 h-44",
    md: "w-36 h-36",
  };

  return (
    <article className="flex flex-col items-center w-full max-w-sm p-8 text-center transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:border-cyan-800 group">
      <div className="relative mb-5">
        <div
          className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-50 to-gray-100 ${
            highlight ? "ring-4 ring-cyan-800 ring-offset-4" : "ring-2 ring-gray-200"
          } transition-all duration-200 group-hover:ring-cyan-800`}
        >
          {foto ? (
            <img
              src={foto}
              alt={`Foto ${nama}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="w-1/2 text-gray-300 h-1/2" strokeWidth={1.5} />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow space-y-2">
        <h3 className="text-lg font-semibold leading-tight text-gray-900 transition-colors group-hover:text-cyan-800">
          {nama}
        </h3>
        <p className="flex-grow text-sm leading-relaxed text-gray-600">{jabatan}</p>
      </div>
    </article>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="mb-2 text-3xl font-bold text-gray-900">{title}</h2>
    {subtitle && (
      <p className="max-w-2xl mx-auto text-base text-gray-600">{subtitle}</p>
    )}
    <div className="w-16 h-1.5 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-800 to-cyan-600"></div>
  </div>
);

export default function Struktur() {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Struktur Organisasi" },
  ];

  const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

  // React Query fetch
  const { data: strukturData, isLoading, isError, error } = useQuery({
    queryKey: ["strukturOrganisasi"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/statis-pages/struktur-organisasi`);
      return res.data.konten;
    },
  });

  if (isLoading) {
    return (
      <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-gray-500">Memuat data...</div>
      </SecondaryPageTemplate>
    );
  }

  if (isError) {
    return (
      <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-red-600">
          Gagal memuat data: {error.message}
        </div>
      </SecondaryPageTemplate>
    );
  }

  if (!strukturData) {
    return (
      <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-red-600">Data tidak ditemukan</div>
      </SecondaryPageTemplate>
    );
  }

  return (
    <SecondaryPageTemplate title="Struktur Organisasi" breadcrumb={breadcrumb}>
      <div className="space-y-20">
        {/* Kepala Dinas */}
        <SectionTitle 
          title="Kepala Dinas" 
          subtitle="Pemimpin tertinggi di Dinas Komunikasi dan Informatika"
        />
        <section className="flex justify-center py-8">
          <PersonCard
            foto={strukturData.kepalaDinas.foto}
            nama={strukturData.kepalaDinas.nama}
            jabatan={strukturData.kepalaDinas.jabatan}
            size="lg"
            highlight
          />
        </section>

        {/* Sekretariat & Sub Bagian */}
        <section className="px-8 py-12 -mx-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
          <SectionTitle 
            title="Sekretariat" 
            subtitle="Koordinator dan pengelola administrasi dinas"
          />
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            <PersonCard
              foto={strukturData.sekretariat.foto}
              nama={strukturData.sekretariat.nama}
              jabatan={strukturData.sekretariat.jabatan}
            />
            {strukturData.subBagian.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
              />
            ))}
          </div>
        </section>

        {/* Kepala Bidang */}
        <section className="py-8">
          <SectionTitle 
            title="Kepala Bidang" 
            subtitle="Tim inti yang mengelola berbagai bidang strategis"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strukturData.bidang.map((item, index) => (
              <PersonCard
                key={index}
                foto={item.foto}
                nama={item.nama}
                jabatan={item.jabatan}
              />
            ))}
          </div>
        </section>
      </div>
    </SecondaryPageTemplate>
  );
}
