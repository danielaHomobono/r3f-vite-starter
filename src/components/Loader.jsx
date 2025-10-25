import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === "Loading...") return "Loading";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        {/* Logo/Avatar Animation */}
        <motion.div
          className="mb-8 mx-auto w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-500"
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            D
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-2xl md:text-6xl font-bold text-white mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Daniela Homobono
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Developer Portfolio
        </motion.p>

        {/* Loading Text */}
        <motion.p
          className="text-lg text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {loadingText}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="bg-gray-700 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-gray-300 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};