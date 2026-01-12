
import { Expense, Category } from './types';

const STORAGE_KEY_EXPENSES = 'spendwise_expenses';
const STORAGE_KEY_CATEGORIES = 'spendwise_categories';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Grocery', icon: '🛒' },
  { id: '2', name: 'Food', icon: '🍔' },
  { id: '3', name: 'Bills', icon: '💸' },
  { id: '4', name: 'Travel', icon: '🚗' },
  { id: '5', name: 'Rent', icon: '🏠' },
  { id: '6', name: 'Entertainment', icon: '🎬' }
];

export const db = {
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(STORAGE_KEY_EXPENSES);
    return data ? JSON.parse(data) : [];
  },
  
  saveExpense: (expense: Expense) => {
    const expenses = db.getExpenses();
    expenses.push(expense);
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  },

  deleteExpense: (id: string) => {
    const expenses = db.getExpenses().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  },

  getCategories: (): Category[] => {
    const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    return JSON.parse(data);
  },

  addCategory: (category: Category) => {
    const categories = db.getCategories();
    categories.push(category);
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  }
};
