"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Plus, Filter } from 'lucide-react';
import { budgetCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import MainLayout from '@/components/layout/MainLayout';

export default function Budgets() {
  // Calculate totals
  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;
  
  // Format amount as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Prepare data for pie chart
  const pieChartData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color
  }));
  
  // Prepare data for bar chart
  const barChartData = budgetCategories.map(cat => ({
    name: cat.name,
    allocated: cat.allocated,
    spent: cat.spent,
    remaining: cat.allocated - cat.spent
  }));
  
  // Custom tooltip for the charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p>Allocated: {formatCurrency(payload[0].payload.allocated)}</p>
          <p>Spent: {formatCurrency(payload[0].payload.spent)}</p>
          <p>Remaining: {formatCurrency(payload[0].payload.allocated - payload[0].payload.spent)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Budgets</h1>
            <p className="text-muted-foreground">Track your monthly spending by category</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>New Budget</span>
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-normal">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
              <p className="text-xs text-muted-foreground mt-1">For this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-normal">Amount Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((totalSpent / totalAllocated) * 100)}% of total budget
              </p>
              <Progress
                value={(totalSpent / totalAllocated) * 100}
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-normal">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(remainingBudget)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((remainingBudget / totalAllocated) * 100)}% left to spend
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs. Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="allocated" name="Allocated" fill="#8B5CF6" opacity={0.3} />
                      <Bar dataKey="spent" name="Spent" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Budget Categories Table */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map(category => {
                    const percentUsed = Math.round((category.spent / category.allocated) * 100);
                    const isOverBudget = category.spent > category.allocated;
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">
                              {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                            </span>
                            <span className={`ml-2 text-xs ${isOverBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
                              {isOverBudget ? 'Over budget' : `${percentUsed}%`}
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={Math.min(percentUsed, 100)}
                          className="h-2"
                          indicatorClassName={isOverBudget ? 'bg-red-500' : ''}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - pie chart and summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {budgetCategories.map(category => (
                    <div key={category.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(category.spent)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Stay on track</h4>
                  <p className="text-sm text-blue-700">
                    You've spent 70% of your budget with 10 days remaining in the month. Consider reducing discretionary spending.
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-1">Category alert</h4>
                  <p className="text-sm text-amber-700">
                    Your Entertainment category is at 90% of the allocated budget. Be mindful of additional expenses.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Good job!</h4>
                  <p className="text-sm text-green-700">
                    You're under budget in Healthcare by 67%. Consider reallocating some funds to other categories.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
