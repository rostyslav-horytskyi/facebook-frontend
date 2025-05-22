import { ReactElement } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';

interface ProtectedRouteProps {
  children: ReactElement;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement | null {
  const { isAuthenticated, logout } = useAuth();
  const { error } = useGetCurrentUser();

  if (error?.status === 401 || !isAuthenticated) {
    logout();
    return null;
  }

  return children;
}
