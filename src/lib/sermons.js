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

const sermonsCol = collection(db, 'sermons')

function fullDateLabel(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

function toSermon(docSnap) {
  const data = docSnap.data()
  return {
    id: docSnap.id,
    slug: docSnap.id,
    ...data,
    dateLabel: data.date ? fullDateLabel(data.date) : '',
  }
}

export function subscribeSermons(callback, onError) {
  const q = query(sermonsCol, orderBy('date', 'desc'))
  return onSnapshot(
    q,
    (snap) => callback(snap.docs.map(toSermon)),
    (err) => {
      console.error('subscribeSermons failed:', err)
      onError?.(err)
    }
  )
}

export function createSermon(data) {
  return addDoc(sermonsCol, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export function updateSermon(id, data) {
  return updateDoc(doc(db, 'sermons', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export function deleteSermon(id) {
  return deleteDoc(doc(db, 'sermons', id))
}
