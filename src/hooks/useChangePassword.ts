import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const fetcher = async (
  url: string,
  { arg }: { arg: { email: string; password: string } }
) => {
  const { email, password } = arg;
  await axios.post(url, { email, password });
};

export function useChangePassword() {
  const { trigger, isMutating, error } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_URL}/change-password`,
    fetcher
  );

  return { trigger, isMutating, error };
}
