import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import { PageBanner, Reveal, SectionHeading } from '../components/Common'
import { MinistryCard } from '../components/Cards'
import { ministries } from '../data/site'

export default function Ministries() {
  return (
    <>
      <PageBanner
        title="Our Ministries"
        subtitle="Six departments serving the parish and the community. Find where you belong and put your gifts to work."
        crumb="Ministries"
        image="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Intro */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Serve With Us"
              title="Every Member a Minister"
              lede="God has given every believer a gift for the building up of the body. Whatever yours is, there is a department here that needs it — and a team that will train you."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 3) * 110}>
                <MinistryCard ministry={m} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowToJoin />
    </>
  )
}

function HowToJoin() {
  const steps = [
    {
      icon: 'mail',
      title: 'Express Your Interest',
      text: 'Complete the enquiry form or speak to the head of the department after any service.',
    },
    {
      icon: 'people',
      title: 'Meet the Department',
      text: 'You will be invited to sit in on a meeting or rehearsal to see what the work involves.',
    },
    {
      icon: 'book',
      title: 'Workers in Training',
      text: 'New workers complete our short training class covering doctrine, conduct and service.',
    },
    {
      icon: 'check',
      title: 'Begin Serving',
      text: 'You are commissioned into the department and join the roster alongside your team.',
    },
  ]

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Getting Started"
            title="How to Join a Ministry"
            lede="Four simple steps from interest to serving. The whole process usually takes about a month."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <article className="relative h-full border border-line bg-white p-8 text-center shadow-card">
                <span className="absolute right-5 top-4 font-heading text-[42px] font-bold leading-none text-brand-light">
                  {i + 1}
                </span>
                <span className="mx-auto grid h-16 w-16 place-items-center bg-brand-light text-brand">
                  <Icon name={s.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-heading text-[19px] font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.8] text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-primary">
              Speak to a Department Head
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
