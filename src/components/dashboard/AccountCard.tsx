
import { CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Account } from '@/types/bankTypes';

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  // Format the balance with commas and 2 decimal places
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: account.currency,
  }).format(Math.abs(account.balance));

  // Determine if the balance is positive or negative
  const isNegative = account.balance < 0;

  // Icon and color based on account type
  const getAccountTypeStyles = () => {
    switch (account.type) {
      case 'checking':
        return { color: 'text-blue-500' };
      case 'savings':
        return { color: 'text-green-500' };
      case 'credit':
        return { color: 'text-purple-500' };
      case 'investment':
        return { color: 'text-amber-500' };
      default:
        return { color: 'text-gray-500' };
    }
  };

  const { color } = getAccountTypeStyles();

  return (
    <Card className="h-full">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${color} bg-opacity-10 mr-3`}>
              <CreditCard className={`h-5 w-5 ${color}`} />
            </div>
            <div>
              <h3 className="font-medium text-sm">{account.name}</h3>
              <p className="text-xs text-muted-foreground">{account.number}</p>
            </div>
          </div>
          {account.isMain && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Primary
            </span>
          )}
        </div>
        
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
          <p className={`text-xl font-semibold ${isNegative ? 'text-red-500' : 'text-foreground'}`}>
            {isNegative ? '-' : ''}{formattedBalance}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
