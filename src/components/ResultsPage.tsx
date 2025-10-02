import React from 'react';
import type { Data } from '../types';
import PdaCard from './PdaCard';

interface ResultsPageProps {
  data: Data;
  searchQuery: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ data, searchQuery }) => {
  const lowerCaseQuery = searchQuery.toLowerCase();

  const filteredContenidos = data.contenidos.filter(contenido =>
    contenido.titulo.toLowerCase().includes(lowerCaseQuery)
  );

  const filteredPdas = data.pdas.filter(pda =>
    pda.descripcion.toLowerCase().includes(lowerCaseQuery)
  );

  const pdaContenidoIds = new Set(filteredPdas.map(pda => pda.contenido_id));
  const contenidosFromPdas = data.contenidos.filter(contenido =>
    pdaContenidoIds.has(contenido.id)
  );

  const allContenidos = [...new Set([...filteredContenidos, ...contenidosFromPdas])];

  return (
    <div>
      <h2 className="text-3xl font-bold text-nem-wine mb-8">Resultados de la Búsqueda para "{searchQuery}"</h2>

      {allContenidos.length > 0 ? (
        allContenidos.map(contenido => (
          <div key={contenido.id} className="mb-8">
            <h3 className="text-2xl font-bold text-nem-berry mb-4">{contenido.titulo}</h3>
            {data.pdas
              .filter(pda => pda.contenido_id === contenido.id)
              .filter(pda => filteredPdas.includes(pda) || filteredContenidos.some(c => c.id === pda.contenido_id))
              .map(pda => (
                <PdaCard key={pda.id} pda={pda} data={data} />
              ))}
          </div>
        ))
      ) : (
        <p className="text-lg text-nem-gray">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default ResultsPage;