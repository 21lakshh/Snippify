import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-1">Loading Snippify</h3>
            <p className="text-gray-400 text-sm">Preparing your workspace...</p>
          </div>
          
          {/* Animated Dots */}
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />;
  return <Outlet />;
};
