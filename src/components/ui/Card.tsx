// Import animasi dari framer-motion dan ikon Play dari lucide-react
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

// Import tipe data Album, Playlist, dan Song dari folder types
import { Album, Playlist } from '../../types';

// Import hook usePlayer dari context untuk mengakses fungsi pemutar musik
import { usePlayer } from '../../context/PlayerContext';

// Import useNavigate dari react-router untuk navigasi halaman
import { useNavigate } from 'react-router-dom';

// Definisikan props untuk komponen Card, bisa berupa Album atau Playlist
interface CardProps {
  item: Album | Playlist;         // Data yang akan ditampilkan
  type: 'album' | 'playlist';     // Jenis data (untuk menampilkan artist jika tipe album)
  onClick?: () => void;
}

const Card = ({ item, type }: CardProps) => {
  const { playSong } = usePlayer();         // Fungsi untuk memutar lagu
  const navigate = useNavigate();           // Hook navigasi

  // Fungsi untuk memainkan lagu pertama dari album/playlist jika ada
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Supaya tidak trigger navigasi saat klik tombol
    if (item.songs.length > 0) {
      playSong(item.songs[0]);
    }
  };

  // Fungsi navigasi ke halaman detail playlist jika tipe-nya playlist
  const handleClickCard = () => {
    if (type === 'playlist') {
      navigate(`/playlists/${item.id}`);
    }
    // (opsional) kalau nanti kamu bikin halaman album: navigate(`/albums/${item.id}`);
  };

  return (
    <motion.div 
      className="relative group bg-surface p-4 rounded-md hover:bg-surface/80 transition-colors cursor-pointer"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClickCard} // Navigasi saat klik card
    >
      {/* Gambar cover */}
      <div className="relative mb-4 aspect-square rounded-md overflow-hidden bg-secondary">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />

        {/* Tombol Play */}
        <motion.button
          className="absolute right-2 bottom-2 bg-primary rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
        >
          <Play className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Judul dan info */}
      <h3 className="font-semibold text-white truncate">{item.title}</h3>

      {type === 'album' && (
        <p className="text-accent text-sm mt-1 truncate">
          {(item as Album).artist}
        </p>
      )}

      <p className="text-accent text-sm mt-1">
        {item.songs.length} {item.songs.length === 1 ? 'song' : 'songs'}
      </p>
    </motion.div>
  );
};

export default Card;
