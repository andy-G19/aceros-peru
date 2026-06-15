import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { BlurFade } from '../components/magicui/blur-fade';
import AboutUs from '../components/AboutUs';
import LocationSection from '../components/LocationSection';
import SubcategoriesShowcase from '../components/SubcategoriesShowcase';
import PillarsSection from '../components/PillarsSection';
import OptimizedImage from '../components/OptimizedImage';
import Icon from '../components/Icon';

const HERO_IMAGE = 'https://res.cloudinary.com/daq3sbggo/image/upload/v1772022472/port_dliyng.png';

const stats = [
  { value: 50, suffix: '+', label: 'Lineas de productos' },
  { value: 120, suffix: '+', label: 'Clientes atendidos' },
  { value: 15, suffix: '', label: 'Anos de experiencia' },
  { value: 12, suffix: ' meses', label: 'Garantia tecnica' },
];

export default function Home() {
  const navigate = useNavigate();

  const go = (page) => navigate(`/${page === 'home' ? '' : page}`);
  const goProduct = (product) =>
    navigate(`/product/${product.id}`, { state: { product } });

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <section
        className="relative flex min-h-[calc(100svh-118px)] flex-col justify-end overflow-hidden md:min-h-[calc(100svh-154px)]"
      >
        <OptimizedImage
          src={HERO_IMAGE}
          alt=""
          width={1600}
          mode="limit"
          quality="auto:good"
          sizes="100vw"
          eager
          placeholderBlur={false}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(245,158,11,0.03),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.01),transparent_35%),linear-gradient(135deg,#0b0b0c/40_0%,#15161a/40_45%,#0e1013/40_100%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-35deg,rgba(255,255,255,0.01)_0,rgba(255,255,255,0.01)_2px,transparent_2px,transparent_16px)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 via-[#0a0a0f]/20 to-transparent" />

        <div className="relative z-10 max-w-3xl px-5 pb-10 pt-7 md:px-10 md:pb-14 md:pt-9 lg:px-16 lg:pt-12">
          <div className="mb-5 flex items-center gap-2">
            <div className="h-4 w-[3px] rounded-full bg-amber-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              Linea Industrial 2026
            </span>
          </div>

          <h1 className="mb-8 font-black leading-[0.9] tracking-tight">
              <span className="block text-zinc-100 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                Herramientas de
              </span>
              <span className="block text-zinc-100 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                alto rendimiento
              </span>
              <span className="block text-amber-400 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                para los trabajos
              </span>
              <span className="block text-amber-400 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                más exigentes en
              </span>
              <span className="block text-amber-400 uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                construcción y campo
              </span>
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => go('categories')}
              className="flex-1 rounded-lg bg-amber-500 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:bg-amber-400 sm:flex-none"
            >
              Ver catalogo tecnico 
            </button>
            <button
              onClick={() => go('categories')}
              className="flex-1 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:flex-none"
            >
              Ver productos
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-zinc-900/80">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-4 sm:divide-y-0">
          {stats.map((s, i) => (
            <BlurFade key={s.label} inView delay={i * 0.08} duration={0.4}>
              <div className="px-2 py-5 text-center">
                <p className="mb-1 text-xl font-black leading-none text-amber-400 md:text-2xl">
                  {s.value}{s.suffix}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">{s.label}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      <AboutUs />

      

      <SubcategoriesShowcase />

      <section className="mx-auto max-w-screen-xl px-4 py-10 md:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Destacadas</h2>
            <div className="mt-1.5 h-[3px] w-14 rounded-full bg-amber-500" />
          </div>
          <button
            onClick={() => go('categories')}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-400"
          >
            Ver todo <span className="text-base">-</span>
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
            <button
              onClick={() => go('categories')}
              className="mx-auto rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:bg-amber-400"
            >
              Ver todos los productos 
            </button>
          </BlurFade>
        )}
      </section>

      <LocationSection />
      <section className="border-t border-white/5 bg-zinc-900/80 px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: 'precision_manufacturing',
              title: 'Fabricacion robusta',
              desc: 'Herramientas y piezas pensadas para uso intensivo.',
              delay: 0.1,
            },
            {
              icon: 'verified_user',
              title: 'Garantia real',
              desc: 'Respaldo tecnico y control de calidad en cada lote.',
              delay: 0.2,
            },
            {
              icon: 'support_agent',
              title: 'Asesoria tecnica',
              desc: 'Te ayudamos a elegir soluciones segun tu trabajo.',
              delay: 0.3,
            },
            {
              icon: 'local_shipping',
              title: 'Distribuimos a todo el Perú',
              desc: 'Costa, sierra o selva.',
              delay: 0.4,
            }
          ].map((b) => (
            <BlurFade key={b.title} inView delay={b.delay} duration={0.4}>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                  <Icon name={b.icon} className="text-xl text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-white">{b.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{b.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
      <PillarsSection />

      <a
        href="https://wa.me/51983955913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#128C7E]"
        title="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500" />
      </a>
    </main>
  );
}
