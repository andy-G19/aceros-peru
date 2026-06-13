import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from './magicui/blur-fade';
import { categories } from '../data/categories';
import OptimizedImage from './OptimizedImage';
import Icon from './Icon';

// ── IMÁGENES (Ajustadas conceptualmente a 1150x600) ──
const SUBCATEGORY_IMAGES = {
  'Lampas': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780403563/29_hvntwi.jpg',
  'Rejillas': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780403563/30_b4z1iw.jpg',
  'Lampas Ganzo': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104118/16_jlzpw0.jpg',
  'Lampas Tipo Cuchara': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104119/17_ijxwjq.jpg',
  'Lampas Tipo Pala': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104119/18_igiazx.jpg',
  'Rejillas Ganzo': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780104120/19_nuut3x.jpg',
};

// Se agregó parámetros a las de Unsplash para forzar el recorte a 1150x600
const MAIN_CATEGORY_IMAGES = {
  'Rastrillos': null,
  'Herramientas de Construccion': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780097013/Construcciom_r2nzii.jpg',
  'Trípodes para Aspersor': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780096281/Trripiodes_nmjhh0.png',
  'Herramientas de Jardinería': 'https://res.cloudinary.com/daq3sbggo/image/upload/v1780095441/PreJardin_tx6yj1.png',
  'Otros': null,
};

const SUBCATEGORY_DESC = {
  'Lampas': 'Forjadas en acero nacional, disponibles en 6 tamaños.',
  'Rejillas': 'Bieldos de alta penetración para cosecha y cultivo.',
  'Lampas Ganzo': 'Lampas forjadas de calidad profesional en múltiples tamaños.',
  'Lampas Tipo Cuchara': 'Diseño cóncavo para áridos y mezclas de concreto.',
  'Lampas Tipo Pala': 'Punta cuadrada para cortes limpios en terrenos duros.',
  'Rejillas Ganzo': 'Puntas templadas para suelos compactos y pedregosos.',
};

const SUBCATEGORY_ICONS = {
  'Lampas': 'agriculture',
  'Rejillas': 'grass',
  'Lampas Ganzo': 'agriculture',
  'Lampas Tipo Cuchara': 'water_drop',
  'Lampas Tipo Pala': 'construction',
  'Rejillas Ganzo': 'yard',
};

export default function SubcategoriesShowcase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? null);

  const activeCat = categories.find((c) => c.id === activeTab);
  const subs = activeCat?.subcategories ?? [];

  const handleSubClick = (catName, subName) => {
    navigate('/categories', {
      state: { category: catName, subcategory: subName },
    });
  };

  const handleMainCatClick = (catName) => {
    navigate('/categories', {
      state: { category: catName },
    });
  };

  return (
    <section id="explora" className="relative overflow-hidden bg-[#0d0d14] py-16 md:py-24">
      {/* ── FONDOS Y EFECTOS ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      {/* ── CONTENEDOR PRINCIPAL ── */}
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center">

        {/* ── HEADER ── */}
        <BlurFade inView delay={0.05} duration={0.5} className="w-full max-w-[1150px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-5 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-black text-amber-500/70 uppercase tracking-[0.3em]">
              Catálogo 2026
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-1">
                Explora
              </h2>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-amber-500 leading-none">
                Nuestras Líneas
              </h2>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Filtra por categoría para encontrar las herramientas especializadas para tu trabajo.
            </p>
          </div>
        </BlurFade>

        {/* ── TABS DE FILTRO ── */}
        <BlurFade inView delay={0.1} duration={0.4} className="w-full max-w-[1150px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 pb-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  w-full h-11 md:h-12 px-3 md:px-4 rounded-xl text-[11px] md:text-xs font-black uppercase
                  tracking-widest transition-all duration-200
                  flex items-center justify-center text-center
                  ${activeTab === cat.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-[#16161f] border border-white/5 text-zinc-400 hover:text-white hover:border-white/15 hover:bg-[#1a1a24]'}
                `}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </BlurFade>

        {/* ── CONTENIDO DEL FILTRO (CARDS A 1150x600px) ── */}
        {activeCat && (
          <div key={activeCat.id} className="w-full max-w-[1150px] min-h-[600px]">
            
            {/* ESCENARIO A: La categoría tiene subcategorías */}
            {subs.length > 0 ? (
              <div className="flex flex-col gap-8">
                {subs.map((sub, i) => {
                  const img  = SUBCATEGORY_IMAGES[sub.name];
                  const desc = SUBCATEGORY_DESC[sub.name];
                  const icon = SUBCATEGORY_ICONS[sub.name] ?? 'handyman';

                  return (
                    <BlurFade key={sub.id} inView delay={i * 0.1} duration={0.5}>
                      <button
                        onClick={() => handleSubClick(activeCat.name, sub.name)}
                        className="group relative overflow-hidden rounded-[2rem] w-full text-left border border-white/5 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 h-[400px] md:h-[600px]"
                      >
                        {img ? (
                          <OptimizedImage
                            src={img}
                            alt={sub.name}
                            width={1150}
                            height={600}
                            mode="fill"
                            sizes="(max-width: 768px) 100vw, 1150px"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#1a1a28]" />
                        )}

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/30 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                        {/* Top Badge */}
                        <div className="absolute top-6 left-6 md:top-8 md:left-8">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                            <Icon name={icon} className="text-amber-500 text-lg" />
                            <span className="text-xs font-black text-white/90 uppercase tracking-widest">
                              {activeCat.name}
                            </span>
                          </div>
                        </div>

                        {/* Flecha Hover */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 transform group-hover:rotate-45">
                          <span className="text-white text-xl font-bold">↗</span>
                        </div>

                        {/* Contenido Textual (Más grande para el formato 1150x600) */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 w-full md:w-3/4 lg:w-2/3">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase text-white mb-4 group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                            {sub.name}
                          </h3>

                          {desc && (
                            <p className="text-zinc-300 text-sm md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8">
                              {desc}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 px-4 py-2 rounded-full">
                              <Icon name="inventory_2" className="text-amber-500 text-sm md:text-base" />
                              <span className="text-[10px] md:text-xs font-black text-amber-400 uppercase tracking-widest">
                                {sub.count} productos disponibles
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                              Explorar Línea <span className="text-lg leading-none">→</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </BlurFade>
                  );
                })}
              </div>
            ) : (
              /* ESCENARIO B: Categorías sin subcategorías (Banner directo) */
              <BlurFade inView delay={0.1} duration={0.5}>
                <button
                  onClick={() => handleMainCatClick(activeCat.name)}
                  className="group relative overflow-hidden rounded-[2rem] w-full text-left border border-white/5 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 h-[400px] md:h-[600px]"
                >
                  <OptimizedImage
                    src={MAIN_CATEGORY_IMAGES[activeCat.name] || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1150&h=600&fit=crop'}
                    alt={activeCat.name}
                    width={1150}
                    height={600}
                    mode="fill"
                    sizes="(max-width: 768px) 100vw, 1150px"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-[#0a0a0f]/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4 lg:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                       <Icon name={activeCat.icon} className="text-amber-500 text-2xl md:text-3xl" />
                       <span className="text-xs md:text-sm font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                         {activeCat.count} Productos
                       </span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase text-white mb-4 group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                      {activeCat.name}
                    </h3>
                    <p className="text-zinc-300 mb-8 text-sm md:text-lg lg:text-xl leading-relaxed">
                      {activeCat.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-4 rounded-xl text-xs md:text-sm font-black uppercase tracking-widest group-hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25">
                      Ver Todos Los Productos <span className="text-xl leading-none">→</span>
                    </div>
                  </div>
                </button>
              </BlurFade>
            )}
          </div>
        )}

        {/* ── CTA INFERIOR ── */}
        <BlurFade inView delay={0.2} duration={0.4} className="w-full max-w-[1150px]">
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-[2rem] bg-[#111118] border border-white/5">
            <div>
              <p className="text-base md:text-lg font-black text-white uppercase tracking-wide mb-1">
                ¿No encuentras lo que buscas?
              </p>
              <p className="text-sm text-zinc-500">
                Escríbenos por WhatsApp y te asesoramos en tu pedido al por mayor.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://wa.me/51983955913"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-[#25D366]/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Cotizar ahora
              </a>
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
