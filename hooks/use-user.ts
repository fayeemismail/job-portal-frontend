import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { User } from '@/types/auth';
import { useAuthStore } from '@/stores/auth-store';

export function useUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await authService.getMe();
        const user = response.data.user;
        setUser(user);
        return user;
      } catch (err) {
        clearUser();
        throw err;
      }
    },
    enabled: typeof window !== 'undefined',
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: false,
  });

  return {
    user: (data as User | undefined) || null,
    isLoading,
    isError,
    error,
    refetchUser: refetch,
  };
}
