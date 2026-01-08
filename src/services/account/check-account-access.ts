import { supabase } from "../supabase/client"
import type { AccountAccess } from "../../types/menu"

interface AccountData {
  account_status: 'active' | 'inactive' | 'suspended' | null
  is_demo_account: boolean | null
  trial_ends_at: string | null
  grace_period_ends_at: string | null
}

interface SubscriptionData {
  id: string
  status: string
  current_period_end: string | null
}

/**
 * Check if an account has access to display its menu
 * 
 * Access logic (in priority order):
 * 1. Demo accounts → Always have access
 * 2. 'inactive' status → No access (account marked inactive after 90 days of inactivity)
 * 3. 'suspended' status → No access (manually suspended by admin)
 * 4. Active subscription → Has access
 * 5. Trial period active → Has access
 * 6. Grace period active → Has access
 * 7. Expired (no subscription, no trial, no grace) → No access
 * 
 * When an account doesn't have dashboard access (expired subscription), the menu should also be unavailable.
 */
export async function checkAccountAccess(accountId: string): Promise<AccountAccess> {
  try {
    const supabaseClient = supabase()
    const currentDate = new Date()

    // Fetch account data including subscription-related fields
    const { data: account, error: accountError } = await supabaseClient
      .from('accounts')
      .select('account_status, is_demo_account, trial_ends_at, grace_period_ends_at')
      .eq('id', accountId)
      .maybeSingle()

    if (accountError) {
      console.error('Error fetching account:', accountError)
      // For any query errors, allow access - don't block menus due to transient errors
      // This prevents RLS or other issues from blocking valid accounts
      return {
        hasAccess: true,
        level: 'active'
      }
    }

    if (!account) {
      // Account doesn't exist - only return error if we're certain
      // Use maybeSingle so this only happens if truly no rows
      return {
        hasAccess: false,
        level: 'not_found',
        message: 'Account not found'
      }
    }

    const accountData = account as AccountData

    // Demo accounts always have access
    if (accountData.is_demo_account) {
      return {
        hasAccess: true,
        level: 'active'
      }
    }

    // Block if account is explicitly marked as inactive
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

    // Check for active subscription
    const { data: subscriptions, error: subError } = await supabaseClient
      .from('subscriptions')
      .select('id, status, current_period_end')
      .eq('account_id', accountId)
      .in('status', ['active', 'trialing'])

    // If we can't fetch subscriptions, allow access (don't block due to transient errors)
    if (subError) {
      console.error('Error fetching subscriptions:', subError)
      return {
        hasAccess: true,
        level: 'active'
      }
    }

    // If there's an active subscription, allow access
    if (subscriptions && subscriptions.length > 0) {
    return {
      hasAccess: true,
      level: 'active'
      }
    }

    // Check trial period
    if (accountData.trial_ends_at) {
      const trialEnds = new Date(accountData.trial_ends_at)
      if (trialEnds > currentDate) {
        return {
          hasAccess: true,
          level: 'trial'
        }
      }
    }

    // Check grace period
    if (accountData.grace_period_ends_at) {
      const graceEnds = new Date(accountData.grace_period_ends_at)
      if (graceEnds > currentDate) {
        return {
          hasAccess: true,
          level: 'grace_period'
        }
      }
    }

    // Check if we need to calculate grace period from expired subscription
    const { data: expiredSubs } = await supabaseClient
      .from('subscriptions')
      .select('id, status, current_period_end')
      .eq('account_id', accountId)
      .in('status', ['canceled', 'past_due'])

    if (expiredSubs && expiredSubs.length > 0 && !accountData.grace_period_ends_at) {
      const expiredSub = expiredSubs[0] as SubscriptionData
      if (expiredSub.current_period_end) {
        const periodEnd = new Date(expiredSub.current_period_end)
        // 14 days grace period
        const graceEnds = new Date(periodEnd.getTime() + 14 * 24 * 60 * 60 * 1000)
        if (graceEnds > currentDate) {
          return {
            hasAccess: true,
            level: 'grace_period'
          }
        }
      }
    }

    // No access - account is expired (no subscription, no trial, no grace period)
    return {
      hasAccess: false,
      level: 'expired',
      message: 'This menu is currently unavailable. The business may be updating their subscription.'
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

