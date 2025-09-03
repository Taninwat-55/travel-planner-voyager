import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Skicka användaren till inloggningssidan, men kom ihåg var de var på väg.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
