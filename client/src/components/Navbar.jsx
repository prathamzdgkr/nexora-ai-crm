import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Menu, Bell } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40 transition-colors duration-300 flex items-center justify-between px-6">
      
      {/* Left Side: Sidebar Toggle */}
      <button 
        onClick={toggleSidebar}
        className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
      >
        <Menu size={20} />
      </button>

      {/* Right Side: Profile & Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notification Bell */}
        <button className="p-2.5 text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors">
          <Bell size={20} />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
              {user?.name || 'System Admin'}
            </p>
            
          </div>
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center border border-purple-200 dark:border-purple-800">
            <User size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;