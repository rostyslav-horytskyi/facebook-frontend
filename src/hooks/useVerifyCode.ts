import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const fetcher = async (
  url: string,
  { arg }: { arg: { email: string; code: string } }
) => {
  const { email, code } = arg;
  await axios.post(url, { email, code });
};

export function useVerifyCode() {
  const { trigger, isMutating, error } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_URL}/validateResetCode`,
    fetcher
  );

  return { trigger, isMutating, error };
}
