import React from 'react';
import { FaBook } from 'react-icons/fa';

const Header: React.FC = () => {

  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-50 pt-6 border-b border-nem-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-nem-wine to-nem-berry rounded-xl flex items-center justify-center shadow-lg">
              <FaBook className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-nem-wine tracking-tight">Programa Sintético NEM</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-2">
            <a href="#" className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 bg-gradient-to-r from-nem-wine to-nem-berry text-white shadow-lg`}>Inicio</a>
            <a href="#" className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-nem-wine/80 hover:text-nem-wine hover:bg-nem-wine/10`}>Resumen</a>
            <a href="#" className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 text-nem-wine/80 hover:text-nem-wine hover:bg-nem-wine/10`}>Filtrar</a>
          </nav>

          {/* Search */}
          <div className="relative">
            <input type="text" placeholder="Buscar contenidos..." className="w-72 pl-12 pr-4 py-3 bg-nem-wine/5 border-0 rounded-2xl text-sm font-medium placeholder-nem-gray focus:bg-white focus:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nem-berry" />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;