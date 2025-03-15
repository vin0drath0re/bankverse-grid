
import MainLayout from "@/components/layout/MainLayout";
import { transactions } from "@/data/mockData";

export default function Transactions() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">View your transaction history</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Date</th>
                <th className="py-2 text-left font-medium">Description</th>
                <th className="py-2 text-left font-medium">Amount</th>
                <th className="py-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-2">{transaction.date}</td>
                  <td className="py-2">{transaction.description}</td>
                  <td className={`py-2 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(transaction.amount)}
                  </td>
                  <td className="py-2">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
