import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import { Reveal, SectionHeading, SuccessNotice, inputClass } from '../components/Common'
import { EventCard, MinistryCard } from '../components/Cards'
import TestimonyModal from '../components/TestimonyModal'
import { subscribeLiveTestimonies } from '../lib/testimonies'
import { subscribeEvents } from '../lib/events'
import { church, ministries, services } from '../data/site'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=2000&q=80'

export default function Home() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <ServiceTimes />
      <Ministries />
      <UpcomingEvents />
      <GivingBanner />
      <Testimonies />
      <Newsletter />
    </>
  )
}

/* ========================= 3. Hero banner ========================= */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="The congregation gathered in worship at Tarbernacle Of Mercy Parish"
        className="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
      />
      {/* Light blue wash — keeps text legible while letting the photo show through */}
      <div className="absolute inset-0 bg-brand-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-deep/35 to-transparent" />

      <div className="container relative flex min-h-[560px] items-center py-24 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="max-w-3xl">
          <Reveal>
            <p className="flex items-center gap-3 font-heading text-[13px] font-semibold uppercase tracking-[0.2em] text-white/85">
              <span className="h-[2px] w-9 bg-white/70" />
              The Redeemed Christian Church of God
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-heading text-[38px] font-bold leading-[1.1] text-white [text-shadow:0_2px_14px_rgba(0,0,0,.4)] sm:text-[54px] lg:text-[64px]">
              Welcome to
              <br />
              Tarbernacle Of Mercy Parish
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.75] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,.35)] sm:text-[20px]">
              A Place of Worship, Fellowship and Transformation
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary !border-white !bg-white !text-brand-deep hover:!bg-brand hover:!text-white">
                Join Us This Sunday
              </Link>
              <Link to="/give" className="btn-outline">
                Give Online
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Service strip anchored to the hero, a familiar church-theme device */}
      <div className="relative border-t border-white/15 bg-brand-dark/60 backdrop-blur-0">
        <div className="container grid divide-y divide-white/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {services.map((s) => (
            <div key={s.name} className="flex items-center gap-4 py-6 sm:px-6 sm:py-7">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-white/25 text-white">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-[16px] font-semibold text-white">{s.name}</p>
                <p className="text-[14px] text-white/70">
                  {s.day} &middot; {s.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========================= 4. Welcome / Pastor ========================= */
function WelcomeSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Portrait */}
        <Reveal className="relative">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
              alt="Pastor Alfred Lawrence, Parish Pastor"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            {/* Decorative frame — classic theme detail */}
            <span className="pointer-events-none absolute -bottom-5 -left-5 -z-10 hidden h-full w-full border-[6px] border-brand-light sm:block" />
          </div>

          <div className="absolute bottom-6 right-0 max-w-[260px] bg-brand px-6 py-5 text-white shadow-lift sm:right-[-24px]">
            <p className="font-heading text-[17px] font-semibold leading-tight">
              Pastor Alfred Lawrence
            </p>
            <p className="mt-1 text-[13.5px] text-white/80">Parish Pastor</p>
          </div>
        </Reveal>

        {/* Message */}
        <Reveal delay={120}>
          <SectionHeading
            align="left"
            eyebrow="Welcome to Our Parish"
            title="A Word From Our Pastor"
          />

          <div className="mt-7 space-y-5 text-[16.5px] leading-[1.85] text-muted">
            <p>
              On behalf of the entire family of Tarbernacle Of Mercy Parish, it is my joy to welcome
              you. Whether you are searching for a church home, visiting our city, or simply
              curious about the Christian faith, you will find a warm seat and an open heart
              waiting for you here.
            </p>
            <p>
              This parish was raised up to be exactly what its name says — a refuge. A place
              where the weary find rest, where families are strengthened, where the Word of
              God is taught plainly and where prayer is not an afterthought but the very
              foundation of everything we do.
            </p>
            <p>
              Come and worship with us this Sunday. Come as you are. You will not be a
              stranger for long.
            </p>
          </div>

          <p className="mt-8 border-l-4 border-brand bg-brand-tint px-6 py-4 font-heading text-[16px] italic leading-relaxed text-brand-dark">
            &ldquo;I was glad when they said unto me, Let us go into the house of the
            Lord.&rdquo;
            <span className="mt-1.5 block text-[14px] font-semibold not-italic text-brand">
              Psalm 122:1
            </span>
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/about" className="btn-primary">
              More About Us
            </Link>
            <Link to="/prayer-request" className="btn-ghost">
              Submit a Prayer Request
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ========================= 5. Service times ========================= */
function ServiceTimes() {
  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Our Weekly Service Times"
            lede="There is something for every member of the family through the week. Doors open thirty minutes before each service begins."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 110}>
              <article className="group flex h-full flex-col border-t-4 border-brand bg-white p-8 shadow-card transition-shadow hover:shadow-lift">
                <span className="grid h-16 w-16 place-items-center bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={s.icon} className="h-8 w-8" />
                </span>

                <p className="mt-6 font-heading text-[12.5px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {s.day}
                </p>
                <h3 className="mt-2 font-heading text-[23px] font-semibold text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 flex items-center gap-2 font-heading text-[16px] font-medium text-ink">
                  <Icon name="clock" className="h-[18px] w-[18px] text-brand" />
                  {s.time}
                </p>

                <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-muted">{s.detail}</p>

                <p className="mt-6 border-t border-line pt-4 text-[13.5px] font-medium text-muted">
                  {s.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 border border-line bg-white px-8 py-7 text-center shadow-card sm:flex-row sm:text-left">
            <Icon name="pin" className="h-7 w-7 shrink-0 text-brand" />
            <p className="text-[15.5px] text-muted">
              <span className="font-heading font-semibold text-ink">Find us at:</span>{' '}
              {church.address}
            </p>
            <Link to="/contact" className="btn-ghost btn-sm shrink-0 sm:ml-4">
              Get Directions
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ========================= 6. Ministries ========================= */
function Ministries() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Serve With Us"
            title="Our Ministries & Departments"
            lede="Every member is a minister. Find the place where your gifts meet the needs of the body and step in."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 110}>
              <MinistryCard ministry={m} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Link to="/ministries" className="btn-primary">
              View All Ministries
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ========================= 7. Upcoming events ========================= */
function UpcomingEvents() {
  const [live, setLive] = useState(null)

  useEffect(() => subscribeEvents(setLive), [])

  const display = live || []

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="What Is Coming Up"
              title="Upcoming Church Programmes"
              lede="Mark your calendar and come along. Every programme is open to members, friends and first-time visitors."
            />
            <Link to="/events" className="btn-ghost shrink-0">
              Full Calendar
            </Link>
          </div>
        </Reveal>

        {display.length ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {display.slice(0, 3).map((e, i) => (
              <Reveal key={e.slug} delay={i * 110}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
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
      </div>
    </section>
  )
}

/* ========================= 9. Giving banner ========================= */
function GivingBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep">
      <img
        src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=2000&q=80"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-brand-deep/80" />

      <div className="container relative py-20 text-center lg:py-24">
        <Reveal>
          <span className="mx-auto grid h-16 w-16 place-items-center border-2 border-white/35 text-white">
            <Icon name="offering" className="h-8 w-8" />
          </span>

          <h2 className="mt-8 font-heading text-[32px] font-bold leading-tight text-white sm:text-[42px]">
            Support the Work of God
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.8] text-white/85">
            Your tithes, offerings and seeds sustain the ministry of this parish — the
            teaching of the Word, the care of our members and the reach of the gospel into
            our community. Give cheerfully, give securely.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/give"
              className="btn-primary !border-white !bg-white !text-brand-deep hover:!bg-brand hover:!text-white"
            >
              Give Online
            </Link>
            <Link to="/give#bank-transfer" className="btn-outline">
              Bank Transfer Details
            </Link>
          </div>

          <p className="mt-8 font-heading text-[15px] italic text-white/70">
            &ldquo;God loveth a cheerful giver.&rdquo; &mdash; 2 Corinthians 9:7
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ========================= 10. Testimonies ========================= */
function initials(name) {
  return name
    .replace(/^(Bro\.|Sis\.|Pastor|Deaconess|Elder|Mrs\.|Mr\.)\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Testimonies() {
  const [live, setLive] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => subscribeLiveTestimonies(setLive), [])

  const display = live || []

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonies"
            title="What God Is Doing Among Us"
            lede="Real stories from members of our parish family — shared by the people who lived them."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn-ghost btn-sm"
            >
              <Icon name="spark" className="h-[17px] w-[17px]" />
              Share Your Testimony
            </button>
          </div>
        </Reveal>

        {display.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {display.map((t, i) => (
              <Reveal key={t.id || t.name} delay={(i % 3) * 100}>
                <article className="flex h-full flex-col border-t-4 border-brand bg-white p-7 shadow-card transition-shadow hover:shadow-lift">
                  <Icon
                    name="quote"
                    className="h-8 w-8 text-brand-light"
                    strokeWidth={0}
                    fill="currentColor"
                  />
                  <blockquote className="mt-4 flex-1 text-[15px] italic leading-[1.8] text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-light font-heading text-[14px] font-bold text-brand-deep">
                      {initials(t.name)}
                    </span>
                    <div>
                      <p className="font-heading text-[15px] font-semibold text-ink">{t.name}</p>
                      {t.role && <p className="mt-0.5 text-[13px] text-muted">{t.role}</p>}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={120}>
            <div className="mx-auto mt-12 max-w-lg border-t-4 border-brand bg-white p-10 text-center shadow-card">
              <Icon
                name="quote"
                className="mx-auto h-10 w-10 text-brand-light"
                strokeWidth={0}
                fill="currentColor"
              />
              <h3 className="mt-4 font-heading text-[20px] font-semibold text-ink">
                Be the First to Share
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                No testimonies have been published yet. Has God done something for you
                recently? Tell us about it — once reviewed, it could be the first story
                featured here.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn-primary btn-sm mt-6"
              >
                <Icon name="spark" className="h-[17px] w-[17px]" />
                Share Your Testimony
              </button>
            </div>
          </Reveal>
        )}
      </div>

      <TestimonyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

/* ========================= 11. Newsletter ========================= */
function Newsletter() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setEmail('')
  }

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-10 border border-line bg-brand-tint px-7 py-12 shadow-card sm:px-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Stay Connected</p>
            <h2 className="section-title !text-[27px] sm:!text-[32px]">
              Receive Our Weekly Newsletter
            </h2>
            <span className="rule" />
            <p className="lede !mt-4 !text-[16px]">
              Service reminders, upcoming programmes and a word of encouragement, sent to
              your inbox every Friday. We never share your details.
            </p>
          </Reveal>

          <Reveal delay={120}>
            {sent ? (
              <SuccessNotice title="You are subscribed">
                Thank you for joining our mailing list. Look out for our next newsletter
                this Friday.
              </SuccessNotice>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3.5 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`${inputClass} flex-1 !py-3.5`}
                />
                <button type="submit" className="btn-primary shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
