import React from 'react';
import { useCart } from '../context/CartContext';
import { MagicCard } from './magicui/magic-card';
import OptimizedImage from './OptimizedImage';
import Icon from './Icon';

const VOLUME_LABELS = {
  'Herramientas Acero': { label: 'Venta por docena', icon: 'inventory_2' },
  'Herramientas Ganzo': { label: 'Venta por docena', icon: 'inventory_2' },
  Rastrillos: { label: 'Venta por docena', icon: 'inventory_2' },
  'Herramientas de Construccion': { label: 'Venta por docena', icon: 'inventory_2' },
  'Trípodes para Aspersor': { label: 'Venta por docena', icon: 'inventory_2' },
  'Herramientas de Jardinería': { label: 'Venta por docena', icon: 'inventory_2' },
  Otros: { label: 'Venta por docena', icon: 'inventory_2' },
};

const DEFAULT_VOLUME = { label: 'Precio segun cantidad', icon: 'request_quote' };

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
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
      className="bg-[#16161f] border border-white/5 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all duration-300"
      gradientColor="#ea580c"
      gradientOpacity={0.1}
      gradientSize={200}
    >
      <button
        type="button"
        onClick={() => onViewDetails(product)}
        className="block w-full cursor-pointer text-left"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <div className="relative bg-[#1e1e2a] overflow-hidden" style={{ aspectRatio: '1/1' }}>
          {displayImage ? (
            <OptimizedImage
              src={displayImage}
              alt={product.name}
              width={420}
              height={420}
              mode="limit"
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="image_not_supported" className="text-zinc-600 text-4xl" />
            </div>
          )}
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          {product.brand && (
            <p className="text-[9px] font-black text-amber-500/60 uppercase tracking-[0.2em] truncate leading-none">
              {product.brand}
            </p>
          )}

          <p className="text-[12px] font-black text-zinc-500 uppercase tracking-[0.2em] leading-none">
            Cod: {product.id}
          </p>

          <h3 className="text-sm font-black text-white uppercase leading-tight tracking-wide line-clamp-3">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#111118] border border-white/5">
            <Icon name={volume.icon} className="text-amber-500 text-sm flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-black text-white leading-none truncate">{volume.label}</p>
              <p className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-widest">
                Precio a consultar
              </p>
            </div>
          </div>
        </div>
      </button>

      <div className="px-3 pb-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-amber-600 hover:bg-amber-500 active:scale-95 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
          aria-label={`Agregar ${product.name} al carrito de cotizacion`}
        >
          <Icon name="add_shopping_cart" className="text-base" />
          Cotizar
        </button>
      </div>
    </MagicCard>
  );
};

export default ProductCard;
