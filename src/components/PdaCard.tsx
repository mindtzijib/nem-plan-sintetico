import React, { useMemo } from 'react';
import type { Data, Pda, Grado, Contenido, CampoFormativo } from '../types';

interface PdaCardProps {
  pda: Pda;
  data: Data | null;
}

// Helper to get styling for campo formativo tags
const campoTagMetadata: { [key: string]: string } = {
    'Lenguajes': 'bg-gradient-to-r from-nem-wine to-nem-berry',
    'Saberes y Pensamiento Científico': 'bg-gradient-to-r from-nem-wine to-nem-berry',
    'Ética, Naturaleza y Sociedades': 'bg-gradient-to-r from-nem-wine to-nem-berry',
    'De lo Humano y lo Comunitario': 'bg-gradient-to-r from-nem-wine to-nem-berry',
};

const PdaCard: React.FC<PdaCardProps> = ({ pda, data }) => {

  const { grado, campoFormativo } = useMemo(() => {
    if (!data) return { grado: null, campoFormativo: null };

    const grado = data.grados.find((g: Grado) => g.id === pda.grado_id);
    const contenido = data.contenidos.find((c: Contenido) => c.id === pda.contenido_id);
    const campoFormativo = contenido ? data.campos_formativos.find((cf: CampoFormativo) => cf.id === contenido.campo_formativo_id) : null;

    return { grado, campoFormativo };
  }, [pda, data]);

  const tagColor = campoFormativo ? campoTagMetadata[campoFormativo.nombre] || 'bg-gray-500' : 'bg-gray-500';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-nem-gray/30 p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-nem-black mb-3">{pda.descripcion}</h3>
          {grado && (
            <p className="text-sm font-semibold text-nem-gray mb-4 uppercase tracking-wide">
              {grado.nombre} Grado
            </p>
          )}
          {/* The original mockup had a static description, but the real description is the PDA title itself. */}
          {/* <p className="text-slate-700 mb-6 leading-relaxed">{pda.descripcion}</p> */}
        </div>
        {campoFormativo && (
            <div className="flex flex-wrap gap-3 lg:ml-6 mt-4 lg:mt-0">
                <span className={`px-4 py-2 ${tagColor} text-white rounded-2xl text-sm font-bold shadow-lg`}>
                    {campoFormativo.nombre}
                </span>
            </div>
        )}
      </div>
    </div>
  );
};

export default PdaCard;