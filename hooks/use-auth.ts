import { useAuthStore } from '@/stores/auth-store';
import { useUser } from '@/hooks/use-user';
import { useLogout } from '@/hooks/use-logout';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isHydrating = useAuthStore((state) => state.isHydrating);
  const { isLoading, refetchUser } = useUser();
  const { logoutUser } = useLogout();

  return {
    user,
    isAuthenticated: !!user,
    isHydrating,
    isLoading,
    logout: logoutUser,
    refetchUser,
  };
}
