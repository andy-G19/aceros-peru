import React from 'react';
// Difiere el costo de render/pintado de secciones fuera de pantalla usando
// `content-visibility: auto` (soportado por navegadores basados en Chromium),
// en vez de desmontar los hijos del DOM. Así el contenido sigue presente para
// crawlers que no simulan scroll, y minHeight evita saltos de layout mientras
// el navegador no ha necesitado pintarlo todavía.
export default function DeferredSection({ children, className = '', minHeight = 320 }) {
  return (
    <div
      className={className}
      style={{ contentVisibility: 'auto', containIntrinsicSize: `1px ${minHeight}px` }}
    >
      {children}
    </div>
  );
}
