import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Icon from './Icon';

export default function CartToast() {
  const navigate = useNavigate();
  const { cartNotice, clearCartNotice } = useCart();

  useEffect(() => {
    if (!cartNotice) return undefined;
    const timer = window.setTimeout(clearCartNotice, 3200);
    return () => window.clearTimeout(timer);
  }, [cartNotice, clearCartNotice]);

  if (!cartNotice) return null;

  return (
    <div
      className="fixed bottom-5 left-4 right-4 z-[70] mx-auto max-w-md rounded-xl border border-emerald-500/25 bg-[#111118]/95 p-3 text-white shadow-2xl shadow-black/40 backdrop-blur md:left-auto md:right-5 md:mx-0"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
          <Icon name="check_circle" className="text-xl" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-widest text-emerald-400">
            Agregado al carrito
          </p>
          <p className="truncate text-sm font-bold text-zinc-100">
            {cartNotice.quantity} x {cartNotice.productName}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearCartNotice();
            navigate('/cart');
          }}
          className="rounded-lg bg-amber-500 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-950 transition-colors hover:bg-amber-400"
        >
          Ver carrito
        </button>
        <button
          type="button"
          onClick={clearCartNotice}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
          aria-label="Cerrar notificacion"
        >
          <Icon name="close" className="text-base" />
        </button>
      </div>
    </div>
  );
}
