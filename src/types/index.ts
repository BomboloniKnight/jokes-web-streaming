// Interface untuk objek lagu (Song)
export interface Song {
  id: string;        // ID unik lagu
  title: string;     // Judul lagu
  artist: string;    // Nama artis atau penyanyi
  audioUrl: string;  // URL file audio lagu
  imageUrl: string;  // URL gambar cover lagu atau album
  duration: number;  // Durasi lagu dalam detik
}

// Interface untuk objek album
export interface Album {
  id: string;         // ID unik album
  title: string;      // Judul album
  artist: string;     // Nama artis album
  imageUrl: string;   // URL gambar cover album
  songs: Song[];      // Array lagu yang ada dalam album
}

// Interface untuk objek playlist
export interface Playlist {
  id: string;         // ID unik playlist
  title: string;      // Judul playlist
  imageUrl: string;   // URL gambar cover playlist
  songs: Song[];      // Array lagu yang ada dalam playlist
}

// Interface untuk objek user (pengguna)
export interface User {
  id: string;       // ID unik user
  name: string;     // Nama user
  isAdmin: boolean; // Status apakah user admin atau bukan
}
