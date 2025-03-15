
import MainLayout from "@/components/layout/MainLayout";
import { accounts } from "@/data/mockData";

export default function Accounts() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your bank accounts</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <div key={account.id} className="bank-card">
              <h3 className="text-lg font-medium">{account.name}</h3>
              <p className="text-2xl font-bold mt-2">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: account.currency
                }).format(account.balance)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Account Number: {account.number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
