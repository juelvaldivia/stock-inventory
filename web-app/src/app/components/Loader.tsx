import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500"></div>
    </div>
  );
};

export default Loader;
