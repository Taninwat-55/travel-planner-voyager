import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Komponenter och sidor
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';
import StaysPage from './pages/StaysPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import Explore from './pages/Explore.jsx';
import TravelPlanPage from './pages/TravelPlanPage.jsx';

// ---- LÄGG TILL DESSA TRE IMPORTER ----
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BookingConfirmationPage from './pages/BookingConfirmationPage.jsx';
// ------------------------------------

// Context Provider
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hotel/:id',
        element: <HotelDetailsPage />,
      },
      {
        path: 'stays',
        element: <StaysPage />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: '/favorites',
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'travel-plan',
        element: (
          <ProtectedRoute>
            <TravelPlanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'booking-confirmation',
        element: (
          <ProtectedRoute>
            <BookingConfirmationPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
