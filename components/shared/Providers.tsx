'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { useUser } from '@/hooks/use-user';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  useUser();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Creating the queryClient state ensures it's only created once per user session
  // and stays isolated from other requests on the server-side.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false, // Turn off retries for predictable developer experience
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
