import React, { useState, useEffect, useRef } from 'react';
import { BlurFade } from '../components/magicui/blur-fade';

/* ══════════════════════════════════════════════════════════
   CONFIGURACIÓN — datos del taller
   Fuente: https://maps.app.goo.gl/IndustriasAcerosPeruSAC
══════════════════════════════════════════════════════════ */
const TALLER_INFO = {
  name: 'Industrias Aceros Perú S.A.C.',
  address: 'Andahuaylailla, Apurímac',
  city: 'Apurímac, Perú',
  reference: 'Búscanos en Google Maps como "INDUSTRIAS ACEROS PERU SAC"',
  phone: '+51 983 955 913',
  email: 'ventas@acerosperucodimag.com',
  hours: [
    { days: 'Lun – Vie', time: '8:00 am – 6:00 pm' },
    { days: 'Sábado',    time: '8:00 am – 2:00 pm' },
    { days: 'Domingo',   time: 'Cerrado' },
  ],
  lat: -13.6586937,
  lng: -73.4015937,
};

/* Embed usando el Place ID extraído de la URL de Google Maps */
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d542.0!2d-73.4011915!3d-13.6586761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916d2b863d45bb11%3A0x751d07b7cad3534a!2sINDUSTRIAS+ACEROS+PERU+SAC!5e1!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe';

/* URL directa a Google Maps para "Abrir en Maps" — abre el lugar exacto */
const GMAPS_URL =
  'https://www.google.com/maps/place/INDUSTRIAS+ACEROS+PERU+SAC/@-13.6586761,-73.4011915,542m/data=!3m1!1e3!4m6!3m5!1s0x916d2b863d45bb11:0x751d07b7cad3534a!8m2!3d-13.6586937!4d-73.4015937!16s%2Fg%2F11hdg0z8z8';

/* ── ContactChip ─────────────────────────────────────────── */
function ContactChip({ icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-3 p-3.5 bg-[#111118] border border-white/5 rounded-xl
      hover:border-orange-500/25 hover:bg-[#16161f] transition-all duration-200 group cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="material-symbols-outlined text-orange-500 text-base">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors truncate">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}

/* ══════════════════════════════════════════════════════════
   LOCATION SECTION
══════════════════════════════════════════════════════════ */
export default function LocationSection() {
  const [mapLoaded, setMapLoaded]   = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const sectionRef = useRef(null);

  /* Lazy load del iframe cuando la sección entra en viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0f] py-16 md:py-24"
    >
      {/* Decoración superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-orange-600/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── HEADER ── */}
        <BlurFade inView delay={0.05} duration={0.5}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-[3px] h-5 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.3em]">
              Encuéntranos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-1">
            Nuestra
          </h2>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-orange-500 leading-none mb-10">
            Ubicación
          </h2>
        </BlurFade>

        {/* ── LAYOUT PRINCIPAL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* ── MAPA (3/5) ── */}
          <BlurFade inView delay={0.1} duration={0.5} className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl bg-[#111118]"
              style={{ aspectRatio: '4/3' }}>

              {/* Loader skeleton mientras carga */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-[#111118]">
                  <div className="w-12 h-12 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Cargando mapa…</p>
                </div>
              )}

              {/* Google Maps Embed (lazy) */}
              {mapVisible && (
                <iframe
                  title="Ubicación Aceros Perú - Codimag"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className="absolute inset-0 w-full h-full"
                />
              )}

              {/* Overlay con nombre del taller */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0 animate-pulse" />
                  <p className="text-xs font-black text-white uppercase tracking-widest">{TALLER_INFO.name}</p>
                </div>
              </div>

              {/* Botón "Abrir en Google Maps" sobrepuesto */}
              <a
                href={GMAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-2 bg-[#0a0a0f]/85 backdrop-blur-sm
                  border border-white/15 hover:border-orange-500/40 text-white text-[10px] font-black
                  uppercase tracking-widest px-3 py-2 rounded-xl transition-all hover:bg-[#16161f]/90 group"
              >
                <span className="material-symbols-outlined text-orange-500 text-sm group-hover:scale-110 transition-transform">
                  open_in_new
                </span>
                Abrir en Maps
              </a>
            </div>
          </BlurFade>

          {/* ── INFO LATERAL (2/5) ── */}
          <BlurFade inView delay={0.2} duration={0.5} className="lg:col-span-2">
            <div className="space-y-4">

              {/* Dirección destacada */}
              <div className="bg-[#111118] border border-orange-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-orange-500 text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Dirección</p>
                    <p className="text-sm font-black text-white">{TALLER_INFO.address}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{TALLER_INFO.city}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Referencia</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{TALLER_INFO.reference}</p>
                </div>

                <a
                  href={GMAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl
                    bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase
                    tracking-widest transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-base">directions</span>
                  Cómo llegar
                </a>
              </div>

              {/* Contacto */}
              <ContactChip
                icon="phone"
                label="Teléfono / WhatsApp"
                value={TALLER_INFO.phone}
                href={`https://wa.me/51983955913`}
              />
              <ContactChip
                icon="mail"
                label="Correo electrónico"
                value={TALLER_INFO.email}
                href={`mailto:${TALLER_INFO.email}`}
              />

              {/* Horarios */}
              <div className="bg-[#111118] border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-orange-500 text-base">schedule</span>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Horario de Atención</p>
                </div>
                <div className="space-y-2">
                  {TALLER_INFO.hours.map((h, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-medium">{h.days}</span>
                      <span className={`text-[11px] font-bold ${h.time === 'Cerrado' ? 'text-red-400' : 'text-white'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Indicador "Abierto ahora" */}
                <OpenNowBadge hours={TALLER_INFO.hours} />
              </div>

            </div>
          </BlurFade>
        </div>

        {/* ── STRIP ZONAS DE DISTRIBUCIÓN ── */}
        <BlurFade inView delay={0.15} duration={0.4}>
          <div className="mt-10 p-5 rounded-2xl bg-[#111118] border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-orange-500 text-lg">local_shipping</span>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Distribuimos a todo el Perú</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { region: 'Lima Metropolitana', icon: 'apartment',     detail: 'Entrega en 24h' },
                { region: 'Sierra Sur',          icon: 'landscape',    detail: 'Arequipa, Cusco, Puno' },
                { region: 'Sierra Norte',        icon: 'terrain',      detail: 'Cajamarca, Ancash' },
                { region: 'Provincias Costa',    icon: 'waves',        detail: 'Piura, Trujillo, Ica' },
              ].map((z) => (
                <div key={z.region} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0d0d14] border border-white/5">
                  <span className="material-symbols-outlined text-orange-500/60 text-sm flex-shrink-0 mt-0.5">{z.icon}</span>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase leading-tight">{z.region}</p>
                    <p className="text-[9px] text-gray-600 mt-0.5">{z.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}

/* ── Indicador "Abierto ahora" ──────────────────────────── */
function OpenNowBadge() {
  const now  = new Date();
  const day  = now.getDay(); // 0=Dom, 1=Lun … 6=Sáb
  const hour = now.getHours() + now.getMinutes() / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5 && hour >= 8 && hour < 18) isOpen = true;
  if (day === 6 && hour >= 8 && hour < 14) isOpen = true;

  return (
    <div className={`mt-3 pt-3 border-t border-white/5 flex items-center gap-2`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${isOpen ? 'text-emerald-400' : 'text-red-400'}`}>
        {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
      </span>
    </div>
  );
}