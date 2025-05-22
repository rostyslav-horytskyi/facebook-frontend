import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { post } from '../utils/apiClient';
import { API_CONFIG } from '../config/api.config';

/**
 * Response from send verification API
 */
export interface VerificationResponse {
  message: string;
  success: boolean;
}

/**
 * Cache key for send verification mutation
 */
export const SEND_VERIFICATION_KEY = API_CONFIG.AUTH.VERIFY_SEND;

/**
 * Sends verification email to user
 */
const sendVerificationMutation = async (
  key: string,
  { arg: token }: { arg: string }
): Promise<VerificationResponse> => {
  try {
    // The current token should already be in the apiClient interceptor,
    // but we're keeping the option to use a specific token
    return await post<VerificationResponse>(key, {}, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  } catch (error) {
    // Re-throw for SWR to handle
    throw error;
  }
};

/**
 * Options type for the hook
 */
type SendVerificationOptions = SWRMutationConfiguration<
  VerificationResponse,
  Error,
  string,
  string
>;

/**
 * Hook for sending verification email to user
 * 
 * @param options - SWR mutation options
 * @returns Object with sendVerification function and state
 * 
 * @example
 * const { 
 *   sendVerification, 
 *   successMessage, 
 *   errorMessage, 
 *   isLoading 
 * } = useSendVerification({
 *   onSuccess: (data) => {
 *     // Handle successful sending
 *     console.log(data.message);
 *   }
 * });
 * 
 * // Send verification email using current token
 * sendVerification();
 * 
 * // Or with a specific token
 * sendVerification(specificToken);
 */
export function useSendVerification(options?: SendVerificationOptions) {
  const { trigger, data, error, isMutating } = useSWRMutation(
    SEND_VERIFICATION_KEY,
    sendVerificationMutation,
    options
  );

  return {
    sendVerification: trigger,
    successMessage: data?.message,
    errorMessage: error?.message || (error as any)?.response?.data?.message,
    isLoading: isMutating,
    data
  };
}
