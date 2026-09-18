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
} from 'firebase/firestore'
import { db } from './firebase'

const eventsCol = collection(db, 'events')

function dayLabel(date) {
  return String(date.getDate()).padStart(2, '0')
}

function monthLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function fullDateLabel(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Turns a stored event doc into the shape the site's cards/calendar expect —
// day/month/dateLabel are derived from `date` unless the admin overrode
// dateLabel (useful for multi-day programmes like a week-long youth camp).
function toEvent(docSnap) {
  const data = docSnap.data()
  const date = new Date(`${data.date}T00:00:00`)
  return {
    id: docSnap.id,
    slug: docSnap.id,
    ...data,
    day: dayLabel(date),
    month: monthLabel(date),
    dateLabel: data.dateLabel?.trim() || fullDateLabel(date),
  }
}

export function subscribeEvents(callback, onError) {
  const q = query(eventsCol, orderBy('date', 'asc'))
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map(toEvent)),
    (err) => {
      console.error('subscribeEvents failed:', err)
      onError?.(err)
    }
  )
}

export function createEvent(data) {
  return addDoc(eventsCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export function updateEvent(id, data) {
  return updateDoc(doc(db, 'events', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export function deleteEvent(id) {
  return deleteDoc(doc(db, 'events', id))
}
