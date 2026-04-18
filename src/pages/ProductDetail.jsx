import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { BlurFade } from '../components/magicui/blur-fade';

/* ══════════════════════════════════════════════════════════
   CONFIGURACIÓN GLOBAL — cambiar a false para ocultar precios
   (modo catálogo B2B)
══════════════════════════════════════════════════════════ */
const SHOW_PRICES = false;

/* ── Volumen de venta por categoría ─────────────────────── */
const VOLUME_CONFIG = {
  'Herramientas Acero':           { label: 'Venta por docena',   qty: 12, unit: 'docena',   minLabel: 'Mínimo 1 docena (12 unidades)' },
  'Herramientas Ganzo':           { label: 'Venta por docena',   qty: 12, unit: 'docena',   minLabel: 'Mínimo 1 docena (12 unidades)' },
  'Rastrillos':                   { label: 'Venta por decena',   qty: 10, unit: 'decena',   minLabel: 'Mínimo 1 decena (10 unidades)' },
  'Herramientas de Construccion': { label: 'Precio por volumen', qty: 1,  unit: 'unidad',   minLabel: 'Precio según cantidad solicitada' },
  'Trípodes para Aspersor':       { label: 'Precio por volumen', qty: 1,  unit: 'unidad',   minLabel: 'Precio según cantidad solicitada' },
  'Otros':                        { label: 'Precio por volumen', qty: 1,  unit: 'unidad',   minLabel: 'Precio según cantidad solicitada' },
};
const DEFAULT_VOL = { label: 'Precio por volumen', qty: 1, unit: 'unidad', minLabel: 'Precio según cantidad' };

/* ── parseSpec ───────────────────────────────────────────── */
function parseSpec(str) {
  const idx = str.indexOf(':');
  if (idx === -1) return { label: str, value: '' };
  return { label: str.slice(0, idx).trim(), value: str.slice(idx + 1).trim() };
}

/* ══════════════════════════════════════════════════════════
   PRODUCT DETAIL
══════════════════════════════════════════════════════════ */
export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = location.state?.product || products.find((p) => p.id === parseInt(id));

  const [activeImg, setActiveImg]   = useState(0);
  const [qty, setQty]               = useState(1);
  const [liked, setLiked]           = useState(false);
  const [addedAnim, setAddedAnim]   = useState(false);
  const [zoomOpen, setZoomOpen]     = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-700 mb-4 block">inventory_2</span>
          <p className="text-gray-400 mb-6 text-lg">Producto no encontrado</p>
          <button
            onClick={() => navigate('/categories')}
            className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide"
          >
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  const rawImages = (product.images || [product.image]).filter(Boolean);
  const images    = rawImages.length ? rawImages : [null];
  const specsParsed = (product.specifications || []).map(parseSpec);
  const quickSpecs  = specsParsed.slice(0, 4);
  const vol = VOLUME_CONFIG[product.category] || DEFAULT_VOL;

  const waText = encodeURIComponent(
    `Hola, me interesa cotizar:\n*${product.name}*\nCategoría: ${product.category}\nCantidad: ${qty} ${vol.unit}(s)\n\n¿Cuál es el precio?`
  );

  function handleAddToCart() {
    addToCart(product, qty);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1600);
  }

  const savings = product.originalPrice && product.discount > 0
    ? (product.originalPrice - product.price).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-32 lg:pb-12">

      {/* ── Back bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Volver</span>
        </button>
        <button
          onClick={() => setLiked(p => !p)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${liked ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-500 hover:text-red-400'}`}
        >
          <svg className={`w-4 h-4 ${liked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-5">

        {/* ── Breadcrumb ───────────────────────────────── */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-600 mb-5 font-medium uppercase tracking-wide">
          <button onClick={() => navigate('/')} className="hover:text-orange-500 transition-colors">Inicio</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <button onClick={() => navigate('/categories')} className="hover:text-orange-500 transition-colors">Catálogo</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-orange-500 truncate max-w-[140px]">{product.name}</span>
        </div>

        {/* ══ LAYOUT DESKTOP: 2 cols ══════════════════════ */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">

          {/* ── COL IZQUIERDA: Imagen ── */}
          <div className="mb-6 lg:mb-0">
            <BlurFade delay={0.05} duration={0.4}>
              {/* Card imagen principal */}
              <div className="relative bg-[#111118] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">

                {/* Stock badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0a0a0f]/85 backdrop-blur-sm border border-emerald-500/30 px-2.5 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Disponible</span>
                </div>

                {/* Badge categoría */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-orange-600/20 border border-orange-500/40 text-orange-400 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Imagen */}
                <div className="aspect-square flex items-center justify-center p-4 sm:p-1 cursor-zoom-in">
                  {images[activeImg] ? (
                    <img
                      src={images[activeImg]}
                      alt={product.name}
                      onClick={() => setZoomOpen(true)}
                      className="w-full h-full object-contain transition-opacity duration-300 rounded-2xl hover:opacity-80"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-700">
                      <span className="material-symbols-outlined text-7xl">image_not_supported</span>
                      <span className="text-xs uppercase tracking-widest">Sin imagen</span>
                    </div>
                  )}
                </div>
              </div>
            </BlurFade>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImg === i
                        ? 'border-orange-500 shadow-md shadow-orange-500/30 scale-105'
                        : 'border-white/8 opacity-50 hover:opacity-80'
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

          {/* ── COL DERECHA: Info ── */}
          <div>
            <BlurFade delay={0.1} duration={0.4}>

              {/* Marca */}
              {product.brand && (
                <p className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.3em] mb-2">
                  {product.brand}
                </p>
              )}

              {/* Nombre — grande y prominente */}
              <h1 className="text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white mb-3">
                {product.name}
              </h1>

              {/* Descripción corta */}
              <p className="text-sm text-gray-400 leading-relaxed mb-5 border-l-2 border-orange-500/40 pl-3">
                {product.description}
              </p>

              {/* ── BLOQUE PRECIO (controlado por SHOW_PRICES) ── */}
              {SHOW_PRICES ? (
                <div className="mb-5 p-4 bg-[#111118] rounded-2xl border border-white/5">
                  <div className="flex items-end gap-3 flex-wrap">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-600 line-through">
                        S/ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
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
                    <p className="text-xs text-emerald-400 mt-2">
                      ✓ Ahorras S/ {savings} en esta compra
                    </p>
                  )}
                </div>
              ) : (
                /* MODO CATÁLOGO — sin precios */
                <div className="mb-5 p-4 bg-[#111118] rounded-2xl border border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-orange-500 text-xl">request_quote</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{vol.label}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">{vol.minLabel}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Quick specs 2×2 ── */}
              {quickSpecs.length > 0 && (
                <div className={`grid gap-2 mb-5 ${quickSpecs.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {quickSpecs.map((s, i) => (
                    <div key={i} className="bg-[#111118] border border-white/5 rounded-xl px-3 py-2.5">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-xs font-bold text-white truncate" title={s.value}>{s.value || '—'}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Stock + cantidad ── */}
              <div className="flex items-center justify-between mb-5">
                {/* Stock */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-emerald-400 font-medium">
                    En stock 
                  </span>
                </div>

                {/* Selector cantidad */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">{vol.unit}s</span>
                  <div className="flex items-center bg-[#111118] border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">remove</span>
                    </button>
                    <span className="w-9 text-center text-sm font-black text-white tabular-nums">{qty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Botones de acción ── */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    addedAnim
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30 scale-[0.98]'
                      : 'bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/30 hover:shadow-orange-500/40 active:scale-[0.98]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {addedAnim ? 'check_circle' : 'add_shopping_cart'}
                  </span>
                  {addedAnim ? '¡Agregado!' : 'Añadir al Carrito'}
                </button>

                <a
                  href={`https://wa.me/51983955913?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm bg-[#111118] border border-white/10 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
                  <span className="text-gray-200">Cotizar por WhatsApp</span>
                </a>
              </div>

              {/* ── Vendedor ── */}
              <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-[#111118] border border-white/5 rounded-xl">
                <span className="material-symbols-outlined text-orange-500 text-base">verified</span>
                <div>
                  <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">Distribuidor oficial</p>
                  <p className="text-xs font-bold text-white">{product.seller || 'Aceros Perú'}</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* ══ DETALLES TÉCNICOS ══════════════════════════════ */}
        {specsParsed.length > 0 && (
          <section className="mt-10">
            <BlurFade inView delay={0.05} duration={0.35}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-lg font-black uppercase tracking-widest text-white">Detalles Técnicos</h2>
              </div>
              <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                {specsParsed.map((s, i) => (
                  <div key={i} className="flex items-start justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs text-gray-500 flex-shrink-0 w-2/5 font-medium">{s.label}</span>
                    <span className="text-xs font-bold text-white text-right ml-3">{s.value || '—'}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </section>
        )}

        {/* ══ USOS RECOMENDADOS ══════════════════════════════ */}
        {product.recommendations?.length > 0 && (
          <section className="mt-8">
            <BlurFade inView delay={0.05} duration={0.35}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-7 bg-orange-500 rounded-full" />
                <h2 className="text-lg font-black uppercase tracking-widest text-white">Usos Recomendados</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#111118] border border-white/5 rounded-xl px-4 py-3">
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                    <p className="text-xs text-gray-400 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </section>
        )}

      </div>

      {/* ── Barra flotante mobile ──────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 lg:hidden">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
              addedAnim
                ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                : 'bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/30'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {addedAnim ? 'check_circle' : 'add_shopping_cart'}
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

      {/* ── Modal Vista Previa ──────────────────────────────── */}
      {zoomOpen && images[activeImg] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-2xl max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeImg]}
              alt={product.name}
              className="w-full h-full object-contain rounded-2xl"
            />
            
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}