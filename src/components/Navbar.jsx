// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import clsx from "clsx";
import { Menu, X, ChevronDown } from "lucide-react";
import { getMenus } from "../api/menuApi";
import { useQuery } from "@tanstack/react-query";

const logoColor = "/LOGO BIRU.webp";
const logoBogor = "/kotabogor.webp";

export default function Navbar() {
  const { data: menuData = [], isLoading } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });
  
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hideTimeout = useRef(null);
  const location = useLocation();
  const navRef = useRef(null);

  const isHome = location.pathname === "/" || location.pathname === "/penelitian" || location.pathname === "/submit-penelitian" || location.pathname === "/magang" || location.pathname === "/daftar-jurnal" || location.pathname === "/pengajuan-tte";

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const handleMouseEnter = (index) => {
    if (!isMobile) {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setActiveSubmenu(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => setActiveSubmenu(null), 200);
    }
  };

  const handleMobileSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // === FUNGSI CREATE LINK (DENGAN INTERUPSI) ===
  const createLink = (menuItem) => {
    const namaMenu = menuItem.nama.toLowerCase();

    // --- INTERUPSI KHUSUS: Paksa link agar tidak 404 ---
    if (namaMenu.includes("visi-misi")) return "/visi-misi"; // Solusi biar gak 404
    if (namaMenu === "video") return "/galeri/video";
    if (namaMenu === "galeri" || namaMenu === "galeri foto") return "/galeri";
    // ---------------------------------------------------------

    if (menuItem.kategori === "statis") {
      const slug = menuItem.nama
        .toLowerCase()
        .replace(/ & /g, "-")
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      return `/${slug}`;
    }
    if (menuItem.kategori.startsWith("dinamis")) {
      return `/page/${menuItem.id}`;
    }
    return "#";
  };

  const isSolid = isScrolled || isMenuOpen || isMobile;

  const navClasses = clsx(
    "fixed top-0 z-50 w-full transition-[padding,background-color] duration-500 ease-in-out",
    {
      "bg-white": isSolid,
      "bg-gradient-to-b from-white/80 to-transparent pt-4 pb-10": isHome && !isSolid,
      "bg-gradient-to-b from-black/60 to-transparent pt-4 pb-10": !isHome && !isSolid,
    }
  );

  const linkClasses = (isActive, hasSubmenu = false) => {
    const baseClasses =
      "relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out " +
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full " +
      "after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r " +
      "after:from-cyan-400 after:to-blue-500 after:transition-transform after:duration-300 after:ease-out";
    const submenuClasses = hasSubmenu ? "flex items-center gap-1" : "";
    if (!isHome && !isSolid) return clsx(baseClasses, submenuClasses, "text-white hover:text-cyan-300", isActive ? "after:scale-x-100" : "hover:after:scale-x-100");
    if (isSolid) return clsx(baseClasses, submenuClasses, "text-gray-700 hover:text-cyan-600", isActive ? "after:scale-x-100" : "hover:after:scale-x-100");
    return clsx(baseClasses, submenuClasses, "text-black hover:text-cyan-600", isActive ? "after:scale-x-100" : "hover:after:scale-x-100");
  };

  const mobileButtonClasses = clsx("p-2 transition-colors rounded-lg", {
    "text-white hover:bg-white/20": !isHome && !isSolid,
    "text-gray-700 hover:bg-cyan-100": isSolid,
    "text-black hover:bg-black/10": isHome && !isSolid,
  });

  return (
    <nav ref={navRef} className={navClasses}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20 px-4 md:px-6">
          <Link to="/" onClick={closeMenu} className="flex items-center flex-shrink-0 gap-3 pl-3">
            <img src={logoBogor} alt="Logo Bogor" className="w-auto transition-all duration-300 h-14 hover:scale-105" />
            <span className="text-gray-400">|</span>
            <img src={logoColor} alt="Logo Kominfo" className="w-auto transition-all duration-300 h-14 hover:scale-105" />
          </Link>

          <div className="items-center hidden space-x-2 md:flex h-full">
            {/* 1. BERANDA */}
            <div className="flex items-center">
              <Link to="/" className={linkClasses(location.pathname === "/")}>
                Beranda
              </Link>
            </div>

            {/* 2. MENU DARI API DAN LAYANAN PUBLIK */}
            {!isLoading && menuData
              .filter(link => link.nama.toLowerCase() !== "pakta integritas")
              .map((link, index) => {
                const hasSubmenu = link.children && link.children.length > 0;
                const isPublikasi = link.nama.toLowerCase().includes("publikasi");
                return (
                  <Fragment key={link.id}>
                    <div 
                      className="relative flex items-center" // Tambahkan flex items-center di sini
                      onMouseEnter={() => handleMouseEnter(index)} 
                      onMouseLeave={handleMouseLeave}
                    >
                      {hasSubmenu ? (
                        <button className={linkClasses(link.children.some((sub) => location.pathname === createLink(sub)), true)}>
                          <ChevronDown className={clsx("w-4 h-4 mr-1 transition-transform duration-300", activeSubmenu === index ? "-rotate-90" : "")} />
                          {link.nama}
                        </button>
                      ) : (
                        <Link to={createLink(link)} className={linkClasses(location.pathname === createLink(link))}>
                          {link.nama}
                        </Link>
                      )}

                      {hasSubmenu && activeSubmenu === index && (
                        <div className="absolute left-0 top-full mt-0 origin-top bg-white shadow-2xl w-52 rounded-xl ring-1 ring-black/5 animate-fade-in-up overflow-hidden">
                          <div className="py-2">
                            {link.children.map((subItem) => (
                              <Link 
                                key={subItem.id} 
                                to={createLink(subItem)} 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">{subItem.nama}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* LAYANAN PUBLIK (HARDCODED) DITAMPILKAN SETELAH PUBLIKASI */}
                    {isPublikasi && (
                      <div 
                        className="relative flex items-center"
                        onMouseEnter={() => handleMouseEnter('layanan-publik')} 
                        onMouseLeave={handleMouseLeave}
                      >
                        <button className={linkClasses(location.pathname === "/penelitian", true)}>
                          <ChevronDown className={clsx("w-4 h-4 mr-1 transition-transform duration-300", activeSubmenu === 'layanan-publik' ? "-rotate-90" : "")} />
                          Layanan Publik
                        </button>

                        {activeSubmenu === 'layanan-publik' && (
                          <div className="absolute left-0 top-full mt-0 origin-top bg-white shadow-2xl w-60 rounded-xl ring-1 ring-black/5 animate-fade-in-up overflow-hidden">
                            <div className="py-2 flex flex-col">
                              <Link 
                                to="/penelitian" 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 font-medium"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">Informasi Penelitian</span>
                              </Link>
                              <Link 
                                to="/daftar-jurnal" 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 font-medium"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">Daftar Jurnal</span>
                              </Link>
                              <Link 
                                to="/submit-penelitian" 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 font-medium"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">Formulir Penelitian</span>
                              </Link>
                              <Link 
                                to="/magang" 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 font-medium"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">Formulir Magang</span>
                              </Link>
                              <Link 
                                to="/pengajuan-tte" 
                                onClick={closeMenu} 
                                className="group flex items-center w-full px-4 py-2.5 text-sm text-gray-700 transition-all duration-300 hover:bg-cyan-50 hover:text-cyan-700 font-medium"
                              >
                                <span className="transition-all duration-300 transform group-hover:translate-x-1">Formulir TTE</span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })
            }

            {/* 4. DAFTAR KOMITMEN */}
            <div className="flex items-center">
              <Link 
                to="/daftar-publik" 
                className={linkClasses(location.pathname === "/daftar-publik")}
              >
                Daftar Komitmen
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={mobileButtonClasses}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-cyan-600 md:hidden">
          <div className="h-screen pt-20 overflow-y-auto px-6 py-8 space-y-3">
            <Link to="/" onClick={closeMenu} className="block text-white text-lg font-semibold py-3">Beranda</Link>
            
            {!isLoading && menuData
              .filter(link => link.nama.toLowerCase() !== "pakta integritas") // Menghapus menu rahasia dari list
              .map((link, index) => {
                const isPublikasi = link.nama.toLowerCase().includes("publikasi");
                return (
                  <Fragment key={link.id}>
                    <div>
                      {link.children && link.children.length > 0 ? (
                        <>
                          <button onClick={() => handleMobileSubmenuToggle(index)} className="flex items-center justify-between w-full text-white text-lg font-semibold py-3">
                            {link.nama}
                            <ChevronDown className={clsx("w-5 h-5 transition-transform", activeSubmenu === index && "rotate-180")} />
                          </button>
                          {activeSubmenu === index && (
                            <div className="pl-4 space-y-2 border-l-2 border-white/30">
                              {link.children.map((sub) => (
                                <Link key={sub.id} to={createLink(sub)} onClick={closeMenu} className="block text-white py-2">{sub.nama}</Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link to={createLink(link)} onClick={closeMenu} className="block text-white text-lg font-semibold py-3">{link.nama}</Link>
                      )}
                    </div>

                    {/* Link Manual untuk Layanan Publik di Mobile setelah publikasi */}
                    {isPublikasi && (
                      <div>
                        <button onClick={() => handleMobileSubmenuToggle('layanan-publik')} className="flex items-center justify-between w-full text-white text-lg font-semibold py-3 border-t border-white/20">
                          Layanan Publik
                          <ChevronDown className={clsx("w-5 h-5 transition-transform", activeSubmenu === 'layanan-publik' && "rotate-180")} />
                        </button>
                        {activeSubmenu === 'layanan-publik' && (
                          <div className="pl-4 space-y-2 border-l-2 border-white/30 mb-2">
                            <Link to="/penelitian" onClick={closeMenu} className="block text-white py-2">Informasi Penelitian</Link>
                            <Link to="/daftar-jurnal" onClick={closeMenu} className="block text-white py-2">Daftar Jurnal</Link>
                            <Link to="/submit-penelitian" onClick={closeMenu} className="block text-white py-2">Formulir Penelitian</Link>
                            <Link to="/magang" onClick={closeMenu} className="block text-white py-2">Formulir Magang</Link>
                            <Link to="/pengajuan-tte" onClick={closeMenu} className="block text-white py-2">Formulir TTE</Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Fragment>
                );
              })
            }

            {/* Link Manual untuk Daftar Komitmen di Mobile */}
            <Link 
              to="/daftar-publik" 
              onClick={closeMenu} 
              className="block text-white text-lg font-semibold py-3 border-t border-white/20"
            >
              Daftar Komitmen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}