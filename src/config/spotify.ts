import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// Replace these with your Spotify application credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'https://localhost:5173/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming'
];

export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);