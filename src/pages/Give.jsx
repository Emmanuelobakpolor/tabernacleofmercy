import { useState } from 'react'
import Icon from '../components/Icons'
import { PageBanner, Reveal, SectionHeading } from '../components/Common'
import { accounts, church, givingCategories } from '../data/site'

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
  const [copiedAccount, setCopiedAccount] = useState(null)

  const copy = async (account) => {
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopiedAccount(account.accountNumber)
      setTimeout(() => setCopiedAccount(null), 2200)
    } catch {
      /* clipboard unavailable — the number is visible on screen anyway */
    }
  }

  return (
    <section id="bank-transfer" className="scroll-mt-24 bg-sand py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Direct Transfer"
            title="Bank Transfer Details"
            lede="Prefer to transfer straight from your bank? Use any of the parish accounts below and quote your giving category as the narration."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {accounts.map((account, index) => (
            <Reveal key={account.name} delay={index * 90}>
              <div
                className={[
                  'group flex h-full flex-col overflow-hidden bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
                  account.name === 'Main' ? 'border-t-4 border-brand' : 'border-t-4 border-brand/70',
                ].join(' ')}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                    {account.name}
                  </span>
                  {account.name === 'Main' && (
                    <span className="rounded-full border border-line px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Primary
                    </span>
                  )}
                </div>

                <h3 className="min-h-[72px] font-heading text-[20px] font-semibold leading-snug text-ink">
                  {account.accountName}
                </h3>

                <div className="mt-6 flex flex-1 flex-col justify-between gap-5">
                  <div className="rounded-xl bg-sand px-4 py-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                      Account Number
                    </p>
                    <p className="mt-2 font-heading text-[22px] font-bold leading-none text-ink">
                      {account.accountNumber}
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-line pt-4">
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Bank
                      </p>
                      <p className="mt-2 font-heading text-[16px] font-semibold text-ink">
                        GT Bank
                      </p>
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Sort Code
                      </p>
                      <p className="mt-2 font-heading text-[16px] font-semibold text-ink">
                        {account.sortCode}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copy(account)}
                  className="mt-7 btn-ghost btn-sm w-full"
                >
                  <Icon
                    name={copiedAccount === account.accountNumber ? 'check' : 'download'}
                    className="h-[17px] w-[17px]"
                  />
                  {copiedAccount === account.accountNumber ? 'Copied' : 'Copy Number'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand/20 bg-brand-tint p-5 text-center text-[15px] leading-relaxed text-muted">
          After transferring, kindly send your teller or screenshot to{' '}
          <a href={`mailto:${church.email}`} className="font-semibold text-brand hover:underline">
            {church.email}
          </a>{' '}
          so we can issue your receipt.
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
