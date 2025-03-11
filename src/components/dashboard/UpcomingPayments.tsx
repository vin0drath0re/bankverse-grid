
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';

interface Payment {
  id: string;
  payee: string;
  amount: number;
  dueDate: string;
}

interface UpcomingPaymentsProps {
  payments: Payment[];
}

const UpcomingPayments = ({ payments }: UpcomingPaymentsProps) => {
  // Sort payments by due date (earliest first)
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="h-full">
      <h3 className="font-medium mb-4">Upcoming Payments</h3>
      
      <div className="space-y-4">
        {sortedPayments.map((payment) => {
          // Calculate days until payment
          const today = new Date();
          const dueDate = parseISO(payment.dueDate);
          const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          // Determine the status based on days until payment
          let statusColor = 'bg-green-100 text-green-800';
          if (daysUntil <= 3) {
            statusColor = 'bg-red-100 text-red-800';
          } else if (daysUntil <= 7) {
            statusColor = 'bg-amber-100 text-amber-800';
          }
          
          return (
            <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg bg-background">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{payment.payee}</p>
                  <p className="text-sm">${payment.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">
                  {format(parseISO(payment.dueDate), 'MMM dd, yyyy')}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                  {daysUntil === 0 ? 'Today' : 
                   daysUntil === 1 ? 'Tomorrow' : 
                   `${daysUntil} days`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingPayments;
