import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Terminal, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import '../styles/admin.css';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // If already authenticated, redirect to dashboard
  if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (attempts >= 3) return; // Rate limited

    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      const validEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@aadhi.dev';
      const validPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
      if (email === validEmail && password === validPassword) {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        // Custom event to trigger toast in App context if they are connected, but for isolated admin, standard navigate is fine
        // A simple console log or alert as fallback if no toast system is available in isolated scope
        navigate('/admin/dashboard', { replace: true });
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setShake(true);
        setTimeout(() => setShake(false), 500); // Remove shake class after animation
        
        if (newAttempts >= 3) {
          setError('Too many attempts. Wait 30s.');
          // Simple reset after 30s for mock purposes
          setTimeout(() => {
            setAttempts(0);
            setError('');
          }, 30000);
        } else {
          setError('AUTHENTICATION_FAILED. Invalid credentials.');
        }
      }
    }, 1000);
  };

  return (
    <div className="admin-theme min-h-screen flex bg-[#09090b] dark dark-admin selection:bg-blue-500/30">
      
      {/* Left Panel - Branding (60%) */}
      <div className="hidden lg:flex lg:w-[60%] flex-col justify-between relative overflow-hidden bg-black p-12 border-r border-[#27272a]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Particles (CSS based for simplicity in mock) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[2px] top-1/4 left-1/4 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute w-2 h-2 bg-purple-500 rounded-full blur-[2px] top-3/4 left-1/2 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute w-2 h-2 bg-cyan-500 rounded-full blur-[2px] top-1/2 left-3/4 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            <Terminal className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold tracking-widest" style={{ fontFamily: '"Orbitron", sans-serif' }}>
              AADHI.SYS
            </h1>
          </div>
          <p className="mt-4 text-gray-400 font-mono text-sm tracking-wider uppercase">
            Portfolio Management System v1.0.0
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-4 font-mono text-xs font-semibold tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500">DATABASE: CONNECTED</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500">API: ONLINE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500">SERVICES: RUNNING</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Card (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative">
        <div className={twMerge(
          clsx(
            "w-full max-w-md admin-glass p-8 rounded-2xl shadow-2xl relative overflow-hidden",
            shake && "animate-[shake_0.5s_cubic-bezier(.36,.07,.19,.97)_both]"
          )
        )}>
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight">ADMIN_ACCESS</h2>
            <p className="mt-2 text-sm text-gray-400">Authenticate to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-mono leading-tight">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={attempts >= 3 || isLoading}
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#27272a] rounded-lg bg-[#18181b]/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="admin@aadhi.dev"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={attempts >= 3 || isLoading}
                  className="block w-full pl-10 pr-10 py-2.5 border border-[#27272a] rounded-lg bg-[#18181b]/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#27272a] bg-[#18181b] text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-400 cursor-pointer">
                  Remember this device
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={attempts >= 3 || isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-mono font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  [ AUTHENTICATE ] <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      {/* Inline styles for the shake animation since it's just for this component */}
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
}
