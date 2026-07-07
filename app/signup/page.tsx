import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <main className="fixed inset-0 z-100 w-screen h-screen font-sans bg-white overflow-hidden select-none">
      <SignUpForm />
    </main>
  );
}
