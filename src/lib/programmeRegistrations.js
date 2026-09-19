import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

const registrationsCol = collection(db, 'programmeRegistrations')

function toRegistration(docSnap) {
  return { id: docSnap.id, ...docSnap.data() }
}

// Public: submit a new event registration — always lands as "new" for the
// admin to see. Never publicly readable afterwards.
export function submitProgrammeRegistration({
  name,
  phone,
  email,
  count,
  eventSlug,
  eventTitle,
  notes,
}) {
  return addDoc(registrationsCol, {
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    count: count || 1,
    eventSlug,
    eventTitle,
    notes: notes.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

// Admin: active (not yet marked done) registrations, oldest first.
export function subscribeActiveRegistrations(callback, onError) {
  const q = query(registrationsCol, where('status', '==', 'new'), orderBy('createdAt', 'asc'))
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map(toRegistration)),
    (err) => {
      console.error('subscribeActiveRegistrations failed:', err)
      onError?.(err)
    }
  )
}

// Admin: registrations already handled, newest first.
export function subscribeDoneRegistrations(callback, onError) {
  const q = query(registrationsCol, where('status', '==', 'done'), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map(toRegistration)),
    (err) => {
      console.error('subscribeDoneRegistrations failed:', err)
      onError?.(err)
    }
  )
}

export function markRegistrationDone(id) {
  return updateDoc(doc(db, 'programmeRegistrations', id), { status: 'done' })
}

export function reopenRegistration(id) {
  return updateDoc(doc(db, 'programmeRegistrations', id), { status: 'new' })
}

export function deleteProgrammeRegistration(id) {
  return deleteDoc(doc(db, 'programmeRegistrations', id))
}
