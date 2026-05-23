import React from 'react';
import { Building2, Mail, GripVertical } from 'lucide-react';

const STAGES = ['New', 'Contacted', 'Qualified', 'Closed'];

const PipelineBoard = ({ leads, onStatusChange }) => {
  
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.currentTarget.classList.add('opacity-50'); // Visual cue for moving
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onStatusChange(leadId, newStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8">
      {STAGES.map((stage) => {
        const columnLeads = leads.filter((lead) => lead.status === stage) || [];

        return (
          <div 
            key={stage}
            className="flex flex-col bg-zinc-50 rounded-3xl p-4 border border-zinc-100 min-h-[600px] transition-colors hover:bg-zinc-100/50"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">{stage}</h3>
              <span className="bg-zinc-200/60 text-zinc-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {columnLeads.length}
              </span>
            </div>

            {/* Droppable Area */}
            <div className="flex flex-col gap-4 flex-1">
              {columnLeads.map((lead) => (
                <div 
                  key={lead._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead._id)}
                  onDragEnd={handleDragEnd}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-200 cursor-grab active:cursor-grabbing 
                             hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-zinc-900 group-hover:text-purple-700 transition-colors">
                      {lead.name}
                    </h4>
                    <GripVertical size={16} className="text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <Building2 size={14} className="text-zinc-400" />
                      {lead.company}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                      <Mail size={14} className="text-zinc-400" />
                      {lead.email}
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {columnLeads.length === 0 && (
                <div className="flex-1 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center justify-center p-6 opacity-60">
                  <span className="text-[10px] font-bold text-zinc-400 text-center uppercase tracking-widest">
                    No leads in this stage
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PipelineBoard;