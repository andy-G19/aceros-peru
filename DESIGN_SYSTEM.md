# Sistema de Diseño - Aceros Perú

## Paleta de Colores

### Variables CSS (en :root)
```css
--steel-950: #0f1011;     /* Color de fondo principal muy oscuro */
--steel-900: #17181a;     /* Fondo secundario */
--steel-800: #232529;     /* Elementos oscuros */
--steel-700: #3a3d42;     /* Bordes y separadores */
--accent-amber: #f59e0b;  /* Color de acento principal */
```

### Colores Tailwind
```javascript
colors: {
  primary: "#f59e0b",          // Naranja/Ámbar principal
  "primary-hover": "#d97706",  // Naranja/Ámbar oscuro (hover)
}
```

### Resumen de Colores
| Uso | Color | Hex |
|-----|-------|-----|
| Fondo Principal | Steel 950 | #0f1011 |
| Fondo Secundario | Steel 900 | #17181a |
| Elementos | Steel 800 | #232529 |
| Bordes | Steel 700 | #3a3d42 |
| Acento Principal | Amber | #f59e0b |
| Acento Hover | Amber Oscuro | #d97706 |
| Texto Principal | Blanco Grisáceo | #f4f4f5 |

---

## Tipografía

### Fuente Principal
- **Familia**: Rajdhani (Google Fonts)
- **Pesos**: 400, 500, 600, 700
- **URL**: `https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap`
- **Alternativas**: Inter, sans-serif

### Configuración en CSS
```css
font-family: 'Rajdhani', 'Inter', sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

---

## Animaciones

### Keyframes Definidas

#### 1. Meteor Animation
```javascript
keyframes: {
  meteor: {
    "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
    "70%": { opacity: "1" },
    "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
  }
}
```

#### 2. Border Beam Animation
```javascript
keyframes: {
  "border-beam": {
    "100%": { "offset-distance": "100%" },
  }
}
```

#### 3. Grid Animation
```javascript
keyframes: {
  grid: {
    "0%": { transform: "translateY(-50%)" },
    "100%": { transform: "translateY(0)" },
  }
}
```

### Animaciones Nombradas
```javascript
animation: {
  "meteor": "meteor var(--duration, 8s) var(--delay, 0s) linear infinite",
  "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
  "grid": "grid 15s linear infinite",
}
```

---

## Fondo Degradado Global

### Configuración
```css
background-color: var(--steel-950);
background-image:
  radial-gradient(circle at 10% -10%, rgba(245, 158, 11, 0.08), transparent 35%),
  radial-gradient(circle at 90% 0%, rgba(255, 255, 255, 0.06), transparent 30%),
  repeating-linear-gradient(
    -35deg,
    rgba(255, 255, 255, 0.02) 0,
    rgba(255, 255, 255, 0.02) 2px,
    transparent 2px,
    transparent 14px
  );
```

Crea un efecto de:
- Gradiente radial con ámbar translúcido
- Gradiente radial con blanco translúcido
- Patrón diagonal sutil repetido

---

## Scrollbar Personalizado

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--steel-900);
}

::-webkit-scrollbar-thumb {
  background-color: var(--steel-700);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #525660;
}
```

---

## Configuración Adicional

### Dark Mode
- **Modo**: `class` (se activa mediante clase en HTML)

### Comportamiento de Scroll
```css
scroll-behavior: smooth;
```

### Ícono de Material Symbols
```css
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

---

## Dependencias Requeridas

```json
{
  "devDependencies": {
    "tailwindcss": "^3.x",
    "@tailwindcss/forms": "^latest",
    "postcss": "^8.x"
  }
}
```

---

## Cómo Usar en Otro Proyecto

### Opción 1: Copiar configuración de Tailwind
Copia la configuración de `tailwind.config.js` a tu nuevo proyecto.

### Opción 2: Copiar estilos CSS
Copia las variables CSS y estilos del `index.css` a tu proyecto.

### Opción 3: Crear archivo de configuración compartido
Crea un archivo JavaScript que exporte toda la configuración y úsalo en múltiples proyectos.
