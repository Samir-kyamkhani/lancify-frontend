import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated, getUserRole, routeAccessMap } from "../settings";

export default function ProtectedRoute() {
  const location = useLocation();
  const path = location.pathname;
  const role = getUserRole();

  // Match base path in routeAccessMap to find the allowed roles for the route
  const matchedPath = Object.keys(routeAccessMap)
    .sort((a, b) => b.length - a.length) // Match longer paths first
    .find((route) => path.startsWith(route));

  const allowedRoles = matchedPath ? routeAccessMap[matchedPath] : [];

  // Check if the user is authenticated
  if (!isAuthenticated()) return <Navigate to="/signup" replace />;

  // Check if the user has access to the requested route based on their role
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the children (protected content)
  return <Outlet />;
}
