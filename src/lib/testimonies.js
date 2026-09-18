import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

// Business rules: at most this many testimonies are ever live on the
// homepage at once, and each one ages out this many days after approval.
export const MAX_LIVE = 5
export const LIFESPAN_DAYS = 14

const testimoniesCol = collection(db, 'testimonies')

function cutoffDate() {
  return new Date(Date.now() - LIFESPAN_DAYS * 24 * 60 * 60 * 1000)
}

function toRow(docSnap) {
  return { id: docSnap.id, ...docSnap.data() }
}

function isLive(row) {
  return row.status === 'approved' && row.approvedAt && row.approvedAt.toDate() > cutoffDate()
}

/* --------------------------------------------------------------------------
   Public: submit a new testimony (always lands as "pending")
   -------------------------------------------------------------------------- */
export function submitTestimony({ name, role, quote }) {
  return addDoc(testimoniesCol, {
    name: name.trim(),
    role: role.trim(),
    quote: quote.trim(),
    status: 'pending',
    createdAt: serverTimestamp(),
    approvedAt: null,
  })
}

/* --------------------------------------------------------------------------
   Public: live feed for the homepage — approved, not yet expired, newest
   first, capped at MAX_LIVE.
   -------------------------------------------------------------------------- */
export function subscribeLiveTestimonies(callback) {
  const q = query(testimoniesCol, where('status', '==', 'approved'), orderBy('approvedAt', 'desc'))
  return onSnapshot(q, (snap) => {
    const rows = snap.docs.map(toRow).filter(isLive).slice(0, MAX_LIVE)
    callback(rows)
  })
}

/* --------------------------------------------------------------------------
   Admin: pending submissions awaiting review, oldest first
   -------------------------------------------------------------------------- */
export function subscribePendingTestimonies(callback) {
  const q = query(testimoniesCol, where('status', '==', 'pending'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toRow)))
}

/* --------------------------------------------------------------------------
   Admin: everything that has ever been approved (live or since expired),
   newest first — used to show "currently live" vs "expired" history.
   -------------------------------------------------------------------------- */
export function subscribeApprovedTestimonies(callback) {
  const q = query(testimoniesCol, where('status', '==', 'approved'), orderBy('approvedAt', 'desc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toRow)))
}

/* --------------------------------------------------------------------------
   Admin: rejected or archived (retired/expired) testimonies, newest first —
   used for the History tab.
   -------------------------------------------------------------------------- */
export function subscribeTestimoniesByStatus(status, callback) {
  const q = query(testimoniesCol, where('status', '==', status), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toRow)))
}

/* --------------------------------------------------------------------------
   Admin: approve a pending testimony. If MAX_LIVE testimonies are already
   live, the oldest live one is archived first to make room.
   -------------------------------------------------------------------------- */
export async function approveTestimony(id) {
  const q = query(testimoniesCol, where('status', '==', 'approved'), orderBy('approvedAt', 'asc'))
  const snap = await getDocs(q)
  const live = snap.docs.map(toRow).filter(isLive)

  if (live.length >= MAX_LIVE) {
    await updateDoc(doc(db, 'testimonies', live[0].id), { status: 'archived' })
  }

  await updateDoc(doc(db, 'testimonies', id), {
    status: 'approved',
    approvedAt: serverTimestamp(),
  })
}

export function rejectTestimony(id) {
  return updateDoc(doc(db, 'testimonies', id), { status: 'rejected' })
}

// Manually take a live testimony down before its 2 weeks are up.
export function archiveTestimony(id) {
  return updateDoc(doc(db, 'testimonies', id), { status: 'archived' })
}

export function deleteTestimony(id) {
  return deleteDoc(doc(db, 'testimonies', id))
}

export { isLive, cutoffDate }
