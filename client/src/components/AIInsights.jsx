import React, { useState } from 'react';
import { X, Sparkles, Target, Zap, Copy, CheckCircle2, Lightbulb, Mail } from 'lucide-react';

const AIInsights = ({ isOpen, onClose, loading, data, leadName }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (data?.followUpMessage) {
      navigator.clipboard.writeText(data.followUpMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl border border-zinc-100 overflow-hidden relative max-h-[90vh] flex flex-col transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Glassmorphism Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl border border-purple-100/50 shadow-sm">
              <Sparkles size={24} className="text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 tracking-tight">
                  Nexora Intelligence
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider border border-purple-100">
                  AI Generated
                </span>
              </div>
              <p className="text-sm text-zinc-500 font-medium mt-0.5">
                Analyzing pipeline data for <span className="text-zinc-900 font-bold">{leadName}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-2xl transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto min-h-[400px] flex flex-col bg-zinc-50/30">
          {loading ? (
            /* Premium Loading State */
            <div className="flex flex-col items-center justify-center flex-1 space-y-6 py-12">
              <div className="relative flex justify-center items-center w-24 h-24">
                <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping duration-1000"></div>
                <div className="absolute inset-2 bg-purple-400/20 rounded-full animate-pulse"></div>
                <div className="relative bg-white shadow-xl p-4 rounded-2xl border border-purple-100">
                  <Sparkles size={32} className="text-purple-600 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-lg font-black text-zinc-900">Synthesizing strategy...</h4>
                <p className="text-sm text-zinc-500 font-medium max-w-xs mx-auto">
                  Cross-referencing {leadName}'s company profile with historical win patterns.
                </p>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-4">
              
              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                
                {/* Lead Score Card */}
                <div className="bg-gradient-to-br from-white to-zinc-50 p-6 rounded-[1.5rem] border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Target size={64} />
                  </div>
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <Target size={16} className="text-purple-500" /> Quality Score
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-5xl font-black text-zinc-900 tracking-tight">
                      {data.leadScore}
                    </p>
                    <span className="text-lg text-zinc-400 font-bold">/100</span>
                  </div>
                </div>

                {/* Win Probability Card */}
                <div className="bg-gradient-to-br from-orange-50/50 to-white p-6 rounded-[1.5rem] border border-orange-100/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap size={64} />
                  </div>
                  <p className="text-xs font-black text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                    <Zap size={16} className="text-orange-500" /> Win Probability
                  </p>
                  <p className="text-5xl font-black text-orange-600 tracking-tight">
                    {data.probability}
                  </p>
                </div>

              </div>

              {/* Action Plan */}
              <div className="bg-zinc-900 rounded-[1.5rem] p-6 md:p-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h4 className="text-sm font-black text-zinc-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-purple-400" /> Recommended Strategy
                </h4>
                <p className="text-white text-base md:text-lg leading-relaxed font-medium relative z-10">
                  {data.suggestedAction}
                </p>
              </div>

              {/* Email Draft */}
              <div className="bg-white rounded-[1.5rem] border border-zinc-200 shadow-sm overflow-hidden">
                <div className="bg-zinc-50/50 border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                  <h4 className="text-sm font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={16} className="text-zinc-400" /> AI Outreach Draft
                  </h4>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 ${
                      copied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-white border border-zinc-200 text-zinc-600 hover:border-purple-200 hover:text-purple-600 shadow-sm'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                    {copied ? "COPIED TO CLIPBOARD" : "COPY DRAFT"}
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-base text-zinc-600 whitespace-pre-wrap leading-relaxed">
                    {data.followUpMessage}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-400 font-medium">
              Failed to load AI insights. Please close and try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;