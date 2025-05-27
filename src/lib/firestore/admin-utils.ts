import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
// import type { DocumentData } from "firebase/firestore";

interface Admin {
    id: string;
    email: string;
    name?: string;
    isActive: boolean;
    createdAt?: Date;
}

// Get all active admins from Firestore
export async function getActiveAdmins(): Promise<Admin[]> {
    try {
        // Create a reference to the admins collection
        const adminsRef = collection(db, 'admins');
        
        // Create a query against the collection
        const q = query(adminsRef, where('isActive', '==', true));
        
        // Execute the query
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No active admins found');
            return [];
        }

        return querySnapshot.docs.map((doc): Admin => {
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                name: data.name || undefined, // Explicitly handle optional field
                isActive: data.isActive,
                createdAt: data.createdAt?.toDate() // Convert Firestore Timestamp to Date
            };
        });
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw new Error('Failed to fetch admins');
    }
}
