import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { LoginInfo, UserError } from '../types';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Parameters required for user login
 */
export type LoginParams = {
  email: string;
  password: string;
};

/**
 * Response data from login API
 */
export type LoginData = LoginInfo | UserError;

/**
 * Type for the SWR cache key
 */
type KeyGetter = () => { api: string; endpoint: string };
type MutationKey = ReturnType<KeyGetter>;

/**
 * Gets a unique cache key for login mutation
 */
export const getLoginKey: KeyGetter = () => ({
  api: 'AccountsApi.loginUser',
  endpoint: API_CONFIG.AUTH.LOGIN,
});

/**
 * Handles the login API request
 */
const loginMutation = async (
  key: MutationKey,
  { arg }: { arg: LoginParams }
): Promise<LoginData> => post<LoginData>(key.endpoint, arg);

/**
 * Options type for the hook
 */
type LoginOptions = SWRMutationConfiguration<
  LoginData,
  Error,
  MutationKey,
  LoginParams
>;

/**
 * Hook for user login functionality
 *
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 *
 * @example
 * const { trigger: login, isMutating, error } = useLoginUser({
 *   onSuccess: (data) => {
 *     // Handle successful login
 *   }
 * });
 *
 * // Call login function with credentials
 * login({ email: 'user@example.com', password: 'password123' });
 */
export const useLoginUser = (options?: LoginOptions) =>
  useSWRMutation(getLoginKey(), loginMutation, options);
