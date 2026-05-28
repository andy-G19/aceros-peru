import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from './magicui/blur-fade';
import { categories } from '../data/categories';

/* ─── Imágenes por subcategoría ───────────────────────────────
   🔁 REEMPLAZA estas URLs con tus fotos reales en Cloudinary
──────────────────────────────────────────────────────────────── */
const SUBCATEGORY_IMAGES = {
  // Herramientas Acero
  'Lampas':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304058/Lampa_Extra_Grande_v4m0n2.jpg',
  'Rejillas':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304127/Rejilla_Triangulo_xzii78.jpg',
  // Herramientas Ganzo
  'Lampas Ganzo':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1779507755/Lganzo_gusark.jpg',
  'Lampas Tipo Cuchara':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1779507755/Cganzo_rr45qe.jpg',
  'Lampas Tipo Pala':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1779507755/Pganzo_pdtipk.jpg',
  'Rejillas Ganzo':
    'https://res.cloudinary.com/daq3sbggo/image/upload/v1779507756/Rganzo_m4z4sy.jpg',
};

/* ─── Descripción por subcategoría ───────────────────────────── */
const SUBCATEGORY_DESC = {
  'Lampas':              'Forjadas en acero nacional, disponibles en 6 tamaños.',
  'Rejillas':            'Bieldos de alta penetración para cosecha y cultivo.',
  'Lampas Ganzo':        'Lampas forjadas de calidad profesional en múltiples tamaños.',
  'Lampas Tipo Cuchara': 'Diseño cóncavo para áridos y mezclas de concreto.',
  'Lampas Tipo Pala':    'Punta cuadrada para cortes limpios en terrenos duros.',
  'Rejillas Ganzo':      'Puntas templadas para suelos compactos y pedregosos.',
};

/* ─── Icono por subcategoría ──────────────────────────────────── */
const SUBCATEGORY_ICONS = {
  'Lampas':              'agriculture',
  'Rejillas':            'grass',
  'Lampas Ganzo':        'agriculture',
  'Lampas Tipo Cuchara': 'water_drop',
  'Lampas Tipo Pala':    'construction',
  'Rejillas Ganzo':      'yard',
};

/* ─── Solo categorías con subcategorías ──────────────────────── */
const CATS_WITH_SUBS = categories.filter(
  (c) => c.subcategories && c.subcategories.length > 0
);

export default function SubcategoriesShowcase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(CATS_WITH_SUBS[0]?.id ?? null);

  const activeCat = CATS_WITH_SUBS.find((c) => c.id === activeTab);
  const subs = activeCat?.subcategories ?? [];

  const handleSubClick = (catName, subName) => {
    // Navega a /categories con el state necesario para que Categories.jsx seleccione la sub
    navigate('/categories', {
      state: { category: catName, subcategory: subName },
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#0d0d14] py-16 md:py-24">
      {/* Decoración fondo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── HEADER ── */}
        <BlurFade inView delay={0.05} duration={0.5}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-5 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.3em]">
              Líneas de Producto
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-1">
                Explora
              </h2>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-orange-500 leading-none">
                Nuestras Líneas
              </h2>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Cada línea está diseñada para un uso específico. Elige la que mejor se adapta a tu trabajo.
            </p>
          </div>
        </BlurFade>

        {/* ── TABS de categoría ── */}
        <BlurFade inView delay={0.1} duration={0.4}>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {CATS_WITH_SUBS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase
                  tracking-widest transition-all duration-200
                  ${activeTab === cat.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-[#16161f] border border-white/5 text-gray-400 hover:text-white hover:border-white/15'}
                `}
              >
                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </BlurFade>

        {/* ── GRID de subcategorías ── */}
        {activeCat && (
          <div key={activeCat.id}>
            {/* Layout especial: primera card grande + resto pequeñas */}
            {subs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {subs.map((sub, i) => {
                  const img  = SUBCATEGORY_IMAGES[sub.name];
                  const desc = SUBCATEGORY_DESC[sub.name];
                  const icon = SUBCATEGORY_ICONS[sub.name] ?? 'handyman';
                  const isFeatured = i === 0;

                  return (
                    <BlurFade
                      key={sub.id}
                      inView
                      delay={i * 0.07}
                      duration={0.4}
                      className={isFeatured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
                    >
                      <button
                        onClick={() => handleSubClick(activeCat.name, sub.name)}
                        className={`
                          group relative overflow-hidden rounded-2xl w-full text-left
                          border border-white/5 hover:border-orange-500/40
                          transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10
                          ${isFeatured ? 'h-80 lg:h-full' : 'h-52'}
                        `}
                        style={{ minHeight: isFeatured ? '320px' : '208px' }}
                      >
                        {/* Imagen */}
                        {img ? (
                          <img
                            src={img}
                            alt={sub.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#1a1a28]" />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 group-hover:via-black/40 transition-all duration-300" />

                        {/* Línea naranja superior al hover */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                        {/* Badge categoría */}
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-orange-500 text-sm">{icon}</span>
                            <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">
                              {activeCat.name}
                            </span>
                          </div>
                        </div>

                        {/* Flecha */}
                        <div className={`
                          absolute top-4 right-4 flex items-center justify-center rounded-full
                          bg-black/40 backdrop-blur-sm border border-white/10
                          group-hover:bg-orange-500 group-hover:border-orange-500
                          transition-all duration-200
                          ${isFeatured ? 'w-9 h-9' : 'w-8 h-8'}
                        `}>
                          <span className="text-white text-sm font-bold">→</span>
                        </div>

                        {/* Contenido inferior */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className={`
                            font-black uppercase leading-tight tracking-tight text-white
                            group-hover:text-orange-400 transition-colors duration-200
                            ${isFeatured ? 'text-2xl mb-2' : 'text-base mb-1.5'}
                          `}>
                            {sub.name}
                          </h3>

                          {desc && (
                            <p className={`text-gray-400 leading-relaxed ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                              {desc}
                            </p>
                          )}

                          {/* Footer */}
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full">
                              <span className="material-symbols-outlined text-orange-500 text-xs">inventory_2</span>
                              <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">
                                {sub.count} productos
                              </span>
                            </div>
                            <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold group-hover:text-orange-500 transition-colors">
                              Ver línea →
                            </span>
                          </div>
                        </div>
                      </button>
                    </BlurFade>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── CTA inferior ── */}
        <BlurFade inView delay={0.2} duration={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4
            p-5 rounded-2xl bg-[#111118] border border-white/5">
            <div>
              <p className="text-sm font-black text-white uppercase tracking-wide mb-0.5">
                ¿No encuentras lo que buscas?
              </p>
              <p className="text-xs text-gray-500">
                Escríbenos por WhatsApp y te asesoramos en tu pedido al por mayor.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://wa.me/51983955913"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Cotizar ahora
              </a>
              <button
                onClick={() => navigate('/categories')}
                className="px-5 py-3 bg-[#16161f] border border-white/10 text-gray-300 text-xs font-black uppercase tracking-widest rounded-xl hover:border-white/20 transition-all active:scale-95"
              >
                Ver catálogo
              </button>
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}