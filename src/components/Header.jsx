import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Header = ({ onNavigate }) => {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPage = location.pathname.split('/')[1] || 'home';

  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/categories');
    }
  };

  // Manejar cambio en el input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Limpiar búsqueda y navegar
  const handleSearchClear = () => {
    setSearchQuery('');
  };

  // Manejar clic en categoría
  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName);
    navigate('/categories');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      {/* Banner superior */}
      {/* <div className="bg-black text-white text-xs py-2 px-4 text-center hidden md:block">
        <span className="font-medium">¡Envío gratis por compras superiores a S/299!</span> - Ofertas exclusivas en herramientas de construcción.
      </div> */}

      {/* Header principal */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <button 
          onClick={() => {
            onNavigate('home');
            handleSearchClear();
          }}
          className="flex items-center gap-3 group"
        >
          <img 
            src={logo} 
            alt="Aceros Perú" 
            className="h-10 w-10 md:h-16 md:w-16 object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-bold tracking-tight text-white leading-none">
              ACEROS PERÚ
            </span>
            <span className="text-xs text-gray-400 font-medium">
              HERRAMIENTAS GANZO
            </span>
          </div>
        </button>

        {/* Buscador Desktop */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl hidden md:flex relative"
        >
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-12 py-2.5 rounded-l-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-500"
            placeholder="Buscar palas, picos, rastrillos..."
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
            search
          </span>
          
          {/* Botón limpiar búsqueda */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleSearchClear}
              className="absolute right-28 top-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          
          <button 
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-r-lg font-medium transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* Iconos de navegación */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mi cuenta */}
          <button className="flex flex-col items-center text-gray-300 hover:text-orange-600 transition-colors text-xs">
            <span className="material-symbols-outlined text-2xl">person_outline</span>
            <span className="hidden md:inline">Mi Cuenta</span>
          </button>

          {/* Favoritos */}
          <button className="flex flex-col items-center text-gray-300 hover:text-orange-600 transition-colors text-xs">
            <span className="material-symbols-outlined text-2xl">favorite_border</span>
            <span className="hidden md:inline">Favoritos</span>
          </button>

          {/* Carrito */}
          <button
            onClick={() => onNavigate('cart')}
            className="flex flex-col items-center text-gray-300 hover:text-orange-600 transition-colors text-xs relative"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
            <span className="hidden md:inline">Carrito</span>
          </button>

          {/* Menú móvil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Buscador móvil */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative flex">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-12 py-2.5 rounded-l-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all placeholder-gray-500 text-sm"
            placeholder="Buscar productos..."
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm">
            search
          </span>
          
          {searchQuery && (
            <button
              type="button"
              onClick={handleSearchClear}
              className="absolute right-20 top-2.5 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          
          <button 
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-r-lg font-medium transition-colors text-sm"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Navegación Desktop - CON FUNCIONALIDAD */}
      <nav className="hidden md:block border-t border-gray-700 bg-slate-900">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-3 text-sm font-medium text-gray-300 overflow-x-auto">
            <li>
              <button
                onClick={() => {
                  onNavigate('categories');
                  handleSearchClear();
                }}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  currentPage === 'categories' && !searchQuery ? 'text-orange-600' : ''
                }`}
              >
                Todas las Categorías
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Herramientas Acero')}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  searchQuery === 'Herramientas Acero' ? 'text-orange-600' : ''
                }`}
              >
                Herramientas Acero
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Herramientas Ganzo')}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  searchQuery === 'Herramientas Ganzo' ? 'text-orange-600' : ''
                }`}
              >
                Herramientas Ganzo
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Rastrillos')}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  searchQuery === 'Rastrillos' ? 'text-orange-600' : ''
                }`}
              >
                Rastrillos
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Herramientas de Construccion')}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  searchQuery === 'Herramientas de Construccion' ? 'text-orange-600' : ''
                }`}
              >
                Herramientas de Construcción
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Trípodes para Aspersor')}
                className={`hover:text-orange-600 transition-colors whitespace-nowrap ${
                  searchQuery === 'Trípodes para Aspersor' ? 'text-orange-600' : ''
                }`}
              >
                Trípodes para Aspersor
              </button>
            </li>
            <li>
              <button 
                className="hover:text-orange-600 transition-colors whitespace-nowrap text-orange-600"
              >
                Ofertas Flash
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Menú móvil desplegable - CON FUNCIONALIDAD */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-gray-700 py-4">
          <div className="container mx-auto px-4 space-y-3">
            <button
              onClick={() => {
                onNavigate('categories');
                setMenuOpen(false);
                handleSearchClear();
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Todas las Categorías
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Herramientas Acero');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Herramientas Acero
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Herramientas Ganzo');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Herramientas Ganzo
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Rastrillos');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Rastrillos
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Herramientas de Construccion');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Herramientas de Construcción
            </button>
            <button 
              onClick={() => {
                handleCategoryClick('Trípodes para Aspersor');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-300 hover:text-orange-600"
            >
              Trípodes para Aspersor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;