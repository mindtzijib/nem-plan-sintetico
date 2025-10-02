import React, { useState, useEffect } from 'react';
import { FaBook, FaSearch, FaTimes } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';

interface HeaderProps {
  onSearch: (query: string) => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onGoHome }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce search query para optimizar performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Ejecutar búsqueda automática cuando el debounced query cambie
  useEffect(() => {
    if (debouncedSearchQuery.trim().length >= 2) {
      onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onSearch]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
      setIsSearchOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onGoHome();
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-white/70 backdrop-blur sticky top-0 z-50 pt-6 border-b border-nem-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center pb-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 flex-grow cursor-pointer" onClick={onGoHome}>
            <div className="w-10 h-10 bg-gradient-to-br from-nem-wine to-nem-berry rounded-xl flex items-center justify-center shadow-lg">
              <FaBook className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-nem-wine tracking-tight">Programa Sintético NEM</h1>
          </div>

          {/* Search */}
          <div className="flex items-center justify-end">
            <div className="hidden md:block relative">
              <input 
                type="text" 
                placeholder="Buscar contenidos..." 
                className="w-72 pl-12 pr-4 py-3 bg-nem-wine/5 border-0 rounded-2xl text-sm font-medium placeholder-nem-gray focus:bg-white focus:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nem-berry" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            </div>
            <button onClick={() => setIsSearchOpen(true)} className="md:hidden">
              <FaSearch className="w-6 h-6 text-nem-wine" />
            </button>
          </div>
        </div>
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/70 backdrop-blur-sm z-50 flex items-center px-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar contenidos..." 
                className="w-full pl-12 pr-12 py-3 bg-nem-wine/5 border-0 rounded-2xl text-sm font-medium placeholder-nem-gray focus:bg-white focus:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nem-berry" 
                autoFocus 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <button onClick={handleClearSearch} className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 hover:text-nem-wine transition-colors">
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;