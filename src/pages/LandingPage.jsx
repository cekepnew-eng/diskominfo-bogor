import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    const [time, setTime] = useState('00:00:00');
    const [date, setDate] = useState('Memuat...');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        // Clock effect
        const updateDateTime = () => {
            const now = new Date();
            
            const timeStr = now.toLocaleTimeString('id-ID', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            }).replace(/\./g, ':');
            setTime(timeStr);
            
            const dateStr = now.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            setDate(dateStr);
        };

        const timer = setInterval(updateDateTime, 1000);
        updateDateTime();

        // Modal effect
        const initialModal = setTimeout(() => {
            setShowModal1(true);
        }, 10);

        // Phosphor Icons script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@phosphor-icons/web';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            clearInterval(timer);
            clearTimeout(initialModal);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const closeModal = (step) => {
        if (step === 1) {
            setShowModal1(false);
            setTimeout(() => {
                setShowModal2(true);
            }, 300);
        } else if (step === 2) {
            setShowModal2(false);
        }
    };

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            
            <style>{`
                /* ═══════════ DESIGN TOKENS (LIGHT THEME) ═══════════ */
                :root {
                    --bg-color: #f8fafc;
                    --surface-color: #ffffff;
                    --surface-hover: #ffffff;
                    --border-color: #e2e8f0;
                    --border-highlight: #cbd5e1;
                    --text-main: #0f172a;
                    --text-muted: #64748b;
                    
                    /* Accent Colors */
                    --accent-blue: #2563eb;
                    --accent-blue-light: #eff6ff;
                    --accent-emerald: #059669;
                    --accent-emerald-light: #ecfdf5;
                    --accent-purple: #7c3aed;
                    --accent-purple-light: #f5f3ff;
                    --accent-amber: #d97706;
                    --accent-amber-light: #fffbeb;
                    --accent-rose: #e11d48;
                    --accent-rose-light: #fff1f2;
                }
                
                .landing-wrapper {
                    font-family: 'Inter', -apple-system, sans-serif;
                    background-color: var(--bg-color);
                    color: var(--text-main);
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    -webkit-font-smoothing: antialiased;
                    position: relative;
                    z-index: 1;
                }

                /* ═══════════ BACKGROUND ═══════════ */
                .ambient-bg {
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    z-index: -1;
                    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e0f2fe 100%);
                }

                /* ═══════════ NAVIGATION ═══════════ */
                .landing-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 2rem;
                    border-bottom: 1px solid var(--border-color);
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .brand img {
                    height: 36px;
                }

                .brand-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .brand-info h1 {
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.01em;
                    color: var(--text-main);
                }

                .brand-info span {
                    font-size: 0.7rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    font-weight: 600;
                    margin-top: 2px;
                }

                .sys-status {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .status-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 0.75rem;
                    background: #f8fafc;
                    border: 1px solid var(--border-color);
                    border-radius: 999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: var(--text-main);
                    transition: all 0.2s;
                    font-variant-numeric: tabular-nums;
                }
                
                .status-pill i {
                    font-size: 1rem;
                    color: var(--text-muted);
                }

                .status-pill.primary {
                    background: var(--accent-blue);
                    color: #ffffff;
                    border-color: var(--accent-blue);
                    text-decoration: none;
                    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
                }
                
                .status-pill.primary i {
                    color: #ffffff;
                }
                
                .status-pill.primary:hover {
                    background: #1d4ed8;
                    border-color: #1d4ed8;
                    box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
                }

                /* ═══════════ HERO SECTION ═══════════ */
                .hero {
                    padding: 2rem 2rem 1rem;
                    max-width: 1400px;
                    margin: 0 auto;
                    width: 100%;
                    box-sizing: border-box;
                    flex-shrink: 0;
                }

                .hero h2 {
                    font-size: 2.2rem;
                    font-weight: 300;
                    margin: 0 0 0.5rem 0;
                    letter-spacing: -0.04em;
                    color: var(--text-main);
                }
                
                .hero h2 strong {
                    font-weight: 700;
                    color: var(--accent-blue);
                }

                .hero p {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    margin: 0;
                    max-width: 600px;
                    line-height: 1.5;
                }

                /* ═══════════ BENTO GRID CARDS ═══════════ */
                .grid-container {
                    padding: 0 2rem;
                    max-width: 1400px;
                    margin: 1.5rem auto auto; /* Move cards slightly up and push footer to bottom */
                    width: 100%;
                    box-sizing: border-box;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 1.25rem;
                    overflow-y: auto;
                    scrollbar-width: none; /* Firefox */
                }
                .grid-container::-webkit-scrollbar {
                    display: none; /* Safari and Chrome */
                }

                .bento-card {
                    position: relative;
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 0.95rem;
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    color: var(--text-main);
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px -2px rgba(0,0,0,0.05);
                }

                .bento-card:hover {
                    background: var(--surface-hover);
                    border-color: var(--border-highlight);
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.75rem;
                    position: relative;
                    z-index: 2;
                }

                .icon-wrapper {
                    width: 42px; height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }

                .bento-card:hover .icon-wrapper {
                    transform: scale(1.05);
                }

                .icon-wrapper i {
                    font-size: 1.35rem;
                }

                .card-action {
                    width: 28px; height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    color: var(--text-muted);
                    border: 1px solid transparent;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    text-decoration: none;
                }

                .bento-card:hover .card-action {
                    background: var(--text-main);
                    color: #fff;
                }

                .card-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .card-title {
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin: 0 0 0.35rem 0;
                    letter-spacing: -0.01em;
                    color: var(--text-main);
                }

                .card-desc {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    line-height: 1.35;
                    margin: 0 0 0.5rem 0;
                }

                /* ═══════════ SUB-LIST (MENUS) ═══════════ */
                .op-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    margin: 0;
                    flex-grow: 1;
                }

                .op-item {
                    font-size: 0.7rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.4rem 0.5rem;
                    border-radius: 8px;
                    background: transparent;
                    transition: all 0.2s;
                    color: var(--text-muted);
                    font-weight: 500;
                    text-decoration: none;
                }

                .op-item i {
                    color: var(--text-muted);
                    font-size: 1rem;
                    transition: color 0.2s;
                }

                .bento-card:hover .op-item {
                    background: #f8fafc;
                }

                /* Hovering the list item dynamically uses the card's accent color via CSS vars */
                .op-item:hover {
                    color: var(--card-accent);
                    background: var(--card-accent-light) !important;
                    transform: translateX(4px);
                }
                
                .op-item:hover i {
                    color: var(--card-accent);
                }

                /* ═══════════ RESPONSIVE ═══════════ */
                @media (max-width: 1200px) {
                    .grid-container { grid-template-columns: repeat(3, 1fr); }
                    .hero { padding: 3rem 3rem 2rem; }
                }

                @media (max-width: 900px) {
                    .grid-container { grid-template-columns: repeat(2, 1fr); padding: 0 2rem 4rem; }
                    .hero { padding: 2rem 2rem 1.5rem; }
                    .landing-nav { padding: 1rem 2rem; flex-wrap: wrap; }
                    .sys-status { margin-top: 1rem; width: 100%; justify-content: space-between; }
                }
                
                @media (max-width: 600px) {
                    .grid-container { grid-template-columns: 1fr; }
                    .sys-status { flex-wrap: wrap; }
                    .status-pill { flex: 1 1 auto; justify-content: center; }
                }

                /* ═══════════ ANIMATIONS ═══════════ */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }

                .animate-up {
                    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                
                .d-1 { animation-delay: 0.05s; }
                .d-2 { animation-delay: 0.1s; }
                .d-3 { animation-delay: 0.15s; }
                .d-4 { animation-delay: 0.2s; }
                .d-5 { animation-delay: 0.25s; }

                /* ═══════════ MODAL ═══════════ */
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(5px);
                    z-index: 100;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                .modal-overlay.show {
                    opacity: 1;
                    pointer-events: auto;
                }
                .modal-content {
                    position: relative;
                    background: transparent;
                    padding: 0;
                    border-radius: 12px;
                    max-width: 90vw;
                    max-height: 90vh;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    transform: scale(0.9);
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .modal-overlay.show .modal-content {
                    transform: scale(1);
                }
                .modal-close {
                    position: absolute;
                    top: -15px; right: -15px;
                    background: var(--text-main);
                    color: white;
                    border: none;
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: calc(90vh - 20px);
                    border-radius: 8px;
                    display: block;
                }
                
                /* ═══════════ FOOTER ═══════════ */
                .landing-footer {
                    text-align: center;
                    padding: 0.85rem;
                    font-size: 0.85rem;
                    color: #f1f5f9;
                    background: #0f172a;
                    margin-top: 0;
                }
            `}</style>

            <div className="landing-wrapper">
                <div className="ambient-bg"></div>

                <nav className="landing-nav">
                    <div className="brand">
                        <img src="/LOGO BIRU.webp" alt="Bogor Logo" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="brand-info">
                            <h1>Portal Layanan Diskominfo</h1>
                            <span>Pemerintah Kota Bogor</span>
                        </div>
                    </div>
                    
                    <div className="sys-status">
                        <div className="status-pill">
                            <i className="ph ph-clock"></i>
                            <span id="clock">{time}</span>
                        </div>
                        <div className="status-pill">
                            <i className="ph ph-calendar-blank"></i>
                            <span id="date">{date}</span>
                        </div>
                        <div className="status-pill">
                            <i className="ph ph-cloud-sun"></i>
                            <span>28°C Cerah</span>
                        </div>
                    </div>
                </nav>

                <header className="hero animate-up">
                    <h2><strong>Portal Layanan</strong> Diskominfo</h2>
                    <p>Akses cepat ke dashboard, data statistik, peta digital, command center, CCTV, call center, serta berbagai aplikasi dan layanan publik Pemerintah Kota Bogor melalui satu portal yang terintegrasi.</p>
                </header>

                <main className="grid-container">
                    
                    {/* Card 1 */}
                    <div className="bento-card animate-up d-1" style={{ '--card-accent': 'var(--accent-blue)', '--card-accent-light': 'var(--accent-blue-light)' }}>
                        <div className="card-header">
                            <div className="icon-wrapper" style={{ backgroundColor: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
                                <i className="ph-fill ph-globe"></i>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Portal & Informasi</h3>
                            <p className="card-desc">Menyediakan akses ke portal resmi Pemerintah Kota Bogor dan media informasi publik yang dikelola oleh Diskominfo.</p>
                            <div className="op-list">
                                <a href="https://kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-globe-hemisphere-west"></i> Website Kota Bogor <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://kominfo.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-info"></i> Website Diskominfo <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://ppid.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-folder-open"></i> PPID <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bento-card animate-up d-2" style={{ '--card-accent': 'var(--accent-emerald)', '--card-accent-light': 'var(--accent-emerald-light)' }}>
                        <div className="card-header">
                            <div className="icon-wrapper" style={{ backgroundColor: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)' }}>
                                <i className="ph-fill ph-headset"></i>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Layanan & Pengaduan</h3>
                            <p className="card-desc">Memfasilitasi masyarakat dalam mengakses layanan publik serta menyampaikan pengaduan, aspirasi, dan masukan kepada Pemerintah Kota Bogor.</p>
                            <div className="op-list">
                                <a href="https://bsw.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-app-window"></i> Bogor Single Window (BSW) <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://sibadra.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-chat-circle-dots"></i> SIBADRA <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bento-card animate-up d-3" style={{ '--card-accent': 'var(--accent-purple)', '--card-accent-light': 'var(--accent-purple-light)' }}>
                        <div className="card-header">
                            <div className="icon-wrapper" style={{ backgroundColor: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}>
                                <i className="ph-fill ph-chart-pie-slice"></i>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Data & Statistik</h3>
                            <p className="card-desc">Menyediakan data sektoral, statistik, dan informasi pembangunan sebagai dasar pengambilan keputusan serta keterbukaan data pemerintah.</p>
                            <div className="op-list">
                                <a href="https://data.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-database"></i> Portal Data Kota Bogor <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bento-card animate-up d-4" style={{ '--card-accent': 'var(--accent-amber)', '--card-accent-light': 'var(--accent-amber-light)' }}>
                        <div className="card-header">
                            <div className="icon-wrapper" style={{ backgroundColor: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}>
                                <i className="ph-fill ph-buildings"></i>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Aplikasi Internal</h3>
                            <p className="card-desc">Mendukung pelaksanaan administrasi, tata kelola, dan operasional internal Pemerintah Kota Bogor agar lebih efektif dan efisien.</p>
                            <div className="op-list">
                                <a href="https://tnd.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-file-text"></i> TNDE <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://presensimetting.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-users"></i> Presensi Meeting <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://digitaloffice.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-briefcase"></i> TPTK <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="bento-card animate-up d-5" style={{ '--card-accent': 'var(--accent-rose)', '--card-accent-light': 'var(--accent-rose-light)' }}>
                        <div className="card-header">
                            <div className="icon-wrapper" style={{ backgroundColor: 'var(--accent-rose-light)', color: 'var(--accent-rose)' }}>
                                <i className="ph-fill ph-cpu"></i>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Platform Digital</h3>
                            <p className="card-desc">Menyediakan platform pendukung transformasi digital, inovasi, serta layanan dasar yang mendukung ekosistem aplikasi Pemerintah Kota Bogor.</p>
                            <div className="op-list">
                                <a href="https://smartcity.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-device-mobile"></i> Website Smart City <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://lab-kms.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-book-open"></i> Manajemen Pengetahuan <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                                <a href="https://sso.kotabogor.go.id/" target="_blank" rel="noopener noreferrer" className="op-item"><i className="ph-fill ph-key"></i> SSO-TP2DD <i className="ph ph-arrow-up-right" style={{ marginLeft: 'auto' }}></i></a>
                            </div>
                        </div>
                    </div>

                </main>

                <footer className="landing-footer">
                    &copy; 2026 Diskominfo Kota Bogor
                </footer>
            </div>

            {/* Modal 1 */}
            <div className={`modal-overlay ${showModal1 ? 'show' : ''}`} id="welcomeModal1" onClick={() => closeModal(1)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={() => closeModal(1)}>
                        <i className="ph ph-x"></i>
                    </button>
                    <img src="/modal1.png" alt="Maklumat Diskominfo" style={{ borderRadius: '12px', objectFit: 'contain', maxHeight: '90vh', maxWidth: '90vw' }} />
                </div>
            </div>

            {/* Modal 2 */}
            <div className={`modal-overlay ${showModal2 ? 'show' : ''}`} id="welcomeModal2" onClick={() => closeModal(2)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={() => closeModal(2)}>
                        <i className="ph ph-x"></i>
                    </button>
                    <img src="/modal2.png" alt="Survei Kepuasan Masyarakat" style={{ borderRadius: '12px', objectFit: 'contain', maxHeight: '90vh', maxWidth: '90vw' }} />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
