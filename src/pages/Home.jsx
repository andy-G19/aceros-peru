import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { BlurFade } from '../components/magicui/blur-fade';
import { NumberTicker } from '../components/magicui/number-ticker';
import { Particles } from '../components/magicui/particles';
import { ShimmerButton } from '../components/magicui/shimmer-button';
import AboutUs from '../components/AboutUs';
import LocationSection from '../components/LocationSection';
import SubcategoriesShowcase from '../components/SubcategoriesShowcase';

const stats = [
  { value: 50, suffix: '+', label: 'Productos' },
  { value: 100, suffix: '+', label: 'Clientes' },
  { value: 15, suffix: '', label: 'Años en el mercado' },
  { value: 12, suffix: ' meses', label: 'Garantía' },
];

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [heroH, setHeroH] = useState('100svh');

  useEffect(() => {
    const update = () => setHeroH(`${window.innerHeight}px`);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const go = (page) => navigate(`/${page === 'home' ? '' : page}`);
  const goProduct = (product) =>
    navigate(`/product/${product.id}`, { state: { product } });

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: heroH, minHeight: '580px' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/daq3sbggo/image/upload/v1772022472/port_dliyng.png"
            alt="Campo agrícola"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 to-transparent" />
        </div>

        <Particles
          className="absolute inset-0 z-[1]"
          quantity={60}
          ease={80}
          color="#ea580c"
          size={0.4}
          staticity={50}
        />

        <div className="relative z-10 px-5 pb-10 md:pb-14 md:px-10 lg:px-16 max-w-2xl">
          <BlurFade delay={0.1} duration={0.5}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-[3px] h-4 bg-orange-500 rounded-full" />
              <span className="text-orange-400 text-[11px] font-bold tracking-[0.25em] uppercase">
                Colección 2026
              </span>
            </div>
          </BlurFade>

          <h1 className="font-black leading-[0.9] mb-8 tracking-tight">
            <BlurFade delay={0.2} duration={0.5}>
              <span className="block text-white uppercase" style={{ fontSize: 'clamp(2.6rem, 11vw, 5rem)' }}>
                Equipa tu campo
              </span>
            </BlurFade>
            <BlurFade delay={0.35} duration={0.5}>
              <span className="block text-white uppercase" style={{ fontSize: 'clamp(2.6rem, 11vw, 5rem)' }}>
                con las
              </span>
            </BlurFade>
            <BlurFade delay={0.5} duration={0.5}>
              <span className="block text-orange-500 uppercase" style={{ fontSize: 'clamp(2.6rem, 11vw, 5rem)' }}>
                mejores
              </span>
            </BlurFade>
            <BlurFade delay={0.65} duration={0.5}>
              <span className="block text-orange-500 uppercase" style={{ fontSize: 'clamp(2.6rem, 11vw, 5rem)' }}>
                herramientas
              </span>
            </BlurFade>
            <BlurFade delay={0.8} duration={0.5}>
              <span className="block text-orange-500 uppercase" style={{ fontSize: 'clamp(2.6rem, 11vw, 5rem)' }}>
                profesionales
              </span>
            </BlurFade>
          </h1>

          <BlurFade delay={1} duration={0.4}>
            <div className="flex flex-col sm:flex-row gap-3">
              <ShimmerButton
                onClick={() => go('categories')}
                background="rgba(234, 88, 12, 1)"
                shimmerColor="#ffffff"
                shimmerDuration="2s"
                className="flex-1 sm:flex-none justify-center text-sm font-bold tracking-widest uppercase"
              >
                Ver Ofertas &nbsp;→
              </ShimmerButton>
              <button
                onClick={() => go('categories')}
                className="flex-1 sm:flex-none px-6 py-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-white/10 transition-colors"
              >
                Catálogo Completo
              </button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS
      ═══════════════════════════════════════ */}
      <section className="bg-[#111118] border-y border-white/5">
        <div className="grid grid-cols-4 divide-x divide-white/5">
          {stats.map((s, i) => (
            <BlurFade key={s.label} inView delay={i * 0.08} duration={0.4}>
              <div className="py-5 px-2 text-center">
                <p className="text-xl md:text-2xl font-black text-orange-500 leading-none mb-1">
                  <NumberTicker value={s.value} delay={i * 0.1} suffix={s.suffix} />
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ¿QUIÉNES SOMOS? & BENEFICIOS
      ═══════════════════════════════════════ */}
      <AboutUs />

      <section className="border-t border-white/5 bg-[#111118] py-10 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: 'local_shipping',
              title: 'Envíos nacionales',
              desc: 'Cobertura a todo el Perú.',
              delay: 0.1,
            },
            {
              icon: 'verified_user',
              title: 'Garantía de fábrica',
              desc: 'Todos nuestros productos respaldan su calidad con garantía directa.',
              delay: 0.2,
            },
            {
              icon: 'credit_card',
              title: 'Pago seguro',
              desc: 'Tarjetas y transferencia.',
              delay: 0.3,
            },
          ].map((b) => (
            <BlurFade key={b.title} inView delay={b.delay} duration={0.4}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-orange-500 text-xl">{b.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wide">{b.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NUEVO FILTRO: LÍNEAS Y CATEGORÍAS
      ═══════════════════════════════════════ */}
      <SubcategoriesShowcase />

      {/* ═══════════════════════════════════════
          PRODUCTOS DESTACADOS
      ═══════════════════════════════════════ */}
      <section className="px-4 py-10 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Destacados</h2>
            <div className="mt-1.5 h-[3px] w-14 bg-orange-500 rounded-full" />
          </div>
          <button
            onClick={() => go('categories')}
            className="text-xs font-bold text-gray-400 hover:text-orange-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
          >
            Ver Todo <span className="text-base">↗</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.slice(0, 8).map((product, i) => (
            <BlurFade key={product.id} inView delay={i * 0.05} yOffset={12} duration={0.4}>
              <ProductCard product={product} onViewDetails={goProduct} />
            </BlurFade>
          ))}
        </div>

        {products.length > 8 && (
          <BlurFade inView delay={0.3} className="mt-8 text-center">
            <ShimmerButton
              onClick={() => go('categories')}
              background="rgba(234, 88, 12, 1)"
              shimmerColor="#ffffff"
              shimmerDuration="2s"
              className="mx-auto text-sm font-bold tracking-widest uppercase"
            >
              Ver todos los productos &nbsp;→
            </ShimmerButton>
          </BlurFade>
        )}
      </section>

      {/* ═══════════════════════════════════════
          UBICACIÓN Y WHATSAPP
      ═══════════════════════════════════════ */}
      <LocationSection />

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
}