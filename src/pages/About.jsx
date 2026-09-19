import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import { PageBanner, Reveal, SectionHeading } from '../components/Common'
import { coreValues, leadership } from '../data/site'

export default function About() {
  return (
    <>
      <PageBanner
        title="About Our Parish"
        subtitle="A family of believers in the Redeemed Christian Church of God, planted to be a refuge for our community."
        crumb="About Us"
        image="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=2000&q=80"
      />

      <History />
      <VisionMission />
      <CoreValues />
      <Leadership />
      <JoinBanner />
    </>
  )
}

/* ---------------- Church history ---------------- */
function History() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-5">
            <img
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80"
              alt="Congregation worshipping together"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
              alt="Members in fellowship after service"
              loading="lazy"
              className="mt-10 aspect-[3/4] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading align="left" eyebrow="Our Story" title="The History of Tarbernacle Of Mercy Parish" />

          <div className="mt-7 space-y-5 text-[16.5px] leading-[1.85] text-muted">
            <p>
              Tabernacle of Mercy Parish is situated at the heart of a small space called Thomas Compound, 
              Behind Elemoro Palace, Ibeju-Lekki, Lagos. One of Elemoro's oldest and most well-known churches,
               it is also a prized possession of Elemoro community. 
               The church has maintained its tradition and culture without
                compromising its religious values for roughly 10 years.
            </p>
            <p>
              The church has a parsonage and an auditorium, as well as nearby parking and amenities. 
              Every Sunday at 8:30, the services begins in the morning, and Sunday school Before. 
              As well as other Midweek services like Tuesdays digging deep, prayer gatherings ,
               and night vigils, we also engage in various concerts and activites that showcase the might and goodness of the lord. 
               Join us today!!
            </p>
         
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ['2015', 'Parish founded'],
              ['3', 'Weekly services'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-heading text-[32px] font-bold leading-none text-brand">
                  {value}
                </dt>
                <dd className="mt-2 text-[14px] leading-snug text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Vision & mission ---------------- */
function VisionMission() {
  const blocks = [
    {
      icon: 'dove',
      title: 'Our Vision',
      text: 'A house of prayer and place of hope for all races" – raising, preparing and fully equipping Christians who, through the Word of God, worship songs, prayer and righteous living, take communities and cities for God, while also encouraging believers to discover their own ministry gifts and guiding them to help, positively impact lives and win souls for Christ.',
    },
    {
      icon: 'globe',
      title: 'Our Mission',
      text: 'To make heaven. To take as many people with us. To have a member of RCCG in every family of all nations. To accomplish No. 1 above, holiness will be our lifestyle. To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries. We will pursue these objectives until every nation in the world is reached for the Lord Jesus Christ.',
    },
  ]

  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Where We Are Going"
            title="Our Vision & Mission"
            lede="The two statements that shape every decision we take as a parish."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 130}>
              <article className="h-full border-t-4 border-brand bg-white p-9 shadow-card lg:p-11">
                <span className="grid h-16 w-16 place-items-center bg-brand-light text-brand">
                  <Icon name={b.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-heading text-[25px] font-semibold text-ink">
                  {b.title}
                </h3>
                <span className="mt-4 block h-[3px] w-14 bg-brand" />
                <p className="mt-5 text-[16px] leading-[1.85] text-muted">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Core values ---------------- */
function CoreValues() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            lede="Six commitments that define who we are and how we walk together as a church family."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 110}>
              <article className="group flex h-full gap-5 border border-line bg-white p-7 shadow-card transition-colors hover:border-brand/40">
                <span className="grid h-[52px] w-[52px] shrink-0 place-items-center bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={v.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-heading text-[19px] font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.8] text-muted">{v.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Leadership ---------------- */
function Leadership() {
  return (
    <section className="bg-shell py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Leadership"
            title="Meet the Ministers & Workers"
            lede="The pastors, deacons and heads of department who serve this parish and are available to you."
          />
        </Reveal>

        <div className="slider mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {leadership.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 110}>
              <article className="card group h-full text-center">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-brand-light">
                  <Icon name="avatar" className="h-24 w-24 text-brand/35" />
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-[20px] font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1.5 font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                    {p.role}
                  </p>
                  <span className="mx-auto mt-4 block h-[3px] w-10 bg-brand-light" />
                  <p className="mt-4 text-[15px] leading-[1.8] text-muted">{p.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Closing banner ---------------- */
function JoinBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-deep">
      <img
        src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2000&q=80"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-brand-deep/82" />

      <div className="container relative py-20 text-center lg:py-24">
        <Reveal>
          <h2 className="font-heading text-[30px] font-bold leading-tight text-white sm:text-[38px]">
            There Is a Place for You Here
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.8] text-white/85">
            Come and worship with us this Sunday, or reach out and let us know how we can
            pray with you.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="btn-primary !border-white !bg-white !text-brand-deep hover:!bg-brand hover:!text-white"
            >
              Plan Your Visit
            </Link>
            <Link to="/ministries" className="btn-outline">
              Explore Our Ministries
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
