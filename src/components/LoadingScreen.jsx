import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white flex-col gap-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-700 font-semibold text-lg italic">Awaiting the excitement...</p>
    </div>
  );
};

export default LoadingScreen;
