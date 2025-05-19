import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { sampleAlbums, samplePlaylists } from '../assets/sampleData';
import { Album, Playlist } from '../types';

const Home = () => {
  // State untuk menandai loading data
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menyimpan data album
  const [albums, setAlbums] = useState<Album[]>([]);
  // State untuk menyimpan data playlist
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    // Simulasi proses fetch data (menggunakan setTimeout)
    const timer = setTimeout(() => {
      setAlbums(sampleAlbums);       // Mengisi albums dengan data sample
      setPlaylists(samplePlaylists); // Mengisi playlists dengan data sample
      setIsLoading(false);           // Menandai loading selesai
    }, 1000);

    // Bersihkan timer jika komponen unmount sebelum timer selesai
    return () => clearTimeout(timer);
  }, []);

  // Variants untuk animasi container grid (fade-in dan stagger animasi anak)
  const containerVariants = {
    hidden: { opacity: 0 },     // status tersembunyi
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",   // animasi container duluan sebelum anaknya
        staggerChildren: 0.1      // jeda animasi antar item anak
      }
    }
  };

  // Tampilkan spinner loading jika data belum siap
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          className="w-12 h-12 border-t-2 border-primary rounded-full"
          animate={{ rotate: 360 }}               // animasi putar berulang
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // Setelah loading selesai, render konten utama
  return (
    <motion.div
      className="py-6 px-4"
      initial={{ opacity: 0 }}   // animasi fade-in container
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section untuk Featured Albums dengan animasi slide-up + fade-in */}
      <motion.section className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Featured Albums</h2>
        
        {/* Grid album dengan animasi stagger */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {albums.map(album => (
            <Card key={album.id} item={album} type="album" />
          ))}
        </motion.div>
      </motion.section>

      {/* Section untuk Playlists dengan animasi slide-up + fade-in (delay 0.2s) */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Playlists For You</h2>
        
        {/* Grid playlist dengan animasi stagger */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {playlists.map(playlist => (
            <Card key={playlist.id} item={playlist} type="playlist" />
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
