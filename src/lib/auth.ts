import { NextRequest } from 'next/server'
import { adminAuth } from './firebase-admin'

export async function verifyAuthToken(req: NextRequest) {
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }

    const token = authHeader.split('Bearer ')[1]

    try {
        const decodedToken = await adminAuth.verifyIdToken(token)
        return decodedToken
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
} 
