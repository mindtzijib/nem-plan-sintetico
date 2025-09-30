import React from 'react';
import type { Data, Fase, Grado } from '../types';
import QuickFilter from './QuickFilter';


interface HomePageProps {
  data: Data | null;
  fases: Fase[];
  selectedFase: Fase | null;
  setSelectedFase: (fase: Fase) => void;
  grados: Grado[];
  selectedGrado: Grado | null;
  setSelectedGrado: (grado: Grado | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  data, 
  fases, 
  selectedFase, 
  setSelectedFase, 
  grados, 
  selectedGrado, 
  setSelectedGrado 
}) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-nem-wine to-nem-berry bg-clip-text text-transparent mb-4 tracking-tight">Bienvenido al Programa Sintético NEM</h2>
        <p className="text-xl text-nem-gray font-medium max-w-2xl mx-auto">Explora los contenidos y PDAs organizados por campos formativos de manera intuitiva y eficiente</p>
      </div>

      {/* Quick Filter Component */}
      <QuickFilter 
        data={data} 
        fases={fases}
        selectedFase={selectedFase}
        setSelectedFase={setSelectedFase}
        grados={grados}
        selectedGrado={selectedGrado}
        setSelectedGrado={setSelectedGrado}
      />


    </div>
  );
};

export default HomePage;