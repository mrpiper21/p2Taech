// src/components/auth/PublicRoute.tsx
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false;

  return !isAuthenticated ? <>{children}</> : <Navigate to="/home" replace />;
};

export default PublicRoute;