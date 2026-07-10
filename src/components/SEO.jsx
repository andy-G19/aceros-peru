import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Se define en .env / .env.example (VITE_SITE_URL) y en las Environment
// Variables de Vercel. Así, al cambiar de dominio, se actualiza en un solo lugar.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://aceros-peru.vercel.app').replace(/\/$/, '');
export const SITE_NAME = 'Industrias Aceros Peru';
export const DEFAULT_IMAGE =
  'https://res.cloudinary.com/daq3sbggo/image/upload/f_auto,q_auto:good,fl_progressive,c_limit,w_1200/v1772022472/port_dliyng.png';

const DEFAULT_DESCRIPTION =
  'Catalogo de herramientas de acero, lampas, rastrillos, tripodes para aspersor y productos para construccion, campo y jardineria en Peru.';

function absoluteUrl(value = '/') {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function normalizeText(value, fallback = '') {
  return String(value || fallback)
    .replace(/\s+/g, ' ')
    .trim();
}

function upsertMeta(selector, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector, attrs) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  structuredData,
}) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = normalizeText(title, SITE_NAME);
    const pageDescription = normalizeText(description, DEFAULT_DESCRIPTION).slice(0, 180);
    const canonicalUrl = absoluteUrl(canonicalPath || location.pathname);
    const imageUrl = absoluteUrl(image || DEFAULT_IMAGE);

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: pageDescription,
    });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow',
    });

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: pageDescription,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: pageDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    });

    const jsonLdId = 'page-json-ld';
    const existingJsonLd = document.getElementById(jsonLdId);

    if (structuredData) {
      const script = existingJsonLd || document.createElement('script');
      script.id = jsonLdId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      if (!existingJsonLd) document.head.appendChild(script);
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }
  }, [canonicalPath, description, image, location.pathname, noindex, structuredData, title, type]);

  return null;
}
