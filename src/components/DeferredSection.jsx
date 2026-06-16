import React, { useEffect, useRef, useState } from 'react'; 
// este componente se encarga de renderizar su contenido 
// solo cuando es visible en la pantalla, lo que mejora el 
// rendimiento al evitar cargar elementos innecesarios. 
// Utiliza Intersection Observer para detectar cuándo el
//  componente entra en el viewport y luego renderiza su contenido. 
// El prop rootMargin permite ajustar el margen de intersección, y 
// minHeight asegura que el espacio reservado para el contenido sea 
// suficiente antes de que se cargue.
export default function DeferredSection({
  children,
  className = '',
  rootMargin = '450px',
  minHeight = 320,
}) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} className={className} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  );
}
