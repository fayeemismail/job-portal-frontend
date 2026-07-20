import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { LoginPayload } from '@/types/auth';
import { useRoleRedirect } from '@/hooks/use-role-redirect';
import { useAuthStore } from '@/stores/auth-store';

export function useLogin() {
  const [errorMsg, setErrorMsg] = useState('');
  const { redirectByRole } = useRoleRedirect();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (response) => {
      toast.success(response.message || 'Login successful!');

      const user = response.data?.user;
      if (user) {
        useAuthStore.getState().setUser(user);
      }

      // Invalidate user query cache so profile updates immediately
      queryClient.invalidateQueries({ queryKey: ['user'] });

      redirectByRole(user?.role);
    },
    onError: (error: Error) => {
      const apiMessage = error.message || 'Invalid email or password. Please try again.';
      setErrorMsg(apiMessage);
      toast.error(apiMessage);
    },
  });

  return {
    loginUser: mutate,
    isPending,
    errorMsg,
    setErrorMsg,
  };
}
