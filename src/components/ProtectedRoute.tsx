import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading…</div>;      // or a fancy spinner
  if (!user)    return <Navigate to="/signin" state={{ from: location }} replace />; // if the user is not logged in, redirect to the login page, and replace the current location with the login page
  return <Outlet />; // renders the child components of the protected route
};
