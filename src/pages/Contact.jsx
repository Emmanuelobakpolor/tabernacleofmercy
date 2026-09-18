import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icons'
import {
  Field,
  PageBanner,
  Reveal,
  SectionHeading,
  SuccessNotice,
  inputClass,
} from '../components/Common'
import { submitContactMessage } from '../lib/contactMessages'
import { church, ministries, services } from '../data/site'

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We would love to hear from you. Visit us, call us, or send us a message."
        crumb="Contact"
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
      />

      <InfoCards />
      <FormAndMap />
    </>
  )
}

/* ---------------- Contact info cards ---------------- */
function InfoCards() {
  const cards = [
    {
      icon: 'pin',
      title: 'Visit Our Parish',
      lines: [church.address],
      action: { label: 'Open in Maps', href: 'https://www.google.com/maps?q=King of Elemoro Palace,+Lagos' },
    },
    {
      icon: 'phone',
      title: 'Call the Church Office',
      lines: [church.phone, 'Mon – Fri, 9:00 AM – 4:00 PM'],
      action: { label: 'Call Now', href: `tel:${church.phoneHref}` },
    },
    {
      icon: 'mail',
      title: 'Send Us an Email',
      lines: [church.email, 'We reply within 48 hours'],
      action: { label: 'Email Us', href: `mailto:${church.email}` },
    },
  ]

  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="How to Reach Us"
            lede="Whether you have a question about the faith, want to plan a first visit, or need to reach a department, start here."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <article className="group flex h-full flex-col border-t-4 border-brand bg-white p-8 text-center shadow-card transition-shadow hover:shadow-lift">
                <span className="mx-auto grid h-16 w-16 place-items-center bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={c.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-heading text-[20px] font-semibold text-ink">
                  {c.title}
                </h3>
                <div className="mt-3 flex-1 space-y-1 text-[15px] leading-[1.8] text-muted">
                  {c.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <a
                  href={c.action.href}
                  target={c.action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="link-arrow mt-6 justify-center text-[15px]"
                >
                  {c.action.label}
                  <Icon name="arrowRight" className="h-[17px] w-[17px]" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Service times reminder */}
        <Reveal delay={140}>
          <div className="mt-12 grid gap-0 divide-y divide-line border border-line bg-shell sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {services.map((s) => (
              <div key={s.name} className="flex items-center gap-4 p-6">
                <Icon name={s.icon} className="h-8 w-8 shrink-0 text-brand" />
                <div>
                  <p className="font-heading text-[16px] font-semibold text-ink">{s.name}</p>
                  <p className="text-[14px] text-muted">
                    {s.day} &middot; {s.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Form + map ---------------- */
function FormAndMap() {
  const [params] = useSearchParams()
  const presetMinistry = params.get('ministry')
  const preset = ministries.find((m) => m.slug === presetMinistry)

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setSending(true)
    setError('')
    try {
      await submitContactMessage({
        name: data.get('name'),
        phone: data.get('phone') || '',
        email: data.get('email'),
        subject: data.get('subject'),
        message: data.get('message'),
      })
      setSent(true)
    } catch {
      setError('Something went wrong sending your message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Form */}
        <div>
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Send a Message"
              title={preset ? `Join the ${preset.name} Ministry` : 'Write to Us'}
              lede={
                preset
                  ? `Let ${preset.leader} know you would like to serve in the ${preset.name} department, and they will get in touch with you.`
                  : 'Fill in the form and a member of our team will respond to you shortly.'
              }
            />
          </Reveal>

          <Reveal delay={110}>
            <div className="mt-10 border-t-4 border-brand bg-white p-7 shadow-card sm:p-9">
              {sent ? (
                <SuccessNotice title="Message sent">
                  Thank you for reaching out to Tarbernacle Of Mercy Parish. A member of our
                  team will be in touch with you shortly.
                </SuccessNotice>
              ) : (
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your Name" id="ct-name" required>
                      <input
                        id="ct-name"
                        name="name"
                        required
                        className={inputClass}
                        placeholder="Your full name"
                      />
                    </Field>
                    <Field label="Phone Number" id="ct-phone">
                      <input
                        id="ct-phone"
                        name="phone"
                        type="tel"
                        className={inputClass}
                        placeholder="080 0000 0000"
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" id="ct-email" required>
                    <input
                      id="ct-email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>

                  <Field label="Subject" id="ct-subject" required>
                    <select
                      id="ct-subject"
                      name="subject"
                      required
                      className={inputClass}
                      defaultValue={preset ? `Join ${preset.name}` : 'General Enquiry'}
                    >
                      <option>General Enquiry</option>
                      <option>Planning a First Visit</option>
                      <option>Water Baptism</option>
                      <option>Child Dedication</option>
                      <option>Wedding / Marriage Counselling</option>
                      {ministries.map((m) => (
                        <option key={m.slug}>Join {m.name}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </Field>

                  <Field label="Your Message" id="ct-message" required>
                    <textarea
                      id="ct-message"
                      name="message"
                      rows="6"
                      required
                      className={inputClass}
                      defaultValue={
                        preset
                          ? `I would like to join the ${preset.name} ministry. Please let me know the next steps.`
                          : ''
                      }
                      placeholder="How can we help you?"
                    />
                  </Field>

                  {error && <p className="text-[14px] text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map + WhatsApp */}
        <div className="space-y-7">
          <Reveal delay={150}>
            <div className="overflow-hidden border border-line bg-white shadow-card">
              <iframe
                title="Map showing the location of Tarbernacle Of Mercy Parish"
                src={church.mapEmbed}
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-start gap-3.5 border-t border-line p-6">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <p className="font-heading text-[16px] font-semibold text-ink">
                    {church.name}
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted">
                    {church.address}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-col items-start gap-5 border-t-4 border-[#25D366] bg-white p-7 shadow-card sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
                <Icon name="whatsapp" className="h-8 w-8" strokeWidth={1.4} />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-[18px] font-semibold text-ink">
                  Chat With Us on WhatsApp
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                  The quickest way to reach the church office during the week.
                </p>
              </div>
              <a
                href={`https://wa.me/${church.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm shrink-0 border-[#25D366] bg-[#25D366] text-white hover:bg-[#1da851] hover:border-[#1da851]"
              >
                Start Chat
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="border-t-4 border-brand bg-brand-tint p-7">
              <h3 className="font-heading text-[18px] font-semibold text-ink">
                Visiting for the First Time?
              </h3>
              <span className="mt-3 block h-[3px] w-10 bg-brand" />
              <ul className="mt-5 space-y-3.5 text-[14.5px] leading-relaxed text-muted">
                {[
                  'Come as you are — there is no dress code.',
                  'Arrive a few minutes early and our ushers will find you a seat.',
                  'Children are welcome; Children Church runs alongside the service.',
                  'Parking is available on the church premises.',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 h-[17px] w-[17px] shrink-0 text-brand" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
