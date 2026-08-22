import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp, getDocs, query, where, orderBy, updateDoc } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export interface UserProfileData {
  uid: string;
  email: string;
  loyaltyPoints: number;
  membershipTier: 'Basic' | 'Plus' | 'Premium';
  createdAt: any;
}

export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

export interface OrderData {
  userId: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: any;
}

export interface TicketData {
  userId: string;
  name: string;
  email: string;
  phone: string;
  operationalId: string;
  sector: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Payload: ', JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

export const firestoreService = {
  // Test connection function required by critical constraint
  async testConnection(): Promise<void> {
    const path = 'test/connection';
    try {
      const docRef = doc(db, 'test', 'connection');
      const testValue = await getDoc(docRef);
      console.log("Firestore standard connectivity signal ready:", testValue.exists());
    } catch (error) {
      if (error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Critical warning: Please verify your Firebase connection. The client is currently offline.");
      }
      // Fail gracefully for connection checks so it doesn't halt the boot cycle
    }
  },

  // 1. User Profiles Logic
  async getUserProfile(userId: string): Promise<UserProfileData | null> {
    const path = `userProfiles/${userId}`;
    try {
      const docRef = doc(db, 'userProfiles', userId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserProfileData;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  },

  async createUserProfile(userId: string, email: string): Promise<UserProfileData> {
    const path = `userProfiles/${userId}`;
    const profile: UserProfileData = {
      uid: userId,
      email: email,
      loyaltyPoints: 0,
      membershipTier: 'Basic',
      createdAt: new Date() // Will convert to standard timestamp
    };
    try {
      const docRef = doc(db, 'userProfiles', userId);
      await setDoc(docRef, {
        ...profile,
        createdAt: serverTimestamp()
      });
      return profile;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async addLoyaltyPoints(userId: string, pointsEarned: number): Promise<void> {
    const path = `userProfiles/${userId}`;
    try {
      const currentProfile = await this.getUserProfile(userId);
      if (!currentProfile) return;

      const newPoints = currentProfile.loyaltyPoints + pointsEarned;
      let newTier: 'Basic' | 'Plus' | 'Premium' = 'Basic';
      
      if (newPoints >= 5000) {
        newTier = 'Premium';
      } else if (newPoints >= 1000) {
        newTier = 'Plus';
      }

      const docRef = doc(db, 'userProfiles', userId);
      await updateDoc(docRef, {
        loyaltyPoints: newPoints,
        membershipTier: newTier
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  // 2. Orders Logic
  async getOrders(userId: string): Promise<OrderData[]> {
    const path = 'orders';
    try {
      const collRef = collection(db, 'orders');
      const q = query(collRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const orders: OrderData[] = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data() as OrderData);
      });
      return orders;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async createOrder(order: Omit<OrderData, 'createdAt'>): Promise<string> {
    const path = 'orders';
    try {
      const orderId = 'ORD_' + Math.floor(Math.random() * 900000 + 100000);
      const docRef = doc(db, 'orders', orderId);
      await setDoc(docRef, {
        ...order,
        createdAt: serverTimestamp()
      });
      return orderId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // 3. Tickets Logic
  async createTicket(ticket: Omit<TicketData, 'createdAt'>): Promise<string> {
    const path = 'tickets';
    try {
      const ticketId = 'TCK_' + Math.floor(Math.random() * 900000 + 100000);
      const docRef = doc(db, 'tickets', ticketId);
      await setDoc(docRef, {
        ...ticket,
        createdAt: serverTimestamp()
      });
      return ticketId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  async getTickets(userId: string): Promise<TicketData[]> {
    const path = 'tickets';
    try {
      const collRef = collection(db, 'tickets');
      const q = query(collRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const tickets: TicketData[] = [];
      querySnapshot.forEach((doc) => {
        tickets.push(doc.data() as TicketData);
      });
      return tickets;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  }
};
