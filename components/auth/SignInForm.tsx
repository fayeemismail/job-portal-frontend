'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSidebar } from './AuthSidebar';
import { loginSchema, LoginFormData } from '@/validators/auth.validator';
import { useLogin } from '@/hooks/use-login';
import { CollapseTransition } from '@/components/ui/CollapseTransition';
import { FormField } from '@/components/ui/FormField';

const DEMO_ACCOUNTS = [
  { email: 'customer@example.com', pass: 'password123', label: '👤 Customer Demo' },
  { email: 'worker@example.com', pass: 'password123', label: '🛠️ Expert Demo' },
  { email: 'admin@example.com', pass: 'admin123', label: '🛡️ Admin Security' },
] as const;

export function SignInForm() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, isPending, errorMsg, setErrorMsg } = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'customer@example.com',
      password: 'password123',
    },
  });

  useEffect(() => {
    const subscription = watch(() => {
      if (errorMsg) setErrorMsg('');
    });
    return () => subscription.unsubscribe();
  }, [watch, errorMsg, setErrorMsg]);

  const onSubmit = (data: LoginFormData) => {
    setErrorMsg('');
    loginUser(data);
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
                setValue('email', acc.email);
                setValue('password', acc.pass);
              }}
              className="text-[10px] font-extrabold text-[#EE5E36] hover:text-[#0B2545] border border-[#EE5E36]/25 hover:border-[#0B2545]/25 px-2 py-1.5 rounded-lg transition-all cursor-pointer select-none mt-0.5 shrink-0 animate-in fade-in duration-200"
            >
              {DEMO_ACCOUNTS[demoIndex].label}
            </button>
          </div>

          {/* Alert Error Box with Smooth CSS Grid Height Transition */}
          <CollapseTransition show={!!errorMsg} marginClass="mb-4">
            <div className="bg-red-50 border border-red-200/40 text-red-600 px-3.5 py-2.5 rounded-xl text-[11px] font-bold text-left">
              {errorMsg}
            </div>
          </CollapseTransition>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 text-left">
            {/* Email Field */}
            <FormField
              label="Email Address"
              type="email"
              placeholder="name@domain.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password Field */}
            <FormField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-[#0B2545] cursor-pointer outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-animate btn-animate-primary w-full py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#EE5E36]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

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
