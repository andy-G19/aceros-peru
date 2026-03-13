import React from 'react';
import logo from '../assets/logo.png';
import { RetroGrid } from './magicui/retro-grid';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-gray-700 pt-12 pb-8 mt-20 relative overflow-hidden">
      {/* RetroGrid background */}
      <RetroGrid className="opacity-20" angle={65} cellSize={55} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Aceros Perú" className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">ACEROS PERÚ</span>
                <span className="text-xs text-gray-400">Herramientas con Garantía</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu socio confiable en construcción. Calidad, resistencia y el mejor servicio para tus proyectos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <span className="text-xl">FB</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <span className="text-xl">IG</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <span className="text-xl">LN</span>
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="font-bold text-white mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Herramientas Acero", "Herramientas Ganzo", "Rastrillos", "Herramientas de Construcción", "Trípodes para Aspersor"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-bold text-white mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Seguimiento de pedido", "Cambios y Devoluciones", "Términos y Condiciones", "Contacto"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-orange-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4">Suscríbete</h4>
            <p className="text-gray-400 text-sm mb-4">Recibe las últimas ofertas y novedades.</p>
            <div className="flex flex-col gap-2">
              <input
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button className="bg-white text-gray-900 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 hover:text-white transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2026 Aceros Perú. Todos los derechos reservados.
          </p>
          <div className="flex gap-2">
            {["VISA", "Mastercard", "Yape"].map((pay) => (
              <span key={pay} className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded">
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;