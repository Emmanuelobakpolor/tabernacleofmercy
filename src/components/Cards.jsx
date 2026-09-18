import { Link } from 'react-router-dom'
import Icon from './Icons'

/* ---------------- Ministry card ---------------- */
export function MinistryCard({ ministry, detailed = false }) {
  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={ministry.image}
          alt={ministry.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-brand-deep/0 transition-colors duration-500 group-hover:bg-brand-deep/25" />
        <span className="absolute bottom-0 left-0 bg-brand px-5 py-2.5 font-heading text-[15px] font-semibold text-white">
          {ministry.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-[15px] leading-[1.8] text-muted">
          {detailed ? ministry.description : ministry.blurb}
        </p>

        <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-[14px]">
          <div className="flex gap-2.5">
            <dt className="sr-only">Meeting time</dt>
            <Icon name="clock" className="mt-0.5 h-[17px] w-[17px] shrink-0 text-brand" />
            <dd className="text-muted">{ministry.meets}</dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="sr-only">Contact person</dt>
            <Icon name="people" className="mt-0.5 h-[17px] w-[17px] shrink-0 text-brand" />
            <dd className="text-muted">{ministry.leader}</dd>
          </div>
        </dl>

        <Link
          to={`/contact?ministry=${ministry.slug}`}
          className="btn-ghost btn-sm mt-6 w-full"
        >
          Join This Ministry
        </Link>
      </div>
    </article>
  )
}

/* ---------------- Event card ---------------- */
export function EventCard({ event }) {
  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        {/* Date block, as in classic church themes */}
        <div className="absolute left-5 top-0 bg-brand px-4 py-3 text-center text-white shadow-lift">
          <span className="block font-heading text-[26px] font-bold leading-none">
            {event.day}
          </span>
          <span className="mt-1 block font-heading text-[11px] font-semibold tracking-[0.15em]">
            {event.month}
          </span>
        </div>
        <span className="absolute bottom-4 right-4 bg-white/95 px-3 py-1 font-heading text-[12px] font-semibold uppercase tracking-wider text-brand-deep">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-[20px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
          {event.title}
        </h3>

        <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted">
          <span className="flex items-center gap-2">
            <Icon name="clock" className="h-[16px] w-[16px] text-brand" />
            {event.time}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="pin" className="h-[16px] w-[16px] text-brand" />
            {event.location}
          </span>
        </div>

        <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-muted">{event.description}</p>

        <Link to={`/events#${event.slug}`} className="btn-primary btn-sm mt-6 w-full">
          Register for This Event
        </Link>
      </div>
    </article>
  )
}

/* ---------------- Sermon card ---------------- */
export function SermonCard({ sermon }) {
  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={sermon.image}
          alt={sermon.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-brand-dark/35 transition-colors duration-500 group-hover:bg-brand-dark/55" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-brand shadow-lift transition-transform duration-300 group-hover:scale-110">
            <Icon name="play" className="h-8 w-8" strokeWidth={1.5} />
          </span>
        </span>
        <span className="absolute bottom-4 left-4 bg-brand px-3 py-1 font-heading text-[12px] font-semibold uppercase tracking-wider text-white">
          {sermon.series}
        </span>
        <span className="absolute bottom-4 right-4 bg-ink/75 px-2.5 py-1 font-heading text-[12px] font-medium text-white">
          {sermon.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-[20px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
          {sermon.title}
        </h3>

        <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted">
          <span className="flex items-center gap-2">
            <Icon name="people" className="h-[16px] w-[16px] text-brand" />
            {sermon.speaker}
          </span>
          <span className="flex items-center gap-2">
            <Icon name="calendar" className="h-[16px] w-[16px] text-brand" />
            {sermon.dateLabel}
          </span>
        </div>

        <p className="mt-3 font-heading text-[14px] font-medium text-brand-deep">
          {sermon.scripture}
        </p>

        <p className="mt-3 flex-1 text-[15px] leading-[1.8] text-muted">{sermon.description}</p>

        <Link to={`/sermons#${sermon.slug}`} className="btn-primary btn-sm mt-6 w-full">
          Listen to Message
        </Link>
      </div>
    </article>
  )
}
