
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UpcomingPayments from "@/components/dashboard/UpcomingPayments";
import TransactionsList from "@/components/dashboard/TransactionsList";
import AccountCard from "@/components/dashboard/AccountCard";
import { accounts } from "@/data/mockData";
import MainLayout from "@/components/layout/MainLayout";

export default function Dashboard() {
  const mainAccounts = accounts.filter((acc) => acc.isMain);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your financial overview
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetOverview />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <UpcomingPayments />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
