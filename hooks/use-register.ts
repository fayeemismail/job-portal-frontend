import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { authCookie, workerCookie } from '@/utils/auth-cookie';
import { authService } from '@/services/auth.service';
import { RegisterPayload } from '@/types/auth';

export function useRegister() {
  const [errorMsg, setErrorMsg] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: (response, variables) => {
      toast.success(response.message || 'Registration successful!');

      // Sync client login state cookies
      authCookie.set(true);

      if (variables.role === 'worker') {
        workerCookie.set(true);
        window.location.href = '/worker';
      } else {
        workerCookie.remove();
        window.location.href = '/';
      }
    },
    onError: (error: Error) => {
      const apiMessage = error.message || 'Registration failed. Please try again.';
      setErrorMsg(apiMessage);
      toast.error(apiMessage);
    },
  });

  return {
    registerUser: mutate,
    isPending,
    errorMsg,
    setErrorMsg,
  };
}
