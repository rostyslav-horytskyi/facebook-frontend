import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Parameters for password change
 */
export interface ChangePasswordParams {
  email: string;
  password: string;
}

/**
 * Response from password change API
 */
export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

/**
 * Cache key for change password mutation
 */
export const CHANGE_PASSWORD_KEY = API_CONFIG.AUTH.CHANGE_PASSWORD;

/**
 * Changes user password
 */
const changePasswordMutation = async (
  key: string,
  { arg }: { arg: ChangePasswordParams }
): Promise<ChangePasswordResponse> => post<ChangePasswordResponse>(key, arg);

/**
 * Options type for the hook
 */
type ChangePasswordOptions = SWRMutationConfiguration<
  ChangePasswordResponse,
  Error,
  string,
  ChangePasswordParams
>;

/**
 * Hook for changing user password (used in password reset flow)
 *
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 *
 * @example
 * const { trigger: changePassword, isMutating, error } = useChangePassword({
 *   onSuccess: () => {
 *     // Handle successful password change
 *   }
 * });
 *
 * // Call changePassword function
 * changePassword({ email: 'user@example.com', password: 'newPassword123' });
 */
export function useChangePassword(options?: ChangePasswordOptions) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    CHANGE_PASSWORD_KEY,
    changePasswordMutation,
    options
  );

  return { trigger, data, isMutating, error };
}
