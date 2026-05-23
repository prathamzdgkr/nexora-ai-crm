import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BrainCircuit, User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-200">
        
        {/* Left Side - Branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-zinc-900 to-zinc-950 p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <BrainCircuit className="text-purple-400" size={28} />
              </div>
              <span className="text-2xl font-black tracking-tight">Nexora<span className="text-purple-400">AI</span></span>
            </div>
            <h1 className="text-4xl font-bold mb-4 leading-tight">Start closing deals faster today.</h1>
            <p className="text-zinc-400 font-medium leading-relaxed">Create your account to unlock AI-powered lead scoring, smart pipeline management, and automated outreach.</p>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="md:w-7/12 p-8 md:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-black text-zinc-900 mb-2">Create an account</h2>
            <p className="text-zinc-500 font-medium mb-8">Enter your details to get started with NexoraAI.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none font-medium"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none font-medium"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none font-medium"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </div>
              </div>

              {/* TERMS AND CONDITIONS CHECKBOX */}
              <div className="flex items-start gap-3 pt-2 pb-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1 w-4 h-4 text-purple-600 bg-zinc-100 border-zinc-300 rounded focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm font-medium text-zinc-600 cursor-pointer select-none leading-relaxed">
                  I agree to the <span className="text-purple-600 font-bold hover:underline">Terms & Conditions</span> and <span className="text-purple-600 font-bold hover:underline">Privacy Policy</span>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgb(147,51,234,0.39)] hover:-translate-y-0.5 mt-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Create Account <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-zinc-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;