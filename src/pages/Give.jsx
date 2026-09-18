import { useState } from 'react'
import Icon from '../components/Icons'
import { PageBanner, Reveal, SectionHeading } from '../components/Common'
import { bankDetails, church, givingCategories } from '../data/site'

export default function Give() {
  return (
    <>
      <PageBanner
        title="Give Online"
        subtitle="Give your tithes, offerings and seeds securely from anywhere."
        crumb="Give Online"
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=2000&q=80"
      />

      <Categories />
      <BankTransfer />
      <Assurance />
    </>
  )
}

/* ---------------- Categories ---------------- */
function Categories() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to Give"
            title="Giving Categories"
            lede="Choose the category that matches your giving. Every naira is accounted for and applied to the purpose you select."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {givingCategories.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <article className="group flex h-full flex-col border-t-4 border-brand bg-white p-7 text-center shadow-card transition-shadow hover:shadow-lift">
                <span className="mx-auto grid h-16 w-16 place-items-center bg-brand-light text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon name={c.icon} className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-heading text-[20px] font-semibold text-ink">
                  {c.name}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.8] text-muted">
                  {c.description}
                </p>
                <p className="mt-5 border-t border-line pt-4 font-heading text-[13.5px] font-semibold text-brand">
                  {c.verse}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Bank transfer details ---------------- */
function BankTransfer() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bankDetails.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable — the number is visible on screen anyway */
    }
  }

  const rows = [
    ['Bank Name', bankDetails.bankName],
    ['Account Name', bankDetails.accountName],
    ['Account Number', bankDetails.accountNumber],
    ['Sort Code', bankDetails.sortCode],
  ]

  return (
    <section id="bank-transfer" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Direct Transfer"
              title="Bank Transfer Details"
              lede="Prefer to transfer straight from your bank? Use the parish account details below and quote your giving category as the narration."
            />

            <p className="mt-7 flex gap-3 border-l-4 border-brand bg-brand-tint p-5 text-[14.5px] leading-relaxed text-muted">
              <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span>
                After transferring, kindly send your teller or screenshot to{' '}
                <a
                  href={`mailto:${church.email}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {church.email}
                </a>{' '}
                so we can issue your receipt.
              </span>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-t-4 border-brand bg-white shadow-card">
              <dl className="divide-y divide-line">
                {rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 px-7 py-5"
                  >
                    <dt className="font-heading text-[14px] font-medium text-muted">
                      {label}
                    </dt>
                    <dd className="text-right font-heading text-[16px] font-semibold text-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-line p-7">
                <button type="button" onClick={copy} className="btn-ghost btn-sm w-full">
                  <Icon name={copied ? 'check' : 'download'} className="h-[17px] w-[17px]" />
                  {copied ? 'Account Number Copied' : 'Copy Account Number'}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Assurance strip ---------------- */
function Assurance() {
  const points = [
    {
      icon: 'check',
      title: 'Direct to the Parish',
      text: 'Your transfer goes straight to our bank account — no card details or third-party processor involved.',
    },
    {
      icon: 'book',
      title: 'Fully Accounted For',
      text: 'Parish accounts are audited annually and presented to the congregation at our yearly meeting.',
    },
    {
      icon: 'church',
      title: 'Applied as Designated',
      text: 'Funds are applied strictly to the category you select — tithe, offering, thanksgiving or building.',
    },
  ]

  return (
    <section className="bg-brand-deep py-16 lg:py-20">
      <div className="container grid gap-10 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 110}>
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center border border-white/30 text-white">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-[17px] font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-white/75">{p.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
