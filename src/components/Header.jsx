import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'
import { church, navLinks } from '../data/site'
import { backdropVariants, drawerVariants, staggerContainer, staggerItem } from '../lib/motion'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="relative z-50">
      {/* ---------- 1. Top information bar ---------- */}
      <div className="hidden bg-brand-deep text-white lg:block">
        <div className="container flex h-11 items-center justify-between text-[13.5px]">
          <div className="flex items-center gap-7">
            <span className="flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-white/70" />
              Sunday Service 8:00 AM
            </span>
            <a
              href={`mailto:${church.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white/75"
            >
              <Icon name="mail" className="h-4 w-4 text-white/70" />
              {church.email}
            </a>
            <a
              href={`tel:${church.phoneHref}`}
              className="flex items-center gap-2 transition-colors hover:text-white/75"
            >
              <Icon name="phone" className="h-4 w-4 text-white/70" />
              {church.phone}
            </a>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-2 text-white/60">Follow us</span>
            {church.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="grid h-7 w-7 place-items-center rounded-sm text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <Icon name={s.icon} className="h-[15px] w-[15px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 2. Main navigation ---------- */}
      <div className="border-b border-line bg-white shadow-[0_1px_3px_rgba(16,24,40,.05)]">
        <div className="container flex min-h-[78px] items-center justify-between gap-3 py-2.5 sm:gap-6 lg:h-[92px] lg:py-0">
          {/* Brand lockup */}
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center bg-brand text-white sm:h-12 sm:w-12 lg:h-[54px] lg:w-[54px]">
              <Icon name="cross" className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block font-heading text-[15px] font-bold leading-snug tracking-tight text-ink sm:text-[19px] sm:leading-tight lg:text-[22px]">
                Tarbernacle Of Mercy Parish
              </span>
              <span className="mt-0.5 hidden font-heading text-[10.5px] font-medium uppercase tracking-[0.17em] text-brand sm:block lg:text-[11px]">
                Redeemed Christian Church of God
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative whitespace-nowrap px-3.5 py-2 font-heading text-[15px] font-medium transition-colors',
                    'after:absolute after:inset-x-3.5 after:-bottom-[1px] after:h-[3px] after:transition-colors',
                    isActive
                      ? 'text-brand after:bg-brand'
                      : 'text-ink hover:text-brand after:bg-transparent',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/prayer-request" className="btn-ghost btn-sm hidden whitespace-nowrap xl:inline-flex">
              Prayer Request
            </Link>
            <Link to="/give" className="btn-primary btn-sm hidden whitespace-nowrap sm:inline-flex">
              Give Online
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center border border-line text-ink transition-colors hover:border-brand hover:text-brand xl:hidden"
            >
              <Icon
                name={open ? 'close' : 'menu'}
                className="h-6 w-6 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 top-0 z-40 xl:hidden">
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-ink/50"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              variants={drawerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl"
            >
              <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-line px-5">
                <span className="font-heading text-lg font-bold">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center border border-line text-ink"
                >
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>

              <motion.nav
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col p-2"
              >
                {navLinks.map((l) => (
                  <motion.div key={l.to} variants={staggerItem}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        [
                          'block border-b border-line px-4 py-4 font-heading text-[16px] font-medium transition-colors',
                          isActive ? 'text-brand' : 'text-ink hover:text-brand',
                        ].join(' ')
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div variants={staggerItem}>
                  <NavLink
                    to="/prayer-request"
                    className="block border-b border-line px-4 py-4 font-heading text-[16px] font-medium text-ink hover:text-brand"
                  >
                    Prayer Request
                  </NavLink>
                </motion.div>
              </motion.nav>

              <div className="mt-auto space-y-4 border-t border-line bg-shell p-5">
                <Link to="/give" className="btn-primary w-full">
                  Give Online
                </Link>
                <div className="space-y-2 text-[14px] text-muted">
                  <a
                    href={`tel:${church.phoneHref}`}
                    className="flex items-center gap-2.5 hover:text-brand"
                  >
                    <Icon name="phone" className="h-4 w-4 text-brand" />
                    {church.phone}
                  </a>
                  <a
                    href={`mailto:${church.email}`}
                    className="flex items-center gap-2.5 hover:text-brand"
                  >
                    <Icon name="mail" className="h-4 w-4 text-brand" />
                    {church.email}
                  </a>
                </div>
                <div className="flex gap-2 pt-1">
                  {church.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="grid h-9 w-9 place-items-center border border-line bg-white text-brand hover:bg-brand hover:text-white"
                    >
                      <Icon name={s.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
