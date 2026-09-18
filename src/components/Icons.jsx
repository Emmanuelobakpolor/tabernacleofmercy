// Simple, consistent line icons. Stroke-based so they sit well beside
// traditional serif-free headings without looking like a tech product.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  church: (
    <>
      <path d="M12 2v6M9.5 4.5h5" />
      <path d="M12 8 5 12.5V22h14v-9.5L12 8Z" />
      <path d="M10 22v-4.5a2 2 0 0 1 4 0V22" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5v-15Z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18H19v3H5.5A1.5 1.5 0 0 1 4 19.5Z" />
      <path d="M11.5 7h3M13 5.5v3" />
    </>
  ),
  prayer: (
    <>
      <path d="M12 3c-1.2 2.6-2.7 4.4-4.2 5.7C6.2 10 5.5 11.3 5.5 13v3.5h13V13c0-1.7-.7-3-2.3-4.3C14.7 7.4 13.2 5.6 12 3Z" />
      <path d="M5.5 16.5h13M8 21h8" />
    </>
  ),
  dove: (
    <>
      <path d="M21 5c-2.4 0-4.3 1-5.6 2.6C13.8 9.5 12.6 12 9.8 12H4l3.2 3.2A7 7 0 0 0 19 11V8l2-3Z" />
      <path d="M9.8 12v3.5a4 4 0 0 0 4 4h1" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 14.6A5.5 5.5 0 0 1 20.5 20" />
    </>
  ),
  hands: (
    <>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M11 12V4.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M14 12V6.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6H9.8a4 4 0 0 1-3.1-1.5L4 16.2a1.6 1.6 0 0 1 2.4-2.1L8 15.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  tithe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10M14.6 9.3c-.6-.7-1.5-1-2.6-1-1.6 0-2.7.8-2.7 2 0 2.8 5.5 1.5 5.5 4.3 0 1.3-1.2 2.1-2.8 2.1-1.2 0-2.1-.4-2.7-1.1" />
    </>
  ),
  offering: (
    <>
      <path d="M3 9h18l-1.4 10.2a2 2 0 0 1-2 1.8H6.4a2 2 0 0 1-2-1.8L3 9Z" />
      <path d="M8 9V6.5A3.5 3.5 0 0 1 11.5 3h1A3.5 3.5 0 0 1 16 6.5V9" />
    </>
  ),
  thanks: (
    <>
      <path d="M12 20.5s-7.5-4.3-7.5-9.7A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 3.2c0 5.4-7.5 9.7-7.5 9.7Z" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6.5L12 3l8 3.5V21" />
      <path d="M2.5 21h19M9 21v-4.5h6V21" />
      <path d="M8.5 9h2M13.5 9h2M8.5 12.5h2M13.5 12.5h2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.8 6.5 8.2 6 8.2-6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 16 12l-6 3.5v-7Z" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11M8 11l4 3.5 4-3.5" />
      <path d="M4.5 17v2.5h15V17" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  arrowRight: <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  arrowLeft: <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />,
  check: <path d="M4.5 12.5 9.5 17.5 19.5 7" />,
  quote: (
    <path d="M9.5 6C6.4 7.3 4.5 10 4.5 13.2c0 2.8 1.6 4.8 3.9 4.8 2 0 3.5-1.5 3.5-3.5s-1.4-3.4-3.3-3.4h-.5C8.4 9.4 9.5 8 11 7.1L9.5 6Zm9 0c-3.1 1.3-5 4-5 7.2 0 2.8 1.6 4.8 3.9 4.8 2 0 3.5-1.5 3.5-3.5s-1.4-3.4-3.3-3.4h-.5c.3-1.7 1.4-3.1 2.9-4L18.5 6Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.7 13.6L3.2 21l4.5-1.1A9 9 0 1 0 12 3Zm4.4 12.2c-.2.6-1.1 1.1-1.6 1.2-.9.1-1.6 0-3.4-.8-2.9-1.3-4.7-4.2-4.8-4.4-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 1c.3.1.4.2.5.3 0 .1 0 .6-.2 1.2Z" />
  ),
  facebook: (
    <path
      d="M15.5 8.5h-2A1 1 0 0 0 12.5 9.5V12h3l-.4 3h-2.6v7h-3v-7H7v-3h2.5V9.3A3.8 3.8 0 0 1 13.3 5.5h2.2v3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </>
  ),
  x: (
    <path
      d="M4 4h3.8l4.1 5.6L16.6 4H20l-6.4 8L20.4 20h-3.8l-4.4-6L6.9 20H3.5l6.8-8.4L4 4Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  cross: <path d="M12 3v18M7 8h10" />,
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 7h15M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
      <path d="M6.5 7 7.3 19a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7" />
      <path d="M10.3 11v6M13.7 11v6" />
    </>
  ),
  spark: (
    <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18" />
  ),
  avatar: (
    <>
      <circle cx="12" cy="8" r="4" fill="currentColor" stroke="none" />
      <path d="M4 20.5c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function Icon({ name, className = 'h-6 w-6', ...rest }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} {...rest}>
      {d}
    </svg>
  )
}
