import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Cargando contenido">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-12 h-12 border-4 border-nem-wine/20 border-t-nem-wine rounded-full animate-spin"></div>
        
        {/* Spinner secundario para efecto visual */}
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-b-nem-berry rounded-full animate-spin" style={{ animationDelay: '0.15s' }}></div>
      </div>
      
      {/* Texto de carga */}
      <span className="ml-4 text-nem-wine font-medium">
        Cargando...
      </span>
      
      {/* Screen reader text */}
      <span className="sr-only">Cargando contenido de la Nueva Escuela Mexicana</span>
    </div>
  );
};

export default LoadingSpinner;