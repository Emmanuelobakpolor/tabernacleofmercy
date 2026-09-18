import { useState } from 'react'
import Icon from '../components/Icons'
import {
  Field,
  PageBanner,
  Reveal,
  SectionHeading,
  SuccessNotice,
  inputClass,
} from '../components/Common'
import { submitPrayerRequest } from '../lib/prayerRequests'
import { church } from '../data/site'

const TOPICS = [
  'Salvation',
  'Healing',
  'Family & Marriage',
  'Employment & Finances',
  'Academic Success',
  'Thanksgiving',
  'Other',
]

export default function PrayerRequest() {
  return (
    <>
      <PageBanner
        title="Prayer Request"
        subtitle="Whatever you are facing, you do not have to face it alone. Let us stand with you in prayer."
        crumb="Prayer Request"
        image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=2000&q=80"
      />

      <RequestSection />
      <PrayerPromise />
    </>
  )
}

function RequestSection() {
  const [sent, setSent] = useState(false)
  const [topic, setTopic] = useState('Healing')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setSending(true)
    setError('')
    try {
      await submitPrayerRequest({
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        topic,
        message: data.get('message'),
        confidential: data.get('confidential') === 'on',
        contactRequested: data.get('contactRequested') === 'on',
      })
      setSent(true)
    } catch {
      setError('Something went wrong sending your request. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        {/* Form */}
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="We Will Pray With You"
              title="Submit Your Request"
              lede="Every request submitted here is prayed over by our Prayer Department. Your request is treated in the strictest confidence."
            />
          </Reveal>

          <Reveal delay={110}>
            <div className="mt-10 border-t-4 border-brand bg-white p-7 shadow-card sm:p-9">
              {sent ? (
                <SuccessNotice title="Your request has been received">
                  Our Prayer Department will begin praying with you today. If you asked to be
                  contacted, a minister will reach out to you within 48 hours.
                </SuccessNotice>
              ) : (
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your Name" id="pr-name" required>
                      <input
                        id="pr-name"
                        name="name"
                        required
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </Field>
                    <Field label="Phone Number" id="pr-phone">
                      <input
                        id="pr-phone"
                        name="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="080 0000 0000"
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" id="pr-email" required>
                    <input
                      id="pr-email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>

                  <div>
                    <p className="mb-3 font-heading text-[14px] font-semibold text-ink">
                      What are we praying about?
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTopic(t)}
                          className={`border-2 px-4 py-2 font-heading text-[13.5px] font-semibold transition-colors ${
                            topic === t
                              ? 'border-brand bg-brand text-white'
                              : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field
                    label="Your Prayer Request"
                    id="pr-message"
                    required
                    hint="Share as much or as little as you wish."
                  >
                    <textarea
                      id="pr-message"
                      name="message"
                      rows="6"
                      required
                      className={inputClass}
                      placeholder="Tell us how we can pray for you..."
                    />
                  </Field>

                  <div className="space-y-3 border-t border-line pt-6">
                    <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-muted">
                      <input
                        type="checkbox"
                        name="confidential"
                        className="mt-1 h-4 w-4 shrink-0 accent-[#0057D9]"
                      />
                      <span>Please keep my request confidential to the pastors only.</span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-[14.5px] text-muted">
                      <input
                        type="checkbox"
                        name="contactRequested"
                        className="mt-1 h-4 w-4 shrink-0 accent-[#0057D9]"
                      />
                      <span>I would like a minister to contact me.</span>
                    </label>
                  </div>

                  {error && <p className="text-[14px] text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {sending ? 'Sending…' : 'Send Prayer Request'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Sidebar */}
        <aside className="space-y-7">
          <Reveal delay={150}>
            <div className="border-t-4 border-brand bg-brand-tint p-7">
              <Icon name="prayer" className="h-10 w-10 text-brand" />
              <h3 className="mt-5 font-heading text-[20px] font-semibold text-ink">
                Need Prayer Urgently?
              </h3>
              <p className="mt-3 text-[15px] leading-[1.8] text-muted">
                Our prayer line is open during office hours. Call or send a WhatsApp message
                and a minister will pray with you immediately.
              </p>

              <div className="mt-6 space-y-3">
                <a href={`tel:${church.phoneHref}`} className="btn-primary btn-sm w-full">
                  <Icon name="phone" className="h-[17px] w-[17px]" />
                  Call the Prayer Line
                </a>
                <a
                  href={`https://wa.me/${church.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost btn-sm w-full"
                >
                  <Icon name="whatsapp" className="h-[17px] w-[17px]" strokeWidth={1.4} />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="border border-line bg-white p-7 shadow-card">
              <h3 className="font-heading text-[18px] font-semibold text-ink">
                Join Us in Prayer
              </h3>
              <span className="mt-3 block h-[3px] w-10 bg-brand" />
              <ul className="mt-5 space-y-4 text-[14.5px]">
                {[
                  ['Faith Clinic', 'Thursdays, 5:30 PM'],
                  ['Monthly Vigil', 'Last Friday, 10:00 PM'],
                  ['Morning Prayer Chain', 'Daily, 5:30 AM'],
                ].map(([name, when]) => (
                  <li key={name} className="flex items-start gap-3">
                    <Icon name="clock" className="mt-0.5 h-[17px] w-[17px] shrink-0 text-brand" />
                    <span>
                      <span className="block font-heading font-semibold text-ink">{name}</span>
                      <span className="text-muted">{when}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  )
}

function PrayerPromise() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep">
      <img
        src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2000&q=80"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-brand-deep/85" />

      <div className="container relative py-20 text-center lg:py-24">
        <Reveal>
          <Icon name="quote" className="mx-auto h-10 w-10 text-white/35" strokeWidth={0} fill="currentColor" />
          <blockquote className="mx-auto mt-6 max-w-3xl font-heading text-[22px] font-normal italic leading-[1.65] text-white sm:text-[27px]">
            &ldquo;Be careful for nothing; but in every thing by prayer and supplication with
            thanksgiving let your requests be made known unto God.&rdquo;
          </blockquote>
          <p className="mt-6 font-heading text-[15px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Philippians 4:6
          </p>
        </Reveal>
      </div>
    </section>
  )
}
