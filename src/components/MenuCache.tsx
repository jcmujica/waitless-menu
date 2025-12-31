import { useEffect } from 'react'
import { QueryProvider } from '@/providers/QueryProvider'
import { usePrefetchMenu, type MenuQueryParams, type MenuData } from '@/hooks/useMenuQuery'
import type { IMenu, AccountSettings } from '@/types/menu'

interface MenuCacheInnerProps {
  type: 'qr' | 'v' | 'preview'
  identifier: string
  menu: IMenu
  accountSettings?: AccountSettings
}

/**
 * Inner component that handles the actual cache population
 */
function MenuCacheInner({ type, identifier, menu, accountSettings }: MenuCacheInnerProps) {
  const prefetchMenu = usePrefetchMenu()
  
  useEffect(() => {
    // Populate the TanStack Query cache with server-fetched data
    // This enables instant client-side navigation between pages
    const params: MenuQueryParams = { type, identifier }
    const menuData: MenuData = { menu, accountSettings }
    
    prefetchMenu(params, menuData)
  }, [type, identifier, menu, accountSettings, prefetchMenu])
  
  // This component renders nothing - it's purely for cache management
  return null
}

interface MenuCacheProps extends MenuCacheInnerProps {}

/**
 * Client-side component that populates the TanStack Query cache
 * with server-fetched menu data.
 * 
 * This enables instant navigation between menu pages since all
 * data is already available in the client-side cache.
 * 
 * Usage in Astro:
 * ```astro
 * <MenuCache 
 *   client:load
 *   type="qr"
 *   identifier={identifier}
 *   menu={menu}
 *   accountSettings={accountSettings}
 * />
 * ```
 */
export function MenuCache(props: MenuCacheProps) {
  return (
    <QueryProvider>
      <MenuCacheInner {...props} />
    </QueryProvider>
  )
}

export default MenuCache

