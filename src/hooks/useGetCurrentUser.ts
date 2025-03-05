import useSWR from 'swr';
import axios from 'axios';
import { User } from '../types';

const fetchCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Unauthorized');
  }

  const response = await axios.get(`http://localhost:8000/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const useGetCurrentUser = () => useSWR('currentUser', fetchCurrentUser);
