import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import Header from './components/Header';
import SEO from './components/SEO';
import LoadingSpinner from './components/LoadingSpinner';
import type { Data, Fase, Grado } from './types';
import { data as importedData } from './data';

// Lazy load components for better performance
const HomePage = lazy(() => import('./components/HomePage'));
const ResultsPage = lazy(() => import('./components/ResultsPage'));

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [selectedFase, setSelectedFase] = useState<Fase | null>(null);
  const [selectedGrado, setSelectedGrado] = useState<Grado | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Usar datos importados directamente
    setData(importedData);
    if (importedData.fases && importedData.fases.length > 0) {
      setSelectedFase(importedData.fases[0]);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGoHome = () => {
    setSearchQuery('');
  };

  // Memoize SEO props to avoid unnecessary recalculations
  const seoProps = useMemo(() => {
    if (searchQuery) {
      return {
        title: `Resultados para "${searchQuery}" - Nueva Escuela Mexicana`,
        description: `Resultados de búsqueda para "${searchQuery}" en el Plan Sintético de la Nueva Escuela Mexicana. Encuentra PDA relacionados con ${searchQuery}.`,
        keywords: `${searchQuery}, Nueva Escuela Mexicana, Plan Sintético, PDA, educación, México`
      };
    }
    
    if (selectedFase) {
      return {
        title: `${selectedFase.nombre} - Plan Sintético Nueva Escuela Mexicana`,
        description: `Explora los contenidos y PDA de ${selectedFase.nombre} del Plan Sintético de la Nueva Escuela Mexicana. ${selectedFase.descripcion}`,
        keywords: `${selectedFase.nombre}, Nueva Escuela Mexicana, Plan Sintético, PDA, educación, México, ${selectedFase.grados_incluidos}`
      };
    }

    return {};
  }, [searchQuery, selectedFase]);

  return (
    <div className="bg-nem-wine/5 text-nem-black min-h-screen font-sans">
        <SEO {...seoProps} />
        <Header onSearch={handleSearch} onGoHome={handleGoHome} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {data ? (
              <Suspense fallback={<LoadingSpinner />}>
                {searchQuery ? (
                  <ResultsPage data={data} searchQuery={searchQuery} />
                ) : (
                  <HomePage 
                    data={data} 
                    fases={data.fases}
                    selectedFase={selectedFase}
                    setSelectedFase={setSelectedFase}
                    grados={data.grados}
                    selectedGrado={selectedGrado}
                    setSelectedGrado={setSelectedGrado}
                  />
                )}
              </Suspense>
            ) : <LoadingSpinner />}
        </main>
    </div>
  );
};

export default App;