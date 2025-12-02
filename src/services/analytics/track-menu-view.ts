import { getSecret } from 'astro:env/server';

export async function trackMenuView(menuId: string, accountId: string): Promise<void> {
  try {
    const supabaseUrl = getSecret('SUPABASE_URL');
    const trackingUrl = `${supabaseUrl}/functions/v1/trackMenuView`;

    // Fire and forget - don't wait for response
    fetch(trackingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menu_id: menuId,
        account_id: accountId,
      }),
    }).catch((error) => {
      // Silent fail - don't break the page if tracking fails
      console.error('Analytics tracking failed:', error);
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

