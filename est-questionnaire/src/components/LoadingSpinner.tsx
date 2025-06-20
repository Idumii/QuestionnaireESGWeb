import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8 p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      <p className="ml-4 text-sky-600 text-lg">Génération de l'évaluation en cours...</p>
    </div>
  );
};

export default LoadingSpinner;
