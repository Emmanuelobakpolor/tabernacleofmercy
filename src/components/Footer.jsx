import { Link } from 'react-router-dom'
import Icon from './Icons'
import { church, quickLinks, services } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/75">
      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        {/* About */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center bg-brand text-white">
              <Icon name="cross" className="h-7 w-7" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-[19px] font-bold text-white">
                Tarbernacle Of Mercy Parish
              </span>
              <span className="block font-heading text-[10.5px] font-medium uppercase tracking-[0.17em] text-white/55">
                Redeemed Christian Church of God
              </span>
            </span>
          </div>

          <p className="mt-6 max-w-sm text-[15px] leading-[1.85]">
            A family of believers committed to the worship of God, the teaching of His Word
            and the care of one another. Whoever you are, wherever you are on your journey,
            there is a place for you at Tarbernacle Of Mercy Parish.
          </p>

          <div className="mt-7 flex gap-2.5">
            {church.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="grid h-10 w-10 place-items-center border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-brand-deep"
              >
                <Icon name={s.icon} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <h4 className="font-heading text-[16px] font-semibold text-white">Quick Links</h4>
          <span className="mt-4 block h-[3px] w-10 bg-brand" />
          <ul className="mt-5 space-y-3 text-[15px]">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening hours */}
        <div className="lg:col-span-3">
          <h4 className="font-heading text-[16px] font-semibold text-white">Opening Hours</h4>
          <span className="mt-4 block h-[3px] w-10 bg-brand" />
          <ul className="mt-5 space-y-3.5 text-[15px]">
            {services.map((s) => (
              <li
                key={s.name}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3"
              >
                <span className="text-white/90">{s.name}</span>
                <span className="shrink-0 text-right text-[13.5px] text-white/60">
                  {s.day}
                  <br />
                  {s.time}
                </span>
              </li>
            ))}
           
          </ul>
        </div>

        {/* Contact + map */}
        <div className="lg:col-span-3">
          <h4 className="font-heading text-[16px] font-semibold text-white">Contact Us</h4>
          <span className="mt-4 block h-[3px] w-10 bg-brand" />
          <ul className="mt-5 space-y-4 text-[15px]">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
              <span>{church.address}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
              <a href={`tel:${church.phoneHref}`} className="hover:text-white">
                {church.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" />
              <a href={`mailto:${church.email}`} className="break-all hover:text-white">
                {church.email}
              </a>
            </li>
          </ul>

          <div className="mt-6 overflow-hidden border border-white/15">
            <iframe
              title="Map to Tarbernacle Of Mercy Parish"
              src={church.mapEmbed}
              width="100%"
              height="150"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.2)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/12">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-[13.5px] text-white/55 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {church.fullName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <Icon name="cross" className="h-4 w-4 text-brand" />
            Jesus Is Lord
          </p>
        </div>
      </div>
    </footer>
  )
}
