import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { BlurFade } from './magicui/blur-fade';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const goProduct = (product) => navigate(`/product/${product.id}`, { state: { product } });
  const goCatalog = () => navigate('/categories');

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-10 md:px-8 lg:px-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Destacadas</h2>
          <div className="mt-1.5 h-[3px] w-14 rounded-full bg-amber-500" />
        </div>
        <button
          onClick={goCatalog}
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-400"
        >
          Ver todo <span className="text-base">-</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {products.slice(0, 8).map((product, i) => (
          <BlurFade key={product.id} inView delay={i * 0.03} yOffset={10} duration={0.3}>
            <ProductCard product={product} onViewDetails={goProduct} />
          </BlurFade>
        ))}
      </div>

      {products.length > 8 && (
        <BlurFade inView delay={0.1} className="mt-8 text-center">
          <button
            onClick={goCatalog}
            className="mx-auto rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:bg-amber-400"
          >
            Ver todos los productos
          </button>
        </BlurFade>
      )}
    </section>
  );
}
