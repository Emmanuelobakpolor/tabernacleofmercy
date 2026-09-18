import { useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/Icons'
import { auth } from '../lib/firebaseAuth'
import { backdropVariants, drawerVariantsLeft, popVariants } from '../lib/motion'
import {
  LIFESPAN_DAYS,
  approveTestimony,
  archiveTestimony,
  deleteTestimony,
  isLive,
  rejectTestimony,
  subscribeApprovedTestimonies,
  subscribePendingTestimonies,
  subscribeTestimoniesByStatus,
} from '../lib/testimonies'
import { createEvent, deleteEvent, subscribeEvents, updateEvent } from '../lib/events'
import { createSermon, deleteSermon, subscribeSermons, updateSermon } from '../lib/sermons'
import {
  deletePrayerRequest,
  markRequestDone,
  reopenRequest,
  subscribeActiveRequests,
  subscribeDoneRequests,
} from '../lib/prayerRequests'
import {
  deleteContactMessage,
  markMessageDone,
  reopenMessage,
  subscribeActiveMessages,
  subscribeDoneMessages,
} from '../lib/contactMessages'

export default function Admin() {
  const [user, setUser] = useState(undefined) // undefined = still checking

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) {
    return (
      <div className="grid min-h-screen place-items-center bg-shell">
        <p className="font-heading text-[14px] text-muted">Loading…</p>
      </div>
    )
  }

  return user ? <Dashboard user={user} /> : <Login />
}

/* --------------------------------------------------------------------------
   Login
   -------------------------------------------------------------------------- */
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-shell px-4">
      <div className="w-full max-w-sm border-t-4 border-brand bg-white p-8 shadow-card">
        <span className="grid h-12 w-12 place-items-center bg-brand text-white">
          <Icon name="lock" className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-heading text-[24px] font-bold text-ink">Parish Admin</h1>
        <p className="mt-1.5 text-[14px] text-muted">
          Sign in to manage prayer requests, messages, testimonies, events and sermons.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block font-heading text-[13px] font-semibold text-ink">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-line bg-white px-4 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block font-heading text-[13px] font-semibold text-ink">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-line bg-white px-4 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {error && <p className="text-[13.5px] text-red-600">{error}</p>}

          <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Dashboard shell — switches between the Prayer Requests, Messages,
   Testimonies, Events and Sermons areas
   -------------------------------------------------------------------------- */
const SECTIONS = [
  { id: 'prayer', label: 'Prayer Requests', icon: 'prayer' },
  { id: 'messages', label: 'Messages', icon: 'mail' },
  { id: 'testimonies', label: 'Testimonies', icon: 'quote' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'sermons', label: 'Sermons', icon: 'play' },
]

function Dashboard({ user }) {
  const [section, setSection] = useState('prayer')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const current = SECTIONS.find((s) => s.id === section)

  const goTo = (id) => {
    setSection(id)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-shell">
      <header className="border-b border-line bg-white">
        <div className="container flex h-16 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 shrink-0 place-items-center border border-line text-ink transition-colors hover:border-brand hover:text-brand sm:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <span className="hidden h-9 w-9 shrink-0 place-items-center bg-brand text-white sm:grid">
              <Icon name="lock" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="font-heading text-[15px] font-bold leading-tight text-ink">
                Parish Admin
              </p>
              <p className="truncate text-[12px] leading-tight text-muted">{user.email}</p>
            </div>
          </div>
          <button type="button" onClick={() => signOut(auth)} className="btn-ghost btn-sm shrink-0">
            Sign Out
          </button>
        </div>
      </header>

      {/* Desktop / tablet section nav */}
      <div className="hidden border-b border-line bg-white sm:block">
        <div className="container flex gap-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 font-heading text-[14.5px] font-semibold transition-colors ${
                section === s.id
                  ? 'border-brand text-brand'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <Icon name={s.icon} className="h-4 w-4 shrink-0" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: current section indicator (nav itself lives in the sidebar) */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="flex w-full items-center gap-2 border-b border-line bg-white px-4 py-3.5 font-heading text-[14px] font-semibold text-brand sm:hidden"
      >
        <Icon name={current.icon} className="h-4 w-4 shrink-0" />
        {current.label}
        <Icon name="arrowRight" className="ml-auto h-4 w-4 text-muted" />
      </button>

      <div className="container py-10">
        {section === 'prayer' && <PrayerRequestsSection />}
        {section === 'messages' && <MessagesSection />}
        {section === 'testimonies' && <TestimoniesSection />}
        {section === 'events' && <EventsSection />}
        {section === 'sermons' && <SermonsSection />}
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-[70] sm:hidden">
            <motion.div
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-ink/50"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              variants={drawerVariantsLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute left-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
                <span className="font-heading text-[16px] font-bold text-ink">Menu</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center border border-line text-ink"
                >
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-2">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goTo(s.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left font-heading text-[15px] font-semibold transition-colors ${
                      section === s.id
                        ? 'bg-brand-tint text-brand'
                        : 'text-ink hover:bg-shell'
                    }`}
                  >
                    <Icon name={s.icon} className="h-[18px] w-[18px] shrink-0" />
                    {s.label}
                  </button>
                ))}
              </nav>

              <div className="shrink-0 border-t border-line p-4">
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="btn-ghost btn-sm w-full"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Prayer Requests section
   -------------------------------------------------------------------------- */
// Best-effort local-to-international conversion for WhatsApp links —
// matches the convention already used for the church's own number in
// data/site.js (leading 0 → 234 country code).
function toWhatsAppDigits(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) return `234${digits.slice(1)}`
  return digits
}

const PRAYER_TABS = [
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

function PrayerRequestsSection() {
  const [tab, setTab] = useState('active')
  const [active, setActive] = useState([])
  const [done, setDone] = useState([])
  const [busyId, setBusyId] = useState(null)

  useEffect(() => subscribeActiveRequests(setActive), [])
  useEffect(() => subscribeDoneRequests(setDone), [])

  const withBusy = async (id, fn) => {
    setBusyId(id)
    try {
      await fn(id)
    } finally {
      setBusyId(null)
    }
  }

  const rows = tab === 'active' ? active : done

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {PRAYER_TABS.map((t) => {
          const count = t.id === 'active' ? active.length : done.length
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-2 px-5 py-2.5 font-heading text-[14px] font-semibold transition-colors ${
                tab === t.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              {t.label}
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${
                  tab === t.id ? 'bg-white/25 text-white' : 'bg-brand-light text-brand-deep'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        {!rows.length ? (
          <EmptyState
            text={
              tab === 'active'
                ? 'No prayer requests waiting right now.'
                : 'Nothing marked done yet.'
            }
          />
        ) : (
          <div className="space-y-4">
            {rows.map((row) => (
              <article
                key={row.id}
                className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <p className="font-heading text-[15.5px] font-semibold text-ink">{row.name}</p>
                    <span className="bg-brand-light px-2.5 py-0.5 font-heading text-[11.5px] font-semibold uppercase tracking-wider text-brand-deep">
                      {row.topic}
                    </span>
                    {row.confidential && (
                      <span className="font-heading text-[11.5px] font-semibold uppercase tracking-wider text-red-600">
                        Confidential
                      </span>
                    )}
                    {row.contactRequested && (
                      <span className="font-heading text-[11.5px] font-semibold uppercase tracking-wider text-brand">
                        Wants contact
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{row.message}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted">
                    {row.phone && <span>{row.phone}</span>}
                    {row.email && <span>{row.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:flex-wrap sm:gap-2.5">
                  {row.phone && (
                    <>
                      <a href={`tel:${row.phone}`} className="btn-ghost btn-sm">
                        <Icon name="phone" className="h-4 w-4" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${toWhatsAppDigits(row.phone)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost btn-sm"
                      >
                        <Icon name="whatsapp" className="h-4 w-4" strokeWidth={1.4} />
                        WhatsApp
                      </a>
                    </>
                  )}
                  {tab === 'active' ? (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => withBusy(row.id, markRequestDone)}
                      className="btn-primary btn-sm disabled:opacity-60"
                    >
                      <Icon name="check" className="h-4 w-4" />
                      Mark Done
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => withBusy(row.id, reopenRequest)}
                      className="btn-ghost btn-sm disabled:opacity-60"
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busyId === row.id}
                    onClick={() => withBusy(row.id, deletePrayerRequest)}
                    className="btn-ghost btn-sm disabled:opacity-60"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

/* --------------------------------------------------------------------------
   Messages section (Contact form submissions)
   -------------------------------------------------------------------------- */
const MESSAGE_TABS = [
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

function MessagesSection() {
  const [tab, setTab] = useState('active')
  const [active, setActive] = useState([])
  const [done, setDone] = useState([])
  const [busyId, setBusyId] = useState(null)

  useEffect(() => subscribeActiveMessages(setActive), [])
  useEffect(() => subscribeDoneMessages(setDone), [])

  const withBusy = async (id, fn) => {
    setBusyId(id)
    try {
      await fn(id)
    } finally {
      setBusyId(null)
    }
  }

  const rows = tab === 'active' ? active : done

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {MESSAGE_TABS.map((t) => {
          const count = t.id === 'active' ? active.length : done.length
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-2 px-5 py-2.5 font-heading text-[14px] font-semibold transition-colors ${
                tab === t.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              {t.label}
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${
                  tab === t.id ? 'bg-white/25 text-white' : 'bg-brand-light text-brand-deep'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        {!rows.length ? (
          <EmptyState
            text={tab === 'active' ? 'No messages waiting right now.' : 'Nothing marked done yet.'}
          />
        ) : (
          <div className="space-y-4">
            {rows.map((row) => (
              <article
                key={row.id}
                className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <p className="font-heading text-[15.5px] font-semibold text-ink">{row.name}</p>
                    <span className="bg-brand-light px-2.5 py-0.5 font-heading text-[11.5px] font-semibold uppercase tracking-wider text-brand-deep">
                      {row.subject}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{row.message}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted">
                    {row.phone && <span>{row.phone}</span>}
                    {row.email && <span>{row.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:flex-wrap sm:gap-2.5">
                  {row.phone && (
                    <>
                      <a href={`tel:${row.phone}`} className="btn-ghost btn-sm">
                        <Icon name="phone" className="h-4 w-4" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${toWhatsAppDigits(row.phone)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost btn-sm"
                      >
                        <Icon name="whatsapp" className="h-4 w-4" strokeWidth={1.4} />
                        WhatsApp
                      </a>
                    </>
                  )}
                  {row.email && (
                    <a href={`mailto:${row.email}`} className="btn-ghost btn-sm">
                      <Icon name="mail" className="h-4 w-4" />
                      Email
                    </a>
                  )}
                  {tab === 'active' ? (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => withBusy(row.id, markMessageDone)}
                      className="btn-primary btn-sm disabled:opacity-60"
                    >
                      <Icon name="check" className="h-4 w-4" />
                      Mark Done
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busyId === row.id}
                      onClick={() => withBusy(row.id, reopenMessage)}
                      className="btn-ghost btn-sm disabled:opacity-60"
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busyId === row.id}
                    onClick={() => withBusy(row.id, deleteContactMessage)}
                    className="btn-ghost btn-sm disabled:opacity-60"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

/* --------------------------------------------------------------------------
   Testimonies section
   -------------------------------------------------------------------------- */
const TESTIMONY_TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'live', label: 'Live' },
  { id: 'history', label: 'History' },
]

function TestimoniesSection() {
  const [tab, setTab] = useState('pending')
  const [pending, setPending] = useState([])
  const [approved, setApproved] = useState([])
  const [history, setHistory] = useState([])
  const [busyId, setBusyId] = useState(null)

  useEffect(() => subscribePendingTestimonies(setPending), [])
  useEffect(() => subscribeApprovedTestimonies(setApproved), [])
  useEffect(() => {
    const unsubRejected = subscribeTestimoniesByStatus('rejected', (rows) =>
      setHistory((prev) => mergeHistory(prev, 'rejected', rows))
    )
    const unsubArchived = subscribeTestimoniesByStatus('archived', (rows) =>
      setHistory((prev) => mergeHistory(prev, 'archived', rows))
    )
    return () => {
      unsubRejected()
      unsubArchived()
    }
  }, [])

  const live = approved.filter(isLive)

  const withBusy = async (id, fn) => {
    setBusyId(id)
    try {
      await fn(id)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {TESTIMONY_TABS.map((t) => {
          const count = t.id === 'pending' ? pending.length : t.id === 'live' ? live.length : history.length
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-2 px-5 py-2.5 font-heading text-[14px] font-semibold transition-colors ${
                tab === t.id
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink hover:border-brand hover:text-brand'
              }`}
            >
              {t.label}
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${
                  tab === t.id ? 'bg-white/25 text-white' : 'bg-brand-light text-brand-deep'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        {tab === 'pending' && (
          <PendingList
            rows={pending}
            busyId={busyId}
            onApprove={(id) => withBusy(id, approveTestimony)}
            onReject={(id) => withBusy(id, rejectTestimony)}
          />
        )}
        {tab === 'live' && (
          <LiveList rows={live} busyId={busyId} onRemove={(id) => withBusy(id, archiveTestimony)} />
        )}
        {tab === 'history' && (
          <HistoryList rows={history} busyId={busyId} onDelete={(id) => withBusy(id, deleteTestimony)} />
        )}
      </div>
    </>
  )
}

function mergeHistory(prev, status, rows) {
  const withoutStatus = prev.filter((r) => r.status !== status)
  return [...withoutStatus, ...rows].sort((a, b) => {
    const ad = a.createdAt?.toDate?.() ?? new Date(0)
    const bd = b.createdAt?.toDate?.() ?? new Date(0)
    return bd - ad
  })
}

function EmptyState({ text }) {
  return (
    <div className="border border-dashed border-line bg-white p-12 text-center">
      <p className="text-[14.5px] text-muted">{text}</p>
    </div>
  )
}

function TestimonyRow({ row, children }) {
  return (
    <article className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-heading text-[15.5px] font-semibold text-ink">{row.name}</p>
          {row.role && <p className="text-[13px] text-muted">{row.role}</p>}
        </div>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">&ldquo;{row.quote}&rdquo;</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-2.5">{children}</div>
    </article>
  )
}

function PendingList({ rows, busyId, onApprove, onReject }) {
  if (!rows.length) return <EmptyState text="No testimonies waiting for review." />
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <TestimonyRow key={row.id} row={row}>
          <button
            type="button"
            disabled={busyId === row.id}
            onClick={() => onApprove(row.id)}
            className="btn-primary btn-sm disabled:opacity-60"
          >
            <Icon name="check" className="h-4 w-4" />
            Approve
          </button>
          <button
            type="button"
            disabled={busyId === row.id}
            onClick={() => onReject(row.id)}
            className="btn-ghost btn-sm disabled:opacity-60"
          >
            <Icon name="close" className="h-4 w-4" />
            Reject
          </button>
        </TestimonyRow>
      ))}
    </div>
  )
}

function LiveList({ rows, busyId, onRemove }) {
  if (!rows.length) return <EmptyState text="Nothing is live on the homepage right now." />
  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const approvedAt = row.approvedAt?.toDate?.()
        const daysLeft = approvedAt
          ? Math.max(0, LIFESPAN_DAYS - Math.floor((Date.now() - approvedAt.getTime()) / 86400000))
          : LIFESPAN_DAYS
        return (
          <TestimonyRow key={row.id} row={row}>
            <span className="self-center whitespace-nowrap font-heading text-[12.5px] font-semibold uppercase tracking-wider text-brand">
              {daysLeft} day{daysLeft === 1 ? '' : 's'} left
            </span>
            <button
              type="button"
              disabled={busyId === row.id}
              onClick={() => onRemove(row.id)}
              className="btn-ghost btn-sm disabled:opacity-60"
            >
              <Icon name="trash" className="h-4 w-4" />
              Remove
            </button>
          </TestimonyRow>
        )
      })}
    </div>
  )
}

function HistoryList({ rows, busyId, onDelete }) {
  if (!rows.length) return <EmptyState text="No rejected or expired testimonies yet." />
  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <TestimonyRow key={row.id} row={row}>
          <span
            className={`self-center whitespace-nowrap font-heading text-[12px] font-semibold uppercase tracking-wider ${
              row.status === 'rejected' ? 'text-red-600' : 'text-muted'
            }`}
          >
            {row.status === 'rejected' ? 'Rejected' : 'Expired'}
          </span>
          <button
            type="button"
            disabled={busyId === row.id}
            onClick={() => onDelete(row.id)}
            className="btn-ghost btn-sm disabled:opacity-60"
          >
            <Icon name="trash" className="h-4 w-4" />
            Delete
          </button>
        </TestimonyRow>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Events section
   -------------------------------------------------------------------------- */
function EventsSection() {
  const [events, setEvents] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => subscribeEvents(setEvents), [])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (event) => {
    setEditing(event)
    setFormOpen(true)
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return
    setBusyId(id)
    try {
      await deleteEvent(id)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14.5px] text-muted">
          {events.length} event{events.length === 1 ? '' : 's'} showing on the site.
        </p>
        <button type="button" onClick={openCreate} className="btn-primary btn-sm w-full sm:w-auto">
          <Icon name="calendar" className="h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="mt-6">
        {!events.length ? (
          <EmptyState text="No events yet. Add your first programme above." />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <article
                key={event.id}
                className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex min-w-0 gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center bg-brand-light text-center font-heading leading-none text-brand-deep">
                    <span>
                      <span className="block text-[17px] font-bold">{event.day}</span>
                      <span className="mt-0.5 block text-[10px] font-semibold tracking-wider">
                        {event.month}
                      </span>
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-[15.5px] font-semibold text-ink">{event.title}</p>
                    <p className="mt-1 text-[13.5px] text-muted">{event.dateLabel}</p>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
                      <span>{event.time}</span>
                      <span>{event.location}</span>
                      <span className="font-semibold text-brand">{event.category}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-2.5">
                  <button type="button" onClick={() => openEdit(event)} className="btn-ghost btn-sm">
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busyId === event.id}
                    onClick={() => onDelete(event.id)}
                    className="btn-ghost btn-sm disabled:opacity-60"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <EventFormModal
        open={formOpen}
        event={editing}
        onClose={() => setFormOpen(false)}
      />
    </>
  )
}

const EMPTY_EVENT = {
  title: '',
  date: '',
  dateLabel: '',
  time: '',
  location: '',
  category: '',
  image: '',
  description: '',
}

function EventFormModal({ open, event, onClose }) {
  const [form, setForm] = useState(EMPTY_EVENT)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setForm(event ? { ...EMPTY_EVENT, ...event } : EMPTY_EVENT)
      setError('')
    }
  }, [open, event])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      title: form.title.trim(),
      date: form.date,
      dateLabel: form.dateLabel.trim(),
      time: form.time.trim(),
      location: form.location.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
    }
    try {
      if (event) {
        await updateEvent(event.id, payload)
      } else {
        await createEvent(payload)
      }
      onClose()
    } catch {
      setError('Could not save this event. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-ink/60"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            variants={popVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border-t-4 border-brand bg-white p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            <h3 className="pr-8 font-heading text-[22px] font-bold text-ink">
              {event ? 'Edit Event' : 'Add Event'}
            </h3>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <FormField label="Title" required>
                <input required value={form.title} onChange={set('title')} className={fieldClass} placeholder="Annual Thanksgiving Sunday" />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Date" required>
                  <input type="date" required value={form.date} onChange={set('date')} className={fieldClass} />
                </FormField>
                <FormField label="Time" required>
                  <input required value={form.time} onChange={set('time')} className={fieldClass} placeholder="8:00 AM" />
                </FormField>
              </div>

              <FormField label="Custom Date Label (optional)" hint="Leave blank to auto-generate from the date. Use this for multi-day events, e.g. 'Mon 19 – Sun 25 October 2026'.">
                <input value={form.dateLabel} onChange={set('dateLabel')} className={fieldClass} placeholder="" />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Location" required>
                  <input required value={form.location} onChange={set('location')} className={fieldClass} placeholder="Main Auditorium" />
                </FormField>
                <FormField label="Category" required>
                  <input required value={form.category} onChange={set('category')} className={fieldClass} placeholder="Special Service" />
                </FormField>
              </div>

              <FormField label="Image URL" required>
                <input required type="url" value={form.image} onChange={set('image')} className={fieldClass} placeholder="https://..." />
              </FormField>

              <FormField label="Description" required>
                <textarea required rows="4" value={form.description} onChange={set('description')} className={fieldClass} />
              </FormField>

              {error && <p className="text-[13.5px] text-red-600">{error}</p>}

              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving ? 'Saving…' : event ? 'Save Changes' : 'Add Event'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const fieldClass =
  'w-full rounded-sm border border-line bg-white px-4 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

function FormField({ label, required, hint, children }) {
  return (
    <div>
      <label className="mb-1.5 block font-heading text-[13px] font-semibold text-ink">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Sermons section
   -------------------------------------------------------------------------- */
function SermonsSection() {
  const [sermons, setSermons] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => subscribeSermons(setSermons), [])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (sermon) => {
    setEditing(sermon)
    setFormOpen(true)
  }

  const onDelete = async (sermon) => {
    if (!window.confirm('Delete this sermon? This cannot be undone.')) return
    setBusyId(sermon.id)
    try {
      await deleteSermon(sermon.id)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14.5px] text-muted">
          {sermons.length} sermon{sermons.length === 1 ? '' : 's'} showing on the site.
        </p>
        <button type="button" onClick={openCreate} className="btn-primary btn-sm w-full sm:w-auto">
          <Icon name="play" className="h-4 w-4" />
          Add Sermon
        </button>
      </div>

      <div className="mt-6">
        {!sermons.length ? (
          <EmptyState text="No sermons yet. Add your first message above." />
        ) : (
          <div className="space-y-4">
            {sermons.map((sermon) => (
              <article
                key={sermon.id}
                className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-heading text-[15.5px] font-semibold text-ink">{sermon.title}</p>
                    <span
                      className={`font-heading text-[11.5px] font-semibold uppercase tracking-wider ${
                        sermon.audioUrl ? 'text-brand' : 'text-red-600'
                      }`}
                    >
                      {sermon.audioUrl ? 'Audio ready' : 'No audio'}
                    </span>
                  </div>
                  <p className="mt-1 text-[13.5px] text-muted">
                    {sermon.speaker} &middot; {sermon.dateLabel}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
                    <span>{sermon.series}</span>
                    <span>{sermon.scripture}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-2.5">
                  <button type="button" onClick={() => openEdit(sermon)} className="btn-ghost btn-sm">
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={busyId === sermon.id}
                    onClick={() => onDelete(sermon)}
                    className="btn-ghost btn-sm disabled:opacity-60"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <SermonFormModal open={formOpen} sermon={editing} onClose={() => setFormOpen(false)} />
    </>
  )
}

const EMPTY_SERMON = {
  title: '',
  speaker: '',
  date: '',
  series: '',
  scripture: '',
  duration: '',
  description: '',
  audioUrl: '',
  notesUrl: '',
}

function SermonFormModal({ open, sermon, onClose }) {
  const [form, setForm] = useState(EMPTY_SERMON)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setForm(sermon ? { ...EMPTY_SERMON, ...sermon } : EMPTY_SERMON)
      setError('')
    }
  }, [open, sermon])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title.trim(),
        speaker: form.speaker.trim(),
        date: form.date,
        series: form.series.trim(),
        scripture: form.scripture.trim(),
        duration: form.duration.trim(),
        description: form.description.trim(),
        audioUrl: form.audioUrl.trim(),
        notesUrl: form.notesUrl.trim(),
      }

      if (sermon) {
        await updateSermon(sermon.id, payload)
      } else {
        await createSermon(payload)
      }
      onClose()
    } catch {
      setError('Could not save this sermon. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-ink/60"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            variants={popVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border-t-4 border-brand bg-white p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            <h3 className="pr-8 font-heading text-[22px] font-bold text-ink">
              {sermon ? 'Edit Sermon' : 'Add Sermon'}
            </h3>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <FormField label="Title" required>
                <input required value={form.title} onChange={set('title')} className={fieldClass} placeholder="Anchored in the Storm" />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Speaker" required>
                  <input required value={form.speaker} onChange={set('speaker')} className={fieldClass} placeholder="Pastor Alfred Lawrence" />
                </FormField>
                <FormField label="Date" required>
                  <input type="date" required value={form.date} onChange={set('date')} className={fieldClass} />
                </FormField>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Series" required>
                  <input required value={form.series} onChange={set('series')} className={fieldClass} placeholder="Faith That Holds" />
                </FormField>
                <FormField label="Scripture" required>
                  <input required value={form.scripture} onChange={set('scripture')} className={fieldClass} placeholder="Mark 4:35-41" />
                </FormField>
              </div>

              <FormField label="Duration (optional)" hint="e.g. 48 min — shown next to the message.">
                <input value={form.duration} onChange={set('duration')} className={fieldClass} placeholder="48 min" />
              </FormField>

              <FormField label="Description" required>
                <textarea required rows="4" value={form.description} onChange={set('description')} className={fieldClass} />
              </FormField>

              <FormField
                label="Audio URL"
                required
                hint="Upload the mp3 to a free host — e.g. archive.org, Google Drive (with a shareable link) or SoundCloud — then paste the direct link here."
              >
                <input
                  type="url"
                  required
                  value={form.audioUrl}
                  onChange={set('audioUrl')}
                  className={fieldClass}
                  placeholder="https://archive.org/download/.../sermon.mp3"
                />
              </FormField>

              <FormField
                label="Sermon Notes URL (optional)"
                hint="A link to a PDF of the sermon notes, if you have one."
              >
                <input
                  type="url"
                  value={form.notesUrl}
                  onChange={set('notesUrl')}
                  className={fieldClass}
                  placeholder="https://..."
                />
              </FormField>

              {error && <p className="text-[13.5px] text-red-600">{error}</p>}

              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving ? 'Saving…' : sermon ? 'Save Changes' : 'Add Sermon'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
