import { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '../types';

// Definisikan tipe context untuk player musik
interface PlayerContextType {
  currentSong: Song | null;     // Lagu yang sedang diputar
  isPlaying: boolean;           // Status apakah lagu sedang diputar atau tidak
  queue: Song[];                // Antrian lagu berikutnya
  volume: number;               // Volume saat ini (0 - 1)
  playSong: (song: Song) => void;    // Fungsi untuk memulai lagu
  pauseSong: () => void;               // Fungsi untuk menjeda lagu
  nextSong: () => void;                // Fungsi untuk memutar lagu berikutnya di antrian
  previousSong: () => void;            // Fungsi untuk lagu sebelumnya (sederhana di sini)
  addToQueue: (song: Song) => void;   // Fungsi untuk menambah lagu ke antrian
  setVolume: (volume: number) => void;// Fungsi untuk mengubah volume
}

// Buat context player, defaultnya undefined
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  // State menyimpan lagu sekarang, status play, antrian lagu, dan volume
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [volume, setVolume] = useState(0.8);

  // Mulai putar lagu dan set lagu sekarang
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Pause lagu saat ini
  const pauseSong = () => {
    setIsPlaying(false);
  };

  // Putar lagu berikutnya di antrian, jika antrian kosong maka stop
  const nextSong = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];          // Ambil lagu pertama antrian
      const newQueue = queue.slice(1);    // Buat antrian baru tanpa lagu pertama
      setCurrentSong(nextSong);
      setQueue(newQueue);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Fungsi untuk previousSong, di sini cuma resume play jika ada lagu sekarang
  const previousSong = () => {
    if (currentSong) {
      setIsPlaying(true);
    }
  };

  // Tambah lagu ke antrian
  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  // Berikan nilai context untuk semua state dan fungsi
  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        queue,
        volume,
        playSong,
        pauseSong,
        nextSong,
        previousSong,
        addToQueue,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Hook custom untuk mengambil context player dengan pengecekan jika tidak dalam provider
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
