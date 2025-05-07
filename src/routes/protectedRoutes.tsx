// src/routes/protectedRoutes.tsx
import { lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallBack';
// import { Navigate } from 'react-router-dom';
// import ProtectedRoute from '../components/auth/protectedRoute';
const HomePage = lazy(() => import('../pages/SecurePages/home'));
const DiscoverCourses = lazy(() => import('../pages/SecurePages/discover'));
const BookingsPage = lazy(() => import("../pages/SecurePages/booking"));
// const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const protectedRoutes = [
	// {
	//   path: '/',
	//   element: <ProtectedRoute />,
	//   children: [

	//   ],
	// },
	// {
	//   path: '/',
	//   element: <Navigate to="/home" replace />,
	// },
	{
		path: "",
		element: <HomePage />,
	},
	{
		path: "discover",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<DiscoverCourses />
			</ErrorBoundary>
		),
	},
	{
		path: "bookings",
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<BookingsPage />
			</ErrorBoundary>
		),
	},
];

export default protectedRoutes;