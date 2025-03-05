import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const sendEmailRequest = async (
  url: string,
  { arg: email }: { arg: string }
) => {
  const response = await axios.post(url, { email });
  return response.data;
};

export function useSendResetPasswordCode() {
  const { trigger, isMutating, error } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_URL}/send-reset-password-code`,
    sendEmailRequest
  );

  return { trigger, isMutating, error };
}
