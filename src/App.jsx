import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import { ScrollToTop, WhatsAppButton } from './components/Common'
import { pageVariants } from './lib/motion'
import Home from './pages/Home'
import About from './pages/About'
import Ministries from './pages/Ministries'
import Events from './pages/Events'
import Sermons from './pages/Sermons'
import Give from './pages/Give'
import PrayerRequest from './pages/PrayerRequest'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Code-split: the Firebase Auth SDK and admin dashboard only load for
// people who actually visit /admin, not every homepage visitor.
const Admin = lazy(() => import('./pages/Admin'))

function PageTransition({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return children

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-shell">
            <p className="font-heading text-[14px] text-muted">Loading…</p>
          </div>
        }
      >
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/ministries" element={<PageTransition><Ministries /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/sermons" element={<PageTransition><Sermons /></PageTransition>} />
            <Route path="/give" element={<PageTransition><Give /></PageTransition>} />
            <Route path="/prayer-request" element={<PageTransition><PrayerRequest /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
