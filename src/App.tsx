import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MusicPlayer from './components/player/MusicPlayer';
import Home from './pages/Home';
import Albums from './pages/Albums';
import Playlists from './pages/Playlists';
import PlaylistDetail from './pages/PlaylistDetail';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

const AppRoutes = () => {
  // Ambil user dari context auth untuk cek status login & admin
  const { user } = useAuth();
  
  // Komponen proteksi route: hanya bisa diakses jika user admin
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    return user?.isAdmin ? children : <Navigate to="/admin/login" />;
  };
  
  return (
    <Routes>
      {/* Route publik */}
      <Route path="/" element={<Home />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/playlists/:id" element={<PlaylistDetail />} />
      {/* Route login admin */}
      <Route path="/admin/login" element={<Login />} />
      {/* Route dashboard admin yang dilindungi */}
      <Route 
        path="/admin" 
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } 
      />
    </Routes>
  );
};

const MainLayout = () => {
  // State untuk cek apakah device mobile berdasar lebar window
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // State untuk menyimpan query pencarian dari Header
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cek apakah halaman saat ini adalah halaman login admin
  const isLoginPage = window.location.pathname === '/admin/login';
  
  useEffect(() => {
    // Handler untuk resize window, update isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fungsi handle ketika search dari Header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Bisa digunakan untuk filter data sesuai query
    console.log('Searching for:', query);
  };
  
  // Jika halaman login, tidak tampilkan Sidebar dan Header,
  // langsung render AppRoutes saja
  if (isLoginPage) {
    return <AppRoutes />;
  }
  
  // Layout utama aplikasi
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar yang responsif berdasar isMobile */}
      <Sidebar isMobile={isMobile} />
      
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Header dengan search bar */}
        <Header onSearch={handleSearch} />
        
        {/* AnimatePresence dari framer-motion untuk animasi pergantian halaman */}
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname} // kunci animasi berdasarkan path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[calc(100vh-64px)]" // tinggi minimal sesuai viewport - header
          >
            {/* Semua route aplikasi */}
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
        
        {/* Komponen MusicPlayer selalu tampil di bawah konten */}
        <MusicPlayer />
      </main>
    </div>
  );
};

function App() {
  return (
    // Router pembungkus aplikasi
    <Router>
      {/* Provider untuk auth */}
      <AuthProvider>
        {/* Provider untuk player state */}
        <PlayerProvider>
          {/* Layout utama */}
          <MainLayout />
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
