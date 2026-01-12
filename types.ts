
export interface Expense {
  id: string;
  amount: number;
  date: string; // ISO string
  category: string;
  note: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type ViewMode = 'dashboard' | 'add' | 'history' | 'categories' | 'contact' | 'legal';

export enum LegalType {
  PRIVACY = 'privacy',
  TERMS = 'terms',
  DISCLAIMER = 'disclaimer'
}
