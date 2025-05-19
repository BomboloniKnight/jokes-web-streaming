import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { sampleSongs } from '../../assets/sampleData';
import { Song } from '../../types';

const Dashboard = () => {
  // Ambil data user dari context autentikasi
  const { user } = useAuth();
  // Hook untuk navigasi halaman
  const navigate = useNavigate();
  
  // State untuk daftar lagu yang dikelola
  const [songs, setSongs] = useState<Song[]>([]);
  // State input form judul lagu
  const [title, setTitle] = useState('');
  // State input form nama artist
  const [artist, setArtist] = useState('');
  // Status saat proses upload berjalan
  const [isUploading, setIsUploading] = useState(false);
  // Pesan sukses setelah upload lagu berhasil
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Jika user bukan admin, redirect ke halaman login admin
    if (!user?.isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    // Set lagu awal dari sample data
    setSongs(sampleSongs);
  }, [user, navigate]);

  // Fungsi saat submit form upload lagu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulasi proses upload dengan delay 1.5 detik
    setTimeout(() => {
      // Buat objek lagu baru dengan data dari form dan URL placeholder
      const newSong: Song = {
        id: Date.now().toString(), // ID unik berdasarkan timestamp
        title,
        artist,
        audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3', // URL audio dummy
        imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=600', // Gambar dummy
        duration: 180, // Durasi lagu dalam detik (dummy)
      };
      
      // Tambah lagu baru ke daftar lagu
      setSongs([...songs, newSong]);
      // Reset input form
      setTitle('');
      setArtist('');
      setIsUploading(false);
      setSuccessMessage('Song uploaded successfully!');

      // Hilangkan pesan sukses setelah 3 detik
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };

  // Fungsi hapus lagu berdasarkan id
  const handleDelete = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  return (
    <div className="py-6 px-4">
      {/* Judul halaman dengan animasi */}
      <motion.h1 
        className="text-2xl font-bold text-white mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bagian form upload lagu */}
        <motion.div 
          className="bg-surface p-6 rounded-lg"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Upload New Song</h2>
          
          {/* Pesan sukses upload */}
          {successMessage && (
            <motion.div 
              className="bg-success/10 border border-success/20 text-success p-3 rounded mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </motion.div>
          )}
          
          {/* Form upload lagu */}
          <form onSubmit={handleSubmit}>
            {/* Input judul lagu */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-accent mb-2">
                Song Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-background text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            {/* Input artist */}
            <div className="mb-4">
              <label htmlFor="artist" className="block text-accent mb-2">
                Artist
              </label>
              <input
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-background text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            {/* Input file audio (hanya dummy, tidak benar-benar upload) */}
            <div className="mb-6">
              <label htmlFor="audioFile" className="block text-accent mb-2">
                Audio File (MP3)
              </label>
              <input
                type="file"
                id="audioFile"
                accept="audio/mp3"
                className="w-full bg-background text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <p className="text-accent/70 text-sm mt-1">
                Note: Files are not actually uploaded in this demo
              </p>
            </div>
            
            {/* Tombol submit upload */}
            <motion.button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Song'}
            </motion.button>
          </form>
        </motion.div>
        
        {/* Bagian daftar dan manajemen lagu */}
        <motion.div 
          className="bg-surface p-6 rounded-lg"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Manage Songs</h2>
          
          {/* Jika tidak ada lagu */}
          {songs.length === 0 ? (
            <p className="text-accent">No songs available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/10">
                    <th className="text-left py-3 text-accent">Title</th>
                    <th className="text-left py-3 text-accent">Artist</th>
                    <th className="text-right py-3 text-accent">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop daftar lagu */}
                  {songs.map(song => (
                    <motion.tr 
                      key={song.id}
                      className="border-b border-accent/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="py-3 text-white">{song.title}</td>
                      <td className="py-3 text-white">{song.artist}</td>
                      <td className="py-3 text-right">
                        {/* Tombol hapus lagu */}
                        <motion.button
                          onClick={() => handleDelete(song.id)}
                          className="text-error hover:text-error/80 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
