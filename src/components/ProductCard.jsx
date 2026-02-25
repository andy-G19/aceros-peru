import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    
    e.target.closest('button').classList.add('scale-95');
    setTimeout(() => {
      e.target.closest('button')?.classList.remove('scale-95');
    }, 100);
  };

  // Usar la primera imagen del array o fallback a image
  const displayImage = product.images ? product.images[0] : product.image;

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Imagen del producto */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 p-4 overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Badge de descuento */}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Botón de favoritos */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-lg">
            favorite_border
          </span>
        </button>
      </div>

      {/* Resto del código igual... */}
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`material-symbols-outlined text-sm ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>
        <div className="mb-4">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through block">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              S/ {product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">
                AHORRA S/ {(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 mb-3 text-xs">
          <span className="material-symbols-outlined text-green-600 text-sm">
            check_circle
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Stock: {product.stock} unidades
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group/btn"
        >
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          <span>Agregar al Carrito</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;