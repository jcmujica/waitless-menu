import { supabase } from "../supabase/client"
import type { AccountAccess } from "../../types/menu"

interface AccountData {
  account_status: 'active' | 'inactive' | 'suspended' | null
}

/**
 * Check if an account has access to display its menu
 * 
 * Access logic:
 * - 'inactive' status → No access (account marked inactive after 90 days of inactivity)
 * - 'suspended' status → No access (manually suspended by admin)
 * - 'active' or null (default) → Has access
 * 
 * Note: Subscription/trial status is for limiting admin features, not blocking public menus.
 * Public menus are only blocked when the account is explicitly inactive or suspended.
 */
export async function checkAccountAccess(accountId: string): Promise<AccountAccess> {
  try {
    const supabaseClient = supabase()

    // Fetch account status
    const { data: account, error: accountError } = await supabaseClient
      .from('accounts')
      .select('account_status')
      .eq('id', accountId)
      .single()

    if (accountError) {
      // Check if account doesn't exist (PGRST116 = no rows found)
      if (accountError.code === 'PGRST116' || accountError.message?.includes('0 rows')) {
        return {
          hasAccess: false,
          level: 'inactive',
          message: 'Account not found'
        }
      }
      console.error('Error fetching account:', accountError)
      // For other errors, allow access - don't block menus due to transient errors
      return {
        hasAccess: true,
        level: 'active'
      }
    }

    if (!account) {
      // Account doesn't exist
      return {
        hasAccess: false,
        level: 'inactive',
        message: 'Account not found'
      }
    }

    const accountData = account as AccountData

    // Only block if account is explicitly marked as inactive
    if (accountData.account_status === 'inactive') {
      return {
        hasAccess: false,
        level: 'inactive',
        message: 'This menu is currently unavailable'
      }
    }

    // Block if account is suspended
    if (accountData.account_status === 'suspended') {
      return {
        hasAccess: false,
        level: 'suspended',
        message: 'This menu is temporarily unavailable'
      }
    }

    // Account is 'active' or null (default) - allow access
    return {
      hasAccess: true,
      level: 'active'
    }

  } catch (error) {
    console.error('Error checking account access:', error)
    // On error, allow access - don't block menus due to transient errors
    return {
      hasAccess: true,
      level: 'active'
    }
  }
}

