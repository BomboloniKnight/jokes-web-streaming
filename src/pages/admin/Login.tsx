import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  // State untuk menyimpan input email dan password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State untuk menyimpan pesan error jika login gagal
  const [error, setError] = useState('');
  // State untuk menandai apakah proses login sedang berlangsung
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook react-router untuk navigasi halaman
  const navigate = useNavigate();
  // Mengambil fungsi login dari context Auth
  const { login } = useAuth();

  // Fungsi yang dipanggil saat form login disubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(''); // Reset error sebelum proses login
    setIsLoading(true); // Tandai proses login sedang berjalan
    
    try {
      // Panggil fungsi login dengan email dan password
      const success = await login(email, password);
      if (success) {
        // Jika login berhasil, arahkan ke dashboard admin
        navigate('/admin');
      } else {
        // Jika login gagal, tampilkan pesan error
        setError('Invalid email or password');
      }
    } catch (err) {
      // Jika terjadi error saat proses login
      setError('An error occurred during login');
    } finally {
      // Setelah proses login selesai (sukses/gagal), set loading false
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Container utama dengan animasi dari framer-motion */}
      <motion.div 
        className="bg-surface p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Judul halaman dengan animasi */}
        <motion.h1 
          className="text-2xl font-bold text-white text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Admin Login
        </motion.h1>

        {/* Jika ada error, tampilkan pesan error dengan animasi */}
        {error && (
          <motion.div 
            className="bg-error/10 border border-error/20 text-error p-3 rounded mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form login */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-accent mb-2">
              Email
            </label>
            {/* Input email dengan binding ke state */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-accent mb-2">
              Password
            </label>
            {/* Input password dengan binding ke state */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          
          {/* Tombol submit dengan animasi dan disabled saat loading */}
          <motion.button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
          
          {/* Informasi kredensial demo untuk login */}
          <div className="mt-4 text-center text-accent text-sm">
            <p>Use the following credentials:</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
