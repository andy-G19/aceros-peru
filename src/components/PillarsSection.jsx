import React from 'react';
import { BlurFade } from '../components/magicui/blur-fade';

const VALUES = [
  {
    icon: 'handyman',
    title: 'Artesania Nacional',
    desc: 'Cada herramienta es fabricada con acero nacional de alta tenacidad, controlando cada etapa del proceso productivo.',
  },
  {
    icon: 'verified_user',
    title: 'Garantia Real',
    desc: 'Respaldamos nuestros productos con garantia de fabrica. Si falla, la reponemos sin preguntas.',
  },
  {
    icon: 'groups',
    title: 'Compromiso Agricola',
    desc: 'Trabajamos de la mano con agricultores, ferreterias y contratistas para entender sus necesidades reales.',
  },
  {
    icon: 'timeline',
    title: '+15 Anos de Experiencia',
    desc: 'Desde Andahuaylas-Apurimac distribuimos a todo el Peru, con conocimiento profundo del sector agricola y de construccion.',
  },
];

export default function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d14] py-16 md:py-24">
      <div className="relative max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
        <BlurFade inView delay={0.1} duration={0.4}>
          <div className="border-t border-white/5 pt-12">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-8 text-center">
              Nuestros pilares
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALUES.map((val, i) => (
                <BlurFade key={val.title} inView delay={0.1 + i * 0.08} duration={0.4}>
                  <div className="group bg-[#111118] border border-white/5 rounded-2xl p-5 hover:border-amber-500/25 hover:bg-[#16161f] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <span className="material-symbols-outlined text-amber-500 text-lg">{val.icon}</span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
