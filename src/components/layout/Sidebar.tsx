import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Disc, 
  ListMusic, 
  ChevronLeft, 
  ChevronRight, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isMobile: boolean; // menentukan apakah tampilan saat ini mobile
}

const Sidebar = ({ isMobile }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // state untuk collapse/expand sidebar
  const { user, logout } = useAuth(); // ambil data user dan fungsi logout dari context

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // fungsi untuk toggle sidebar
  };

  // Variasi animasi sidebar saat expanded dan collapsed
  const sidebarVariants = {
    expanded: { width: isMobile ? '100%' : '240px' },
    collapsed: { width: isMobile ? '0' : '72px' },
  };

  // Jika di mobile dan sidebar dalam kondisi collapsed, hanya tampilkan tombol buka sidebar
  if (isMobile && isCollapsed) {
    return (
      <motion.button
        className="fixed z-50 top-4 left-4 w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-lg"
        onClick={toggleSidebar}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </motion.button>
    );
  }

  return (
    // Sidebar utama dengan animasi framer-motion
    <motion.div
      className={`bg-surface ${isMobile ? 'fixed z-50 h-full' : 'h-screen'} transition-all duration-300 flex flex-col`}
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      initial={isMobile ? 'collapsed' : 'expanded'}
    >
      {/* Header sidebar: Logo dan tombol collapse */}
      <div className="flex justify-between items-center p-4">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white font-bold text-xl"
          >
            Melodify
          </motion.div>
        )}
        <motion.button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-secondary/20 text-white hover:bg-secondary/30 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Navigasi utama */}
      <nav className="mt-6 flex-1">
        <ul className="space-y-2 px-3">
          <NavItem to="/" icon={<Home />} label="Home" isCollapsed={isCollapsed} />
          <NavItem to="/albums" icon={<Disc />} label="Albums" isCollapsed={isCollapsed} />
          <NavItem to="/playlists" icon={<ListMusic />} label="Playlists" isCollapsed={isCollapsed} />
          
          {/* Tampilkan menu Admin jika user adalah admin */}
          {user?.isAdmin && (
            <NavItem to="/admin" icon={<Disc />} label="Admin" isCollapsed={isCollapsed} />
          )}
        </ul>
      </nav>

      {/* Tombol logout jika user sudah login */}
      {user && (
        <div className="p-4 border-t border-accent/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-accent hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Komponen navigasi tunggal (digunakan untuk tiap item menu sidebar)
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
          isActive 
            ? 'bg-primary/10 text-primary' 
            : 'text-accent hover:text-white hover:bg-secondary/20'
        }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  </li>
);

export default Sidebar;
