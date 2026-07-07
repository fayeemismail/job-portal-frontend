import { SignInForm } from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <main className="fixed inset-0 z-100 w-screen h-screen font-sans bg-white overflow-hidden select-none">
      <SignInForm />
    </main>
  );
}
