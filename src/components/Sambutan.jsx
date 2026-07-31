import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SambutanRedesign() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50/40">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-100 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 bg-blue-100 rounded-full w-72 h-72 blur-3xl opacity-30"></div>

      <div className="container relative max-w-6xl px-6 mx-auto">
        {/* Header */}

        {/* Frame utama */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 mx-auto bg-white border border-gray-200 shadow-md rounded-2xl lg:p-12"
        >
      
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Foto */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start lg:col-span-4"
            >
              <div className="p-4 text-center transition-all duration-300 bg-white border shadow-sm hover:shadow-md rounded-xl">
               <img
  src="/ICEU PUJIATI, S.H, M.M.jpeg"
  alt="Plt. Kepala Dinas Iceu Pujiati"
  className="object-cover object-top mx-auto mb-4 border-2 rounded-lg shadow-sm w-48 h-64 border-cyan-100"
/>

                <h2 className="text-base font-semibold text-cyan-900">
                  ICEU PUJIATI, S.H, M.M
                </h2>
                <p className="text-xs text-gray-600">Plt. Kepala Dinas</p>
                <p className="text-xs text-gray-500">Diskominfo Kota Bogor</p>
              </div>
            </motion.div>

            {/* Isi Sambutan */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 leading-relaxed text-gray-700 lg:col-span-8"
            >
              <p className="font-medium text-cyan-900">
                Assalamu’alaikum warahmatullahi wabarakatuh,
              </p>

              <div className="p-5 transition-all duration-300 border rounded-lg bg-gray-50 hover:shadow-sm">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-cyan-400 shrink-0" />
                  <blockquote className="text-sm italic text-gray-700">
                    Selamat datang di website resmi Dinas Komunikasi dan
                    Informatika Kota Bogor. Website ini kami hadirkan sebagai
                    jendela informasi, wadah komunikasi, dan sarana partisipasi
                    bagi seluruh warga.
                  </blockquote>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  Di era digital yang terus berkembang, keterbukaan informasi
                  dan kemudahan akses layanan publik adalah kunci dari tata
                  kelola pemerintahan yang baik.
                </p>
                <p>
                  Melalui platform ini, kami berkomitmen untuk terus berinovasi
                  dalam memberikan pelayanan terbaik, membangun Smart City yang
                  inklusif, dan mewujudkan transformasi digital berkelanjutan.
                </p>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => (window.location.href = "/sambutan-full")}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700"
              >
                Baca Selengkapnya
                <ArrowRight
                  size={16}
                  className={`transition-transform ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
