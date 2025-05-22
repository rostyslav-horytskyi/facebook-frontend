import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Type for user data returned from find user API
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  picture: string;
}

/**
 * Cache key for find user mutation
 */
export const FIND_USER_KEY = API_CONFIG.AUTH.VERIFY_CODE;

/**
 * Fetches user information by email
 */
const findUserMutation = async (
  key: string,
  { arg: email }: { arg: string }
): Promise<UserInfo> => post<UserInfo>(key, { email });

/**
 * Options type for the hook
 */
type FindUserOptions = SWRMutationConfiguration<
  UserInfo,
  Error,
  string,
  string
>;

/**
 * Hook for finding a user by email (used in password reset flow)
 *
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 *
 * @example
 * const { trigger: findUser, data, isMutating, error } = useFindUser({
 *   onSuccess: (userData) => {
 *     // Handle found user
 *   }
 * });
 *
 * // Call findUser function with email
 * findUser('user@example.com');
 */
export function useFindUser(options?: FindUserOptions) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    FIND_USER_KEY,
    findUserMutation,
    options
  );

  return { trigger, data, isMutating, error };
}
