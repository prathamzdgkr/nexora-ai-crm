import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  CartesianGrid, PieChart, Pie, AreaChart, Area 
} from 'recharts';
import { Target, BarChart3, Activity, Building2, TrendingUp } from 'lucide-react';

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl shadow-xl transition-colors">
        {label && <p className="text-sm font-bold text-zinc-900 dark:text-white mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              {entry.name}: <span className="font-bold text-zinc-900 dark:text-white">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardCharts = ({ leads = [] }) => {
  // --------------------------------------------------------
  // 1. DATA PROCESSING: Pipeline Funnel
  // --------------------------------------------------------
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const barData = [
    { name: 'New', value: statusCounts['New'] || 0, color: '#A1A1AA' },
    { name: 'Contacted', value: statusCounts['Contacted'] || 0, color: '#F97316' },
    { name: 'Qualified', value: statusCounts['Qualified'] || 0, color: '#8B5CF6' },
    { name: 'Closed', value: statusCounts['Closed'] || 0, color: '#10B981' },
  ];

  // --------------------------------------------------------
  // 2. DATA PROCESSING: Conversion Rate
  // --------------------------------------------------------
  const conversionRate = Math.round(((statusCounts['Closed'] || 0) / (leads.length || 1)) * 100);

  // --------------------------------------------------------
  // 3. DATA PROCESSING: Account Concentration
  // --------------------------------------------------------
  const companyCounts = leads.reduce((acc, lead) => {
    const comp = lead.company?.trim() || 'Independent';
    acc[comp] = (acc[comp] || 0) + 1;
    return acc;
  }, {});

  const sortedCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  let topCompanies = sortedCompanies.slice(0, 5);
  if (sortedCompanies.length > 5) {
    const otherValue = sortedCompanies.slice(5).reduce((sum, item) => sum + item.value, 0);
    topCompanies.push({ name: 'Other', value: otherValue });
  }

  // --------------------------------------------------------
  // 4. DATA PROCESSING: Acquisition Velocity
  // --------------------------------------------------------
  const velocityData = leads.reduce((acc, lead) => {
    const date = lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Unknown';
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const areaData = Object.entries(velocityData).map(([name, value]) => ({ name, value }));

  const PIE_COLORS = ['#8B5CF6', '#F97316', '#10B981', '#3B82F6', '#EC4899', '#71717A'];

  if (!leads || leads.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl transition-colors">
        <Activity className="text-zinc-300 dark:text-zinc-600 mb-3" size={32} />
        <p className="text-zinc-500 dark:text-zinc-400 font-bold">Not enough data to analyze.</p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">Add some prospects to generate analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Row 1: Pipeline & Conversion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-950 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight mb-8 flex items-center gap-2">
            <BarChart3 size={20} className="text-purple-500" /> Pipeline Funnel
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-4">Current distribution of active prospects through your sales stages.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fill: '#71717a', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48}>
                  {barData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Conversion Goal</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-8 text-center">Percentage of total deals won.</p>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" strokeWidth="12" fill="none" />
              <circle cx="96" cy="96" r="88" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray={`${(conversionRate / 100) * 553} 553`} strokeLinecap="round" />
            </svg>
            <p className="absolute text-5xl font-black text-zinc-900 dark:text-white">{conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* Row 2: Concentration & Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-950 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <Building2 size={20} className="text-orange-500" /> Account Concentration
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6">Analyze which organizations hold the majority of your prospects. Focus your outreach on high-density accounts.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={topCompanies} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {topCompanies.map((e, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" /> Acquisition Velocity
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6">Track your lead generation momentum over time to identify growth trends.</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis dataKey="name" tick={{fill: '#71717a', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;