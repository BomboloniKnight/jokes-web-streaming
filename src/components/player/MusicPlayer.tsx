import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Volume1, 
  VolumeX 
} from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext'; // context global untuk player state

const MusicPlayer = () => {
  // Ambil state dan fungsi dari context
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    pauseSong, 
    nextSong, 
    previousSong, 
    volume, 
    setVolume 
  } = usePlayer();

  const [currentTime, setCurrentTime] = useState(0);     // waktu saat ini (dalam detik)
  const [isMuted, setIsMuted] = useState(false);         // apakah audio sedang dimute
  const [prevVolume, setPrevVolume] = useState(volume);  // simpan volume sebelum mute

  const audioRef = useRef<HTMLAudioElement>(null);       // referensi ke elemen <audio>

  // Jalankan/berhentikan lagu saat isPlaying berubah
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          pauseSong(); // jika gagal, pause
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, pauseSong]);

  // Update volume saat volume atau mute berubah
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Update currentTime saat lagu diputar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Lanjutkan ke lagu berikutnya saat lagu berakhir
  const handleEnded = () => {
    nextSong();
  };

  // Slider progress lagu
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Slider volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // Fungsi toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume === 0 ? 0.5 : prevVolume); // atur ke volume sebelumnya
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  };

  // Format waktu menjadi MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Jika tidak ada lagu yang dipilih, jangan tampilkan player
  if (!currentSong) return null;

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-surface border-t border-accent/10 px-4 py-3 flex flex-col md:flex-row items-center z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Elemen audio */}
      <audio 
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      {/* Informasi lagu */}
      <div className="flex items-center gap-3 w-full md:w-1/4 mb-3 md:mb-0">
        <div className="w-12 h-12 bg-secondary rounded overflow-hidden">
          <img 
            src={currentSong.imageUrl} 
            alt={currentSong.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
          <p className="text-accent/80 text-sm truncate">{currentSong.artist}</p>
        </div>
      </div>
      
      {/* Kontrol utama player */}
      <div className="w-full md:w-2/4 flex flex-col items-center">
        {/* Tombol play/pause dan skip */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={previousSong}
            className="text-accent hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <motion.button 
            onClick={isPlaying ? pauseSong : () => currentSong && playSong(currentSong)}
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-background"
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>
          
          <button 
            onClick={nextSong}
            className="text-accent hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        {/* Slider progress waktu lagu */}
        <div className="w-full flex items-center gap-2">
          <span className="text-accent text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-secondary rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-primary"
          />
          <span className="text-accent text-xs">
            {formatTime(audioRef.current?.duration || currentSong.duration)}
          </span>
        </div>
      </div>
      
      {/* Kontrol volume */}
      <div className="w-full md:w-1/4 flex justify-end items-center gap-2 mt-3 md:mt-0">
        <button 
          onClick={toggleMute}
          className="text-accent hover:text-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : volume > 0.5 ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <Volume1 className="w-5 h-5" />
          )}
        </button>
        
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-secondary rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-primary"
        />
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
