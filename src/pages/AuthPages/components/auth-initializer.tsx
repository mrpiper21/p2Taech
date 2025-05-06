import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, fetchCurrentUser, loading } = useUserStore();
//   const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await fetchCurrentUser();
      } catch (error) {
        console.error("Auth initialization failed:", error);
      }
    };

    if (!currentUser && !loading) {
      initializeAuth();
    }
  }, [currentUser, fetchCurrentUser, loading]);

  return <>{children}</>;
};

export default AuthInitializer;