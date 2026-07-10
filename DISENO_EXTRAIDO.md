# Diseno extraido - Aceros Peru

## Identidad visual

El proyecto usa una estetica industrial oscura para un catalogo B2B de herramientas, con foco en acero, construccion, campo y cotizacion por WhatsApp.

- Marca: Industrias Aceros Peru
- Tono visual: tecnico, robusto, oscuro, metalurgico
- Uso principal: catalogo de productos y solicitud de cotizaciones
- Estilo UI: dark commerce, tarjetas compactas, imagenes reales de producto, textos en mayusculas y acentos ambar

## Stack de interfaz

- React 19
- Vite
- React Router
- Tailwind CSS
- CSS global en `src/index.css`
- Configuracion visual extendida en `tailwind.config.js`
- Iconos propios SVG mediante `src/components/Icon.jsx`
- Componentes visuales tipo Magic UI en `src/components/magicui`

## Paleta

### Base

| Token | Hex | Uso |
| --- | --- | --- |
| `--steel-950` | `#0f1011` | fondo principal global |
| `--steel-900` | `#17181a` | fondo secundario |
| `--steel-800` | `#232529` | superficies oscuras |
| `--steel-700` | `#3a3d42` | bordes y separadores |
| `--accent-amber` | `#f59e0b` | acento principal |

### Colores recurrentes en componentes

| Color | Uso |
| --- | --- |
| `#0a0a0f` | fondo de paginas principales |
| `#0d0d14` | secciones alternas |
| `#111118` | paneles, bloques internos e imagenes |
| `#16161f` | tarjetas y contenedores |
| `#1e1e2a` | fondo de imagen en tarjetas |
| `#f59e0b` / `amber-500` | acento, botones activos, subrayados |
| `#d97706` / `amber-600` | CTA principal y hover oscuro |
| `#25D366` | WhatsApp |
| `emerald-400/500` | disponibilidad, exito |
| `zinc-100..700` | texto, bordes y jerarquias neutras |

## Tipografia

- Fuente principal: `Rajdhani`
- Fallbacks: `Arial`, `Inter`, `sans-serif`
- Personalidad tipografica: condensada, industrial, muy usada en mayusculas
- Pesos frecuentes: `font-bold`, `font-black`
- Tratamiento recurrente:
  - Titulos: uppercase, `font-black`, tracking ajustado
  - Eyebrows: `text-[10px]`, uppercase, `tracking-[0.25em]` a `tracking-[0.3em]`
  - Microcopy tecnico: `text-xs` o `text-[10px]`, color zinc

## Layout general

- App SPA con rutas:
  - `/`
  - `/categories`
  - `/product/:id`
  - `/cart`
- Header sticky superior con ocultamiento al hacer scroll hacia abajo.
- Contenedores principales: `container mx-auto` o `max-w-screen-xl`.
- Padding responsive frecuente:
  - mobile: `px-4`
  - tablet: `md:px-8`
  - desktop: `lg:px-12`
- Fondos dark persistentes por pagina:
  - home: `bg-zinc-950`
  - catalogo/detalle/carrito: `bg-[#0a0a0f]`

## Patrones visuales

### Fondo global

El body combina:

- fondo oscuro `--steel-950`
- gradiente radial ambar muy suave
- gradiente radial blanco muy tenue
- patron diagonal repetido

El resultado es un fondo industrial, oscuro y texturizado sin competir con las imagenes.

### Secciones

Las secciones alternan entre:

- `bg-[#0a0a0f]`
- `bg-[#0d0d14]`
- `bg-zinc-900/80`
- bordes `border-white/5`
- lineas superiores con gradiente hacia ambar
- textura de grid sutil en algunas secciones

### Tarjetas

Patron principal:

- fondo `#16161f`
- borde `border-white/5`
- radio entre `rounded-xl` y `rounded-2xl`
- hover con borde ambar suave
- imagen sobre fondo `#1e1e2a` o `#111118`
- shadow solo en elementos destacados, no en todo el layout

### CTAs

CTA principal:

- fondo `amber-500` o `amber-600`
- texto oscuro en header/home o blanco en catalogo/detalle
- uppercase
- tracking amplio
- hover a `amber-400` o `amber-500`

CTA WhatsApp:

- `#25D366`
- hover `#128C7E` o `#20BA5A`
- usado como boton flotante, boton de cotizacion y accion final del carrito

### Badges y chips

- Activos: fondo ambar, texto blanco o zinc oscuro.
- Secundarios: fondo oscuro, borde blanco tenue.
- Informativos: `amber-500/10`, `border-amber-500/20`.
- Disponibilidad: punto verde con `animate-pulse`.

## Componentes clave

### Header

Archivo: `src/components/Header.jsx`

- Sticky top con `bg-zinc-950/95` y `backdrop-blur`.
- Top bar desktop con mensaje industrial, horario y telefono.
- Logo + texto "Industrias Aceros Peru".
- Buscador central desktop y buscador full-width mobile.
- Acciones: WhatsApp, cuenta, carrito, menu mobile.
- Navegacion por categorias en chips rectangulares.
- Menu mobile desplegable con CTA WhatsApp y categorias.

### Home hero

Archivo: `src/pages/Home.jsx`

- Hero full-bleed con imagen Cloudinary.
- Imagen oscurecida con `brightness-50`.
- Overlays: radial, diagonal, gradiente inferior.
- H1 enorme, multilinea, uppercase.
- Primeras lineas en zinc claro, remate en ambar.
- CTAs: "Ver catalogo tecnico" y "Ver productos".

### Catalogo

Archivo: `src/pages/Categories.jsx`

- Header strip compacto con breadcrumb, titulo y contador.
- Sidebar desktop sticky con filtros, ordenamiento y categorias.
- Drawer mobile para filtros.
- Chips activos removibles.
- Grid de productos:
  - 2 columnas mobile
  - 3 columnas tablet
  - 4 columnas desktop
- Empty state con icono, texto y CTA.

### Producto

Archivo: `src/pages/ProductDetail.jsx`

- Back bar sticky.
- Layout desktop en dos columnas.
- Imagen principal cuadrada con badges de disponibilidad y categoria.
- Miniaturas si hay multiples imagenes.
- Informacion del producto con marca, codigo, nombre y descripcion.
- Selector de variantes si el producto tiene `sizes`.
- Bloque B2B sin precios: "Venta por docena" / "Precio a cotizar".
- CTA principal de carrito y CTA secundario WhatsApp.
- Barra flotante mobile inferior.
- Modal para zoom de imagen.

### Carrito

Archivo: `src/pages/Cart.jsx`

- Modo catalogo B2B: precios ocultos (`SHOW_PRICES = false`).
- Items con imagen cuadrada, categoria, nombre, variante y cantidad.
- Unidad de venta como chip ambar.
- Resumen del pedido con mensaje de cotizacion.
- CTA final WhatsApp verde.
- Empty state centrado cuando no hay productos.

### ProductCard

Archivo: `src/components/ProductCard.jsx`

- Card oscura con MagicCard.
- Imagen cuadrada `object-contain`.
- Marca como eyebrow ambar tenue.
- Codigo en zinc.
- Nombre uppercase y `font-black`.
- Bloque de volumen/precio a consultar.
- Boton "Cotizar" con icono de carrito.

## Movimiento y microinteracciones

- `BlurFade` para aparicion de secciones y tarjetas.
- Hover scale en imagenes de producto y banners.
- Header se oculta al hacer scroll hacia abajo y reaparece al subir.
- Botones con `active:scale-*`.
- Badges de disponibilidad y WhatsApp con pulse.
- Modales con backdrop oscuro y blur.
- Drawer mobile con transform `translateX`.

## Sistema responsive

- Mobile first.
- Header desktop y mobile separados parcialmente.
- Catalogo:
  - filtros en drawer mobile
  - sidebar sticky desde `lg`
- Producto:
  - mobile con barra CTA fija inferior
  - desktop con CTA dentro del contenido
- Grids:
  - productos: `grid-cols-2`, `md:grid-cols-3`, `xl:grid-cols-4`
  - secciones informativas: una columna mobile, multiples columnas desktop

## Activos visuales

- Logo local:
  - `src/assets/logo.png`
  - `src/assets/logo-160.png`
- Imagen hero principal:
  - `https://res.cloudinary.com/daq3sbggo/image/upload/v1772022472/port_dliyng.png`
- Imagenes de categorias, subcategorias, taller y productos servidas desde Cloudinary.

## Reglas para mantener consistencia

1. Usar fondos `#0a0a0f`, `#0d0d14`, `#111118`, `#16161f`.
2. Reservar ambar para accion, seleccion, enfasis y lineas de seccion.
3. Mantener titulos en uppercase con `font-black`.
4. Usar imagenes reales de producto o taller siempre que sea posible.
5. Mantener tarjetas con borde blanco tenue y hover ambar suave.
6. Usar WhatsApp verde solo para contacto/cotizacion.
7. Evitar fondos claros: el proyecto esta disenado como dark UI.
8. No mostrar precios si se mantiene el modo catalogo B2B.
9. En mobile, priorizar acciones grandes y filtros en drawer.
10. Mantener el lenguaje de venta por volumen: docena, cotizacion, asesor tecnico.

## Problemas observados

- Hay textos con codificacion rota en varios archivos fuente, por ejemplo `PerÃº`, `CategorÃ­as`, `AÃ±adir`. Visualmente conviene normalizarlos a UTF-8 si se va a hacer una limpieza de contenido.
- `DESIGN_SYSTEM.md` documenta la base visual, pero no cubre todos los patrones actuales de componentes, como header sticky, cards B2B, drawer, carrito y detalle de producto.
