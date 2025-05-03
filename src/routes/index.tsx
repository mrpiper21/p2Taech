import { createBrowserRouter } from 'react-router-dom';
import authRoutes from './auhtRoute';
import AppLayout from '../layouts/AppLayouts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      ...authRoutes,
      // Add other routes here
    ],
  },
]);

export default router