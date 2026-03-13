import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

// Magic UI components
import { Particles } from '../components/magicui/particles';
import { BlurFade } from '../components/magicui/blur-fade';
import { NumberTicker } from '../components/magicui/number-ticker';
import { TextAnimate } from '../components/magicui/text-animate';
import { ShimmerButton } from '../components/magicui/shimmer-button';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Stats para NumberTicker
  const stats = [
    { label: "Productos", value: 150, suffix: "+" },
    { label: "Clientes", value: 2500, suffix: "+" },
    { label: "Años de experiencia", value: 15, suffix: "" },
    { label: "Garantía (meses)", value: 12, suffix: "" },
  ];

  return (
    <main className="min-h-screen pb-16">
      {/* ── HERO SECTION con Particles + TextAnimate + ShimmerButton ── */}
      <section className="bg-gray-900 relative overflow-hidden min-h-[520px] md:min-h-[600px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 opacity-40">
          <img
            alt="Construction site background"
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/daq3sbggo/image/upload/v1772022472/port_dliyng.png"
          />
        </div>

        {/* Particles overlay — interactivo con el mouse */}
        <Particles
          className="absolute inset-0 z-[1]"
          quantity={120}
          ease={80}
          color="#ea580c"
          size={0.5}
          staticity={40}
        />

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-xl">
            <BlurFade delay={0.1} duration={0.5}>
              <span className="inline-block py-1 px-3 rounded bg-orange-600/20 text-orange-500 border border-orange-600 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                Nueva Colección 2026
              </span>
            </BlurFade>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <TextAnimate
                animation="slideUp"
                by="word"
                delay={0.2}
                duration={0.5}
                startOnView={false}
                className="block"
              >
                Equipa tu campo con las
              </TextAnimate>
              <TextAnimate
                animation="slideUp"
                by="word"
                delay={0.5}
                duration={0.5}
                startOnView={false}
                className="block text-orange-500"
              >
                Mejores Herramientas Profesionales
              </TextAnimate>
            </h1>

            <BlurFade delay={0.8} duration={0.5}>
              <p className="text-gray-300 text-lg mb-8">
                Descubre nuestra selección de lampas, picos, aspersores y rastrillos diseñados para durar.
                Resistencia y ergonomía al mejor precio.
              </p>
            </BlurFade>

            <BlurFade delay={1} duration={0.5}>
              <div className="flex gap-4 flex-wrap">
                <ShimmerButton
                  onClick={() => handleNavigate('categories')}
                  background="rgba(234, 88, 12, 1)"
                  shimmerColor="#ffffff"
                  shimmerDuration="2.5s"
                  className="font-semibold text-base shadow-lg shadow-orange-600/30"
                >
                  <span className="material-symbols-outlined text-lg">local_offer</span>
                  Ver Ofertas
                </ShimmerButton>

                <button
                  onClick={() => handleNavigate('categories')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Catálogo Completo
                </button>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* ── STATS CON NUMBER TICKER ── */}
      <section className="bg-slate-800 border-y border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1} inView duration={0.5}>
                <div>
                  <p className="text-3xl font-black text-orange-500">
                    <NumberTicker
                      value={stat.value}
                      delay={i * 0.15}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS con BlurFade ── */}
      <section className="container mx-auto px-4 py-12">
        <BlurFade inView delay={0.1}>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
            Explora por Categoría
          </h2>
        </BlurFade>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, i) => (
            <BlurFade key={category.id} inView delay={0.05 + i * 0.06} yOffset={8}>
              <button
                onClick={() => handleNavigate('categories')}
                className="group w-full bg-slate-900 rounded-xl p-6 border border-gray-700 hover:border-orange-600 transition-all hover:shadow-lg hover:shadow-orange-600/10 hover:-translate-y-1 duration-300"
              >
                <div className="bg-orange-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-3 group-hover:bg-orange-600 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600 group-hover:text-white text-3xl">
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {category.count} productos
                </p>
              </button>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS con BlurFade ── */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <BlurFade inView>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
              Productos Destacados
            </h2>
          </BlurFade>
          <button
            onClick={() => handleNavigate('categories')}
            className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center gap-1"
          >
            Ver todos
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, i) => (
            <BlurFade key={product.id} inView delay={i * 0.05} yOffset={10}>
              <ProductCard
                product={product}
                onViewDetails={handleViewProduct}
              />
            </BlurFade>
          ))}
        </div>

        {products.length > 8 && (
          <BlurFade inView delay={0.4} className="text-center mt-10">
            <ShimmerButton
              onClick={() => handleNavigate('categories')}
              background="rgba(234, 88, 12, 0.9)"
              shimmerColor="#ffffff"
              shimmerDuration="3s"
              className="font-semibold text-base mx-auto"
            >
              Ver todos los productos
              <span className="material-symbols-outlined">arrow_forward</span>
            </ShimmerButton>
          </BlurFade>
        )}
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="bg-gray-800 py-12 border-y border-gray-700 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "local_shipping",
                color: "text-green-400",
                bg: "bg-green-900/30",
                title: "Envíos a todo el país",
                desc: "Cobertura nacional con seguimiento en tiempo real de tu pedido.",
                delay: 0.1,
              },
              {
                icon: "verified_user",
                color: "text-blue-400",
                bg: "bg-blue-900/30",
                title: "Garantía Asegurada",
                desc: "Todos nuestros productos cuentan con garantía directa de fábrica.",
                delay: 0.2,
              },
              {
                icon: "credit_card",
                color: "text-orange-600",
                bg: "bg-orange-900/30",
                title: "Pago 100% Seguro",
                desc: "Aceptamos todas las tarjetas y pago en cuotas sin intereses.",
                delay: 0.3,
              },
            ].map((item) => (
              <BlurFade key={item.title} inView delay={item.delay}>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors">
                  <div className={`${item.bg} p-3 rounded-full ${item.color} flex-shrink-0`}>
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/51983955913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center group transition-all duration-300 hover:scale-110 hover:shadow-green-500/50"
        title="Contactar por WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          Online
        </span>
      </a>
    </main>
  );
};

export default Home;