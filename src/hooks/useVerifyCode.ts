import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { post } from '../utils/apiClient';

/**
 * Parameters for verifying reset code
 */
export interface VerifyCodeParams {
  email: string;
  code: string;
}

/**
 * Response from verify code API
 */
export interface VerifyCodeResponse {
  message: string;
  success: boolean;
}

/**
 * Custom endpoint for code validation
 * (Note: Using a custom endpoint since it's not defined in API_CONFIG)
 */
export const VERIFY_CODE_ENDPOINT = '/validate-reset-code';

/**
 * Verifies a password reset code
 */
const verifyCodeMutation = async (
  key: string,
  { arg }: { arg: VerifyCodeParams }
): Promise<VerifyCodeResponse> => post<VerifyCodeResponse>(key, arg);

/**
 * Options type for the hook
 */
type VerifyCodeOptions = SWRMutationConfiguration<
  VerifyCodeResponse,
  Error,
  string,
  VerifyCodeParams
>;

/**
 * Hook for verifying a password reset code
 *
 * @param options - SWR mutation options
 * @returns SWR mutation object with trigger function and state
 *
 * @example
 * const { trigger: verifyCode, isMutating, error } = useVerifyCode({
 *   onSuccess: (response) => {
 *     // Handle successful verification
 *     console.log(response.message);
 *   }
 * });
 *
 * // Call verifyCode function
 * verifyCode({ email: 'user@example.com', code: '123456' });
 */
export function useVerifyCode(options?: VerifyCodeOptions) {
  const { trigger, data, isMutating, error } = useSWRMutation(
    VERIFY_CODE_ENDPOINT,
    verifyCodeMutation,
    options
  );

  return { trigger, data, isMutating, error };
}
