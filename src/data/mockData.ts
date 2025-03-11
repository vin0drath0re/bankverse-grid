
import { Account, Transaction, BudgetCategory, User } from '../types/bankTypes';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://i.pravatar.cc/150?img=68'
};

export const accounts: Account[] = [
  {
    id: 'acc1',
    name: 'Main Checking',
    type: 'checking',
    balance: 5840.25,
    currency: 'USD',
    number: '**** 4832',
    isMain: true
  },
  {
    id: 'acc2',
    name: 'Savings',
    type: 'savings',
    balance: 12750.80,
    currency: 'USD',
    number: '**** 5219'
  },
  {
    id: 'acc3',
    name: 'Travel Credit Card',
    type: 'credit',
    balance: -320.45,
    currency: 'USD',
    number: '**** 7514'
  },
  {
    id: 'acc4',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 28400.00,
    currency: 'USD',
    number: '**** 9321'
  }
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '2023-11-15T10:30:00Z',
    description: 'Starbucks Coffee',
    amount: -4.95,
    type: 'expense',
    category: 'Food & Dining',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't2',
    date: '2023-11-14T14:25:00Z',
    description: 'Amazon.com',
    amount: -67.99,
    type: 'expense',
    category: 'Shopping',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't3',
    date: '2023-11-14T08:00:00Z',
    description: 'Salary Deposit',
    amount: 3200.00,
    type: 'income',
    category: 'Income',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't4',
    date: '2023-11-12T19:45:00Z',
    description: 'Electric Bill',
    amount: -95.40,
    type: 'expense',
    category: 'Bills & Utilities',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't5',
    date: '2023-11-10T12:30:00Z',
    description: 'Transfer to Savings',
    amount: -500.00,
    type: 'transfer',
    category: 'Transfer',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't6',
    date: '2023-11-10T12:30:00Z',
    description: 'Transfer from Checking',
    amount: 500.00,
    type: 'transfer',
    category: 'Transfer',
    accountId: 'acc2',
    status: 'completed'
  },
  {
    id: 't7',
    date: '2023-11-08T17:20:00Z',
    description: 'Whole Foods Market',
    amount: -82.31,
    type: 'expense',
    category: 'Groceries',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't8',
    date: '2023-11-05T20:15:00Z',
    description: 'Movie Tickets',
    amount: -24.00,
    type: 'expense',
    category: 'Entertainment',
    accountId: 'acc3',
    status: 'completed'
  },
  {
    id: 't9',
    date: '2023-11-03T09:30:00Z',
    description: 'Gas Station',
    amount: -45.80,
    type: 'expense',
    category: 'Auto & Transport',
    accountId: 'acc1',
    status: 'completed'
  },
  {
    id: 't10',
    date: '2023-11-01T13:45:00Z',
    description: 'Dividend Payment',
    amount: 32.50,
    type: 'income',
    category: 'Investment',
    accountId: 'acc4',
    status: 'completed'
  }
];

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'b1',
    name: 'Housing',
    allocated: 1200,
    spent: 1150,
    color: '#8B5CF6'
  },
  {
    id: 'b2',
    name: 'Food & Dining',
    allocated: 600,
    spent: 420,
    color: '#EC4899'
  },
  {
    id: 'b3',
    name: 'Transportation',
    allocated: 300,
    spent: 240,
    color: '#10B981'
  },
  {
    id: 'b4',
    name: 'Entertainment',
    allocated: 200,
    spent: 180,
    color: '#F59E0B'
  },
  {
    id: 'b5',
    name: 'Shopping',
    allocated: 300,
    spent: 240,
    color: '#3B82F6'
  },
  {
    id: 'b6',
    name: 'Healthcare',
    allocated: 150,
    spent: 50,
    color: '#EF4444'
  }
];

export const recentActivities = [
  {
    id: 'act1',
    title: 'New payee added',
    description: 'You added "Electric Company" as a new payee',
    time: '2 hours ago'
  },
  {
    id: 'act2',
    title: 'Password changed',
    description: 'Your account password was updated',
    time: '1 day ago'
  },
  {
    id: 'act3',
    title: 'Statement available',
    description: 'Your October statement is ready to view',
    time: '3 days ago'
  }
];

export const upcomingPayments = [
  {
    id: 'up1',
    payee: 'Rent',
    amount: 1200,
    dueDate: '2023-12-01'
  },
  {
    id: 'up2',
    payee: 'Car Insurance',
    amount: 145,
    dueDate: '2023-11-21'
  },
  {
    id: 'up3',
    payee: 'Netflix',
    amount: 15.99,
    dueDate: '2023-11-25'
  }
];
