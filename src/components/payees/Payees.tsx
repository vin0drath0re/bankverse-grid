
"use client";

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddPayeeModal from '@/components/modals/AddPayeeModal';
import { Card, CardContent } from '@/components/ui/card';
import type { Payee } from '@/types/bankTypes';
import MainLayout from '@/components/layout/MainLayout';

export default function Payees() {
  const [showAddPayeeModal, setShowAddPayeeModal] = useState(false);
  const [payees, setPayees] = useState<Payee[]>([]);

  const handleAddPayee = (newPayee: Omit<Payee, 'id' | 'createdAt'>) => {
    const payee: Payee = {
      ...newPayee,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setPayees([...payees, payee]);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Payees</h1>
            <p className="text-muted-foreground">Manage your registered payees</p>
          </div>
          <Button onClick={() => setShowAddPayeeModal(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Payee
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payees.map((payee) => (
            <Card key={payee.id}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{payee.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Account: {payee.accountNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  IFSC: {payee.ifscCode}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddPayeeModal
          isOpen={showAddPayeeModal}
          onClose={() => setShowAddPayeeModal(false)}
          onAddPayee={handleAddPayee}
        />
      </div>
    </MainLayout>
  );
}
