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

const messagesCol = collection(db, 'contactMessages')

function toMessage(docSnap) {
  return { id: docSnap.id, ...docSnap.data() }
}

// Public: submit a new contact message — always lands as "new" for the
// admin to see. Never publicly readable afterwards.
export function submitContactMessage({ name, phone, email, subject, message }) {
  return addDoc(messagesCol, {
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    subject,
    message: message.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

// Admin: active (not yet marked done) messages, oldest first.
export function subscribeActiveMessages(callback) {
  const q = query(messagesCol, where('status', '==', 'new'), orderBy('createdAt', 'asc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toMessage)))
}

// Admin: messages already handled, newest first.
export function subscribeDoneMessages(callback) {
  const q = query(messagesCol, where('status', '==', 'done'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => callback(snap.docs.map(toMessage)))
}

export function markMessageDone(id) {
  return updateDoc(doc(db, 'contactMessages', id), { status: 'done' })
}

export function reopenMessage(id) {
  return updateDoc(doc(db, 'contactMessages', id), { status: 'new' })
}

export function deleteContactMessage(id) {
  return deleteDoc(doc(db, 'contactMessages', id))
}
