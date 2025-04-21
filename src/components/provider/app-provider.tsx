'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const AppProvider = ({ children }: Props) => {
  // Create a client
  return (
    <QueryClientProvider client={queryClient}>
      {children} 
    </QueryClientProvider>
  );
};

export default AppProvider;
