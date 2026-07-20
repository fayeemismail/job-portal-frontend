import { useRouter } from 'next/navigation';
import { getRedirectPathForRole } from '@/utils/navigation';

export function useRoleRedirect() {
  const router = useRouter();

  const redirectByRole = (role?: string) => {
    const targetPath = getRedirectPathForRole(role);
    router.push(targetPath);
    router.refresh();
  };

  return { redirectByRole };
}
