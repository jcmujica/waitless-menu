/**
 * Item Click Handler
 * Manages menu item clicks, tracking, and modal interactions
 */

interface TrackingData {
  itemId: string;
  menuId: string;
  accountId: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const INITIALIZED_ATTR = 'data-initialized';

/**
 * Track item click in analytics
 */
async function trackItemClick(data: TrackingData): Promise<void> {
  const { itemId, menuId, accountId, supabaseUrl, supabaseAnonKey } = data;

  if (!itemId || !menuId || !accountId || !supabaseUrl || !supabaseAnonKey) {
    console.debug('Tracking data incomplete, skipping analytics');
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/trackItemClick`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        item_id: itemId,
        menu_id: menuId,
        account_id: accountId,
      }),
    });
    
    // Silently skip if item not found (404)
    if (!response.ok && response.status === 404) {
      console.debug(`Item ${itemId} not found, skipping analytics`);
      return;
    }
  } catch (err) {
    console.debug('Tracking failed:', err);
  }
}

/**
 * Open item modal with smooth animation
 */
function openItemModal(itemId: string): void {
  const modal = document.getElementById(`item-modal-${itemId}`);

  if (modal && modal instanceof HTMLDialogElement) {
    // Set initial state for animation
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95) translateY(10px)';

    // Show the modal
    modal.showModal();

    // Force reflow to ensure initial state is applied
    void modal.offsetWidth;

    // Trigger animation by removing inline styles
    setTimeout(() => {
      modal.style.opacity = '';
      modal.style.transform = '';
    }, 10);
  }
}

/**
 * Close modal with smooth animation
 */
function closeModalWithAnimation(modal: HTMLDialogElement): void {
  if (modal.open) {
    // Add closing class for animation
    modal.classList.add('closing');

    // Wait for animation to complete before actually closing
    setTimeout(() => {
      modal.close();
      modal.classList.remove('closing');
    }, 280); // Slightly less than the transition duration
  }
}

/**
 * Handle menu item click
 */
function handleItemClick(item: HTMLElement): void {
  // Get menu item ID (for modal) and tracking item ID (for analytics)
  const menuItemId = item.getAttribute('data-menu-item-id'); // menu_items.id (for modal)
  const trackingItemId = item.getAttribute('data-item-id'); // items.id (for tracking)
  const menuId = item.getAttribute('data-menu-id');
  const accountId = item.getAttribute('data-account-id');
  const supabaseUrl = item.getAttribute('data-supabase-url');
  const supabaseAnonKey = item.getAttribute('data-supabase-anon-key');

  if (!menuItemId) {
    console.warn('Menu item ID not found');
    return;
  }

  // Track click using items table ID (fire and forget)
  if (trackingItemId && menuId && accountId && supabaseUrl && supabaseAnonKey) {
    trackItemClick({ 
      itemId: trackingItemId, 
      menuId, 
      accountId, 
      supabaseUrl, 
      supabaseAnonKey 
    });
  }

  // Open modal using menu_items table ID
  openItemModal(menuItemId);
}

/**
 * Initialize modal close handlers
 */
function initializeModalCloseHandlers(): void {
  const modals = document.querySelectorAll<HTMLDialogElement>('dialog[id^="item-modal-"]');

  modals.forEach((modal) => {
    if (modal.hasAttribute(INITIALIZED_ATTR)) {
      return; // Already initialized
    }

    const closeButton = modal.querySelector<HTMLElement>('.close-modal');

    // Close on button click
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalWithAnimation(modal);
      });
    }

    // Close on backdrop click
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModalWithAnimation(modal);
      }
    });

    // Mark as initialized
    modal.setAttribute(INITIALIZED_ATTR, 'true');
  });
}

/**
 * Initialize click handlers for all menu items
 */
function initializeMenuItemHandlers(): void {
  const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');

  menuItems.forEach((item) => {
    if (item.hasAttribute(INITIALIZED_ATTR)) {
      return; // Already initialized
    }

    item.addEventListener('click', () => handleItemClick(item));
    
    // Mark as initialized
    item.setAttribute(INITIALIZED_ATTR, 'true');
  });
}

/**
 * Initialize all handlers
 */
export function initializeMenuItems(): void {
  initializeMenuItemHandlers();
  initializeModalCloseHandlers();
}

/**
 * Clean up before navigation (remove data attributes)
 */
function cleanup(): void {
  // Remove initialization markers so items can be re-initialized
  document.querySelectorAll(`[${INITIALIZED_ATTR}]`).forEach((el) => {
    el.removeAttribute(INITIALIZED_ATTR);
  });
}

// Auto-initialize on DOM load and navigation
if (typeof window !== 'undefined') {
  // Initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMenuItems);
  } else {
    initializeMenuItems();
  }

  // Clean up before navigation
  document.addEventListener('astro:before-swap', cleanup);

  // Re-initialize after Astro view transitions
  document.addEventListener('astro:after-swap', initializeMenuItems);
  
  // Also handle page show (back/forward navigation)
  document.addEventListener('astro:page-load', initializeMenuItems);
}

