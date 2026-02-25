// Importar categorías
export { categories } from './categories';

// Importar productos por categoría
import { herramientasAcero } from './herramientas-acero';
import { herramientasGanzo } from './herramientas-ganzo';
import { rastrillos } from './rastrillos';
import { construccion } from './construccion';
import { tripodes } from './tripodes';
import { otros } from './otros';

// Exportar todos los productos combinados
export const products = [
  ...herramientasAcero,
  ...herramientasGanzo,
  ...rastrillos,
  ...construccion,
  ...tripodes,
  ...otros
];

// Exportar también por categoría (opcional, para uso específico)
export {
  herramientasAcero,
  herramientasGanzo,
  rastrillos,
  construccion,
  tripodes,
  otros
};
