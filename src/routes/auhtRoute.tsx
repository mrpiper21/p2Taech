// src/routes/authRoutes.tsx
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallBack";

const LoginPage = lazy(() => import("../pages/AuthPages/login"));
const RegisterPage = lazy(() => import("../pages/AuthPages/Register"));

const authRoutes = [
	{
		path: "/login",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<LoginPage />
			</ErrorBoundary>
		),
	},
	{
		path: "/register",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<RegisterPage />
			</ErrorBoundary>
		),
	},
	{
		path: "*",
		element: <Navigate to="/login" replace />,
	},
];

export default authRoutes;
