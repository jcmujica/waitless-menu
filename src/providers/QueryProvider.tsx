import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

/**
 * Singleton QueryClient that persists across View Transitions.
 * This enables caching to work correctly when navigating between pages.
 * 
 * Each account/menu has its own cache key, so there's no data mixing:
 * - Account A: ['menu', 'qr', 'account-a-id']
 * - Account B: ['menu', 'qr', 'account-b-id']
 */
let globalQueryClient: QueryClient | null = null

function getQueryClient() {
  // Only create client on the client-side
  if (typeof window === 'undefined') {
    // Server-side: always create a new client
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10 * 60 * 1000,
          gcTime: 30 * 60 * 1000,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          retry: 1,
        },
      },
    })
  }
  
  // Client-side: reuse the same client for persistent cache
  if (!globalQueryClient) {
    globalQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Menu data doesn't change often - keep it cached for 10 minutes
          staleTime: 10 * 60 * 1000,
          // Keep cached data for 30 minutes
          gcTime: 30 * 60 * 1000,
          // Don't refetch on window focus for menu viewing
          refetchOnWindowFocus: false,
          // Do refetch if connection was lost
          refetchOnReconnect: true,
          // Retry failed requests once
          retry: 1,
        },
      },
    })
  }
  
  return globalQueryClient
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

