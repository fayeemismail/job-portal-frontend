import { useAuthStore } from '@/stores/auth-store';
import { useUser } from '@/hooks/use-user';
import { useLogout } from '@/hooks/use-logout';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const { isLoading, refetchUser } = useUser();
  const { logoutUser } = useLogout();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout: logoutUser,
    refetchUser,
  };
}
