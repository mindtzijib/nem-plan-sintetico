import React from 'react';
import type { Data, Pda, View } from '../App';
import PdaCard from './PdaCard';

interface ResultsPageProps {
  pdas: Pda[];
  data: Data | null;
  setView: (view: View) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ pdas, data, setView }) => {
  return (
    <div>
      {/* Back Button */}
      <div className="mb-8">
        <button 
          onClick={() => setView('home')}
          className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-nem-wine to-nem-berry text-white rounded-2xl font-bold hover:from-nem-wine/90 hover:to-nem-berry/90 transition-all duration-200 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Volver al Inicio</span>
        </button>
      </div>

      <h2 className="text-3xl font-bold bg-gradient-to-r from-nem-wine to-nem-berry bg-clip-text text-transparent mb-8 text-center">Resultados de PDAs</h2>

      {/* Results List */}
      <div className="space-y-6">
        {pdas.length > 0 ? (
          pdas.map(pda => (
            <PdaCard key={pda.id} pda={pda} data={data} />
          ))
        ) : (
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl border border-nem-gray/30 p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-nem-black">No se encontraron resultados</h3>
            <p className="text-nem-gray mt-2">Intenta con otros filtros o explora desde la página de inicio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;