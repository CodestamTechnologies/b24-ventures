import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { env } from './env'

const firebaseAdminConfig = {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
}

// Initialize Firebase Admin
const apps = getApps()

if (!apps.length) {
    initializeApp({
        credential: cert(firebaseAdminConfig),
    })
}

export const adminAuth = getAuth() 
 