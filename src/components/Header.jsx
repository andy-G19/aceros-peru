import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import { categories } from '../data/categories';

const Header = ({ onNavigate }) => {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.split('/')[1] || 'home';

  const getCategoryName = (id, fallback) =>
    categories.find((category) => category.id === id)?.name || fallback;

  const quickCategories = [
    { label: 'Herramientas Acero', query: getCategoryName(1, 'Herramientas Acero') },
    { label: 'Herramientas Ganzo', query: getCategoryName(2, 'Herramientas Ganzo') },
    { label: 'Rastrillos', query: getCategoryName(3, 'Rastrillos') },
    { label: 'Construccion', query: getCategoryName(4, 'Herramientas de Construccion') },
    { label: 'Tripodes', query: getCategoryName(5, 'Tripodes para Aspersor') },
    { label: 'Jardineria', query: getCategoryName(7, 'Herramientas de Jardineria') },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/categories');
      setMenuOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handleCategoryClick = (categoryName) => {
    setSearchQuery('');
    navigate('/categories', { state: { category: categoryName } });
    setMenuOpen(false);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (menuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      const minScrollForToggle = 3;

      if (currentY <= 12) {
        setIsHeaderVisible(true);
      } else if (diff > minScrollForToggle) {
        setIsHeaderVisible(false);
      } else if (diff < -minScrollForToggle) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      setIsHeaderVisible(true);
    }
  }, [menuOpen]);

  useEffect(() => {
    setIsHeaderVisible(true);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-700/70 bg-zinc-950/95 backdrop-blur transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="hidden border-b border-zinc-800/80 bg-[linear-gradient(115deg,#18181b_0%,#27272a_35%,#18181b_100%)] md:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-zinc-300">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
            <span>Taller metalurgico y herramientas de alto impacto</span>
          </div>
          <div className="flex items-center gap-5">
            <span>Lun - Sab | 8:00 - 18:00</span>
            <span className="text-amber-400">Cotizaciones: +51 983 955 913</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => {
              onNavigate('home');
              handleSearchClear();
              setMenuOpen(false);
            }}
            className="group flex items-center gap-2 md:gap-3"
          >
            <div className="relative rounded-md border border-zinc-700 bg-zinc-900 p-1.5 shadow-inner shadow-black/70 transition-colors group-hover:border-amber-500/70">
              <img
                src={logo}
                alt="Aceros Peru"
                className="h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16"
              />
              <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-500" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-zinc-500" />
            </div>
            <div className="leading-tight">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400 md:text-xs">
                Industrias
              </span>
              <span className="block text-sm font-bold uppercase tracking-[0.08em] text-zinc-100 md:text-lg">
                Aceros Perú
              </span>
            </div>
          </button>

          <form onSubmit={handleSearch} className="relative hidden flex-1 md:flex">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              search
            </span>
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-11 w-full rounded-l-md border border-zinc-700 bg-zinc-900/80 pl-10 pr-24 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/30"
              placeholder="Buscar barras, pletinas, herramientas..."
              type="text"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-24 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-100"
                aria-label="Limpiar busqueda"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}

            <button
              type="submit"
              className="h-11 rounded-r-md border border-amber-500/80 bg-amber-500 px-6 text-sm font-bold uppercase tracking-wider text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Buscar
            </button>
          </form>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <a
              href="https://wa.me/51983955913"
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 items-center justify-center rounded-md border border-emerald-500/60 bg-emerald-500/15 px-4 text-xs font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/25 lg:flex"
            >
              Cotizar
            </a>

            <button className="hidden h-11 w-11 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/70 text-zinc-300 transition-colors hover:border-amber-500/70 hover:text-amber-300 md:flex">
              <span className="material-symbols-outlined">person_outline</span>
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="relative flex h-11 w-11 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/70 text-zinc-200 transition-colors hover:border-amber-500/70 hover:text-amber-300"
              aria-label="Carrito"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-amber-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-zinc-950">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/70 text-zinc-200 transition-colors hover:border-amber-500/70 hover:text-amber-300 md:hidden"
              aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative flex">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
              search
            </span>
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-10 w-full rounded-l-md border border-zinc-700 bg-zinc-900/80 pl-10 pr-16 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/30"
              placeholder="Buscar productos metalurgicos..."
              type="text"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-16 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-100"
                aria-label="Limpiar busqueda"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
            <button
              type="submit"
              className="h-10 rounded-r-md border border-amber-500/80 bg-amber-500 px-4 text-sm font-bold uppercase tracking-wide text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      <nav className="hidden border-t border-zinc-800/80 bg-zinc-950/90 md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-2 overflow-x-auto py-3 text-sm">
            <li>
              <button
                onClick={() => {
                  navigate('/categories', { state: { category: 'all' } });
                  handleSearchClear();
                }}
                className={`rounded-md border px-4 py-1.5 font-semibold uppercase tracking-wide transition-all ${
                  currentPage === 'categories' && !searchQuery
                    ? 'border-amber-500 bg-amber-500 text-zinc-950'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100'
                }`}
              >
                Catalogo general
              </button>
            </li>
            {quickCategories.map((category) => (
              <li key={category.query}>
                <button
                  onClick={() => handleCategoryClick(category.query)}
                  className={`whitespace-nowrap rounded-md border px-4 py-1.5 font-semibold uppercase tracking-wide transition-all ${
                    searchQuery === category.query
                      ? 'border-amber-500 bg-amber-500 text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100'
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-zinc-800/80 bg-zinc-950/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            <a
              href="https://wa.me/51983955913"
              target="_blank"
              rel="noreferrer"
              className="mb-1 rounded-md border border-emerald-500/60 bg-emerald-500/15 px-4 py-2 text-center text-sm font-bold uppercase tracking-wide text-emerald-300"
            >
              Solicitar cotizacion por WhatsApp
            </a>

            <button
              onClick={() => {
                navigate('/categories', { state: { category: 'all' } });
                handleSearchClear();
                setMenuOpen(false);
              }}
              className={`rounded-md border px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide transition-colors ${
                currentPage === 'categories' && !searchQuery
                  ? 'border-amber-500/80 bg-amber-500/20 text-amber-300'
                  : 'border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100'
              }`}
            >
              Catalogo general
            </button>

            {quickCategories.map((category) => (
              <button
                key={category.query}
                onClick={() => handleCategoryClick(category.query)}
                className={`rounded-md border px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide transition-colors ${
                  searchQuery === category.query
                    ? 'border-amber-500/80 bg-amber-500/20 text-amber-300'
                    : 'border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



