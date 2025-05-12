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
import Providers from "../layouts/Provideders";
import Wallet from "../components/Wallet";

// const ProfilePage = lazy(() => import("../pages/App/Profile"));
// const ErrorPage = lazy(() => import("../pages/Error"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Wallet />,
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
				<Providers>
					<AppLayout />
				</Providers>
			</SecuredRoute>
		),
		children: protectedRoutes,
	},
]);

export default router;
