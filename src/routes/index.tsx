// src/routes/index.tsx (Main router configuration)
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
// import PublicRoute from "../components/auth/publicRoute";
import AppLayout from "../layouts/AppLayouts";
// import authRoutes from "./auhtRoute";
import protectedRoutes from "./protectedRoutes";
import loginRoute from "./auth/login";
import registerRoute from "./auth/register";

// const ProfilePage = lazy(() => import("../pages/App/Profile"));
// const ErrorPage = lazy(() => import("../pages/Error"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <span>Hello world</span>,
	},
	{
		path: "/login/*",
		element: <AuthLayout />,
		children: loginRoute,
	},
	{
		path: "/register/*",
		element: <AuthLayout />,
		children: registerRoute,
	},
	{
		path: "/home/*",
		element: <AppLayout />,
		children: protectedRoutes,
	},
]);

export default router;
