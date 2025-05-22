import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Response from send reset code API
 */
export interface SendResetCodeResponse {
  message: string;
  success: boolean;
}

/**
 * Cache key for send reset code mutation
 */
export const SEND_RESET_CODE_KEY = API_CONFIG.AUTH.RESET_PASSWORD;

/**
 * Sends reset password code to user's email
 */
const sendResetCodeMutation = async (
  key: string,
  { arg: email }: { arg: string }
): Promise<SendResetCodeResponse> => {
  try {
    return await post<SendResetCodeResponse>(key, { email });
  } catch (error) {
    // Re-throw for SWR to handle
    throw error;
  }
};

/**
 * Options type for the hook
 */
type SendResetCodeOptions = SWRMutationConfiguration<
  SendResetCodeResponse,
  Error,
  string,
  string
>;

/**
 * Hook for sending password reset code to user's email
 * 
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 * 
 * @example
 * const { trigger: sendResetCode, isMutating, error } = useSendResetPasswordCode({
 *   onSuccess: (response) => {
 *     // Handle successful code sending
 *     console.log(response.message);
 *   }
 * });
 * 
 * // Call sendResetCode function with email
 * sendResetCode('user@example.com');
 */
export function useSendResetPasswordCode(options?: SendResetCodeOptions) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    SEND_RESET_CODE_KEY,
    sendResetCodeMutation,
    options
  );

  return { trigger, data, isMutating, error };
}
