import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { IMenu, AccountSettings } from '@/types/menu'

export interface MenuData {
  menu: IMenu
  accountSettings?: AccountSettings
}

export type MenuQueryParams = 
  | { type: 'qr'; identifier: string }
  | { type: 'v'; identifier: string }
  | { type: 'preview'; identifier: string }

/**
 * Creates a query key for menu data
 */
export function getMenuQueryKey(params: MenuQueryParams) {
  return ['menu', params.type, params.identifier] as const
}

/**
 * Hook to query menu data with client-side caching
 * 
 * This hook expects the menu data to be pre-populated in the cache
 * from the server-side fetch via useMenuCache.
 * 
 * The full menu (all pages and items) is cached, enabling instant
 * navigation between pages without refetching.
 */
export function useMenuQuery(
  params: MenuQueryParams,
  options?: {
    initialData?: MenuData
    enabled?: boolean
  }
) {
  return useQuery({
    queryKey: getMenuQueryKey(params),
    queryFn: async (): Promise<MenuData> => {
      // This should rarely be called since we pre-populate the cache
      // But we provide a fallback for client-side navigation edge cases
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
      
      const response = await fetch(`${baseUrl}/api/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu')
      }
      
      return response.json()
    },
    initialData: options?.initialData,
    enabled: options?.enabled ?? true,
    // Menu data doesn't change often while browsing
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to access a specific page from cached menu data
 * 
 * Since all pages are fetched together, this provides instant
 * access to any page without additional network requests.
 */
export function useMenuPage(
  params: MenuQueryParams,
  pageId: string | undefined
) {
  const { data, ...rest } = useMenuQuery(params)
  
  const page = data?.menu?.pages?.find(p => p.id === pageId)
  
  return {
    ...rest,
    data: data ? { ...data, currentPage: page } : undefined,
  }
}

/**
 * Hook to prefetch menu data into the cache
 */
export function usePrefetchMenu() {
  const queryClient = useQueryClient()
  
  return (params: MenuQueryParams, menuData: MenuData) => {
    queryClient.setQueryData(getMenuQueryKey(params), menuData)
  }
}

