import React from 'react';
import { Users, Target, CheckCircle2, BrainCircuit } from 'lucide-react';

const MetricCards = ({ leads = [] }) => {
  // Data calculations
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;
  
  // Calculate a mock AI Conversion metric (weighted by qualified leads)
  const aiConversion = totalLeads > 0 ? Math.min(Math.round((qualifiedLeads / (totalLeads || 1)) * 100) + 45, 98) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Prospects */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Total Prospects</p>
          <div className="p-2 bg-zinc-100 rounded-lg text-zinc-600"><Users size={20} /></div>
        </div>
        <h3 className="text-3xl font-black text-zinc-900">{totalLeads}</h3>
        <p className="text-xs text-zinc-400 mt-1 font-medium">All time records</p>
      </div>

      {/* Qualified Pipeline */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Qualified</p>
          <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Target size={20} /></div>
        </div>
        <h3 className="text-3xl font-black text-zinc-900">{qualifiedLeads}</h3>
        <p className="text-xs text-orange-500 mt-1 font-bold">Active in pipeline</p>
      </div>

      {/* Closed Deals */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Closed</p>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle2 size={20} /></div>
        </div>
        <h3 className="text-3xl font-black text-zinc-900">{closedLeads}</h3>
        <p className="text-xs text-emerald-600 mt-1 font-bold">Successfully won</p>
      </div>

      {/* AI Conversion Est */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">AI Conv. Est.</p>
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><BrainCircuit size={20} /></div>
        </div>
        <h3 className="text-3xl font-black text-purple-700">{aiConversion}%</h3>
        <p className="text-xs text-purple-400 mt-1 font-bold">Nexora AI Model</p>
      </div>

    </div>
  );
};

export default MetricCards;