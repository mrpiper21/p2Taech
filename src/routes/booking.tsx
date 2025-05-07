import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallBack";
import { lazy } from 'react';
const BookingsPage = lazy(()=> import("../pages/SecurePages/booking"))



const bookingRoute = [
    {
        path: "",
        element: (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <BookingsPage />
            </ErrorBoundary>
        )
    }
]

export default bookingRoute