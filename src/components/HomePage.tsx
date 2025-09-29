import React from 'react';
import type { Data, Pda, Fase, Grado } from '../App';
import QuickFilter from './QuickFilter';
import CampoCard from './CampoCard';

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

      {/* Exploration Grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-nem-wine mb-8 text-center">Explorar por Campo Formativo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.campos_formativos.map((campo) => (
            <CampoCard key={campo.id} campo={campo} onExplore={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;