import { getSecret } from 'astro:env/server';

export async function trackItemClick(
  itemId: string,
  menuId: string,
  accountId: string
): Promise<void> {
  try {
    const supabaseUrl = getSecret('SUPABASE_URL');
    const supabaseAnonKey = getSecret('SUPABASE_ANON_KEY');
    const trackingUrl = `${supabaseUrl}/functions/v1/trackItemClick`;

    // Fire and forget - don't wait for response
    fetch(trackingUrl, {
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
    }).catch((error) => {
      // Silent fail - don't break the page if tracking fails
      console.error('Item click tracking failed:', error);
    });
  } catch (error) {
    console.error('Item click tracking error:', error);
  }
}

