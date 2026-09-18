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

const requestsCol = collection(db, 'prayerRequests')

function toRequest(docSnap) {
  return { id: docSnap.id, ...docSnap.data() }
}

// Public: submit a new prayer request — always lands as "new" for the
// Prayer Department / admin to see. Never publicly readable afterwards.
export function submitPrayerRequest({
  name,
  phone,
  email,
  topic,
  message,
  confidential,
  contactRequested,
}) {
  return addDoc(requestsCol, {
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    topic,
    message: message.trim(),
    confidential,
    contactRequested,
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

// Admin: active (not yet marked done) requests, oldest first so the queue
// works first-in-first-out.
export function subscribeActiveRequests(callback) {
  const q = query(requestsCol, where('status', '==', 'new'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toRequest)))
}

// Admin: requests already handled, newest first.
export function subscribeDoneRequests(callback) {
  const q = query(requestsCol, where('status', '==', 'done'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toRequest)))
}

export function markRequestDone(id) {
  return updateDoc(doc(db, 'prayerRequests', id), { status: 'done' })
}

export function reopenRequest(id) {
  return updateDoc(doc(db, 'prayerRequests', id), { status: 'new' })
}

export function deletePrayerRequest(id) {
  return deleteDoc(doc(db, 'prayerRequests', id))
}
