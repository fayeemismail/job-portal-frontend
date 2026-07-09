'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authCookie, adminCookie, workerCookie } from '@/utils/auth-cookie';
import { AuthSidebar } from './AuthSidebar';

const DEMO_ACCOUNTS = [
  { email: 'john.doe@example.com', pass: 'password123', label: 'Customer Demo', role: 'customer' },
  { email: 'admin@example.com', pass: 'admin123', label: 'Admin Demo', role: 'admin' },
  { email: 'worker@example.com', pass: 'worker123', label: 'Worker (Active) Demo', role: 'worker' },
  {
    email: 'david.foster@example.com',
    pass: 'worker123',
    label: 'Worker (Pending) Demo',
    role: 'worker',
  },
] as const;

export function SignInForm() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    // Instant authentication redirect
    authCookie.set(true);
    localStorage.setItem('vance_logged_in_email', email);

    if (email === 'admin@example.com') {
      adminCookie.set(true);
      workerCookie.remove();
      window.location.href = '/admin';
    } else if (email === 'worker@example.com' || email === 'david.foster@example.com') {
      adminCookie.remove();
      workerCookie.set(true);
      window.location.href = '/worker';
    } else {
      adminCookie.remove();
      workerCookie.remove();
      window.location.href = '/';
    }
  };

  const handleSocialLogin = () => {
    authCookie.set(true);
    localStorage.setItem('vance_logged_in_email', 'john.doe@example.com');
    window.location.href = '/';
  };

  return (
    <div className="w-full h-full bg-white grid grid-cols-1 md:grid-cols-12 relative animate-in fade-in duration-500 overflow-hidden">
      {/* Left Column: Reusable Value Proposition Sidebar */}
      <AuthSidebar mode="signin" />

      {/* Right Column: Sign In Form */}
      <div className="col-span-12 md:col-span-7 px-6 py-4 md:px-12 flex flex-col justify-center bg-white h-full overflow-hidden">
        <div className="max-w-sm w-full mx-auto my-auto">
          {/* Header */}
          <div className="text-left mb-5 flex justify-between items-start gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-[#0B2545] tracking-tight">Sign In</h1>
              <p className="text-xs font-semibold text-gray-400 mt-1">
                Enter your credentials to manage your home services.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextIdx = (demoIndex + 1) % DEMO_ACCOUNTS.length;
                setDemoIndex(nextIdx);
                const acc = DEMO_ACCOUNTS[nextIdx];
                setEmail(acc.email);
                setPassword(acc.pass);
              }}
              className="text-[10px] font-extrabold text-[#EE5E36] hover:text-[#0B2545] border border-[#EE5E36]/25 hover:border-[#0B2545]/25 px-2 py-1.5 rounded-lg transition-all cursor-pointer select-none mt-0.5 shrink-0 animate-in fade-in duration-200"
            >
              {DEMO_ACCOUNTS[demoIndex].label}
            </button>
          </div>

          {/* Alert Error Box */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200/40 text-red-600 px-3.5 py-2.5 rounded-xl text-[11px] font-bold mb-4 text-left animate-in fade-in duration-300">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-3.5 text-left">
            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-bold text-[#EE5E36] hover:text-[#0B2545] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-3.5 h-3.5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-9 pr-9 py-2 bg-gray-50/50 border border-gray-200 focus:border-[#EE5E36] focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0B2545] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 border-gray-300 rounded text-[#EE5E36] focus:ring-[#EE5E36] cursor-pointer accent-[#EE5E36]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-[11px] font-bold text-gray-500 cursor-pointer select-none"
              >
                Keep me logged in
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-animate btn-animate-primary w-full py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#EE5E36]/10"
            >
              Sign In
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <span className="relative bg-white px-3 text-[9px] font-extrabold uppercase tracking-wider text-gray-400">
              Or Connect With
            </span>
          </div>

          {/* Google Button */}
          <button
            onClick={handleSocialLogin}
            className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-extrabold uppercase tracking-wider text-gray-600 flex items-center justify-center transition-colors duration-250 cursor-pointer shadow-3xs"
          >
            <svg className="w-3.5 h-3.5 mr-2 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 15.02 1 12 1 7.24 1 3.2 3.73 1.24 7.74l3.84 2.98C6.01 7.2 8.79 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"
              />
              <path
                fill="#FBBC05"
                d="M5.08 14.78c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.24 7.4C.45 9 .01 10.79.01 12.7c0 1.91.44 3.7 1.23 5.3l3.84-3.22z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.11.75-2.53 1.19-4.23 1.19-3.21 0-5.99-2.16-6.92-5.68L1.24 16.6C3.2 20.61 7.24 23 12 23z"
              />
            </svg>
            Google Account
          </button>

          {/* Signup Link */}
          <p className="text-[11px] font-bold text-gray-500 mt-5 text-center">
            New to Ainorax?{' '}
            <Link
              href="/signup"
              className="text-[#EE5E36] hover:text-[#0B2545] transition-colors ml-1"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
