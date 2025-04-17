'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// This component must be a Client Component
import { ReactNode } from 'react';

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Create a query client instance that lives through the component lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
