import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import type { Data, Fase, Grado } from './types';
import { data as importedData } from './data';

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [selectedFase, setSelectedFase] = useState<Fase | null>(null);
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null);

  useEffect(() => {
    // Usar datos importados directamente
    setData(importedData);
    if (importedData.fases && importedData.fases.length > 0) {
      setSelectedFase(importedData.fases[0]);
    }
  }, []);

  return (
    <div className="bg-nem-wine/5 text-nem-black min-h-screen font-sans">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {data ? (
              <HomePage 
                data={data} 
                fases={data.fases}
                selectedFase={selectedFase}
                setSelectedFase={setSelectedFase}
                grados={data.grados}
                selectedGrado={selectedGrado}
                setSelectedGrado={setSelectedGrado}
              />
            ) : <p>Loading data...</p>}
        </main>
    </div>
  );
};

export default App;