import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const fetcher = async (url: string, { arg: email }: { arg: string }) => {
  const { data } = await axios.post(url, { email });
  return data;
};

export function useFindUser() {
  const { trigger, data, isMutating, error } = useSWRMutation(
    `${import.meta.env.VITE_BACKEND_URL}/findUser`,
    fetcher
  );

  return { trigger, data, isMutating, error };
}
