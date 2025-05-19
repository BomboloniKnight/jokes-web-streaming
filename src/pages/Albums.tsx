import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import { sampleAlbums } from '../assets/sampleData';
import { Album } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Albums = () => {
  // State untuk menandai apakah data album sedang dimuat
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menyimpan data album yang sudah dimuat
  const [albums, setAlbums] = useState<Album[]>([]);

  // useEffect untuk simulasi fetch data album
  useEffect(() => {
    // Timer simulasi delay fetch data
    const timer = setTimeout(() => {
      setAlbums(sampleAlbums); // Mengisi state album dengan data sample
      setIsLoading(false);      // Menandai loading selesai
    }, 800);

    // Bersihkan timer jika komponen unmount sebelum timer selesai
    return () => clearTimeout(timer);
  }, []);

  // Variants untuk animasi container album
  const containerVariants = {
    hidden: { opacity: 0 },    // state tersembunyi
    visible: {                // state terlihat dengan transisi anak
      opacity: 1,
      transition: {
        when: "beforeChildren", // animasi container duluan sebelum anak-anaknya
        staggerChildren: 0.1    // jeda animasi antar anak
      }
    }
  };

  // Jika sedang loading, tampilkan spinner loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      className="py-6 px-4"
      initial={{ opacity: 0 }}   // animasi muncul (fade-in)
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Judul halaman dengan animasi turun (slide down + fade in) */}
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Albums
      </motion.h1>
      
      {/* Grid album dengan animasi stagger */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants} // apply variants animasi container
        initial="hidden"              // status awal
        animate="visible"             // status animasi selanjutnya
      >
        {/* Render album dalam bentuk Card */}
        {albums.map(album => (
          <Card key={album.id} item={album} type="album" />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Albums;
