'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSidebar } from './AuthSidebar';
import { signUpSchema, SignUpFormData } from '@/validators/auth.validator';
import { useRegister } from '@/hooks/use-register';
import { authCookie, workerCookie } from '@/utils/auth-cookie';
import { addWorker, getWorkerByEmail } from '@/utils/worker-profile-store';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser, isPending, errorMsg, setErrorMsg } = useRegister();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '123456',
      role: 'customer',
      agreeTerms: true,
    },
  });

  const role = watch('role');

  const onSubmit = (data: SignUpFormData) => {
    setErrorMsg('');
    registerUser(data);
  };

  const handleSocialLogin = () => {
    // Instant mock authentication for social login demonstration
    authCookie.set(true);
    if (role === 'worker') {
      const defaultEmail = 'social-worker@example.com';
      const existing = getWorkerByEmail(defaultEmail);
      if (!existing) {
        addWorker({
          name: 'Social Worker',
          email: defaultEmail,
          phone: '',
          role: 'Expert',
          rating: 5.0,
          completedJobs: 0,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          skills: [],
          approvalStatus: 'pending',
        });
      }
      localStorage.setItem('vance_logged_in_email', defaultEmail);
      workerCookie.set(true);
      window.location.href = '/worker';
    } else {
      localStorage.setItem('vance_logged_in_email', 'john.doe@example.com');
      window.location.href = '/';
    }
  };

  return (
    <div className="w-full h-full bg-white grid grid-cols-1 md:grid-cols-12 relative animate-in fade-in duration-500 overflow-hidden">
      {/* Left Column: Reusable Value Proposition Sidebar */}
      <AuthSidebar mode="signup" />

      {/* Right Column: Sign Up Form */}
      <div className="col-span-12 md:col-span-7 px-6 py-4 md:px-12 flex flex-col justify-center bg-white h-full overflow-hidden">
        <div className="max-w-sm w-full mx-auto my-auto">
          {/* Header */}
          <div className="text-left mb-5">
            <h1 className="text-xl font-extrabold text-[#0B2545] tracking-tight">Create Account</h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">
              {role === 'customer'
                ? 'Sign up today and schedule your first service in seconds.'
                : 'Join our expert network and start receiving tasks in your area.'}
            </p>
          </div>

          {/* Alert Error Box */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200/40 text-red-600 px-3.5 py-2.5 rounded-xl text-[11px] font-bold mb-4 text-left animate-in fade-in duration-300">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 text-left">
            {/* Minimal Helper Link Onboarding Choice */}
            <div className="bg-gray-50 border border-gray-200/50 rounded-xl p-3 mb-4 text-left">
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                {role === 'customer' ? (
                  <>
                    Looking to earn money as a service provider?{' '}
                    <button
                      type="button"
                      onClick={() => setValue('role', 'worker')}
                      className="text-[#EE5E36] font-extrabold hover:underline cursor-pointer outline-none"
                    >
                      Sign up as an Expert
                    </button>
                  </>
                ) : (
                  <>
                    Looking to book home services?{' '}
                    <button
                      type="button"
                      onClick={() => setValue('role', 'customer')}
                      className="text-[#EE5E36] font-extrabold hover:underline cursor-pointer outline-none"
                    >
                      Sign up as a Customer
                    </button>
                  </>
                )}
              </p>
            </div>

            {/* Full Name Field */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  className={`w-full pl-9 pr-4 py-2 bg-gray-50/50 border ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#EE5E36]'
                  } focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200`}
                />
              </div>
              {errors.name && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">{errors.name.message}</p>
              )}
            </div>

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
                  placeholder="name@domain.com"
                  {...register('email')}
                  className={`w-full pl-9 pr-4 py-2 bg-gray-50/50 border ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#EE5E36]'
                  } focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-3.5 h-3.5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  {...register('password')}
                  className={`w-full pl-9 pr-9 py-2 bg-gray-50/50 border ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#EE5E36]'
                  } focus:bg-white rounded-lg text-xs font-semibold text-[#0B2545] outline-none transition-all duration-200`}
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
              {errors.password && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms and conditions Checkbox */}
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('agreeTerms')}
                  className="w-3.5 h-3.5 border-gray-300 rounded text-[#EE5E36] focus:ring-[#EE5E36] cursor-pointer accent-[#EE5E36] mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-[10px] font-bold text-gray-500 cursor-pointer select-none leading-relaxed"
                >
                  I agree to Ainorax&apos;s{' '}
                  <Link href="#" className="text-[#EE5E36] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-[#EE5E36] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-[10px] text-red-500 font-semibold">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-animate btn-animate-primary w-full py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#EE5E36]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
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

          {/* Signin Link */}
          <p className="text-[11px] font-bold text-gray-500 mt-5 text-center">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="text-[#EE5E36] hover:text-[#0B2545] transition-colors ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
