import useSWR, { SWRConfiguration } from 'swr';
import { User } from '../types';
import { get } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Cache key for current user data
 */
export const CURRENT_USER_KEY = 'currentUser';

/**
 * Fetches the current user data from the API
 */
const fetchCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  return get<User>(API_CONFIG.USER.GET_PROFILE);
};

/**
 * Hook for getting the currently authenticated user
 *
 * @param config - SWR configuration options
 * @returns SWR response with user data, loading and error states
 *
 * @example
 * const { data: user, error, isLoading, mutate } = useGetCurrentUser({
 *   revalidateOnFocus: false
 * });
 *
 * if (isLoading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 *
 * return <ProfileComponent user={user} refreshData={mutate} />;
 */
export const useGetCurrentUser = (config?: SWRConfiguration) =>
  useSWR(CURRENT_USER_KEY, fetchCurrentUser, {
    // Default configuration (can be overridden)
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    dedupingInterval: 60000, // 1 minute
    ...config,
  });
