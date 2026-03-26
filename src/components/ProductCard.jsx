import React from 'react';
import { useCart } from '../context/CartContext';
import { MagicCard } from './magicui/magic-card';
import { BorderBeam } from './magicui/border-beam';

/* ─── Etiquetas de venta por volumen ─────────────────────────── */
const VOLUME_LABELS = {
  'Herramientas Acero':          { label: 'Venta por docena',  qty: 'Cotizar',  icon: 'inventory_2' },
  'Herramientas Ganzo':          { label: 'Venta por docena',  qty: 'Cotizar',  icon: 'inventory_2' },
  'Rastrillos':                   { label: 'Venta por docena',  qty: 'Cotizar',  icon: 'inventory_2'   },
  'Herramientas de Construccion': { label: 'Venta por docena', qty: 'Cotizar',      icon: 'inventory_2' },
  'Trípodes para Aspersor':       { label: 'Venta por docena', qty: 'Cotizar',      icon: 'inventory_2' },
  'Otros':                        { label: 'Venta por docena', qty: 'Cotizar',      icon: 'inventory_2' },
};

const DEFAULT_VOLUME = { label: 'Precio según cantidad', qty: 'Cotizar', icon: 'request_quote' };

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
  const volume = VOLUME_LABELS[product.category] || DEFAULT_VOLUME;

  return (
    <MagicCard
      onClick={() => onViewDetails(product)}
      className="bg-[#16161f] border border-white/5 rounded-xl overflow-hidden cursor-pointer group hover:border-orange-500/30 transition-all duration-300"
      gradientColor="#ea580c"
      gradientOpacity={0.1}
      gradientSize={200}
    >
      {/* BorderBeam en productos destacados */}
      {product.discount > 20 && (
        <BorderBeam size={180} duration={12} colorFrom="#ea580c" colorTo="#f97316" borderWidth={1.5} />
      )}

      {/* ── Imagen ── */}
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

        {/* Badge volumen — esquina superior izquierda */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#0a0a0f]/80 backdrop-blur-sm border border-orange-500/30 px-1.5 py-0.5 rounded-md">
          <span className="material-symbols-outlined text-orange-500 text-[10px]">{volume.icon}</span>
          <span className="text-[9px] font-black text-orange-400 uppercase tracking-wide leading-none">
            {volume.qty}
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-3 flex flex-col gap-2.5">

        {/* Marca */}
        {product.brand && (
          <p className="text-[9px] font-black text-orange-500/60 uppercase tracking-[0.2em] truncate leading-none">
            {product.brand}
          </p>
        )}

        {/* Nombre — más grande y prominente */}
        <h3 className="text-sm font-black text-white uppercase leading-tight tracking-wide line-clamp-3">
          {product.name}
        </h3>

        {/* Etiqueta de venta por volumen */}
        <div className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#111118] border border-white/5">
          <span className="material-symbols-outlined text-orange-500 text-sm flex-shrink-0">{volume.icon}</span>
          <div className="min-w-0">
            <p className="text-[10px] font-black text-white leading-none truncate">{volume.label}</p>
            <p className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-widest">
              Precio a consultar
            </p>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-500 active:scale-95 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
          Cotizar
        </button>
      </div>
    </MagicCard>
  );
};

export default ProductCard;