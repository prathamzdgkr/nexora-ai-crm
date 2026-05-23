import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddLeadModal = ({ isOpen, onClose, onAdd, onUpdate, editData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    status: 'New'
  });

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        email: editData.email || '',
        company: editData.company || '',
        status: editData.status || 'New'
      });
    } else {
      // Reset form if just adding
      setFormData({ name: '', email: '', company: '', status: 'New' });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
  e.preventDefault();
  
  if (editData) {
    // Ensure you are passing the ID AND the form data
    onUpdate(editData._id, formData);
  } else {
    onAdd(formData);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">
              {editData ? 'Edit Prospect' : 'Add New Prospect'}
            </h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">
              {editData ? 'Update Lead Profile' : 'Initialize Lead Profile'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Name"
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-zinc-400"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="Email"
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-zinc-400"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">Company</label>
            <input 
              type="text" 
              required
              placeholder="Company Name"
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-zinc-400"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-100">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-bold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgb(249,115,22,0.25)]"
            >
              {editData ? 'Update Prospect' : 'Save Prospect'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddLeadModal;