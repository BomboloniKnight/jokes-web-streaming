// Import animasi dari framer-motion untuk membuat animasi putar
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    // Container flex untuk men-center spinner baik horizontal dan vertikal
    <div className="flex items-center justify-center h-full">
      {/* 
        Elemen lingkaran yang diberi border atas dengan warna primary,
        lalu diberi animasi putar 360 derajat secara terus-menerus (infinite).
      */}
      <motion.div
        className="w-12 h-12 border-t-2 border-primary rounded-full"
        animate={{ rotate: 360 }}                   // Animasi putar penuh 360 derajat
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}  // Durasi 1 detik, ulang terus, putaran lancar
      />
    </div>
  );
};

export default LoadingSpinner;
