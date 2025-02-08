/**
 * A component that protects routes from being accessed by unauthenticated users.
 * If the user is not authenticated, they will be redirected to the specified path.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} [props.redirectPath="/"] - The path to redirect to if the user is not authenticated.
 * @param {React.ReactNode} [props.children] - The child components to render if the user is authenticated.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <ProtectedRoute redirectPath="/login">
 *   <YourProtectedComponent />
 * </ProtectedRoute>
 */
import React from "react";
import { useAuth } from "../providers/authProvider";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/",
  children,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
