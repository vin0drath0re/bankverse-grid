
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight,
  Coffee,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Tv,
  Briefcase
} from 'lucide-react';
import { format } from 'date-fns';
import { Transaction } from '@/types/bankTypes';

interface TransactionsListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionsList = ({ transactions, limit }: TransactionsListProps) => {
  // Display only the number of transactions specified by the limit (or all if no limit)
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  // Function to determine icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food & dining':
        return <Utensils className="h-4 w-4" />;
      case 'shopping':
        return <ShoppingCart className="h-4 w-4" />;
      case 'bills & utilities':
        return <Home className="h-4 w-4" />;
      case 'auto & transport':
        return <Car className="h-4 w-4" />;
      case 'entertainment':
        return <Tv className="h-4 w-4" />;
      case 'income':
        return <Briefcase className="h-4 w-4" />;
      case 'transfer':
        return <ArrowLeftRight className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  // Function to get background color for the icon based on transaction type
  const getIconBackground = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'bg-green-100';
      case 'expense':
        return 'bg-red-100';
      case 'transfer':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Function to get text color for the amount based on transaction type
  const getAmountColor = (type: Transaction['type']) => {
    switch (type) {
      case 'income':
        return 'text-green-600';
      case 'expense':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  // Function to format the amount with currency symbol
  const formatAmount = (amount: number, type: Transaction['type']) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));

    return `${type === 'income' ? '+' : type === 'expense' ? '-' : ''}${formatted}`;
  };

  return (
    <div className="w-full">
      <div className="divide-y">
        {displayedTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${getIconBackground(transaction.type)} mr-3`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')} · {transaction.category}
                </p>
              </div>
            </div>
            <span className={`font-medium ${getAmountColor(transaction.type)}`}>
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
