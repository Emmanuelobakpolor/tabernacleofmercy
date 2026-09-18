import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Icon from './Icons'
import { church } from '../data/site'
import { popVariants } from '../lib/motion'

/* --------------------------------------------------------------------------
   Scroll to top on every route change
   -------------------------------------------------------------------------- */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

/* --------------------------------------------------------------------------
   Gentle reveal on scroll (respects prefers-reduced-motion via CSS)
   -------------------------------------------------------------------------- */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fail open: if IntersectionObserver is unavailable, show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)

    // Safety net: never leave content permanently invisible if the observer
    // does not fire (print, headless capture, restored scroll position).
    const fallback = setTimeout(() => setShown(true), 1600)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   Inner-page banner with photo + blue overlay + breadcrumb
   -------------------------------------------------------------------------- */
export function PageBanner({ title, subtitle, image, crumb }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-brand-deep/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/65 via-brand-deep/20 to-transparent" />

      <div className="container relative py-20 text-center sm:py-24 lg:py-28">
        <h1 className="font-heading text-[34px] font-bold leading-[1.15] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.35)] sm:text-[44px] lg:text-[52px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-[1.75] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.3)]">
            {subtitle}
          </p>
        )}
        <nav
          aria-label="Breadcrumb"
          className="mt-7 flex items-center justify-center gap-2.5 font-heading text-[14px] text-white/80"
        >
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="font-medium text-white">{crumb || title}</span>
        </nav>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Section heading (left or centre aligned)
   -------------------------------------------------------------------------- */
export function SectionHeading({ eyebrow, title, lede, align = 'center', light = false }) {
  const centred = align === 'center'
  return (
    <div className={`${centred ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className={`eyebrow ${light ? '!text-white/70' : ''}`}>{eyebrow}</p>
      )}
      <h2 className={`section-title ${light ? '!text-white' : ''}`}>{title}</h2>
      <span className={`${centred ? 'rule-center' : 'rule'} ${light ? '!bg-white/60' : ''}`} />
      {lede && <p className={`lede ${light ? '!text-white/80' : ''}`}>{lede}</p>}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Floating WhatsApp button
   -------------------------------------------------------------------------- */
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${church.whatsapp}?text=${encodeURIComponent(
        'Hello Tarbernacle Of Mercy Parish, I would like to make an enquiry.'
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" className="h-7 w-7" strokeWidth={1.4} />
    </a>
  )
}

/* --------------------------------------------------------------------------
   Small labelled form field helpers
   -------------------------------------------------------------------------- */
export function Field({ label, id, required, children, hint }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-heading text-[14px] font-semibold text-ink"
      >
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[13px] text-muted">{hint}</p>}
    </div>
  )
}

export const inputClass =
  'w-full rounded-sm border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

/* --------------------------------------------------------------------------
   Success notice shown after a demo form submit
   -------------------------------------------------------------------------- */
export function SuccessNotice({ title, children }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? undefined : popVariants}
      initial="initial"
      animate="animate"
      className="flex gap-4 border-l-4 border-brand bg-brand-tint p-6"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
        <Icon name="check" className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <div>
        <h3 className="font-heading text-[18px] font-semibold text-ink">{title}</h3>
        <div className="mt-1.5 text-[15px] leading-relaxed text-muted">{children}</div>
      </div>
    </motion.div>
  )
}
