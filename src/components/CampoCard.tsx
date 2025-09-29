import React from 'react';
import type { CampoFormativo } from '../App';
import { FaComments, FaFlask, FaBalanceScale, FaUsers } from 'react-icons/fa';

interface CampoCardProps {
  campo: CampoFormativo;
  onExplore: (campoId: number) => void;
}

// Helper object to map campo names to specific styles and content from the mockup
const campoMetadata: { [key: string]: { gradient: string; icon: JSX.Element; description: string; buttonColor: string; } } = {
  'Lenguajes': {
    gradient: 'from-nem-wine/5 to-nem-berry/5',
    buttonColor: 'text-nem-wine hover:bg-nem-wine/10',
    description: 'Desarrollo de habilidades comunicativas orales y escritas',
    icon: <FaComments className="w-8 h-8 text-white" />
  },
  'Saberes y Pensamiento Científico': {
    gradient: 'from-nem-wine/5 to-nem-berry/5',
    buttonColor: 'text-nem-wine hover:bg-nem-wine/10',
    description: 'Matemáticas, ciencias naturales y pensamiento crítico',
    icon: <FaFlask className="w-8 h-8 text-white" />
  },
  'Ética, Naturaleza y Sociedades': {
    gradient: 'from-nem-wine/5 to-nem-berry/5',
    buttonColor: 'text-nem-wine hover:bg-nem-wine/10',
    description: 'Historia, geografía y formación ciudadana',
    icon: <FaBalanceScale className="w-8 h-8 text-white" />
  },
  'De lo Humano y lo Comunitario': {
    gradient: 'from-nem-wine/5 to-nem-berry/5',
    buttonColor: 'text-nem-wine hover:bg-nem-wine/10',
    description: 'Desarrollo personal y habilidades socioemocionales',
    icon: <FaUsers className="w-8 h-8 text-white" />
  },
};

const CampoCard: React.FC<CampoCardProps> = ({ campo, onExplore }) => {
  const meta = campoMetadata[campo.nombre] || { gradient: 'from-nem-wine/5 to-nem-berry/5', icon: null, description: '', buttonColor: 'text-nem-wine' };

  return (
    <div 
      className={`card-hover bg-gradient-to-br ${meta.gradient} rounded-3xl border-0 p-8 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col`}
      onClick={() => onExplore(campo.id)}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-nem-wine to-nem-berry rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        {meta.icon}
      </div>
      <div className="flex-grow">
        <h4 className="text-xl font-bold text-nem-black mb-3">{campo.nombre}</h4>
        <p className="text-nem-gray text-sm mb-6 leading-relaxed">{meta.description}</p>
      </div>
      <button className={`w-full px-6 py-3 bg-white ${meta.buttonColor} rounded-2xl font-bold hover:bg-opacity-75 transition-all duration-200 shadow-md mt-auto`}>
        Explorar →
      </button>
    </div>
  );
};

export default CampoCard;