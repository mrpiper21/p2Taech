// src/routes/authRoutes.tsx
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallBack";

const RegisterPage = lazy(() => import("../../pages/AuthPages/Register"));

const registerRoute = [
    {
        path: "",
        element: (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RegisterPage />
            </ErrorBoundary>
        ),
    }
];

export default registerRoute;
