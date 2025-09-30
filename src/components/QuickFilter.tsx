import React, { useState, useMemo } from 'react';
import type { Data, Pda, Fase, Grado, Contenido, CampoFormativo } from '../types';
import { FaChevronDown } from 'react-icons/fa';
import PdaCard from './PdaCard';

interface QuickFilterProps {
  data: Data;
  fases: Fase[];
  selectedFase: Fase | null;
  setSelectedFase: (fase: Fase) => void;
  grados: Grado[];
  selectedGrado: Grado | null;
  setSelectedGrado: (grado: Grado | null) => void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ 
  data, 
  fases, 
  selectedFase, 
  setSelectedFase, 
  grados, 
  selectedGrado, 
  setSelectedGrado 
}) => {
  const [selectedCampoId, setSelectedCampoId] = useState<number | null>(null);
  const [selectedContenidoId, setSelectedContenidoId] = useState<number | null>(null);
  const [localPdas, setLocalPdas] = useState<Pda[]>([]);
  const [isFaseDropdownOpen, setFaseDropdownOpen] = useState(false);

  const availableGrados = useMemo(() => {
    if (!selectedFase) return [];
    return grados.filter((g: Grado) => g.fase_id === selectedFase.id);
  }, [selectedFase, grados]);

  const availableContenidos = useMemo(() => {
    if (!selectedFase || !selectedCampoId) return [];
    return data.contenidos.filter((c: Contenido) => c.fase_id === selectedFase.id && c.campo_formativo_id === selectedCampoId);
  }, [selectedFase, selectedCampoId, data.contenidos]);

  const handleShowPdas = () => {
    if (!selectedContenidoId || !selectedGrado) return;
    const pdas = data.pdas.filter((pda: Pda) => pda.contenido_id === selectedContenidoId && pda.grado_id === selectedGrado.id);
    setLocalPdas(pdas);
  };

  const handleClear = () => {
    setSelectedFase(fases[0]);
    setSelectedGrado(null);
    setSelectedCampoId(null);
    setSelectedContenidoId(null);
    setLocalPdas([]);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-nem-gray/30 p-8 mb-12 shadow-xl">
      <h3 className="text-2xl font-bold text-nem-wine mb-6 text-center">Filtrado Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Fase Filter */}
        <div>
          <label className="block text-sm font-semibold text-nem-black mb-3 uppercase tracking-wide">Fase</label>
          <div className="relative">
            <button 
              onClick={() => setFaseDropdownOpen(!isFaseDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-nem-wine to-nem-berry text-white rounded-2xl text-sm font-semibold hover:from-nem-wine/90 hover:to-nem-berry/90 transition-all duration-200 shadow-lg">
              <span>{selectedFase ? selectedFase.nombre : 'Seleccionar Fase'}</span>
              <FaChevronDown className="w-4 h-4" />
            </button>
            {isFaseDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-nem-gray/30 py-1 z-10">
                {fases.map((fase: Fase) => (
                  <a
                    key={fase.id}
                    href="#"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      setSelectedFase(fase);
                      setSelectedGrado(null);
                      setSelectedContenidoId(null);
                      setFaseDropdownOpen(false);
                    }}
                    className="block px-4 py-3 text-sm font-medium text-nem-black hover:bg-nem-wine/10 hover:text-nem-wine transition-colors">
                    {fase.nombre}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grado Filter */}
        <div>
          <label className="block text-sm font-semibold text-nem-black mb-3 uppercase tracking-wide">Grado</label>
          <div className="relative">
            <select 
              value={selectedGrado?.id ?? ''}
              onChange={(e) => {
                const grado = grados.find((g: Grado) => g.id === Number(e.target.value));
                if (grado) setSelectedGrado(grado);
              }}
              disabled={!selectedFase}
              className="w-full px-5 py-4 bg-nem-wine/5 border-0 rounded-2xl focus:bg-white focus:shadow-lg focus:ring-4 focus:ring-nem-wine/30 transition-all duration-200 font-medium disabled:bg-nem-gray/30 disabled:cursor-not-allowed appearance-none pr-10">
              <option value="" disabled>Seleccionar grado...</option>
              {availableGrados.map((grado: Grado) => (
                <option key={grado.id} value={grado.id}>{grado.nombre}</option>
              ))}
            </select>
            <FaChevronDown className="absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 text-nem-gray pointer-events-none" />
          </div>
        </div>

        {/* Campo Formativo Filter */}
        <div>
          <label className="block text-sm font-semibold text-nem-black mb-3 uppercase tracking-wide">Campo Formativo</label>
          <div className="relative">
            <select 
              value={selectedCampoId ?? ''}
              onChange={(e) => {
                setSelectedCampoId(Number(e.target.value));
                setSelectedContenidoId(null);
              }}
              className="w-full px-5 py-4 bg-nem-wine/5 border-0 rounded-2xl focus:bg-white focus:shadow-lg focus:ring-4 focus:ring-nem-wine/30 transition-all duration-200 font-medium appearance-none pr-10">
              <option value="" disabled>Seleccionar campo...</option>
              {data.campos_formativos.map((campo: CampoFormativo) => (
                <option key={campo.id} value={campo.id}>{campo.nombre}</option>
              ))}
            </select>
            <FaChevronDown className="absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 text-nem-gray pointer-events-none" />
          </div>
        </div>

        {/* Contenido Filter */}
        <div>
          <label className="block text-sm font-semibold text-nem-black mb-3 uppercase tracking-wide">Contenido</label>
          <div className="relative">
            <select 
              value={selectedContenidoId ?? ''}
              onChange={(e) => setSelectedContenidoId(Number(e.target.value))}
              disabled={!selectedFase || !selectedCampoId}
              className="w-full px-5 py-4 bg-nem-wine/5 border-0 rounded-2xl focus:bg-white focus:shadow-lg focus:ring-4 focus:ring-nem-wine/30 transition-all duration-200 font-medium disabled:bg-nem-gray/30 disabled:cursor-not-allowed appearance-none pr-10">
              <option value="" disabled>Seleccionar contenido...</option>
              {availableContenidos.map((contenido: Contenido) => (
                <option key={contenido.id} value={contenido.id}>{contenido.titulo}</option>
              ))}
            </select>
            <FaChevronDown className="absolute top-1/2 right-5 -translate-y-1/2 w-4 h-4 text-nem-gray pointer-events-none" />
          </div>
        </div>
      </div>
      {(selectedFase || selectedGrado || selectedCampoId || selectedContenidoId) && (
        <div className="mb-8 p-6 bg-nem-wine/5 rounded-2xl">
          <h4 className="text-lg font-semibold text-nem-wine mb-4">Tu Selección</h4>
          <div className="flex flex-wrap items-center gap-4">
            {selectedFase && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Fase:</span>
                <span className="px-3 py-1 bg-nem-wine text-white rounded-full text-sm">{selectedFase.nombre}</span>
              </div>
            )}
            {selectedGrado && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Grado:</span>
                <span className="px-3 py-1 bg-nem-berry text-white rounded-full text-sm">{selectedGrado.nombre}</span>
              </div>
            )}
            {selectedCampoId && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Campo:</span>
                <span className="px-3 py-1 bg-nem-gold text-nem-black rounded-full text-sm">{data.campos_formativos.find(c => c.id === selectedCampoId)?.nombre}</span>
              </div>
            )}
            {selectedContenidoId && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Contenido:</span>
                <span className="text-sm">{data.contenidos.find(c => c.id === selectedContenidoId)?.titulo}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleShowPdas}
          disabled={!selectedContenidoId || !selectedGrado}
          className="px-8 py-4 bg-gradient-to-r from-nem-wine to-nem-berry text-white rounded-2xl font-bold hover:from-nem-wine/90 hover:to-nem-berry/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
          Mostrar PDAs
        </button>
        <button 
          onClick={handleClear}
          className="px-8 py-4 bg-nem-gold/20 text-nem-black rounded-2xl font-bold hover:bg-nem-gold/30 transition-all duration-200">
          Limpiar
        </button>
      </div>

      {localPdas.length > 0 && (
        <div className="mt-12">
          <h4 className="text-xl font-bold text-nem-wine mb-6">Resultados</h4>
          <div className="space-y-4">
            {localPdas.map((pda: Pda) => (
              <PdaCard key={pda.id} pda={pda} data={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFilter;