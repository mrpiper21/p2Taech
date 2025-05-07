// src/routes/index.tsx (Main router configuration)
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
// import PublicRoute from "../components/auth/publicRoute";
import AppLayout from "../layouts/AppLayouts";
// import authRoutes from "./auhtRoute";
import protectedRoutes from "./protectedRoutes";
import loginRoute from "./auth/login";
import registerRoute from "./auth/register";
import SecuredRoute from "../components/auth/securedRoutes";
import PublicRoute from "../components/auth/publicRoute";
import { AuthButton } from "../pages/AuthPages/components/auth-button";

// const ProfilePage = lazy(() => import("../pages/App/Profile"));
// const ErrorPage = lazy(() => import("../pages/Error"));

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="flex h-screen px-[40dvw] space-y-4 flex-col  flex-1 items-center justify-center">
				<AuthButton type="button" label="Login" />
				<AuthButton type="button" label="Register" />
			</div>
		),
	},
	{
		path: "/login/*",
		element: (
			<PublicRoute>
				<AuthLayout />
			</PublicRoute>
		),
		children: loginRoute,
	},
	{
		path: "/register/*",
		element: (
			<PublicRoute>
				<AuthLayout />
			</PublicRoute>
		),
		children: registerRoute,
	},
	{
		path: "/home/*",
		element: (
			<SecuredRoute>
				<AppLayout />
			</SecuredRoute>
		),
		children: protectedRoutes,
	},
]);

export default router;
