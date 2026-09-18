import { getAuth } from 'firebase/auth'
import { app } from './firebase'

// Isolated from lib/firebase.js on purpose: only the /admin route imports
// this file, so firebase/auth is code-split out of the public bundle.
export const auth = getAuth(app)
