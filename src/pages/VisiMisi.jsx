import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SecondaryPageTemplate from "../ui/PageLayout";

const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

const fetchVisiMisi = async () => {
  const response = await axios.get(`${API_URL}/statis-pages/visi-misi`);
  return response.data.konten;
};

const VisiMisi = () => {
  const breadcrumb = [
    { label: "Beranda", link: "/" },
    { label: "Profil", link: "/profil" },
    { label: "Visi & Misi Kota Bogor", link: "/visi-misi" },
  ];

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["visiMisi"],
    queryFn: fetchVisiMisi,
  });

  if (isLoading) {
    return (
      <SecondaryPageTemplate title="Visi & Misi Kota Bogor" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-gray-500">Memuat data...</div>
      </SecondaryPageTemplate>
    );
  }

  if (isError) {
    return (
      <SecondaryPageTemplate title="Visi & Misi Kota Bogor" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-red-600">
          Gagal memuat data: {error.message}
        </div>
      </SecondaryPageTemplate>
    );
  }

  if (!data) {
    return (
      <SecondaryPageTemplate title="Visi & Misi Kota Bogor" breadcrumb={breadcrumb}>
        <div className="py-12 text-center text-red-600">
          Data tidak ditemukan
        </div>
      </SecondaryPageTemplate>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SecondaryPageTemplate title="Visi & Misi Kota Bogor" breadcrumb={breadcrumb}>
        <div className="space-y-12">
          {/* Visi Section */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">Visi</h2>
            <div className="p-8 border border-blue-100 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-sm">
              <p className="text-2xl font-extrabold text-center text-black-700 italic">
                "{data.visi}"
              </p>
            </div>
          </div>

          {/* Misi Section */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4">Misi</h2>
            <div className="grid gap-6">
              {data.misi?.map((item, idx) => {
                const [label, ...descParts] = item.split(": ");
                const description = descParts.join(": ");
                
                return (
                  <div key={idx} className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <span className="flex items-center justify-center w-8 h-8 font-bold text-white bg-blue-600 rounded-full shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-blue-700">{label}</h3>
                        <p className="mt-1 text-gray-600 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SecondaryPageTemplate>
    </div>
  );
};

export default VisiMisi;