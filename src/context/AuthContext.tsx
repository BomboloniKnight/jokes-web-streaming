import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

// Definisikan tipe context untuk autentikasi
interface AuthContextType {
  user: User | null; // User yang login, null jika belum login
  login: (email: string, password: string) => Promise<boolean>; // Fungsi login, mengembalikan true jika berhasil
  logout: () => void; // Fungsi logout
}

// Membuat context autentikasi dengan default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credential admin (untuk demo saja, dalam aplikasi nyata harus dengan server dan keamanan lebih)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Provider yang membungkus aplikasi dan menyediakan context autentikasi
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State menyimpan user yang login (atau null jika belum login)
  const [user, setUser] = useState<User | null>(null);

  // Fungsi login mock, hanya menerima credential admin yang sudah di-hardcode
  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set user sebagai admin jika login sukses
      setUser({
        id: '1',
        name: 'Admin User',
        isAdmin: true,
      });
      return true;
    }
    // Login gagal, kembalikan false
    return false;
  };

  // Fungsi logout menghapus user dari state
  const logout = () => {
    setUser(null);
  };

  // Provider membagikan nilai user, login, dan logout ke komponen anak
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk mengambil context autentikasi dengan pengecekan penggunaan di dalam provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
