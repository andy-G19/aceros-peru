import React from 'react';
import { useCart } from '../context/CartContext';
import { MagicCard } from './magicui/magic-card';
import { Meteors } from './magicui/meteors';
import { BorderBeam } from './magicui/border-beam';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    const btn = e.currentTarget;
    btn.classList.add('scale-95');
    setTimeout(() => btn.classList.remove('scale-95'), 150);
  };

  const rawImage = product.images ? product.images[0] : product.image;
  const displayImage = rawImage || null;

  return (
    <MagicCard
      onClick={() => onViewDetails(product)}
      className="bg-[#16161f] border border-white/5 rounded-xl overflow-hidden cursor-pointer group hover:border-orange-500/30 transition-all duration-300"
      gradientColor="#ea580c"
      gradientOpacity={0.1}
      gradientSize={200}
    >
      {product.discount > 20 && (
        <BorderBeam size={180} duration={12} colorFrom="#ea580c" colorTo="#f97316" borderWidth={1.5} />
      )}

      {/* Imagen */}
      <div className="relative bg-[#1e1e2a] overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-600 text-4xl">image_not_supported</span>
          </div>
        )}

        {/* Badge descuento */}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 overflow-hidden bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md leading-tight">
            <Meteors number={3} />
            <span className="relative z-10">-{product.discount}%</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Marca */}
        {product.brand && (
          <p className="text-[9px] font-bold text-orange-500/70 uppercase tracking-widest mb-0.5 truncate">
            {product.brand}
          </p>
        )}

        {/* Nombre */}
        <h3 className="text-xs font-bold text-white leading-tight mb-2 line-clamp-2" style={{ minHeight: '2.5rem' }}>
          {product.name}
        </h3>

        {/* Rating compacto */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-[10px] ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>
                star
              </span>
            ))}
          </div>
          <span className="text-[9px] text-gray-600">({product.reviews})</span>
        </div>

        {/* Precio */}
        <div className="mb-3">
          {product.originalPrice && (
            <span className="text-[10px] text-gray-600 line-through block">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-base font-black text-white">
            S/ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-500 active:scale-95 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">shopping_cart</span>
          Agregar
        </button>
      </div>
    </MagicCard>
  );
};

export default ProductCard;