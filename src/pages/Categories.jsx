import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterDrawer from '../components/FilterDrawer';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { BlurFade } from '../components/magicui/blur-fade';
import OptimizedImage from '../components/OptimizedImage';
import Icon from '../components/Icon';

/* ─── Mapa visual de categorías ──────────────────────────────── */
const CATEGORY_IMAGES = {
  'Herramientas Acero':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304058/Lampa_Extra_Grande_v4m0n2.jpg',
  'Herramientas Ganzo':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304308/Ganzo_Grande_wbunqf.jpg',
  'Rastrillos':
    'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=800',
  'Herramientas de Construccion':
    'https://images.unsplash.com/photo-1530124560676-586cad3ad276?w=800',
  'Trípodes para Aspersor':
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
  'Herramientas de Jardinería':
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
  'Otros':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
};

/* ─── Mapa visual de SUBcategorías ───────────────────────────── */
// 🔁 REEMPLAZA estas URLs con tus fotos reales en Cloudinary
const SUBCATEGORY_IMAGES = {
  // ── Herramientas Acero ──
  'Lampas':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304058/Lampa_Extra_Grande_v4m0n2.jpg',
  'Rejillas':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304127/Rejilla_Triangulo_xzii78.jpg',

  // ── Herramientas Ganzo ──
  'Lampas Ganzo':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104118/16_jlzpw0.jpg',
  'Lampas Tipo Cuchara':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104119/17_ijxwjq.jpg',
  'Lampas Tipo Pala':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104119/18_igiazx.jpg',
  'Rejillas Ganzo':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104120/19_nuut3x.jpg',
};

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Destacados' },
  { value: 'price-asc',  label: 'Precio ↑' },
  { value: 'price-desc', label: 'Precio ↓' },
  { value: 'name',       label: 'Nombre A-Z' },
  { value: 'discount',   label: 'Mayor Descuento' },
];

/* ─── SubcategoryBanner — solo imagen + título ────────────────── */
function SubcategoryBanner({ subcategoryName }) {
  const img = SUBCATEGORY_IMAGES[subcategoryName];
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <BlurFade delay={0.05} duration={0.5}>
        <div
          className="relative overflow-hidden rounded-2xl mb-8 cursor-zoom-in w-full max-w-[1150px] mx-auto"
          style={{ aspectRatio: '1150/600' }}
          onClick={() => img && setZoomed(true)}
        >
          {/* Imagen completa sin recorte */}
          {img ? (
            <OptimizedImage
              src={img}
              alt={subcategoryName}
              width={1150}
              height={600}
              mode="fill"
              sizes="(max-width: 1280px) 100vw, 1150px"
              eager
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#111118]" />
          )}

          {/* Overlay inferior para legibilidad del título */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Ícono lupa */}
          {img && (
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Icon name="zoom_in" className="text-white text-base" />
            </div>
          )}

          
        </div>
      </BlurFade>

      {/* ── Modal de imagen ampliada ── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <OptimizedImage
              src={img}
              alt={subcategoryName}
              width={1600}
              height={900}
              mode="limit"
              sizes="95vw"
              eager
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
            >
              <Icon name="close" className="text-white text-xl" />
            </button>
            <p className="text-center text-xs text-zinc-500 uppercase tracking-widest font-bold mt-3">
              Toca fuera para cerrar
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── SectionHeader ───────────────────────────────────────────── */
function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
        <div className="mt-1.5 h-[3px] w-10 bg-amber-500 rounded-full" />
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-[11px] font-bold text-zinc-500 hover:text-amber-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
        >
          {action} <span className="text-sm">↗</span>
        </button>
      )}
    </div>
  );
}

/* ─── FilterChip ──────────────────────────────────────────────── */
function FilterChip({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2
        ${active
          ? 'bg-amber-500 text-white font-bold'
          : 'text-zinc-400 hover:bg-[#1e1e2a] hover:text-white'}
      `}
    >
      <span className="truncate">{label}</span>
      {count != null && (
        <span className={`text-[10px] shrink-0 ${active ? 'text-white/70' : 'text-zinc-600'}`}>
          ({count})
        </span>
      )}
    </button>
  );
}

/* ─── ActiveChip (filtro activo removible) ────────────────────── */
function ActiveChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-white transition-colors"
        aria-label="Quitar filtro"
      >
        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

/* ─── Desktop Sidebar ─────────────────────────────────────────── */
function Sidebar({
  selectedCategory, selectedSubcategory, expandedCategories,
  priceRange, searchQuery, sortBy,
  onCategoryClick, onSubcategoryClick, onToggleExpand,
  onPriceChange, onSortChange, onClearAll,
}) {
  return (
    <aside className="lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-[#16161f] border border-white/5 rounded-2xl p-5 sticky top-24 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="tune" className="text-amber-500 text-lg" />
            <span className="text-sm font-black uppercase tracking-widest text-white">Filtros</span>
          </div>
          <button
            onClick={onClearAll}
            className="text-[10px] font-bold text-zinc-600 hover:text-amber-500 uppercase tracking-wider transition-colors"
          >
            Limpiar
          </button>
        </div>

        {/* Búsqueda activa */}
        {searchQuery && (
          <div className="px-3 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">Buscando</p>
            <p className="text-xs text-white font-medium truncate">"{searchQuery}"</p>
          </div>
        )}

        {/* Ordenar */}
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Ordenar por</p>
          <div className="space-y-0.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-2
                  ${sortBy === opt.value
                    ? 'bg-amber-500 text-white font-bold'
                    : 'text-zinc-400 hover:bg-[#1e1e2a] hover:text-white'}
                `}
              >
                <span>{opt.label}</span>
                {sortBy === opt.value && (
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Categorías */}
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Categorías</p>
          <div className="space-y-0.5">
            <FilterChip
              label="Todas"
              count={products.length}
              active={selectedCategory === 'all' && !searchQuery}
              onClick={() => onCategoryClick('all')}
            />
            {categories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center">
                  <div className="flex-1">
                    <FilterChip
                      label={cat.name}
                      count={cat.count}
                      active={selectedCategory === cat.name && !selectedSubcategory && !searchQuery}
                      onClick={() => onCategoryClick(cat.name)}
                    />
                  </div>
                  {cat.subcategories?.length > 0 && (
                    <button
                      onClick={() => onToggleExpand(cat.name)}
                      className="px-1.5 py-2 text-zinc-600 hover:text-amber-500 transition-colors shrink-0"
                    >
                      <Icon name={expandedCategories[cat.name] ? 'expand_less' : 'expand_more'} className="text-sm" />
                    </button>
                  )}
                </div>
                {cat.subcategories?.length > 0 && expandedCategories[cat.name] && (
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l border-white/5 pl-2">
                    {cat.subcategories.map((sub) => (
                      <FilterChip
                        key={sub.id}
                        label={sub.name}
                        count={sub.count}
                        active={selectedSubcategory === sub.name && selectedCategory === cat.name && !searchQuery}
                        onClick={() => onSubcategoryClick(cat.name, sub.name)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">
            Precio (S/ {priceRange[0]} – S/ {priceRange[1]})
          </p>
          <input
            type="range" min="0" max="5000" value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], +e.target.value])}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
            <span>S/ 0</span><span>S/ 5000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── CategoryBar ─────────────────────────────────────────────── */
function CategoryBar({ selected, onSelect, searchQuery }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onSelect('all')}
        className={`
          shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all
          ${selected === 'all' && !searchQuery
            ? 'bg-amber-500 text-white'
            : 'bg-[#16161f] text-zinc-400 hover:text-white border border-white/5'}
        `}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className={`
            shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all
            ${selected === cat.name && !searchQuery
              ? 'bg-amber-500 text-white'
              : 'bg-[#16161f] text-zinc-400 hover:text-white border border-white/5'}
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

/* ─── SubcategoryGrid ─────────────────────────────────────────── */
// Tarjetas con imagen para elegir subcategoría (antes de seleccionarla)
function SubcategoryGrid({ category, onSelect }) {
  const cat = categories.find((c) => c.name === category);
  if (!cat?.subcategories?.length) return null;

  return (
    <BlurFade inView delay={0.05} duration={0.3}>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-[3px] h-5 bg-amber-500 rounded-full" />
          <h3 className="text-lg font-black uppercase tracking-widest text-white">Subcategorías</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cat.subcategories.map((sub, i) => {
            const img = SUBCATEGORY_IMAGES[sub.name];
            return (
              <BlurFade key={sub.id} inView delay={i * 0.06} duration={0.35}>
                <button
                  onClick={() => onSelect(category, sub.name)}
                  className="relative overflow-hidden rounded-xl group border border-white/5 hover:border-amber-500/40 transition-all duration-300"
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Imagen */}
                  {img ? (
                    <OptimizedImage
                      src={img}
                      alt={sub.name}
                      width={520}
                      height={390}
                      mode="fill"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1e1e2a]" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/70 transition-all duration-300" />

                  {/* Texto */}
                  <div className="relative h-full flex flex-col justify-end p-3.5 text-left">
                    <p className="text-xs font-black uppercase tracking-wide text-white group-hover:text-amber-400 transition-colors leading-tight mb-1">
                      {sub.name}
                    </p>
                    <p className="text-[10px] text-zinc-400">{sub.count} productos</p>
                  </div>

                  {/* Flecha */}
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-amber-400 text-xs font-bold">→</span>
                  </div>
                </button>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </BlurFade>
  );
}

/* ─── EmptyState ──────────────────────────────────────────────── */
function EmptyState({ searchQuery, selectedSubcategory, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#16161f] border border-white/5 flex items-center justify-center mb-5">
        <Icon name="search_off" className="text-zinc-700 text-3xl" />
      </div>
      <h3 className="text-lg font-black uppercase text-white mb-1">Sin resultados</h3>
      <p className="text-sm text-zinc-500 mb-6 max-w-xs">
        {searchQuery
          ? `No hay productos para "${searchQuery}"`
          : selectedSubcategory
            ? `No hay productos en ${selectedSubcategory}`
            : 'Intenta ajustar los filtros'}
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
      >
        Limpiar Filtros
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORIES PAGE
═══════════════════════════════════════════════════════════════ */
const Categories = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useCart();

  const location = useLocation();

  const [selectedCategory, setSelectedCategory]       = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories]   = useState({});
  const [sortBy, setSortBy]                           = useState('featured');
  const [priceRange, setPriceRange]                   = useState([0, 5000]);
  const [drawerOpen, setDrawerOpen]                   = useState(false);

  /* ── Leer state de navegación (desde SubcategoriesShowcase en Home) ── */
  useEffect(() => {
    const state = location.state;
    if (state?.category) {
      setSelectedCategory(state.category);
      if (state.subcategory) {
        setSelectedSubcategory(state.subcategory);
        setExpandedCategories((prev) => ({ ...prev, [state.category]: true }));
      }
      // Limpiar el state para no re-aplicar en navegaciones futuras
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  /* ── Handlers ── */
  const handleCategoryClick = (name) => {
    if (name === 'all') {
      setSelectedCategory('all');
      setSelectedSubcategory(null);
      setSearchQuery('');
      return;
    }
    setSelectedCategory(name);
    setSelectedSubcategory(null);
    setSearchQuery('');
    const cat = categories.find((c) => c.name === name);
    if (cat?.subcategories?.length) {
      setExpandedCategories((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubcategoryClick = (catName, subName) => {
    // Si ya está activa exactamente esta combo cat+sub, la deselecciona
    if (selectedCategory === catName && selectedSubcategory === subName) {
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(catName);
      setSelectedSubcategory(subName);
    }
    setSearchQuery('');
  };

  const handleToggleExpand = (name) => {
    setExpandedCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedSubcategory(null);
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setExpandedCategories({});
    setSearchQuery('');
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleDrawerApply = ({ category, subcategory, priceRange: pr }) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setPriceRange(pr);
    setSearchQuery('');
  };

  /* ── Filtrado ── */
  const filtered = products.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    // Filtra subcategoría SOLO dentro de la categoría ya seleccionada
    if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':  return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name':       return a.name.localeCompare(b.name);
      case 'discount':   return (b.discount || 0) - (a.discount || 0);
      default:           return 0;
    }
  });

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubcategory ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const pageTitle = searchQuery
    ? `"${searchQuery}"`
    : selectedSubcategory
      ? selectedSubcategory
      : selectedCategory !== 'all'
        ? selectedCategory
        : 'Todas las Herramientas';

  /* ── ¿La categoría activa tiene subcategorías? ── */
  const activeCatObj = categories.find((c) => c.name === selectedCategory);
  const hasSubs = activeCatObj?.subcategories?.length > 0;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HERO STRIP ── */}
      <section className="relative overflow-hidden bg-[#111118] border-b border-white/5 py-8 md:py-10">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 mb-5 font-medium">
            <button onClick={() => navigate('/')} className="hover:text-amber-500 transition-colors">Inicio</button>
            <Icon name="chevron_right" className="text-[10px]" />
            <span
              className={selectedCategory !== 'all' ? 'hover:text-amber-500 cursor-pointer transition-colors' : 'text-zinc-400'}
              onClick={() => selectedCategory !== 'all' && handleCategoryClick('all')}
            >
              Categorías
            </span>
            {selectedCategory !== 'all' && (
              <>
                <Icon name="chevron_right" className="text-[10px]" />
                <span
                  className={selectedSubcategory ? 'hover:text-amber-500 cursor-pointer transition-colors' : 'text-amber-500'}
                  onClick={() => selectedSubcategory && handleCategoryClick(selectedCategory)}
                >
                  {selectedCategory}
                </span>
              </>
            )}
            {selectedSubcategory && (
              <>
                <Icon name="chevron_right" className="text-[10px]" />
                <span className="text-amber-500">{selectedSubcategory}</span>
              </>
            )}
          </div>

          {/* Título */}
          <div>
            <BlurFade delay={0.05} duration={0.4}>
              <h1 className="font-black uppercase tracking-tight leading-none" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>
                {pageTitle}
              </h1>
              <div className="mt-2 h-[3px] w-12 bg-amber-500 rounded-full" />
            </BlurFade>
            <BlurFade delay={0.15} duration={0.4}>
              <p className="text-sm text-zinc-500 mt-3">
                <span className="text-amber-500 font-bold">{sorted.length}</span>{' '}
                {sorted.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </p>
            </BlurFade>
          </div>

          {/* Botón Filtros mobile */}
          <BlurFade delay={0.2} duration={0.4}>
            <div className="mt-5 flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setDrawerOpen(true)}
                className={`
                  shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black
                  uppercase tracking-wide transition-all relative
                  ${activeFiltersCount > 0
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'bg-[#16161f] border border-white/10 text-zinc-300 hover:border-white/20'}
                `}
              >
                <Icon name="tune" className="text-base" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-amber-600 text-[9px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-[#16161f] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/40 transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </BlurFade>

          {/* Chips filtros activos mobile */}
          {activeFiltersCount > 0 && (
            <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {searchQuery.trim() && <ActiveChip label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} />}
              {selectedCategory !== 'all' && (
                <ActiveChip label={selectedCategory} onRemove={() => { setSelectedCategory('all'); setSelectedSubcategory(null); }} />
              )}
              {selectedSubcategory && (
                <ActiveChip label={selectedSubcategory} onRemove={() => setSelectedSubcategory(null)} />
              )}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <ActiveChip label={`S/${priceRange[0]} – S/${priceRange[1]}`} onRemove={() => setPriceRange([0, 5000])} />
              )}
              <button onClick={handleClearAll} className="text-[10px] text-zinc-600 hover:text-amber-500 uppercase tracking-wider shrink-0 transition-colors ml-1">
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar desktop */}
          <div className="hidden lg:block">
            <Sidebar
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              expandedCategories={expandedCategories}
              priceRange={priceRange}
              searchQuery={searchQuery}
              sortBy={sortBy}
              onCategoryClick={handleCategoryClick}
              onSubcategoryClick={handleSubcategoryClick}
              onToggleExpand={handleToggleExpand}
              onPriceChange={setPriceRange}
              onSortChange={setSortBy}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Grid de productos */}
          <div className="flex-1 min-w-0">

            {/* ══ BANNER de subcategoría seleccionada ══ */}
            {selectedSubcategory && (
              <SubcategoryBanner
                subcategoryName={selectedSubcategory}
              />
            )}

            {/* ══ GRID de subcategorías (cuando hay categoría pero no subcategoría) ══ */}
            {selectedCategory !== 'all' && !selectedSubcategory && !searchQuery && hasSubs && (
              <SubcategoryGrid category={selectedCategory} onSelect={handleSubcategoryClick} />
            )}

            {sorted.length > 0 ? (
              <>
                <SectionHeader
                  title={
                    selectedSubcategory
                      ? selectedSubcategory
                      : selectedCategory !== 'all'
                        ? selectedCategory
                        : 'Todos los Productos'
                  }
                />
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {sorted.map((product, i) => (
                    <BlurFade key={product.id} inView delay={i * 0.03} yOffset={8} duration={0.35}>
                      <ProductCard product={product} onViewDetails={handleViewProduct} />
                    </BlurFade>
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                selectedSubcategory={selectedSubcategory}
                onClear={handleClearAll}
              />
            )}
          </div>
        </div>
      </section>

      

      {/* FilterDrawer mobile */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        selectedCat={selectedCategory}
        selectedSub={selectedSubcategory}
        priceRange={priceRange}
        onApply={handleDrawerApply}
        onClear={handleClearAll}
      />

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/51983955913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        title="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </a>
    </main>
  );
};

export default Categories;
