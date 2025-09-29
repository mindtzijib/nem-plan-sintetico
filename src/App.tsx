import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import type { Data, Fase, Grado } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [selectedFase, setSelectedFase] = useState<Fase | null>(null);
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        // Set initial selected fase if data is available
        if (jsonData.fases && jsonData.fases.length > 0) {
          setSelectedFase(jsonData.fases[0]);
        }
      })
      .catch((err) => console.error("Error loading data:", err));
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