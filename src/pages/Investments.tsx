
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { accounts } from '@/data/mockData';
import { TrendingUp, Plus } from 'lucide-react';

const Investments = () => {
  const investmentAccounts = accounts.filter(account => account.type === 'investment');
  const totalInvestments = investmentAccounts.reduce((sum, account) => sum + account.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Manage your investment portfolio</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestments)}</div>
          </CardContent>
        </Card>
      </div>

      {investmentAccounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <CardTitle>{account.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {formatCurrency(account.balance)}
            </div>
            <p className="text-sm text-muted-foreground">
              Account Number: {account.number}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Investments;
