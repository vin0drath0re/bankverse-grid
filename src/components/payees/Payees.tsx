
"use client";

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import AddPayeeModal from "@/components/modals/AddPayeeModal";

export default function Payees() {
  const [isAddPayeeModalOpen, setIsAddPayeeModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Payees</h1>
            <p className="text-muted-foreground">Manage your payees for easy transfers</p>
          </div>
          <Button onClick={() => setIsAddPayeeModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payee
          </Button>
        </div>
        
        {/* Your payees list here */}
        
        <AddPayeeModal 
          isOpen={isAddPayeeModalOpen}
          onClose={() => setIsAddPayeeModalOpen(false)}
          onSubmit={(data) => {
            console.log(data);
            setIsAddPayeeModalOpen(false);
          }}
        />
      </div>
    </MainLayout>
  );
}
