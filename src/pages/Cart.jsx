import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BlurFade } from '../components/magicui/blur-fade';

/* ─── Constantes ─────────────────────────────────────────────── */
const IGV_RATE   = 0.18;
const FREE_SHIP  = 299;
const SHIP_COST  = 15;
const WA_NUMBER  = '51983955913';

/* ─── Helpers ─────────────────────────────────────────────────── */
const fmt  = (n) => `S/ ${n.toFixed(2)}`;
const pct  = (n) => `S/ ${n.toFixed(2)}`;

/* ─── EmptyCart ──────────────────────────────────────────────── */
function EmptyCart({ onContinue }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-[#16161f] border border-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-700" style={{ fontSize: 44 }}>
            shopping_cart
          </span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-500/20
          border border-orange-500/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-orange-500 text-sm">close</span>
        </div>
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
        Carrito Vacío
      </h2>
      <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
        Todavía no agregaste herramientas a tu pedido.
      </p>
      <button
        onClick={onContinue}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white text-xs font-black
          uppercase tracking-widest rounded-full transition-all active:scale-95"
      >
        Explorar Productos
      </button>
    </div>
  );
}

/* ─── ProductRow ─────────────────────────────────────────────── */
function ProductRow({ item, onRemove, onUpdate }) {
  const imgSrc = item.images?.[0] || item.image || null;
  const subtotal = item.price * item.quantity;

  return (
    <BlurFade inView duration={0.35}>
      <div className="bg-[#16161f] border border-white/5 rounded-2xl overflow-hidden">

        {/* Imagen grande */}
        <div className="relative bg-[#111118]" style={{ aspectRatio: '16/9' }}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={item.name}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-gray-700 text-5xl">
                image_not_supported
              </span>
            </div>
          )}

          {/* Badge descuento */}
          {item.discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px]
              font-black px-2 py-0.5 rounded-md tracking-wide">
              -{item.discount}%
            </div>
          )}

          {/* Botón eliminar */}
          <button
            onClick={() => onRemove(item.id)}
            className="absolute top-3 right-3 w-9 h-9 bg-[#0a0a0f]/80 backdrop-blur-sm
              border border-white/10 rounded-xl flex items-center justify-center
              hover:bg-red-500/20 hover:border-red-500/40 transition-all group"
          >
            <span className="material-symbols-outlined text-gray-500 group-hover:text-red-400 text-lg">
              delete
            </span>
          </button>
        </div>

        {/* Info del producto */}
        <div className="p-4">
          {/* Ruta categoría */}
          <div className="flex items-center gap-1 mb-2">
            <span className="material-symbols-outlined text-orange-500/60 text-xs">category</span>
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
              {item.category}
              {item.subcategory ? ` / ${item.subcategory}` : ''}
            </p>
          </div>

          {/* Nombre */}
          <h3 className="text-base font-black uppercase tracking-tight text-white leading-tight mb-1">
            {item.name}
          </h3>

          {/* Vendedor */}
          <div className="flex items-center gap-1 mb-4">
            <span className="material-symbols-outlined text-orange-500 text-sm">verified</span>
            <span className="text-[10px] text-gray-500">
              Vendedor: <span className="text-orange-400 font-bold">{item.seller}</span>
            </span>
          </div>

          {/* Fila precio + cantidad */}
          <div className="flex items-center justify-between">

            {/* Cantidad */}
            <div className="flex items-center bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => onUpdate(item.id, item.quantity - 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-400
                  hover:text-orange-500 transition-colors active:bg-white/5"
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
              <span className="w-10 text-center text-sm font-black text-white tabular-nums">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdate(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="w-10 h-10 flex items-center justify-center text-gray-400
                  hover:text-orange-500 transition-colors active:bg-white/5 disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">
                Subtotal
              </p>
              <p className="text-xl font-black text-orange-400 tabular-nums">
                {fmt(subtotal)}
              </p>
            </div>
          </div>

          {/* Precio unitario */}
          <div className="mt-2 flex items-center gap-2">
            {item.originalPrice && (
              <span className="text-xs text-gray-600 line-through">{fmt(item.originalPrice)}</span>
            )}
            <span className="text-xs text-gray-500">
              {fmt(item.price)} / unidad
            </span>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

/* ─── FreeShippingBanner ─────────────────────────────────────── */
function FreeShippingBanner({ cartTotal }) {
  const remaining = FREE_SHIP - cartTotal;
  const isFree = cartTotal >= FREE_SHIP;

  if (isFree) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
        <div className="w-9 h-9 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-green-400 text-lg">local_shipping</span>
        </div>
        <div>
          <p className="text-xs font-black text-green-400 uppercase tracking-wide">
            ¡Envío gratis activado!
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Tu pedido califica para despacho gratuito.
          </p>
        </div>
      </div>
    );
  }

  const progress = Math.min((cartTotal / FREE_SHIP) * 100, 100);
  return (
    <div className="p-4 rounded-2xl bg-[#16161f] border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-orange-500 text-lg">local_shipping</span>
        <p className="text-xs font-bold text-white">
          Agrega <span className="text-orange-400 font-black">{fmt(remaining)}</span> más para envío gratis
        </p>
      </div>
      <div className="w-full h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* ─── SummaryCard ────────────────────────────────────────────── */
function SummaryCard({ cartItems, cartTotal, cartSubtotal, cartDiscount, cartCount, onWhatsApp }) {
  const isFree   = cartTotal >= FREE_SHIP;
  const shipping = isFree ? 0 : SHIP_COST;
  const igv      = cartTotal * IGV_RATE;
  const baseAmt  = cartTotal / (1 + IGV_RATE);
  const finalTotal = cartTotal + shipping;

  return (
    <div className="bg-[#16161f] border border-white/5 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-sm font-black uppercase tracking-widest text-white">
          Estado de Cuenta
        </h2>
      </div>

      {/* Líneas */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 text-xs uppercase tracking-wide font-bold">
            Subtotal productos
          </span>
          <span className="text-white font-bold tabular-nums">{fmt(cartSubtotal)}</span>
        </div>

        {cartDiscount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
              Descuentos
            </span>
            <span className="text-red-400 font-bold text-sm tabular-nums">
              − {fmt(cartDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
            Envío estimado
          </span>
          {isFree ? (
            <span className="text-[10px] font-black bg-green-500/20 text-green-400
              border border-green-500/20 px-2 py-0.5 rounded-full tracking-widest uppercase">
              GRATIS
            </span>
          ) : (
            <span className="text-white font-bold text-sm tabular-nums">{fmt(shipping)}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
            IGV (18%)
          </span>
          <span className="text-gray-400 text-sm tabular-nums">{fmt(baseAmt * IGV_RATE)}</span>
        </div>

        {/* Divisor */}
        <div className="border-t border-white/5 pt-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">
                Total a pagar
              </p>
              <p className="text-[9px] text-gray-600">Incluye IGV (18%)</p>
            </div>
            <p className="text-3xl font-black text-orange-400 tabular-nums leading-none">
              {fmt(finalTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* CTA WhatsApp */}
      <div className="px-5 pb-5 space-y-3">
        <button
          onClick={onWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] active:scale-[.98] text-white
            font-black uppercase tracking-widest py-4 rounded-xl flex items-center
            justify-center gap-3 text-sm transition-all shadow-lg shadow-green-900/20"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94
              1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297
              -.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149
              -.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297
              -1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489
              1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124
              -.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374
              a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0
              012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16
              5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005
              c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Enviar Pedido por WhatsApp
        </button>

        {/* Seguridad */}
        <p className="text-center text-[9px] text-gray-700 uppercase tracking-widest">
          Pago seguro encriptado de 256 bits
        </p>

        {/* Beneficios */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { icon: 'local_shipping', label: 'Entrega en 24h' },
            { icon: 'verified_user',  label: 'Garantía Aceros' },
            { icon: 'support_agent',  label: 'Asesoría 24/7' },
            { icon: 'payments',       label: 'Pago seguro' },
          ].map((b) => (
            <div key={b.label}
              className="flex items-center gap-2 p-2 rounded-xl bg-[#111118] border border-white/5">
              <span className="material-symbols-outlined text-orange-500/60 text-base">{b.icon}</span>
              <span className="text-[9px] text-gray-600 uppercase tracking-wide font-bold">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-gray-700 text-center leading-relaxed pt-1">
          Al enviar tu pedido, un asesor de <span className="text-gray-500 font-bold">ACEROS PERÚ</span> validará
          el stock y te enviará las opciones de pago (transferencia o link de pago).
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CART PAGE
═══════════════════════════════════════════════════════════════ */
const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems, removeFromCart, updateQuantity,
    clearCart, cartTotal, cartSubtotal, cartDiscount, cartCount,
  } = useCart();

  /* ── WhatsApp message ──────────────────────────────────────── */
  const handleWhatsApp = () => {
    const isFree   = cartTotal >= FREE_SHIP;
    const shipping = isFree ? 0 : SHIP_COST;
    const final    = cartTotal + shipping;

    let msg = `🛒 *PEDIDO — ACEROS PERÚ*\n━━━━━━━━━━━━━━━━\n\n`;
    cartItems.forEach((item, i) => {
      msg += `📦 *${i + 1}. ${item.name}*\n`;
      msg += `• Precio: ${fmt(item.price)}\n`;
      msg += `• Cantidad: ${item.quantity}\n`;
      msg += `• Subtotal: ${fmt(item.price * item.quantity)}\n\n`;
    });
    msg += `━━━━━━━━━━━━━━━━\n`;
    msg += `Subtotal: ${fmt(cartSubtotal)}\n`;
    if (cartDiscount > 0) msg += `Descuentos: -${fmt(cartDiscount)}\n`;
    msg += `Envío: ${isFree ? 'GRATIS' : fmt(shipping)}\n`;
    msg += `\n💰 *TOTAL: ${fmt(final)}*\n(IGV incluido)\n\n¡Gracias!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  /* ── Empty state ───────────────────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#0a0a0f]">
        <EmptyCart onContinue={() => navigate('/categories')} />
      </main>
    );
  }

  const isFree = cartTotal >= FREE_SHIP;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pb-12">

      {/* ── HERO HEADER ──────────────────────────────────────── */}
      <div className="bg-[#111118] border-b border-white/5 px-4 pt-6 pb-5">
        <div className="max-w-2xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-[3px] h-3.5 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.25em]">
              Revisión de pedido
            </span>
          </div>

          <BlurFade delay={0.05} duration={0.4}>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
              Mi Carrito
            </h1>
            <div className="mt-2 h-[3px] w-12 bg-orange-500 rounded-full" />
          </BlurFade>

          <BlurFade delay={0.15} duration={0.4}>
            <p className="text-xs text-gray-600 mt-2 font-bold uppercase tracking-widest">
              {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en tu pedido
            </p>
          </BlurFade>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-4">

        {/* Banner envío gratis */}
        <BlurFade inView delay={0.1} duration={0.35}>
          <FreeShippingBanner cartTotal={cartTotal} />
        </BlurFade>

        {/* Lista de productos */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <ProductRow
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
            />
          ))}
        </div>

        {/* Barra de acciones */}
        <BlurFade inView delay={0.1} duration={0.35}>
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-2 text-xs font-black text-gray-500
                hover:text-orange-500 uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Continuar comprando
            </button>

            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-xs font-black text-gray-600
                hover:text-red-400 uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-base">delete_sweep</span>
              Vaciar carrito
            </button>
          </div>
        </BlurFade>

        {/* Resumen */}
        <BlurFade inView delay={0.15} duration={0.4}>
          <SummaryCard
            cartItems={cartItems}
            cartTotal={cartTotal}
            cartSubtotal={cartSubtotal}
            cartDiscount={cartDiscount}
            cartCount={cartCount}
            onWhatsApp={handleWhatsApp}
          />
        </BlurFade>

        {/* Datos de entrega info */}
        <BlurFade inView delay={0.2} duration={0.35}>
          <div className="bg-[#16161f] border border-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
              Datos de entrega
            </p>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-orange-500 text-sm">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Cercado de Lima, Lima</p>
                <button className="text-[10px] text-orange-500 font-bold mt-0.5 hover:underline">
                  Cambiar dirección →
                </button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-orange-500 text-sm">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Fecha estimada</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Entrega en 24 – 72 horas hábiles</p>
              </div>
            </div>
          </div>
        </BlurFade>

      </div>
    </main>
  );
};

export default Cart;