
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { Account } from '@/types/bankTypes';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onTransfer: (fromId: string, toId: string, amount: number) => void;
}

const TransferModal = ({ isOpen, onClose, accounts, onTransfer }: TransferModalProps) => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = () => {
    const parsedAmount = parseFloat(amount);
    if (!fromAccount || !toAccount) {
      toast.error('Please select both accounts');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const sourceAccount = accounts.find(acc => acc.id === fromAccount);
    if (sourceAccount && sourceAccount.balance < parsedAmount) {
      toast.error('Insufficient funds');
      return;
    }

    onTransfer(fromAccount, toAccount, parsedAmount);
    setFromAccount('');
    setToAccount('');
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>From Account</label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label>To Account</label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem 
                    key={account.id} 
                    value={account.id}
                    disabled={account.id === fromAccount}
                  >
                    {account.name} ({account.number})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleTransfer}>Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;
