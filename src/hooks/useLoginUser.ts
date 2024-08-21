import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import axios from 'axios';
import { User, UserError } from '../types';

type LoginParams = {
  email: string;
  password: string;
};

type LoginData = User | UserError;

type KeyGetter = () => { api: string };
type MutationKey = ReturnType<KeyGetter>;

export const getLoginKey: KeyGetter = () => ({
  api: 'AccountsApi.loginUser',
});

const loginMutation = async (
  _: MutationKey,
  { arg }: { arg: LoginParams }
): Promise<LoginData> => {
  const response = await axios.post(`http://localhost:8000/login`, arg);

  return response.data;
};

type LoginOptions = SWRMutationConfiguration<
  LoginData,
  any,
  MutationKey,
  LoginParams
>;

export const useLoginUser = (options?: LoginOptions) =>
  useSWRMutation(getLoginKey(), loginMutation, options);
