
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BudgetCategory } from '@/types/bankTypes';

interface BudgetOverviewProps {
  categories: BudgetCategory[];
}

const BudgetOverview = ({ categories }: BudgetOverviewProps) => {
  // Calculate total budget allocated and spent
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  
  // Calculate percentage of total budget spent
  const percentageSpent = Math.round((totalSpent / totalAllocated) * 100);
  
  // Prepare data for pie chart
  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
    allocated: cat.allocated
  }));

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentageOfCategory = Math.round((data.value / data.allocated) * 100);
      
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-xs">
          <p className="font-medium">{data.name}</p>
          <p>Spent: ${data.value}</p>
          <p>Allocated: ${data.allocated}</p>
          <p>Usage: {percentageOfCategory}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Budget Overview</h3>
          <span className="text-xs text-muted-foreground">
            ${totalSpent.toFixed(0)} of ${totalAllocated.toFixed(0)}
          </span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center mt-2">
            <h3 className="text-2xl font-semibold">{percentageSpent}%</h3>
            <p className="text-xs text-muted-foreground">of total budget used</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          {categories.slice(0, 3).map((category) => (
            <div key={category.id} className="text-center">
              <div 
                className="h-2 w-full rounded-full bg-gray-200 overflow-hidden"
                title={`${category.name}: $${category.spent} of $${category.allocated}`}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (category.spent / category.allocated) * 100)}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
              <p className="text-xs mt-1 truncate">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
