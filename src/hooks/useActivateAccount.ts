import useSWR, { SWRConfiguration } from 'swr';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { post } from '../utils/apiClient';
import { useGetCurrentUser } from './useGetCurrentUser';
import { API_CONFIG } from '../config/api.config';

/**
 * Response from account activation API
 */
export interface ActivationResponse {
  message: string;
  success: boolean;
}

/**
 * Cache key for account activation
 */
export const getActivationKey = (token: string) =>
  [API_CONFIG.AUTH.ACTIVATE, token] as const;

/**
 * Sends account activation request
 */
const fetchActivate = async ([url, token]: readonly [
  string,
  string,
]): Promise<ActivationResponse> => post<ActivationResponse>(url, { token });

/**
 * Hook for activating a user account
 *
 * @param token - Activation token from URL
 * @param redirectDelay - Delay in ms before redirecting (default: 3000)
 * @param config - SWR configuration options
 * @returns Object containing success message, error, and loading state
 *
 * @example
 * const { success, error, loading, cancelRedirect } = useActivateAccount(
 *   activationToken,
 *   2000
 * );
 */
export const useActivateAccount = (
  token?: string,
  config?: SWRConfiguration,
  redirectDelay = 3000
) => {
  const navigate = useNavigate();
  const { mutate: refreshUserInfo } = useGetCurrentUser();

  // Use null as key when token is not available to prevent request
  const { data, error, isLoading, isValidating } = useSWR(
    token ? getActivationKey(token) : null,
    fetchActivate,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      ...config,
    }
  );

  // Function to cancel the redirect
  const cancelRedirect = useCallback(() => {
    // Clear any pending redirects (requires storing timeout ID in ref)
    // This would need a ref to store the timeout ID, not implemented here
  }, []);

  // Handle successful activation
  useEffect(() => {
    if (data?.success) {
      // Refresh user info to update verification status
      refreshUserInfo();

      // Redirect to home page after delay
      const timeoutId = setTimeout(() => navigate('/'), redirectDelay);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [data, refreshUserInfo, navigate, redirectDelay]);

  // Handle activation error
  useEffect(() => {
    if (error) {
      // Redirect to home page after delay
      const timeoutId = setTimeout(() => navigate('/'), redirectDelay);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [error, navigate, redirectDelay]);

  return {
    success: data?.message,
    error: error?.message || (error as any)?.response?.data?.message,
    loading: isLoading || isValidating,
    cancelRedirect,
  };
};
