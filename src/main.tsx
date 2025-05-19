import { StrictMode } from 'react';
// createRoot dari React 18 untuk mounting aplikasi React ke DOM
import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Komponen utama aplikasi
import './index.css'; // Import file CSS global

// Ambil elemen DOM dengan id 'root' sebagai container aplikasi
// Tanda `!` berarti kita yakin elemen itu pasti ada (non-null assertion)
const rootElement = document.getElementById('root')!;

// Buat root React modern dengan createRoot (React 18+)
const root = createRoot(rootElement);

// Render aplikasi React di dalam StrictMode (untuk cek potensi masalah dan praktik terbaik React)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
