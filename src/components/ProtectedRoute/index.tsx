import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const { error } = useGetCurrentUser();

  if (error?.status === 401 || !isAuthenticated) {
    logout();

    return null;
  }

  return children;
}
