import { useParams } from 'react-router-dom';   // Untuk ambil parameter URL (id playlist)
import { samplePlaylists } from '../assets/sampleData';  // Data contoh playlist
import { usePlayer } from '../context/PlayerContext';   // Context pemutar musik
import { Song } from '../types';                         // Tipe data Song

const PlaylistDetail = () => {
  // Ambil 'id' playlist dari parameter URL, misal /playlist/1 -> id = "1"
  const { id } = useParams();

  // Cari playlist yang id-nya sama dengan id dari URL
  const playlist = samplePlaylists.find((p) => p.id === id);

  // Ambil fungsi playSong dari context player untuk mainkan lagu
  const { playSong } = usePlayer();

  // Kalau playlist tidak ditemukan (id tidak valid), tampilkan pesan error sederhana
  if (!playlist) {
    return <div className="p-4">Playlist tidak ditemukan.</div>;
  }

  return (
    <div className="p-4">
      {/* Bagian header playlist: gambar cover + judul + jumlah lagu */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={playlist.imageUrl}           // Gambar cover playlist
          alt={playlist.title}              // Alt text untuk aksesibilitas
          className="w-32 h-32 object-cover rounded"  // Styling gambar
        />
        <div>
          <h1 className="text-2xl font-bold">{playlist.title}</h1>  {/* Judul playlist */}
          <p className="text-gray-500">{playlist.songs.length} lagu</p>  {/* Jumlah lagu */}
        </div>
      </div>

      {/* Daftar lagu di dalam playlist */}
      <div className="space-y-3">
        {playlist.songs.map((song: Song, index: number) => (
          <div
            key={song.id}                            // Kunci unik untuk list React
            onClick={() => playSong(song)}          // Mainkan lagu saat diklik
            className="flex items-center gap-4 p-3 bg-white rounded shadow cursor-pointer hover:bg-gray-100 transition"
          >
            <span className="w-6 text-sm text-gray-500">{index + 1}</span> {/* Nomor urut lagu */}
            <img src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded object-cover" /> {/* Cover lagu */}
            <div className="flex flex-col">
              <span className="font-medium">{song.title}</span>       {/* Judul lagu */}
              <span className="text-sm text-gray-500">{song.artist}</span> {/* Nama artis */}
            </div>
            {/* Durasi lagu, format menit:detik dengan angka depan nol jika perlu */}
            <div className="ml-auto text-sm text-gray-400">
              {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetail;
