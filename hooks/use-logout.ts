import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (response) => {
      useAuthStore.getState().clearUser();
      toast.success(response.message || 'Logged out successfully');

      // Clear React Query cache & redirect
      queryClient.clear();
      router.push('/signin');
      router.refresh();
    },
    onError: () => {
      useAuthStore.getState().clearUser();
      // Clear React Query cache & redirect on network error
      queryClient.clear();
      router.push('/signin');
    },
  });

  return {
    logoutUser: mutate,
    isPending,
  };
}
