import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'
import { Field, SuccessNotice, inputClass } from './Common'
import { submitTestimony } from '../lib/testimonies'
import { backdropVariants, popVariants } from '../lib/motion'

export default function TestimonyModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [quote, setQuote] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setName('')
      setRole('')
      setQuote('')
      setSent(false)
      setError('')
    }, 250)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await submitTestimony({ name, role, quote })
      setSent(true)
    } catch {
      setError('Something went wrong sending your testimony. Please try again.')
    } finally {
      setSending(false)
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
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            variants={popVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimony-modal-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border-t-4 border-brand bg-white p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>

            {sent ? (
              <SuccessNotice title="Thank you for sharing">
                <p>
                  Your testimony has been sent for review. Once approved, it will appear in
                  the testimonies section on our homepage.
                </p>
                <button type="button" onClick={handleClose} className="btn-primary btn-sm mt-5">
                  Close
                </button>
              </SuccessNotice>
            ) : (
              <>
                <Icon
                  name="quote"
                  className="h-9 w-9 text-brand-light"
                  strokeWidth={0}
                  fill="currentColor"
                />
                <h3
                  id="testimony-modal-title"
                  className="mt-3 pr-8 font-heading text-[24px] font-bold leading-tight text-ink"
                >
                  Share Your Testimony
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Tell us what God has done. Your story is reviewed by our team before it
                  appears publicly.
                </p>

                <form onSubmit={onSubmit} className="mt-7 space-y-5">
                  <Field label="Full Name" id="test-name" required>
                    <input
                      id="test-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field
                    label="Your Connection to the Parish"
                    id="test-role"
                    hint="e.g. Member since 2023, First-time visitor"
                  >
                    <input
                      id="test-role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={inputClass}
                      placeholder="Member since 2023"
                    />
                  </Field>

                  <Field label="Your Testimony" id="test-quote" required>
                    <textarea
                      id="test-quote"
                      required
                      rows="5"
                      maxLength={600}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className={inputClass}
                      placeholder="Share what God has done in your life..."
                    />
                  </Field>

                  {error && <p className="text-[14px] text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? 'Sending…' : 'Submit for Review'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
