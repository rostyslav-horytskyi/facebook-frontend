import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const sendVerificationFetcher = async (
  url: string,
  { arg: token }: { arg: string }
) => {
  const { data } = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.message;
};

export function useSendVerification() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_URL}/send-verification`,
    sendVerificationFetcher
  );

  return {
    sendVerification: trigger,
    successMessage: data,
    errorMessage: error?.response?.data?.message,
    isLoading: isMutating,
  };
}
