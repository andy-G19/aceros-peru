import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = location.state?.product || products.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Producto no encontrado</p>
          <button
            onClick={() => navigate('/categories')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`¡${product.name} agregado al carrito!`);
  };

  // Usar las imágenes del producto o fallback a una imagen por defecto
  const images = product.images || [product.image, product.image, product.image];

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-orange-600">
            Inicio
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <button onClick={() => navigate('/categories')} className="hover:text-orange-600">
            Categorías
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white font-medium truncate max-w-md">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galería de Imágenes */}
          <div>
            <div className="bg-slate-900 rounded-xl border border-gray-700 p-8 mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-slate-900 rounded-lg border-2 p-3 hover:border-orange-600 transition-colors ${
                    selectedImage === index
                      ? 'border-orange-600'
                      : 'border-gray-700'
                  }`}
                >
                  <img src={img} alt={`Vista ${index + 1}`} className="w-full h-20 object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Información del Producto */}
          <div>
            <div className="bg-slate-900 rounded-xl border border-gray-700 p-8">
              {/* Marca */}
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
                {product.brand}
              </p>

              {/* Nombre */}
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>

              {/* Rating y Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    >
                      star
                    </span>
                  ))}
                  <span className="text-sm text-gray-400 ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  ({product.reviews} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                {product.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg text-gray-400 line-through">
                      S/ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}% OFF
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white">
                    S/ {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400">
                    IGV Incluido
                  </span>
                </div>
                {product.originalPrice && (
                  <p className="text-green-400 font-medium mt-2">
                    ¡Ahorras S/ {(product.originalPrice - product.price).toFixed(2)}!
                  </p>
                )}
              </div>

              {/* Stock */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  <span className="text-sm text-gray-300 font-medium">
                    Disponible - {product.stock} unidades en stock
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Vendido por: <span className="text-orange-600 font-medium">{product.seller}</span>
                </p>
              </div>

              {/* Cantidad */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-800 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-400 hover:text-orange-600 transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, +e.target.value)))}
                      className="w-16 bg-transparent border-none text-center text-lg font-bold text-white focus:ring-0"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-3 text-gray-400 hover:text-orange-600 transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    Máximo {product.stock} unidades
                  </span>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  Agregar al Carrito
                </button>
                <button className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 rounded-lg font-bold text-lg transition-all">
                  Comprar Ahora
                </button>
                <button className="w-full border-2 border-gray-700 hover:border-orange-600 text-gray-300 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">favorite_border</span>
                  Agregar a Favoritos
                </button>
              </div>

              {/* Características adicionales */}
              <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-green-600">local_shipping</span>
                  <span className="text-gray-300">
                    Envío gratis en compras mayores a S/299
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-blue-600">verified_user</span>
                  <span className="text-gray-300">
                    Garantía de fábrica incluida
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-orange-600">refresh</span>
                  <span className="text-gray-300">
                    Devoluciones fáciles en 30 días
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del Producto */}
        <div className="bg-slate-900 rounded-xl border border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Descripción del Producto
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Especificaciones */}
            <div>
              <h3 className="font-bold text-white mb-3 text-lg">
                Especificaciones:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {product.specifications && product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-orange-600 text-sm mt-0.5">check</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usos Recomendados */}
            <div>
              <h3 className="font-bold text-white mb-3 text-lg">
                Usos Recomendados:
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {product.recommendations && product.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-orange-600 text-sm mt-0.5">check</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;