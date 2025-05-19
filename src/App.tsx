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
import Login from './pages/Login';
import Callback from './pages/Callback';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  // Protect routes that require authentication
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      
      {/* Protected routes */}
      <Route 
        path="/" 
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } 
      />
      <Route 
        path="/albums" 
        element={
          <RequireAuth>
            <Albums />
          </RequireAuth>
        } 
      />
      <Route 
        path="/playlists" 
        element={
          <RequireAuth>
            <Playlists />
          </RequireAuth>
        } 
      />
      <Route 
        path="/playlists/:id" 
        element={
          <RequireAuth>
            <PlaylistDetail />
          </RequireAuth>
        } 
      />
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  
  const isLoginPage = window.location.pathname === '/login';
  const isCallbackPage = window.location.pathname === '/callback';
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };
  
  // Don't show layout for login and callback pages
  if (isLoginPage || isCallbackPage || !isAuthenticated) {
    return <AppRoutes />;
  }
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isMobile={isMobile} />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[calc(100vh-64px)]"
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
        
        <MusicPlayer />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <MainLayout />
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;