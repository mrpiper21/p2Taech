// src/routes/authRoutes.tsx
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallBack";

const LoginPage = lazy(() => import("../../pages/AuthPages/login"));

const loginRoute = [
	{
		path: "",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<LoginPage />
			</ErrorBoundary>
		),
	}
];

export default loginRoute;
