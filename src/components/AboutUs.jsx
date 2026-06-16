import React, { useState, useRef, useEffect } from 'react';
import { BlurFade } from '../components/magicui/blur-fade';
import OptimizedImage from './OptimizedImage';

/* Fotos del taller */
const TALLER_PHOTOS = [
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1779319971/a0ddcf2e-6a99-42ed-bf2e-947614c2068c_sxy89q.jpg',
    label: 'Taller Industrias Aceros Perú',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1779319971/04369818-d376-4df7-843a-f175d032f733_zsasut.jpg',
    label: 'Estación de Pintura',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1779319973/Gemini_Generated_Image_5ydhss5ydhss5ydh_uiapzo.png',
    label: 'Estación de Forjado',
  },
  {
    src: 'https://res.cloudinary.com/daq3sbggo/image/upload/v1779319971/57539d80-49ae-4bd9-b023-4800e497a410_ji0yos.jpg',
    label: 'Empaquetado y Envíos',
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
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
        <BlurFade inView delay={0.05} duration={0.5}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-5 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-black text-amber-500/70 uppercase tracking-[0.3em]">
              Nuestra Historia
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-1">
            ¿Quiénes
          </h2>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-amber-500 leading-none mb-8">
            Somos?
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <BlurFade inView delay={0.1} duration={0.5}>
              <div className="space-y-5 text-zinc-400 leading-relaxed">
                <p className="text-base md:text-lg text-zinc-200 font-medium border-l-2 border-amber-500 pl-4">
                  Somos <span className="text-amber-400 font-bold">Industrias Aceros Perú</span>, empresa distribuidora
                  especializada en herramientas agrícolas y de construcción con más de{' '}
                  <span className="text-white font-bold">15 años</span> en el mercado peruano.
                </p>
                <p>
                  Nacimos con la misión de llevar herramientas de calidad real al campo y a la obra.
                  Trabajamos directamente con fabricantes nacionales que dominan el arte del forjado
                  en acero, garantizando que cada lampa, rejilla o rastrillo llegue con la resistencia
                  que el trabajo duro exige.
                </p>
                <p>
                  A lo largo de los años hemos construido relaciones sólidas con agricultores de la
                  sierra y la costa, ferreterías de todo el país y contratistas de obra civil que
                  confían en nosotros porque saben que detrás de cada herramienta hay un proceso de
                  control de calidad riguroso y un equipo dispuesto a responder.
                </p>
                <p>
                  Distribuimos las líneas <span className="text-white font-semibold">Herramientas Aceros Perú</span> y{' '}
                  <span className="text-white font-semibold">Herramientas El Ganzo</span>, referentes
                  nacionales en lampas forjadas, rejillas agrícolas, rastrillos y
                  herramientas de construcción. Ofrecemos venta al por mayor con cotización inmediata
                  vía WhatsApp.
                </p>
              </div>
            </BlurFade>
          </div>

          <BlurFade inView delay={0.2} duration={0.5}>
            <div className="relative">
              <div
                className="relative rounded-2xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl"
                style={{ aspectRatio: '4/3' }}
              >
                <OptimizedImage
                  key={TALLER_PHOTOS[activePhoto].src}
                  src={TALLER_PHOTOS[activePhoto].src}
                  alt={TALLER_PHOTOS[activePhoto].alt || TALLER_PHOTOS[activePhoto].label}
                  width={1200}
                  height={900}
                  mode="fill"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    {TALLER_PHOTOS[activePhoto].label}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/70 font-bold">
                  {activePhoto + 1} / {TALLER_PHOTOS.length}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {TALLER_PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activePhoto ? 'w-6 h-2 bg-amber-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Ver foto ${i + 1}`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 mt-3">
                {TALLER_PHOTOS.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                      i === activePhoto
                        ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0d0d14] scale-[1.03]'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                    style={{ aspectRatio: '1/1' }}
                    aria-label={`Ver ${photo.label}`}
                    aria-current={i === activePhoto ? 'true' : undefined}
                  >
                    <OptimizedImage
                      src={photo.src}
                      alt={photo.alt || photo.label}
                      width={280}
                      height={280}
                      mode="fill"
                      sizes="(max-width: 1024px) 22vw, 12vw"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border-2 border-amber-500/20 -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-amber-500/5 border border-amber-500/10 -z-10" />
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
