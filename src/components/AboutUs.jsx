import React, { useState, useRef, useEffect } from 'react';
import { BlurFade } from '../components/magicui/blur-fade';

/* ── Fotos del taller (placeholder con imágenes reales de herramientas/taller) ── */
/* ── Seccion donde dice ¿Quienes somos? ── */
const TALLER_PHOTOS = [
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304058/Lampa_Extra_Grande_v4m0n2.jpg',
    alt: 'Herramientas Aceros Perú',
    label: 'Línea Aceros Perú',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304308/Ganzo_Grande_wbunqf.jpg',
    alt: 'Herramientas Ganzo',
    label: 'Línea Ganzo',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304266/Rejilla_Corazon_wjjkba.jpg',
    alt: 'Rejillas y bieldos',
    label: 'Rejillas y Bieldos',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1774304206/Cuchara_Grande_opcdra.jpg',
    alt: 'Lampas tipo cuchara',
    label: 'Lampas Tipo Cuchara',
  },
];

const VALUES = [
  {
    icon: 'handyman',
    title: 'Artesanía Nacional',
    desc: 'Cada herramienta es fabricada con acero nacional de alta tenacidad, controlando cada etapa del proceso productivo.',
  },
  {
    icon: 'verified_user',
    title: 'Garantía Real',
    desc: 'Respaldamos nuestros productos con garantía de fábrica. Si falla, la reponemos sin preguntas.',
  },
  {
    icon: 'groups',
    title: 'Compromiso Agrícola',
    desc: 'Trabajamos de la mano con agricultores, ferreterías y contratistas para entender sus necesidades reales.',
  },
  {
    icon: 'timeline',
    title: '+15 Años de Experiencia',
    desc: 'Desde Lima distribuimos a todo el Perú, con conocimiento profundo del sector agrícola y de construcción.',
  },
];

export default function AboutUs() {
  const [activePhoto, setActivePhoto] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActivePhoto((p) => (p + 1) % TALLER_PHOTOS.length);
    }, 3200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleDot = (i) => {
    setActivePhoto(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActivePhoto((p) => (p + 1) % TALLER_PHOTOS.length);
    }, 3200);
  };

  return (
    <section className="relative overflow-hidden bg-[#0d0d14] py-16 md:py-24">
      {/* ── Decoración de fondo ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── HEADER DE SECCIÓN ── */}
        <BlurFade inView delay={0.05} duration={0.5}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-5 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.3em]">
              Nuestra Historia
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-1">
            ¿Quiénes
          </h2>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-orange-500 leading-none mb-8">
            Somos?
          </h2>
        </BlurFade>

        {/* ── GRID PRINCIPAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

          {/* ── TEXTO ── */}
          <div>
            <BlurFade inView delay={0.1} duration={0.5}>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p className="text-base md:text-lg text-gray-200 font-medium border-l-2 border-orange-500 pl-4">
                  Somos <span className="text-orange-400 font-bold">Codimag</span>, empresa distribuidora
                  especializada en herramientas agrícolas y de construcción con más de{' '}
                  <span className="text-white font-bold">15 años</span> en el mercado peruano.
                </p>
                <p>
                  Nacimos con la misión de llevar herramientas de calidad real al campo y a la obra.
                  Trabajamos directamente con fabricantes nacionales que dominan el arte del forjado
                  en acero, garantizando que cada lampa, rejilla o barreta llegue con la resistencia
                  que el trabajo duro exige.
                </p>
                <p>
                  A lo largo de los años hemos construido relaciones sólidas con agricultores de la
                  sierra y la costa, ferreterías de todo el país y contratistas de obra civil que
                  confían en nosotros porque saben que detrás de cada herramienta hay un proceso de
                  control de calidad riguroso y un equipo dispuesto a responder.
                </p>
                <p>
                  Distribuimos las líneas <span className="text-white font-semibold">Aceros Perú</span> y{' '}
                  <span className="text-white font-semibold">Herramientas Ganzo</span>, referentes
                  nacionales en lampas forjadas, rejillas agrícolas, rastrillos industriales y
                  herramientas de construcción. Ofrecemos venta al por mayor con cotización inmediata
                  vía WhatsApp.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-7">
                {['Venta por mayor', 'Distribución nacional', 'Garantía de fábrica', 'Cotización directa'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full
                      bg-[#1a1a24] border border-white/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* ── GALERÍA DE FOTOS ── */}
          <BlurFade inView delay={0.2} duration={0.5}>
            <div className="relative">
              {/* Foto principal */}
              <div className="relative rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl"
                style={{ aspectRatio: '4/3' }}>
                {TALLER_PHOTOS.map((photo, i) => (
                  <img
                    key={i}
                    src={photo.src}
                    alt={photo.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    style={{
                      opacity: activePhoto === i ? 1 : 0,
                      transform: activePhoto === i ? 'scale(1)' : 'scale(1.04)',
                    }}
                  />
                ))}
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Label foto activa */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    {TALLER_PHOTOS[activePhoto].label}
                  </span>
                </div>

                {/* Contador fotos */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/70 font-bold">
                  {activePhoto + 1} / {TALLER_PHOTOS.length}
                </div>
              </div>

              {/* Dots de navegación */}
              <div className="flex justify-center gap-2 mt-4">
                {TALLER_PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activePhoto
                        ? 'w-6 h-2 bg-orange-500'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Ver foto ${i + 1}`}
                  />
                ))}
              </div>

              {/* Thumbnails strip */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {TALLER_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                      i === activePhoto
                        ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-[#0d0d14] scale-[1.03]'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Elemento decorativo */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border-2 border-orange-500/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-orange-500/5 border border-orange-500/10 -z-10" />
            </div>
          </BlurFade>
        </div>

        {/* ── VALORES / PILARES ── */}
        <BlurFade inView delay={0.1} duration={0.4}>
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-8 text-center">
              Nuestros pilares
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALUES.map((val, i) => (
                <BlurFade key={val.title} inView delay={0.1 + i * 0.08} duration={0.4}>
                  <div className="group bg-[#111118] border border-white/5 rounded-2xl p-5
                    hover:border-orange-500/25 hover:bg-[#16161f] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20
                      flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                      <span className="material-symbols-outlined text-orange-500 text-lg">{val.icon}</span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}