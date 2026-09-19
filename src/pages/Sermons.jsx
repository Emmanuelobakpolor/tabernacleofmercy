import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/Icons'
import { PageBanner, Reveal, SectionHeading } from '../components/Common'
import { fadeVariants } from '../lib/motion'
import { subscribeSermons } from '../lib/sermons'
import { sermons as seedSermons } from '../data/site'

export default function Sermons() {
  return (
    <>
      <PageBanner
        title="Sermons & Messages"
        subtitle="The Word preached at Tabernacle Of Mercy Parish, recorded and archived so you can listen again at any time."
        crumb="Sermons"
        image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=2000&q=80"
      />

      <SermonLibrary />
    </>
  )
}

function SermonLibrary() {
  const [live, setLive] = useState(null)
  const [activeSlug, setActiveSlug] = useState(null)
  const [series, setSeries] = useState('All')

  useEffect(() => subscribeSermons(setLive), [])

  // Live, admin-managed sermons take priority; fall back to seed content so
  // the page is never empty before the admin has added anything.
  const sermons = live && live.length ? live : seedSermons

  const seriesList = useMemo(
    () => ['All', ...Array.from(new Set(sermons.map((s) => s.series)))],
    [sermons]
  )

  const filtered = useMemo(
    () => (series === 'All' ? sermons : sermons.filter((s) => s.series === series)),
    [series, sermons]
  )

  const active = sermons.find((s) => s.slug === activeSlug) || sermons[0]

  if (!active) {
    return (
      <section className="py-24">
        <div className="container">
          <Reveal>
            <div className="mx-auto max-w-lg border-t-4 border-brand bg-white p-10 text-center shadow-card">
              <Icon name="play" className="mx-auto h-9 w-9 text-brand-light" />
              <h3 className="mt-4 font-heading text-[19px] font-semibold text-ink">
                No Messages Yet
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Check back soon — sermons will appear here once they are added.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ---------- Featured message with audio player ---------- */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Now Playing"
              title="Featured Message"
            />
          </Reveal>

          <Reveal delay={110}>
            <AnimatePresence mode="wait">
              <motion.article
                key={active.slug}
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-10 grid overflow-hidden border border-line bg-white shadow-card lg:grid-cols-[minmax(0,460px)_1fr]"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-dark/35" />
                  <span className="absolute bottom-5 left-5 bg-brand px-3.5 py-1.5 font-heading text-[12px] font-semibold uppercase tracking-wider text-white">
                    {active.series}
                  </span>
                </div>

                <div className="flex flex-col p-7 lg:p-10">
                  <h3 className="font-heading text-[26px] font-semibold leading-snug text-ink lg:text-[32px]">
                    {active.title}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5 text-[14.5px] text-muted">
                    <span className="flex items-center gap-2">
                      <Icon name="people" className="h-[17px] w-[17px] text-brand" />
                      {active.speaker}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="calendar" className="h-[17px] w-[17px] text-brand" />
                      {active.dateLabel}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="clock" className="h-[17px] w-[17px] text-brand" />
                      {active.duration}
                    </span>
                  </div>

                  <p className="mt-5 inline-flex w-fit items-center gap-2 bg-brand-tint px-4 py-2 font-heading text-[14.5px] font-semibold text-brand-deep">
                    <Icon name="book" className="h-[17px] w-[17px]" />
                    {active.scripture}
                  </p>

                  <p className="mt-5 flex-1 text-[16px] leading-[1.85] text-muted">
                    {active.description}
                  </p>

                  {/* Audio player */}
                  <div className="mt-7 border border-line bg-shell p-5">
                    <p className="mb-3 flex items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-wider text-brand-deep">
                      <Icon name="play" className="h-[17px] w-[17px]" />
                      Audio Message
                    </p>
                    {active.audioUrl ? (
                      <audio key={active.audioUrl} controls preload="none" className="w-full" src={active.audioUrl}>
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <p className="text-[14px] text-muted">
                        Audio for this message has not been uploaded yet.
                      </p>
                    )}
                  </div>

                  <div className="mt-7 flex flex-col gap-3.5 sm:flex-row">
                    <a
                      href={active.audioUrl || undefined}
                      download
                      aria-disabled={!active.audioUrl}
                      className={`btn-primary btn-sm ${!active.audioUrl ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <Icon name="download" className="h-[17px] w-[17px]" />
                      Download Audio
                    </a>
                    <a
                      href={active.notesUrl || undefined}
                      download
                      aria-disabled={!active.notesUrl}
                      className={`btn-ghost btn-sm ${!active.notesUrl ? 'pointer-events-none opacity-50' : ''}`}
                    >
                      <Icon name="download" className="h-[17px] w-[17px]" />
                      Download Sermon Notes
                    </a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* ---------- Archive ---------- */}
      <section className="bg-shell py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Sermon Archive"
              title="Browse Past Messages"
              lede="Filter by series, then select any message to load it into the player above."
            />
          </Reveal>

          {/* Series filter */}
          <Reveal delay={90}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {seriesList.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeries(s)}
                  className={`border-2 px-5 py-2.5 font-heading text-[14px] font-semibold transition-colors ${
                    series === s
                      ? 'border-brand bg-brand text-white'
                      : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Reveal>

          {/* List */}
          <div className="mt-12 space-y-6">
            {filtered.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                <article
                  id={s.slug}
                  className={`grid scroll-mt-28 gap-0 border bg-white shadow-card transition-colors sm:grid-cols-[220px_1fr] ${
                    s.slug === activeSlug ? 'border-brand' : 'border-line'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSlug(s.slug)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    aria-label={`Play ${s.title}`}
                    className="group relative aspect-[16/10] overflow-hidden sm:aspect-auto"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-brand-dark/40 transition-colors group-hover:bg-brand-dark/60">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-brand transition-transform group-hover:scale-110">
                        <Icon name="play" className="h-7 w-7" strokeWidth={1.5} />
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-col p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-brand-light px-3 py-1 font-heading text-[11.5px] font-semibold uppercase tracking-wider text-brand-deep">
                        {s.series}
                      </span>
                      <span className="font-heading text-[13px] text-muted">{s.duration}</span>
                    </div>

                    <h3 className="mt-3.5 font-heading text-[21px] font-semibold leading-snug text-ink">
                      {s.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
                      <span className="flex items-center gap-2">
                        <Icon name="people" className="h-[16px] w-[16px] text-brand" />
                        {s.speaker}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="calendar" className="h-[16px] w-[16px] text-brand" />
                        {s.dateLabel}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="book" className="h-[16px] w-[16px] text-brand" />
                        {s.scripture}
                      </span>
                    </div>

                    <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-muted">
                      {s.description}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSlug(s.slug)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="btn-primary btn-sm"
                      >
                        Listen to Message
                      </button>
                      <a
                        href={s.notesUrl || undefined}
                        download
                        aria-disabled={!s.notesUrl}
                        className={`btn-ghost btn-sm ${!s.notesUrl ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        <Icon name="download" className="h-[16px] w-[16px]" />
                        Download Notes
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
