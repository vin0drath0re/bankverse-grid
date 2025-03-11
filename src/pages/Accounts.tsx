import { CreditCard, PlusCircle, ArrowRightLeft } from 'lucide-react';
import { accounts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import TransferModal from '@/components/modals/TransferModal';
import { toast } from "sonner";

const Accounts = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  
  const handleTransfer = (fromId: string, toId: string, amount: number) => {
    const updatedAccounts = accounts.map(account => {
      if (account.id === fromId) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.id === toId) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    });
    
    accounts.splice(0, accounts.length, ...updatedAccounts);
    
    toast.success('Transfer completed successfully');
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  const checkingAccounts = accounts.filter(account => account.type === 'checking');
  const savingsAccounts = accounts.filter(account => account.type === 'savings');
  const creditAccounts = accounts.filter(account => account.type === 'credit');
  const investmentAccounts = accounts.filter(account => account.type === 'investment');
  
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(balance));
  };
  
  const renderAccountCards = (accountsList: typeof accounts) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountsList.map(account => (
          <Card key={account.id} className="h-auto">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-bank-primary bg-opacity-10 rounded-full mr-3">
                    <CreditCard className="h-5 w-5 text-bank-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-xs text-muted-foreground">{account.number}</p>
                  </div>
                </div>
                {account.isMain && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Primary
                  </span>
                )}
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
                <p className={`text-xl font-semibold ${account.balance < 0 ? 'text-red-500' : 'text-foreground'}`}>
                  {account.balance < 0 ? '-' : ''}{formatBalance(account.balance)}
                </p>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-9">Details</Button>
                <Button size="sm" className="flex-1 h-9">Transfer</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="h-auto border-dashed flex items-center justify-center p-5 bg-muted/50">
          <Button variant="ghost" className="flex-col h-auto py-8 px-4">
            <PlusCircle className="h-10 w-10 mb-2 text-muted-foreground" />
            <p className="font-medium">Add New Account</p>
          </Button>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your bank accounts and cards</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowTransferModal(true)}
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span>Transfer Money</span>
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Account</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBalance(totalBalance)}</div>
            <p className="text-xs text-muted-foreground mt-1">All accounts combined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Checking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(checkingAccounts.reduce((sum, account) => sum + account.balance, 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{checkingAccounts.length} accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(savingsAccounts.reduce((sum, account) => sum + account.balance, 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{savingsAccounts.length} accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBalance(investmentAccounts.reduce((sum, account) => sum + account.balance, 0))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{investmentAccounts.length} accounts</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="checking">Checking</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {renderAccountCards(accounts)}
        </TabsContent>
        
        <TabsContent value="checking" className="space-y-4">
          {renderAccountCards(checkingAccounts)}
        </TabsContent>
        
        <TabsContent value="savings" className="space-y-4">
          {renderAccountCards(savingsAccounts)}
        </TabsContent>
        
        <TabsContent value="credit" className="space-y-4">
          {renderAccountCards(creditAccounts)}
        </TabsContent>
        
        <TabsContent value="investment" className="space-y-4">
          {renderAccountCards(investmentAccounts)}
        </TabsContent>
      </Tabs>
      
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        accounts={accounts}
        onTransfer={handleTransfer}
      />
    </div>
  );
};

export default Accounts;
