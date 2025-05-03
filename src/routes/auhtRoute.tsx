import { lazy } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallBack';

const LoginPage = lazy(() => import('../pages/AuthPages/login'));
const RegistrationPage = lazy(() => import('../pages/AuthPages/Register'));

const authRoutes = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element:<ErrorBoundary FallbackComponent={ErrorFallback}>
             <RegistrationPage />
        </ErrorBoundary>,
      },
      { path: '', element: <Navigate to="login" replace /> }

    ],
  },
];

export default authRoutes;