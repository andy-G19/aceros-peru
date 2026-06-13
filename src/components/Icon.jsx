import React from 'react';

const iconPaths = {
  add: <path d="M12 5v14M5 12h14" />,
  add_shopping_cart: (
    <>
      <path d="M3 4h2.2l2.3 10.1a2.4 2.4 0 0 0 2.3 1.9h7.4a2.4 2.4 0 0 0 2.3-1.8L21 8H7" />
      <path d="M9 8h10.8l-1.2 5.1a1.4 1.4 0 0 1-1.4 1H10.1a1.4 1.4 0 0 1-1.4-1.1L7.5 8" />
      <path d="M14 9.8v3.8M12.1 11.7h3.8" />
      <circle cx="10" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </>
  ),
  arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
  apps: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  category: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.3 2.3 4.7-5" />
    </>
  ),
  chevron_right: <path d="m9 18 6-6-6-6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  construction: (
    <>
      <path d="m2.5 20.5 7.2-7.2" />
      <path d="m14.5 6.5 3-3 3 3-3 3" />
      <path d="m8.5 15.5-2-2 8-8 2 2-8 8Z" />
      <path d="m13 8 3 3" />
    </>
  ),
  delete: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  delete_sweep: (
    <>
      <path d="M3 6h12M5 6l1 13h8l1-13M8 6V3h4v3" />
      <path d="M18 10h3M17 14h4M16 18h5" />
    </>
  ),
  directions: (
    <>
      <path d="M12 3 3 12l9 9 9-9-9-9Z" />
      <path d="M10 16v-4h5M15 12l-3-3" />
    </>
  ),
  expand_less: <path d="m18 15-6-6-6 6" />,
  expand_more: <path d="m6 9 6 6 6-6" />,
  groups: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 11a2.5 2.5 0 1 0 0-5" />
      <path d="M17 14a4.5 4.5 0 0 1 3.5 5" />
    </>
  ),
  handyman: (
    <>
      <path d="m14.5 6.5 3-3 3 3-3 3" />
      <path d="m2.5 20.5 8-8" />
      <path d="m7.5 9.5 7 7" />
      <path d="m5.5 7.5 2-2 11 11-2 2-11-11Z" />
    </>
  ),
  home_repair_service: (
    <>
      <path d="M4 10h16v9H4z" />
      <path d="M8 10V7h8v3" />
      <path d="M4 14h16" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="10" r="1.5" />
      <path d="m21 16-5-5L5 19" />
    </>
  ),
  image_not_supported: (
    <>
      <path d="M3 3l18 18" />
      <path d="M5 5h14a2 2 0 0 1 2 2v10" />
      <path d="M19 19H5a2 2 0 0 1-2-2V7" />
      <path d="m8 15 2-2 2 2 1.5-1.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7h.01" />
    </>
  ),
  inventory_2: (
    <>
      <path d="M4 8h16" />
      <path d="M5 8l1.2 12h11.6L19 8" />
      <path d="M7 4h10l2 4H5l2-4Z" />
      <path d="M9 12h6" />
    </>
  ),
  local_shipping: (
    <>
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  location_on: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  more_horiz: (
    <>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </>
  ),
  open_in_new: (
    <>
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </>
  ),
  park: (
    <>
      <path d="M12 21v-7" />
      <path d="m7 14 5-11 5 11H7Z" />
      <path d="M9 10h6" />
    </>
  ),
  payments: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </>
  ),
  person_outline: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
  ),
  precision_manufacturing: (
    <>
      <path d="M6 21V9l6-4 6 4v12" />
      <path d="M9 21v-7h6v7" />
      <path d="M8 9h8" />
    </>
  ),
  receipt_long: (
    <>
      <path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  remove: <path d="M5 12h14" />,
  request_quote: (
    <>
      <path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z" />
      <path d="M12 7v10" />
      <path d="M9.5 9.5A2.5 2.5 0 0 1 12 8c1.4 0 2.5.8 2.5 2s-1.1 2-2.5 2-2.5.8-2.5 2 1.1 2 2.5 2a2.5 2.5 0 0 0 2.5-1.5" />
    </>
  ),
  schedule: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  search_off: (
    <>
      <path d="M3 3l18 18" />
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  shopping_cart: (
    <>
      <path d="M3 4h2.2l2.3 10.1a2.4 2.4 0 0 0 2.3 1.9h7.4a2.4 2.4 0 0 0 2.3-1.8L21 8H7" />
      <path d="M9 8h10.8l-1.2 5.1a1.4 1.4 0 0 1-1.4 1H10.1a1.4 1.4 0 0 1-1.4-1.1L7.5 8" />
      <circle cx="10" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </>
  ),
  support_agent: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
      <path d="M20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
      <path d="M14 20h-3" />
    </>
  ),
  timeline: (
    <>
      <path d="M4 18h4l4-8 4 4h4" />
      <circle cx="4" cy="18" r="1.5" />
      <circle cx="12" cy="10" r="1.5" />
      <circle cx="20" cy="14" r="1.5" />
    </>
  ),
  tune: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10M4 12h4M12 12h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
      <circle cx="10" cy="12" r="2" />
    </>
  ),
  verified_user: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  water_drop: (
    <path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11Z" />
  ),
  yard: (
    <>
      <path d="M12 21c0-7 5-12 9-15-7 0-12 5-12 12" />
      <path d="M12 21c0-6-4-10-9-12 1 6 5 10 9 12Z" />
    </>
  ),
  zoom_in: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
    </>
  ),
};

export default function Icon({ name, className = '', title, ...props }) {
  const iconName = String(name || '').trim();
  const paths = iconPaths[iconName] || iconPaths.category;

  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={`inline-block h-[1em] w-[1em] shrink-0 align-[-0.125em] ${className}`}
      fill="none"
      focusable="false"
      role={title ? 'img' : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths}
    </svg>
  );
}
