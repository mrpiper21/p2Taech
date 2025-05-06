import { Navigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useUserStore().currentUser;

	return !isAuthenticated ? <>{children}</> : <Navigate to="/home" replace />;
};

export default PublicRoute;
