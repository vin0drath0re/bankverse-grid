
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { transactions } from '@/data/mockData';

const Analytics = () => {
  // Calculate monthly spending by category
  const monthlySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = Math.abs(transaction.amount);
      } else {
        acc[category] += Math.abs(transaction.amount);
      }
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(monthlySpending).map(([category, amount]) => ({
    category,
    amount
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your spending patterns</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => 
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(value)
                  }
                />
                <Bar dataKey="amount" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
