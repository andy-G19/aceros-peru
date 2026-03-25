import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

/* ── Helpers ─────────────────────────────────────────── */
function parseSpec(str) {
  const idx = str.indexOf(':');
  if (idx === -1) return { label: str, value: '' };
  return { label: str.slice(0, idx).trim(), value: str.slice(idx + 1).trim() };
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`w-4 h-4 ${n <= Math.round(rating) ? 'text-orange-500' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product =
    location.state?.product || products.find((p) => p.id === parseInt(id));

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center px-6">
          <span className="material-symbols-outlined text-6xl text-gray-700 mb-4 block">
            inventory_2
          </span>
          <p className="text-gray-400 mb-6 text-lg">Producto no encontrado</p>
          <button
            onClick={() => navigate('/categories')}
            className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-xl font-bold"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  /* Images — filter out empty strings */
  const rawImages = (product.images || [product.image]).filter(Boolean);
  const images = rawImages.length ? rawImages : [null];

  /* Specs parsed */
  const specsRaw = product.specifications || [];
  const specsParsed = specsRaw.map(parseSpec);

  /* Quick-access specs (first 4 for the grid) */
  const quickSpecs = specsParsed.slice(0, 4);

  /* Technical details (all specs) */
  const techSpecs = specsParsed;

  /* Savings */
  const savings =
    product.originalPrice && product.discount > 0
      ? (product.originalPrice - product.price).toFixed(2)
      : null;

  /* WhatsApp message */
  const waText = encodeURIComponent(
    `Hola, me interesa el producto:\n*${product.name}*\nPrecio: S/ ${product.price.toFixed(2)}\n\n¿Está disponible?`
  );

  function handleAddToCart() {
    addToCart(product, qty);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-28">

      {/* ── Breadcrumb / Back ───────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Volver</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 pb-10 lg:max-w-5xl">

        {/* ── Category badge ──────────────────────── */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-orange-600/20 border border-orange-600/40 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-xs">category</span>
            {product.category}
          </span>
        </div>

        {/* ── Desktop: 2-col layout ── */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">

          {/* ═══ LEFT COL — Image card ═══════════════ */}
          <div>
            {/* Main image card */}
            <div className="relative bg-[#111118] rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-3">

              {/* Stock badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0a0a0f]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">
                  Stock Disponible
                </span>
              </div>

              {/* Favorite button */}
              <button
                onClick={() => setLiked((p) => !p)}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${
                  liked
                    ? 'bg-red-500 border-red-400 shadow-lg shadow-red-500/40'
                    : 'bg-[#0a0a0f]/70 border-white/10 hover:border-red-400/50'
                }`}
                aria-label="Favorito"
              >
                <svg
                  className={`w-4 h-4 transition-all ${liked ? 'text-white fill-white' : 'text-red-400 fill-none'}`}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Main image */}
              <div className="aspect-square flex items-center justify-center p-6 sm:p-10">
                {images[activeImg] ? (
                  <img
                    src={images[activeImg]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-opacity duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-600">
                    <span className="material-symbols-outlined text-6xl">image_not_supported</span>
                    <span className="text-sm">Sin imagen</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                      activeImg === i
                        ? 'border-orange-500 shadow-md shadow-orange-500/30 scale-105'
                        : 'border-white/10 opacity-50 hover:opacity-80'
                    }`}
                  >
                    {img ? (
                      <img src={img} alt="" className="w-full h-full object-contain p-1 bg-[#111118]" />
                    ) : (
                      <div className="w-full h-full bg-[#111118] flex items-center justify-center">
                        <span className="material-symbols-outlined text-xs text-gray-600">image</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ═══ RIGHT COL — Product info ════════════ */}
          <div className="mt-6 lg:mt-0">

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} />
              <span className="text-xs text-gray-500">
                ({product.reviews} Reseñas)
              </span>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white mb-3">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Price block */}
            <div className="mb-5">
              {product.originalPrice && (
                <p className="text-sm text-gray-600 line-through mb-1">
                  S/ {product.originalPrice.toFixed(2)}
                </p>
              )}
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">
                  S/ {product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="mb-1 bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg tracking-widest">
                    AHORRA {product.discount}%
                  </span>
                )}
              </div>
              {savings && (
                <p className="text-xs text-emerald-400 mt-1">
                  Ahorras S/ {savings} en esta compra
                </p>
              )}
            </div>

            {/* Quick specs grid */}
            {quickSpecs.length > 0 && (
              <div className={`grid gap-2 mb-6 ${quickSpecs.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {quickSpecs.map((s, i) => (
                  <div key={i} className="bg-[#111118] border border-white/5 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">
                      {s.label}
                    </p>
                    <p className="text-sm font-bold text-white truncate" title={s.value}>
                      {s.value || '—'}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Cantidad</span>
              <div className="flex items-center bg-[#111118] border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">remove</span>
                </button>
                <span className="w-10 text-center text-sm font-black text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
              <span className="text-xs text-gray-600">{product.stock} en stock</span>
            </div>

            {/* ── Action buttons ── */}
            <div className="flex flex-col gap-3">
              {/* Añadir al carrito */}
              <button
                onClick={handleAddToCart}
                className={`
                  w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm
                  flex items-center justify-center gap-2 transition-all duration-300
                  ${addedAnim
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30 scale-[0.98]'
                    : 'bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/30 hover:shadow-orange-500/40 active:scale-[0.98]'
                  }
                `}
              >
                <span className="material-symbols-outlined text-lg">
                  {addedAnim ? 'check_circle' : 'shopping_cart'}
                </span>
                {addedAnim ? '¡Agregado!' : 'Añadir al Carrito'}
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/51983955913?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm bg-[#111118] border border-white/10 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.98]"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
                <span className="text-gray-200">Venta Online WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            DETALLES TÉCNICOS
        ═══════════════════════════════════════════ */}
        {techSpecs.length > 0 && (
          <section className="mt-10">
            {/* Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 bg-orange-500 rounded-full" />
              <h2 className="text-lg font-black uppercase tracking-widest text-white">
                Detalles Técnicos
              </h2>
            </div>

            {/* Specs table */}
            <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
              {techSpecs.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-gray-500 flex-shrink-0 w-2/5">{s.label}</span>
                  <span className="text-sm font-bold text-white text-right">{s.value || '—'}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            USOS RECOMENDADOS
        ═══════════════════════════════════════════ */}
        {product.recommendations && product.recommendations.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-7 bg-orange-500 rounded-full" />
              <h2 className="text-lg font-black uppercase tracking-widest text-white">
                Usos Recomendados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[#111118] border border-white/5 rounded-xl px-4 py-3"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <p className="text-sm text-gray-400 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            VENDOR INFO STRIP
        ═══════════════════════════════════════════ */}
        <div className="mt-10 bg-[#111118] border border-white/5 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-600/20 border border-orange-600/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-500 text-base">storefront</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">Vendido por</p>
              <p className="text-sm font-bold text-white">{product.seller || 'Aceros Perú'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Disponible</span>
          </div>
        </div>

      </div>

      {/* ── Bottom sticky bar (mobile) ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 lg:hidden">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className={`
              flex-1 py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm
              flex items-center justify-center gap-2 transition-all duration-300
              ${addedAnim
                ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                : 'bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/30'
              }
            `}
          >
            <span className="material-symbols-outlined text-base">
              {addedAnim ? 'check_circle' : 'shopping_cart'}
            </span>
            {addedAnim ? '¡Agregado!' : 'Añadir'}
          </button>
          <a
            href={`https://wa.me/51983955913?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0 hover:bg-[#25D366]/20 transition-colors"
          >
            <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}
