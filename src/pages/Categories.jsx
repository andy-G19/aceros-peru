import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterDrawer from '../components/FilterDrawer';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import { BlurFade } from '../components/magicui/blur-fade';

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
  'Otros':
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
};

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Destacados' },
  { value: 'price-asc',  label: 'Precio ↑' },
  { value: 'price-desc', label: 'Precio ↓' },
  { value: 'name',       label: 'Nombre A-Z' },
  { value: 'discount',   label: 'Mayor Descuento' },
];

/* ─── SectionHeader ───────────────────────────────────────────── */
function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
        <div className="mt-1.5 h-[3px] w-10 bg-orange-500 rounded-full" />
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-[11px] font-bold text-gray-500 hover:text-orange-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
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
          ? 'bg-orange-500 text-white font-bold'
          : 'text-gray-400 hover:bg-[#1e1e2a] hover:text-white'}
      `}
    >
      <span className="truncate">{label}</span>
      {count != null && (
        <span className={`text-[10px] shrink-0 ${active ? 'text-white/70' : 'text-gray-600'}`}>
          ({count})
        </span>
      )}
    </button>
  );
}

/* ─── ActiveChip (filtro activo removible) ────────────────────── */
function ActiveChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
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
            <span className="material-symbols-outlined text-orange-500 text-lg">tune</span>
            <span className="text-sm font-black uppercase tracking-widest text-white">Filtros</span>
          </div>
          <button
            onClick={onClearAll}
            className="text-[10px] font-bold text-gray-600 hover:text-orange-500 uppercase tracking-wider transition-colors"
          >
            Limpiar
          </button>
        </div>

        {/* Búsqueda activa */}
        {searchQuery && (
          <div className="px-3 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-xl">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Buscando</p>
            <p className="text-xs text-white font-medium truncate">"{searchQuery}"</p>
          </div>
        )}

        {/* Categorías */}
        <div>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Categorías</p>
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
                      className="px-1.5 py-2 text-gray-600 hover:text-orange-500 transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {expandedCategories[cat.name] ? 'expand_less' : 'expand_more'}
                      </span>
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
                        active={selectedSubcategory === sub.name && !searchQuery}
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
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3">
            Precio (S/ {priceRange[0]} – S/ {priceRange[1]})
          </p>
          <input
            type="range" min="0" max="5000" value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], +e.target.value])}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>S/ 0</span><span>S/ 5000</span>
          </div>
        </div>

        {/* Ordenar (dentro del sidebar, solo en mobile) */}
        <div className="lg:hidden">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Ordenar</p>
          <div className="grid grid-cols-2 gap-1.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`
                  text-[10px] font-bold px-2 py-1.5 rounded-lg transition-all
                  ${sortBy === opt.value
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#1e1e2a] text-gray-400 hover:text-white'}
                `}
              >
                {opt.label}
              </button>
            ))}
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
            ? 'bg-orange-500 text-white'
            : 'bg-[#16161f] text-gray-400 hover:text-white border border-white/5'}
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
              ? 'bg-orange-500 text-white'
              : 'bg-[#16161f] text-gray-400 hover:text-white border border-white/5'}
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

/* ─── EmptyState ──────────────────────────────────────────────── */
function EmptyState({ searchQuery, selectedSubcategory, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#16161f] border border-white/5 flex items-center justify-center mb-5">
        <span className="material-symbols-outlined text-gray-700 text-3xl">search_off</span>
      </div>
      <h3 className="text-lg font-black uppercase text-white mb-1">Sin resultados</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        {searchQuery
          ? `No hay productos para "${searchQuery}"`
          : selectedSubcategory
            ? `No hay productos en ${selectedSubcategory}`
            : 'Intenta ajustar los filtros'}
      </p>
      <button
        onClick={onClear}
        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
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

  const [selectedCategory, setSelectedCategory]       = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [expandedCategories, setExpandedCategories]   = useState({});
  const [sortBy, setSortBy]                           = useState('featured');
  const [priceRange, setPriceRange]                   = useState([0, 5000]);

  /* ── Drawer (solo mobile) ──────────────────────────────────── */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Handlers ──────────────────────────────────────────────── */
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
    setSelectedCategory(catName);
    setSelectedSubcategory((prev) => (prev === subName ? null : subName));
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

  /* Callback del drawer: aplica los valores del draft */
  const handleDrawerApply = ({ category, subcategory, priceRange: pr }) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setPriceRange(pr);
    setSearchQuery('');
  };

  /* ── Filtrado ───────────────────────────────────────────────── */
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

  /* ── Active filter count (para badge del botón) ─────────────── */
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubcategory ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  /* ── Page title ─────────────────────────────────────────────── */
  const pageTitle = searchQuery
    ? `"${searchQuery}"`
    : selectedSubcategory
      ? selectedSubcategory
      : selectedCategory !== 'all'
        ? selectedCategory
        : 'Todas las Herramientas';

  /* ═══════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HERO STRIP ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#111118] border-b border-white/5 py-8 md:py-10">
        {/* Grid decorativo */}
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
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-5 font-medium">
            <button onClick={() => navigate('/')} className="hover:text-orange-500 transition-colors">
              Inicio
            </button>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span
              className={
                selectedCategory !== 'all'
                  ? 'hover:text-orange-500 cursor-pointer transition-colors'
                  : 'text-gray-400'
              }
              onClick={() => selectedCategory !== 'all' && handleCategoryClick('all')}
            >
              Categorías
            </span>
            {selectedCategory !== 'all' && (
              <>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span
                  className={
                    selectedSubcategory
                      ? 'hover:text-orange-500 cursor-pointer transition-colors'
                      : 'text-orange-500'
                  }
                  onClick={() =>
                    selectedSubcategory && handleCategoryClick(selectedCategory)
                  }
                >
                  {selectedCategory}
                </span>
              </>
            )}
            {selectedSubcategory && (
              <>
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                <span className="text-orange-500">{selectedSubcategory}</span>
              </>
            )}
          </div>

          {/* Título + sort (desktop) */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <BlurFade delay={0.05} duration={0.4}>
                <h1
                  className="font-black uppercase tracking-tight leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
                >
                  {pageTitle}
                </h1>
                <div className="mt-2 h-[3px] w-12 bg-orange-500 rounded-full" />
              </BlurFade>
              <BlurFade delay={0.15} duration={0.4}>
                <p className="text-sm text-gray-500 mt-3">
                  <span className="text-orange-500 font-bold">{sorted.length}</span>{' '}
                  {sorted.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                </p>
              </BlurFade>
            </div>

            {/* Sort pills — solo desktop */}
            <BlurFade delay={0.2} duration={0.4}>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Ordenar</span>
                <div className="flex gap-1.5">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`
                        px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all
                        ${sortBy === opt.value
                          ? 'bg-orange-500 text-white'
                          : 'bg-[#16161f] text-gray-500 hover:text-white border border-white/5'}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          {/* ── Row: CategoryBar + botón Filtros (mobile) ── */}
          <BlurFade delay={0.25} duration={0.4}>
            <div className="mt-5 flex items-center gap-3">
              {/* Category chips — scrollable */}
              <div className="flex-1 min-w-0">
                <CategoryBar
                  selected={selectedCategory}
                  onSelect={handleCategoryClick}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Botón Filtros — solo mobile (lg:hidden) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className={`
                  lg:hidden shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black
                  uppercase tracking-wide transition-all duration-200 relative
                  ${activeFiltersCount > 0
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'bg-[#16161f] border border-white/10 text-gray-300 hover:border-white/20'}
                `}
              >
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-orange-600 text-[9px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </BlurFade>

          {/* ── Chips de filtros activos (mobile) ── */}
          {activeFiltersCount > 0 && (
            <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {searchQuery.trim() && (
                <ActiveChip label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} />
              )}
              {selectedCategory !== 'all' && (
                <ActiveChip
                  label={selectedCategory}
                  onRemove={() => { setSelectedCategory('all'); setSelectedSubcategory(null); }}
                />
              )}
              {selectedSubcategory && (
                <ActiveChip label={selectedSubcategory} onRemove={() => setSelectedSubcategory(null)} />
              )}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <ActiveChip
                  label={`S/${priceRange[0]} – S/${priceRange[1]}`}
                  onRemove={() => setPriceRange([0, 5000])}
                />
              )}
              <button
                onClick={handleClearAll}
                className="text-[10px] text-gray-600 hover:text-orange-500 uppercase tracking-wider shrink-0 transition-colors ml-1"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Sort select — solo mobile */}
          <div className="lg:hidden mt-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#16161f] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500/40 transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar — solo desktop */}
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
            {sorted.length > 0 ? (
              <>
                {/* Subcategorías inline */}
                {selectedCategory !== 'all' && !selectedSubcategory && (() => {
                  const cat = categories.find((c) => c.name === selectedCategory);
                  return cat?.subcategories?.length > 0 ? (
                    <BlurFade inView delay={0.05} duration={0.3}>
                      <div className="mb-8">
                        <SectionHeader title="Subcategorías" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleSubcategoryClick(selectedCategory, sub.name)}
                              className="bg-[#16161f] border border-white/5 rounded-xl p-4 text-left
                                hover:border-orange-500/30 hover:bg-[#1e1e2a] transition-all group"
                            >
                              <p className="text-xs font-black uppercase tracking-wide text-white
                                group-hover:text-orange-400 transition-colors line-clamp-2">
                                {sub.name}
                              </p>
                              <p className="text-[10px] text-gray-600 mt-1">{sub.count} productos</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </BlurFade>
                  ) : null;
                })()}

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

      {/* ── CATEGORÍAS RELACIONADAS ───────────────────────────── */}
      {(selectedSubcategory || (selectedCategory !== 'all' && !selectedSubcategory)) && (
        <section className="border-t border-white/5 bg-[#111118] py-10 md:py-12">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
            <SectionHeader
              title="Otras categorías"
              action="Ver todo"
              onAction={() => handleCategoryClick('all')}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories
                .filter((c) => c.name !== selectedCategory)
                .map((cat, i) => (
                  <BlurFade key={cat.id} inView delay={i * 0.06} duration={0.35}>
                    <button
                      onClick={() => handleCategoryClick(cat.name)}
                      className="relative overflow-hidden rounded-xl group"
                      style={{ aspectRatio: '1/1' }}
                    >
                      {CATEGORY_IMAGES[cat.name] && (
                        <img
                          src={CATEGORY_IMAGES[cat.name]}
                          alt={cat.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#0a0a0f]/60 group-hover:bg-[#0a0a0f]/40 transition-colors" />
                      <div className="relative h-full flex flex-col justify-end p-3">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white leading-tight">
                          {cat.name}
                        </p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{cat.count} prod.</p>
                      </div>
                      <div className="absolute inset-0 rounded-xl border border-orange-500/0 group-hover:border-orange-500/40 transition-colors" />
                    </button>
                  </BlurFade>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FilterDrawer — solo mobile ────────────────────────── */}
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

      {/* ── WhatsApp flotante ─────────────────────────────────── */}
      <a
        href="https://wa.me/51983955913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E]
          rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
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