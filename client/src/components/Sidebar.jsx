import React, { useContext } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  BarChart2, 
  Sparkles, 
  Settings, 
  LogOut, 
  BrainCircuit,
  X
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: Kanban },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'ai', label: 'AI Insights', icon: Sparkles },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      
      {/* Brand Logo & Close Button (Mobile Only) */}
      <div className="h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
            <BrainCircuit className="text-white" size={20} />
          </div>
          <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
            Nexora<span className="text-purple-600 dark:text-purple-400">AI</span>
          </span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <p className="px-4 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Platform</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon size={18} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-1">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white'
              : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;