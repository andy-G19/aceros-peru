import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            alt="Construction site background"
            className="w-full h-full object-cover"
            src="https://res.cloudinary.com/daq3sbggo/image/upload/v1772022472/port_dliyng.png"
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 rounded bg-orange-600/20 text-orange-500 border border-orange-600 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
              Nueva Colección 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Equipa tu campo con las <br />
              <span className="text-orange-500">Mejores Herramientas Profesionales</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Descubre nuestra selección de lampas, picos, aspersores y rastrillos diseñados para durar. 
              Resistencia y ergonomía al mejor precio.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigate('categories')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30"
              >
                Ver Ofertas
              </button>
              <button
                onClick={() => handleNavigate('categories')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Catálogo Completo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
          Explora por Categoría
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleNavigate('categories')}
              className="group bg-slate-900 rounded-xl p-6 border border-gray-700 hover:border-orange-600 transition-all hover:shadow-lg"
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
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
            Productos Destacados
          </h2>
          <button
            onClick={() => handleNavigate('categories')}
            className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center gap-1"
          >
            Ver todos
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-gray-800 py-12 border-y border-gray-700 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="bg-green-900/30 p-3 rounded-full text-green-400">
                <span className="material-symbols-outlined text-3xl">local_shipping</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Envíos a todo el país
                </h3>
                <p className="text-gray-400 text-sm">
                  Cobertura nacional con seguimiento en tiempo real de tu pedido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="bg-blue-900/30 p-3 rounded-full text-blue-400">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Garantía Asegurada
                </h3>
                <p className="text-gray-400 text-sm">
                  Todos nuestros productos cuentan con garantía directa de fábrica.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="bg-orange-900/30 p-3 rounded-full text-orange-600">
                <span className="material-symbols-outlined text-3xl">credit_card</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Pago 100% Seguro
                </h3>
                <p className="text-gray-400 text-sm">
                  Aceptamos todas las tarjetas y pago en cuotas sin intereses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/51983955913"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center group transition-all duration-300 hover:scale-110 hover:shadow-green-500/50"
        title="Contactar por WhatsApp"
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
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