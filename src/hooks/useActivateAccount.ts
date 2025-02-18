import useSWR from 'swr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetCurrentUser } from './useGetCurrentUser';

const fetchActivate = async ([url, token]: [string, string]) => {
  const response = await axios.post(
    url,
    { token },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

export const useActivateAccount = (token?: string) => {
  const navigate = useNavigate();
  const { data: user, mutate: refreshUserInfo } = useGetCurrentUser();

  const { data, error, isLoading } = useSWR(
    token ? [`${import.meta.env.VITE_BACKEND_URL}/activate`, token] : null,
    fetchActivate
  );

  useEffect(() => {
    if (data) {
      refreshUserInfo();

      // setTimeout(() => navigate('/'), 3000);
    }
  }, [data, user, navigate]);

  useEffect(() => {
    if (error) {
      // setTimeout(() => navigate('/'), 3000);
    }
  }, [error, navigate]);

  return {
    success: data?.message,
    error: error?.response?.data?.message,
    loading: isLoading,
  };
};
