import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, KeyRound, Network, BookOpen, Settings,
  ChevronRight, Crosshair, Eye, Move,
  AlertTriangle, Target, Ruler, Layers, Palette,
  User, Smartphone, ListChecks, Sparkles,
  CheckCircle2, ShieldAlert, Info, MessageCircle
} from 'lucide-react';

const Sections = {
  home: 'home',
  key: 'key',
  proxy: 'proxy',
  tutorial: 'tutorial',
  settings: 'settings',
  info: 'info',
};

const Tabs = {
  COMBAT: 'COMBAT',
  VISUAL: 'VISUAL',
  MOVER: 'MOVER',
};

const LOGO_URL = 'https://files.catbox.moe/gn7ek2.jpg';
const ADMIN_CHANNEL = 'https://whatsapp.com/channel/0029VbCPV4LD38CRe4mWZd3F';

const URLS = {
  getKey: '/redirect.html',
  getProxy: 'https://modsff.com/proxy',
};

const LOADING_STEPS = [
  "Menghubungkan ke server Velqerix...",
  "Memverifikasi perangkat...",
  "Membuat jalur pintas key...",
  "Mengenkripsi koneksi...",
  "Mengalokasikan slot key...",
  "Menyiapkan protokol aman...",
  "Mengaktifkan jalur pintas...",
  "Proses selesai, mengalihkan...",
];

const COUNTDOWN_STEPS = [
  "Jangan jual key, jika 1 orang saja ketahuan maka web ini akan admin matikan dan kalian akan mengambil key bakal lama kayak biasanya",
];

const INFO_SECTIONS = {
  tujuan: [
    "Mempermudah akses key bagi pengguna yang bingung, susah, dan lama.",
    "Admin TIDAK mengambil keuntungan apapun, hanya membantu.",
    "Untuk mod asli, hubungi Velqerix Owner melalui web resmi.",
  ],
  peringatan: [
    "bisa gunakan di akun utama, tetapi jangan brutal.",
    "Gunakan fitur secara bijak. Banned akun adalah tanggung jawabmu.",
    "Chams 3D dan Terbang SANGAT berisiko terkena sistem anti-cheat Garena.",
  ],
  admin: [
    "Reshare: Xeon Radeon",
    "Semua tools gratis dan hanya untuk mempermudah akses.",
    "Channel WhatsApp: https://whatsapp.com/channel/0029VbCPV4LD38CRe4mWZd3F",
  ],
};

export default function App() {
  const [activeSection, setActiveSection] = useState(Sections.home);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [countdown, setCountdown] = useState(30);
  
  const [activeTab, setActiveTab] = useState(Tabs.COMBAT);
  const [settings, setSettings] = useState({
    autoHeadshot: true,
    aimDistance: 55,
    maxDistance: 0,
    motorEsp: true,
    espBox: false,
    espLines: false,
    espNames: false,
    espDistance: false,
    espHealth: false,
    espSkeleton: true,
    espDist: 0,
    thickness: 5,
    boxThickness: 5,
    lineThickness: 5,
    skeletonThickness: 5,
    extraWidth: 0,
    fillOpacity: 0,
    lineOrigin: 0,
    translucentFill: false,
    halo: true,
    smoothing: true,
    crosshair: false,
    enemyColor: '#FF3C3C',
    allyColor: '#3CAAFF',
    flyToggle: false,
    flySpeed: 1,
    chams3d: false,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  const slider = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const handleRedirect = (url) => {
    if (url === URLS.getKey) {
      setShowLoading(true);
      setCountdown(30);
      setLoadingStep(0);
    } else {
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    if (showLoading) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setLoadingStep(1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [showLoading]);

  useEffect(() => {
    if (showLoading && loadingStep > 0) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= LOADING_STEPS.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              window.location.href = URLS.getKey;
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [showLoading, loadingStep]);

  const renderSettings = () => (
    <div className="w-full max-w-[400px] bg-[#0d1630] border border-[#2563ff]/40 rounded-2xl shadow-2xl overflow-hidden mx-auto">
      <div className="flex items-center justify-between p-4 border-b border-[#2563ff]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-black text-white">
            P1
          </div>
          <div>
            <h1 className="text-sm font-black text-white">VELQERIX PROXY</h1>
            <p className="text-[10px] text-[#8f9bbc]">FF MAX 2.131.1 · sin tocar el APK</p>
          </div>
        </div>
        <button onClick={() => setActiveSection(Sections.home)} className="text-[#8f9bbc] hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-2 p-3 bg-[#0b1226] border-b border-[#2563ff]/20">
        {Object.values(Tabs).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-black transition ${
              activeTab === tab 
                ? 'bg-[#2563ff] text-white' 
                : 'bg-transparent text-[#8f9bbc] hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="h-[500px] overflow-y-auto p-4 space-y-6">
        {activeTab === Tabs.COMBAT && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Crosshair size={14} className="text-[#00e5ff]" /> AUTO HEADSHOT
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#0b1226] border border-[#2563ff]/20 rounded-xl px-4 py-3">
                  <div>
                    <span className="text-sm font-bold">Auto Headshot</span>
                    <p className="text-[10px] text-[#8f9bbc] mt-1">Tembakan otomatis ke kepala</p>
                  </div>
                  <button
                    onClick={() => toggle('autoHeadshot')}
                    className={`w-12 h-6 rounded-full transition ${settings.autoHeadshot ? 'bg-[#34e5b0]' : 'bg-[#1a2344]'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings.autoHeadshot ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
                <p className="text-[10px] text-[#8f9bbc] px-1 leading-relaxed">
                  <span className="text-[#00e5ff]">Spanyol:</span> Sube el punto de impacto a la cabeza del enemigo que ya tienes en cargado. Cada bala que conecta hace headshot.
                  <br />
                  <span className="text-[#34e5b0]">Indonesia:</span> Menaikkan titik tembakan ke kepala musuh yang sudah kamu incar. Setiap peluru yang mengenai sasaran akan menjadi tembakan kepala.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Target size={14} className="text-[#00e5ff]" /> AJUSTES DEL AIM
              </h3>
              <div className="space-y-4 bg-[#0b1226] border border-[#2563ff]/20 rounded-xl p-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Grado del aim</span>
                    <span>{settings.aimDistance}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={settings.aimDistance}
                    onChange={(e) => slider('aimDistance', Number(e.target.value))}
                    className="w-full accent-[#00e5ff]"
                  />
                  <p className="text-[10px] text-[#8f9bbc] mt-1">Tingkat Bidik</p>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span>Distancia maxima</span>
                    <span>{settings.maxDistance} m</span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={settings.maxDistance}
                    onChange={(e) => slider('maxDistance', Number(e.target.value))}
                    className="w-full accent-[#00e5ff]"
                  />
                  <p className="text-[10px] text-[#8f9bbc] mt-1">Jarak Maksimum</p>
                </div>
                <p className="text-[10px] text-[#8f9bbc]">
                  <span className="text-[#00e5ff]">Spanyol:</span> El CONO es la zona que decide de quien se ocupa el headshot. Si el enemigo está a más de la distancia máxima, el aim assist de proyecto no funciona.
                  <br />
                  <span className="text-[#34e5b0]">Indonesia:</span> KERUCUT adalah zona yang menentukan siapa yang akan menjadi sasaran headshot. Jika musuh berada lebih jauh dari jarak maksimum, bantuan bidik proyek tidak akan berfungsi.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === Tabs.VISUAL && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Eye size={14} className="text-[#00e5ff]" /> MOTOR ESP
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-[#0b1226] border border-[#2563ff]/20 rounded-xl px-4 py-3">
                  <div>
                    <span className="text-sm font-bold">Motor ESP</span>
                    <p className="text-[10px] text-[#8f9bbc] mt-1">Mesin Pendeteksi Pemain</p>
                  </div>
                  <button
                    onClick={() => toggle('motorEsp')}
                    className={`w-12 h-6 rounded-full transition ${settings.motorEsp ? 'bg-[#34e5b0]' : 'bg-[#1a2344]'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings.motorEsp ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
                <p className="text-[10px] text-[#8f9bbc] px-1">
                  <span className="text-[#00e5ff]">Spanyol:</span> Si el motor está apagado, el parche no manda ni un dato. Cero trafico, cero trabajo dentro del juego.
                  <br />
                  <span className="text-[#34e5b0]">Indonesia:</span> Jika mesin dimatikan, patch tidak mengirim data apa pun. Nol lalu lintas, nol pekerjaan di dalam game.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Layers size={14} className="text-[#00e5ff]" /> QUE SE DIBUJA
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'ESP Box (cajas)', sub: 'Kotak ESP', key: 'espBox' },
                  { label: 'ESP Lines', sub: 'Garis ESP', key: 'espLines' },
                  { label: 'ESP Names', sub: 'Nama ESP', key: 'espNames' },
                  { label: 'ESP Distance', sub: 'Jarak ESP', key: 'espDistance' },
                  { label: 'ESP Health', sub: 'Kesehatan ESP', key: 'espHealth' },
                  { label: 'ESP Skeleton', sub: 'Kerangka ESP', key: 'espSkeleton' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between bg-[#0b1226] border border-[#2563ff]/20 rounded-xl px-4 py-3">
                    <div>
                      <span className="text-sm font-bold">{item.label}</span>
                      <p className="text-[10px] text-[#8f9bbc] mt-1">{item.sub}</p>
                    </div>
                    <button
                      onClick={() => toggle(item.key)}
                      className={`w-12 h-6 rounded-full transition ${settings[item.key] ? 'bg-[#34e5b0]' : 'bg-[#1a2344]'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings[item.key] ? 'translate-x-6' : ''}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Ruler size={14} className="text-[#00e5ff]" /> AJUSTES DEL ESP
              </h3>
              <div className="space-y-4 bg-[#0b1226] border border-[#2563ff]/20 rounded-xl p-4">
                {[
                  { label: 'Distancia maxima', sub: 'Jarak Maksimum', key: 'espDist', suffix: ' m' },
                  { label: 'Grosor general', sub: 'Ketebalan Umum', key: 'thickness', suffix: ' (x0.1dp)' },
                  { label: 'Grosor de la caja', sub: 'Ketebalan Kotak', key: 'boxThickness', suffix: ' (x0.1dp)' },
                  { label: 'Grosor de las lineas', sub: 'Ketebalan Garis', key: 'lineThickness', suffix: ' (x0.1dp)' },
                  { label: 'Grosor del esqueleto', sub: 'Ketebalan Kerangka', key: 'skeletonThickness', suffix: ' (x0.1dp)' },
                  { label: 'Ancho extra de la caja', sub: 'Lebar Ekstra Kotak', key: 'extraWidth', suffix: ' %' },
                  { label: 'Opacidad del relleno', sub: 'Opasitas Isi', key: 'fillOpacity', suffix: ' %' },
                  { label: 'Origen de las lineas', sub: 'Asal Garis', key: 'lineOrigin', suffix: ' %' },
                ].map(item => (
                  <div key={item.key}>
                    <div className="flex justify-between text-xs mb-2">
                      <div>
                        <span>{item.label}</span>
                        <p className="text-[10px] text-[#8f9bbc]">{item.sub}</p>
                      </div>
                      <span>{settings[item.key]}{item.suffix}</span>
                    </div>
                    <input
                      type="range" min="0" max="100"
                      value={settings[item.key]}
                      onChange={(e) => slider(item.key, Number(e.target.value))}
                      className="w-full accent-[#00e5ff]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Palette size={14} className="text-[#00e5ff]" /> EXTRAS DE PANTALLA
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Relleno translucido', sub: 'Isi Transparan', key: 'translucentFill' },
                  { label: 'Halo', sub: 'Cahaya di sekitar', key: 'halo' },
                  { label: 'Suavizado de las cajas', sub: 'Penghalusan Kotak', key: 'smoothing' },
                  { label: 'Mira central', sub: 'Bidik Tengah', key: 'crosshair' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between bg-[#0b1226] border border-[#2563ff]/20 rounded-xl px-4 py-3">
                    <div>
                      <span className="text-sm font-bold">{item.label}</span>
                      <p className="text-[10px] text-[#8f9bbc] mt-1">{item.sub}</p>
                    </div>
                    <button
                      onClick={() => toggle(item.key)}
                      className={`w-12 h-6 rounded-full transition ${settings[item.key] ? 'bg-[#34e5b0]' : 'bg-[#1a2344]'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings[item.key] ? 'translate-x-6' : ''}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-xl p-4">
              <h3 className="text-xs font-black text-[#ff6b6b] flex items-center gap-2 mb-2">
                <AlertTriangle size={14} /> PERINGATAN KEAMANAN
              </h3>
              <p className="text-[10px] text-[#8f9bbc]">
                <span className="text-[#ff6b6b]">Spanyol:</span> CHAMS 3D - COLOR DEL MODELO. Esta función es extremadamente peligrosa y puede ser detectada por el servidor de Garena en cuestión de segundos, lo que resultará en un baneo permanente de tu cuenta.
                <br />
                <span className="text-[#ff6b6b]">Indonesia:</span> CHAMS 3D - WARNA MODEL. Fitur ini sangat berbahaya dan dapat dideteksi oleh server Garena dalam hitungan detik, yang akan mengakibatkan banned permanen pada akun Anda.
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-bold text-[#ff6b6b]">Chams 3D</span>
                <button
                  onClick={() => toggle('chams3d')}
                  className={`w-12 h-6 rounded-full transition ${settings.chams3d ? 'bg-[#ff6b6b]' : 'bg-[#1a2344]'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings.chams3d ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <p className="text-[10px] text-[#8f9bbc] mt-2">Disarankan untuk DIMATIKAN agar akun tetap aman.</p>
            </div>
          </div>
        )}

        {activeTab === Tabs.MOVER && (
          <div className="space-y-6">
            <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-xl p-4">
              <h3 className="text-xs font-black text-[#ff6b6b] flex items-center gap-2 mb-2">
                <AlertTriangle size={14} /> PERINGATAN KEAMANAN
              </h3>
              <p className="text-[10px] text-[#8f9bbc]">
                <span className="text-[#ff6b6b]">Spanyol:</span> VOLAR - SUBIR Y FLOTAR. Esta función es extremadamente peligrosa y puede ser detectada por el servidor de Garena en cuestión de segundos, lo que resultará en un baneo permanente de tu cuenta.
                <br />
                <span className="text-[#ff6b6b]">Indonesia:</span> TERBANG - NAIK DAN MELAYANG. Fitur ini sangat berbahaya dan dapat dideteksi oleh server Garena dalam hitungan detik, yang akan mengakibatkan banned permanen pada akun Anda.
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-bold text-[#ff6b6b]">Volar (subir)</span>
                <button
                  onClick={() => toggle('flyToggle')}
                  className={`w-12 h-6 rounded-full transition ${settings.flyToggle ? 'bg-[#ff6b6b]' : 'bg-[#1a2344]'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition ml-0.5 ${settings.flyToggle ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <p className="text-[10px] text-[#8f9bbc] mt-2">Disarankan untuk DIMATIKAN agar akun tetap aman.</p>
            </div>

            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2 mb-3">
                <Move size={14} className="text-[#00e5ff]" /> VOLAR - SUBIR Y FLOTAR
              </h3>
              <div className="space-y-4 bg-[#0b1226] border border-[#2563ff]/20 rounded-xl p-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <div>
                      <span>Subida del vuelo</span>
                      <p className="text-[10px] text-[#8f9bbc]">Kecepatan Terbang</p>
                    </div>
                    <span>{settings.flySpeed} m/s</span>
                  </div>
                  <input
                    type="range" min="0" max="10"
                    value={settings.flySpeed}
                    onChange={(e) => slider('flySpeed', Number(e.target.value))}
                    className="w-full accent-[#00e5ff]"
                  />
                </div>
                <p className="text-[10px] text-[#8f9bbc]">
                  <span className="text-[#00e5ff]">Spanyol:</span> Mientras el esté ENCENDIDO te subes cada frame a la velocidad del slider (metros por segundo). Apágalo para quedarte a la altura que quieras. El servidor del juego valida este movimiento en los frames con mas de 40 ms de retraso.
                  <br />
                  <span className="text-[#34e5b0]">Indonesia:</span> Selama fitur ini MENYALA, kamu akan naik setiap frame sesuai kecepatan slider (meter per detik). Matikan untuk tetap di ketinggian yang kamu inginkan. Server game memvalidasi gerakan ini pada frame dengan latensi lebih dari 40 ms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const sections = {
    home: (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b1226] border border-[#7c6cf0]/30 text-xs font-bold mb-4">
            <Sparkles size={14} className="text-[#7c6cf0]" /> Shortcut Resmi & Gratis
          </div>
          <img src={LOGO_URL} alt="Logo Velqerix" className="w-24 h-24 mx-auto mb-4 rounded-2xl border border-[#2563ff]/30 shadow-xl" />
          <h1 className="text-3xl font-black mb-3">Velqerix Proxy</h1>
          <p className="text-[#8f9bbc] max-w-lg mx-auto text-sm leading-relaxed">
            Solusi tercepat untuk mendapatkan key Velqerix tanpa ribet.
            Tanpa pembelian, tanpa iklan berbayar. Ditujukan untuk pengguna yang bingung, susah, dan lama.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => handleRedirect(URLS.getKey)} className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#34e5b0]/50 transition text-left">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#34e5b0]/20 transition">
              <KeyRound size={24} className="text-[#34e5b0]" />
            </div>
            <h3 className="font-black mb-1">Get Key</h3>
            <p className="text-xs text-[#8f9bbc]">Ambil key gratis untuk mengaktifkan Velqerix.</p>
            <ChevronRight size={16} className="mt-4 text-[#8f9bbc] group-hover:translate-x-1 transition" />
          </button>

          <button onClick={() => handleRedirect(URLS.getProxy)} className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#7c6cf0]/50 transition text-left">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#7c6cf0]/20 transition">
              <Network size={24} className="text-[#7c6cf0]" />
            </div>
            <h3 className="font-black mb-1">Get Proxy</h3>
            <p className="text-xs text-[#8f9bbc]">Ambil proxy gratis untuk koneksi lebih stabil.</p>
            <ChevronRight size={16} className="mt-4 text-[#8f9bbc] group-hover:translate-x-1 transition" />
          </button>

          <button onClick={() => setActiveSection(Sections.tutorial)} className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#00e5ff]/50 transition text-left">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#00e5ff]/20 transition">
              <BookOpen size={24} className="text-[#00e5ff]" />
            </div>
            <h3 className="font-black mb-1">Get Tutorial</h3>
            <p className="text-xs text-[#8f9bbc]">Panduan lengkap setup Velqerix di perangkat.</p>
            <ChevronRight size={16} className="mt-4 text-[#8f9bbc] group-hover:translate-x-1 transition" />
          </button>

          <button onClick={() => setActiveSection(Sections.settings)} className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#34e5b0]/50 transition text-left">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#34e5b0]/20 transition">
              <Settings size={24} className="text-[#34e5b0]" />
            </div>
            <h3 className="font-black mb-1">Settings</h3>
            <p className="text-xs text-[#8f9bbc]">Lihat dan atur pengaturan Velqerix.</p>
            <ChevronRight size={16} className="mt-4 text-[#8f9bbc] group-hover:translate-x-1 transition" />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert size={20} className="text-[#ff6b6b] shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-black text-[#ff6b6b] mb-1">INFO PENGGUNA</h3>
              <ol className="text-xs text-[#8f9bbc] leading-relaxed list-decimal list-inside space-y-1">
                <li>Tujuan web ini HANYA untuk mempermudah akses key bagi orang yang bingung, susah, dan lama.</li>
                <li>Admin TIDAK mengambil keuntungan apapun, hanya mempermudah proses pengambilan.</li>
                <li>Untuk mod asli, hubungi Velqerix Owner melalui web resmi yang sudah disediakan.</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    ),

    key: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2"><KeyRound size={20} className="text-[#34e5b0]" /> Get Key Gratis</h2>
          <button onClick={() => setActiveSection(Sections.home)} className="text-xs text-[#8f9bbc] hover:text-white">Kembali</button>
        </div>
        
        <div className="p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25">
          <p className="text-sm text-[#8f9bbc] mb-4">Klik tombol di bawah untuk mendapatkan key gratis 12 jam untuk Velqerix.</p>
          <button 
            onClick={() => handleRedirect(URLS.getKey)} 
            className="bg-gradient-to-r from-[#34e5b0] to-[#2563ff] text-[#050816] font-black px-6 py-4 rounded-2xl w-full hover:scale-105 transition"
          >
            BUKA HALAMAN KEY
          </button>
        </div>
      </div>
    ),

    proxy: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2"><Network size={20} className="text-[#7c6cf0]" /> Get Proxy Gratis</h2>
          <button onClick={() => setActiveSection(Sections.home)} className="text-xs text-[#8f9bbc] hover:text-white">Kembali</button>
        </div>
        
        <div className="p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25">
          <p className="text-sm text-[#8f9bbc] mb-4">Klik tombol di bawah untuk mendapatkan proxy gratis untuk koneksi yang lebih stabil.</p>
          <button 
            onClick={() => handleRedirect(URLS.getProxy)} 
            className="bg-gradient-to-r from-[#7c6cf0] to-[#00e5ff] text-[#050816] font-black px-6 py-4 rounded-2xl w-full hover:scale-105 transition"
          >
            BUKA HALAMAN PROXY
          </button>
        </div>
      </div>
    ),

    tutorial: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2"><BookOpen size={20} className="text-[#00e5ff]" /> Get Tutorial</h2>
          <button onClick={() => setActiveSection(Sections.home)} className="text-xs text-[#8f9bbc] hover:text-white">Kembali</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#00e5ff]/50 transition">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#00e5ff]/20 transition">
              <Smartphone size={24} className="text-[#00e5ff]" />
            </div>
            <h3 className="font-black mb-1">Tutor Konek USB Debugging</h3>
            <p className="text-xs text-[#8f9bbc]">Cara sambungkan APK ke debugging USB via opsi pengembang.</p>
            <div className="mt-4 space-y-2 text-xs text-[#8f9bbc]">
              <p>1. Buka Pengaturan di perangkat Anda.</p>
              <p>2. Masuk ke Tentang Ponsel.</p>
              <p>3. Ketuk Nomor Build sebanyak 7 kali hingga muncul notifikasi "Anda sekarang menjadi pengembang".</p>
              <p>4. Kembali ke pengaturan, buka Opsi Pengembang.</p>
              <p>5. Aktifkan USB Debugging dan Install via USB.</p>
              <p>6. Hubungkan perangkat dan izinkan debugging saat diminta.</p>
            </div>
          </div>

          <div className="group p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25 hover:border-[#7c6cf0]/50 transition">
            <div className="bg-[#1a2344] p-3 rounded-xl w-fit mb-4 group-hover:bg-[#7c6cf0]/20 transition">
              <ListChecks size={24} className="text-[#7c6cf0]" />
            </div>
            <h3 className="font-black mb-1">Tutor Settingan Admin di Game</h3>
            <p className="text-xs text-[#8f9bbc]">Tutor settingan admin untuk Velqerix di dalam game.</p>
            <div className="mt-4 space-y-2 text-xs text-[#8f9bbc]">
              <p>1. Buka aplikasi Velqerix dan hubungkan ke game.</p>
              <p>2. Aktifkan Menu Melayang agar panel kontrol muncul di atas game.</p>
              <p>3. Pastikan Patch sudah terpasang dan status berwarna hijau.</p>
              <p>4. Atur sensitivitas dan layout sesuai preferensi Anda melalui menu pengaturan di dalam game.</p>
              <p>5. MATIKAN fitur Terbang & Chams 3D agar akun tetap aman.</p>
            </div>
          </div>
        </div>
      </div>
    ),

    settings: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2"><Settings size={20} className="text-[#34e5b0]" /> Menu Settings</h2>
          <button onClick={() => setActiveSection(Sections.home)} className="text-xs text-[#8f9bbc] hover:text-white">Kembali</button>
        </div>
        {renderSettings()}
      </div>
    ),

    info: (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2"><Info size={20} className="text-[#00e5ff]" /> Info Lengkap</h2>
          <button onClick={() => setActiveSection(Sections.home)} className="text-xs text-[#8f9bbc] hover:text-white">Kembali</button>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b1226] border border-[#2563ff]/25">
          <h3 className="font-black mb-3 flex items-center gap-2"><Target size={18} className="text-[#34e5b0]" /> Tujuan Web Ini</h3>
          <div className="space-y-3 text-sm text-[#8f9bbc]">
            {INFO_SECTIONS.tujuan.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#34e5b0] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30">
          <h3 className="font-black mb-3 flex items-center gap-2"><ShieldAlert size={18} className="text-[#ff6b6b]" /> Peringatan Keras</h3>
          <div className="space-y-3 text-sm text-[#8f9bbc]">
            {INFO_SECTIONS.peringatan.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-[#ff6b6b] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b1226] border border-[#7c6cf0]/20">
          <h3 className="font-black mb-3 flex items-center gap-2"><User size={18} className="text-[#7c6cf0]" /> Admin & Reshare</h3>
          <div className="space-y-3 text-sm text-[#8f9bbc]">
            {INFO_SECTIONS.admin.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#7c6cf0] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <a 
            href={ADMIN_CHANNEL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-[#050816] font-black px-4 py-3 rounded-xl hover:opacity-90 transition"
          >
            <MessageCircle size={18} /> Gabung Channel WhatsApp
          </a>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showLoading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#050816] flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.img 
              src={LOGO_URL} 
              alt="Logo" 
              className="w-24 h-24 rounded-2xl border-2 border-[#00e5ff]/30 shadow-2xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {countdown > 0 ? (
              <>
                <p className="text-6xl font-black text-[#00e5ff] mb-4">{countdown}</p>
                <p className="text-2xl font-black text-white mb-6">Bersiap... Mengalihkan dalam {countdown} detik</p>
                <p className="text-xs text-[#ff6b6b] font-bold mb-6 max-w-md">
                  {COUNTDOWN_STEPS[0]}
                </p>
              </>
            ) : (
              <p className="text-2xl font-black text-white mb-4">Membuat Jalur Pintas</p>
            )}

            {countdown === 0 && (
              <div className="space-y-2 text-sm text-[#8f9bbc]">
                {LOADING_STEPS.slice(0, loadingStep + 1).map((step, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className={i === loadingStep ? "text-[#00e5ff]" : "text-[#34e5b0]"} />
                    {step}
                  </motion.p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-xl border-b border-[#2563ff]/20">
        <div className="max-w-3xl mx-auto px-4 h-[70px] flex items-center justify-between">
          <button onClick={() => setActiveSection(Sections.home)} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-[#2563ff]/30" />
            <div>
              <h1 className="text-lg font-black leading-tight">VELQERIX PROXY</h1>
              <p className="text-[10px] text-[#8f9bbc]">Free Fire MAX</p>
            </div>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg bg-[#0b1226] border border-[#2563ff]/30 text-white">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="bg-[#0b1226] border-t border-[#2563ff]/20 px-4 py-3 space-y-2">
            <button onClick={() => { setActiveSection(Sections.key); setMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold hover:bg-white/5 rounded-lg px-2 w-full"><KeyRound size={16} /> Get Key</button>
            <button onClick={() => { setActiveSection(Sections.proxy); setMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold hover:bg-white/5 rounded-lg px-2 w-full"><Network size={16} /> Get Proxy</button>
            <button onClick={() => { setActiveSection(Sections.tutorial); setMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold hover:bg-white/5 rounded-lg px-2 w-full"><BookOpen size={16} /> Get Tutorial</button>
            <button onClick={() => { setActiveSection(Sections.settings); setMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold hover:bg-white/5 rounded-lg px-2 w-full"><Settings size={16} /> Settings</button>
            <button onClick={() => { setActiveSection(Sections.info); setMenuOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold hover:bg-white/5 rounded-lg px-2 w-full"><Info size={16} /> Info</button>
          </div>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {sections[activeSection]}

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl bg-[#0b1226] border border-[#7c6cf0]/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} className="text-[#7c6cf0]" />
            <h3 className="font-black">Profile Admin (Reshare)</h3>
          </div>
          <div className="space-y-4 text-sm text-[#8f9bbc]">
            <div>
              <p className="text-[#f7f9ff] font-bold">𓉳 PROFILE_ID: 5</p>
              <p className="mt-1">STATUS: Entity_name: "『 𓅯 』𝙭𝙚𝙤𝙣 - 𝙧𝙖𝙙𝙚𝙤𝙣"</p>
            </div>
            <div>
              <p className="text-[#f7f9ff] font-bold">IDENTITY:</p>
              <p>⇢ Age: "19"</p>
              <p>⇢ Birthdate: "2006-09-08"</p>
              <p>⇢ Core_focus: "Building & Designing / Algorithmic Engineering (Full Stack)"</p>
            </div>
            <div>
              <p className="text-[#f7f9ff] font-bold">HOBBIES:</p>
              <p>⁺ System Development & Optimization</p>
              <p>⁺ Digital Art/Pixelation (Vector and Raster)</p>
              <p>⁺ Exploration & Research (New Architectures)</p>
            </div>
            <div>
              <p className="text-[#f7f9ff] font-bold">PROJECT:</p>
              <p>⟣ Status: "Active Deployment"</p>
              <p>⟣ Version: "v7.0.0 - Stable Version"</p>
              <p>⟣ Name: "Aethra-Stream"</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="text-center text-[#8f9bbc] text-xs py-6 border-t border-white/5">
        <p>Velqerix Proxy &copy; 2026 - Shortcut Resmi & Gratis</p>
        <p className="mt-1">Dilarang keras menjual APK atau Key. Jika ketahuan, IP Device akan diblokir.</p>
        <a href={ADMIN_CHANNEL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-[#25D366] hover:underline">
          <MessageCircle size={12} /> Channel WhatsApp Admin
        </a>
      </footer>
    </div>
  );
}