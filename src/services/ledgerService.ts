import { db, auth } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where, orderBy, serverTimestamp, runTransaction } from 'firebase/firestore';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  vatNumber?: string;
  billingAddress: string;
  status: 'active' | 'inactive';
  createdAt: any;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number; // usually 15 for SA
  total: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  issueDate: any;
  dueDate: any;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
  notes: string;
  createdAt: any;
}

export const ledgerService = {
  // Clients (CRM)
  async createClient(clientData: Omit<Client, 'id' | 'createdAt'>): Promise<string> {
    const clientsRef = collection(db, 'clients');
    const docRef = await addDoc(clientsRef, {
      ...clientData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getClients(): Promise<Client[]> {
    const clientsRef = collection(db, 'clients');
    const q = query(clientsRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  },

  // Invoices (Accounting)
  async createInvoice(invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'invoiceNumber'>): Promise<string> {
    const invoicesRef = collection(db, 'invoices');
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const docRef = await addDoc(invoicesRef, {
      ...invoiceData,
      invoiceNumber,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  async getInvoices(): Promise<Invoice[]> {
    const invoicesRef = collection(db, 'invoices');
    const q = query(invoicesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invoice));
  }
};
