import type { SWRMutationConfiguration } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';
import type { LoginInfo } from '../types';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Type for the SWR cache key
 */
type KeyGetter = () => { api: string; endpoint: string };

/**
 * Registration parameters
 */
export type RegisterParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
  picture: string;
  verified: boolean;
};

/**
 * Gets a unique cache key for registration mutation
 */
export const getRegisterKey: KeyGetter = () => ({
  api: 'AccountsApi.registerUser',
  endpoint: API_CONFIG.AUTH.REGISTER
});

type MutationKey = ReturnType<typeof getRegisterKey>;

/**
 * Handles the registration API request
 */
const registerMutation = async (
  key: MutationKey,
  { arg }: { arg: RegisterParams }
): Promise<LoginInfo> => {
  try {
    return await post<LoginInfo>(key.endpoint, arg);
  } catch (error) {
    // Convert error to a format SWR can handle
    throw error;
  }
};

type RegisterOptions = SWRMutationConfiguration<LoginInfo, Error, MutationKey, RegisterParams>;

/**
 * Hook for user registration functionality
 * 
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 * 
 * @example
 * const { trigger: register, isMutating, error } = useRegisterUser({
 *   onSuccess: (data) => {
 *     // Handle successful registration
 *   }
 * });
 * 
 * // Call register function with user data
 * register({
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   email: 'john@example.com',
 *   password: 'securepassword',
 *   bYear: 1990,
 *   bMonth: 1,
 *   bDay: 1,
 *   gender: 'male',
 *   picture: '',
 *   verified: false
 * });
 */
export const useRegisterUser = (options?: RegisterOptions) =>
  useSWRMutation(getRegisterKey(), registerMutation, options);
