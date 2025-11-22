"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity, // Data never becomes stale (since it doesn't change)
            gcTime: 30 * 60 * 1000, // Cache for 30 minutes (was cacheTime in v4)
            retry: 2, // Retry failed requests twice
            refetchOnWindowFocus: false, // Don't refetch when window regains focus
            refetchOnReconnect: false, // Don't refetch on network reconnect
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
