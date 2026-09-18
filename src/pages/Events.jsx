import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icons'
import {
  Field,
  PageBanner,
  Reveal,
  SectionHeading,
  SuccessNotice,
  inputClass,
} from '../components/Common'
import { subscribeEvents } from '../lib/events'

export default function Events() {
  const [live, setLive] = useState(null)

  useEffect(() => subscribeEvents(setLive), [])

  const events = live || []

  return (
    <>
      <PageBanner
        title="Church Events"
        subtitle="Our programmes for the season ahead. Every service and event is open to visitors."
        crumb="Events"
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
      />

      <EventListings events={events} />
      <CalendarView events={events} />
      <Registration events={events} />
    </>
  )
}

/* ---------------- Listings (classic horizontal rows) ---------------- */
function EventListings({ events }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Mark Your Calendar"
            title="Upcoming Programmes"
            lede="Scroll through what is coming up at Tarbernacle Of Mercy Parish and register for the programmes you would like to attend."
          />
        </Reveal>

        {!events.length && (
          <Reveal delay={90}>
            <div className="mx-auto mt-14 max-w-lg border-t-4 border-brand bg-white p-10 text-center shadow-card">
              <Icon name="calendar" className="mx-auto h-9 w-9 text-brand-light" />
              <h3 className="mt-4 font-heading text-[19px] font-semibold text-ink">
                Nothing Scheduled Yet
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Check back soon — upcoming programmes will appear here as they are added.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14 space-y-8">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 2) * 90}>
              <article
                id={e.slug}
                className="card grid scroll-mt-28 gap-0 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                  <img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-5 top-0 bg-brand px-4 py-3 text-center text-white shadow-lift">
                    <span className="block font-heading text-[26px] font-bold leading-none">
                      {e.day}
                    </span>
                    <span className="mt-1 block font-heading text-[11px] font-semibold tracking-[0.15em]">
                      {e.month}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-7 lg:p-9">
                  <span className="w-fit bg-brand-light px-3 py-1 font-heading text-[12px] font-semibold uppercase tracking-wider text-brand-deep">
                    {e.category}
                  </span>

                  <h3 className="mt-4 font-heading text-[23px] font-semibold leading-snug text-ink lg:text-[26px]">
                    {e.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-[14.5px] text-muted">
                    <span className="flex items-center gap-2">
                      <Icon name="calendar" className="h-[17px] w-[17px] text-brand" />
                      {e.dateLabel}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="clock" className="h-[17px] w-[17px] text-brand" />
                      {e.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="pin" className="h-[17px] w-[17px] text-brand" />
                      {e.location}
                    </span>
                  </div>

                  <p className="mt-5 flex-1 text-[15.5px] leading-[1.85] text-muted">
                    {e.description}
                  </p>

                  <div className="mt-7">
                    <a href="#register" className="btn-primary btn-sm">
                      Register for This Programme
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Simple month calendar ---------------- */
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function CalendarView({ events }) {
  // Start on the month of the first listed event, or today if there are none yet
  const first = events.length ? new Date(events[0].date) : new Date()
  const [cursor, setCursor] = useState({
    year: first.getFullYear(),
    month: first.getMonth(),
  })

  const { cells, eventsThisMonth } = useMemo(() => {
    const { year, month } = cursor
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const byDay = {}
    for (const e of events) {
      const d = new Date(e.date)
      if (d.getFullYear() === year && d.getMonth() === month) {
        const key = d.getDate()
        byDay[key] = byDay[key] || []
        byDay[key].push(e)
      }
    }

    const list = []
    for (let i = 0; i < firstDay; i += 1) list.push(null)
    for (let d = 1; d <= daysInMonth; d += 1) list.push({ day: d, items: byDay[d] || [] })

    return {
      cells: list,
      eventsThisMonth: events.filter((e) => {
        const d = new Date(e.date)
        return d.getFullYear() === year && d.getMonth() === month
      }),
    }
  }, [cursor, events])

  const shift = (delta) => {
    setCursor(({ year, month }) => {
      const m = month + delta
      if (m < 0) return { year: year - 1, month: 11 }
      if (m > 11) return { year: year + 1, month: 0 }
      return { year, month: m }
    })
  }

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="At a Glance"
            title="Church Calendar"
            lede="Browse the month by month view of everything happening in the parish."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
            {/* Grid */}
            <div className="border border-line bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-line bg-brand px-6 py-4 text-white">
                <button
                  type="button"
                  onClick={() => shift(-1)}
                  aria-label="Previous month"
                  className="grid h-9 w-9 place-items-center border border-white/30 transition-colors hover:bg-white hover:text-brand"
                >
                  <Icon name="arrowLeft" className="h-[18px] w-[18px]" />
                </button>

                <h3 className="font-heading text-[18px] font-semibold">
                  {MONTHS[cursor.month]} {cursor.year}
                </h3>

                <button
                  type="button"
                  onClick={() => shift(1)}
                  aria-label="Next month"
                  className="grid h-9 w-9 place-items-center border border-white/30 transition-colors hover:bg-white hover:text-brand"
                >
                  <Icon name="arrowRight" className="h-[18px] w-[18px]" />
                </button>
              </div>

              <div className="grid grid-cols-7 border-b border-line bg-brand-tint">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="py-3 text-center font-heading text-[12px] font-semibold uppercase tracking-wider text-brand-deep"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {cells.map((cell, i) => (
                  <div
                    key={i}
                    className="min-h-[74px] border-b border-r border-line p-2 last:border-r-0 sm:min-h-[92px]"
                  >
                    {cell && (
                      <>
                        <span
                          className={`grid h-7 w-7 place-items-center font-heading text-[13.5px] font-semibold ${
                            cell.items.length
                              ? 'bg-brand text-white'
                              : 'text-muted'
                          }`}
                        >
                          {cell.day}
                        </span>
                        {cell.items.map((e) => (
                          <a
                            key={e.slug}
                            href={`#${e.slug}`}
                            className="mt-1.5 block truncate text-[11.5px] font-medium leading-tight text-brand-deep hover:underline"
                            title={e.title}
                          >
                            {e.title}
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Month list */}
            <aside className="border border-line bg-white p-6 shadow-card">
              <h3 className="font-heading text-[17px] font-semibold text-ink">
                This Month
              </h3>
              <span className="mt-3 block h-[3px] w-10 bg-brand" />

              {eventsThisMonth.length ? (
                <ul className="mt-5 space-y-4">
                  {eventsThisMonth.map((e) => (
                    <li key={e.slug} className="border-b border-line pb-4 last:border-0">
                      <a href={`#${e.slug}`} className="group flex gap-3.5">
                        <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand-light text-center font-heading leading-none text-brand-deep">
                          <span className="block">
                            <span className="block text-[15px] font-bold">{e.day}</span>
                            <span className="mt-0.5 block text-[9.5px] font-semibold tracking-wider">
                              {e.month}
                            </span>
                          </span>
                        </span>
                        <span>
                          <span className="block font-heading text-[14.5px] font-semibold leading-snug text-ink group-hover:text-brand">
                            {e.title}
                          </span>
                          <span className="mt-1 block text-[13px] text-muted">{e.time}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
                  No special programmes this month. Our regular weekly services continue as
                  usual.
                </p>
              )}
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Registration form ---------------- */
function Registration({ events }) {
  const [sent, setSent] = useState(false)

  return (
    <section id="register" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Reserve Your Place"
              title="Programme Registration"
              lede="Let us know you are coming so we can prepare adequately for you and your family."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 border-t-4 border-brand bg-white p-7 shadow-card sm:p-10">
              {!events.length ? (
                <p className="text-center text-[15px] leading-relaxed text-muted">
                  There are no programmes open for registration right now. Check back once
                  new events are announced.
                </p>
              ) : sent ? (
                <SuccessNotice title="Registration received">
                  Thank you for registering. A member of our team will contact you with
                  further details before the programme.
                </SuccessNotice>
              ) : (
                <form
                  className="grid gap-6 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <Field label="Full Name" id="reg-name" required>
                    <input id="reg-name" required className={inputClass} placeholder="Your full name" />
                  </Field>

                  <Field label="Phone Number" id="reg-phone" required>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      className={inputClass}
                      placeholder="080 0000 0000"
                    />
                  </Field>

                  <Field label="Email Address" id="reg-email" required>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field label="Number Attending" id="reg-count">
                    <input
                      id="reg-count"
                      type="number"
                      min="1"
                      defaultValue="1"
                      className={inputClass}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Which Programme?" id="reg-event" required>
                      <select id="reg-event" required className={inputClass} defaultValue="">
                        <option value="" disabled>
                          Select a programme
                        </option>
                        {events.map((e) => (
                          <option key={e.slug} value={e.slug}>
                            {e.title} — {e.dateLabel}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <Field
                      label="Additional Notes"
                      id="reg-notes"
                      hint="Let us know of any special need, e.g. wheelchair access or childcare."
                    >
                      <textarea
                        id="reg-notes"
                        rows="4"
                        className={inputClass}
                        placeholder="Optional"
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      Submit Registration
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
