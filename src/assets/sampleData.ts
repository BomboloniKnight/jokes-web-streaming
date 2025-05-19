import { Album, Playlist, Song } from '../types';

// Sample song
export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Dreamscape',
    artist: 'Echo Waves',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3',
    imageUrl: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 232,
  },
];

// Sample albums
export const sampleAlbums: Album[] = [
  {
    id: '1',
    title: 'Ethereal Journey',
    artist: 'Echo Waves',
    imageUrl: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [sampleSongs[0]],
  },
  {
    id: '2',
    title: 'Midnight Tales',
    artist: 'Luna Dreams',
    imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [],
  },
  {
    id: '3',
    title: 'Urban Echoes',
    artist: 'City Pulse',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [],
  },
  {
    id: '4',
    title: 'Oceanic Rhythms',
    artist: 'Wave Collective',
    imageUrl: 'https://images.pexels.com/photos/1294671/pexels-photo-1294671.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [],
  },
];

// Sample playlists
export const samplePlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Chill Vibes',
    imageUrl: 'https://images.pexels.com/photos/316891/pexels-photo-316891.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [sampleSongs[0]],
  },
  {
    id: '2',
    title: 'Focus Zone',
    imageUrl: 'https://images.pexels.com/photos/8300330/pexels-photo-8300330.jpeg?auto=compress&cs=tinysrgb&w=600',
    songs: [],
  },
];