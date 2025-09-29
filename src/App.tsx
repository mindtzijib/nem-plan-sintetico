import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';

// --- Type Definitions from data.json ---
type Data = {
  fases: Fase[];
  campos_formativos: CampoFormativo[];
  grados: Grado[];
  contenidos: Contenido[];
  pdas: Pda[];
};

export interface Fase {
  id: number;
  numero: number;
  nombre: string;
  descripcion: string;
  grados_incluidos: string;
}

export interface CampoFormativo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Grado {
  id: number;
  numero: number;
  nombre: string;
  fase_id: number;
}

export interface Contenido {
  id: number;
  numero: number;
  titulo: string;
  fase_id: number;
  campo_formativo_id: number;
}

export interface Pda {
  id: number;
  numero_pda: number;
  descripcion: string;
  contenido_id: number;
  grado_id: number;
}

export type View = 'home' | 'results' | 'resumen' | 'filtrar';

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