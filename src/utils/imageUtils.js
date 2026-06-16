const CLOUDINARY_MARKER = '/image/upload/';

const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1200, 1440, 1600];

export function isCloudinaryImage(src = '') {
  return typeof src === 'string' && src.includes('res.cloudinary.com') && src.includes(CLOUDINARY_MARKER);
}

function buildCloudinaryTransform({
  width,
  height,
  mode = 'limit',
  gravity = 'auto',
  quality = 'auto',
  format = 'auto',
  dpr,
  progressive = true,
} = {}) {
  const transform = [];
  const resize = [];

  transform.push(`f_${format}`);
  transform.push(`q_${quality}`);
  if (progressive) transform.push('fl_progressive');
  if (dpr) transform.push(`dpr_${dpr}`);

  if (mode) resize.push(`c_${mode}`);
  if (width) resize.push(`w_${Math.round(width)}`);
  if (height) resize.push(`h_${Math.round(height)}`);
  if (mode === 'fill' && gravity) resize.push(`g_${gravity}`);

  if (resize.length > 0) {
    transform.push(...resize);
  }

  return transform.join(',');
}

export function getOptimizedImageUrl(src, options = {}) {
  if (!src || !isCloudinaryImage(src)) return src;

  const markerIndex = src.indexOf(CLOUDINARY_MARKER);
  if (markerIndex === -1) return src;

  const base = src.slice(0, markerIndex + CLOUDINARY_MARKER.length);
  const rest = src.slice(markerIndex + CLOUDINARY_MARKER.length);
  if (/^(?:f_|q_|c_|w_|h_|g_|dpr_|fl_)/.test(rest)) return src;

  const transform = buildCloudinaryTransform(options);

  return `${base}${transform}/${rest}`;
}

export function getCloudinarySrcSet(src, options = {}) {
  if (!src || !isCloudinaryImage(src)) return undefined;

  const baseWidth = options.width ? Number(options.width) : null;
  const widths = baseWidth
    ? Array.from(new Set([...DEFAULT_WIDTHS.filter((w) => w <= baseWidth), baseWidth])).sort((a, b) => a - b)
    : DEFAULT_WIDTHS;

  return widths
    .map((width) => {
      const transformed = getOptimizedImageUrl(src, { ...options, width });
      return `${transformed} ${width}w`;
    })
    .join(', ');
}
