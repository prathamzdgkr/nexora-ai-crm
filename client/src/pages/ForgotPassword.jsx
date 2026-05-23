import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/forgotpassword', { email });
      setMessage(data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending email');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-zinc-200">
        <h2 className="text-2xl font-black text-center mb-6">Forgot Password</h2>
        
        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-zinc-50 rounded-xl border border-zinc-200" 
          />
          <button type="submit" className="w-full bg-zinc-900 text-white font-bold py-3 rounded-xl">
            Send Reset Link
          </button>
        </form>
        <Link to="/login" className="block text-center mt-4 text-sm font-bold text-zinc-500 hover:text-zinc-900">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;