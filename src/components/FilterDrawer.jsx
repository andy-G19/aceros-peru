import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────
   FilterDrawer — panel lateral deslizable de filtros
   Props:
     open          boolean  — si está visible
     onClose       fn       — cerrar el drawer
     categories    array    — lista de categorías del proyecto
     selectedCat   string   — categoría activa ('all' | name)
     selectedSub   string   — subcategoría activa (null | name)
     priceRange    [min,max]
     onApply       fn({ category, subcategory, priceRange })
     onClear       fn()
───────────────────────────────────────────────────────── */
export default function FilterDrawer({
  open,
  onClose,
  categories = [],
  selectedCat = 'all',
  selectedSub = null,
  priceRange = [0, 5000],
  onApply,
  onClear,
}) {
  /* ── local draft state (no se aplica hasta "Aplicar") ── */
  const [draftCat, setDraftCat]   = useState(selectedCat);
  const [draftSub, setDraftSub]   = useState(selectedSub);
  const [draftMin, setDraftMin]   = useState(priceRange[0]);
  const [draftMax, setDraftMax]   = useState(priceRange[1]);
  const [expanded, setExpanded]   = useState({});      // accordion

  const MAX_PRICE = 5000;
  const drawerRef  = useRef(null);

  /* sync cuando cambia desde afuera */
  useEffect(() => {
    setDraftCat(selectedCat);
    setDraftSub(selectedSub);
    setDraftMin(priceRange[0]);
    setDraftMax(priceRange[1]);
  }, [open, selectedCat, selectedSub, priceRange[0], priceRange[1]]);

  /* bloquear scroll del body cuando está abierto */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* cerrar al tocar el backdrop */
  function handleBackdrop(e) {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) onClose();
  }

  function toggleAccordion(name) {
    setExpanded(p => ({ ...p, [name]: !p[name] }));
  }

  function selectCat(name) {
    if (draftCat === name) {
      setDraftCat('all');
      setDraftSub(null);
    } else {
      setDraftCat(name);
      setDraftSub(null);
    }
  }

  function selectSub(catName, subName) {
    setDraftCat(catName);
    setDraftSub(prev => (prev === subName ? null : subName));
  }

  function handleClear() {
    setDraftCat('all');
    setDraftSub(null);
    setDraftMin(0);
    setDraftMax(MAX_PRICE);
    onClear?.();
    onClose();
  }

  function handleApply() {
    onApply?.({ category: draftCat, subcategory: draftSub, priceRange: [draftMin, draftMax] });
    onClose();
  }

  /* slider thumb % */
  const pctMin = (draftMin / MAX_PRICE) * 100;
  const pctMax = (draftMax / MAX_PRICE) * 100;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={handleBackdrop}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          background: open ? 'rgba(0,0,0,0.65)' : 'transparent',
          backdropFilter: open ? 'blur(3px)' : 'none',
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />

      {/* ── Drawer panel ── */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-full flex flex-col bg-[#0f1117] shadow-2xl"
        style={{
          width: 'min(88vw, 400px)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
          willChange: 'transform',
        }}
        aria-label="Panel de filtros"
      >

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500 text-xl">tune</span>
            <h2 className="text-base font-black uppercase tracking-[0.2em] text-white">Filtros</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Cerrar filtros"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-8">

          {/* ── CATEGORÍAS ── */}
          <section>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">
              Categorías
            </p>

            {/* "Todas" option */}
            <button
              onClick={() => { setDraftCat('all'); setDraftSub(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 text-left ${
                draftCat === 'all'
                  ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                  : 'bg-[#1a1c26] border border-transparent text-gray-400 hover:border-white/10'
              }`}
            >
              <span className={`material-symbols-outlined text-xl ${draftCat === 'all' ? 'text-orange-500' : 'text-gray-500'}`}>
                apps
              </span>
              <span className="text-sm font-bold">Todas las categorías</span>
            </button>

            {/* Category list */}
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const isActive = draftCat === cat.name && draftSub === null;
                const hasSubcats = cat.subcategories && cat.subcategories.length > 0;
                const isOpen = expanded[cat.name];

                return (
                  <div key={cat.id}>
                    {/* Category row */}
                    <div
                      className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 ${
                        isActive
                          ? 'bg-orange-500/25 border border-orange-500/50'
                          : 'bg-[#1a1c26] border border-transparent hover:border-white/8'
                      }`}
                    >
                      {/* Main click area */}
                      <button
                        onClick={() => selectCat(cat.name)}
                        className="flex items-center gap-3 flex-1 px-4 py-3 text-left"
                      >
                        <span className={`material-symbols-outlined text-xl ${isActive ? 'text-orange-500' : 'text-gray-500'}`}>
                          {cat.icon}
                        </span>
                        <span className={`text-sm font-bold flex-1 ${isActive ? 'text-orange-400' : 'text-gray-300'}`}>
                          {cat.name}
                        </span>
                      </button>

                      {/* Accordion toggle */}
                      {hasSubcats && (
                        <button
                          onClick={() => toggleAccordion(cat.name)}
                          className="px-3 py-3 text-gray-500 hover:text-orange-400 transition-colors"
                          aria-label="Expandir subcategorías"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Subcategories accordion */}
                    {hasSubcats && (
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: isOpen ? `${cat.subcategories.length * 52}px` : '0px' }}
                      >
                        <div className="ml-4 mt-1 pl-4 border-l-2 border-white/5 space-y-1 pb-1">
                          {cat.subcategories.map((sub) => {
                            const isSubActive = draftCat === cat.name && draftSub === sub.name;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => selectSub(cat.name, sub.name)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center justify-between group ${
                                  isSubActive
                                    ? 'bg-orange-500/15 text-orange-400 font-bold'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                }`}
                              >
                                <span>{sub.name}</span>
                                {isSubActive && (
                                  <svg className="w-3.5 h-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── RANGO DE PRECIO ── */}
          <section>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-5">
              Rango de Precio
            </p>

            {/* Dual range slider (CSS trick) */}
            <div className="relative mb-6 px-1">
              {/* Track background */}
              <div className="relative h-1.5 rounded-full bg-[#1a1c26]">
                {/* Active range fill */}
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400"
                  style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
                />
              </div>

              {/* Min thumb */}
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10}
                value={draftMin}
                onChange={(e) => {
                  const v = Math.min(+e.target.value, draftMax - 10);
                  setDraftMin(v);
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2.5"
                style={{ zIndex: draftMin > MAX_PRICE * 0.95 ? 5 : 3 }}
              />

              {/* Max thumb */}
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10}
                value={draftMax}
                onChange={(e) => {
                  const v = Math.max(+e.target.value, draftMin + 10);
                  setDraftMax(v);
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2.5"
                style={{ zIndex: 4 }}
              />

              {/* Visual thumbs */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-lg shadow-orange-500/40 pointer-events-none"
                style={{ left: `calc(${pctMin}% - 10px)` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow-lg shadow-orange-500/40 pointer-events-none"
                style={{ left: `calc(${pctMax}% - 10px)` }}
              />
            </div>

            {/* Min / Max inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1a1c26] rounded-xl px-4 py-3 border border-white/5">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Mínimo</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">S/</span>
                  <input
                    type="number"
                    min={0}
                    max={draftMax - 10}
                    step={10}
                    value={draftMin}
                    onChange={(e) => setDraftMin(Math.min(+e.target.value, draftMax - 10))}
                    className="bg-transparent text-base font-black text-white w-full outline-none"
                  />
                </div>
              </div>
              <div className="bg-[#1a1c26] rounded-xl px-4 py-3 border border-white/5">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Máximo</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">S/</span>
                  <input
                    type="number"
                    min={draftMin + 10}
                    max={MAX_PRICE}
                    step={10}
                    value={draftMax}
                    onChange={(e) => setDraftMax(Math.max(+e.target.value, draftMin + 10))}
                    className="bg-transparent text-base font-black text-white w-full outline-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Footer sticky — botones ── */}
        <div className="flex-shrink-0 px-5 py-4 border-t border-white/5 space-y-3 bg-[#0f1117]">
          {/* Limpiar */}
          <button
            onClick={handleClear}
            className="w-full py-3.5 rounded-2xl border border-white/10 bg-white/5 text-gray-300 text-sm font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
          >
            Limpiar Filtros
          </button>

          {/* Aplicar */}
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-600/30 hover:shadow-orange-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            Aplicar Selección
          </button>
        </div>
      </aside>

      {/* ── Custom range input styles ── */}
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 0; height: 0; }
        input[type=range]::-moz-range-thumb { width: 0; height: 0; border: 0; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </>
  );
}