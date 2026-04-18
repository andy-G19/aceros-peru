import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BlurFade } from '../components/magicui/blur-fade';

/* ══════════════════════════════════════════════════
   CONFIGURACIÓN
══════════════════════════════════════════════════ */
const SHOW_PRICES  = false;   // false = modo catálogo B2B
const FREE_SHIP    = 299;
const SHIP_COST    = 15;
const WA_NUMBER    = '51983955913';

const VOLUME_LABELS = {
  'Herramientas Acero':           'docena (12 u.)',
  'Herramientas Ganzo':           'docena (12 u.)',
  'Rastrillos':                   'docena (12 u.)',
  'Herramientas de Construccion': 'docena (12 u.)',
  'Trípodes para Aspersor':       'docena (12 u.)',
  'Otros':                        'docena (12 u.)',
};

const fmt = (n) => `S/ ${n.toFixed(2)}`;

/* ── CartItem ─────────────────────────────────── */
function CartItem({ item, onRemove, onUpdate }) {
  const img     = item.images?.[0] || item.image || null;
  const volUnit = VOLUME_LABELS[item.category] || 'unidad';

  return (
    <BlurFade inView duration={0.3}>
      <div className="bg-[#16161f] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
        <div className="flex gap-0">

          {/* Imagen cuadrada */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[#111118] flex items-center justify-center p-3">
            {img ? (
              <img src={img} alt={item.name} className="w-full h-full object-contain" />
            ) : (
              <span className="material-symbols-outlined text-gray-700 text-3xl">image_not_supported</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
            {/* Encabezado */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-orange-500/60 uppercase tracking-widest mb-0.5 truncate">
                    {item.category}
                  </p>
                  <h3 className="text-xs font-black text-white uppercase leading-tight line-clamp-2">
                    {item.name}
                  </h3>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center flex-shrink-0 transition-colors group"
                >
                  <span className="material-symbols-outlined text-gray-600 group-hover:text-red-400 text-sm">delete</span>
                </button>
              </div>

              {/* Precio o modo catálogo */}
              {SHOW_PRICES ? (
                <p className="text-sm font-black text-orange-400 mt-1 tabular-nums">
                  {fmt(item.price)}
                  <span className="text-[9px] text-gray-600 font-normal ml-1">/ unidad</span>
                </p>
              ) : (
                <div className="flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-orange-500/60 text-xs">request_quote</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wide">Precio a cotizar</span>
                </div>
              )}
            </div>

            {/* Cantidad + subtotal */}
            <div className="flex items-center justify-between mt-2">
              {/* Selector cantidad */}
              <div className="flex items-center bg-[#0a0a0f] border border-white/8 rounded-xl overflow-hidden">
                <button
                  onClick={() => onUpdate(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="w-8 text-center text-xs font-black text-white tabular-nums">{item.quantity}</span>
                <button
                  onClick={() => onUpdate(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>

              {/* Unidad vol */}
              <span className="text-[9px] text-gray-600 uppercase tracking-wide">× {volUnit}</span>

              {/* Subtotal (solo si SHOW_PRICES) */}
              {SHOW_PRICES && (
                <p className="text-sm font-black text-white tabular-nums">
                  {fmt(item.price * item.quantity)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  );
}

/* ── ShippingProgress ─────────────────────────── */
function ShippingProgress({ cartTotal }) {
  if (!SHOW_PRICES) return null;
  const isFree    = cartTotal >= FREE_SHIP;
  const remaining = FREE_SHIP - cartTotal;
  const pct       = Math.min((cartTotal / FREE_SHIP) * 100, 100);

  return (
    <div className={`p-4 rounded-2xl border ${isFree ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-[#16161f] border-white/5'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-base text-orange-500">local_shipping</span>
        {isFree ? (
          <p className="text-xs font-black text-emerald-400 uppercase tracking-wide">¡Envío gratis activado!</p>
        ) : (
          <p className="text-xs font-bold text-white">
            Agrega <span className="text-orange-400 font-black">{fmt(remaining)}</span> más para envío gratis
          </p>
        )}
      </div>
      {!isFree && (
        <div className="w-full h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

/* ── CartSummary ──────────────────────────────── */
function CartSummary({ cartItems, cartTotal, cartSubtotal, cartDiscount, cartCount, onWhatsApp }) {
  const isFree     = cartTotal >= FREE_SHIP;
  const shipping   = isFree ? 0 : SHIP_COST;
  const finalTotal = cartTotal + shipping;

  return (
    <div className="bg-[#16161f] border border-white/5 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <span className="material-symbols-outlined text-orange-500 text-base">receipt_long</span>
        <h2 className="text-sm font-black uppercase tracking-widest text-white">Resumen del Pedido</h2>
      </div>

      {/* Resumen de productos */}
      <div className="px-5 py-4 space-y-2.5">
        {/* Cantidad de referencias */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">
            Referencias ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})
          </span>
          {SHOW_PRICES ? (
            <span className="text-sm font-bold text-white tabular-nums">{fmt(cartSubtotal)}</span>
          ) : (
            <span className="text-[10px] text-orange-400 font-black uppercase tracking-widest">A cotizar</span>
          )}
        </div>

        {SHOW_PRICES && (
          <>
            {cartDiscount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Descuentos</span>
                <span className="text-sm font-bold text-red-400 tabular-nums">−{fmt(cartDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Envío estimado</span>
              {isFree ? (
                <span className="text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Gratis</span>
              ) : (
                <span className="text-sm font-bold text-white tabular-nums">{fmt(shipping)}</span>
              )}
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between items-end">
              <div>
                <p className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-0.5">Total estimado</p>
                <p className="text-[9px] text-gray-600">Precios sujetos a confirmación</p>
              </div>
              <p className="text-2xl font-black text-orange-400 tabular-nums">{fmt(finalTotal)}</p>
            </div>
          </>
        )}

        {!SHOW_PRICES && (
          <div className="border-t border-white/5 pt-3">
            <div className="flex items-start gap-3 p-3 bg-[#111118] rounded-xl border border-orange-500/15">
              <span className="material-symbols-outlined text-orange-500 text-lg flex-shrink-0">info</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Los precios se definen según volumen y categoría. Envía tu lista por WhatsApp y un asesor te responderá con cotización inmediata.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA WhatsApp */}
      <div className="px-5 pb-5 space-y-3">
        <button
          onClick={onWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] active:scale-[0.98] text-white font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 text-sm transition-all shadow-lg shadow-green-900/20"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {SHOW_PRICES ? 'Enviar Pedido por WhatsApp' : 'Solicitar Cotización'}
        </button>

        {/* Beneficios */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: 'verified_user',  label: 'Garantía de fábrica' },
            { icon: 'support_agent',  label: 'Asesoría B2B 24/7' },
            { icon: 'local_shipping', label: 'Envío a todo el Perú' },
            { icon: 'payments',       label: 'Pago flexible' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 p-2 rounded-xl bg-[#111118] border border-white/5">
              <span className="material-symbols-outlined text-orange-500/60 text-sm">{b.icon}</span>
              <span className="text-[9px] text-gray-600 uppercase tracking-wide font-bold leading-tight">{b.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-700 text-center leading-relaxed pt-1">
          Un asesor de <span className="text-gray-500 font-bold">ACEROS PERÚ</span> validará tu pedido y te enviará la cotización por WhatsApp.
        </p>
      </div>
    </div>
  );
}

/* ── EmptyCart ────────────────────────────────── */
function EmptyCart({ onContinue }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-3xl bg-[#16161f] border border-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-700 text-5xl">shopping_cart</span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-orange-500 text-sm">close</span>
        </div>
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Carrito Vacío</h2>
      <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
        Agrega herramientas al carrito para generar tu cotización.
      </p>
      <button
        onClick={onContinue}
        className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all active:scale-95"
      >
        Ver Catálogo
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CART PAGE
══════════════════════════════════════════════════ */
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartSubtotal, cartDiscount, cartCount } = useCart();

  /* ── Mensaje WhatsApp ── */
  function handleWhatsApp() {
    let msg = SHOW_PRICES
      ? `🛒 *PEDIDO — ACEROS PERÚ*\n━━━━━━━━━━━━━━━━\n\n`
      : `📋 *SOLICITUD DE COTIZACIÓN — ACEROS PERÚ*\n━━━━━━━━━━━━━━━━\n\n`;

    cartItems.forEach((item, i) => {
      const volUnit = VOLUME_LABELS[item.category] || 'unidad';
      msg += `${i + 1}. *${item.name}*\n`;
      msg += `   Categoría: ${item.category}\n`;
      msg += `   Cantidad: ${item.quantity} × ${volUnit}\n`;
      if (SHOW_PRICES) msg += `   Subtotal: ${fmt(item.price * item.quantity)}\n`;
      msg += '\n';
    });

    msg += `━━━━━━━━━━━━━━━━\n`;
    if (SHOW_PRICES) {
      const isFree = cartTotal >= FREE_SHIP;
      msg += `Total: ${fmt(cartTotal + (isFree ? 0 : SHIP_COST))}\n`;
    } else {
      msg += `Total de referencias: ${cartCount}\n`;
      msg += `\n💬 Por favor envíenme la cotización con precios según volumen.\n`;
    }
    msg += `\n¡Gracias!`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  if (cartItems.length === 0) {
    return <main className="min-h-screen bg-[#0a0a0f]"><EmptyCart onContinue={() => navigate('/categories')} /></main>;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white pb-10">

      {/* ── Header ── */}
      <div className="bg-[#111118] border-b border-white/5 px-4 pt-6 pb-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-[3px] h-3.5 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.25em]">
              {SHOW_PRICES ? 'Revisión de pedido' : 'Lista de cotización'}
            </span>
          </div>
          <BlurFade delay={0.05} duration={0.4}>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">
              {SHOW_PRICES ? 'Mi Carrito' : 'Mi Carrito'}
            </h1>
            <div className="mt-2 h-[3px] w-12 bg-orange-500 rounded-full" />
          </BlurFade>
          <p className="text-xs text-gray-600 mt-2 font-bold uppercase tracking-widest">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'} seleccionados
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">

        {/* Barra envío gratis */}
        <BlurFade inView delay={0.05} duration={0.3}>
          <ShippingProgress cartTotal={cartTotal} />
        </BlurFade>

        {/* Lista de productos */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
            />
          ))}
        </div>

        {/* Acciones */}
        <BlurFade inView delay={0.1} duration={0.3}>
          <div className="flex items-center justify-between py-1">
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 hover:text-orange-500 uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Seguir viendo
            </button>
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-[10px] font-black text-gray-600 hover:text-red-400 uppercase tracking-widest transition-colors"
            >
              <span className="material-symbols-outlined text-sm">delete_sweep</span>
              Vaciar lista
            </button>
          </div>
        </BlurFade>

        {/* Resumen */}
        <BlurFade inView delay={0.15} duration={0.4}>
          <CartSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            cartSubtotal={cartSubtotal}
            cartDiscount={cartDiscount}
            cartCount={cartCount}
            onWhatsApp={handleWhatsApp}
          />
        </BlurFade>

        {/* Info de entrega */}
        <BlurFade inView delay={0.2} duration={0.3}>
          <div className="bg-[#16161f] border border-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Entrega estimada</p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-500 text-sm">location_on</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Cercado de Lima, Lima</p>
                <button className="text-[10px] text-orange-500 font-bold hover:underline mt-0.5">Cambiar dirección →</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-500 text-sm">schedule</span>
              </div>
              <p className="text-xs text-gray-400">Despacho en <span className="text-white font-bold">24 – 72 horas hábiles</span></p>
            </div>
          </div>
        </BlurFade>

      </div>
    </main>
  );
};

export default Cart;