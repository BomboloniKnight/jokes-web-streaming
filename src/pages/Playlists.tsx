import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi antar halaman
import Card from '../components/ui/Card';
import { samplePlaylists } from '../assets/sampleData';
import { Playlist } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Playlists = () => {
  const [isLoading, setIsLoading] = useState(true); // State loading
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // State data playlist

  const navigate = useNavigate(); // Hook untuk navigasi antar halaman

  // Simulasi pengambilan data playlist
  useEffect(() => {
    const timer = setTimeout(() => {
      setPlaylists(samplePlaylists); // Isi state dengan data sample
      setIsLoading(false);           // Matikan status loading
    }, 800);

    return () => clearTimeout(timer); // Bersihkan timer saat unmount
  }, []);

  // Variants animasi untuk grid container playlist
  const containerVariants = {
    hidden: { opacity: 0 }, // Awal tersembunyi
    visible: {
      opacity: 1,           // Setelah muncul
      transition: {
        when: "beforeChildren", // Tunggu container muncul dulu
        staggerChildren: 0.1    // Jeda antar anak
      }
    }
  };

  // Jika loading, tampilkan spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      className="py-6 px-4"
      initial={{ opacity: 0 }}       // Fade in halaman
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Judul halaman */}
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ y: -20, opacity: 0 }}  // Slide dari atas + fade
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Playlists
      </motion.h1>

      {/* Grid daftar playlist */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {playlists.map(playlist => (
          <Card
            key={playlist.id}
            item={playlist}
            type="playlist"
            onClick={() => navigate(`/playlists/${playlist.id}`)} // Navigasi ke detail
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Playlists;
