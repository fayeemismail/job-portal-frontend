import { NotFoundContent } from '@/components/shared/NotFoundContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Ainorax',
  description: 'The page you are looking for does not exist.',
};

export default function NotFoundPage() {
  return <NotFoundContent />;
}
