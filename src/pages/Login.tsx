import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div 
        className="bg-surface p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl font-bold text-white mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Melodify
        </motion.h1>
        
        <motion.button
          onClick={login}
          className="bg-[#1DB954] text-white py-3 px-6 rounded-full font-medium hover:bg-[#1ed760] transition-colors w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Login with Spotify
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;