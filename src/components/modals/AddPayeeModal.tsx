
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AddPayeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPayee: (payee: Omit<Payee, 'id' | 'createdAt'>) => void;
}

const AddPayeeModal = ({ isOpen, onClose, onAddPayee }: AddPayeeModalProps) => {
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIFSCCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !accountNumber || !ifscCode) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddPayee({
      name,
      accountNumber,
      ifscCode,
    });

    setName('');
    setAccountNumber('');
    setIFSCCode('');
    onClose();
    toast.success('Payee added successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Payee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Account Holder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="IFSC Code"
              value={ifscCode}
              onChange={(e) => setIFSCCode(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Payee</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayeeModal;
