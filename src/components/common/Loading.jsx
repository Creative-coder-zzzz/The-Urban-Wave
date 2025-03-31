import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray text-black">
      {/* Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-gray-500 border-t-blue-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Loading Text */}
      <motion.p
        className="mt-4 text-lg font-semibold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Awaiting the excitement
      </motion.p>
    </div>
  );
}
