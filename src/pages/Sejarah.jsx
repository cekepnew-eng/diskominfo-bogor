import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SecondaryPageTemplate from "../ui/PageLayout";
import { Archive, Briefcase, Network, ShieldCheck, Gem } from "lucide-react";

// Icon mapper
const iconMap = {
  Gem: <Gem size={24} className="text-white" />,
  Archive: <Archive size={24} className="text-white" />,
  Briefcase: <Briefcase size={24} className="text-white" />,
  Network: <Network size={24} className="text-white" />,
  ShieldCheck: <ShieldCheck size={24} className="text-white" />,
};

// TimelineItem component
const TimelineItem = ({ data, index }) => {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const isOdd = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className={`relative w-full mb-12 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div
        className={`flex w-full items-start md:items-center flex-col md:flex-row ${
          isOdd ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Spacer for layout (desktop only) */}
        <div className="hidden w-5/12 md:block"></div>

        {/* Dot / Icon */}
        <div className="absolute z-10 flex items-center justify-center w-10 h-10 rounded-full shadow-lg md:w-12 md:h-12 bg-cyan-600 left-6 md:left-1/2 md:-translate-x-1/2 md:static">
          {iconMap[data.icon] || <Gem size={24} className="text-white" />}
        </div>

        {/* Card */}
        <div
          className={`bg-white px-4 py-4 md:px-6 w-full md:w-5/12 mt-12 md:mt-0 rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02] ${
            isOdd ? "md:text-right md:ml-0 md:mr-6" : "md:ml-6"
          }`}
        >
          <p className="mb-1 text-sm font-medium text-cyan-600">{data.period}</p>
          <h3 className="mb-2 text-lg font-semibold text-slate-800">{data.title}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

// Sejarah component
const Sejarah = () => {
  const breadcrumb = [
    { label: "Home", link: "/" },
    { label: "Profil", link: "/profil" },
    { label: "Sejarah", link: "/sejarah" },
  ];

  const API_URL = import.meta.env.VITE_API_BASE_URL || "https://adm-diskominfo.kotabogor.go.id/api";

  // React Query fetch
  const { data: historyData, isLoading, isError, error } = useQuery({
    queryKey: ["sejarah"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/statis-pages/sejarah`);
      return res.data.konten;
    },
  });

  return (
    <SecondaryPageTemplate title="Sejarah Perkembangan" breadcrumb={breadcrumb}>
      <div className="max-w-4xl p-4 mx-auto md:p-0">
        <h2 className="mb-4 text-3xl font-bold text-center text-slate-800 md:text-4xl">
          Perjalanan <span className="text-cyan-600">Diskominfo</span> Kota Bogor
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-center text-slate-600">
          Menelusuri jejak transformasi digital dan pelayanan informasi di Kota Bogor dari masa ke masa.
        </p>

        {isLoading ? (
          <div className="py-12 text-center text-gray-500">Memuat data...</div>
        ) : isError ? (
          <div className="py-12 text-center text-red-600">
            Gagal memuat data: {error.message}
          </div>
        ) : !historyData || historyData.length === 0 ? (
          <div className="py-12 text-center text-red-600">Data tidak ditemukan</div>
        ) : (
          <div className="relative">
            {/* Timeline Line (responsive position) */}
            <div className="absolute w-1 h-full transform bg-slate-300 left-6 md:left-1/2 md:-translate-x-1/2"></div>

            {historyData.map((item, index) => (
              <TimelineItem key={index} data={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </SecondaryPageTemplate>
  );
};

export default Sejarah;
