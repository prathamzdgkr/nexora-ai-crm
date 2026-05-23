import React from 'react';
import { Building2, Mail, Sparkles, Edit2, Trash2, User } from 'lucide-react';

const LeadTable = ({ leads, onAnalyze, onDelete, onEdit }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-zinc-100 p-16 text-center shadow-sm">
        <div className="bg-zinc-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-100">
          <Building2 className="text-zinc-300" size={40} />
        </div>
        <h3 className="text-xl font-bold text-zinc-900">No active prospects</h3>
        <p className="text-zinc-500 mt-2 max-w-sm mx-auto">Your pipeline is currently empty. Click "Add Prospect" to start tracking and analyzing your leads.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border";
    switch (status) {
      case 'New': return `${base} bg-zinc-50 text-zinc-500 border-zinc-200`;
      case 'Contacted': return `${base} bg-purple-50 text-purple-600 border-purple-100`;
      case 'Qualified': return `${base} bg-orange-50 text-orange-600 border-orange-100`;
      case 'Closed': return `${base} bg-emerald-50 text-emerald-600 border-emerald-100`;
      default: return `${base} bg-zinc-50 text-zinc-500 border-zinc-200`;
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="py-5 px-8 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Prospect</th>
              <th className="py-5 px-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Company</th>
              <th className="py-5 px-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
              <th className="py-5 px-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {leads.map((lead) => (
              <tr key={lead._id} className="group hover:bg-zinc-50/80 transition-colors">
                <td className="py-5 px-8">
                  <div className="flex items-center gap-4">
                    {/* Visual Avatar Placeholder */}
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-400">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm">{lead.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                        <Mail size={12} /> {lead.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-zinc-600">
                    <Building2 size={16} className="text-zinc-300" />
                    {lead.company}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <span className={getStatusBadge(lead.status)}>
                    <span className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Closed' ? 'bg-emerald-500' : lead.status === 'Qualified' ? 'bg-orange-500' : lead.status === 'Contacted' ? 'bg-purple-500' : 'bg-zinc-400'}`}></span>
                    {lead.status}
                  </span>
                </td>
                <td className="py-5 px-6">
                  <div className="flex justify-end items-center gap-1">
                    <button 
                      onClick={() => onAnalyze(lead)}
                      className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      <Sparkles size={14} /> Analyze
                    </button>
                    <button 
                      onClick={() => onEdit(lead)} 
                      className="p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(lead._id)} 
                      className="p-2 text-zinc-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;