// Import React hooks dan library tambahan yang dibutuhkan
import { useState } from 'react';
import { motion } from 'framer-motion'; // untuk animasi elemen header
import { Search, User } from 'lucide-react'; // ikon untuk UI
import { Link } from 'react-router-dom'; // navigasi ke halaman lain
import { useAuth } from '../../context/AuthContext'; // akses data user login

// Mendefinisikan props yang diterima komponen Header
interface HeaderProps {
  onSearch: (query: string) => void; // fungsi pencarian dari parent
}

// Komponen utama Header
const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState(''); // state untuk menyimpan input pencarian
  const { user } = useAuth(); // mengambil data user dari context

  // Fungsi yang dipanggil saat form pencarian disubmit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery); // memanggil fungsi pencarian dari parent
  };

  return (
    // Header dengan animasi saat muncul (dari framer-motion)
    <motion.header 
      className="bg-background/70 backdrop-blur-lg sticky top-0 z-40 px-4 md:px-6 py-3 flex justify-between items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Form pencarian dengan input dan ikon search */}
      <form 
        onSubmit={handleSearch}
        className="relative max-w-md w-full"
      >
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface text-accent pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-accent/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent/50" />
      </form>
      
      {/* Bagian kanan header: info user atau tombol login */}
      <div className="flex items-center gap-4">
        {user ? (
          // Jika user sudah login, tampilkan nama dan ikon user
          <div className="flex items-center gap-2">
            <span className="text-accent hidden md:inline">{user.name}</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
          </div>
        ) : (
          // Jika belum login, tampilkan tombol Admin Login
          <Link
            to="/admin/login"
            className="text-accent hover:text-white transition-colors"
          >
            Admin Login
          </Link>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
