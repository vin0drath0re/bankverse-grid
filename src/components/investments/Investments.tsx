
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { accounts } from '@/data/mockData';
import { ArrowUp, ArrowDown, TrendingUp, Plus, PieChart, BarChart3, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import InvestmentModal from '@/components/modals/InvestmentModal';
import MainLayout from "@/components/layout/MainLayout";

export default function Investments() {
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const investmentAccounts = accounts.filter(account => account.type === 'investment');
  const totalInvestments = investmentAccounts.reduce((sum, account) => sum + account.balance, 0);

  // Mock data for portfolio breakdown
  const portfolioBreakdown = [
    { type: 'Stocks', percentage: 45, amount: totalInvestments * 0.45, change: 2.4 },
    { type: 'Mutual Funds', percentage: 30, amount: totalInvestments * 0.3, change: 1.2 },
    { type: 'ETFs', percentage: 15, amount: totalInvestments * 0.15, change: -0.8 },
    { type: 'Bonds', percentage: 10, amount: totalInvestments * 0.1, change: 0.3 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const handleInvestmentSubmit = (data: any) => {
    toast.success(`${data.amount} invested in ${data.symbol} (${data.investmentType})`);
    setIsInvestmentModalOpen(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Investments</h1>
            <p className="text-muted-foreground">Manage your investment portfolio</p>
          </div>
          <Button onClick={() => setIsInvestmentModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Investment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Portfolio Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalInvestments)}</div>
              <p className="text-xs text-muted-foreground">+4.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Gain/Loss
              </CardTitle>
              <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{formatCurrency(1250.75)}</div>
              <p className="text-xs text-muted-foreground">+1.2% today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                YTD Return
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+8.5%</div>
              <p className="text-xs text-muted-foreground">+{formatCurrency(totalInvestments * 0.085)} this year</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioBreakdown.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{formatPercentage(item.percentage)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-right font-medium">{formatCurrency(item.amount)}</span>
                    <span className={`flex items-center text-xs ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="all" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="stocks" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Stocks
            </TabsTrigger>
            <TabsTrigger value="funds" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Funds
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Investment accounts section */}
          </TabsContent>

          <TabsContent value="stocks" className="space-y-4">
            {/* Stocks section */}
          </TabsContent>

          <TabsContent value="funds" className="space-y-4">
            {/* Funds section */}
          </TabsContent>
        </Tabs>

        <InvestmentModal 
          isOpen={isInvestmentModalOpen}
          onClose={() => setIsInvestmentModalOpen(false)}
          onSubmit={handleInvestmentSubmit}
          accounts={investmentAccounts}
        />
      </div>
    </MainLayout>
  );
}
