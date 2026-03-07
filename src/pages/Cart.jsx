import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartSubtotal,
    cartDiscount,
    cartCount
  } = useCart();

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    let message = `🛒 *PEDIDO - ACEROS PERU*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Agregar cada producto
    cartItems.forEach((item, index) => {
      message += `📦 *Producto ${index + 1}*\n`;
      message += `• *Nombre:* ${item.name}\n`;
      message += `• *Marca:* ${item.brand}\n`;
      message += `• *Precio unitario:* S/ ${item.price.toFixed(2)}\n`;
      message += `• *Cantidad:* ${item.quantity}\n`;
      message += `• *Subtotal:* S/ ${(item.price * item.quantity).toFixed(2)}\n`;
      
      if (item.originalPrice && item.discount > 0) {
        message += `• *Descuento:* ${item.discount}% OFF\n`;
      }
      
      message += `• *Vendedor:* ${item.seller}\n`;
      message += `\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📊 *RESUMEN DEL PEDIDO*\n\n`;
    message += `• Subtotal (${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}): S/ ${cartSubtotal.toFixed(2)}\n`;
    
    const shippingCost = cartTotal >= 299 ? 0 : 15;
    if (shippingCost === 0) {
      message += `• Envío: ✅ ¡GRATIS!\n`;
    } else {
      message += `• Envío: S/ ${shippingCost.toFixed(2)}\n`;
    }
    
    if (cartDiscount > 0) {
      message += `• Descuentos: -S/ ${cartDiscount.toFixed(2)}\n`;
    }
    
    const finalTotal = cartTotal + shippingCost;
    message += `\n💰 *TOTAL A PAGAR: S/ ${finalTotal.toFixed(2)}*\n`;
    message += `(IGV Incluido)\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 *Dirección de envío:*\n`;
    message += `Cercado de Lima, Lima\n\n`;
    message += `⏰ Entrega estimada: 48-72 horas\n\n`;
    message += `✨ ¡Gracias por tu preferencia!`;

    return encodeURIComponent(message);
  };

  // Función para enviar por WhatsApp
  const handleSendToWhatsApp = () => {
    const phoneNumber = '51983955913'; // Reemplaza con tu número de WhatsApp (código de país + número)
    const message = generateWhatsAppMessage();
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-900 rounded-xl border border-gray-700 p-12">
              <span className="material-symbols-outlined text-gray-700 mb-4" style={{ fontSize: '80px' }}>
                shopping_cart
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-400 mb-6">
                ¡Agrega productos para comenzar tu compra!
              </p>
              <button
                onClick={() => navigate('/categories')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined">storefront</span>
                Explorar Productos
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const shippingCost = cartTotal >= 299 ? 0 : 15;
  const finalTotal = cartTotal + shippingCost;

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-orange-600">
            Inicio
          </button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white font-medium">Carrito de Compras</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Lista de Productos */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">
                Carrito de Compras ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})
              </h1>
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                Vaciar carrito
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 p-4 md:p-6 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Imagen del producto */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <img
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        src={item.images ? item.images[0] : item.image}
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="flex-grow text-center md:text-left w-full">
                      <div className="flex flex-col md:flex-row md:justify-between items-start mb-4">
                        <div className="mb-4 md:mb-0">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {item.brand}
                          </p>
                          <h3 className="text-lg font-bold text-white leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Vendido por:{' '}
                            <span className="text-orange-600 font-medium">{item.seller}</span>
                          </p>
                        </div>

                        {/* Precio */}
                        <div className="text-right w-full md:w-auto">
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through block">
                              S/ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <p className="text-xl font-bold text-white">
                            S/ {item.price.toFixed(2)}
                          </p>
                          {item.discount > 0 && (
                            <span className="inline-block bg-red-900/30 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold mt-1">
                              -{item.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controles */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Selector de cantidad */}
                        <div className="flex items-center bg-gray-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange-600 transition-colors"
                          >
                            <span className="material-symbols-outlined">remove</span>
                          </button>
                          <input
                            className="w-12 bg-transparent border-none text-center focus:ring-0 text-sm font-bold text-white"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, +e.target.value)}
                            min="1"
                            max={item.stock}
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <span className="material-symbols-outlined">add</span>
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Subtotal</p>
                          <p className="text-lg font-bold text-white">
                            S/ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4">
                          <button className="text-gray-400 hover:text-orange-600 flex items-center gap-1 text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined">favorite</span>
                            <span className="hidden sm:inline">Guardar</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition-colors"
                          >
                            <span className="material-symbols-outlined">delete</span>
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de Compra */}
          <aside className="w-full lg:w-96">
            <div className="bg-slate-900 rounded-xl border border-gray-700 shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-white">
                Resumen de Compra
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'producto' : 'productos'})</span>
                  <span>S/ {cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Costo de envío</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-400 font-medium">
                      ¡Gratis!
                    </span>
                  ) : (
                    <span>S/ {shippingCost.toFixed(2)}</span>
                  )}
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Descuentos</span>
                    <span className="text-red-500">- S/ {cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-800 pt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">
                      S/ {finalTotal.toFixed(2)}
                    </span>
                    <p className="text-[10px] text-gray-400">IGV Incluido</p>
                  </div>
                </div>
              </div>

              

              {/* Mensaje de envío gratis */}
              {cartTotal < 299 && (
                <div className="bg-blue-900/20 border border-blue-800 p-3 rounded-lg mb-6">
                  <p className="text-xs text-blue-300">
                    <span className="material-symbols-outlined text-sm align-middle">info</span>
                    {' '}Agrega S/ {(299 - cartTotal).toFixed(2)} más para obtener{' '}
                    <span className="font-bold">envío gratis</span>
                  </p>
                </div>
              )}

              {/* Botón ENVIAR POR WHATSAPP */}
              <button 
                onClick={handleSendToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-md mb-6"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Enviar Pedido por WhatsApp</span>
              </button>

              {/* Información adicional */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  <span>Entrega estimada: 48 - 72 horas</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Compra 100% protegida</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="material-symbols-outlined text-sm">credit_card</span>
                  <span>Pago seguro garantizado</span>
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="mt-4 bg-slate-900 p-4 rounded-xl border border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-white">
                <span className="material-symbols-outlined text-gray-400">location_on</span>
                <span>Enviar a:</span>
              </div>
              <p className="text-sm text-gray-400 ml-7">
                Cercado de Lima, Lima
              </p>
              <button className="ml-7 text-xs text-orange-600 font-bold hover:underline mt-1">
                Cambiar dirección
              </button>
            </div>
          </aside>
        </div>

        {/* Continuar comprando */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
          >
            <span className="material-symbols-outlined">keyboard_backspace</span>
            Continuar comprando herramientas
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;