import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx'; 
import StaysPage from './pages/StaysPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import Explore from './pages/Explore.jsx';

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
        path: '/favorites',
        element: <FavoritesPage/>,
      },
      {
        path: 'explore', 
        element: <Explore />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
