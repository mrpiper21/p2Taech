import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

const SecuredRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const location = useLocation();

  return currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SecuredRoute;