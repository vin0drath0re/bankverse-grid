
import { useState } from 'react';
import { BarChart3, ArrowRightLeft, CreditCard, PlusCircle } from 'lucide-react';
import { 
  accounts, 
  transactions, 
  budgetCategories, 
  recentActivities, 
  upcomingPayments 
} from '@/data/mockData';
import AccountCard from '@/components/dashboard/AccountCard';
import TransactionsList from '@/components/dashboard/TransactionsList';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import UpcomingPayments from '@/components/dashboard/UpcomingPayments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Format the balance
  const formattedTotalBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalBalance);
  
  // Recent transactions
  const recentTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your finances.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            <span>Transfer</span>
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Account</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedTotalBalance}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all accounts</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">This Month</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold text-green-600">+$3,240.50</div>
                  <p className="text-xs text-muted-foreground mt-1">Income</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">-$1,120.34</div>
                  <p className="text-xs text-muted-foreground mt-1">Expenses</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-normal">Net Worth</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className="flex-1">
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-green-600 mt-1">↑ 12.5% from last month</p>
                </div>
                <div className="w-16 h-16">
                  <BarChart3 className="w-full h-full text-bank-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - accounts and transactions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Accounts Section */}
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Your Accounts</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1 text-sm">
                    <CreditCard className="h-4 w-4" />
                    <span>All Accounts</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {accounts.slice(0, 4).map((account) => (
                      <AccountCard key={account.id} account={account} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Transactions */}
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1 text-sm">
                    <ArrowRightLeft className="h-4 w-4" />
                    <span>View All</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <TransactionsList transactions={recentTransactions} />
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - budgets and activity */}
            <div className="space-y-6">
              {/* Budget Overview */}
              <Card>
                <CardContent className="pt-6">
                  <BudgetOverview categories={budgetCategories} />
                </CardContent>
              </Card>
              
              {/* Upcoming Payments */}
              <Card>
                <CardContent className="pt-6">
                  <UpcomingPayments payments={upcomingPayments} />
                </CardContent>
              </Card>
              
              {/* Activity Feed */}
              <Card>
                <CardContent className="pt-6">
                  <ActivityFeed activities={recentActivities} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accounts">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Your Accounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
              <TransactionsList transactions={transactions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
