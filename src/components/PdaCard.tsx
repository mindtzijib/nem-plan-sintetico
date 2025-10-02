import React, { useMemo, useState } from 'react';
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

const PdaCard: React.FC<PdaCardProps> = React.memo(({ pda, data }) => {
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  const { grado, campoFormativo } = useMemo(() => {
    if (!data) return { grado: null, campoFormativo: null };

    const grado = data.grados.find((g: Grado) => g.id === pda.grado_id);
    const contenido = data.contenidos.find((c: Contenido) => c.id === pda.contenido_id);
    const campoFormativo = contenido ? data.campos_formativos.find((cf: CampoFormativo) => cf.id === contenido.campo_formativo_id) : null;

    return { grado, campoFormativo };
  }, [pda, data]);

  const tagColor = campoFormativo ? campoTagMetadata[campoFormativo.nombre] || 'bg-gray-500' : 'bg-gray-500';

  const copyPdaToClipboard = async () => {
    const pdaText = `PDA ${pda.numero_pda}: ${pda.descripcion}${grado ? ` (${grado.nombre} Grado)` : ''}${campoFormativo ? ` - ${campoFormativo.nombre}` : ''}`;
    
    try {
      await navigator.clipboard.writeText(pdaText);
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = pdaText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopiedFeedback(true);
      setTimeout(() => setShowCopiedFeedback(false), 2000);
    }
  };

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
        <div className="flex flex-col lg:flex-row items-end lg:items-start gap-3 lg:ml-6 mt-4 lg:mt-0">
          {campoFormativo && (
            <span className={`px-4 py-2 ${tagColor} text-white rounded-2xl text-sm font-bold shadow-lg`}>
              {campoFormativo.nombre}
            </span>
          )}
          <button
            onClick={copyPdaToClipboard}
            className="px-4 py-2 bg-nem-wine hover:bg-nem-berry text-white rounded-2xl text-sm font-bold shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer relative"
            title="Copiar PDA al portapapeles"
          >
            {showCopiedFeedback ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Copiado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

PdaCard.displayName = 'PdaCard';

export default PdaCard;