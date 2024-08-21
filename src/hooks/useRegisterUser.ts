import type { SWRMutationConfiguration } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import type { User, UserError } from '../types';

type KeyGetter = () => { api: string };

type Params = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  gender: string;
};

type RegisterData = User | UserError;

export const getRegisterKey: KeyGetter = () => ({
  api: 'AccountsApi.registerUser',
});

type MutationKey = ReturnType<typeof getRegisterKey>;

const mutation = async (
  _: MutationKey,
  { arg }: { arg: Params }
): Promise<RegisterData> => {
  const response = await axios.post(`http://localhost:8000/register`, arg);

  return response.data;
};

type Options = SWRMutationConfiguration<RegisterData, any, MutationKey, Params>;

export const useRegisterUser = (options?: Options) =>
  useSWRMutation(getRegisterKey(), mutation, options);
