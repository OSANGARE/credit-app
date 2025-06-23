export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface Application {
  id: string;
  amount: number;
  term: number;
  purpose: string;
  status: ApplicationStatus;
  createdAt: string;
  decisionDate?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin?: string;
}