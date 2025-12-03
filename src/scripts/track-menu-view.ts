/**
 * Client-side menu view tracking
 * This runs in the browser to ensure the user's IP is correctly detected
 */

interface TrackingData {
  menuId: string;
  accountId: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

/**
 * Track menu view in analytics
 */
async function trackMenuView(data: TrackingData): Promise<void> {
  const { menuId, accountId, supabaseUrl, supabaseAnonKey } = data;

  if (!menuId || !accountId || !supabaseUrl || !supabaseAnonKey) {
    console.debug('Tracking data incomplete, skipping analytics');
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/trackMenuView`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        menu_id: menuId,
        account_id: accountId,
      }),
    });

    if (!response.ok) {
      console.debug('Menu view tracking failed:', response.status, response.statusText);
    }
  } catch (err) {
    console.debug('Menu view tracking error:', err);
  }
}

/**
 * Initialize menu view tracking
 * Call this once per page load
 */
export function initializeMenuViewTracking(
  menuId: string,
  accountId: string,
  supabaseUrl: string,
  supabaseAnonKey: string
): void {
  // Only track once per page load
  if (document.documentElement.hasAttribute('data-menu-view-tracked')) {
    return;
  }

  // Mark as tracked
  document.documentElement.setAttribute('data-menu-view-tracked', 'true');

  // Track the view (fire and forget)
  trackMenuView({ menuId, accountId, supabaseUrl, supabaseAnonKey });
}

