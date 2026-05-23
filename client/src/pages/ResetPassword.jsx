import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Grabs the token from the URL (e.g., /reset-password/12345abcd)
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      // Put request matching the backend route
      const { data } = await API.put(`/auth/resetpassword/${token}`, { password });
      setMessage(data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-black text-center mb-6">Create New Password</h2>
        
        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl">{message} Redirecting...</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            placeholder="New Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-zinc-50 rounded-xl border border-zinc-200" 
          />
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-zinc-50 rounded-xl border border-zinc-200" 
          />
          <button type="submit" className="w-full bg-zinc-900 text-white font-bold py-3 rounded-xl">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;