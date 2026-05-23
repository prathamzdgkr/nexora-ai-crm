import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LeadTable from '../components/LeadTable';
import MetricCards from '../components/MetricCards';
import DashboardCharts from '../components/DashboardCharts';
import AddLeadModal from '../components/AddLeadModal';
import PipelineBoard from '../components/PipelineBoard';
import AIInsights from '../components/AIInsights';
import { 
  Plus, Loader2, Search, Settings, Moon, Sun, Monitor, LayoutList, Globe 
} from 'lucide-react';
import API from '../api/axios';
import { useTheme } from '../context/ThemeContext'; // <--- THIS IS REQUIRED FOR THE TOGGLE TO WORK

const Dashboard = () => {
  // GLOBAL THEME CONTEXT
  const { theme, setTheme } = useTheme(); 

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // AI Modal
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [selectedLeadName, setSelectedLeadName] = useState('');

  // Edit State
  const [editingLead, setEditingLead] = useState(null);

  // Local UI Settings
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const leadsRes = await API.get('/leads');
        setLeads(leadsRes.data);
      } catch (error) { 
        console.error("Error fetching leads:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchLeads();
  }, []);

  // --- CRUD Handlers ---
  const handleAddLead = async (newLead) => {
    try {
      const { data } = await API.post('/leads', newLead);
      setLeads([data, ...leads]);
      setIsModalOpen(false);
    } catch (error) { console.error("Error creating lead:", error); }
  };

  const handleUpdateLead = async (leadId, updatedData) => {
    try {
      const { data } = await API.put(`/leads/${leadId}`, updatedData);
      setLeads(leads.map(l => l._id === leadId ? data : l));
      setEditingLead(null);
      setIsModalOpen(false);
    } catch (error) { console.error("Error updating lead:", error); }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Delete this prospect?")) return;
    try {
      await API.delete(`/leads/${leadId}`);
      setLeads(leads.filter(l => l._id !== leadId));
    } catch (error) { console.error("Error deleting lead:", error); }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    const originalLeads = [...leads];
    setLeads(currentLeads => currentLeads.map(lead => lead._id === leadId ? { ...lead, status: newStatus } : lead));
    try { await API.put(`/leads/${leadId}`, { status: newStatus }); } 
    catch (error) { setLeads(originalLeads); }
  };

  const handleAnalyzeLead = async (lead) => {
    setAiModalOpen(true);
    setAiLoading(true);
    setSelectedLeadName(lead.name);
    try { 
      const { data } = await API.post(`/ai/${lead._id}`); 
      setAiData(data); 
    } catch (error) { 
      setAiData(null); 
    } finally { 
      setAiLoading(false); 
    }
  };

  const filteredLeads = leads.filter(lead => {
    const searchMatch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'All' || lead.status === statusFilter;
    return searchMatch && statusMatch;
  });

  if (loading) return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
      <Loader2 className="animate-spin text-purple-600" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-black text-zinc-900 dark:text-white capitalize transition-colors">
                  {activeTab}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium">Manage your {activeTab} workspace.</p>
              </div>
              {['leads', 'pipeline'].includes(activeTab) && (
                <button 
                  onClick={() => { setEditingLead(null); setIsModalOpen(true); }} 
                  className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Plus size={20} className="inline mr-2" /> Add Prospect
                </button>
              )}
            </div>

            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <MetricCards leads={leads} />
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
                  <DashboardCharts leads={leads} />
                </div>
              </div>
            )}

{(activeTab === 'leads' || activeTab === 'pipeline') && (
              <div className="space-y-6 animate-in fade-in duration-500">
                
                {/* Search & Filter Toolbar */}
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row gap-3 transition-colors">
                  
                  {/* Search Input */}
                  <div className="relative flex-1 group">
                    <Search 
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-purple-500 transition-colors duration-300" 
                      size={18} 
                      strokeWidth={2.5}
                    />
                    <input 
                      type="text" 
                      placeholder="Search prospects..." 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      className="w-full pl-12 pr-5 py-3.5 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 rounded-[1.5rem] outline-none text-zinc-900 dark:text-white font-bold placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border-2 border-transparent focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 shadow-inner cursor-text"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="relative group min-w-[200px]">
                    <select 
                      onChange={(e) => setStatusFilter(e.target.value)} 
                      className="w-full appearance-none bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 px-6 py-3.5 rounded-[1.5rem] font-black text-zinc-700 dark:text-zinc-200 border-2 border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none cursor-pointer transition-all duration-300 shadow-inner"
                    >
                      <option value="All">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Closed">Closed</option>
                    </select>
                    {/* Custom Dropdown Arrow */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-500 group-hover:text-purple-500 transition-colors duration-300">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.5L6 6L10.5 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* --- NEW: Drag & Drop Hint (Only visible in Pipeline View) --- */}
                {activeTab === 'pipeline' && (
                  <div className="flex items-center gap-2.5 px-4 text-sm font-bold text-zinc-500 dark:text-zinc-400 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-500/20 rounded-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                        <circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
                      </svg>
                    </div>
                    Drag and drop prospect cards across columns to update their status instantly.
                  </div>
                )}

                {/* Main Content Area */}
                <div className="transition-all duration-300">
                  {activeTab === 'leads' ? 
                    <LeadTable leads={filteredLeads} onAnalyze={handleAnalyzeLead} onDelete={handleDeleteLead} onEdit={setEditingLead} /> 
                    : <PipelineBoard leads={filteredLeads} onStatusChange={handleStatusChange} />
                  }
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 transition-colors">
                <DashboardCharts leads={leads} />
              </div>
            )}
            {/* AI Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-zinc-900 to-purple-950 dark:from-zinc-900 dark:to-purple-950 rounded-[2rem] p-8 text-white">
                  <h2 className="text-3xl font-black mb-2">Nexora Intelligence</h2>
                  <p className="text-zinc-300">Select a prospect to generate actionable AI strategies.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leads.map(lead => (
                    <div key={lead._id} className="bg-white dark:bg-zinc-900 p-6 rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 flex flex-col transition-colors">
                      <h4 className="font-black text-lg text-zinc-900 dark:text-white">{lead.name}</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{lead.company}</p>
                      <button onClick={() => handleAnalyzeLead(lead)} className="w-full mt-auto py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-bold rounded-xl hover:bg-purple-600 hover:text-white transition-all">Generate Strategy</button>
                    </div>
                  ))}
                </div>
              </div>
            )}            

            {/* App Preferences Settings Tab */}
            {activeTab === 'settings' && (
              <div className="max-w-4xl space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">App Preferences</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium mt-1">Customize your CRM workspace experience.</p>
                </div>

                {/* Appearance Settings */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <Monitor size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white">Appearance</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme('system')}
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}
                    >
                      <Monitor size={24} />
                      <span className="font-bold text-sm">System Default</span>
                    </button>
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}
                    >
                      <Sun size={24} />
                      <span className="font-bold text-sm">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400'}`}
                    >
                      <Moon size={24} />
                      <span className="font-bold text-sm">Dark Mode</span>
                    </button>
                  </div>
                </div>

                {/* Workspace Settings */}
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                      <LayoutList size={20} className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white">Workspace</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">Compact Table View</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Reduce spacing in the leads table to see more rows.</p>
                      </div>
                      <button 
                        onClick={() => setCompactView(!compactView)} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${compactView ? 'bg-purple-600' : 'bg-zinc-300 dark:bg-zinc-600'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${compactView ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">Timezone</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Used for AI insights and scheduling.</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-bold text-zinc-600 dark:text-zinc-300 shadow-sm">
                        <Globe size={14} className="text-zinc-400" /> UTC (Auto)
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>
      </div>

      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingLead(null); }} 
        onAdd={handleAddLead} 
        onUpdate={handleUpdateLead}
        editData={editingLead}
      />
      <AIInsights isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} loading={aiLoading} data={aiData} leadName={selectedLeadName} />
    </div>
  );
};

export default Dashboard;